from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Accounts, Seller, Customer, Product, Cart, Review, FlagLists, Order, Payment
from django.contrib.auth import authenticate
from django.db.models import Sum
from django.db.models.functions import TruncMonth
from datetime import datetime, timedelta

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('customer', 'Customer'), ('seller', 'Seller')])
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')

    def create(self, data):
        role = data.pop('role')
        password = data.pop('password')
        user = User.objects.create_user(**data)
        user.set_password(password)
        user.save()
        Accounts.objects.create(user=user, role=role)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(username=data['username'], password=data['password'])
        if user:
            return user
        raise serializers.ValidationError("Invalid username or password.")
    
class UserManagementSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='accounts.role')
    is_active = serializers.BooleanField()
    is_verified = serializers.BooleanField(source='accounts.is_verified')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'is_verified']

class UserDetailSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='accounts.role')
    customer_details = serializers.SerializerMethodField()
    seller_details = serializers.SerializerMethodField()
    is_verified = serializers.BooleanField(source='accounts.is_verified')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'is_active', 'is_verified', 'customer_details', 'seller_details']

    def get_customer_details(self, obj):
        if hasattr(obj, 'customer'):
            return {
                'address1': obj.customer.address1,
                'city': obj.customer.city,
                'state': obj.customer.state,
                'pincode': obj.customer.pincode,
                'country': obj.customer.country,
                'phone': obj.customer.phone,
                'points': obj.customer.points
            }
        return None

    def get_seller_details(self, obj):
        if hasattr(obj, 'seller'):
            return {
                'company_name': obj.seller.company_name,
                'credit_score': obj.seller.credit_score,
                'total_products': obj.seller.total_products,
                'fake_flags': obj.seller.fake_flags,
                'is_blacklisted': obj.seller.is_blacklisted,
                'trust_rating': obj.seller.trust_rating()
            }
        return None

class SellerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    trust_rating = serializers.FloatField()
    monthly_sales = serializers.SerializerMethodField()

    class Meta:
        model = Seller
        fields = [
            'username', 'company_name', 'company_address', 'phone_number',
            'website', 'credit_score', 'total_products', 'fake_flags',
            'is_blacklisted', 'trust_rating', 'monthly_sales'
        ]

    def get_monthly_sales(self, obj):
        # Get orders for the seller from the past 6 months
        six_months_ago = datetime.now() - timedelta(days=180)
        orders = Order.objects.filter(
            seller=obj,
            created_at__gte=six_months_ago,
            status='paid'  # Only include paid orders
        ).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            total=Sum('total_amount')
        ).order_by('month')

        # Format data for the frontend
        labels = []
        sales = []
        for i in range(6):
            month_date = (datetime.now() - timedelta(days=30 * i)).replace(day=1)
            month_str = month_date.strftime('%b')
            labels.insert(0, month_str)
            total = next((o['total'] for o in orders if o['month'].month == month_date.month and o['month'].year == month_date.year), 0)
            sales.insert(0, float(total))

        return {
            'labels': labels,
            'sales': sales
        }

class CustomerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')

    class Meta:
        model = Customer
        fields = [
            'username', 'address1', 'address2', 'city', 'state',
            'country', 'pincode', 'phone'
        ]

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'customer', 'rating', 'comment', 'created_at']

class FlagListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='customer.user.username', read_only=True)
    class Meta:
        model = FlagLists
        fields = ['id', 'customer', 'username', 'reason', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True, source='review_set')
    flag_comments = FlagListSerializer(many=True, read_only=True, source='flaglists_set')
    seller = SellerSerializer(read_only=True)
    class Meta:
        model = Product
        fields = [
            'name', 'brand', 'description', 'price', 'category', 'id',
            'image', 'created_at', 'is_fake', 'fake_flags', 'trust_score', 
            'external_link', 'verified_source', 'reviews','flag_comments', 'seller'
        ]

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()  # nested product details

    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer()

    class Meta:
        model = Order
        fields = [
            'id', 'customer', 'product', 'total_amount', 'status',
            'created_at'
        ]
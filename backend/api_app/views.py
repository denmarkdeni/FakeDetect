from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.db.models.functions import TruncMonth
from django.db.models import Count, F
from django.db import transaction
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Accounts, Seller, Customer, Product, Cart, Order, FlagLists, Payment, Review,Voucher,RedeemedVoucher
from .serializers import RegisterSerializer, LoginSerializer, SellerSerializer, ProductSerializer,SubmitReviewSerializer
from .serializers import CustomerSerializer, CartSerializer, OrderSerializer, FlagListSerializer,ReviewSerializer
from .serializers import UserManagementSerializer, UserDetailSerializer,VoucherSerializer,RedeemedVoucherSerializer
class VerifyEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        try:
            account = Accounts.objects.get(verification_token=token)
            if not account.is_verified:
                account.is_verified = True
                account.verified_at = timezone.now()
                account.save()
                return redirect(f"{settings.FRONTEND_URL}/email-verified")
            return redirect(f"{settings.FRONTEND_URL}/email-verified?error=already_verified")
        except Accounts.DoesNotExist:
            return redirect(f"{settings.FRONTEND_URL}/email-verified?error=invalid_token")

class RegisterView(APIView):
    permission_classes = [IsAuthenticated | AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            account = Accounts.objects.get(user=user)
            if user.accounts.role == 'customer':
                Customer.objects.create(user=user)
            elif user.accounts.role == 'seller':
                Seller.objects.create(user=user)

            # Send verification email
            verification_link = f"{settings.BACKEND_URL}/verify-email/{account.verification_token}"
            subject = 'Verify Your Email for FakeDetect'
            message = f'Hi {user.username},\n\nPlease verify your email by clicking the link below:\n{verification_link}\n\nThank you,\nCrediPlus Team'
            send_mail(
                subject,
                message,
                settings.EMAIL_HOST_USER,
                [user.email],
                fail_silently=False,
            )

            return Response({"token": token.key, "message": "Registration successful. Please check your email to verify your account."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [IsAuthenticated | AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            if not user.is_superuser:
                if not user.accounts.is_verified:
                    return Response(
                        {"error": "Please verify your email before logging in."},
                        status=status.HTTP_403_FORBIDDEN
                    )
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            
            if request.user.is_superuser:
                role = 'admin'
                isVerified = True
            else:
                role = user.accounts.role
                isVerified = user.accounts.is_verified
            return Response({"token": token.key,"role":role,"username":user.username,"isVerified":isVerified}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SellerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        seller = request.user.seller
        serializer = SellerSerializer(seller)
        return Response(serializer.data)
    
    def put(self, request):
        seller = request.user.seller
        serializer = SellerSerializer(seller, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class ProductListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request): 
        # Fetch all products, or filter as needed
        if request.user.accounts.role == 'customer':
            products = Product.objects.all()
        elif request.user.accounts.role == 'seller':
            products = Product.objects.filter(seller=request.user.seller)  
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
class ProductUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        seller = request.user.seller

        if serializer.is_valid():
            serializer.save(seller=seller)  
            seller.total_products +=1
            seller.save()
            return Response({'message': 'Product uploaded successfully!'}, status=201)
        
        return Response(serializer.errors, status=400)
    
class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = request.user.customer
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)
    
    def put(self, request):
        customer = request.user.customer
        serializer = CustomerSerializer(customer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
class ProductDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, pk):
        print(request.user.username)
        try:
            product = Product.objects.get(pk=pk)
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

class AddToCartView(APIView):
    permission_classes =[IsAuthenticated]
    
    def post(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            cart_item, created = Cart.objects.get_or_create(customer = request.user.customer,product=product)
            if created:
                return Response({'message': 'product added to cart'},status=201)
            else:
                return Response({'message': 'product already in cart'},status=200)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

class FlagProductView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
            if FlagLists.objects.filter(customer=request.user.customer, product=product).exists():
                return Response({'message': 'Product already flagged'}, status=200)
            reason = request.data.get('reason')
            if not reason:
                return Response({'error': 'Reason for flagging is required'}, status=200)
            FlagLists.objects.create(customer=request.user.customer, product=product,reason=reason)
            product.fake_flags += 1
            product.save()
        
            return Response({'message': 'Product flagged successfully!'}, status=200)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)
        
class CartListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            cart_items = Cart.objects.filter(customer=request.user.customer)
            serializer = CartSerializer(cart_items, many=True)
            return Response(serializer.data, status=200)
        except:
            return Response({'error': 'No cart found for user'}, status=404)
        
class RemoveCartView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            cart_item = Cart.objects.get(pk=pk, customer=request.user.customer)
            cart_item.delete()
            return Response({'message': 'Item removed from cart'})
        except Cart.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

class PaymentView(APIView):
    permission_classes=[IsAuthenticated]

    def post(self,request,pk):
        try:
            product = Product.objects.get(pk=pk)
            order = Order.objects.create(
                customer=request.user.customer,
                seller=product.seller,
                product=product,
                total_amount=product.price,
                status='paid'
            )
            payment = Payment.objects.create(
                order=order,
                # amount=product.price,
                payment_method=request.data.get('payment_method'),
                payment_status='success'
            )
            return Response({'message': 'Payment successful!'}, status=200)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)
        except Exception as e:
            print(e)
            return Response({'error': 'Payment failed in Back End---->{e}'}, status=200)
        
class HomePageView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=200)    
    
class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated | AllowAny]

    def get(self, request):
        try:
            orders = Order.objects.filter(customer = request.user.customer)
            serializer = OrderSerializer(orders, many = True)
            return Response(serializer.data)
        except Order.DoesNotExist:
            return Response({'error' : 'No orders found for user'},status=200)
        
class UserManagementView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all().select_related('accounts')
        serializer = UserManagementSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.is_active = not user.is_active
            user.save()
            serializer = UserManagementSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, user_id):
        try:
            user = User.objects.select_related('accounts', 'customer', 'seller').get(id=user_id)
            serializer = UserDetailSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
class ProductManagementView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def delete(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.delete()
            return Response({"message": "Product deleted successfully"}, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id)
            product.verified_source = not product.verified_source
            product.save()
            serializer = ProductSerializer(product)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
class FlagListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        flags = FlagLists.objects.select_related('customer', 'product').all()
        serializer = FlagListSerializer(flags, many=True)
        return Response(serializer.data)

    def post(self, request, flag_id):
        try:
            flag = FlagLists.objects.get(id=flag_id)
            action = request.data.get('action')
            if action == 'approve':
                customer = flag.customer
                customer.points += 10
                customer.save()
                seller = flag.product.seller
                seller.fake_flags +=1
                seller.save()
                flag.status = True
                flag.save()
                return Response({"message": "Flag approved, 10 points added to customer"}, status=status.HTTP_200_OK)
            elif action == 'remove':
                flag.delete()
                return Response({"message": "Flag removed"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
        except FlagLists.DoesNotExist:
            return Response({"error": "Flag not found"}, status=status.HTTP_404_NOT_FOUND)
        
class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        data = {
            'customer_count': Customer.objects.count(),
            'seller_count': Seller.objects.count(),
            'product_count': Product.objects.count(),
            'flag_count': FlagLists.objects.count(),
            'product_reports': self.get_product_reports(),
            'flag_trends': self.get_flag_trends(),
        }
        return Response(data)

    def get_product_reports(self):
        six_months_ago = timezone.now() - timezone.timedelta(days=180)
        products = Product.objects.filter(created_at__gte=six_months_ago).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            total=Count('id')
        ).order_by('month')

        labels = []
        counts = []
        for i in range(6, 0, -1):
            month_date = (timezone.now() - timezone.timedelta(days=30 * i)).replace(day=1)
            month_str = month_date.strftime('%b')
            labels.append(month_str)
            total = next((p['total'] for p in products if p['month'].month == month_date.month and p['month'].year == month_date.year), 0)
            counts.append(total)

        return {'labels': labels, 'counts': counts}

    def get_flag_trends(self):
        six_months_ago = timezone.now() - timezone.timedelta(days=180)
        flags = FlagLists.objects.filter(created_at__gte=six_months_ago).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            total=Count('id')
        ).order_by('month')

        labels = []
        counts = []
        for i in range(6, 0, -1):
            month_date = (timezone.now() - timezone.timedelta(days=30 * i)).replace(day=1)
            month_str = month_date.strftime('%b')
            labels.append(month_str)
            total = next((f['total'] for f in flags if f['month'].month == month_date.month and f['month'].year == month_date.year), 0)
            counts.append(total)

        return {'labels': labels, 'counts': counts}
    
class CustomerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = request.user.customer
        data = {
            'report_count': Product.objects.filter(review__customer=customer).count(),  # Assuming reviews indicate reports
            'flag_count': FlagLists.objects.filter(customer=customer).count(),
            'bought_products_count': Order.objects.filter(customer=customer, status='paid').count(),
            'credit_points': customer.points,
            'product_reports': self.get_product_reports(customer),
            'flag_trends': self.get_flag_trends(customer),
        }
        return Response(data)

    def get_product_reports(self, customer):
        six_months_ago = timezone.now() - timezone.timedelta(days=180)
        products = Product.objects.filter(review__customer=customer, review__created_at__gte=six_months_ago).annotate(
            month=TruncMonth('review__created_at')
        ).values('month').annotate(
            total=Count('id')
        ).order_by('month')

        labels = []
        counts = []
        for i in range(6, 0, -1):
            month_date = (timezone.now() - timezone.timedelta(days=30 * i)).replace(day=1)
            month_str = month_date.strftime('%b')
            labels.append(month_str)
            total = next((p['total'] for p in products if p['month'].month == month_date.month and p['month'].year == month_date.year), 0)
            counts.append(total)

        return {'labels': labels, 'counts': counts}

    def get_flag_trends(self, customer):
        six_months_ago = timezone.now() - timezone.timedelta(days=180)
        flags = FlagLists.objects.filter(customer=customer, created_at__gte=six_months_ago).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            total=Count('id')
        ).order_by('month')

        labels = []
        counts = []
        for i in range(6, 0, -1):
            month_date = (timezone.now() - timezone.timedelta(days=30 * i)).replace(day=1)
            month_str = month_date.strftime('%b')
            labels.append(month_str)
            total = next((f['total'] for f in flags if f['month'].month == month_date.month and f['month'].year == month_date.year), 0)
            counts.append(total)

        return {'labels': labels, 'counts': counts}
    
class HomeReviewsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        reviews = Review.objects.all().order_by('-created_at')[:5]  # Limit to 2 for carousel
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
    
class SubmitReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        try:
            order = Order.objects.get(id=order_id, customer=request.user.customer)
            print('error 0')
            if order.reviewed:
                return Response({"error": "This order has already been reviewed."}, status=status.HTTP_400_BAD_REQUEST)
            print('error 01')
            serializer = SubmitReviewSerializer(data=request.data)
            if serializer.is_valid():
                print('error 1')
                review = serializer.save(customer=request.user.customer, product=order.product)
                order.reviewed = True
                order.save()
                return Response({"message": "Review submitted successfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)
        
class VoucherListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        vouchers = Voucher.objects.all()
        serializer = VoucherSerializer(vouchers, many=True)
        return Response(serializer.data)

class RedeemVoucherView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, voucher_id):
        customer = request.user.customer
        try:
            with transaction.atomic():
                voucher = Voucher.objects.select_for_update().get(id=voucher_id, is_available=True)
                if customer.points < voucher.points_cost:
                    return Response({"error": "Insufficient points."}, status=status.HTTP_400_BAD_REQUEST)
                
                customer.points = F('points') - voucher.points_cost
                customer.save()
                voucher.is_available = False
                voucher.save()
                redeemed_voucher = RedeemedVoucher.objects.create(customer=customer, voucher=voucher)
                serializer = RedeemedVoucherSerializer(redeemed_voucher)
                return Response({"message": "Voucher redeemed successfully", "data": serializer.data}, status=status.HTTP_201_CREATED)
        except Voucher.DoesNotExist:
            return Response({"error": "Voucher not found or unavailable."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class VoucherAddView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = VoucherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Voucher added successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
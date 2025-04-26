from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Accounts, Seller
from django.contrib.auth import authenticate

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

class SellerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    trust_rating = serializers.FloatField()

    class Meta:
        model = Seller
        fields = [
            'username', 'company_name', 'company_address', 'phone_number',
            'website', 'credit_score', 'total_products', 'fake_flags',
            'is_blacklisted', 'trust_rating'
        ]
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer, SellerSerializer, ProductSerializer, CustomerSerializer, CartSerializer
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import login
from rest_framework.permissions import AllowAny
from .models import Accounts, Seller, Customer, Product, Cart, Order, FlagLists, Payment


class RegisterView(APIView):
    permission_classes = [IsAuthenticated | AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            if user.accounts.role == 'customer':
                Customer.objects.create(user=user)
            elif user.accounts.role == 'seller':
                Seller.objects.create(user=user)
            return Response({"token": token.key}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [IsAuthenticated | AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key,"role":user.accounts.role,"username":user.username}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SellerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        seller = request.user.seller
        serializer = SellerSerializer(seller)
        print(serializer.data)
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

        if serializer.is_valid():
            serializer.save(seller=request.user.seller)  
            return Response({'message': 'Product uploaded successfully!'}, status=201)
        
        return Response(serializer.errors, status=400)
    
class CustomerProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        customer = request.user.customer
        serializer = CustomerSerializer(customer)
        print(serializer.data)
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
            print(serializer.data)
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
                status='pending'
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
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Accounts(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    verified_at = models.DateTimeField(blank=True, null=True)
    role = models.CharField(max_length=10, choices=[('customer', 'Customer'), ('seller', 'Seller')])
    verification_token = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def __str__(self):
        return f"Account - {self.user.username}"

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    address1 = models.CharField(max_length=255)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    points = models.IntegerField(default=0)  

    def __str__(self):
        return f"Customer - {self.user.username}"

class Seller(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    company_name = models.CharField(max_length=255)
    company_address = models.TextField()
    phone_number = models.CharField(max_length=15)
    website = models.URLField(blank=True, null=True)
    credit_score = models.FloatField(default=0.0) 
    total_products = models.IntegerField(default=0)
    fake_flags = models.IntegerField(default=0) 
    is_blacklisted = models.BooleanField(default=False)

    def trust_rating(self):
        try:
            rating = max(0, 100 - (self.fake_flags * 5))
            return min(rating, 100)
        except:
            return 0

    def __str__(self):
        return f"Seller - {self.user.username}"

class Product(models.Model):
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField()
    price = models.FloatField()
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    # 🔍 Fake Detection Related
    is_fake = models.BooleanField(default=False)
    fake_flags = models.IntegerField(default=0)
    trust_score = models.IntegerField(default=100)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)
    
    # 🔗 External Metadata 
    external_link = models.URLField(blank=True, null=True)
    verified_source = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name} - {self.seller.company_name}"

    def update_trust_score(self):
        penalty = self.fake_flags * 10
        self.trust_score = max(0, 100 - penalty)
        self.save()

class Cart(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('paid', 'Paid'), ('shipped', 'Shipped'), ('cancelled', 'Cancelled')], default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class Payment(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50, choices=[('razorpay', 'Razorpay'), ('paypal', 'PayPal'), ('cod', 'Cash on Delivery')])
    payment_status = models.CharField(max_length=20, choices=[('success', 'Success'), ('failed', 'Failed'), ('pending', 'Pending')])
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    paid_at = models.DateTimeField(null=True, blank=True)

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    address_line = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class FlagLists(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    reason = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
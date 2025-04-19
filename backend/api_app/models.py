from django.db import models
from django.contrib.auth.models import User

class Accounts(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    role = models.CharField(max_length=10, choices=[('customer', 'Customer'), ('seller', 'Seller')])

    def __str__(self):
        return self.user.username
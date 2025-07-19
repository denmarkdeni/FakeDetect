"""
URL configuration for fakedetect project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api_app import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('verify-email/<uuid:token>/', views.VerifyEmailView.as_view(), name='verify_email'),

    path('api/register/', views.RegisterView.as_view(), name='register'),
    path('api/login/', views.LoginView.as_view(), name='login'),

    path('api/home/products/', views.HomePageView.as_view(), name='home-products'),
    path('api/home/reviews/', views.HomeReviewsView.as_view(), name='home_reviews'), 

    path('api/admin/dashboard/', views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('api/customer/dashboard/', views.CustomerDashboardView.as_view(), name='customer_dashboard'),
    path('api/seller/profile/', views.SellerProfileView.as_view(), name='seller-profile'),
    path('api/customer/profile/', views.CustomerProfileView.as_view(), name='customer-profile'),

    path('api/products/list/', views.ProductListView.as_view(), name='product-list'),
    path('api/seller/product/', views.ProductUploadView.as_view(), name='seller-product'),
    path('api/products/<int:pk>/', views.ProductDetailView.as_view(), name='product-detail'),

    path('api/add_to_cart/<int:pk>/', views.AddToCartView.as_view(), name='add_to_cart'),
    path('api/cart/', views.CartListView.as_view(), name='cart_list'),
    path('api/remove_cart/<int:pk>/', views.RemoveCartView.as_view(), name='remove_cart'),
    path('api/flag_product/<int:pk>/', views.FlagProductView.as_view(), name='flag_product'),

    path('api/payment/<int:pk>/', views.PaymentView.as_view(), name='payment'),

    path('api/my-orders/', views.MyOrdersView.as_view(), name='my_orders'),
    path('api/my-orders/<int:order_id>/review/', views.SubmitReviewView.as_view(), name='submit_review'),

    path('api/admin/users/', views.UserManagementView.as_view(), name='user_management'),
    path('api/admin/users/<int:user_id>/', views.UserDetailView.as_view(), name='user_detail'),
    path('api/admin/users/<int:user_id>/toggle/', views.UserManagementView.as_view(), name='toggle_user'),
    path('api/admin/products/', views.ProductManagementView.as_view(), name='product_management'),
    path('api/admin/products/<int:product_id>/', views.ProductManagementView.as_view(), name='product_action'),
    path('api/admin/flags/', views.FlagListView.as_view(), name='flag_list'),
    path('api/admin/flags/<int:flag_id>/', views.FlagListView.as_view(), name='flag_action'),

    path('api/vouchers/', views.VoucherListView.as_view(), name='voucher_list'),
    path('api/vouchers/<int:voucher_id>/redeem/', views.RedeemVoucherView.as_view(), name='redeem_voucher'),
    path('api/admin/vouchers/add/', views.VoucherAddView.as_view(), name='voucher_add'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
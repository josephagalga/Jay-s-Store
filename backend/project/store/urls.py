from django.urls import path
from .views import (
    # Auth Views
    MyTokenObtainPairView,
    RegisterCustomerView,
    RegisterDriverView,
    RegisterAdminView,
    
    # Shop Views
    ProductListCreateView,
    ProductDetailView,
    
    # Order Views
    OrderListCreateView,
    OrderDetailView,
    DriverStatsView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # --- 1. Authentication & Registration ---
    # The "Login" endpoint that returns your JWT token with the 'magic' role
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Endpoint to get a new Access Token using a Refresh Token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Registration "Doors"
    path('auth/register/customer/', RegisterCustomerView.as_view(), name='reg_customer'),
    path('auth/register/driver/', RegisterDriverView.as_view(), name='reg_driver'),
    path('auth/register/admin/', RegisterAdminView.as_view(), name='reg_admin'),

    # --- 2. Product Management ---
    # GET: View all clothes | POST: Admin adds new stock
    path('products/', ProductListCreateView.as_view(), name='product-list'),
    
    # GET: Single product | PATCH: Admin updates stock | DELETE: Admin removes item
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # --- 3. Orders & Logistics ---
    # GET: List orders (Role-filtered) | POST: Customer places order
    path('orders/', OrderListCreateView.as_view(), name='order-list'),
    
    # GET: Order details | PATCH: Driver updates status (e.g., to 'Delivered')
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('admin/driver-stats/', DriverStatsView.as_view(), name='driver-stats'),
    
]
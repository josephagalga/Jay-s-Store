from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Q
from .models import User, Product, Order
from .permissions import IsAdminUserRole # Assuming you saved the permission class here
from .serializers import (
    RegisterCustomerSerializer, 
    RegisterDriverSerializer, 
    RegisterAdminSerializer,
    ProductSerializer, 
    OrderSerializer, 
    MyTokenObtainPairSerializer
)
from django.utils import timezone
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response

# --- 1. AUTHENTICATION VIEWS ---

class MyTokenObtainPairView(TokenObtainPairView):
    """Login view that returns the custom token with user roles."""
    serializer_class = MyTokenObtainPairSerializer

class RegisterCustomerView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterCustomerSerializer
    permission_classes = [permissions.AllowAny]

class RegisterDriverView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterDriverSerializer
    permission_classes = [permissions.AllowAny] 

class RegisterAdminView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterAdminSerializer
    permission_classes = [permissions.AllowAny]


# --- 2. PRODUCT & STOCK VIEWS ---

class ProductListCreateView(generics.ListCreateAPIView):
    """
    GET: Anyone can see products.
    POST: Only Admin ('A') can add new products/stock.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAdminUserRole()]
        return [permissions.AllowAny()]

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET: Anyone can see details.
    PUT/PATCH/DELETE: Only Admin ('A') can edit stock or delete items.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [IsAdminUserRole()]
        return [permissions.AllowAny()]


# --- 3. ORDER & DELIVERY VIEWS ---


class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        if user.role == 'A':
            return Order.objects.all()
            
        if user.role == 'D':
            # Show orders assigned to this driver OR orders with no driver assigned yet
            return Order.objects.filter(Q(driver=user) | Q(driver__isnull=True))
            
        # Customers only see their own orders
        return Order.objects.filter(customer=user)

    def perform_create(self, serializer):
        """
        This method runs right before the record is saved to the database.
        It manually injects the current logged-in user into the 'customer' field.
        """
        serializer.save(customer=self.request.user)

class OrderDetailView(generics.RetrieveUpdateAPIView):
    """
    Used for updating order status (e.g., Driver marking 'Delivered').
    """
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        # Additional logic could go here to ensure only a Driver 
        # can change status to 'Delivered'
        return self.partial_update(request, *args, **kwargs)

    def perform_update(self, serializer):
        # This only affects Drivers claiming orders.
        # Customers and Admins are unaffected.
        if self.request.user.role == 'D':
            serializer.save(driver=self.request.user)
        else:
            serializer.save()


class DriverStatsView(APIView):
    permission_classes = [IsAdminUserRole] # Only Admins should see this

    def get(self, request):
        today = timezone.now().date()
        
        # We look for orders delivered TODAY
        stats = Order.objects.filter(
            status='D', 
            updated_at__date=today # Assumes you have an updated_at field
        ).values(
            'driver__username'
        ).annotate(
            delivery_count=Count('id')
        ).order_by('-delivery_count')

        return Response(stats)
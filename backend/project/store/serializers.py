from rest_framework import serializers
from .models import User, Product, Order, OrderItem
from django.db import transaction # Add this import at the top

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# --- 1. USER & AUTH SERIALIZERS ---

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'address', 'phone_number', 'role']



class RegisterDriverSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number', 'address']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data, role='D')

class RegisterAdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number', 'address']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data, role='A')

class RegisterCustomerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'phone_number', 'address']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data, role='C')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['role'] = user.role 
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['username'] = self.user.username
        return data

# --- 2. SHOPPING SERIALIZERS ---

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'stock', 'size', 'image']

class OrderItemSerializer(serializers.ModelSerializer):
    # This "nests" the product info so React gets the name/image
    product_details = ProductSerializer(source='product', read_only=True)
    price_at_purchase = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['product', 'product_details', 'quantity', 'price_at_purchase']


class OrderSerializer(serializers.ModelSerializer):
    # Set required=False so we can update status/driver without re-sending all items
    items = OrderItemSerializer(many=True, required=False) 
    customer_details = UserSerializer(source='customer', read_only=True)
    total_price = serializers.ReadOnlyField() 

    class Meta:
        model = Order
        fields = [
            'id', 
            'customer', 
            'customer_details', 
            'driver', # 1. ADDED DRIVER FIELD
            'items', 
            'total_price', 
            'status', 
            'created_at',
            'updated_at',
        ]
        # 2. REMOVED 'status' FROM THIS LIST
        read_only_fields = ['customer', 'created_at'] 

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            running_total = 0
            
            for item in items_data:
                product = item['product']
                qty = item['quantity']
                
                if product.stock < qty:
                    raise serializers.ValidationError({
                        "items": f"Not enough stock for {product.name}."
                    })

                product.stock -= qty
                product.save()

                price = product.price
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=qty,
                    price_at_purchase=price
                )
                running_total += (price * qty)
            
            order.total_price = running_total
            order.save()
            return order
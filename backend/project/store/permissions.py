from rest_framework import permissions

class IsAdminUserRole(permissions.BasePermission):
    
    def has_permission(self, request, view):
        # Check if user is logged in and if their role is 'A'
        return bool(request.user and request.user.is_authenticated and request.user.role == 'A')

class IsDriver(permissions.BasePermission):
    def has_permission(self, request, view):
        # This lets Drivers AND Admins in
        return request.user.is_authenticated and request.user.role in ['A','D']

class IsCustomer(permissions.BasePermission):
    def has_permission(self, request, view):
        # This lets Customers AND Admins in
        return request.user.is_authenticated and request.user.role in ['C'] 

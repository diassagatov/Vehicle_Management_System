from rest_framework import permissions

class IsDriver(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and is a Driver
        return request.user.is_authenticated and request.user.position == 'Driver'

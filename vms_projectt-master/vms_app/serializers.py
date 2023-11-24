from rest_framework import serializers, exceptions
from .models import AuctionVehicle, FuelingRecord, MaintenanceJob, User, Vehicle, FuelRequest, MaintRequest, Route, Driver

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'middle_name', 'last_name', 'password', 'email', 'gov_id', 'phone', 'address', 'position']

    def create(self, validated_data):
        # Access the request object
        request = self.context.get('request')

        # Check if the request user's position is 'Administration Staff'
        if not request.user.position == 'Administration Staff':
            raise exceptions.PermissionDenied("Only Administration Staff can register new users.")

        # Rest of the registration logic
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gov_id=validated_data['gov_id'],
            phone=validated_data['phone'],
            address=validated_data['address'],
            position=validated_data['position'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class FuelRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelRequest
        fields = '__all__'

class MaintRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintRequest
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = '__all__'

class AuctionVehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionVehicle
        fields = '__all__'

class MaintenanceJobSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceJob
        fields = '__all__'

class FuelingRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelingRecord
        fields = '__all__'



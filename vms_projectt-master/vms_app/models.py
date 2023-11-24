from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager,PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not first_name:
            raise ValueError('Users must have a first name')
        if not last_name:
            raise ValueError('Users must have a last name')
        if not password:
            raise ValueError('Users must have a password')

        user = self.model(
            email=self.normalize_email(email),
            password=password,
            first_name=first_name,
            last_name=last_name,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, first_name, last_name, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    gov_id = models.CharField(max_length=100, unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    position_choices = [
        ('Driver', 'Driver'),
        ('Administration Staff', 'Administration Staff'),
        ('Fueling Person', 'Fueling Person'),
        ('Maintenance Person', 'Maintenance Person'),
    ]
    position = models.CharField(max_length=20, choices=position_choices)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

class Vehicle(models.Model):
    VEHICLE_ID = models.AutoField(primary_key=True)
    MAKE = models.CharField(max_length=50)
    MODEL = models.CharField(max_length=50)
    YEAR = models.IntegerField()
    LIC_PLATE = models.CharField(max_length=20, unique=True)
    TYPE = models.CharField(max_length=50)
    MILEAGE = models.FloatField()
    USED_TIME = models.DurationField()
    SITTING_CAP = models.IntegerField()
    PRICE = models.DecimalField(max_digits=10, decimal_places=2)

class FuelRequest(models.Model):
    REG_ID = models.AutoField(primary_key=True)
    DRIVER_ID = models.ForeignKey(User, on_delete=models.CASCADE)
    VEHICLE_ID = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    STATUS = models.CharField(max_length=50)

class MaintRequest(models.Model):   
    VEHICLE_ID = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    DRIVER_ID = models.ForeignKey(User, on_delete=models.CASCADE)
    STATUS = models.CharField(max_length=50)

class Route(models.Model):
    ROUTE_ID = models.AutoField(primary_key=True)
    START_TIME = models.DateTimeField()
    FINISH_TIME = models.DateTimeField()
    START_LOC = models.CharField(max_length=100)
    FINISH_LOC = models.CharField(max_length=100)
    DRIVER_ID = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    VEHICLE_ID = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    DISTANCE = models.FloatField()
    PURPOSE = models.TextField()
    STATUS = models.CharField(max_length=50)

#TypeError: SET_NULL() missing 4 required positional arguments: 'collector', 'field', 'sub_objs', and 'using solve

class Driver(models.Model):
    DRIVER_ID = models.ForeignKey(User, on_delete=models.CASCADE)
    VEHICLE_ID = models.ForeignKey(Vehicle, on_delete=models.CASCADE)

class AuctionVehicle(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    status = models.CharField(max_length=50)
    description = models.TextField()
    starting_bid = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.make} {self.model} {self.year}"

class MaintenanceJob(models.Model):
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    mileage = models.FloatField()
    plate_number = models.CharField(max_length=20)
    job_description = models.TextField()
    status_choices = [('Active', 'Active'), ('Non-Active', 'Non-Active')]
    status = models.CharField(max_length=20, choices=status_choices)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    replaced_part_image = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.vehicle} - {self.plate_number}"


class FuelingRecord(models.Model):
    vehicle = models.ForeignKey('Vehicle', on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    driver = models.ForeignKey('User', on_delete=models.CASCADE)
    amount_of_fuel = models.FloatField()
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    gas_station_name = models.CharField(max_length=100)
    fueling_person_name = models.CharField(max_length=100)
    before_image = models.CharField(max_length=50)
    after_image = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.vehicle} - {self.date_time}"

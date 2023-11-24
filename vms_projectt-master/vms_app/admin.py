from django.contrib import admin
from .models import AuctionVehicle, FuelingRecord, MaintenanceJob, User, Vehicle, FuelRequest, MaintRequest, Route, Driver

admin.site.register(User)
admin.site.register(Vehicle)
admin.site.register(FuelRequest)
admin.site.register(MaintRequest)
admin.site.register(Route)
admin.site.register(Driver)
@admin.register(AuctionVehicle)
class AuctionVehicleAdmin(admin.ModelAdmin):
    list_display = ('make', 'model', 'year', 'status', 'starting_bid')

@admin.register(MaintenanceJob)
class MaintenanceJobAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'date_time', 'plate_number', 'status', 'total_cost')

@admin.register(FuelingRecord)
class FuelingRecordAdmin(admin.ModelAdmin):
    list_display = ('vehicle', 'date_time', 'driver', 'total_cost')


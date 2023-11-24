from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (AuctionVehicleViewSet, FuelingRecordViewSet, MaintenanceJobViewSet, UserViewSet, VehicleViewSet, FuelRequestViewSet,
                    MaintRequestViewSet, RouteViewSet, DriverViewSet, GetUserByTokenView)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'fuelrequests', FuelRequestViewSet)
router.register(r'maintrequests', MaintRequestViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'drivers', DriverViewSet)
router.register(r'auctionvehicles', AuctionVehicleViewSet)
router.register(r'maintenancejobs', MaintenanceJobViewSet)
router.register(r'fuelingrecords', FuelingRecordViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('users/gov_id/<str:gov_id>/', UserViewSet.as_view({'get': 'retrieve_by_gov_id'})),
    path('user_by_token/', GetUserByTokenView.as_view(), name='user-by-token'),
]

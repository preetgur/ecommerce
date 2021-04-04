from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
   
)

urlpatterns = [
    path('',views.home , name='home'),
    path('getProducts/',views.getProducts,name="getProducts"),
    path('getProduct/<str:pk>/',views.getProduct,name="getProduct"),

    path('api/user/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
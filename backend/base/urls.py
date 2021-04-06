from django.urls import path
from . import views


urlpatterns = [
    path('',views.home , name='home'),
    path('api/user/register',views.registerUser , name='register'),

    path('getProducts/',views.getProducts,name="getProducts"),
    path('getProduct/<str:pk>/',views.getProduct,name="getProduct"),

    path('api/user/login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/profile/',views.userProfile,name="userProfile"),
    path('api/users/',views.getUsers,name="getUsers"),


]
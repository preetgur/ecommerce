from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('',views.getUsers,name="getUsers"), 
    path('register',views.registerUser , name='register'),

    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.userProfile,name="userProfile"), 
    path('profile/update', views.updateUserProfile, name="updateUserProfile"),



]

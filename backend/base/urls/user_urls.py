from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('',views.getUsers,name="getUsers"), 
    path('register',views.registerUser , name='register'),

    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/',views.userProfile,name="userProfile"), 
    path('profile/update', views.updateUserProfile, name="updateUserProfile"),
    path('delete/<str:pk>', views.deleteUser, name="delete-user"), 

    path('update/<str:pk>', views.updateUserAdmin, name="update-user-admin"), 
    path('<str:pk>', views.getUserByAdmin, name="get-user-by-admin"), 




]

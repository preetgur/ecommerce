from django.urls import path
from base.views import product_views as views


urlpatterns = [
   
    path('',views.getProducts,name="getProducts"),
    path('create/',views.createProduct,name="createProduct"),

    path('delete/<str:pk>/',views.deleteProduct,name="deleteProduct"),
    path('update/<str:pk>/',views.updateProduct,name="updateProduct"),
    path('<str:pk>/',views.getProduct,name="getProduct"),


]
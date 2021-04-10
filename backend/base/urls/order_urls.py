from django.urls import path
from base.views import order_views as view


urlpatterns = [
    path('shipping',view.shipping,name="shipping"),
]
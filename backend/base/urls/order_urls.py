from django.urls import path
from base.views import order_views as view


urlpatterns = [
    path('shipping',view.shipping,name="shipping"),
    path('addorderItem',view.addOrderItem,name="add-order-item") ,
    path('myorders',view.getMyOrders,name="get-my-orders") ,

    # dynamic url should be at the bottom otherwise it may give error
    path("<str:pk>/",view.getOrderById,name="get-order-by-id") ,
    path("<str:pk>/pay/",view.updateOrderToPaid,name="update-order-to-paid") ,

]
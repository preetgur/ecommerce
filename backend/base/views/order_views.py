from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response 
from base.models import ShippingAddress,Order,OrderItem,Product
from base.serializers import ShippingAddressSerializer,OrderSerializer,OrderItemSerializer
from rest_framework import status
from datetime import datetime

@api_view(['GET'])
def orderItemImage(request,pk):
    order = OrderItem.objects.get(_id=pk)
    pro = Product.objects.get(_id=pk)
    print("pro ##### ",pro.image.url)
    if order : 
        serialzier = OrderItemSerializer(order,many=False)
        return Response(serialzier.data)

    return Response({"details" : "some error occured"})

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def shipping(request):
    
    user = request.user
    data = request.data

    print("data ... ",request.data)
    ship = ShippingAddress.objects.create(
        country = data['country'],
        city = data['city'],
        postalCode = data['postalCode'],
        address = data['address']
    )

    serializer = ShippingAddressSerializer(ship)

    if serializer.is_valid():

        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def addOrderItem(request):

    user = request.user
    data = request.data
    print("###### data .. ",request.data)

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({"details":"No order items"}, status =status.HTTP_400_BAD_REQUEST )

    else :
        # 1) create order     

        order = Order.objects.create(user = user,
        paymentMethod= data['paymentMethod'],
        taxPrice = data['taxPrice'],
        shippingPrice = data['shippingPrice'],
        totalPrice = data['totalPrice'])

        # 2) create shipping 
        shipping = ShippingAddress.objects.create(
            order=order,
            address = data['shippingAddress']['address'],
            city = data['shippingAddress']['city'],
            country = data['shippingAddress']['country'],
            postalCode = data['shippingAddress']['postalCode'],
            shippingPrice = data['shippingPrice']

            )

        # 3) create orderitem    
        
        for i in orderItems:
            product = Product.objects.get(_id = i['product'])

            orderItem = OrderItem.objects.create(
                product = product,
                order = order,
                name = product.name,
                qty = i['qty'],
                price = i['price'],
                image = product.image.url
            )

            print("ordreitem $$$$$$$$$$ ",orderItem.image)
            # update stock
            product.countInStock -= int(orderItem.qty)
            product.save()

        serializer = OrderSerializer(order,many=False)

        print("Ordre Serialzier @1!!!!!!!!!!!!! ",serializer.data)
    return Response(serializer.data)

    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def getOrderById(request,pk):

    try :
        user  = request.user
        order = Order.objects.get(_id =pk)
        
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)

        else : 
            return Response({"details" : "Not authorized to view this order" },status = status.HTTP_400_BAD_REQUEST)    

    except :

            return  Response({"details" : "Order dosn't exists " },status = status.HTTP_400_BAD_REQUEST)     

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):

    order = Order.objects.get(_id = pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was Paid ")


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):

    user = request.user
    order = user.order_set.all()
    serializer = OrderSerializer(order,many=True)

    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrders(request):

    order = Order.objects.all()
    serializer = OrderSerializer(order,many=True)

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request,pk):

    order = Order.objects.get(_id = pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response("Order was Delivered ")    
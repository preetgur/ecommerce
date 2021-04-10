from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from base.models import ShippingAddress
from base.serializers import ShippingAddressSerializer

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

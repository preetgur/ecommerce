from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from .models import Product
# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    # overrides the validate method
   def validate(self,attrs):
   
       data = super().validate(attrs)

       # get username and email when user login
    #    data['username'] = self.user.username
    #    data['email'] = self.user.email

       serializer = UserSerializerWithToken(self.user).data
       for k,v in serializer.items():
           data[k] = v
       
       return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

def home(request):

   return JsonResponse('hello',safe=False) 

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serialzer = ProductSerializer(products,many=True) 

   
    return Response(serialzer.data)

@api_view(['GET'])
def getProduct(request,pk):

    product = Product.objects.get(_id = pk)
    serialzer = ProductSerializer(product,many=False) 

    # product = None
    # for i in products:
    #    if  i["_id"] == pk:
    #        product = i
    #        break
   
    return Response(serialzer.data)    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):

    user = request.user
    serialzer = UserSerializer(user,many=False) 

   
    return Response(serialzer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):

    user = User.objects.all()
    serialzer = UserSerializer(user,many=True) 

    return Response(serialzer.data)

@api_view(['POST'])
def registerUser(request):

    data = request.data
    try :

        user = User.objects.create(
            first_name = data['name'],
            username = data['email'],
            email    = data['email'],
            password = make_password(data['password'])

        )

        serializer = UserSerializerWithToken(user)

        return Response(serializer.data)

    except : 
        message = { "details " : "User with this email is already exists"}
        return Response(message,status= status.HTTP_400_BAD_REQUEST)    
from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from .models import Product
# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

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
def userProfile(request):

    user = request.user
    serialzer = UserSerializer(user,many=False) 

   
    return Response(serialzer.data)

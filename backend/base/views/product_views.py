from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from base.serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from base.models import Product
# Create your views here.

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status

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


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    product = Product.objects.get(_id =pk)
    product.delete()

    return Response("Product was Deleted")


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request,pk):

    data = request.data
    print("update product ..",data)
    product = Product.objects.get(_id =pk)
    
    product.name = data['name']
    product.price = data['price']
    product.category = data['category']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.description = data['description']

    product.save()  # save before serialize the data 
    serializer = ProductSerializer(product,many=False)
  
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request,pk):

    try :
        data = request.data
        print("create product ..",data)
        product = Prodcut.objects.create(
            user = request.user,
            name=data['name'],
            price = data['price'],
            category = data['category'],
            brand = data['category'],
            countInStock = data['countInStock'],
            description = data['description'],
            numReviews = data['reviews'],
            rating = data['rating'],   
        )

        product.save()  # save before serialize the data 
        serializer = ProductSerializer(product,many=False)
        return Response(serializer.data)

    except:
        return Response("some error ocuured")    


# update the product image
@api_view(['POST'])
def uploadImage(request):

    data = request.data
    product_id = data['product_id']

    product = Product.objects.get(_id =product_id)
    product.image = request.FILES.get('image')
    product.save()

    return Response("Image was uploaded")

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from base.serializers import ProductSerializer, UserSerializer,UserSerializerWithToken
from base.models import Product,Reviews
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


@api_view(['POST'])
@permission_classes([IsAuthenticated] )
def createProductReview(request,pk):

    user = request.user
    data = request.data

    product = Product.objects.get(_id=pk)
    print("product #### ",product)
    # If review is already exits by user

    alreadyExists = product.reviews_set.filter(user = user).exists()
    print("review already #### ",alreadyExists)
    if alreadyExists :
        content = {"details" : "Review already exists"}
        return Response(content,status= status.HTTP_400_BAD_REQUEST)

    # if  no rating  or 0    
    
    elif data['rating'] == 0 :
        content = {"details" : "Please select the rating for product"}
        return Response(content,status= status.HTTP_400_BAD_REQUEST)

    # create review

    else :
        review = Reviews.objects.create( 
            user = user,
            product = product,
            rating = data['rating'],
            name = user.first_name,
            comment = data['comment']
        )    

        total_reviews = product.reviews_set.all()
        product.numReviews = len(total_reviews)

        total_rating = 0

        for i in total_reviews:
            total_rating += i.rating

        product.rating  = total_rating / len(total_reviews)
        product.save()

        return Response("Review Added")    
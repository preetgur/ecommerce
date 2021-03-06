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
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

@api_view(['GET'])
def getProducts(request):

    query = request.query_params.get('keyword')

    print("query ### ",query)
    if query == None:
        query = ""

    # if the query is empty the filter showcase all the data
    products = Product.objects.filter(name__icontains=query)

    # get page from queryParams
    page = request.query_params.get('page')
    print("page from query_params ..",page)
    # Show 2 products per page.
    paginator = Paginator(products,5) 
    
    try:
        products = paginator.page(page)
    except PageNotAnInteger: # if page is not sent from frontend then go to first page
        products = paginator.page(1)
    except EmptyPage: # if we have 6 pages and user want to go to the 9 page then redirect the user to last page
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)    
    serialzer = ProductSerializer(products,many=True) 
    
   
    return Response({"products":serialzer.data, "page":page,"pages":paginator.num_pages})


@api_view(['GET'])
def topProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('rating')[:4]

    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

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
# concept is create dummy Product onClick and then redirect the user to Edit page.

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)



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
        content = {"detail" : "You already give the review about this product."}
        return Response(content,status= status.HTTP_400_BAD_REQUEST)

    # if  no rating  or 0    
    
    elif data['rating'] == 0 :
        content = {"detail" : "Please select the rating for product"}
        return Response(content,status= status.HTTP_400_BAD_REQUEST)

    # create review

    else :
        print("### user firstname .. ",user.first_name,user.email)
        review = Reviews.objects.create( 
            user = user,
            product = product,
            rating = data['rating'],
            name = user.email,
            comment = data['comment']
        )    

        product_reviews = product.reviews_set.all()
        product.numReviews = len(product_reviews)

        total_rating = 0

        for i in product_reviews:
            total_rating += i.rating

        product.rating  = total_rating / len(product_reviews)
        product.save()

        return Response("Review Added")    

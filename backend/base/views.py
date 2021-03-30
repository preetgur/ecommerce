from django.shortcuts import render
from django.http import JsonResponse
from .products import products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product
# Create your views here.

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
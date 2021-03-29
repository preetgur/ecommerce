from django.shortcuts import render
from django.http import JsonResponse
from .products import products
# Create your views here.

def home(request):

   return JsonResponse('hello',safe=False) 


def getProducts(request):
   
    return JsonResponse({"pr":products},safe=True)
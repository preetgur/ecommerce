from django.shortcuts import render

from rest_framework.decorators import api_view,permission_classes 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.response import Response
from base.serializers import  UserSerializer,UserSerializerWithToken
from base.models import Product

from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password
from rest_framework import status
# Create your views here.


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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):

    user = request.user
    serialzer = UserSerializer(user,many=False) 

   
    return Response(serialzer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):

    user = request.user
    serialzer = UserSerializerWithToken(user,many=False) 
    data = request.data

    print('data .. ',data)
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']

    if data['password'] != "":
        user.password = make_password(data['password'])

    user.save()
    return Response(serialzer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):

    user = User.objects.get(id = pk)

    if user:
        user.delete()
        return Response("User was deleted")

    return Response("some error occured")
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    # customize field
    name = serializers.SerializerMethodField(read_only=True) 
    # rename the id fields because in frontend we have "_id" as product id
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)


    class Meta:
        model = User
        fields = ['id','_id','username','email','last_login','name','isAdmin']


    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
            return obj.is_staff
    # get fullname
    def get_name(self,obj):
        name = obj.first_name + obj.last_name

        if name == '':
            name = obj.email

        return name    


# Extend the UserSerializer

class UserSerializerWithToken(UserSerializer):

    token = serializers.SerializerMethodField(read_only=True) 

    class Meta:
        model = User
        fields = ['id','_id','username','email','last_login','name','isAdmin','token']


    def get_token(self,obj):

        token = RefreshToken.for_user(obj)

        return str(token.access_token)
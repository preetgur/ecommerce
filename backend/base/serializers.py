from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response 

class ReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reviews
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self,obj):
        reviews = obj.reviews_set.all()    
        serializer = ReviewSerializer(reviews,many=True)
        return serializer.data

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


class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta :
        model = ShippingAddress
        fields = "__all__"

 
class OrderItemSerializer(serializers.ModelSerializer):

    class Meta :
        model = OrderItem
        fields = "__all__" 

class OrderSerializer(serializers.ModelSerializer):

    order = serializers.SerializerMethodField(read_only=True) 
    shippingAddress = serializers.SerializerMethodField(read_only=True) 
    user = serializers.SerializerMethodField(read_only=True) 


    class Meta :
        model = Order
        fields = "__all__" 

    def get_order(self,obj):

        item = obj.orderitem_set.all()    # OrderItem has "Fk" realtionship with "Order" model
        serializer = OrderItemSerializer(item,many=True) 
        return serializer.data

    def get_shippingAddress(self,obj):

        try :

            # ShippiingAddress has "oneToOne" realtionship with "Order" model
            address = ShippingAddressSerializer(obj.shippingaddress,many=False).data 
            
        except : 
            address = False

        return address    

    def get_user(self,obj):

        user = obj.user     
        serializer = UserSerializer(user,many=False) 
        return serializer.data    
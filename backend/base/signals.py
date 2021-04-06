from django.contrib.auth.models import User
from django.db.models.signals import pre_save

def updateUser(sender,instance,**kwargs):
    print("signals sender ... ",sender,)
    print("signals instance ... ",instance)
    print("signals kwargs ... ",kwargs)


    user = instance
    
    if user.email != "":
        user.username = user.email


pre_save.connect(updateUser,sender=User)
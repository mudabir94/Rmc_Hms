from django.db import models
from django.db.models import CharField, Model
from django.contrib.auth.models import AbstractUser
import datetime
# Syringe, Tablet
class medicineType(models.Model):
    medicine_type_name=models.CharField(max_length=45)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return self.medicine_type_name
    class Meta:
        verbose_name_plural="Medicine Type"
        ordering=['pk']
# General Detail of medicines. 
# e.g. Med name, Company name and other gen tags
class medicineItems(models.Model):
    medicine_type_id = models.ForeignKey(medicineType, on_delete=models.CASCADE,default=None,null=True)
    medicine_details=models.CharField(max_length=45)   
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        verbose_name_plural="Medicine Items"
        ordering=['pk'] 

# General Categorization of category
class Category(models.Model):
    category_name = models.CharField(max_length=45)   
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
  
    class Meta:
        verbose_name_plural="Catergory"
        ordering=['pk']
 # prescription and non-prescription// 
class medicineCategory(models.Model):
    category_type_id=models.ForeignKey(Category, on_delete=models.CASCADE,default=None,null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
   
    class Meta:
        verbose_name_plural="Medicine Category"
        ordering=['pk']

class medicineStorage(models.Model):
    medicine_item_id=models.ForeignKey(medicineItems, on_delete=models.CASCADE,default=None,null=True)
    quantity=models.IntegerField(default=10, null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
   
    class Meta:
        verbose_name_plural="Medicine Storage"
        ordering=['pk']
class despensoryStorage(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
   
    class Meta:
        verbose_name_plural="Despensory Storage"
        ordering=['pk']

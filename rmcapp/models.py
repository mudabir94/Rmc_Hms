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
class packageType(models.Model):
    package_name=models.CharField(max_length=45)  
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return self.package_name
    class Meta:
        verbose_name_plural="Package Type"
        ordering=['pk']
# General Detail of medicines. 
# e.g. Med name, Company name and other gen tags

class Medicine(models.Model):
    medicine_type_id = models.ForeignKey(medicineType, on_delete=models.CASCADE,default=None,null=True)
    
    medicine_name=models.CharField(max_length=45)
    weight=models.IntegerField(default=None,null=True, blank=True)
    litre=models.CharField(max_length=45,default=None,null=True,blank=True)

    medicine_details=models.CharField(max_length=45)   
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Medicine"
        ordering=['pk'] 

# General Categorization of category
class Category(models.Model):
    category_name = models.CharField(max_length=45)   
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return self.category_name
    class Meta:
        verbose_name_plural="Catergory"
        ordering=['pk']
 # prescription and non-prescription// 
class medicineCategory(models.Model):
    category_type_id=models.ForeignKey(Category, on_delete=models.CASCADE,default=None,null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    # def __str__(self):
    #     return self.category_type_id
    class Meta:
        verbose_name_plural="Medicine Category"
        ordering=['pk']

class medicineWarehouseStock(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    purchase_rate=models.FloatField(default=0.00, null=True, blank=True)
    # quantity=models.IntegerField(default=10, null=True, blank=True)
    carton_unit=models.IntegerField( null=True, blank=True)
    box_unit=models.IntegerField( null=True, blank=True)
    strip_unit=models.IntegerField( null=True, blank=True)
    piece_unit=models.IntegerField( null=True, blank=True)
    carton_stored=models.IntegerField(null=True, blank=True)
    box_stored=models.IntegerField(null=True, blank=True)
    strip_stored=models.IntegerField( null=True, blank=True)
    piece_stored=models.IntegerField( null=True, blank=True)
    carton_price_unit=models.FloatField( null=True, blank=True)
    box_price_unit=models.FloatField( null=True, blank=True)
    strip_price_unit=models.FloatField( null=True, blank=True)
    piece_price_unit=models.FloatField( null=True, blank=True)
    manufac_date=models.DateTimeField(blank=True,null=True)

    exp_date=models.DateTimeField(blank=True,null=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Medicine WareHouse Stock"
        ordering=['pk']
class medicineWhStockHistory(models.Model):
    medicine_wh_stock=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    purchase_rate=models.FloatField(default=0.00, null=True, blank=True)
    # quantity=models.IntegerField(default=10, null=True, blank=True)
    carton_unit=models.IntegerField( null=True, blank=True)
    box_unit=models.IntegerField( null=True, blank=True)
    strip_unit=models.IntegerField( null=True, blank=True)
    piece_unit=models.IntegerField( null=True, blank=True)
    carton_stored=models.IntegerField(null=True, blank=True)
    box_stored=models.IntegerField(null=True, blank=True)
    strip_stored=models.IntegerField( null=True, blank=True)
    piece_stored=models.IntegerField( null=True, blank=True)
    carton_price_unit=models.FloatField( null=True, blank=True)
    box_price_unit=models.FloatField( null=True, blank=True)
    strip_price_unit=models.FloatField( null=True, blank=True)
    piece_price_unit=models.FloatField( null=True, blank=True)
    exp_date=models.DateTimeField(blank=True,null=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        verbose_name_plural="Medicine WareHouse Stock History"
        ordering=['pk']


class medicineBatches(models.Model):
    batch_no=models.CharField(max_length=45)
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    medicine_strg=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        verbose_name_plural="medicineBatches"
        ordering=['pk']
class tt_MedicineMedWhStock(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    mwhs=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    # user=models.ForeignKey(User)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        verbose_name_plural="TrasactionTable Medicine-Med WareHouse Stock"
        ordering=['pk']

class tt_tempMedWhStk_Med(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    batch_no=models.IntegerField(blank=True,null=True)

    purchase_rate=models.FloatField(default=0.00, null=True, blank=True)
    # quantity=models.IntegerField(default=10, null=True, blank=True)
    carton_unit=models.IntegerField( null=True, blank=True)
    box_unit=models.IntegerField( null=True, blank=True)
    strip_unit=models.IntegerField( null=True, blank=True)
    piece_unit=models.IntegerField( null=True, blank=True)
    carton_stored=models.IntegerField(null=True, blank=True)
    box_stored=models.IntegerField(null=True, blank=True)
    strip_stored=models.IntegerField( null=True, blank=True)
    piece_stored=models.IntegerField( null=True, blank=True)
    carton_price_unit=models.FloatField( null=True, blank=True)
    box_price_unit=models.FloatField( null=True, blank=True)
    strip_price_unit=models.FloatField( null=True, blank=True)
    piece_price_unit=models.FloatField( null=True, blank=True)
    exp_date=models.DateTimeField(blank=True,null=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    class Meta:
        verbose_name_plural="TrasactionTable Temp MedWareHouseStock-Medicine"
        ordering=['pk']
class despensoryStock(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    medicine_strg=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    carton_unit=models.IntegerField( null=True, blank=True)
    box_unit=models.IntegerField( null=True, blank=True)
    strip_unit=models.IntegerField( null=True, blank=True)
    piece_unit=models.IntegerField( null=True, blank=True)
    carton_stored=models.IntegerField(null=True, blank=True)
    box_stored=models.IntegerField(null=True, blank=True)
    strip_stored=models.IntegerField( null=True, blank=True)
    piece_stored=models.IntegerField( null=True, blank=True)
    carton_price_unit=models.FloatField( null=True, blank=True)
    box_price_unit=models.FloatField( null=True, blank=True)
    strip_price_unit=models.FloatField( null=True, blank=True)
    piece_price_unit=models.FloatField( null=True, blank=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Despensory Stock"
        ordering=['pk']
class despensoryStockHistory(models.Model):
    desp_stock=models.ForeignKey(despensoryStock, on_delete=models.CASCADE,default=None,null=True)
    medicine_strg=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    carton_unit=models.IntegerField( null=True, blank=True)
    box_unit=models.IntegerField( null=True, blank=True)
    strip_unit=models.IntegerField( null=True, blank=True)
    piece_unit=models.IntegerField( null=True, blank=True)
    carton_stored=models.IntegerField(null=True, blank=True)
    box_stored=models.IntegerField(null=True, blank=True)
    strip_stored=models.IntegerField( null=True, blank=True)
    piece_stored=models.IntegerField( null=True, blank=True)
    carton_price_unit=models.FloatField( null=True, blank=True)
    box_price_unit=models.FloatField( null=True, blank=True)
    strip_price_unit=models.FloatField( null=True, blank=True)
    piece_price_unit=models.FloatField( null=True, blank=True)
    status=models.CharField(max_length=45,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Despensory Stock History"
        ordering=['pk']
class tt_Medicine_DespensoryStock(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    desp_stock=models.ForeignKey(despensoryStock, on_delete=models.CASCADE,default=None,null=True)
    medicine_strg=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    class Meta:
        verbose_name_plural="TrasactionTable MedWareHouseStock-MedDespStock"
        ordering=['pk']
    # user





from django.db import models
from django.db.models import CharField, Model
from django.contrib.auth.models import AbstractUser
from django_mysql.models import ListCharField

import datetime
# Syringe, Tablet

# Create your models here.

class Role(models.Model):
    
    role_name=models.CharField(max_length=45)
 
    def __str__(self):
        return self.role_name
    class Meta:
        verbose_name_plural="Role"
        ordering=['pk']
class User(AbstractUser):
    
    role = models.ForeignKey(Role, on_delete=models.CASCADE,default=None,null=True)
    def __str__(self):
        userStr =self.username
        return userStr
    
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
    add_charge=models.CharField(max_length=45,null=True,blank=True,default="No") 
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
    sell_piece_price_unit=models.FloatField( null=True, blank=True,default=None)

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
    box_stored=models.FloatField(null=True, blank=True)
    strip_stored=models.FloatField( null=True, blank=True)
    piece_stored=models.FloatField( null=True, blank=True)
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

class despensoryMedincineBatch(models.Model):
    desp=models.ForeignKey(despensoryStock, on_delete=models.CASCADE,default=None,null=True)
    medwh_stock=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    status=models.CharField(max_length=45,null=True,blank=True)
    batch=models.IntegerField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Despensory Medicine Batch"
        ordering=['pk']

    

class tempDespensoryStock(models.Model):
    medicinewh_stock=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
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
    batch_no=models.IntegerField( null=True, blank=True)
    # def __str__(self):
    #     return str(self.id)
    class Meta:
        verbose_name_plural="Temporary Despensory Stock"
        ordering=['pk']
    


class tt_Medicine_DespensoryStock(models.Model):
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    desp_stock=models.ForeignKey(despensoryStock, on_delete=models.CASCADE,default=None,null=True)
    medicine_strg=models.ForeignKey(medicineWarehouseStock, on_delete=models.CASCADE,default=None,null=True)
    class Meta:
        verbose_name_plural="TrasactionTable MedWareHouseStock-MedDespStock"
        ordering=['pk']
    # user

class Patient(models.Model):
    pat_name=models.CharField(max_length=45,null=True,blank=True)
    phone_no=models.CharField(max_length=40,null=True,blank=True)
    gender=models.CharField(max_length=40,null=True,blank=True)
    guardian=models.CharField(max_length=50,null=True,blank=True)
    dob=models.DateField(null=True,blank=True)
    address=models.CharField(max_length=300,null=True,blank=True)
    email_address=models.CharField(max_length=30,null=True,blank=True)
    bloodgroup=models.CharField(max_length=30,null=True,blank=True)
    age=models.IntegerField(null=True,blank=True)
    cnic=models.CharField(max_length=20,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.pat_name)
    class Meta:
        verbose_name_plural="Patient"
        ordering=['pk']
    
class employeeType(models.Model):
    type_name=models.CharField(max_length=50,null=True,blank=True)
    def __str__(self):
        return str(self.type_name)
    class Meta:
        verbose_name_plural="Employee Type"
        ordering=['pk']


class Employee(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE,default=None,null=True)
    name=models.CharField(max_length=50,null=True,blank=True)
    dob=models.DateField(null=True,blank=True)
    gender=models.CharField(max_length=20,null=True,blank=True)
    phone_no=models.CharField(max_length=20,null=True,blank=True)
    address=models.CharField(max_length=300,null=True,blank=True)
    qualification=models.CharField(max_length=300,null=True,blank=True)
    email_address=models.CharField(max_length=60,null=True,blank=True)
    cnic=models.CharField(max_length=20,null=True,blank=True)
    employee_type=models.ForeignKey(employeeType, on_delete=models.CASCADE,default=None,null=True)
    def __str__(self):
        return str(self.name)
    class Meta:
        verbose_name_plural="Employee"
        ordering=['pk']



class patientType(models.Model):
    patient_type=models.CharField(max_length=50,null=True,blank=True)
    charges=models.IntegerField(null=True,blank=True)
    def __str__(self):
        return str(self.patient_type)
    class Meta:
        verbose_name_plural="Patient Type"
        ordering=['pk']



class patPrescriptionRecords(models.Model):
    
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    patient_type=models.ForeignKey(patientType, on_delete=models.CASCADE,default=None,null=True,blank=True)
    doc=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
    sign_symtoms=models.TextField(default="-",null=True,blank=True)
    provisional_diagnosis=models.TextField(default="-",null=True,blank=True)
    investigation=models.TextField(default="-",null=True,blank=True)
    diagnosis=models.TextField(default="-",null=True,blank=True)
    vitals=models.CharField(max_length=50,default="-",null=True,blank=True)
    rx=models.TextField(default="-",null=True,blank=True)
    admit_reason=models.CharField(max_length=200,default="-",null=True,blank=True)
    date_visited = models.DateTimeField(default=None,null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Patient Prescription Records"
        ordering=['pk']


class tokenGenerator(models.Model):
    token_no=models.IntegerField(null=True,blank=True)
class tokenRecords(models.Model):
    patient=models.ForeignKey(Patient,default=None,null=True,blank=True,on_delete=models.DO_NOTHING)
    pres=models.ForeignKey(patPrescriptionRecords,default=None,null=True,blank=True,on_delete=models.CASCADE)
    token_no=models.IntegerField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Token Records"
        ordering=['pk']


class patientBillRecords(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    desp=models.ForeignKey(despensoryStock, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)#### NEW ######
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True)
    boxes_stored=models.FloatField(null=True,blank=True)
    strips_stored=models.FloatField(null=True,blank=True)
    pieces_stored=models.FloatField(null=True,blank=True)
    amount=models.IntegerField(null=True,blank=True)
    datevisited=models.DateField(default=None,null=True,blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Medicine Bill Records"
        ordering=['pk']

class patientMedRecords(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    emp_doc=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)#### NEW ######
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True,blank=True)
    # blood_pressure=models.CharField(max_length=50,null=True,blank=True)
    prescription=ListCharField(base_field=models.CharField(max_length=20),size=10,max_length=(10*21),null=True,blank=True)
    datevisited=models.DateField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural=" Medicine Records"
        ordering=['pk']


class medInfoRecord(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    medicine=models.ForeignKey(Medicine, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)#### NEW ######
    timing=models.CharField(max_length=50,null=True,blank=True)
    datevisited=models.DateField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Medicine Info Records"
        ordering=['pk']




    

########################################## new ########################################################################



class patPrescriptionBill(models.Model):
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    discount=models.IntegerField(null=True,blank=True)
    discount_percentage=models.FloatField(null=True,blank=True)
    discount_reason=models.CharField(max_length=50,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True)
    amount_given=models.IntegerField(null=True,blank=True)
    change=models.IntegerField(null=True,blank=True)
    paid_amount=models.IntegerField(null=True,blank=True)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Patient Prescription Bill"
        ordering=['pk']

class patPrescriptionBillRecordHistory(models.Model):
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    total=models.IntegerField(null=True,blank=True)
    amount_given=models.IntegerField(null=True,blank=True)
    change=models.IntegerField(null=True,blank=True)
    paid_amount=models.IntegerField(null=True,blank=True)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Patient Prescription Bill History"
        ordering=['pk']
class presBillSummary(models.Model):
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True)
    paid_amount=models.IntegerField(null=True,blank=True)
    amount_given=models.IntegerField(null=True,blank=True)
    change=models.IntegerField(null=True,blank=True)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Prescription Bill Summary"
        ordering=['pk']



class surgeryTable(models.Model):         #### NEW  ######
    surgery_name=models.CharField(max_length=50,null=True,blank=True)
    charges=models.IntegerField(null=True,blank=True)
    surgeon_fee=models.IntegerField(null=True,blank=True,default=500)
    operation_theater_fee=models.IntegerField(null=True,blank=True,default=500)
    anesthesiologist_fee=models.IntegerField(null=True,blank=True,default=500)
    surplus_fee=models.IntegerField(null=True,blank=True)
    
    def __str__(self):
        return str(self.surgery_name)
    class Meta:
        verbose_name_plural="Surgery Table"
        ordering=['pk']

class surgeryBillRecord(models.Model): 
    surgery=models.ForeignKey(surgeryTable, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    surgeon_fee=models.IntegerField(null=True,blank=True,default=500)
    operation_theater_fee=models.IntegerField(null=True,blank=True,default=500)
    anesthesiologist_fee=models.IntegerField(null=True,blank=True,default=500)
    surplus_fee=models.IntegerField(null=True,blank=True,default=500)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    date_visited = models.DateTimeField(auto_now_add=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
            return str(self.id)
    class Meta:
        verbose_name_plural="Surgery Bill Record"
        ordering=['pk']

class surgeryRecords(models.Model):              #### NEW  ######
    surgery_bill=models.ForeignKey(surgeryBillRecord, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    consultant=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
    misc1=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc2=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc3=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc4=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc5=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
                return str(self.id)
    class Meta:
        verbose_name_plural="Surgery Record"
        ordering=['pk']


class procedureTable(models.Model):         #### NEW  ######
    procedure_name=models.CharField(max_length=50,null=True,blank=True)
    charges=models.IntegerField(null=True,blank=True)
    def __str__(self):
        return str(self.procedure_name)
    class Meta:
        verbose_name_plural="Procedure Table"
        ordering=['pk']

class procedureBillRecord(models.Model):                #### NEW  ######
    procedure=models.ForeignKey(procedureTable, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    date_visited = models.DateTimeField(auto_now_add=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
            return str(self.id)
    class Meta:
        verbose_name_plural="Procedure Bill Records"
        ordering=['pk']

class procedureRecords(models.Model):              #### NEW  ######
    procedure_bill=ListCharField(base_field=models.CharField(max_length=20),size=10,max_length=(10*21),null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')

    misc1=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc2=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc3=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc4=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    misc5=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
                return str(self.id)
    class Meta:
        verbose_name_plural="Procedure Records"
        ordering=['pk']

# 
# patient_type=models.ForeignKey(patientType, on_delete=models.CASCADE,default=None,null=True,blank=True)
# doc=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
# discount=models.IntegerField(null=True,blank=True)
# discount_percentage=models.FloatField(null=True,blank=True)
# 


# NOT NEEDED NOW ->
# class patientAddChargesBill(models.Model):
#     patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
#     patient_type=models.ForeignKey(patientType, on_delete=models.CASCADE,default=None,null=True,blank=True)
#     amount=models.IntegerField(null=True,blank=True)
#     def __str__(self):
#         return str(self.id)
#     class Meta:
#         verbose_name_plural="Patient Additional Charge Bill"
#         ordering=['pk']
class despBillRecord(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    despcharge_bill=models.FloatField(null=True,blank=True)
    addcharge_bill=models.IntegerField(null=True,blank=True)
    actual_med_bill=models.IntegerField(null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Despensory Bill Record"
        ordering=['pk']
class Rooms(models.Model):
    floor=models.IntegerField(null=True,blank=True,default=1)
    room_no=models.IntegerField(null=True,blank=True,default=1)
    charge_per_day=models.IntegerField(null=True,blank=True,default=500)
    ac_charge_per_day=models.IntegerField(null=True,blank=True,default=500)
    status=models.CharField(max_length=50,null=True,blank=True,default='Available')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Rooms"
        ordering=['pk']
class patientRoomsBill(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    rooms=models.ForeignKey(Rooms, on_delete=models.CASCADE,default=None,null=True,blank=True)

    # floor=models.IntegerField(null=True,blank=True,default=1)
    # room_no=models.IntegerField(null=True,blank=True,default=1)
    # charge_per_day=models.IntegerField(null=True,blank=True,default=500)    
    # ac_charge_per_day=models.IntegerField(null=True,blank=True,default=500)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)##### NEW ##########
    checkin=models.DateField(null=True,blank=True)
    checkout=models.DateField(null=True,blank=True)
    total_days=models.IntegerField(null=True,blank=True,default=0)

    net_total=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')

    
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Patient Room bill"
        ordering=['pk']
class Ward(models.Model):
    ward_no=models.IntegerField(null=True,blank=True,default=1)
    bed_no=models.IntegerField(null=True,blank=True,default=1)
    charge_per_day=models.IntegerField(null=True,blank=True,default=200)
    status=models.CharField(max_length=50,null=True,blank=True,default='Available')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Ward"
        ordering=['pk']
class patientWardBill(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)##### NEW ##########
    wards=models.ForeignKey(Ward, on_delete=models.CASCADE,default=None,null=True,blank=True)##### NEW ##########

    # ward_no=models.IntegerField(null=True,blank=True,default=1)
    # bed_no=models.IntegerField(null=True,blank=True,default=1)
    checkin=models.DateField(null=True,blank=True)
    checkout=models.DateField(null=True,blank=True)
    total_days=models.IntegerField(null=True,blank=True,default=0)

    # charge_per_day=models.IntegerField(null=True,blank=True,default=200)   #### NEW/update   #####
    net_total=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Pateint Ward Bill"
        ordering=['pk']
class patientVisitSummary(models.Model):
    pmr=models.ForeignKey(patientMedRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)##### NEW ##########
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    date_visited = models.DateTimeField(default=None,null=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Pateint Visit Summary"
        ordering=['pk']
class revisitHistory(models.Model):
    patient=models.ForeignKey(Patient, on_delete=models.CASCADE,default=None,null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)##### NEW ##########
    patient_type=models.ForeignKey(patientType, on_delete=models.CASCADE,default=None,null=True,blank=True)
    doc=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
    sign_symtoms=models.TextField(default="-",null=True,blank=True)
    provisional_diagnosis=models.TextField(default="-",null=True,blank=True)
    investigation=models.TextField(default="-",null=True,blank=True)
    diagnosis=models.TextField(default="-",null=True,blank=True)
    vitals=models.CharField(max_length=50,default="-",null=True,blank=True)
    rx=models.TextField(default="-",null=True,blank=True)
    admit_reason=models.CharField(max_length=200,default="-",null=True,blank=True)
    date_visited = models.DateTimeField(default=None,null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Revisit History"
        ordering=['pk']


class surgeryBillSummary(models.Model):
    sbr=ListCharField(base_field=models.CharField(max_length=20),size=10,max_length=(10*21),null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Surgery Bill Summary"
        ordering=['pk']
class procedureBillSummary(models.Model):
    procbr=ListCharField(base_field=models.CharField(max_length=20),size=10,max_length=(10*21),null=True,blank=True)
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Procedure Bill Summary"
        ordering=['pk']

class invoiceRecords(models.Model):
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    desp_bill=models.ForeignKey(despBillRecord, on_delete=models.CASCADE,default=None,null=True,blank=True)
    surgery_bill=models.ForeignKey(surgeryBillSummary, on_delete=models.CASCADE,default=None,null=True,blank=True)
    ward_bill=models.ForeignKey(patientWardBill, on_delete=models.CASCADE,default=None,null=True,blank=True)
    procedure_id=models.ForeignKey(procedureBillSummary, on_delete=models.CASCADE,default=None,null=True,blank=True)
    room_bill=models.ForeignKey(patientRoomsBill, on_delete=models.CASCADE,default=None,null=True,blank=True)
    discount=models.IntegerField(null=True,blank=True)
    discount_percentage=models.FloatField(null=True,blank=True)
    net_total=models.IntegerField(null=True,blank=True,default=0)
    paid_amount=models.IntegerField(null=True,blank=True,default=0)
    status=models.CharField(max_length=50,null=True,blank=True,default='NotPaid')
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Invoices"
        ordering=['pk']

class consulatationRecords(models.Model):
    pres=models.ForeignKey(patPrescriptionRecords, on_delete=models.CASCADE,default=None,null=True,blank=True)
    doc=models.ForeignKey(Employee, on_delete=models.CASCADE,default=None,null=True,blank=True)
    medicine_details=models.TextField(default="-",null=True,blank=True)
    date_visited = models.DateTimeField(default=None,null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    update_at = models.DateTimeField(auto_now_add=True, blank=True)
    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name_plural="Consultation Records"
        ordering=['pk']

class Photo(models.Model):
    title = models.CharField(max_length=255, blank=True)
    file = models.FileField(upload_to='photos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
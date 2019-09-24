from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin
from import_export.admin import ImportExportModelAdmin


# Register your models here.
from .models import (
medicineType,
Medicine,medicineCategory,Category,
medicineWarehouseStock,medicineWhStockHistory,
tt_MedicineMedWhStock,tt_tempMedWhStk_Med,
packageType,User,Role,employeeType,
despensoryStock,despensoryStockHistory,
tt_Medicine_DespensoryStock,
tempDespensoryStock,despensoryMedincineBatch,
medicineBatches,Patient,
Employee,tokenRecords,patientBillRecords,
patientMedRecords,patientType,patPrescriptionBill,
patientAddChargesBill,patientBillSummary,
Rooms,patientRoomsBill,Ward,patientWardBill,
patientVisitSummary)


class RoleAdmin (admin.ModelAdmin):
    pass
class UserAdmin (admin.ModelAdmin):
    pass
class MedicineResource(resources.ModelResource):
    class meta:
        model=Medicine
class MedicineAdmin(ImportExportActionModelAdmin):
    list_display= ("id","medicine_name",'medicine_type_id','medicine_details','created_at','update_at')

class medicineTypeAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine_type_name','created_at','update_at')
class packageTypeAdmin(admin.ModelAdmin):
    list_display= ("id",'package_name','created_at','update_at')
# class medicineCategoryAdmin(admin.ModelAdmin):
#     list_display= ('category_type_id','created_at','update_at')
class CategoryAdmin(admin.ModelAdmin):
    list_display= ("id",'category_name','created_at','update_at')
class medicineWarehouseStockAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine',"purchase_rate","status",\
    "carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit",\
    "manufac_date",'exp_date','created_at','update_at')
class medicineWhStockHistoryAdmin(admin.ModelAdmin):
    list_display= ("id","medicine_wh_stock","purchase_rate","status",\
    "carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit",\
    'exp_date','created_at','update_at')
class tt_MedicineMedWhStockAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine','mwhs','created_at','update_at')

class tt_tempMedWhStk_MedAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine',"batch_no","purchase_rate",\
    "carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit",\
    'exp_date',"status",'created_at','update_at')

class despensoryStockAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine',"medicine_strg",\
    "status","carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit",\
    'created_at','update_at')
class tempDespensoryStockAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine',"medicinewh_stock",\
    "carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit","status",\
    'created_at','update_at')

class despensoryStockHistoryAdmin(admin.ModelAdmin):
    list_display= ("id",'desp_stock',"medicine_strg",\
    "status","carton_unit","box_unit","strip_unit","piece_unit",\
    "carton_stored","box_stored","strip_stored","piece_stored",\
    "carton_price_unit","box_price_unit","strip_price_unit","piece_price_unit",\
    'created_at','update_at')
class medicineBatchesAdmin(admin.ModelAdmin):
    list_display= ("id",'medicine_id','medicine_strg_id',"batch_no","status",\
    "created_at",'update_at')

class tt_Medicine_DespensoryStockAdmin(admin.ModelAdmin):
    list_display=("id","medicine","desp_stock","medicine_strg")

class despensoryMedincineBatchAdmin(admin.ModelAdmin):
    list_display=("id","desp","medwh_stock","batch","status")
class patientAdmin(admin.ModelAdmin):
    list_display=("id","pat_name","phone_no","gender","guardian","dob","bloodgroup",\
    "address","email_address")
class EmployeeAdmin(admin.ModelAdmin):
    list_display=("id","user","name","employee_type","phone_no","gender","qualification","dob","address","email_address")
class tokenRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","token_no")
class patientBillRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","desp","boxes_stored","strips_stored","pieces_stored",'amount',"datevisited")
class patientMedRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","emp_doc","blood_pressure","prescription","datevisited")

class employeeTypeAdmin(admin.ModelAdmin):
    list_display=("id","type_name")
class patientTypeAdmin(admin.ModelAdmin):
    list_display=('id','patient_type','charges')
class patPrescriptionBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','patient_type','doc','discount','discount_percentage',\
        'amount_due','patient_paid','patient_change')
class patientAddChargesBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','patient_type','amount')
class patientBillSummaryAdmin(admin.ModelAdmin):
    list_display=('id','patient','patient_type','despcharge_bill',\
        'addcharge_bill','total_med_bill','actual_med_bill','pres_plus_totalmedbill',\
        'amount_due','profit_or_loss','patient_paid','patient_change')
class RoomsAdmin(admin.ModelAdmin):
    list_display=('id','floor','room_no','charge_per_day','ac_charge_per_day','status')
class patientRoomsBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','floor','room_no','charge_per_day','ac_charge_per_day',\
        'checkin','checkout','amount')
class WardAdmin(admin.ModelAdmin):
    list_display=('id','ward_no','bed_no','charge_per_day','status')
class patientWardBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','ward_no','bed_no','charge_per_day','amount')
class patientVisitSummaryAdmin(admin.ModelAdmin):
    list_display=('id','pmr','pbr','checkin','checkout','illness','consultant')

admin.site.register(medicineType, medicineTypeAdmin)
admin.site.register(packageType, packageTypeAdmin)
admin.site.register(Medicine, MedicineAdmin)
# admin.site.register(medicineCategory, medicineCategoryAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(medicineWarehouseStock, medicineWarehouseStockAdmin)
admin.site.register(medicineWhStockHistory, medicineWhStockHistoryAdmin)
admin.site.register(tt_MedicineMedWhStock, tt_MedicineMedWhStockAdmin)
admin.site.register(tt_tempMedWhStk_Med, tt_tempMedWhStk_MedAdmin)
admin.site.register(medicineBatches, medicineBatchesAdmin)
admin.site.register(despensoryStock, despensoryStockAdmin)
admin.site.register(despensoryStockHistory, despensoryStockHistoryAdmin)
admin.site.register(tempDespensoryStock, tempDespensoryStockAdmin)
admin.site.register(despensoryMedincineBatch, despensoryMedincineBatchAdmin)
admin.site.register(tt_Medicine_DespensoryStock, tt_Medicine_DespensoryStockAdmin)
admin.site.register(Patient, patientAdmin)
admin.site.register(Employee, EmployeeAdmin)
admin.site.register(employeeType, employeeTypeAdmin)
admin.site.register(tokenRecords, tokenRecordsAdmin)
admin.site.register(patientBillRecords, patientBillRecordsAdmin)
admin.site.register(patientMedRecords, patientMedRecordsAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(patientType, patientTypeAdmin)
admin.site.register(patPrescriptionBill, patPrescriptionBillAdmin)
admin.site.register(patientAddChargesBill, patientAddChargesBillAdmin)
admin.site.register(patientBillSummary, patientBillSummaryAdmin)
admin.site.register(Rooms, RoomsAdmin)
admin.site.register(patientRoomsBill, patientRoomsBillAdmin)
admin.site.register(Ward, WardAdmin)
admin.site.register(patientWardBill, patientWardBillAdmin)












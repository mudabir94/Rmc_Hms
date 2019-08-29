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
packageType,
despensoryStock,despensoryStockHistory,tt_Medicine_DespensoryStock,tempDespensoryStock,despensoryMedincineBatch,
medicineBatches,Patient,Doctor,tokenRecords,patientBillRecords,patientMedRecords)




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
class doctorAdmin(admin.ModelAdmin):
    list_display=("id","doc_name","phone_no","gender","specialization","dob","address","email_address")
class tokenRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","token_no")
class patientBillRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","desp","boxes_stored","strips_stored","pieces_stored","datevisited")
class patientMedRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","docter","blood_pressure","prescription","datevisited")








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
admin.site.register(Doctor, doctorAdmin)
admin.site.register(tokenRecords, tokenRecordsAdmin)
admin.site.register(patientBillRecords, patientBillRecordsAdmin)
admin.site.register(patientMedRecords, patientMedRecordsAdmin)







from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportActionModelAdmin
from import_export.admin import ImportExportModelAdmin


# Register your models here.
from .models import (
medicineType,
Medicine,
medicineCategory,Category,
medicineWarehouseStock,medicineWhStockHistory,medicineBatches,
tt_MedicineMedWhStock,tt_tempMedWhStk_Med,
despensoryStock,despensoryStockHistory,
tt_Medicine_DespensoryStock,
tempDespensoryStock,despensoryMedincineBatch,
packageType,
User,Role,employeeType,
Patient,patientType,
Employee,
Rooms,Ward,
patientBillRecords,patientMedRecords,
patPrescriptionRecords,patPrescriptionBill,
patientRoomsBill,
patientWardBill,

surgeryTable,
surgeryRecords,surgeryBillRecord,
procedureTable,
procedureRecords,procedureBillRecord,
despBillRecord,
patientVisitSummary,invoiceRecords
)


class RoleAdmin (admin.ModelAdmin):
    pass
class UserAdmin (admin.ModelAdmin):
    pass
class MedicineResource(resources.ModelResource):
    class meta:
        model=Medicine
class MedicineAdmin(ImportExportActionModelAdmin):
    list_display= ("id","medicine_name",'medicine_type_id','add_charge', 'medicine_details','created_at','update_at')

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

class patientBillRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","desp","pres","medicine","boxes_stored","strips_stored","pieces_stored",'amount',"datevisited")
class patientMedRecordsAdmin(admin.ModelAdmin):
    list_display=("id","patient","emp_doc","pres","medicine","prescription","datevisited")

class employeeTypeAdmin(admin.ModelAdmin):
    list_display=("id","type_name")
class patientTypeAdmin(admin.ModelAdmin):
    list_display=('id','patient_type','charges')
class patPrescriptionBillAdmin(admin.ModelAdmin):
    list_display=('id','pres','discount','discount_percentage',\
        'net_total','status')

class patPrescriptionRecordsAdmin(admin.ModelAdmin):
    list_display=('id','patient','patient_type','doc','sign_symtoms',\
    'provisional_diagnosis','investigation','diagnosis','vitals','rx','date_visited')


class surgeryTableAdmin(admin.ModelAdmin):
    list_display=('surgery_name','charges',"surgeon_fee","operation_theater_fee",\
        "anesthesiologist_fee","surplus_fee")


class surgeryBillRecordAdmin(admin.ModelAdmin):
    list_display=('id','surgery','pres','surgeon_fee','operation_theater_fee',\
        'anesthesiologist_fee','surplus_fee','net_total','status','date_visited')


class surgeryRecordsAdmin(admin.ModelAdmin):
    list_display=('id','surgery_bill','pres','consultant','misc1',\
        'misc2','misc3','misc4','misc5')


class procedureTableAdmin(admin.ModelAdmin):
    list_display=('procedure_name','charges')


class procedureBillRecordAdmin(admin.ModelAdmin):
    list_display=('id','procedure','pres','net_total','status','date_visited')


class procedureRecordsAdmin(admin.ModelAdmin):
    list_display=('id','procedure_bill','pres','misc1',\
        'misc2','misc3','misc4','misc5')





class despBillRecordAdmin(admin.ModelAdmin):
    list_display=('id','patient','pres','despcharge_bill',\
        'addcharge_bill','actual_med_bill',\
        'net_total','status')
class RoomsAdmin(admin.ModelAdmin):
    list_display=('id','floor','room_no','charge_per_day','ac_charge_per_day','status')
class patientRoomsBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','pres','floor','room_no',\
        'checkin','checkout','net_total','status')

class WardAdmin(admin.ModelAdmin):
    list_display=('id','ward_no','bed_no','charge_per_day','status')
class patientWardBillAdmin(admin.ModelAdmin):
    list_display=('id','patient','pres','ward_no','bed_no','net_total','status')
class patientVisitSummaryAdmin(admin.ModelAdmin):
    list_display=('id','patient','pmr','pres','date_visited')
class invoiceRecordsAdmin(admin.ModelAdmin):
    list_display=('id','pres','desp_bill','surgery_bill','ward_bill',\
        'room_bill','discount','discount_percentage',\
        'net_total','status')


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
admin.site.register(patientBillRecords, patientBillRecordsAdmin)
admin.site.register(patientMedRecords, patientMedRecordsAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(patientType, patientTypeAdmin)


admin.site.register(patPrescriptionBill, patPrescriptionBillAdmin)
admin.site.register(Rooms, RoomsAdmin)
admin.site.register(patientRoomsBill, patientRoomsBillAdmin)
admin.site.register(Ward, WardAdmin)
admin.site.register(patientWardBill, patientWardBillAdmin)


admin.site.register(patPrescriptionRecords, patPrescriptionRecordsAdmin)

admin.site.register(surgeryTable, surgeryTableAdmin)

admin.site.register(surgeryBillRecord, surgeryBillRecordAdmin)

admin.site.register(surgeryRecords, surgeryRecordsAdmin)

admin.site.register(procedureTable, procedureTableAdmin)

admin.site.register(procedureBillRecord, procedureBillRecordAdmin)


admin.site.register(procedureRecords, procedureRecordsAdmin)

admin.site.register(despBillRecord, despBillRecordAdmin)


admin.site.register(patientVisitSummary, patientVisitSummaryAdmin)

admin.site.register(invoiceRecords, invoiceRecordsAdmin)














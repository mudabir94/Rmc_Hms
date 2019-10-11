from django.conf.urls import url, include
from django.urls import path
from . import views 
urlpatterns = [
 
  path('', views.mainHome.as_view(), name='mainhomepage'),
  path("maindashboard",views.mainDashBoard.as_view(),name="main_dashboard"),
  path("inventorydashboard",views.inventoryDashBoard.as_view(),name="inventory_dashboard"),
  path("staff_dashboard",views.staffDashboard.as_view(),name="staff_dashboard"),
  path("patient_dashboard",views.patientDashboard.as_view(),name="patient_dashboard"),

  path("medicinedashboard",views.medicineDashBoard.as_view(),name="medicine_dashboard"),
  path("addmedtostorage",views.addMedToStorage,name="addmedtostorage"),
  path("addmedtodispensory",views.addMedToDispensory,name="addmedtodispensory"),
  path('checkmedin_medicineBatches',views.checkMedicineInmedicineBatches,name="checkmedin_medicineBatches"),
  path("save_medicine_to_wh_stock",views.saveMedicineToWhStock,name="save_medicine_to_wh_stock"),
  path("save_medicine_to_wh_stock_bottle",views.saveMedicineToWhStockBottle,name="save_medicine_to_wh_stock_bottle"),
  path('save_med_to_db',views.sendAjaxReqToSaveMedicineToDb,name="save_med_to_db"),
  path('save_to_desp_stock',views.saveToDespStock,name="save_to_desp_stock"),
  
  path('save_employee_data',views.saveEmployeeData,name="save_employee_data"),
  path("save_patient_data",views.savePatientData,name="save_patient_data"),
  
  path('retrieve_medicine_type',views.retrieveMedicineType,name="retrieve_medicine_type"),
  path('retrieve_medicine_name',views.retrieveMedicineName,name="retrieve_medicine_name"),
  path('retrieve_package_types',views.retrievePackageTypes,name="retrieve_package_types"),

  path("retrieve_medicine_gen_data_from_stock",views.retrieveMedicineGenDataFromStock,name="retrieve_medicine_gen_data_from_stock"),
  path("retrieve_medicine_stock_data_from_stock",views.retrieveMedicineStockDataFromStock,name="retrieve_medicine_stock_data_from_stock"),
  path("retrieve_medicine_tempstock_from_tempstock",views.retrieveMedicineTempStockFromTempStock,name="retrieve_medicine_tempstock_from_tempstock"),
  path('retrieve_employee_type',views.retrieveEmployeeType,name="retrieve_employee_type"),
  path('retireve_patient_info',views.retirevePatientInfo,name="retireve_patient_info"),
  path('retireve_patient_med_history',views.retirevePatientMedHistory,name="retireve_patient_med_history"),

  path('retrieve_medicine_from_desp',views.retrieveMedicineFromDesp,name="retrieve_medicine_from_desp"),

  path('retrieve_employee_info',views.retrieveEmployeeInfo,name="retrieve_employee_info"),
  
  path("retireve_all_desp_med",views.retireveAllDespMed,name='retireve_all_desp_med'),
  
  path('view_patient_history',views.viewPatientHistory,name="view_patient_history"),
  
  path('update_patient_data',views.updatePatientData,name="update_patient_data"),
  
  path('view_patient_history',views.viewPatientHistory,name="view_patient_history"),
  
  path('print_patient_prescription',views.printPatientPrescription,name="print_patient_prescription"),
  
  path('update_prescription_record',views.updatePrescriptionRecord,name="update_prescription_record"),

  path('generate_prescription',views.generatePrescription,name="generate_prescription"),

  path('update_employee_data',views.updateEmployeeData,name="update_employee_data"),
  
  path('retireve_patient_info_in_pres_form',views.retrievePatientInfoInPresForm,name='retireve_patient_info_in_pres_form'),
  path('retrieve_patient_info_in_createbill',views.retrievePatientInfoInPatientBill,name='retrieve_patient_info_in_createbill'),
 
  path('retireve_room_info_in_room_ward',views.retrieveRoomInfoInRoomWard,name='retireve_room_info_in_room_ward'),
  path('retireve_ward_info_in_room_ward',views.retrieveWardInfoInRoomWard,name='retireve_ward_info_in_room_ward'),
  path('save_patient_bill',views.savePatientBill,name='save_patient_bill' ),

  path('retireve_ward_info_in_room_ward',views.retrieveWardInfoInRoomWard,name='retireve_ward_info_in_room_ward'),
  path('retrieve_pat_type_fee',views.retrievePatTypeFee,name='retrieve_pat_type_fee'),

  path('max_token_no',views.maxTokenNo,name="max_token_no"),

  path('add_proc_surg_form',views.addProcSurgForm,name='add_proc_surg_form'),

  # path('out_presc_form',views.outPrescform,name="out_presc_form"),
]
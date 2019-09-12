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

  path('retrieve_employee_info',views.retrieveEmployeeInfo,name="retrieve_employee_info"),
  
  path('view_patient_history',views.viewPatientHistory,name="view_patient_history"),
  
  path('update_patient_data',views.updatePatientData,name="update_patient_data"),
  
  path('view_patient_history',views.viewPatientHistory,name="view_patient_history"),
  
  path('print_patient_prescription',views.printPatientPrescription.as_view(),name="print_patient_prescription"),


]
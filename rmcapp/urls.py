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
  path('retrieve_all_employee_info',views.retrieveAllEmployeeInfo,name="retrieve_all_employee_info"),

  
  path('retireve_patient_info_in_pres_form',views.retrievePatientInfoInPresForm,name='retireve_patient_info_in_pres_form'),
  path('retrieve_patient_info_in_createbill',views.retrievePatientInfoInPatientBill,name='retrieve_patient_info_in_createbill'),
  path('retrieve_all_patient_info',views.retrieveAllPatientInfo,name='retrieve_all_patient_info'),

  path('retireve_room_info_in_room_ward',views.retrieveRoomInfoInRoomWard,name='retireve_room_info_in_room_ward'),
  path('retireve_ward_info_in_room_ward',views.retrieveWardInfoInRoomWard,name='retireve_ward_info_in_room_ward'),
  path('save_patient_bill',views.savePatientBill,name='save_patient_bill' ),

  path('retireve_ward_info_in_room_ward',views.retrieveWardInfoInRoomWard,name='retireve_ward_info_in_room_ward'),
  path('retrieve_pat_type_fee',views.retrievePatTypeFee,name='retrieve_pat_type_fee'),
  path('retrieve_procedure_details',views.retrieveProcedureDetails,name='retrieve_procedure_details'),
  path('retrieve_pres_info_surg_proc_bill',views.retrievePresInfoSurgProcBill,name='retrieve_pres_info_surg_proc_bill'),

  path('proc_surg_form',views.procSurgForm,name='proc_surg_form'),
  path('retrieve_all_surg_info',views.retrieveAllSurgInfo,name='retrieve_all_surg_info'),
  path('retrieve_all_proc_info',views.retrieveAllProcInfo,name='retrieve_all_proc_info'),
  path('update_surg_data',views.updateSurgData,name="update_surg_data"),
  path('update_proc_data',views.updateProcData,name="update_proc_data"),
  path('add_procedure',views.addProcedure,name="add_procedure"),
  path('add_surgery',views.addSurgery,name="add_surgery"),
  
  path('room_ward_form',views.roomWardForm,name='room_ward_form'),
  path('retireve_all_room_info_in_room_ward',views.retrieveAllRoomInfoInRoomWard,name='retireve_all_room_info_in_room_ward'),
  path('retireve_all_ward_info_in_room_ward',views.retrieveAllWardInfoInRoomWard,name='retireve_all_ward_info_in_room_ward'),
  path('retrieve_room_ward_bill',views.retrieveRoomWardBill,name='retrieve_room_ward_bill'),
  path('update_room_data',views.updateRoomData,name="update_room_data"),
  path('update_ward_data',views.updateWardData,name="update_ward_data"),
  path('print_room_bill',views.printRoomBill,name='print_room_bill'),
  path('print_ward_bill',views.printWardBill,name='print_ward_bill'),
  path('save_room_bill',views.saveRoomBill,name='save_room_bill'),
  path('save_ward_bill',views.saveWardBill,name='save_ward_bill'),

  path('retrieve_invoice_bill_record',views.retrieveInvoiceBillRecord,name='retrieve_invoice_bill_record'),
  path('retrieve_invoice_bill_record_for_view',views.retrieveInvoiceBillRecordForView,name='retrieve_invoice_bill_record_for_view'),

  path('update_invoice',views.updateInvoice,name="update_invoice"),

]
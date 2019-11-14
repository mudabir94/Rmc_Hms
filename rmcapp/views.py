from django.shortcuts import render
from django.views.generic import TemplateView
import math
import json
from rmcapp.models import (
    medicineType,
    Medicine,Category,
    medicineWarehouseStock,medicineWhStockHistory,tt_tempMedWhStk_Med,
    tt_MedicineMedWhStock,
    despensoryStock,despensoryStockHistory,tt_Medicine_DespensoryStock,
    medicineBatches,
    packageType,
    employeeType,Employee,Patient,patientMedRecords,patientBillRecords,Rooms,Ward,patientRoomsBill,patientWardBill,
    patientType,
    procedureTable,patPrescriptionRecords,patPrescriptionBill,invoiceRecords,
    despBillRecord,procedureBillRecord,procedureRecords,procedureTable,
    patientVisitSummary,surgeryTable,
    surgeryRecords,surgeryBillRecord,procedureBillSummary,surgeryBillSummary,
    tempDespensoryStock,
)
from django.http import HttpResponse, JsonResponse
from .Controllers.MedControllers.MedController import MedicineController  
from django.db import connection
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist




def printTest(request):
    template_path_name="rmcapp/mainhomepage_template/printtest.html"
    return render(request,template_path_name)







# Create your views here.
class mainHome(TemplateView):
    template_path_name="rmcapp/mainhomepage_template/index.html"
    def get(self,request):
        print("LOGG")
        return render(request,self.template_path_name)
    def post(self,request):
        pass

class mainDashBoard(TemplateView):
    template_path_name="rmcapp/main_dashboard_template/main_dashboard.html"
    def get(self,request):
        return render(request,self.template_path_name)

    def post(self,request):
        pass

class inventoryDashBoard(TemplateView):
    template_path_name="rmcapp/inventory_dashboard_template/inventory_dashboard.html"
    def get(self,request):
        return render(request,self.template_path_name)
    def post(self,request):
        pass
class medicineDashBoard(TemplateView):
    template_path_name="rmcapp/inventory_dashboard_template/medicine_inv_dashboard/med_inv_dashboard.html"
    def get(self,request):
        return render(request,self.template_path_name)
    def post(self,request):
        pass
class staffDashboard(TemplateView):
    template_path_name="rmcapp/staff_dashboard_template/staff_dashboard.html"
    def get(self,request):
        return render(request,self.template_path_name)
    def post(self,request):
        pass


def addMedToStorage(request):
    print("ADDING MED TO STORAGE")
    template_path_name="rmcapp/inventory_dashboard_template/medicine_inv_dashboard/med_inv_dashboard.html"
    medicine_obj=Medicine.objects.get(id=4)
    try:
        med_strg_oldObj=medicineWarehouseStock.object.get(Medicine=medicine_obj)
        med_strg_oldObj.batch_no=1
        med_strg_oldObj.medicine=medicine_obj
        med_strg_oldObj.purchase_rate=1000
        med_strg_oldObj.carton_unit=0
        med_strg_oldObj.box_unit=1
        med_strg_oldObj.strip_unit=0
        med_strg_oldObj.piece_unit=5
        med_strg_oldObj.carton_stored=0
        med_strg_oldObj.box_stored=50
        med_strg_oldObj.strip_stored=0
        med_strg_oldObj.piece_stored=250
        med_strg_oldObj.carton_price_unit=0
        med_strg_oldObj.box_price_unit=1000
        med_strg_oldObj.strip_price_unit=0
        med_strg_oldObj.piece_price_unit=200
        med_strg_oldObj.save()
    except:
        medStrg_newObj=medicineWarehouseStock()
        medStrg_newObj.batch_no=1
        medStrg_newObj.medicine=medicine_obj
        medStrg_newObj.purchase_rate=1000
        medStrg_newObj.carton_unit=0
        medStrg_newObj.box_unit=1
        medStrg_newObj.strip_unit=0
        medStrg_newObj.piece_unit=5
        medStrg_newObj.carton_stored=0
        medStrg_newObj.box_stored=50
        medStrg_newObj.strip_stored=0
        medStrg_newObj.piece_stored=250
        medStrg_newObj.carton_price_unit=0
        medStrg_newObj.box_price_unit=1000
        medStrg_newObj.strip_price_unit=0
        medStrg_newObj.piece_price_unit=200
        medStrg_newObj.save()
        
    return render(request,template_path_name)
def addMedToDispensory(request):
    template_path_name="rmcapp/inventory_dashboard_template/medicine_inv_dashboard/med_inv_dashboard.html"
    medicine_obj=Medicine.objects.get(id=1)
    medicineWarehouseStock_obj=medicineWarehouseStock.objects.get(medicine=medicine_obj,status="In Use")
    # If medicine Storage Object is not empty
    if medicineWarehouseStock_obj:
        # We are Assuming
       
        # For this Task, first we'll need to know package type... 
        
        print("Carton/Unit",medicineWarehouseStock_obj.carton_unit)
        print("Boxes /Unit",medicineWarehouseStock_obj.box_unit)
        print("Strips /Unit ",medicineWarehouseStock_obj.strip_unit)
        print("Pieces /Unit",medicineWarehouseStock_obj.piece_unit)
        # medicineWarehouseStock_obj.carton_stored=3
        # medicineWarehouseStock_obj.box_stored=60
        # medicineWarehouseStock_obj.strip_stored=300
        # medicineWarehouseStock_obj.piece_stored=3000
        # medicineWarehouseStock_obj.save()
        # Make a CASE WHEN STRIP IS 0-- meaning The medicine doesn't have strips... 
        # According to the Request We'll Do the Calculation. 
        # According to the panadol data. 
        # 1 Carton= 20boxes, 1 box= 5strips, 1 Strip= 10pieces... 
        if(medicineWarehouseStock_obj.strip_stored==0):
           NoStripCalculation(medicineWarehouseStock_obj,medicine_obj)

        else:
           WithStripCalculation(medicineWarehouseStock_obj,medicine_obj)
            
    return render(request,template_path_name)

def WithStripCalculation(medicineWarehouseStock_obj,medicineobj,numofboxes,numofstrips,numofpieces):
  

    # Packages can be of 4 type, all togather or combos of it. so we can hard code it. 
        # 1. Check how many cartons. 
        # 2. How Many Boxes
        # 3. How Many Strips
        # 4. How Many Pieces
        # 
        # if carton not empty 
    numofboxes=numofboxes*medicineWarehouseStock_obj.box_unit
    strip_unit=medicineWarehouseStock_obj.strip_unit
    pieceunit=medicineWarehouseStock_obj.piece_unit

    print("numofboxes",numofboxes)
    if numofboxes==medicineWarehouseStock_obj.box_stored:
        boxes_stored=0
        strips_stored=0
        pieces_in_storage_left=0
        # medicineWarehouseStock_obj.boxw
    else:
        totalnumofstrips=numofboxes*medicineWarehouseStock_obj.strip_unit+numofstrips
        print("totalnumofstrips",totalnumofstrips)
        # if medicineWarehouseStock_obj.strip_stored<strip_unit:
        #     totalnumofstrips=medicineWarehouseStock_obj.strip_stored+numofstrips

        total_number_of_req_pieces=totalnumofstrips*pieceunit+numofpieces
        if medicineWarehouseStock_obj.piece_stored<pieceunit:
            total_number_of_req_pieces=medicineWarehouseStock_obj.piece_stored
        print("total_number_of_req_pieces",total_number_of_req_pieces)

        # total_number_of_req_pieces=totalnumofstrips*medicineWarehouseStock_obj.piece_unit
        # total_number_of_req_pieces=total_number_of_req_pieces+numofpieces
        pieces_in_storage_left=float(medicineWarehouseStock_obj.piece_stored)-float(total_number_of_req_pieces)
        print("pieces_in_storage_left",pieces_in_storage_left)
        # Calculating/Finding how many boxes,strips and pieces stored. 
        if pieces_in_storage_left==0:
            strips_stored=0
            boxes_stored=0
        else:
            strips_stored=float(pieces_in_storage_left)/float(medicineWarehouseStock_obj.piece_unit)
            boxes_stored=float(strips_stored)/float(medicineWarehouseStock_obj.strip_unit)
            boxes_stored= int(round(boxes_stored))


    print("boxes in stock",boxes_stored)
    
    print("b",medicineWarehouseStock_obj.box_stored)
    strips_stored=int(round(strips_stored))
    print("strips in stock",strips_stored)
    print("pieces_in_stock",pieces_in_storage_left)

    try:
        print("despStrg_obj Findin")

        despStrg_obj=despensoryStock.objects.get(medicine=medicineobj,status="In Use")
        medBatobj1=medicineBatches.objects.get(medicine_strg=despStrg_obj.medicine_strg)
        medBatobj2=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)

        print("medBatobj1.batch_no",medBatobj1.batch_no)
        print("medBatobj2.batch_no",medBatobj2.batch_no)
        if medBatobj1.batch_no==medBatobj2.batch_no:

            print("despStrg_obj Found",despStrg_obj)
            despStrg_obj.box_stored=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
            despStrg_obj.strip_stored=float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored)-float(strips_stored)
            despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)
            despStrg_obj.save()

            despStrgHist_obj=despensoryStockHistory()
            despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
            despStrgHist_obj.desp_stock=despStrg_obj
            despStrgHist_obj.medicine=medicineobj
            despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
            despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
            boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
            despStrgHist_obj.box_stored=despStrg_obj.box_stored
            despStrgHist_obj.strip_stored=despStrg_obj.strip_stored
            despStrgHist_obj.piece_stored=despStrg_obj.piece_stored
            
            despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
            despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
            despStrgHist_obj.status="Updated"
            despStrgHist_obj.save()
        else:
            print("Storing in Temp desponsory")
            tempDespStrgObj=tempDespensoryStock()
            print("Storing in Temp desponsory lin2")

            medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
            tempDespStrgObj.batch_no=medBatobj.batch_no
            print("Storing in Temp desponsory lin4")

            tempDespStrgObj.medicine=medicineobj
            tempDespStrgObj.medicinewh_stock=medicineWarehouseStock_obj
            tempDespStrgObj.box_unit=medicineWarehouseStock_obj.box_unit
            tempDespStrgObj.strip_unit=medicineWarehouseStock_obj.strip_unit
            tempDespStrgObj.piece_unit=medicineWarehouseStock_obj.piece_unit
            boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
            print("printing line5")
            tempDespStrgObj.box_stored=boxes
            print("printing line6")

            tempDespStrgObj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
            print("printing line7")

            tempDespStrgObj.strip_stored=medicineWarehouseStock_obj.strip_stored-strips_stored

            tempDespStrgObj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
            tempDespStrgObj.strip_price_unit=medicineWarehouseStock_obj.strip_price_unit
            tempDespStrgObj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
            print("printing line8")

            tempDespStrgObj.save()
            print("tempDespStrgObj stored",tempDespStrgObj)

        # numofboxes=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
        # despStrg_obj.box_stored=float(despStrg_obj.box_stored)+numofboxes
        # despStrg_obj.strip_stored=float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored)-float(strips_stored)
        # despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)
        # tempDespStrgObj=tempDespensoryStock()
        # medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        # tempDespStrgObj.batch_no=medBatobj.batch_no
        # tempDespStrgObj.medicine=medicineobj
        # tempDespStrgObj.medicine_strg=medicineWarehouseStock_obj
        # tempDespStrgObj.box_unit=medicineWarehouseStock_obj.box_unit
        # tempDespStrgObj.strip_unit=medicineWarehouseStock_obj.strip_unit
        # tempDespStrgObj.piece_unit=medicineWarehouseStock_obj.piece_unit
        # boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        # tempDespStrgObj.box_stored=boxes
        # tempDespStrgObj.strip_stored=medicineWarehouseStock_obj.strip_stored-strips_stored
        # tempDespStrgObj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left

        # tempDespStrgObj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        # tempDespStrgObj.strip_price_unit=medicineWarehouseStock_obj.strip_price_unit
        # tempDespStrgObj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        # tempDespStrgObj.save()

    except:
        print("Adding Med to Desp stock")
        despStrg_obj=despensoryStock()
        # despStrg_obj.batch_no=1
        despStrg_obj.medicine=medicineobj
        despStrg_obj.medicine_strg=medicineWarehouseStock_obj
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.strip_unit=medicineWarehouseStock_obj.strip_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit

        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        despStrg_obj.box_stored=boxes
        despStrg_obj.strip_stored=medicineWarehouseStock_obj.strip_stored-strips_stored
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left

        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.strip_price_unit=medicineWarehouseStock_obj.strip_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrg_obj.status="In Use"
        despStrg_obj.save()

        despStrgHist_obj=despensoryStockHistory()
        despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
        despStrgHist_obj.desp_stock=despStrg_obj
        despStrgHist_obj.medicine=medicineobj
        despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        despStrgHist_obj.box_stored=despStrg_obj.box_stored
        despStrgHist_obj.strip_stored=despStrg_obj.strip_stored
        # despStrgHist_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
        despStrgHist_obj.piece_stored=despStrg_obj.piece_stored
        despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrgHist_obj.status="Added"
        despStrgHist_obj.save()
        ttmds_obj=tt_Medicine_DespensoryStock()
        ttmds_obj.medicine=medicineobj
        ttmds_obj.medicine_strg=medicineWarehouseStock_obj
        ttmds_obj.desp_stock=despStrg_obj
        ttmds_obj.save()
    if boxes_stored==0 and pieces_in_storage_left==0.0:
        medicineWarehouseStock_obj.status="Used"
        medbatch_obj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        medbatch_obj.status="Used"
        medbatch_obj.save()
        med_name=medicineWarehouseStock_obj.medicine.medicine_name
        print("med_name",med_name)
        medObj=Medicine.objects.get(medicine_name=med_name)
        batch_no=int(medbatch_obj.batch_no)
        batch_no_new=batch_no+1
        try:
            tempMedWhStk_Med_Obj=tt_tempMedWhStk_Med.objects.get(medicine=medObj,batch_no=batch_no_new)
            saveMedicineToWhStockFromTempMedStock(tempMedWhStk_Med_Obj,medObj)
            tempMedWhStk_Med_Obj.delete()
        except:
            print("NOT FOUND IN TEMP")
        

    medicineWarehouseStock_obj.box_stored=boxes_stored
    medicineWarehouseStock_obj.strip_stored=strips_stored
    medicineWarehouseStock_obj.piece_stored=pieces_in_storage_left
    medicineWarehouseStock_obj.save()

    medicineWhStockHistory_obj=medicineWhStockHistory()
    medicineWhStockHistory_obj.medicine_wh_stock=medicineWarehouseStock_obj
    medicineWhStockHistory_obj.box_stored=boxes_stored
    medicineWhStockHistory_obj.strip_stored=strips_stored
    medicineWhStockHistory_obj.piece_stored=pieces_in_storage_left
    medicineWhStockHistory_obj.status="Updated"
    medicineWhStockHistory_obj.save()

    

def NoStripCalculation(medicineWarehouseStock_obj,medicineobj,noofboxes,noofpieces):
    numofboxes=noofboxes
    numofpieces=noofpieces
    medicine_obj=medicineobj
    print("medcine object",medicine_obj.medicine_name)
    box_per_unit=medicineWarehouseStock_obj.box_unit
    pieceunit=medicineWarehouseStock_obj.piece_unit
    
# Packages can be of 4 type, all togather or combos of it. so we can hard code it. 
    # 1. Check how many cartons. 
    # 2. How Many Boxes

    # 4. How Many Pieces
    # 
    # if carton not empty 
    numofboxes=numofboxes*box_per_unit
    print("numofboxes-1",numofboxes)
    print("numofpieces-1",numofpieces)
    total_number_of_req_pieces=numofboxes*pieceunit+numofpieces

    if medicineWarehouseStock_obj.piece_stored<pieceunit:
        total_number_of_req_pieces=medicineWarehouseStock_obj.piece_stored
    

    
    print("total_number_of_req_pieces-1",total_number_of_req_pieces)
    piecesstored_in_stock=medicineWarehouseStock_obj.piece_stored
    pieces_leftin_stock=float(piecesstored_in_stock)-float(total_number_of_req_pieces)
    print("piecesstored_in_stock",piecesstored_in_stock)
    print("pieces_leftin_stock",pieces_leftin_stock)

    if pieces_leftin_stock==0:
        boxes_stored_in_stock=0
        print("boxes_stored_in_stock-1",boxes_stored_in_stock)
    else:
        boxes_stored_in_stock= float(pieces_leftin_stock)/float(pieceunit)
        boxes_stored_in_stock= math.ceil(boxes_stored_in_stock)
        print("boxes_stored_in_stock-2",boxes_stored_in_stock)
    try:
        despStrg_obj=despensoryStock.objects.get(medicine=medicine_obj,status="In Use")
        medBatobj1=medicineBatches.objects.get(medicine_strg=despStrg_obj.medicine_strg)
        medBatobj2=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)

        print("medBatobj1.batch_no",medBatobj1.batch_no)
        print("medBatobj2.batch_no",medBatobj2.batch_no)
        if medBatobj1.batch_no==medBatobj2.batch_no:

            box_stored_in_desp=despStrg_obj.box_stored
            
            numofboxes=(float(box_stored_in_desp)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored_in_stock)
            print("numofboxes",numofboxes)
            # print("CARTON",(despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored)-carton_stored)
            noofpieces=(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_leftin_stock)

            despStrg_obj.box_stored=numofboxes
            despStrg_obj.piece_stored=noofpieces
            despStrg_obj.save()

            despStrgHist_obj=despensoryStockHistory()
            despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
            despStrgHist_obj.desp_stock=despStrg_obj
            despStrgHist_obj.medicine=medicineobj
            despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
            despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
            boxes=medicineWarehouseStock_obj.box_stored-boxes_stored_in_stock
            despStrgHist_obj.box_stored=despStrg_obj.box_stored
            despStrgHist_obj.strip_stored=despStrg_obj.strip_stored
            despStrgHist_obj.piece_stored=despStrg_obj.piece_stored
            
            despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
            despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
            despStrgHist_obj.status="Updated"
            despStrgHist_obj.save()
        else:
            print("Storing in Temp desponsory")
            tempDespStrgObj=tempDespensoryStock()
            print("Storing in Temp desponsory lin2")

            medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
            tempDespStrgObj.batch_no=medBatobj.batch_no
            print("Storing in Temp desponsory lin4")

            tempDespStrgObj.medicine=medicineobj
            tempDespStrgObj.medicinewh_stock=medicineWarehouseStock_obj
            tempDespStrgObj.box_unit=medicineWarehouseStock_obj.box_unit
            tempDespStrgObj.strip_unit=medicineWarehouseStock_obj.strip_unit
            tempDespStrgObj.piece_unit=medicineWarehouseStock_obj.piece_unit
            boxes=medicineWarehouseStock_obj.box_stored-boxes_stored_in_stock
            print("printing line5")
            tempDespStrgObj.box_stored=boxes
            print("printing line6")

            tempDespStrgObj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_leftin_stock
            print("printing line7")


            tempDespStrgObj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
            tempDespStrgObj.strip_price_unit=medicineWarehouseStock_obj.strip_price_unit
            tempDespStrgObj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
            print("printing line8")

            tempDespStrgObj.save()
            print("tempDespStrgObj stored",tempDespStrgObj)

    except:

        despStrg_obj=despensoryStock()
        # medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        # despStrg_obj.batch_no=medBatobj.batch_no
        despStrg_obj.medicine=medicine_obj
        despStrg_obj.medicine_strg=medicineWarehouseStock_obj
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored_in_stock
        despStrg_obj.box_stored=boxes
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_leftin_stock
        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrg_obj.status="In Use"
        despStrg_obj.save()

        despStrgHist_obj=despensoryStockHistory()
        despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
        despStrgHist_obj.desp_stock=despStrg_obj
        despStrgHist_obj.medicine=medicine_obj
        despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored_in_stock
        despStrgHist_obj.box_stored=boxes
        despStrgHist_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_leftin_stock
        despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrgHist_obj.status="Added"
        despStrgHist_obj.save()
        ttmds_obj=tt_Medicine_DespensoryStock()
        ttmds_obj.medicine=medicine_obj
        ttmds_obj.medicine_strg=medicineWarehouseStock_obj
        ttmds_obj.desp_stock=despStrg_obj
        ttmds_obj.save()

    if boxes_stored_in_stock==0 and pieces_leftin_stock==0.0:
        medicineWarehouseStock_obj.status="Used"
        medbatch_obj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        medbatch_obj.status="Used"
        medbatch_obj.save()
        med_name=medicineWarehouseStock_obj.medicine.medicine_name
        print("med_name",med_name)
        medObj=Medicine.objects.get(medicine_name=med_name)
        batch_no=int(medbatch_obj.batch_no)
        batch_no_new=batch_no+1
        try:
            tempMedWhStk_Med_Obj=tt_tempMedWhStk_Med.objects.get(medicine=medObj,batch_no=batch_no_new)
            saveMedicineToWhStockFromTempMedStock(tempMedWhStk_Med_Obj,medObj)
            tempMedWhStk_Med_Obj.delete()
        except:
            print("Nothing found in Temp Stock>>>>>>>>>>>>>>>>>>>>>>>>")





       
    medicineWarehouseStock_obj.box_stored=boxes_stored_in_stock
    medicineWarehouseStock_obj.piece_stored=pieces_leftin_stock
    medicineWarehouseStock_obj.save()

    medicineWhStockHistory_obj=medicineWhStockHistory()
    medicineWhStockHistory_obj.medicine_wh_stock=medicineWarehouseStock_obj
    medicineWhStockHistory_obj.box_stored=boxes_stored_in_stock
    medicineWhStockHistory_obj.strip_stored=0
    medicineWhStockHistory_obj.piece_stored=pieces_leftin_stock
    medicineWhStockHistory_obj.status="Updated"
    medicineWhStockHistory_obj.save()

    
    
def retrieveMedicineType(request):
    if request.method=="GET":
        
        # Retrieve Medicine Type list from the model Medicine Type
    
        print(medicineType.objects.all().values_list('medicine_type_name',flat=True))
        medicine_type_list=list(medicineType.objects.all().values_list('medicine_type_name',flat=True))
        data={"medicine_type_list":medicine_type_list}
        return JsonResponse(data)
def retrieveEmployeeType(request):
    if request.method=="GET":
        print(employeeType.objects.all().values_list('type_name',flat=True))
        employee_type_list=list(employeeType.objects.all().values_list('type_name',flat=True))
        data={'employee_type_list':employee_type_list}
        return JsonResponse(data)

def retrieveMedicineName(request):
    if request.method=="GET":
        # Retrieve Medicine Type list from the model Medicine Type
    
        print(Medicine.objects.all().values_list('medicine_name',"medicine_type_id__medicine_type_name"))
        medicine_name_list=list(Medicine.objects.all().values_list('medicine_name',flat=True))
        medicine_name_type_list=list(Medicine.objects.all().values_list('medicine_name',"medicine_type_id__medicine_type_name"))
        print("medicine_name_type_list",medicine_name_type_list)
        
        mcobj=MedicineController(med_name_type_list=medicine_name_type_list)
        med_name_type_dict=mcobj.createMedNameTypeDict()
        print("med_name_type_dict",med_name_type_dict)
        print("medicine_name_type_list",medicine_name_type_list)
        data={
            "medicine_name_list":medicine_name_list,
            "med_name_type_dict":json.dumps(med_name_type_dict),
            "medicine_name_type_list":medicine_name_type_list,
            }
        return JsonResponse(data)

def retrievePackageTypes(request):
        if request.method=="GET":
            package_type_list=list(packageType.objects.all().values_list('package_name',flat=True))
            data={
                "package_type_list":json.dumps(package_type_list),
            }
        return JsonResponse(data)
def retrieveMedicineGenDataFromStock(request):
    medicine_in_stock=[]
    medicine_batch_in_stock_dict={}
    medicine_batch_in_stock_list=[]
    if request.method=="GET":
        mwhs_objs=medicineWarehouseStock.objects.all().distinct()
        for mwhs_obj in mwhs_objs:
            # print("mwhs_obj--",mwhs_obj.medicine.medicine_name)
            medbatch_obj=medicineBatches.objects.get(medicine_strg=mwhs_obj)
            if medbatch_obj.status=="Active":
                medbatchno=medbatch_obj.batch_no
                medname=mwhs_obj.medicine.medicine_name
                medicine_in_stock.append(medname)
                medicine_batch_in_stock_list.append([medname,medbatchno])
                medicine_batch_in_stock_dict[medname]=medbatchno
        print("medicine_in_stock",medicine_in_stock)
        print("medicine_batch_in_stock_dict",medicine_batch_in_stock_dict)
        data={
            "medicine_in_stock":medicine_in_stock,
            'medicine_batch_in_stock_dict':json.dumps(medicine_batch_in_stock_dict),
            "medicine_batch_in_stock_list":medicine_batch_in_stock_list,
        }
        return JsonResponse(data)
def retrieveMedicineStockDataFromStock(request):
    medstockdatafromstock_allval_dict={}
    medicine_batch_in_tempstock_list=[]
    if request.method=="POST":
        medicine_name=request.POST.get("medicine_name")
        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        mwhs_objs=medicineWarehouseStock.objects.get(medicine=medicine_obj,status="In Use")
        
        boxes=mwhs_objs.box_stored
        strips=mwhs_objs.strip_stored
        strip_unit=mwhs_objs.strip_unit
        print("Strips",strips)
        if strip_unit==None :
            strip_unit="-"
        if strips==None :
            strips=0
        pieces=mwhs_objs.piece_stored
        
        medstockdatafromstock_allval_dict["boxes"]=boxes
        medstockdatafromstock_allval_dict["strips"]=strips
        medstockdatafromstock_allval_dict["pieces"]=pieces
        # medstockdatafromstock_allval_dict["strip_unit"]=strip_unit

        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        tempmedwhstk_objs=tt_tempMedWhStk_Med.objects.filter(medicine=medicine_obj)
        for tempmedwhstk_obj in tempmedwhstk_objs:
            templist=[]
            templist.append(medicine_name)
            templist.append(tempmedwhstk_obj.batch_no)
            templist.append(tempmedwhstk_obj.box_stored)
            templist.append(tempmedwhstk_obj.strip_stored)

            templist.append(tempmedwhstk_obj.piece_stored)
            medicine_batch_in_tempstock_list.append(templist)
        print("medicine_batch_in_tempstock_list",medicine_batch_in_tempstock_list)


        



        data={
            "medstockdatafromstock_allval_dict":json.dumps(medstockdatafromstock_allval_dict),
            "medicine_batch_in_tempstock_list":medicine_batch_in_tempstock_list,
            "boxes":boxes,
            "strips":strips,
            "pieces":pieces,
            "strip_unit":strip_unit,
        }
        return JsonResponse(data)
        # mwhs_objs=medicineWarehouseStock.objects.get.
        # for mwhs_obj in mwhs_objs:
        #     # print("mwhs_obj--",mwhs_obj.medicine.medicine_name)
        #     medbatch_obj=medicineBatches.objects.get(medicine_strg=mwhs_obj)
        #     medbatchno=medbatch_obj.batch_no
        #     medname=mwhs_obj.medicine.medicine_name

def retrieveMedicineTempStockFromTempStock(request):
    medicine_batch_in_tempstock_list=[]

    if request.method=="POST":
        medicine_name=request.POST.get("medicine_name")
        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        tempmedwhstk_objs=tt_tempMedWhStk_Med.objects.filter(medicine=medicine_obj)
        for tempmedwhstk_obj in tempmedwhstk_objs:
            templist=[]
            templist.append(medicine_name)
            templist.append(tempmedwhstk_obj.batch_no)
            templist.append(tempmedwhstk_obj.box_stored)
            templist.append(tempmedwhstk_obj.strip_stored)

            templist.append(tempmedwhstk_obj.piece_stored)
            medicine_batch_in_tempstock_list.append(templist)
        data={
            "medicine_batch_in_tempstock_list":medicine_batch_in_tempstock_list,
        }
        return JsonResponse(data)

def savePatientData(request):
    if request.method=="POST":
        name = request.POST.get('name')
        print(name)
        dob = request.POST.get('dob')

        gender = request.POST.get('gender')
        phone_number = request.POST.get('phone_number')
        address = request.POST.get('address')
        guardian = request.POST.get('guardian')
        email_address = request.POST.get('email_address')
        cnic = request.POST.get('cnic')
        blood_group = request.POST.get('blood_group')

        name = json.loads(name)
        dob = json.loads(dob)
        gender = json.loads(gender)
        phone_number = json.loads(phone_number)
        address = json.loads(address)
        guardian = json.loads(guardian)
        email_address = json.loads(email_address)
        cnic = json.loads(cnic)
        blood_group = json.loads(blood_group)

        print(name)
        print(gender)
        print(email_address)
        
        pat_obj=Patient()
        pat_obj.guardian=guardian
        pat_obj.pat_name=name
        pat_obj.dob=dob
        pat_obj.gender=gender
        pat_obj.phone_no=phone_number
        pat_obj.address=address
        pat_obj.bloodgroup=blood_group
        pat_obj.email_address=email_address
        pat_obj.cnic=cnic

        pat_obj.save()

        data={
            'success':"success"
        }
        return JsonResponse(data)


def saveEmployeeData(request):
    if request.method=="POST":
        name = request.POST.get('name')
        print(name)
        dob = request.POST.get('dob')
        employee_type = request.POST.get('employee_type')
        print("employee_type",employee_type)

        gender = request.POST.get('gender')
        phone_number = request.POST.get('phone_number')
        address = request.POST.get('address')
        qualification = request.POST.get('qualification')
        email_address = request.POST.get('email_address')
        cnic = request.POST.get('cnic')


        name = json.loads(name)
        dob = json.loads(dob)
        gender = json.loads(gender)
        phone_number = json.loads(phone_number)
        address = json.loads(address)
        qualification = json.loads(qualification)
        employee_type = json.loads(employee_type)

        email_address = json.loads(email_address)
        cnic = json.loads(cnic)



        print(name)
        print(gender)
        print(email_address)
        print("employee_type",employee_type)
        
        emp_obj=Employee()
        emptype_obj=employeeType.objects.get(type_name=employee_type)
        emp_obj.employee_type=emptype_obj
        emp_obj.name=name
        emp_obj.dob=dob
        emp_obj.gender=gender
        emp_obj.phone_no=phone_number
        emp_obj.address=address
        emp_obj.qualification=qualification
        emp_obj.email_address=email_address
        emp_obj.cnic=cnic

        emp_obj.save()

        data={
            'success':"success"
        }
        return JsonResponse(data)



def sendAjaxReqToSaveMedicineToDb(request):
    if request.method=="POST":
        medicine_name = request.POST.get('medicine_name')
        selected_type = request.POST.get('selected_type')
        med_details = request.POST.get('med_details')
        add_charge_status=request.POST.get('add_charge_status')
        medicine_name = json.loads(medicine_name)
        selected_type = json.loads(selected_type)
        med_details = json.loads(med_details)
        add_charge_status = json.loads(add_charge_status)


        print(medicine_name)
        print(selected_type)
        print(med_details)
        
        med_obj=Medicine()
        med_obj.medicine_type_id=medicineType.objects.get(medicine_type_name=selected_type)
        med_obj.medicine_name=medicine_name
        med_obj.medicine_details=med_details
        med_obj.add_charge=add_charge_status
        med_obj.save()
        medicine_name_type_list=list(Medicine.objects.all().values_list('medicine_name',"medicine_type_id__medicine_type_name"))

        data={
        "medicine_name_type_list":medicine_name_type_list,
        }
        return JsonResponse(data)
def checkMedicineInmedicineBatches(request):
    if request.method=="POST":
        medicine_name = request.POST.get('medicine_name')
        print("Medicine name",medicine_name)
        medobj=Medicine.objects.get(medicine_name=medicine_name)
        medContObj=MedicineController()
        batchno=medContObj.checkMedInmedicineBatches(medContObj.m_id,medobj)
        print("BatchNo",batchno)

        data={
            'success':"success",
            "batchno":batchno
        }
        return JsonResponse(data)
from django.utils.dateparse import parse_date 
from datetime import datetime
def saveMedicineToWhStock(request):
    if request.method=="POST":

        medicine_name=request.POST.get("medicine_name")
        batchno=request.POST.get("batchno")
        purchase_rate=request.POST.get("purchaserate")
        print("purchase_rate",purchase_rate)
        manufactor_date=request.POST.get("manufactor_date")
        manufactor_date=str(manufactor_date)
        manufactor_date=manufactor_date.replace("/", "-")
        print("manufactor_date",manufactor_date)
        exp_date=request.POST.get("exp_date")
        exp_date=str(exp_date)
        exp_date=exp_date.replace("/", "-")
        print("exp_date",exp_date)
        main_package_type=request.POST.get("main_package_type")
        main_quantity_input=request.POST.get("main_quantity_input")
        subleveldata=request.POST.get("subleveldata")
        subleveldata=json.loads(subleveldata)
        packages_priceandquant_dict=request.POST.get("packages_priceandquant_dict")
        packages_priceandquant_dict=json.loads(packages_priceandquant_dict)

        print("medicine_name",medicine_name)
        print("batchno",batchno)
        print("manufactor_date",manufactor_date)
        print("exp_date",exp_date)
        print("main_package_type",main_package_type)
        print("main_quantity_input",main_quantity_input)
        print("subleveldata",subleveldata)
        print("packages_priceandquant_dict",packages_priceandquant_dict)

        # first check if the medicine is already in stock. 
        medObj=Medicine.objects.get(medicine_name=medicine_name)
        
        try:
            medicineWarehouseStock.objects.get(medicine=medObj,status="In Use")
            tempMedWhStkObj=tt_tempMedWhStk_Med()
            tempMedWhStkObj.medicine=medObj
            tempMedWhStkObj.batch_no=batchno
            tempMedWhStkObj.purchase_rate=purchase_rate
            tempMedWhStkObj.box_unit=1
            for index in subleveldata:
                if index[0]=="Strip":
                    tempMedWhStkObj.strip_unit=index[1]
                elif index[0]=="Piece":
                    tempMedWhStkObj.piece_unit=index[1]
            tempMedWhStkObj.box_stored=packages_priceandquant_dict["Box"][0]
            try :
                packages_priceandquant_dict["Strip"][0]
                tempMedWhStkObj.strip_stored=packages_priceandquant_dict["Strip"][0]
            except:
                tempMedWhStkObj.strip_stored=0
            tempMedWhStkObj.piece_stored=packages_priceandquant_dict["Piece"][0]
            tempMedWhStkObj.box_price_unit=packages_priceandquant_dict["Box"][1]
            try:
                packages_priceandquant_dict["Strip"][1]
                tempMedWhStkObj.strip_price_unit=packages_priceandquant_dict["Strip"][1]
            except:
                tempMedWhStkObj.strip_price_unit=0 
            tempMedWhStkObj.piece_price_unit=packages_priceandquant_dict["Piece"][1]
            # tempMedWhStkObj = datetime.strptime(manufactor_date, "%m-%d-%Y")
            # # temp_date = parse_date(manufactor_date)

            # tempMedWhStkObj.manufac_date=manufactor_date.date()
            # exp_date = datetime.strptime(exp_date, "%m-%d-%Y")
            # tempMedWhStkObj.exp_date=exp_date.date()
            tempMedWhStkObj.status="Not Used"
            tempMedWhStkObj.save()
            print("KKKK")

        except:

            mwh_stock_obj=medicineWarehouseStock()
            mwh_stock_obj.medicine=medObj
            mwh_stock_obj.purchase_rate=purchase_rate
            mwh_stock_obj.box_unit=1
            for index in subleveldata:
                if index[0]=="Strip":
                    mwh_stock_obj.strip_unit=index[1]
                elif index[0]=="Piece":
                    mwh_stock_obj.piece_unit=index[1]
        
            mwh_stock_obj.box_stored=packages_priceandquant_dict["Box"][0]
            try :
                packages_priceandquant_dict["Strip"][0]
                mwh_stock_obj.strip_stored=packages_priceandquant_dict["Strip"][0]
            except:
                mwh_stock_obj.strip_stored=0
            mwh_stock_obj.piece_stored=packages_priceandquant_dict["Piece"][0]
            mwh_stock_obj.box_price_unit=packages_priceandquant_dict["Box"][1]
            try:
                packages_priceandquant_dict["Strip"][1]
                mwh_stock_obj.strip_price_unit=packages_priceandquant_dict["Strip"][1]
            except:
                mwh_stock_obj.strip_price_unit=0 
            mwh_stock_obj.piece_price_unit=packages_priceandquant_dict["Piece"][1]
            
            manufactor_date = datetime.strptime(manufactor_date, "%m-%d-%Y")
            # temp_date = parse_date(manufactor_date)

            mwh_stock_obj.manufac_date=manufactor_date.date()
            exp_date = datetime.strptime(exp_date, "%m-%d-%Y")
            mwh_stock_obj.exp_date=exp_date.date()
            mwh_stock_obj.status="In Use"
            mwh_stock_obj.save()



            mwh_stock_history_obj=medicineWhStockHistory()
            mwh_stock_history_obj.medicine_wh_stock=mwh_stock_obj
            mwh_stock_history_obj.purchase_rate=purchase_rate
            mwh_stock_history_obj.box_unit=1
            for index in subleveldata:
                if index[0]=="Strip":
                    mwh_stock_history_obj.strip_unit=index[1]
                elif index[0]=="Piece":
                    mwh_stock_history_obj.piece_unit=index[1]
        
            mwh_stock_history_obj.box_stored=packages_priceandquant_dict["Box"][0]
            try: 
                packages_priceandquant_dict["Strip"][0]
                mwh_stock_history_obj.strip_stored=packages_priceandquant_dict["Strip"][0]
            except:
                mwh_stock_history_obj.strip_stored=0
            mwh_stock_history_obj.piece_stored=packages_priceandquant_dict["Piece"][0]
            mwh_stock_history_obj.box_price_unit=packages_priceandquant_dict["Box"][1]
            try:
                packages_priceandquant_dict["Strip"][1]
                mwh_stock_history_obj.strip_price_unit=packages_priceandquant_dict["Strip"][1]
            except:
                mwh_stock_history_obj.strip_price_unit=0

            mwh_stock_history_obj.piece_price_unit=packages_priceandquant_dict["Piece"][1]
            
            mwh_stock_history_obj.manufac_date=manufactor_date
            mwh_stock_history_obj.exp_date=exp_date
            mwh_stock_history_obj.status="Added"
            mwh_stock_history_obj.save()
            
            medBatch_obj=medicineBatches()
            medBatch_obj.batch_no=batchno
            medBatch_obj.medicine=Medicine.objects.get(medicine_name=medicine_name)
            medBatch_obj.medicine_strg=mwh_stock_obj
            medBatch_obj.status="Active"
            medBatch_obj.save()
            
            obj=tt_MedicineMedWhStock()
            obj.medicine=Medicine.objects.get(medicine_name=medicine_name)
            obj.mwhs=mwh_stock_obj
            obj.save()




        mwhs_objs=medicineWarehouseStock.objects.all().distinct()
        medicine_batch_in_stock_list=[]
        for mwhs_obj in mwhs_objs:
            # print("mwhs_obj--",mwhs_obj.medicine.medicine_name)
            medbatch_obj=medicineBatches.objects.get(medicine_strg=mwhs_obj)
            if medbatch_obj.status=="Active":
                medbatchno=medbatch_obj.batch_no
                medname=mwhs_obj.medicine.medicine_name
                medicine_batch_in_stock_list.append([medname,medbatchno])
        data={
            'medicine_batch_in_stock_list':medicine_batch_in_stock_list,
        }
        return JsonResponse(data)

def saveMedicineToWhStockBottle(request):
    if request.method=="POST":

        medicine_name=request.POST.get("medicine_name")
        batchno=request.POST.get("batchno")
        purchase_rate=request.POST.get("purchaserate")
        print("purchase_rate",purchase_rate)
        manufactor_date=request.POST.get("manufactor_date")
        manufactor_date=str(manufactor_date)
        manufactor_date=manufactor_date.replace("/", "-")
        print("manufactor_date",manufactor_date)
        exp_date=request.POST.get("exp_date")
        exp_date=str(exp_date)
        exp_date=exp_date.replace("/", "-")
        print("exp_date",exp_date)
        main_package_type=request.POST.get("main_package_type")
        mainbottle_total_quant=request.POST.get("mainbottle_total_quant")
        mainbottle_unit_price=request.POST.get("mainbottle_unit_price")
        dispensorybottle_unit_quant=request.POST.get("dispensorybottle_unit_quant")
        dispensorybottle_total_quant=request.POST.get("dispensorybottle_total_quant")
        dispensorybottle_unit_price=request.POST.get("dispensorybottle_unit_price")
        
        print("medicine_name",medicine_name)
        print("batchno",batchno)
        print("purchase_rate",purchase_rate)
        print("manufactor_date",manufactor_date)
        print("exp_date",exp_date)
        print("main_package_type",main_package_type)

        print("mainbottle_total_quant",mainbottle_total_quant)
        print("mainbottle_unit_price",mainbottle_unit_price)
        print("dispensorybottle_unit_quant",dispensorybottle_unit_quant)
        print("dispensorybottle_total_quant",dispensorybottle_total_quant)
        print("dispensorybottle_unit_price",dispensorybottle_unit_price)
        medObj=Medicine.objects.get(medicine_name=medicine_name)
        
        try:
            medicineWarehouseStock.objects.get(medicine=medObj,status="In Use")
            tempMedWhStkObj=tt_tempMedWhStk_Med()
            tempMedWhStkObj.medicine=medObj
            tempMedWhStkObj.batch_no=batchno
            tempMedWhStkObj.purchase_rate=purchase_rate
            tempMedWhStkObj.box_unit=1
            tempMedWhStkObj.piece_unit=dispensorybottle_unit_quant
            tempMedWhStkObj.box_stored=mainbottle_total_quant
            tempMedWhStkObj.piece_stored=dispensorybottle_total_quant
            tempMedWhStkObj.box_price_unit=mainbottle_unit_price
            tempMedWhStkObj.piece_price_unit=dispensorybottle_unit_price
            tempMedWhStkObj.status="Not Used"
            tempMedWhStkObj.save()
        except:
            mwh_stock_obj=medicineWarehouseStock()
            mwh_stock_obj.medicine=medObj
            mwh_stock_obj.purchase_rate=purchase_rate
            mwh_stock_obj.box_unit=1
            mwh_stock_obj.piece_unit=dispensorybottle_unit_quant
            mwh_stock_obj.box_stored=mainbottle_total_quant
            mwh_stock_obj.piece_stored=dispensorybottle_total_quant
            mwh_stock_obj.box_price_unit=mainbottle_unit_price
            mwh_stock_obj.piece_price_unit=dispensorybottle_unit_price
            mwh_stock_obj.status="In Use"
            mwh_stock_obj.save()

            mwh_stock_history_obj=medicineWhStockHistory()
            mwh_stock_history_obj.medicine_wh_stock=mwh_stock_obj
            mwh_stock_history_obj.purchase_rate=purchase_rate
            mwh_stock_history_obj.box_unit=1
            mwh_stock_history_obj.piece_unit=dispensorybottle_unit_quant
            mwh_stock_history_obj.box_stored=mainbottle_total_quant
            mwh_stock_history_obj.piece_stored=dispensorybottle_total_quant
            mwh_stock_history_obj.box_price_unit=mainbottle_unit_price
            mwh_stock_history_obj.piece_price_unit=dispensorybottle_unit_price
            mwh_stock_history_obj.status="Added"
            mwh_stock_history_obj.save()

            medBatch_obj=medicineBatches()
            medBatch_obj.batch_no=batchno
            medBatch_obj.medicine=Medicine.objects.get(medicine_name=medicine_name)
            medBatch_obj.medicine_strg=mwh_stock_obj
            medBatch_obj.status="Active"
            medBatch_obj.save()

            obj=tt_MedicineMedWhStock()
            obj.medicine=Medicine.objects.get(medicine_name=medicine_name)
            obj.mwhs=mwh_stock_obj
            obj.save()
        mwhs_objs=medicineWarehouseStock.objects.all().distinct()
        medicine_batch_in_stock_list=[]
        for mwhs_obj in mwhs_objs:
            # print("mwhs_obj--",mwhs_obj.medicine.medicine_name)
            medbatch_obj=medicineBatches.objects.get(medicine_strg=mwhs_obj)
            if medbatch_obj.status=="Active":
                medbatchno=medbatch_obj.batch_no
                medname=mwhs_obj.medicine.medicine_name
                medicine_batch_in_stock_list.append([medname,medbatchno])
        data={
            'medicine_batch_in_stock_list':medicine_batch_in_stock_list,
        }
        return JsonResponse(data)


def saveToDespStock(request):
    if request.method=="POST":
        medicine_name=request.POST.get("medicine_name")
        batchno=request.POST.get("batch_no")
        noofboxes=request.POST.get("noofboxes")
        noofboxes=int(noofboxes)
        noofstrips=request.POST.get("noofstrips")
        noofstrips=int(noofstrips)
        noofpieces=request.POST.get("noofpieces")
        noofpieces=int(noofpieces)

        print("medicine_name",medicine_name)
        print("batchno",batchno)
        print("noofboxes",noofboxes)
        print("noofpieces",noofpieces)


        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        medicineWarehouseStock_obj=medicineWarehouseStock.objects.get(medicine=medicine_obj,status="In Use")
        if medicineWarehouseStock_obj:
            if(medicineWarehouseStock_obj.strip_stored==0 or medicineWarehouseStock_obj.strip_stored==None ):
                NoStripCalculation(medicineWarehouseStock_obj,medicine_obj,noofboxes,noofpieces)

            else:
                WithStripCalculation(medicineWarehouseStock_obj,medicine_obj,noofboxes,noofstrips,noofpieces)

        # retrieving medicine in stock data
        medicine_batch_in_stock_dict={}
        medicine_batch_in_stock_list=[]
        mwhs_objs=medicineWarehouseStock.objects.all().distinct()
        for mwhs_obj in mwhs_objs:
            medbatch_obj=medicineBatches.objects.get(medicine_strg=mwhs_obj)
            if medbatch_obj.status=="Active":
                medbatchno=medbatch_obj.batch_no
                medname=mwhs_obj.medicine.medicine_name
                medicine_batch_in_stock_list.append([medname,medbatchno])
                medicine_batch_in_stock_dict[medname]=medbatchno
        data={
            "medicine_batch_in_stock_list":medicine_batch_in_stock_list,
        }
        return JsonResponse(data)
def saveMedicineToWhStockFromTempMedStock(tempMedWhStk_Med_Obj,medObj):
    # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    mwh_stock_obj=medicineWarehouseStock()
    mwh_stock_obj.medicine=medObj
    mwh_stock_obj.status="In Use"
    mwh_stock_obj.purchase_rate=tempMedWhStk_Med_Obj.purchase_rate
    mwh_stock_obj.box_unit=tempMedWhStk_Med_Obj.box_unit
    mwh_stock_obj.strip_unit=tempMedWhStk_Med_Obj.strip_unit
    mwh_stock_obj.piece_unit=tempMedWhStk_Med_Obj.piece_unit
    mwh_stock_obj.box_stored=tempMedWhStk_Med_Obj.box_stored
    mwh_stock_obj.strip_stored=tempMedWhStk_Med_Obj.strip_stored
    mwh_stock_obj.piece_stored=tempMedWhStk_Med_Obj.piece_stored
    mwh_stock_obj.box_price_unit=tempMedWhStk_Med_Obj.box_price_unit
    mwh_stock_obj.strip_price_unit=tempMedWhStk_Med_Obj.strip_price_unit
    mwh_stock_obj.piece_price_unit=tempMedWhStk_Med_Obj.piece_price_unit
    mwh_stock_obj.exp_date=tempMedWhStk_Med_Obj.exp_date
    mwh_stock_obj.save()
    # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    mwh_stock_history_obj=medicineWhStockHistory()
    mwh_stock_history_obj.medicine_wh_stock=mwh_stock_obj
    mwh_stock_history_obj.status="Added"
    mwh_stock_history_obj.purchase_rate=tempMedWhStk_Med_Obj.purchase_rate
    mwh_stock_history_obj.box_unit=tempMedWhStk_Med_Obj.box_unit
    mwh_stock_history_obj.strip_unit=tempMedWhStk_Med_Obj.strip_unit
    mwh_stock_history_obj.piece_unit=tempMedWhStk_Med_Obj.piece_unit
    mwh_stock_history_obj.box_stored=tempMedWhStk_Med_Obj.box_stored
    mwh_stock_history_obj.strip_stored=tempMedWhStk_Med_Obj.strip_stored
    mwh_stock_history_obj.piece_stored=tempMedWhStk_Med_Obj.piece_stored
    mwh_stock_history_obj.box_price_unit=tempMedWhStk_Med_Obj.box_price_unit
    mwh_stock_history_obj.strip_price_unit=tempMedWhStk_Med_Obj.strip_price_unit
    mwh_stock_history_obj.piece_price_unit=tempMedWhStk_Med_Obj.piece_price_unit
    mwh_stock_history_obj.exp_date=tempMedWhStk_Med_Obj.exp_date
    mwh_stock_history_obj.save()
    # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    medBatch_obj=medicineBatches()
    medBatch_obj.batch_no=tempMedWhStk_Med_Obj.batch_no
    medBatch_obj.medicine=medObj
    medBatch_obj.medicine_strg=mwh_stock_obj
    medBatch_obj.status="Active"
    medBatch_obj.save()
    # >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    obj=tt_MedicineMedWhStock()
    obj.medicine=medObj
    obj.mwhs=mwh_stock_obj
    obj.save()

class patientDashboard(TemplateView):
    template_path_name="rmcapp/patient_dashboard_template/patient_dashboard.html"
    def get(self,request):
        return render(request,self.template_path_name)
    def post(self,request):
        pass

def retrievePatientInfoInPresForm(request):
    if request.method=="GET":
        pat_name=request.GET.get("pat_name")
        contact_no=request.GET.get("contact_no")
        cnic=request.GET.get("cnic")
        contact_no=""
        cnic=""

        # pat_objs=Patient.objects.filter(Q(pat_name=pat_name) | Q(phone_no=contact_no) | Q(cnic=cnic)| Q(id=id))
        pat_objs=Patient.objects.filter(Q(pat_name__contains=pat_name) | Q(phone_no=contact_no) | Q(cnic=cnic))

        # pat_objs=Patient.objects.get(id=1)
        print("pat_objs",pat_objs)
        patient_dict={}
        for pat_obj in pat_objs:
            patient_info_dict={}
            patient_info_dict['name']=pat_obj.pat_name
            patient_info_dict['contact_no']=pat_obj.phone_no
            patient_info_dict['gender']=pat_obj.gender
            patient_info_dict['dob']=str(pat_obj.dob)
            patient_info_dict['cnic']=pat_obj.cnic
            patient_info_dict['guardian']=pat_obj.guardian
            patient_info_dict['address']=pat_obj.address
            patient_info_dict['bloodgroup']=pat_obj.bloodgroup
            patient_info_dict['email']=pat_obj.email_address
            patient_dict[pat_obj.id]=[]
            patient_dict[pat_obj.id]=patient_info_dict
        print("patient_dict",patient_dict)
        emptype_obj=employeeType.objects.get(type_name="Doctor")
        embobjs=Employee.objects.filter(employee_type=emptype_obj)
        empdict={}
        for obj in embobjs:
            empdict[obj.id]=obj.name
            print("Emp Name",obj.name)
        data={
            "patient_dict":json.dumps(patient_dict),
            "empdict":json.dumps(empdict),
        }
        return JsonResponse(data)
def retrieveAllPatientInfo(request):
    if request.method=="GET":
        
        pat_objs=Patient.objects.all()

        print("pat_objs",pat_objs)
        patient_dict={}
        for pat_obj in pat_objs:
            patient_info_dict={}
            patient_info_dict['name']=pat_obj.pat_name
            patient_info_dict['contact_no']=pat_obj.phone_no
            patient_info_dict['gender']=pat_obj.gender
            patient_info_dict['dob']=str(pat_obj.dob)
            patient_info_dict['cnic']=pat_obj.cnic
            patient_info_dict['guardian']=pat_obj.guardian
            patient_info_dict['address']=pat_obj.address
            patient_info_dict['bloodgroup']=pat_obj.bloodgroup
            patient_info_dict['email']=pat_obj.email_address
            patient_dict[pat_obj.id]=[]
            patient_dict[pat_obj.id]=patient_info_dict
        print("patient_dict",patient_dict)

        data={
            "patient_dict":json.dumps(patient_dict),
        }
        return JsonResponse(data)
def viewAllPatients(request):
    if request.method=="GET":
        data={
        }
        return JsonResponse(data)    
def retrieveRoomInfoInRoomWard(request):
    if request.method=="GET":

        room_objs=Rooms.objects.filter(status='Available')
        print("room_objs",room_objs)

        room_dict={}
        for room_obj in room_objs:
            room_info_dict={}
            room_info_dict['floor_no']=room_obj.floor
            room_info_dict['room_no']=room_obj.room_no
            room_info_dict['charge_per_day']=room_obj.charge_per_day
            room_info_dict['ac_charge_per_day']=room_obj.ac_charge_per_day
            room_dict[room_obj.id]=[]
            room_dict[room_obj.id]=room_info_dict
        print("room_dict", room_dict)

        data={
            "room_dict":json.dumps(room_dict),
        }
        return JsonResponse(data)

def retrieveWardInfoInRoomWard(request):
    if request.method=="GET":

        ward_objs=Ward.objects.filter(status='Available')
        ward_dict={}
        for ward_obj in ward_objs:
            ward_info_dict={}
            ward_info_dict['ward_no']=ward_obj.ward_no
            ward_info_dict['bed_no']=ward_obj.bed_no
            ward_info_dict['charge_per_day']=ward_obj.charge_per_day
            ward_dict[ward_obj.id]=[]
            ward_dict[ward_obj.id]=ward_info_dict
        print("ward_dict", ward_dict)


        data={
            "ward_dict":json.dumps(ward_dict),
        }
        return JsonResponse(data)

def retirevePatientInfo(request):
    if request.method=="GET":
        pat_name=request.GET.get("pat_name")
        # contact_no=request.GET.get("contact_no")
        # cnic=request.GET.get("cnic")
        contact_no=""
        cnic=""
        #phone_no=contact_no,cnic=cnic_no

        # pat_objs=Patient.objects.filter(Q(pat_name=pat_name) | Q(phone_no=contact_no) | Q(cnic=cnic)| Q(id=id))
        pat_objs=Patient.objects.filter(Q(pat_name=pat_name) | Q(phone_no=contact_no) | Q(cnic=cnic))

        # pat_objs=Patient.objects.get(id=1)
        print("pat_objs",pat_objs)
        patient_dict={}
        for pat_obj in pat_objs:
            patient_info_dict={}
            patient_info_dict['name']=pat_obj.pat_name
            patient_info_dict['contact_no']=pat_obj.phone_no
            patient_info_dict['gender']=pat_obj.gender
            patient_info_dict['dob']=str(pat_obj.dob)
            patient_info_dict['cnic']=pat_obj.cnic
            patient_info_dict['guardian']=pat_obj.guardian
            patient_info_dict['address']=pat_obj.address
            patient_info_dict['bloodgroup']=pat_obj.bloodgroup
            patient_info_dict['email']=pat_obj.email_address
            patient_dict[pat_obj.id]=[]
            patient_dict[pat_obj.id]=patient_info_dict
        print("patient_dict",patient_dict)


 
        data={
            "patient_dict":json.dumps(patient_dict),
            # 'id':str(id),
        }
        return JsonResponse(data)

def retrievePatTypeFee(request):

    if request.method=="GET":
        pat_type=request.GET.get("optionSelected")
        patTypeObj=patientType.objects.get(patient_type=pat_type)
        charges=patTypeObj.charges
        data={
            "charges":charges,
        }
        return JsonResponse(data)

def retrievePatientInfoInPatientBill(request):
   if request.method=="GET":
      
        id=request.GET.get("id")
        id=int(id)
        patPresRecObj=patPrescriptionRecords.objects.get(id=id)
        pat_obj=patPresRecObj.patient
    
        patient_dict={}
        patient_info_dict={}
        patient_info_dict['name']=pat_obj.pat_name
        patient_info_dict['contact_no']=pat_obj.phone_no
        patient_info_dict['gender']=pat_obj.gender
        patient_info_dict['dob']=str(pat_obj.dob)
        patient_info_dict['cnic']=pat_obj.cnic
        patient_info_dict['guardian']=pat_obj.guardian
        patient_info_dict['address']=pat_obj.address
        patient_info_dict['bloodgroup']=pat_obj.bloodgroup
        patient_info_dict['email']=pat_obj.email_address
        patient_dict[pat_obj.id]=[]
        patient_dict[pat_obj.id]=patient_info_dict
        print("patient_dict",patient_dict)
        patient_id=pat_obj.id
        emptype_obj=employeeType.objects.get(type_name="Doctor")
        embobjs=Employee.objects.filter(employee_type=emptype_obj)
        empdict={}
        for obj in embobjs:
            empdict[obj.id]=obj.name
            print("Emp Name",obj.name)
        data={
            "patient_dict":json.dumps(patient_dict),
            'id':str(patient_id),
            "empdict":json.dumps(empdict),

        }
        return JsonResponse(data)

def viewPatientHistory(request):
    if request.method=="GET":
        



        # data={
        #     "patient_dict":json.dumps(patient_dict),
        # }
        return JsonResponse(data)
        
def updatePatientData(request):
    if request.method=="POST":
        patient_id=request.POST.get('patient_id')
        patient_id=json.loads(patient_id)
        patient_id=int(patient_id)

        patient_name=request.POST.get('patient_name')
        patient_name=json.loads(patient_name)

        gender=request.POST.get('gender')
        gender=json.loads(gender)

        guardian=request.POST.get('guardian')
        guardian=json.loads(guardian)

        phone_number=request.POST.get('phone_number')
        phone_number=json.loads(phone_number)

        address=request.POST.get('address')
        address=json.loads(address)

        blood_group=request.POST.get('blood_group')
        blood_group=json.loads(blood_group)
        
        email_address=request.POST.get('email_address')
        email_address=json.loads(email_address)

        cnic=request.POST.get('cnic')
        cnic=json.loads(cnic)
       
        dob=request.POST.get('dob')
        dob=json.loads(dob)


        pat_obj=Patient.objects.get(id=patient_id)
        # if pat_obj.pat_name!=patient_name:
        pat_obj.pat_name=patient_name
        pat_obj.phone_no=phone_number
        pat_obj.gender=gender
        pat_obj.guardian=guardian
        pat_obj.dob=dob
        pat_obj.address=address
        pat_obj.email_address=email_address
        pat_obj.bloodgroup=blood_group
        pat_obj.cnic=cnic
        pat_obj.save()
        return JsonResponse({})

def retirevePatientMedHistory(request):
    if request.method=="POST":
        patient_id=request.POST.get('patient_id')
        patient_id=int(patient_id)
        # from patient med record 
        # retrieve patient medical records where date is distinct and id=1
        datelist=[]
        pat_med_history_dict={}
        pmr_objs=patientMedRecords.objects.filter(patient=patient_id)
        for pmr_obj in pmr_objs:
            temp_dict={}
            datelist.append(str(pmr_obj.datevisited))
            
            # temp_dict['blood_pressure']=pmr_obj.blood_pressure
            prescription = [ int(x) for x in pmr_obj.prescription ]
            med_obj=Medicine.objects.filter(id__in=prescription)
            med_list=list(med_obj.values_list("medicine_name","weight"))
            print("Med list",med_list)
            temp_dict['prescription']=med_list
          

            pat_med_history_dict[str(pmr_obj.datevisited)]=temp_dict
        print("pmr_objs",pmr_objs)
        print("datelist",datelist)
        data={
            'datelist':datelist,
            'pat_med_history_dict':pat_med_history_dict
        }
        return JsonResponse(data)
presData={}
def printPatientPrescription(request):
    template_path_name="rmcapp/patient_dashboard_template/patient_pres.html"
    global presData
    if request.method=='GET':
        if request.is_ajax():
            
            print("LOADING PATIENT PRES")
            data={'presData':json.dumps(presData)}
            return JsonResponse(data)     
        data={}   
    return render(request,template_path_name,data)
    if request.method=="POST":
        pass
        # if request.is_ajax():
        #     print("In Ajax")
        #     print("presData",presData)
        #     data={
        #         'presData':json.dumps(presData),
        #     }
        #     return JsonResponse(data)
        
@csrf_exempt 
def generatePrescription(request):
    global presData

    if request.method=="GET":
        presData=request.GET.get('presData')
        presData=json.loads(presData)
        print("presData",presData)
        patient_type=presData['pat_type']
        # Add data to Prescription Record
        presRecObj=patPrescriptionRecords()
        patObj=Patient.objects.get(id=int(presData['pat_id']))
        presRecObj.patient=patObj
        doc_id=int(presData['doctor'])
        empObj=Employee.objects.get(id=doc_id)
        presRecObj.doc=empObj
        patTypeObj=patientType.objects.get(patient_type=patient_type)
        presRecObj.patient_type=patTypeObj
        presRecObj.save()
        presData['pres_id']=presRecObj.id

        # Add Data to Prescription Bill Records. 
        patPresBillObj=patPrescriptionBill()
        patPresBillObj.pres=presRecObj
        patPresBillObj.discount=presData['discount']
        patPresBillObj.discount_percentage=presData['discount_percent']
            # Discount Reason Missing --patPresBillObj.discount_reason=presData['discount_reason']
        patPresBillObj.net_total=presData['net_total']
        patPresBillObj.status="Paid"
        patPresBillObj.save()
        # Adding Data to invoice Records
        invObj=invoiceRecords()
        invObj.pres=presRecObj
        invObj.net_total=presData['net_total']
        invObj.status="Paid"
        invObj.save()
        if patient_type=='Indoor':
            if presData['bed_type']=="Room":
                roomObj=Rooms.objects.get(id=int(presData['room_id']))
                roomBillObj=patientRoomsBill()
                roomBillObj.patient=patObj
                roomBillObj.rooms=roomObj
                roomBillObj.pres=presRecObj
                # have to add check in date and time here. 
                roomBillObj.save()
                
            else:
                wardObj=Ward.objects.get(id=int(presData['ward_id']))
                wardBillObj=patientWardBill()
                wardBillObj.patient=patObj
                wardBillObj.pres=presRecObj
                wardBillObj.wards=wardObj
                # have to add check in date and time here. 
                wardBillObj.save()
        


        
        data={}
        return JsonResponse(data)


# def outPrescform():
#     if request.method=="POST":
#         print("SSS")
#         outpatient_name=request.POST.get('name')
#         gender=request.POST.get('gender')
#         fee=request.POST.get('fee')
#         discount=request.POST.get('discount')
#         reason =request.POST.get('reason')
#         discount_percentage=request.POST.get('discount_percent')

#         print("outpatient_name",outpatient_name)
#         print("discount",discount)
#         print("reason",reason)
#         print("discount_percentage",discount_percentage)


#         name = json.loads(outpatient_name)
#         gender = json.loads(gender)
#         fee = json.loads(fee)
#         discount = json.loads(discount)
#         reason = json.loads(reason)
#         discount_percentage = json.loads(discount_percentage)

#         print(name)
#         print(gender)
#         print(fee)

#         # print("employee_type",employee_type)

#         data={
#             'success':"success"
#         }
#         return JsonResponse(data)
def retrieveProcedureDetails(request):
    if request.method=='GET':
        procedure_objs=procedureTable.objects.all()
        procedure_list=[]
        for obj in procedure_objs:
            templist=[]
            templist.append(obj.procedure_name)
            templist.append(obj.charges)

            procedure_list.append(templist)

    data={
        'procedure_list':procedure_list,
    }
    return JsonResponse(data)
def retrieveEmployeeInfo(request):
    if request.method=="GET":
        emp_name=request.GET.get('emp_name')
        emp_objs=Employee.objects.filter(Q(name=emp_name) | Q(phone_no=""))
        

        print("emp_objs",emp_objs)
        employee_dict={}
        for emp_obj in emp_objs:
            employee_info_dict={}
            employee_info_dict['name']=emp_obj.name
            employee_info_dict['dob']=str(emp_obj.dob)
            employee_info_dict['gender']=emp_obj.gender
            employee_info_dict['phone']=emp_obj.phone_no
            employee_info_dict['address']=emp_obj.address
            employee_info_dict['qualification']=emp_obj.qualification
            employee_info_dict['email']=emp_obj.email_address
            employee_info_dict['employee_type']=emp_obj.employee_type.type_name
            employee_info_dict['cnic']=emp_obj.cnic
            employee_dict[emp_obj.id]=[]
            employee_dict[emp_obj.id]=employee_info_dict

        print(employee_dict)

        data={
            "employee_dict":json.dumps(employee_dict),
        }
        return JsonResponse(data)

def retrieveAllEmployeeInfo(request):
    if request.method=="GET":
        emp_objs=Employee.objects.all()
        

        print("emp_objs",emp_objs)
        all_employee_dict={}
        for emp_obj in emp_objs:
            all_employee_info_dict={}
            all_employee_info_dict['name']=emp_obj.name
            all_employee_info_dict['dob']=str(emp_obj.dob)
            all_employee_info_dict['gender']=emp_obj.gender
            all_employee_info_dict['phone']=emp_obj.phone_no
            all_employee_info_dict['address']=emp_obj.address
            all_employee_info_dict['qualification']=emp_obj.qualification
            all_employee_info_dict['email']=emp_obj.email_address
            all_employee_info_dict['employee_type']=emp_obj.employee_type.type_name
            all_employee_info_dict['cnic']=emp_obj.cnic
            all_employee_dict[emp_obj.id]=[]
            all_employee_dict[emp_obj.id]=all_employee_info_dict

        print(all_employee_dict)

        data={
            "all_employee_dict":json.dumps(all_employee_dict),
        }
        return JsonResponse(data)
def viewAllEmployee():
        if request.method=="GET":
            data={
        }
        return JsonResponse(data)


def updateEmployeeData(request):
    if request.method=="POST":
        employee_id=request.POST.get('employee_id')
        employee_id=json.loads(employee_id)
        employee_id=int(employee_id)
        print("employee_id",employee_id)

        employee_name=request.POST.get('employee_name')
        employee_name=json.loads(employee_name)

        gender=request.POST.get('gender')
        gender=json.loads(gender)

        employee_type=request.POST.get('employee_type')
        employee_type=json.loads(employee_type)

        phone_number=request.POST.get('phone_number')
        phone_number=json.loads(phone_number)

        address=request.POST.get('address')
        address=json.loads(address)

        qualification=request.POST.get('qualification')
        qualification=json.loads(qualification)
        
        email_address=request.POST.get('email_address')
        email_address=json.loads(email_address)

        cnic=request.POST.get('cnic')
        cnic=json.loads(cnic)
       
        dob=request.POST.get('dob')
        dob=json.loads(dob)


        emp_obj=Employee.objects.get(id=employee_id)
        emp_obj.name=employee_name
        emp_obj.phone_no=phone_number
        emp_obj.gender=gender
        emptype_obj=employeeType.objects.get(type_name=employee_type)
        emp_obj.employee_type=emptype_obj
        emp_obj.dob=dob
        emp_obj.address=address
        emp_obj.email_address=email_address
        emp_obj.qualification=qualification
        emp_obj.cnic=cnic
        emp_obj.save()
        return JsonResponse({})


def retireveAllDespMed(request):
    if request.method=="GET":
        dspstckobjs=despensoryStock.objects.filter(status='In Use')
        print("despensoryStock______________MMM",dspstckobjs)
        dspstck_dict={}
        mednamestobeadded=[]
        for dspstck in dspstckobjs:

            if dspstck.piece_stored<=10:
                mednamestobeadded.append(dspstck.medicine.medicine_name)
                medBatobj1=medicineBatches.objects.get(medicine_strg=dspstck.medicine_strg)
                dspObjs=despensoryStock.objects.filter(medicine=dspstck.medicine,status="In Use")
                print("kkk",len(dspObjs))
                lengthofmed=len(dspObjs)
                if lengthofmed==1:
                    try:
                        tempDespStrgObjs=tempDespensoryStock.objects.filter(medicine=dspstck.medicine)
                        print("first obj of temp desp med",tempDespStrgObjs[0].batch_no)
                        despStrg_obj=despensoryStock()
                        despStrg_obj.medicine=tempDespStrgObjs[0].medicine
                        despStrg_obj.medicine_strg=tempDespStrgObjs[0].medicinewh_stock
                        despStrg_obj.box_unit=tempDespStrgObjs[0].box_unit
                        despStrg_obj.strip_unit=tempDespStrgObjs[0].strip_unit
                        despStrg_obj.piece_unit=tempDespStrgObjs[0].piece_unit

                        despStrg_obj.box_stored=tempDespStrgObjs[0].box_stored
                        despStrg_obj.strip_stored=tempDespStrgObjs[0].strip_stored
                        despStrg_obj.piece_stored=tempDespStrgObjs[0].piece_stored

                        despStrg_obj.box_price_unit=tempDespStrgObjs[0].box_price_unit
                        despStrg_obj.strip_price_unit=tempDespStrgObjs[0].strip_price_unit
                        despStrg_obj.piece_price_unit=tempDespStrgObjs[0].piece_price_unit
                        despStrg_obj.status="In Use"
                        despStrg_obj.save()
                        tempDespStrgObjs[0].delete()

                        despStrgHist_obj=despensoryStockHistory()
                        despStrgHist_obj.medicine_strg=despStrg_obj.medicine_strg
                        despStrgHist_obj.desp_stock=despStrg_obj
                        despStrgHist_obj.medicine=despStrg_obj.medicine
                        despStrgHist_obj.box_unit=despStrg_obj.box_unit
                        despStrgHist_obj.piece_unit=despStrg_obj.piece_unit
                        despStrgHist_obj.box_stored=despStrg_obj.box_stored
                        despStrgHist_obj.strip_stored=despStrg_obj.strip_stored
                        despStrgHist_obj.piece_stored=despStrg_obj.piece_stored
                        despStrgHist_obj.box_price_unit=despStrg_obj.box_price_unit
                        despStrgHist_obj.piece_price_unit=despStrg_obj.piece_price_unit
                        despStrgHist_obj.status="Added"
                        despStrgHist_obj.save()
                        ttmds_obj=tt_Medicine_DespensoryStock()
                        ttmds_obj.medicine=despStrg_obj.medicine
                        ttmds_obj.medicine_strg=despStrg_obj.medicine_strg
                        ttmds_obj.desp_stock=despStrg_obj
                        ttmds_obj.save()
                    except:
                        print("Medicine Not in Temp Stock ")

        dspstckobjs=despensoryStock.objects.filter(status='In Use')

        for dspstck in dspstckobjs:
            tempdspstck_dict={}
            tempdspstck_dict['name']=dspstck.medicine.medicine_name
            tempdspstck_dict['boxes_stored']=dspstck.box_stored
            strip_stored=dspstck.strip_stored
            if dspstck.strip_unit==None:
                strip_stored="N/A"
                tempdspstck_dict['strip_unit']="-"
            else:
                tempdspstck_dict['strip_unit']=dspstck.strip_unit
            tempdspstck_dict['strip_stored']=strip_stored

            tempdspstck_dict['piece_stored']=dspstck.piece_stored
                
            tempdspstck_dict['piece_price_unit']=dspstck.piece_price_unit
            dspstck_dict[dspstck.id]=[]
            dspstck_dict[dspstck.id]=tempdspstck_dict
        
        data={
            'dspstck_dict':json.dumps(dspstck_dict),
        }

        print("dspstck_dict",dspstck_dict)
        return JsonResponse(data)

def retrieveMedicineFromDesp(request):
    if request.method=='GET':
        despid=request.GET.get('despid')
        print("despid",despid)
        despid=int(despid)
        patientid=request.GET.get('patientid')
        print("pateintid",patientid)
        patientid=int(patientid)
        pieces_wanted=request.GET.get('pieces_wanted')
        strips_wanted=request.GET.get('strips_wanted')
        no_strips=request.GET.get('no_strips')

        boxes_wanted=request.GET.get('boxes_wanted')
        print("boxes_wanted",boxes_wanted)
        boxes_wanted=int(boxes_wanted)
        pieces_wanted=int(pieces_wanted)
        print("strips wanted-->",strips_wanted)
        if no_strips=="false":
            strips_wanted=int(strips_wanted)

        despStckDict=request.GET.get('despStckDict')
        despStckDict=json.loads(despStckDict)
        pbr_dict=request.GET.get('pbr_dict')
        pbr_dict=json.loads(pbr_dict)
        print("boxes wanted ",boxes_wanted)
       

        # if medObj.AddCharge=='No' then add zero to amount
        despstckObj=despensoryStock.objects.get(id=despid)
        medObj=despstckObj.medicine
        if despstckObj:
            if(despstckObj.strip_unit==None ):
                finaldata=NoStripCalculationDespToPat(despstckObj,patientid,medObj,boxes_wanted,pieces_wanted,despStckDict,pbr_dict,despid)

            else:
                finaldata=WithStripCalculationDespToPat(despstckObj,medObj,boxes_wanted,strips_wanted,pieces_wanted,despStckDict,pbr_dict,despid,patientid)
        print("Final Data",finaldata)
        print("Desp Stock Dict",finaldata[0])
        print("Pbr dict",finaldata[1])
        despStckDict={}
        pbr_dict={}
        despStckDict=finaldata[0]
        pbr_dict=finaldata[1]

        
        # medicine_list=['1',medObj.medicine_name,str(mainlist[0]),'0',str(mainlist[1]),str(mainlist[2]),str(mainlist[3])]
        
      
        data={
            'despStckDict':json.dumps(despStckDict),
            'pbr_dict':json.dumps(pbr_dict),
            # 'main_list':medicine_list,
            # 'dspstck_dict':json.dumps(dspstck_dict),
        }
        return JsonResponse(data)



def NoStripCalculationDespToPat(despensoryStock,patientid,medicineobj,boxes_wanted,pieces_wanted,despStckDict,pbr_dict,despid):
    despid=str(despid)
    print("PBR",pbr_dict)
    desp_BoxesStored=despStckDict[despid]['boxes_stored']
    box_unit=despensoryStock.box_unit
    piece_unit=despensoryStock.piece_unit
    boxes_wanted=boxes_wanted*box_unit
    pieces_wanted=boxes_wanted*piece_unit+pieces_wanted
    # pieces_stored_in_desp ==> psd
    # Replace this, by get the piece_stored in despStckdict againts the desp id .. 
    # psd=despensoryStock.piece_stored
    print("pieceStored:::",despStckDict[despid]['piece_stored'])
    psd=despStckDict[despid]['piece_stored']
    # if psd<piece_unit:
    #     pieces_wanted=psd

    # Replace this, by get the piece_stored in despStckdict againts the desp id .. 
    # psd=despensoryStock.piece_stored
    psd=despStckDict[despid]['piece_stored']

    #pieces_leftin_stock ==> lps
    lps=float(psd)-float(pieces_wanted)
    # boxes_stored_in_stock==> bss
    if lps==0:
        bss=0
        print("BSS1",bss)

    else:
        bss= float(lps)/float(piece_unit)
        bss= math.ceil(bss)
        print("BSS2",bss)

    # Now, We wont be saving it in despStock table so we'll update the despStckDict against the id. 

    # despensoryStock.boxes_stored=bss
    # despensoryStock.piece_stored=lps
    despStckDict[despid]['boxes_stored']=bss
    despStckDict[despid]['piece_stored']=lps
    if bss==0 and lps==0:
        # In this case we'll simply add zero in DespStckDict piece and box stored
        despStckDict[despid]['boxes_stored']=bss
        despStckDict[despid]['piece_stored']=lps
        # despensoryStock.status="Used"
        # despensoryStock.save()


       


    
    
   
    
    # check if this medicine is already present in pbr dict or not. 
    # key=despStckDict[despid]['name']
    key=despid

    print("KEY",key)
    if key in pbr_dict.keys():
        print("Key Found")
        pbr_boxstored=pbr_dict[key]['boxes']

        print("pbr_boxstored",pbr_dict)
        boxes_wanted=(pbr_boxstored+desp_BoxesStored)-bss
        print("Final Boxes For patient bill",boxes_wanted)
        if boxes_wanted<0:
            boxes_wanted=0
        # if pieces_wanted%piece_unit==0:
        #     boxes_wanted=pieces_wanted/piece_unit
        #     print("boxes_Wanted",boxes_wanted)
        # else:
        #     boxes_wanted=boxes_wanted+int(pbr_dict[key]['boxes'])


        pbr_dict[key]['boxes']=boxes_wanted
        pieces_wanted=pieces_wanted+int(pbr_dict[key]['pieces'])
        pbr_dict[key]['pieces']=pieces_wanted
        price=int(despensoryStock.piece_price_unit)*pieces_wanted

        pbr_dict[key]['price']=price+pbr_dict[key]['price']
        price=pbr_dict[key]['price']
        if medicineobj.add_charge=="YES":
            amount=price
        else:
            amount=0

        pbr_dict[key]['amount']=amount
        print(pbr_dict)
    else:
        print("Key Not Found")

        tempdict={}
        tempdict['pieces']=pieces_wanted
        print("pieces_wanted%piece_unit",pieces_wanted%piece_unit)
        if pieces_wanted%piece_unit==0:
            boxes_wanted=pieces_wanted/piece_unit
        tempdict['boxes']=boxes_wanted
        tempdict['strips']=0

        price=int(despensoryStock.piece_price_unit)*pieces_wanted

        tempdict['price']=price
        amount=0
        if medicineobj.add_charge=="YES":
            amount=price

        tempdict['amount']=amount
        tempdict["medname"]=despensoryStock.medicine.medicine_name
        # tempdict['despid']=despensoryStock.id
        tempdict['priceperpiece']=despensoryStock.piece_price_unit
        tempdict['patientid']=patientid

        # pbr_dict[key]=tempdict
        pbr_dict[despensoryStock.id]=tempdict
    
    finaldata=[]
    finaldata.append(despStckDict)
    finaldata.append(pbr_dict)
    return finaldata


def WithStripCalculationDespToPat(despensoryStock,medicineobj,boxes_wanted,strips_wanted,pieces_wanted,despStckDict,pbr_dict,despid,patientid):
    despid=str(despid)
    print("PBR--",pbr_dict)
    desp_BoxesStored=despStckDict[despid]['boxes_stored']
    print("desp_BoxesStored--",desp_BoxesStored)
    box_unit=despensoryStock.box_unit
    strip_unit=despensoryStock.strip_unit
    piece_unit=despensoryStock.piece_unit

    boxes_wanted=boxes_wanted*box_unit
    strips_wanted=boxes_wanted*strip_unit+strips_wanted
    pieces_wanted=strips_wanted*piece_unit+pieces_wanted
    




    print("strips_wanted",strips_wanted)
    psd=despStckDict[despid]['piece_stored']
    print("psd",psd)

    lps=float(psd)-float(pieces_wanted)
    print("lps",lps)
    if lps==0:
        bss=0
        sts=0
        print("BSS1",bss)

    else:
        sts= float(lps)/float(piece_unit)
        sts= int(round(sts))
        print("sts",sts)
        bss= float(sts)/float(strip_unit)
        bss= int(round(bss))
        print("bss",bss)

    despStckDict[despid]['boxes_stored']=bss
    despStckDict[despid]['piece_stored']=lps
    despStckDict[despid]['strip_stored']=sts
    # key=despStckDict[despid]['name']
    key=despid
    print("PBR DICT",pbr_dict)

    if key in pbr_dict.keys():
        print("Key Found")
        pbr_boxstored=pbr_dict[key]['boxes']

        print("pbr_boxstored",pbr_dict)
        boxes_wanted=(pbr_boxstored+desp_BoxesStored)-bss
        print("Final Boxes For patient bill",boxes_wanted)
        if boxes_wanted<0:
            boxes_wanted=0
        pbr_dict[key]['boxes']=boxes_wanted
        print("SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
       
        # strips_wanted=strips_wanted+int(pbr_dict[key]['strips'])

        # pbr_dict[key]['strips']=strips_wanted
        pieces_wanted=pieces_wanted+int(pbr_dict[key]['pieces'])
        pbr_dict[key]['pieces']=pieces_wanted
        strips_wanted=pieces_wanted/piece_unit
        strips_wanted=int(round(strips_wanted))
        pbr_dict[key]['strips']=strips_wanted


        price=int(despensoryStock.piece_price_unit)*pieces_wanted
        pbr_dict[key]['price']=price+pbr_dict[key]['price']
        price=pbr_dict[key]['price']
        if medicineobj.add_charge=="YES":
            amount=price
        else:
            amount=0

        pbr_dict[key]['amount']=amount
        print("pbr_dict***",pbr_dict)
    else:
        print("Key Not Found")
        tempdict={}
        # if strips_wanted!=0 and boxes_wanted!=0:
        #     tempdict['strips']=strips_wanted
        #     if strips_wanted%strip_unit==0:
        #         boxes_wanted=strips_wanted/strip_unit
        #     tempdict['boxes']=boxes_wanted
        #     tempdict['pieces']=pieces_wanted
           
        # else:
        boxes_wanted=desp_BoxesStored-bss
        if boxes_wanted<0:
            boxes_wanted=0
        tempdict['boxes']=boxes_wanted
        pieces_wanted=pieces_wanted
        tempdict['pieces']=pieces_wanted
        strips_wanted=pieces_wanted/piece_unit
        strips_wanted=int(round(strips_wanted))
        tempdict['strips']=strips_wanted
        price=int(despensoryStock.piece_price_unit)*pieces_wanted
        tempdict['price']=price


        amount=0
        if medicineobj.add_charge=="YES":
            amount=price
        tempdict['amount']=amount
        tempdict['medname']=despensoryStock.medicine.medicine_name

        # tempdict['despid']=despensoryStock.id
        tempdict['priceperpiece']=despensoryStock.piece_price_unit
        tempdict['patientid']=patientid

        # pbr_dict[key]=tempdict
        pbr_dict[despensoryStock.id]=tempdict
    finaldata=[]
    finaldata.append(despStckDict)

    finaldata.append(pbr_dict)
    print("finaldata---",finaldata)
    return finaldata








# def maxTokenNo(request):
#     if request.method=="GET":
         
#         # Retrieve token no from the model Token
#         tokRecObj=tokenRecords.objects.latest('token_no')
#         print("tokRecObj",tokRecObj.token_no)
#         maxTokenNumber=tokRecObj.token_no
#         tokenNumber=int(maxTokenNumber)
#         data={"tokenNo":tokenNumber}

#         return JsonResponse(data)

def savePatientBill(request):
    if request.method=='POST':
        prescription_id=request.POST.get('prescription_id')
        prescription_id=int(prescription_id)

        proceduredata_dict=request.POST.get('proceduredata_dict')
        proceduredata_dict=json.loads(proceduredata_dict)
        despStckDict=request.POST.get('despStckDict')
        despStckDict=json.loads(despStckDict)
        pbr_dict=request.POST.get('pbr_dict')
        pbr_dict=json.loads(pbr_dict)
        despmedbillamount=request.POST.get('despmedbillamount')
        despmedbillamount=int(despmedbillamount)
        totalamount=request.POST.get('totalamount')
        totalamount=int(totalamount)
        addchargeamount=request.POST.get('addchargeamount')
        addchargeamount=int(addchargeamount)
        discountamount=request.POST.get('discountamount')
        discountamount=int(discountamount)
        net_total=request.POST.get('net_total')
        net_total=int(net_total)
        procedure_total=request.POST.get('procedure_total')
        procedure_total=int(procedure_total)

        

        patientid=0

        patPresRecObj=patPrescriptionRecords.objects.get(id=prescription_id)
        medicine_id_list=[]
        procedure_id_list=[]
        proc_net_total=0


        for id in despStckDict:
            despObj=despensoryStock.objects.get(id=id)
            print("despObj Medicine name",despObj.medicine.medicine_name)
            despObj.box_stored=despStckDict[id]['boxes_stored']
            despObj.strip_stored=despStckDict[id]['strip_stored']
            despObj.piece_stored=despStckDict[id]['piece_stored']
            if despStckDict[id]['boxes_stored'] ==0 and despStckDict[id]['piece_stored']==0:
                despObj.status='Used'
                despObj.save()

                despStrgHist_obj=despensoryStockHistory()
                despStrgHist_obj.medicine_strg=despObj.medicine_strg
                despStrgHist_obj.desp_stock=despObj
                despStrgHist_obj.medicine=despObj.medicine
                despStrgHist_obj.box_unit=despObj.box_unit
                despStrgHist_obj.piece_unit=despObj.piece_unit
                despStrgHist_obj.box_stored=despObj.box_stored
                despStrgHist_obj.strip_stored=despObj.strip_stored
                despStrgHist_obj.piece_stored=despObj.piece_stored
                despStrgHist_obj.box_price_unit=despObj.box_price_unit
                despStrgHist_obj.piece_price_unit=despObj.piece_price_unit
                despStrgHist_obj.status="Updated"
                despStrgHist_obj.save()


                # try:
                #     tempDespObjs=tempDespensoryStock.objects.filter(medicine=despObj.medicine)
                    

                # except:
                #     pass
            
            despObj.save()
            despStrgHist_obj=despensoryStockHistory()
            despStrgHist_obj.medicine_strg=despObj.medicine_strg
            despStrgHist_obj.desp_stock=despObj
            despStrgHist_obj.medicine=despObj.medicine
            despStrgHist_obj.box_unit=despObj.box_unit
            despStrgHist_obj.piece_unit=despObj.piece_unit
            despStrgHist_obj.box_stored=despObj.box_stored
            despStrgHist_obj.strip_stored=despObj.strip_stored
            despStrgHist_obj.piece_stored=despObj.piece_stored
            despStrgHist_obj.box_price_unit=despObj.box_price_unit
            despStrgHist_obj.piece_price_unit=despObj.piece_price_unit
            despStrgHist_obj.status="Updated"
            despStrgHist_obj.save()

        for despid in pbr_dict:
            # despid=int(pbr_dict[medname]['despid'])
            desp_id=int(despid)
            despObj=despensoryStock.objects.get(id=desp_id)
            patientid=int(pbr_dict[despid]['patientid'])
            patObj=Patient.objects.get(id=patPresRecObj.patient.id)
            pbrObj=patientBillRecords()
            pbrObj.patient=patObj
            pbrObj.desp=despObj
            patPresRecObj=patPrescriptionRecords.objects.get(id=prescription_id)
            pbrObj.pres=patPresRecObj
            pbrObj.boxes_stored=int(pbr_dict[despid]['boxes'])
            pbrObj.strips_stored=int(pbr_dict[despid]['strips'])
            pbrObj.pieces_stored=int(pbr_dict[despid]['pieces'])
            pbrObj.amount=int(pbr_dict[despid]['amount'])
            pbrObj.save()
            # medObj=Medicine.objects.get(medicine_name=medname)
            medObj=Medicine.objects.get(medicine_name=pbr_dict[despid]['medname'])
            medicine_id_list.append(medObj.id)
        patMedRecObj=patientMedRecords()
        patMedRecObj.patient=Patient.objects.get(id=patPresRecObj.patient.id)
        patMedRecObj.pres=patPresRecObj
        patMedRecObj.prescription=medicine_id_list
        patMedRecObj.save()
        despBillRecObj=despBillRecord()
        despBillRecObj.pres=patPresRecObj
        despBillRecObj.patient=Patient.objects.get(id=patPresRecObj.patient.id)
        despBillRecObj.despcharge_bill=despmedbillamount
        despBillRecObj.addcharge_bill=addchargeamount
        despBillRecObj.actual_med_bill=despmedbillamount+addchargeamount
        despBillRecObj.net_total=addchargeamount
        despBillRecObj.status="UnPaid"
        despBillRecObj.save()
        for procname in proceduredata_dict:

            procedureTable.objects.get(procedure_name=procname)
            procBillRecObj=procedureBillRecord()
            procBillRecObj.pres=patPresRecObj
            procBillRecObj.net_total=int(proceduredata_dict[procname])
            procBillRecObj.status="UnPaid"
            procBillRecObj.save()
            procedure_id_list.append(procBillRecObj.id)

        print("procedure_id_list",procedure_id_list)
        procRecObj=procedureRecords()
        procRecObj.procedure_bill=procedure_id_list
        procRecObj.pres=patPresRecObj
        procRecObj.net_total=procedure_total
        procRecObj.save()
        
        procBillSumObj=procedureBillSummary()
        procBillSumObj.procbr=procedure_id_list
        procBillSumObj.pres=patPresRecObj
        procBillSumObj.save()
        invObj=invoiceRecords.objects.get(pres=patPresRecObj)
        net_total=net_total
        invObj.desp_bill=despBillRecObj

        invObj.procedure_id=procBillSumObj
        invObj.discount=discountamount
        invObj.net_total=invObj.net_total+net_total
        invObj.save()
        pvsObj=patientVisitSummary()
        pvsObj.pres=patPresRecObj
        pvsObj.pmr=patMedRecObj
        pvsObj.patient=Patient.objects.get(id=patPresRecObj.patient.id)
        pvsObj.save()

        data={}
        return JsonResponse(data)
        
def updatePrescriptionRecord(request):
    if request.method=="GET":
        pres_data_dict={}
        presid=request.GET.get('presid')
        presid=int(presid)
        presObj=patPrescriptionRecords.objects.get(id=presid)
        pres_data_dict["sign_symtoms"]=presObj.sign_symtoms
        pres_data_dict["provisional_diagnosis"]=presObj.provisional_diagnosis
        pres_data_dict["investigation"]=presObj.investigation
        pres_data_dict["diagnosis"]=presObj.diagnosis
        pres_data_dict["vitals"]=presObj.vitals


        medlist=patientMedRecords.objects.get(pres=presObj).prescription
        print("Med list",medlist)
        medObjs=Medicine.objects.filter(id__in=medlist)
        med_info_list=[]
        for count,medObj in enumerate(medObjs):
            templist=[]
            templist.append(medObj.medicine_name)

            templist.append(medObj.medicine_name)
            templist.append(medObj.medicine_type_id.medicine_type_name)
            templist.append(medObj.medicine_details)
            med_info_list.append(templist)

        print("medObjs",medObjs)



        data={
            "med_info_list":med_info_list,
            "pres_data_dict":json.dumps(pres_data_dict),
        }
        return JsonResponse(data)      
    elif request.method=="POST":
        presid=request.POST.get("presid")
        presid=int(presid)
        pres_data_dict=request.POST.get("pres_data_dict")
        pres_data_dict=json.loads(pres_data_dict)
        print("In POST",pres_data_dict)
        presObj=patPrescriptionRecords.objects.get(id=presid)
        presObj.sign_symtoms=pres_data_dict["ss"]
        presObj.provisional_diagnosis=pres_data_dict["pd"]
        presObj.investigation=pres_data_dict["investigation"]
        presObj.diagnosis=pres_data_dict["diagnosis"]
        presObj.vitals=pres_data_dict["vitals"]
        presObj.save()


        data={}
        return JsonResponse(data)


def procSurgForm(request):
    if request.method=="POST":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def addProcedure(request):
    if request.method=="POST":
        procedure_name=request.POST.get('procedure_name')
        procedure_name=json.loads(procedure_name)
        charges=request.POST.get('charges')
        charges=json.loads(charges)
        proc_obj=procedureTable()
        proc_obj.procedure_name=procedure_name
        proc_obj.charges=charges
        proc_obj.save()
        
        data={
           'success':"success"
        }
        return JsonResponse(data)
def addSurgery(request):
    if request.method=="POST":
        surgery_name=request.POST.get('surgery_name')
        surgery_name=json.loads(surgery_name)
        charges=request.POST.get('charges')
        charges=json.loads(charges)
        surg_obj=surgeryTable()
        surg_obj.surgery_name=surgery_name
        surg_obj.charges=charges
        surg_obj.save()
        
        data={
           'success':"success"
        }
        return JsonResponse(data)
def retrieveAllProcInfo(request):
    if request.method=="GET":

        proc_objs=procedureTable.objects.all()
        print("proc_objs//",proc_objs)

        proc_dict={}
        for proc_obj in proc_objs:
            proc_info_dict={}
            proc_info_dict['procedure_name']=proc_obj.procedure_name
            proc_info_dict['charges']=proc_obj.charges
            proc_dict[proc_obj.id]=[]
            proc_dict[proc_obj.id]=proc_info_dict
        print("proc_dict", proc_dict)

        data={
            "proc_dict":json.dumps(proc_dict),
        }
        return JsonResponse(data)
def retrieveAllSurgInfo(request):
    if request.method=="GET":

        surg_objs=surgeryTable.objects.all()
        surg_dict={}
        for surg_obj in surg_objs:
            surg_info_dict={}
            surg_info_dict['surgery_name']=surg_obj.surgery_name
            surg_info_dict['charges']=surg_obj.charges
            surg_dict[surg_obj.id]=[]
            surg_dict[surg_obj.id]=surg_info_dict
        print("surg_dict", surg_dict)


        data={
            "surg_dict":json.dumps(surg_dict),
        }
        return JsonResponse(data)
def updateSurgData(request):
    if request.method=="POST":

        surgery_name=request.POST.get('surgery_name')
        surgery_name=surgery_name

        charges=request.POST.get('charges')
        charges=charges

        id=request.POST.get('id')
        id=id

        surg_obj=surgeryTable.objects.get(id=id)
        surg_obj.surgery_name=surgery_name
        surg_obj.charges=charges

        surg_obj.save()

        surg_objs=surgeryTable.objects.all()
        print("surg_objs//",surg_objs)

        surg_dict={}
        for surg_obj in surg_objs:
            surg_info_dict={}
            surg_info_dict['surgery_name']=surg_obj.surgery_name
            surg_info_dict['charges']=surg_obj.charges
            surg_dict[surg_obj.id]=[]
            surg_dict[surg_obj.id]=surg_info_dict
        print("surg_dict", surg_dict)
        data={
            "surg_dict":json.dumps(surg_dict),
        }
        return JsonResponse(data)

def updateProcData(request):
    if request.method=="POST":

        procedure_name=request.POST.get('procedure_name')
        procedure_name=procedure_name

        charges=request.POST.get('charges')
        charges=charges

        id=request.POST.get('id')
        id=id

        proc_obj=procedureTable.objects.get(id=id)
        proc_obj.procedure_name=procedure_name
        proc_obj.charges=charges

        proc_obj.save()

        proc_objs=procedureTable.objects.all()
        print("proc_objs//",proc_objs)

        proc_dict={}
        for proc_obj in proc_objs:
            proc_info_dict={}
            proc_info_dict['procedure_name']=proc_obj.procedure_name
            proc_info_dict['charges']=proc_obj.charges
            proc_dict[proc_obj.id]=[]
            proc_dict[proc_obj.id]=proc_info_dict
        print("proc_dict", proc_dict)

        data={
            "proc_dict":json.dumps(proc_dict),
        }
        return JsonResponse(data)

def roomWardForm(request):
    if request.method=="POST":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def retrieveAllRoomInfoInRoomWard(request):
    if request.method=="GET":

        room_objs=Rooms.objects.all()
        print("room_objs//",room_objs)

        room_dict={}
        for room_obj in room_objs:
            room_info_dict={}
            room_info_dict['floor_no']=room_obj.floor
            room_info_dict['room_no']=room_obj.room_no
            room_info_dict['charge_per_day']=room_obj.charge_per_day
            room_info_dict['ac_charge_per_day']=room_obj.ac_charge_per_day
            room_info_dict['status']=room_obj.status
            room_dict[room_obj.id]=[]
            room_dict[room_obj.id]=room_info_dict
        print("room_dict", room_dict)

        data={
            "room_dict":json.dumps(room_dict),
        }
        return JsonResponse(data)
def retrieveAllWardInfoInRoomWard(request):
    if request.method=="GET":

        ward_objs=Ward.objects.all()
        ward_dict={}
        for ward_obj in ward_objs:
            ward_info_dict={}
            ward_info_dict['ward_no']=ward_obj.ward_no
            ward_info_dict['bed_no']=ward_obj.bed_no
            ward_info_dict['charge_per_day']=ward_obj.charge_per_day
            ward_info_dict['status']=ward_obj.status
            ward_dict[ward_obj.id]=[]
            ward_dict[ward_obj.id]=ward_info_dict
        print("ward_dict", ward_dict)


        data={
            "ward_dict":json.dumps(ward_dict),
        }
        return JsonResponse(data)
def updateRoomWardForm():
    if request.method=="POST":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def updateRoomData(request):
    if request.method=="POST":

        floor=request.POST.get('floor')
        floor=json.loads(floor)

        room_no=request.POST.get('room_no')
        room_no=json.loads(room_no)

        charge_per_day=request.POST.get('charge_per_day')
        charge_per_day=json.loads(charge_per_day)

        ac_charge_per_day=request.POST.get('ac_charge_per_day')
        ac_charge_per_day=json.loads(ac_charge_per_day)

        status=request.POST.get('status')
        status=json.loads(status)


        room_obj=Rooms.objects.get(id=room_no)
        room_obj.room_no=room_no
        room_obj.charge_per_day=charge_per_day
        room_obj.ac_charge_per_day=ac_charge_per_day
        room_obj.status=status
        room_obj.save()

        room_objs=Rooms.objects.all()
        print("room_objs//",room_objs)

        room_dict={}
        for room_obj in room_objs:
            room_info_dict={}
            room_info_dict['floor_no']=room_obj.floor
            room_info_dict['room_no']=room_obj.room_no
            room_info_dict['charge_per_day']=room_obj.charge_per_day
            room_info_dict['ac_charge_per_day']=room_obj.ac_charge_per_day
            room_info_dict['status']=room_obj.status
            room_dict[room_obj.id]=[]
            room_dict[room_obj.id]=room_info_dict
        data={
            "room_dict":json.dumps(room_dict)
        }
        return JsonResponse(data)
def updateWardData(request):
    if request.method=="POST":

        ward_no=request.POST.get('ward_no')
        ward_no=json.loads(ward_no)

        bed_no=request.POST.get('bed_no')
        bed_no=json.loads(bed_no)

        charge_per_day=request.POST.get('charge_per_day')
        charge_per_day=json.loads(charge_per_day)

        status=request.POST.get('status')
        status=json.loads(status)


        ward_obj=Ward.objects.get(id=ward_no)
        ward_obj.bed_no=bed_no
        ward_obj.charge_per_day=charge_per_day
        ward_obj.status=status
        ward_obj.save()

        ward_objs=Ward.objects.all()
        print("ward_objs//",ward_objs)

        ward_dict={}
        for ward_obj in ward_objs:
            ward_info_dict={}
            ward_info_dict['ward_no']=ward_obj.ward_no
            ward_info_dict['room_no']=ward_obj.bed_no
            ward_info_dict['charge_per_day']=ward_obj.charge_per_day
            ward_info_dict['status']=ward_obj.status
            ward_dict[ward_obj.id]=[]
            ward_dict[ward_obj.id]=ward_info_dict
        data={
            "ward_dict":json.dumps(ward_dict)
        }
        return JsonResponse(data)
def retrievePresInfoSurgProcBill(request):
    if request.method=="GET":
        pres_id=request.GET.get('id')
        # surgeryRecords.objects.get(pres=pres_id)
        surgery_dict={}
        procedure_dict={}
        surgObjs=surgeryTable.objects.all()
        procObjs=procedureTable.objects.all()
        invObj=invoiceRecords.objects.get(pres=pres_id)
        already_discount=invObj.discount
        for obj in surgObjs:
            surgery_name=obj.surgery_name
            charges=obj.charges
            surgeon_fee=obj.surgeon_fee
            operation_theatre_fee=obj.operation_theater_fee
            anesthesiologist_fee=obj.anesthesiologist_fee
            surplus_fee=obj.surplus_fee
            templist=[]
            templist.append(charges)
            templist.append(surgeon_fee)
            templist.append(operation_theatre_fee)
            templist.append(anesthesiologist_fee)
            templist.append(surplus_fee)
            
            surgery_dict[surgery_name]=templist
        for obj in procObjs:
            procedure_name=obj.procedure_name
            charges=obj.charges
           
            templist=[]
            templist.append(charges)
            

            procedure_dict[procedure_name]=templist
            # procedure_data_list.append(templist)
        data={
            'surgery_dict':json.dumps(surgery_dict),
            'procedure_dict':json.dumps(procedure_dict),
            'already_discount':already_discount,
            'consultant':'consultant',
            'surgeon':"surgeon",
        }
        return JsonResponse(data)
def createRoomWardBill(request):
    if request.method=="POST":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def retrieveRoomWardBill(request):
    if request.method=="GET":
        pres_id=request.GET.get('id')
        pres_id=int(pres_id)
        patPresObj=patPrescriptionRecords.objects.get(id=pres_id)
        roomBill_dict={}
        wardBill_dict={}

        try:
                prbObj=patientRoomsBill.objects.get(pres=patPresObj)
                roomObj=Rooms.objects.get(id=prbObj.rooms.id)
                pprObj=patPrescriptionRecords.objects.get(id=patPresObj.id)
                patObj=pprObj.patient  
                # print('pat name',patObj.pat_name)    
                print('roomObj', roomObj)
 
                roomBill_dict={}
                roomBill_dict['pat_name']=patObj.pat_name
                roomBill_dict['floor']=roomObj.floor
                roomBill_dict['room_no']=roomObj.room_no
                roomBill_dict['charge_per_day']=roomObj.charge_per_day
                roomBill_dict['ac_charge_per_day']=roomObj.ac_charge_per_day
                roomBill_dict['checkin']=str(prbObj.checkin)
                roomBill_dict['id']=prbObj.id

                print("roomBill_dict", roomBill_dict)

                data={
                    "roomBill_dict":json.dumps(roomBill_dict),
                    "wardBill_dict":json.dumps(wardBill_dict),

                }
                return JsonResponse(data)

        except ObjectDoesNotExist:
            try:
                
                pwbObj=patientWardBill.objects.get(pres=patPresObj)
                wardObj=Ward.objects.get(id=pwbObj.wards.id)
                pprObj=patPrescriptionRecords.objects.get(id=patPresObj.id)
                patObj=pprObj.patient  

                print('wardObj', wardObj)
                wardBill_dict={}
                            
                wardBill_dict['patient_name']=patObj.pat_name
                wardBill_dict['ward_no']=wardObj.ward_no
                wardBill_dict['bed_no']=wardObj.bed_no
                wardBill_dict['charge_per_day']=wardObj.charge_per_day
                wardBill_dict['checkin']=str(pwbObj.checkin)
                wardBill_dict['id']=pwbObj.id

                print("wardBill_dict", wardBill_dict)

                data={
                    "wardBill_dict":json.dumps(wardBill_dict),
                    "roomBill_dict":json.dumps(roomBill_dict),
                }
                return JsonResponse(data)
            except:
                data={
                    "status": "Prescription ID Not Found"
                }
                return JsonResponse(data)
def createBillDetailsRoomBill(request):
    if request.method=="GET":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def createBillDetailsWardBill(request):
    if request.method=="GET":
        data={
            'success':"success"
        }
        return JsonResponse(data)
def printWardBill(request):
    if request.method=="POST":
        print('1111111111')
        # pres_id=request.POST.get('id')
        # # pres_id=int(pres_id)
        # print("pres_id1111111", pres_id)
        # patPresObj=patPrescriptionRecords.objects.get(id=pres_id)

        pres=request.POST.get('pres')
        pres=json.loads(pres)

        checkout=request.POST.get('checkout')
        checkout=json.loads(checkout)

        net_total=request.POST.get('net_total')
        net_total=json.loads(net_total)

        total_days=request.POST.get('total_no_of_days')
        total_days=json.loads(total_days)

        wardbill_obj=patientWardBill.objects.get(pres=pres)
        wardbill_obj.checkout=checkout
        wardbill_obj.net_total=net_total
        wardbill_obj.total_days=total_days

        wardbill_obj.save()

        invObj=invoiceRecords.objects.get(pres=pres)
        net_total=int(net_total)
        invObj.ward_bill=wardbill_obj
        invObj.net_total=invObj.net_total+net_total
        invObj.save()
        return JsonResponse({})
def printRoomBill(request):      
    if request.method=="POST":

        pres=request.POST.get('pres')
        pres=json.loads(pres)

        checkout=request.POST.get('checkout')
        checkout=json.loads(checkout)

        net_total=request.POST.get('net_total')
        net_total=json.loads(net_total)
        
        total_days=request.POST.get('total_no_of_days')
        total_days=json.loads(total_days)

        roombill_obj=patientRoomsBill.objects.get(pres=pres)
        roombill_obj.checkout=checkout
        roombill_obj.net_total=net_total
        roombill_obj.total_days=total_days

        
        roombill_obj.save()
        invObj=invoiceRecords.objects.get(pres=pres)
        net_total=int(net_total)
        invObj.room_bill=roombill_obj
        invObj.net_total=invObj.net_total+net_total
        invObj.save()
        return JsonResponse({})

def saveWardBill(request):
    if request.method=="POST":
        print('1111111111')
        # pres_id=request.POST.get('id')
        # # pres_id=int(pres_id)
        # print("pres_id1111111", pres_id)
        # patPresObj=patPrescriptionRecords.objects.get(id=pres_id)

        pres=request.POST.get('pres')
        pres=json.loads(pres)

        checkout=request.POST.get('checkout')
        checkout=json.loads(checkout)

        net_total=request.POST.get('net_total')
        net_total=json.loads(net_total)

        total_days=request.POST.get('total_no_of_days')
        total_days=json.loads(total_days)

        print("total_days",total_days )

        wardbill_obj=patientWardBill.objects.get(pres=pres)
        wardbill_obj.checkout=checkout
        wardbill_obj.net_total=net_total
        wardbill_obj.total_days=total_days

        wardbill_obj.save()

        invObj=invoiceRecords.objects.get(pres=pres)
        net_total=int(net_total)
        invObj.ward_bill=wardbill_obj
        invObj.net_total=invObj.net_total+net_total
        invObj.save()
        return JsonResponse({})
def saveRoomBill(request):      
    if request.method=="POST":

        pres=request.POST.get('pres')
        pres=json.loads(pres)

        checkout=request.POST.get('checkout')
        checkout=json.loads(checkout)

        net_total=request.POST.get('net_total')
        net_total=json.loads(net_total)

        total_days=request.POST.get('total_no_of_days')
        total_days=json.loads(total_days)

        roombill_obj=patientRoomsBill.objects.get(pres=pres)
        roombill_obj.checkout=checkout
        roombill_obj.net_total=net_total
        roombill_obj.total_days=total_days

        roombill_obj.save()

        invObj=invoiceRecords.objects.get(pres=pres)
        net_total=int(net_total)
        invObj.room_bill=roombill_obj
        invObj.net_total=invObj.net_total+net_total
        invObj.save()
        return JsonResponse({})

def retrieveInvoiceBillRecord(request):
     if request.method=="GET":
        pres_id=request.GET.get('id')
        pres_id=int(pres_id)
        patPresObj=patPrescriptionRecords.objects.get(id=pres_id)
        InvoiceObj=invoiceRecords.objects.get(pres=patPresObj)
        print("invoice Obj", InvoiceObj)

        patRoomBill_dict={}
        patWardBill_dict={}
        surgBillRecord_dict={}
        procBillRecord_dict={}
        patPresRecord_dict={}
        DespBill_dict={}

        # print("floor--", InvoiceObj.room_bill.rooms.status)
        if InvoiceObj.room_bill!=None:
            patRoomBill_dict={}
            patRoomBill_dict['floor']=InvoiceObj.room_bill.rooms.floor
            patRoomBill_dict['room_no']=InvoiceObj.room_bill.rooms.room_no
            patRoomBill_dict['charge_per_day']=InvoiceObj.room_bill.rooms.charge_per_day
            patRoomBill_dict['ac_charge_per_day']=InvoiceObj.room_bill.rooms.ac_charge_per_day
            patRoomBill_dict['total_days']=InvoiceObj.room_bill.total_days
            patRoomBill_dict['total_bill']=InvoiceObj.room_bill.net_total
            patRoomBill_dict['status']=InvoiceObj.room_bill.status
            print("patRoomBill_dict", patRoomBill_dict)

        if InvoiceObj.ward_bill!=None:
            patWardBill_dict={}          
            patWardBill_dict['ward_no']=InvoiceObj.ward_bill.wards.ward_no
            patWardBill_dict['bed_no']=InvoiceObj.ward_bill.wards.bed_no
            patWardBill_dict['charge_per_day']=InvoiceObj.ward_bill.wards.charge_per_day
            patWardBill_dict['total_days']=InvoiceObj.ward_bill.total_days
            patWardBill_dict['total_bill']=InvoiceObj.ward_bill.net_total
            patWardBill_dict['status']=InvoiceObj.ward_bill.status
            print("patWardBill_dict", patWardBill_dict)

        if InvoiceObj.desp_bill!=None:
            DespBill_dict={}
            DespBill_dict['desp_bill']=InvoiceObj.desp_bill.despcharge_bill
            DespBill_dict['add_med_bill']=InvoiceObj.desp_bill.addcharge_bill
            DespBill_dict['total_bill']=InvoiceObj.desp_bill.net_total
            DespBill_dict['status']=InvoiceObj.desp_bill.status
            print("DespBill_dict", DespBill_dict)

        if InvoiceObj.pres!=None:
            patPresRecord_dict={}
            patPresRecord_dict['pat_name']=InvoiceObj.pres.patient.pat_name
            patPresRecord_dict['date_visited']=str(InvoiceObj.pres.date_visited)
            pPresBObj=patPrescriptionBill.objects.get(pres=patPresObj)
            patPresRecord_dict['pres_bill']=pPresBObj.net_total
            patPresRecord_dict['status']=pPresBObj.status
            patPresRecord_dict['total_bill']=InvoiceObj.net_total
            patPresRecord_dict['status']=InvoiceObj.status
            patPresRecord_dict['invoice_no']=InvoiceObj.id

            print("patPresRecord_dict",patPresRecord_dict)

        if InvoiceObj.surgery_bill!=None:
            surgBillRecord_dict={}
            # surgBill_List=list(InvoiceObj.surgery_bill)
            surgBillSummary_Obj= InvoiceObj.surgery_bill
            print("surgBillSummary_Obj", surgBillSummary_Obj)
            sbsObj= surgeryBillSummary.objects.get(id=surgBillSummary_Obj.id)

            sbr_list=sbsObj.sbr
            for sbr in sbr_list:
                sbr_Obj=surgeryBillRecord.objects.get(id=int(sbr))
                print("sbr_Obj",sbr_Obj)
                tempsurgbillrecord_dict={}
                tempsurgbillrecord_dict['surgery_name']=sbr_Obj.surgery.surgery_name
                tempsurgbillrecord_dict['surgeon_fee']=sbr_Obj.surgeon_fee
                tempsurgbillrecord_dict['OT_fee']=sbr_Obj.operation_theater_fee
                tempsurgbillrecord_dict['anest_fee']=sbr_Obj.anesthesiologist_fee
                tempsurgbillrecord_dict['surplus_fee']=sbr_Obj.surplus_fee
                tempsurgbillrecord_dict['net_total']=sbr_Obj.net_total
                tempsurgbillrecord_dict['status']=sbr_Obj.status
                tempsurgbillrecord_dict['all_surg_amount']=sbsObj.net_total
                surgBillRecord_dict[sbr_Obj.id]=[]
                surgBillRecord_dict[sbr_Obj.id]=tempsurgbillrecord_dict

            
        print("surgBillRecord_dict", surgBillRecord_dict)

        if InvoiceObj.procedure_id!=None:
            procBillRecord_dict={}
            procBillSummary_Obj= InvoiceObj.procedure_id
            print("procBillSummary_Obj", procBillSummary_Obj)
            pbsObj= procedureBillSummary.objects.get(id=procBillSummary_Obj.id)
            pbr_list=pbsObj.procbr
            for procbr in pbr_list:
                pbr_Obj=procedureBillRecord.objects.get(id=int(procbr))
                print("pbr_Obj",pbr_Obj)
                tempprocbillrecord_dict={}
                # print()
                tempprocbillrecord_dict['procedure_name']=pbr_Obj.procedure.procedure_name
                tempprocbillrecord_dict['net_total']=pbr_Obj.net_total
                tempprocbillrecord_dict['status']=pbr_Obj.status
                tempprocbillrecord_dict['all_proc_amount']=pbsObj.net_total

                procBillRecord_dict[pbr_Obj.id]=[]
                procBillRecord_dict[pbr_Obj.id]=tempprocbillrecord_dict
        print("procBillRecord_dict", procBillRecord_dict)

        data={
            "patRoomBill_dict":json.dumps(patRoomBill_dict),
            "patWardBill_dict":json.dumps(patWardBill_dict),
            "DespBill_dict":json.dumps(DespBill_dict),
            "patPresRecord_dict":json.dumps(patPresRecord_dict),
            "surgBillRecord_dict":json.dumps(surgBillRecord_dict),
            "procBillRecord_dict":json.dumps(procBillRecord_dict),
        }
        return JsonResponse(data)
def saveSurgProcBill(request):
    if request.method=="GET":
        surgerybill_dict=request.GET.get('surgerybill_dict')
        surgerybill_dict=json.loads(surgerybill_dict)
        procedurebill_dict=request.GET.get('procedurebill_dict')
        procedurebill_dict=json.loads(procedurebill_dict)

        surg_proc_bill_final_value=request.GET.get('surg_proc_bill_final_value')
        nettotal=int(surg_proc_bill_final_value)
        pres_id=request.GET.get('pres_id')
        pres_id=int(pres_id)
        surg_total_bill=request.GET.get('surg_total_bill')
        surg_total_bill=int(surg_total_bill)
        totalproc_bill=request.GET.get('totalproc_bill')
        totalproc_bill=int(totalproc_bill)

        print("surgerybill_dict",surgerybill_dict)
        print("procedurebill_dict",procedurebill_dict)
        print("nettotal",nettotal)
        print("presid",pres_id)
        patPresRecObj=patPrescriptionRecords.objects.get(id=pres_id)
        sbrid_list=[]
        procbrid_list=[]
        invRecObj=invoiceRecords.objects.get(pres=patPresRecObj)

        if procedurebill_dict!={}:
            for key in procedurebill_dict:
                proctabObj=procedureTable.objects.get(procedure_name=procedurebill_dict[key][0])
                procBRecObj=procedureBillRecord()
                procBRecObj.procedure=proctabObj
                procBRecObj.pres=patPresRecObj
                procBRecObj.net_total=procedurebill_dict[key][1]
                procBRecObj.save()
                procbrid_list.append(procBRecObj.id)
            procRecObj=procedureRecords()
            procRecObj.procedure_bill=procbrid_list
            procRecObj.pres=patPresRecObj
            procRecObj.net_total=totalproc_bill
            procRecObj.save()
            procBSumObj=procedureBillSummary()
            procBSumObj.procbr=procbrid_list
            procBSumObj.pres=patPresRecObj
            procBSumObj.net_total=totalproc_bill
            procBSumObj.save()
            invRecObj.procedure_id=procBSumObj
            invRecObj.net_total=totalproc_bill+invRecObj.net_total
            invRecObj.save()
            print("Inv net total",invRecObj.net_total)
        if surgerybill_dict!={}:

            for key in surgerybill_dict:
                surgtabObj=surgeryTable.objects.get(surgery_name=surgerybill_dict[key][0])
                sbrObj=surgeryBillRecord()
                sbrObj.surgery=surgtabObj
                sbrObj.pres=patPresRecObj
                sbrObj.surgeon_fee=surgerybill_dict[key][1]
                sbrObj.operation_theater_fee=surgerybill_dict[key][2]
                sbrObj.anesthesiologist_fee=surgerybill_dict[key][3]
                sbrObj.surplus_fee=surgerybill_dict[key][4]
                sbrObj.net_total=surgerybill_dict[key][5]
                sbrObj.save()
                sbrid_list.append(sbrObj.id)
                surgRecObj=surgeryRecords()
                surgRecObj.surgery_bill=sbrObj
                surgRecObj.pres=patPresRecObj
                surgRecObj.save()
            surgBSumObj=surgeryBillSummary()
            surgBSumObj.sbr=sbrid_list
            surgBSumObj.pres=patPresRecObj
            surgBSumObj.net_total=surg_total_bill
            surgBSumObj.save()
            invRecObj.surgery_bill=surgBSumObj
            invRecObj.net_total=surg_total_bill+invRecObj.net_total
            invRecObj.save()
            print("Inv net total",invRecObj.net_total)


        data={}
        return JsonResponse(data)

def updateInvoice(request):

    if request.method=="GET":
        pres=request.GET.get("pres")
        pres=json.loads(pres)
        proc_dict=request.GET.get("proc_dict")
        proc_dict=json.loads(proc_dict)
        surg_dict=request.GET.get("surg_dict")
        surg_dict=json.loads(surg_dict)
        room_dict=request.GET.get("room_dict")
        room_dict=json.loads(room_dict)
        ward_dict=request.GET.get("ward_dict")
        ward_dict=json.loads(ward_dict)
        pres_dict=request.GET.get("pres_dict")
        pres_dict=json.loads(pres_dict)
        desp_dict=request.GET.get("desp_dict")
        desp_dict=json.loads(desp_dict)
        invoice_dict=request.GET.get("invoice_dict")
        invoice_dict=json.loads(invoice_dict)

        presObj=patPrescriptionBill.objects.get(pres=pres)
        print("presObj1234", presObj)
        presObj.net_total=pres_dict['pres_total']
        presObj.status=pres_dict['pres_status']
        presObj.save()
        
        if desp_dict!={}:
            despObj=despBillRecord.objects.get(pres=pres)
            print("despObj234", despObj)
            despObj.net_total= desp_dict['desp_total']
            despObj.status=desp_dict['desp_status']
            despObj.save()

        invoiceObj=invoiceRecords.objects.get(id=int(invoice_dict['invoice_no']))
        print("invoiceObj", invoiceObj)
        invoiceObj.net_total=invoice_dict['netTotal']
        invoiceObj.status=invoice_dict['invoice_status']
        invoiceObj.save()

        if room_dict!={}:
            roomObj=patientRoomsBill.objects.get(pres=pres)
            print("roomObj", roomObj)
            roomObj.net_total=room_dict['room_total']
            roomObj.status=room_dict['room_status']
            roomObj.save()

        if ward_dict!={}:
            ward_Obj=patientWardBill.objects.get(pres=pres)
            print("ward_Obj", ward_Obj)
            ward_Obj.net_total=ward_dict['ward_total']
            ward_Obj.status=ward_dict['ward_status']
            ward_Obj.save()
        
        if surg_dict!={}:
            for key in surg_dict:
                surgSumObj=surgeryBillSummary.objects.get(pres=pres)
                print("surgSumObj", surgSumObj)

                surgSumObj.net_total=surg_dict[key]['all_total']
                surg_Obj=surgeryBillRecord.objects.get(id=int(key))
                surg_Obj.surgeon_fee=surg_dict[key]['surgeon_fee']
                surg_Obj.operation_theater_fee=surg_dict[key]['oper_fee']
                surg_Obj.anesthesiologist_fee=surg_dict[key]['anest_fee']
                surg_Obj.surplus_fee=surg_dict[key]['surplus_char']
                surg_Obj.net_total=surg_dict[key]['surg_total']
                surg_Obj.status=surg_dict[key]['status']
                surgSumObj.save()
                surg_Obj.save()
        
        if proc_dict!={}:
            for key in proc_dict:
                procSumObj=procedureBillSummary.objects.get(pres=pres)
                procSumObj.net_total=proc_dict[key]['all_total']
                proc_Obj=procedureBillRecord.objects.get(id=int(key))
                proc_Obj.net_total=proc_dict[key]['proc_total']
                proc_Obj.status=proc_dict[key]['status']
                proc_Obj.save()
                procSumObj.save()

        return JsonResponse({})


def retrieveInvoiceBillRecordForView(request):
     if request.method=="GET":
        pres_id=request.GET.get('id')
        pres_id=int(pres_id)
        patPresObj=patPrescriptionRecords.objects.get(id=pres_id)
        InvoiceObj=invoiceRecords.objects.get(pres=patPresObj)
        print("invoice Obj", InvoiceObj)

        patRoomBillView_dict={}
        patWardBillView_dict={}
        surgBillRecordView_dict={}
        procBillRecordView_dict={}
        patPresRecordView_dict={}
        DespBillView_dict={}

        if InvoiceObj.room_bill!=None:
            patRoomBillView_dict={}
            patRoomBillView_dict['floor']=InvoiceObj.room_bill.rooms.floor
            patRoomBillView_dict['room_no']=InvoiceObj.room_bill.rooms.room_no
            patRoomBillView_dict['charge_per_day']=InvoiceObj.room_bill.rooms.charge_per_day
            patRoomBillView_dict['ac_charge_per_day']=InvoiceObj.room_bill.rooms.ac_charge_per_day
            patRoomBillView_dict['total_days']=InvoiceObj.room_bill.total_days
            patRoomBillView_dict['total_bill']=InvoiceObj.room_bill.net_total
            patRoomBillView_dict['status']=InvoiceObj.room_bill.status
            print("patRoomBillView_dict", patRoomBillView_dict)

        if InvoiceObj.ward_bill!=None:
            patWardBillView_dict={}          
            patWardBillView_dict['ward_no']=InvoiceObj.ward_bill.wards.ward_no
            patWardBillView_dict['bed_no']=InvoiceObj.ward_bill.wards.bed_no
            patWardBillView_dict['charge_per_day']=InvoiceObj.ward_bill.wards.charge_per_day
            patWardBillView_dict['total_days']=InvoiceObj.ward_bill.total_days
            patWardBillView_dict['total_bill']=InvoiceObj.ward_bill.net_total
            patWardBillView_dict['status']=InvoiceObj.ward_bill.status
            print("patWardBillView_dict", patWardBillView_dict)

        if InvoiceObj.desp_bill!=None:
            DespBillView_dict={}
            DespBillView_dict['desp_bill']=InvoiceObj.desp_bill.despcharge_bill
            DespBillView_dict['add_med_bill']=InvoiceObj.desp_bill.addcharge_bill
            DespBillView_dict['total_bill']=InvoiceObj.desp_bill.net_total
            DespBillView_dict['status']=InvoiceObj.desp_bill.status
            print("DespBillView_dict", DespBillView_dict)

        if InvoiceObj.pres!=None:
            patPresRecordView_dict={}
            patPresRecordView_dict['pat_name']=InvoiceObj.pres.patient.pat_name
            patPresRecordView_dict['date_visited']=str(InvoiceObj.pres.date_visited)
            pPresBObj=patPrescriptionBill.objects.get(pres=patPresObj)
            patPresRecordView_dict['pres_bill']=pPresBObj.net_total
            patPresRecordView_dict['status']=pPresBObj.status
            patPresRecordView_dict['total_bill']=InvoiceObj.net_total
            patPresRecordView_dict['status']=InvoiceObj.status
            patPresRecordView_dict['invoice_no']=InvoiceObj.id
            print("patPresRecordView_dict",patPresRecordView_dict)

        if InvoiceObj.surgery_bill!=None:
            surgBillRecordView_dict={}
            surgBillSummary_Obj= InvoiceObj.surgery_bill
            print("surgBillSummary_Obj", surgBillSummary_Obj)
            sbsObj= surgeryBillSummary.objects.get(id=surgBillSummary_Obj.id)

            sbr_list=sbsObj.sbr
            for sbr in sbr_list:
                sbr_Obj=surgeryBillRecord.objects.get(id=int(sbr))
                print("sbr_Obj",sbr_Obj)
                tempsurgbillrecord_dict={}
                tempsurgbillrecord_dict['surgery_name']=sbr_Obj.surgery.surgery_name
                tempsurgbillrecord_dict['surgeon_fee']=sbr_Obj.surgeon_fee
                tempsurgbillrecord_dict['OT_fee']=sbr_Obj.operation_theater_fee
                tempsurgbillrecord_dict['anest_fee']=sbr_Obj.anesthesiologist_fee
                tempsurgbillrecord_dict['surplus_fee']=sbr_Obj.surplus_fee
                tempsurgbillrecord_dict['net_total']=sbr_Obj.net_total
                tempsurgbillrecord_dict['status']=sbr_Obj.status
                surgBillRecordView_dict[sbr_Obj.id]=[]
                surgBillRecordView_dict[sbr_Obj.id]=tempsurgbillrecord_dict
            totalSurgBill=surgBillSummary_Obj.net_total
            print("totalSurgBill", totalSurgBill)

        print("surgBillRecordView_dict", surgBillRecordView_dict)

        if InvoiceObj.procedure_id!=None:
            procBillRecordView_dict={}
            procBillSummary_Obj= InvoiceObj.procedure_id
            print("procBillSummary_Obj", procBillSummary_Obj)
            pbsObj= procedureBillSummary.objects.get(id=procBillSummary_Obj.id)
            pbr_list=pbsObj.procbr
            for procbr in pbr_list:
                pbr_Obj=procedureBillRecord.objects.get(id=int(procbr))
                print("pbr_Obj",pbr_Obj)
                tempprocbillrecord_dict={}
                tempprocbillrecord_dict['procedure_name']=pbr_Obj.procedure.procedure_name
                tempprocbillrecord_dict['net_total']=pbr_Obj.net_total
                tempprocbillrecord_dict['status']=pbr_Obj.status
                procBillRecordView_dict[pbr_Obj.id]=[]
                procBillRecordView_dict[pbr_Obj.id]=tempprocbillrecord_dict
            totalProcBill=procBillSummary_Obj.net_total
            print("totalProcBill", totalProcBill)

        print("procBillRecordView_dict", procBillRecordView_dict)

        data={
            "totalProcBill":json.dumps(totalProcBill),
            "totalSurgBill":json.dumps(totalSurgBill),
            "patRoomBillView_dict":json.dumps(patRoomBillView_dict),
            "patWardBillView_dict":json.dumps(patWardBillView_dict),
            "DespBillView_dict":json.dumps(DespBillView_dict),
            "patPresRecordView_dict":json.dumps(patPresRecordView_dict),
            "surgBillRecordView_dict":json.dumps(surgBillRecordView_dict),
            "procBillRecordView_dict":json.dumps(procBillRecordView_dict),
        }
        return JsonResponse(data)

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
    employeeType,Employee,Patient,patientMedRecords,
)
from django.http import HttpResponse, JsonResponse
from .Controllers.MedControllers.MedController import MedicineController  
from django.db import connection
from django.db.models import Q


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
    medicineWarehouseStock_obj=medicineWarehouseStock.objects.get(medicine=medicine_obj)
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
            boxes_stored= math.ceil(boxes_stored)


    print("boxes in stock",boxes_stored)
    
    print("b",medicineWarehouseStock_obj.box_stored)
    strips_stored=math.ceil(strips_stored)
    print("strips in stock",strips_stored)
    print("pieces_in_stock",pieces_in_storage_left)

    try:
        despStrg_obj=despensoryStock.objects.get(medicine=medicineobj)
        despStrg_obj.box_stored=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
        despStrg_obj.strip_stored=float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored)-float(strips_stored)
        despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)

        # numofboxes=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
        # despStrg_obj.box_stored=float(despStrg_obj.box_stored)+numofboxes
        # despStrg_obj.strip_stored=float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored)-float(strips_stored)
        # despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)
        despStrg_obj.save()
    except:
        despStrg_obj=despensoryStock()
        despStrg_obj.batch_no=1
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
        despStrg_obj.save()

    despStrgHist_obj=despensoryStockHistory()
    despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
    despStrgHist_obj.desp_stock=despStrg_obj
    despStrgHist_obj.medicine=medicineobj
    despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
    despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
    boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
    despStrgHist_obj.box_stored=boxes
    despStrgHist_obj.strip_stored=despStrg_obj.strip_stored
    despStrgHist_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
    despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
    despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
    despStrgHist_obj.save()
    if boxes_stored==0 and pieces_in_storage_left==0.0:
        medicineWarehouseStock_obj.status="Used"
        medbatch_obj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        medbatch_obj.status="Used"
        medbatch_obj.save()
        med_name=medicineWarehouseStock_obj.medicine.medicine_name
        print("med_name",med_name)
        medObj=Medicine.objects.get(medicine_name=med_name)
    try:
        tt_tempMedWhStk_Med.objects.get(medicine=medObj)
        tempMedWhStk_Med_Obj=tt_tempMedWhStk_Med.objects.get(medicine=medObj)
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

    ttmds_obj=tt_Medicine_DespensoryStock()
    ttmds_obj.medicine=medicineobj
    ttmds_obj.medicine_strg=medicineWarehouseStock_obj
    ttmds_obj.desp_stock=despStrg_obj
    ttmds_obj.save()

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
        despStrg_obj=despensoryStock.objects.get(medicine=medicine_obj)
        box_stored_in_desp=despStrg_obj.box_stored
        
        numofboxes=(float(box_stored_in_desp)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored_in_stock)
        print("numofboxes",numofboxes)
        # print("CARTON",(despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored)-carton_stored)
        noofpieces=(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_leftin_stock)

        despStrg_obj.box_stored=numofboxes
        despStrg_obj.piece_stored=noofpieces
        despStrg_obj.save()

    except despensoryStock.DoesNotExist:
        print("sssssssssssssssssss")
        despStrg_obj=despensoryStock()
        medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        despStrg_obj.batch_no=medBatobj.batch_no
        despStrg_obj.medicine=medicine_obj
        despStrg_obj.medicine_strg=medicineWarehouseStock_obj
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored_in_stock
        despStrg_obj.box_stored=boxes
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_leftin_stock
        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
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
    despStrgHist_obj.save()
    if boxes_stored_in_stock==0 and pieces_leftin_stock==0.0:
        medicineWarehouseStock_obj.status="Used"
        medbatch_obj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        medbatch_obj.status="Used"
        medbatch_obj.save()
        med_name=medicineWarehouseStock_obj.medicine.medicine_name
        print("med_name",med_name)
        medObj=Medicine.objects.get(medicine_name=med_name)
        try:
            tt_tempMedWhStk_Med.objects.get(medicine=medObj)
            tempMedWhStk_Med_Obj=tt_tempMedWhStk_Med.objects.get(medicine=medObj)
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

    ttmds_obj=tt_Medicine_DespensoryStock()
    ttmds_obj.medicine=medicine_obj
    ttmds_obj.medicine_strg=medicineWarehouseStock_obj
    ttmds_obj.desp_stock=despStrg_obj
    ttmds_obj.save()





    # Workflow ... 
    # 
    #
    # check the medicine in the storage. if the medicine exsists 
    # fetch the quantity of carton, box, strip and pieces. 
    # subtract the quantity with the request quantity from despensory. 
    # Add the requested amount to the despStorage. 
    # At this point, transaction btw MedStrg and DspStrg Took place. So in Transaction table (MedStrgToDspStrgTransaction)
    # -save the amount given to disp. 
    # -Who Made the Transaction. 
    # -Time and Date. 
    # 
    # So First Get The Requested Medicine. See if it Exsists in the Storage. 
    # Check which package type quantity is requested from the disp. There Can be Multiple Possibilities. 
    # - 1 carton of med or multiple.
    # - 1 box of med or multiple. 
    # - 1 strip of med or multiple.
    # - 1 piece of med or multiple.
    # - 1 box of med and mutlipe strips or pieces.
    # In order to control all these scenrios we'll need to start from the most granular level which is the pieces. 
    # We'll have the total amount of pieces requested, so it'll not matter if its cartons,boxes or strips we'll simply convert it to pieces. 
    # Now, We'll Get the Total Amount of Pieces in Stored in MedStorage, subtract it with Requested Pieces. 
    # Now According to the remaining amount, we'll see the per unit quantity of package types if any one package is null we'll not consider
    #  it for calculation. 
    # In Theory we'll use the amount of pieces For calculation and distribute the quantity according to units that are set. 
    # Once Calculation is complele we'll update the MedStorage and DespStorage. 
    # Records will be saved in Transaction Tables. 
    # Similar Process will be done for addition and reduction in desp Storage....
    # And Similar Process for Any Kind of Reduction from the  tables such as in case of expiration..
    # All This process will complete The flow of medicine into the warehouse and to the dispensory. 
    # Another Table will be off Purchasing goods. Whose Transaction tables will be made seperatly. 
    # Doing this will Complete All of the basic backend work for Medicine Inventory. 
    
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
    if request.method=="POST":
        medicine_name=request.POST.get("medicine_name")
        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        mwhs_objs=medicineWarehouseStock.objects.get(medicine=medicine_obj,status="In Use")
        
        boxes=mwhs_objs.box_stored
        strips=mwhs_objs.strip_stored
        if strips==None:
            strips=0
        pieces=mwhs_objs.piece_stored
        print("boxes",boxes)
        print("pieces",pieces)
        print("strips",strips)
        medstockdatafromstock_allval_dict["boxes"]=boxes
        medstockdatafromstock_allval_dict["strips"]=strips
        medstockdatafromstock_allval_dict["pieces"]=pieces


        



        data={
            "medstockdatafromstock_allval_dict":json.dumps(medstockdatafromstock_allval_dict),
            "boxes":boxes,
            "strips":strips,
            "pieces":pieces,
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
        medicine_name = json.loads(medicine_name)
        selected_type = json.loads(selected_type)
        med_details = json.loads(med_details)

        print(medicine_name)
        print(selected_type)
        print(med_details)
        
        med_obj=Medicine()
        med_obj.medicine_type_id=medicineType.objects.get(medicine_type_name=selected_type)
        med_obj.medicine_name=medicine_name
        med_obj.medicine_details=med_details
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
        data={}
        return JsonResponse(data)


def saveToDespStock(request):
    if request.method=="POST":
        print("SSS")
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

        data={}
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
            'id':str(id),
        }
        return JsonResponse(data)


def viewPatientHistory(request):
    if request.method=="GET":
        # pat_name=request.GET.get("pat_name")
        # contact_no=request.GET.get("contact_no")
        # cnic=request.GET.get("cnic")

        # #phone_no=contact_no,cnic=cnic_no
        # pat_objs=Patient.objects.filter(Q(pat_name=pat_name) | Q(phone_no=contact_no) | Q(cnic=cnic))
        # # pat_obj=Patient.objects.get(id=1)
        # print("pat_objs",pat_objs)
        # patient_dict={}
        # for pat_obj in pat_objs:
        #     patient_info_dict={}
        #     patient_info_dict['name']=pat_obj.pat_name
        #     patient_info_dict['contact_no']=pat_obj.phone_no
        #     patient_info_dict['gender']=pat_obj.gender
        #     patient_info_dict['dob']=str(pat_obj.dob)
        #     patient_info_dict['cnic']=pat_obj.cnic
        #     patient_info_dict['guardian']=pat_obj.guardian
        #     patient_info_dict['address']=pat_obj.address
        #     patient_info_dict['bloodgroup']=pat_obj.bloodgroup
        #     patient_info_dict['email']=pat_obj.email_address
        #     patient_dict[pat_obj.id]=[]
        #     patient_dict[pat_obj.id]=patient_info_dict
        # print(patient_dict)



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
            
            temp_dict['blood_pressure']=pmr_obj.blood_pressure
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

class printPatientPrescription(TemplateView):
    template_path_name="rmcapp/patient_dashboard_template/patient_pres.html"
    def get(self,request):
        return render(request,self.template_path_name)
    def post(self,request):
        pass

def generatePrescription():
    if request.method=="GET":
        pass




def retrieveEmployeeInfo(request):
    if request.method=="GET":

        emp_name=request.GET.get("emp_name")
        # contact_no=request.GET.get("contact_no")
        # cnic=request.GET.get("cnic_no")
        
        # contact_no=""
        # cnic=""
        emp_objs=Employee.objects.filter(name__icontains=emp_name)


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
            employee_info_dict['employee_type']="Doctor"
            employee_info_dict['cnic']=emp_obj.cnic
            employee_dict[emp_obj.id]=[]
            employee_dict[emp_obj.id]=employee_info_dict

        print(employee_dict)

        data={
            "employee_dict":json.dumps(employee_dict),
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
        print("despensoryStock",dspstckobjs)
        dspstck_dict={}
        for dspstck in dspstckobjs:
            tempdspstck_dict={}
            tempdspstck_dict['name']=dspstck.medicine.medicine_name
            tempdspstck_dict['boxes_stored']=dspstck.box_stored
            tempdspstck_dict['strip_stored']=dspstck.strip_stored
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
        medid=request.GET.get('medicine_id')
        pieces_wanted=request.GET.get('pieces_wanted')
        medObj=Medicine.objects.get(id=3)
        # if medObj.AddCharge=='No' then add zero to amount
        despstckObj=despensoryStock.objects.get(medicine=medObj)
        desp_piece=despstckObj.piece_stored
        pieces_wanted=int(pieces_wanted)
        
        despstckObj.piece_stored=desp_piece-pieces_wanted
        price=despstckObj.piece_price_unit*pieces_wanted
        amount=0
        despstckObj.save()

        main_list=['1',medObj.medicine_name,'0','0',pieces_wanted,price,amount]
        dspstckobjs=despensoryStock.objects.filter(status='In Use')
        print("despensoryStock",dspstckobjs)
        dspstck_dict={}
        for dspstck in dspstckobjs:
            tempdspstck_dict={}
            tempdspstck_dict['name']=dspstck.medicine.medicine_name
            tempdspstck_dict['boxes_stored']=dspstck.box_stored
            tempdspstck_dict['strip_stored']=dspstck.strip_stored
            tempdspstck_dict['piece_stored']=dspstck.piece_stored
            tempdspstck_dict['piece_price_unit']=dspstck.piece_price_unit
            dspstck_dict[dspstck.id]=[]
            dspstck_dict[dspstck.id]=tempdspstck_dict

        data={
            'main_list':main_list,
            'dspstck_dict':json.dumps(dspstck_dict),
        }
        return JsonResponse(data)






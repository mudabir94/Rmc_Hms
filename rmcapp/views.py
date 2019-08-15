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
)
from django.http import HttpResponse, JsonResponse
from .Controllers.MedControllers.MedController import MedicineController  


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

def WithStripCalculation(medicineWarehouseStock_obj,medicine_obj):
    numofcartons=0
    numofboxes=0
    numofstrips=0
    numofpieces=1000

    # Packages can be of 4 type, all togather or combos of it. so we can hard code it. 
        # 1. Check how many cartons. 
        # 2. How Many Boxes
        # 3. How Many Strips
        # 4. How Many Pieces
        # 
        # if carton not empty 
    numofboxes=numofboxes+(numofcartons*medicineWarehouseStock_obj.box_unit)
    print("numofboxes",numofboxes)
    totalnumofstrips=numofboxes*medicineWarehouseStock_obj.strip_unit+numofstrips
    total_number_of_req_pieces=totalnumofstrips*medicineWarehouseStock_obj.piece_unit
    total_number_of_req_pieces=total_number_of_req_pieces+numofpieces

    pieces_in_storage_left=float(medicineWarehouseStock_obj.piece_stored)-float(total_number_of_req_pieces)
    all_stock_requested=False
    # Calculating/Finding how many cartons,boxes,strips and pieces stored. 
    if pieces_in_storage_left==0:
        all_stock_requested=True
        print("all_stock_requesteduested")
        # so everything will be zero now...
        # strips_stored=numofcartons*medicineWarehouseStock_obj.strip_unit
        # boxes_stored=numofcartons*medicineWarehouseStock_obj.box_unit
        # carton_stored=numofcartons
        strips_stored=0
        boxes_stored=0
        carton_stored=0
        
    else:
        strips_stored=float(pieces_in_storage_left)/float(medicineWarehouseStock_obj.piece_unit)
        boxes_stored=float(strips_stored)/float(medicineWarehouseStock_obj.strip_unit)
        carton_stored=float(boxes_stored)/float(medicineWarehouseStock_obj.box_unit)
        boxes_stored= math.ceil(boxes_stored)
        carton_stored= math.ceil(carton_stored)



    print("carton in storage",carton_stored)
    print("boxes in storage",boxes_stored)
    print("strips in storage",strips_stored)
    print("pieces_in_storage",pieces_in_storage_left)
    print("------")

    # despStrg_obj=despensoryStock.objects.get(medicine=medicine_obj)
    # despStrg_obj.carton_stored=0
    # despStrg_obj.box_stored=0
    # despStrg_obj.strip_stored=0
    # despStrg_obj.piece_stored=0
    # despStrg_obj.save()
    # if all_stock_requested==True:
    #     cartons=numofboxes/medicineWarehouseStock_obj.box_unit
    #     print("Cartons added to desp",carton+despStrg_obj.carton_stored)
    #     carton_added=carton+despStrg_obj.carton_stored
    #     print("Boxes added to desp",numofboxes+despStrg_obj.box_stored)
    #     boxes_added=numofboxes+despStrg_obj.box_stored
        
    #     print("Strips added to desp",cartons*medicineWarehouseStock_obj.strip_unit)
    #     strips_added=cartons*medicineWarehouseStock_obj.strip_unit
    #     strips_added=despStrg_obj.strip_stored+strips_added
    #     print("Pieces added to desp",total_number_of_req_pieces+despStrg_obj.piece_stored)
    #     pieces_added=total_number_of_req_pieces+despStrg_obj.piece_stored
    # else:
    #     print("CARTON",(despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored)-carton_stored)
    #     print("BOX",(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored))
    #     print("STRIP",(float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored))-float(strips_stored))
    #     print("PIECES",(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_in_storage_left))
    try:
        despStrg_obj=despensoryStock.objects.get(medicine=medicine_obj)

        if all_stock_requested==True:
            cartons=numofboxes/medicineWarehouseStock_obj.box_unit
            print("Cartons added to desp",carton+despStrg_obj.carton_stored)
            carton_added=carton+despStrg_obj.carton_stored
            despStrg_obj.carton_stored=carton_added
            print("Boxes added to desp",numofboxes+despStrg_obj.box_stored)
            
            boxes_added=numofboxes+despStrg_obj.box_stored
            despStrg_obj.box_stored=boxes_added
            print("Strips added to desp",cartons*medicineWarehouseStock_obj.strip_unit)
            strips_added=cartons*medicineWarehouseStock_obj.strip_unit
            strips_added=despStrg_obj.strip_stored+strips_added
            despStrg_obj.strip_stored=strips_added
            print("Pieces added to desp",total_number_of_req_pieces+despStrg_obj.piece_stored)
            pieces_added=total_number_of_req_pieces+despStrg_obj.piece_stored
            despStrg_obj.piece_stored=pieces_added
            despStrg_obj.save()

        else:
            numofboxes=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
            print("numofboxes",numofboxes)
            carton_added=numofboxes/medicineWarehouseStock_obj.box_unit
            print("carton",carton_added)
            # print("CARTON",(despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored)-carton_stored)
            print("carton_added",carton_added)
            print("BOX",(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored))
            print("STRIP",(float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored))-float(strips_stored))
            print("PIECES",(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_in_storage_left))
            # despStrg_obj.carton_stored=despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored-carton_stored
            despStrg_obj.carton_stored=carton_added
            despStrg_obj.box_stored=float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored)-float(boxes_stored)
            despStrg_obj.strip_stored=float(despStrg_obj.strip_stored)+float(medicineWarehouseStock_obj.strip_stored)-float(strips_stored)
            despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)
            despStrg_obj.save()
    except:
        despStrg_obj=despensoryStock()
        despStrg_obj.batch_no=1
        despStrg_obj.medicine=medicine_obj
        despStrg_obj.carton_unit=medicineWarehouseStock_obj.carton_unit
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.strip_unit=medicineWarehouseStock_obj.strip_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        carton_added=boxes/medicineWarehouseStock_obj.box_unit
        despStrg_obj.carton_stored=carton_added
        despStrg_obj.box_stored=boxes
        despStrg_obj.strip_stored=medicineWarehouseStock_obj.strip_stored-strips_stored
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
        despStrg_obj.carton_price_unit=medicineWarehouseStock_obj.carton_price_unit
        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.strip_price_unit=medicineWarehouseStock_obj.strip_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrg_obj.save()

    medicineWarehouseStock_obj.carton_stored=carton_stored
    medicineWarehouseStock_obj.box_stored=boxes_stored
    medicineWarehouseStock_obj.strip_stored=strips_stored
    medicineWarehouseStock_obj.piece_stored=pieces_in_storage_left
    medicineWarehouseStock_obj.save()

def NoStripCalculation(medicineWarehouseStock_obj,medicine_obj,noofboxes,noofpieces):
    numofcartons=0
    numofboxes=noofboxes
    numofstrips=0
    numofpieces=noofpieces
    
    box_per_unit=medicineWarehouseStock_obj.box_unit
   
    
# Packages can be of 4 type, all togather or combos of it. so we can hard code it. 
    # 1. Check how many cartons. 
    # 2. How Many Boxes

    # 4. How Many Pieces
    # 
    # if carton not empty 
    numofboxes=numofboxes*box_per_unit
    total_number_of_req_pieces=numofboxes*medicineWarehouseStock_obj.piece_unit
    total_number_of_req_pieces=total_number_of_req_pieces+numofpieces
    pieces_in_storage_left=float(medicineWarehouseStock_obj.piece_stored)-float(total_number_of_req_pieces)
    all_stock_requested=False
    
    if pieces_in_storage_left==0:
        all_stock_requested=True
        boxes_stored=0
    else:
        boxes_stored=float(pieces_in_storage_left)/float(medicineWarehouseStock_obj.piece_unit)
        boxes_stored= math.ceil(boxes_stored)
    

    try:
        despStrg_obj=despensoryStock.objects.get(medicine=medicine_obj)
        if all_stock_requested==True:
            
            despStrg_obj.box_stored=numofboxes
            despStrg_obj.piece_stored=total_number_of_req_pieces
        else:
            
            numofboxes=(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored)
            print("numofboxes",numofboxes)
            # print("CARTON",(despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored)-carton_stored)
            noofpieces=(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_in_storage_left)

            despStrg_obj.box_stored=numofboxes
            despStrg_obj.strip_stored=0
            despStrg_obj.piece_stored=noofpieces
            despStrg_obj.save()
    except:
        despStrg_obj=despensoryStock()
        medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        despStrg_obj.batch_no=medBatobj.batch_no
        despStrg_obj.medicine=medicine_obj
        despStrg_obj.medicine_strg=medicineWarehouseStock_obj
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        despStrg_obj.box_stored=boxes
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrg_obj.save()

    despStrgHist_obj=despensoryStockHistory()
    despStrgHist_obj.medicine_strg=medicineWarehouseStock_obj
    despStrgHist_obj.desp_stock=despStrg_obj
    despStrgHist_obj.medicine=medicine_obj
    despStrgHist_obj.box_unit=medicineWarehouseStock_obj.box_unit
    despStrgHist_obj.piece_unit=medicineWarehouseStock_obj.piece_unit
    boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
    despStrgHist_obj.box_stored=boxes
    despStrgHist_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
    despStrgHist_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
    despStrgHist_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
    despStrgHist_obj.save()

    medicineWarehouseStock_obj.box_stored=boxes_stored
    medicineWarehouseStock_obj.piece_stored=pieces_in_storage_left
    medicineWarehouseStock_obj.save()

    medicineWhStockHistory_obj=medicineWhStockHistory()
    medicineWhStockHistory_obj.medicine_wh_stock=medicineWarehouseStock_obj
    medicineWhStockHistory_obj.box_stored=boxes_stored
    medicineWhStockHistory_obj.strip_stored=0
    medicineWhStockHistory_obj.piece_stored=pieces_in_storage_left
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
def retrieveMedicineName(request):
    if request.method=="GET":
        # Retrieve Medicine Type list from the model Medicine Type
    
        print(Medicine.objects.all().values_list('medicine_name',"medicine_type_id__medicine_type_name"))
        medicine_name_list=list(Medicine.objects.all().values_list('medicine_name',flat=True))
        medicine_name_type_list=list(Medicine.objects.all().values_list('medicine_name',"medicine_type_id__medicine_type_name"))
        mcobj=MedicineController(med_name_type_list=medicine_name_type_list)
        med_name_type_dict=mcobj.createMedNameTypeDict()
        print("med_name_type_dict",med_name_type_dict)
        print("medicine_name_type_list",medicine_name_type_list)
        data={
            "medicine_name_list":medicine_name_list,
            "med_name_type_dict":json.dumps(med_name_type_dict)
            }
        return JsonResponse(data)

def retrievePackageTypes(request):
        if request.method=="GET":
            package_type_list=list(packageType.objects.all().values_list('package_name',flat=True))
            data={
                "package_type_list":json.dumps(package_type_list),
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
        data={}
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





        data={}
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
        noofpieces=request.POST.get("noofpieces")
        print("medicine_name",medicine_name)
        print("batchno",batchno)
        print("noofboxes",noofboxes)
        print("noofpieces",noofpieces)


        medicine_obj=Medicine.objects.get(medicine_name=medicine_name)
        medicineWarehouseStock_obj=medicineWarehouseStock.objects.get(medicine=medicine_obj)
        if medicineWarehouseStock_obj:
            if(medicineWarehouseStock_obj.strip_stored==0):
                NoStripCalculation(medicineWarehouseStock_obj,medicine_obj,noofboxes,noofpieces)

            else:
                WithStripCalculation(medicineWarehouseStock_obj,medicine_obj)
            




        data={}
        return JsonResponse(data)






        
        

        
        
             


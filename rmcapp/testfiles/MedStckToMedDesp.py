from rmcapp.models import (
    medicineType,
    Medicine,Category,
    medicineWarehouseStock,medicineWhStockHistory,tt_tempMedWhStk_Med,
    tt_MedicineMedWhStock,
    despensoryStock,despensoryStockHistory,tt_Medicine_DespensoryStock,
    medicineBatches,
    packageType,
)
import math


medicine_obj=Medicine.objects.get(id=2)
medicineWarehouseStock_obj=medicineWarehouseStock.objects.get(medicine=medicine_obj)
numofcartons=0
numofboxes=2
numofstrips=0
numofpieces=0

box_per_unit=medicineWarehouseStock_obj.box_unit

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
        if box_per_unit!=0:
            cartons=numofboxes/box_per_unit
            print("Cartons added to desp",cartons)
            despStrg_obj.carton_stored=cartons
            print("Boxes added to desp",numofboxes)
            despStrg_obj.box_stored=numofboxes
            print("Pieces added to desp",total_number_of_req_pieces)
            despStrg_obj.strip_stored=0
            despStrg_obj.piece_stored=total_number_of_req_pieces
        else:
            if box_per_unit!=0:
                print("BOX",(float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored))-float(boxes_stored))
                print("PIECES",(float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored))-float(pieces_in_storage_left))
                despStrg_obj.carton_stored=despStrg_obj.carton_stored+medicineWarehouseStock_obj.carton_stored-carton_stored
                despStrg_obj.carton_stored=carton_added
                despStrg_obj.box_stored=float(despStrg_obj.box_stored)+float(medicineWarehouseStock_obj.box_stored)-float(boxes_stored)
                despStrg_obj.strip_stored=0
                despStrg_obj.piece_stored=float(despStrg_obj.piece_stored)+float(medicineWarehouseStock_obj.piece_stored)-float(pieces_in_storage_left)
                despStrg_obj.save()
except:
        despStrg_obj=despensoryStock()
        medBatobj=medicineBatches.objects.get(medicine_strg=medicineWarehouseStock_obj)
        despStrg_obj.batch_no=medBatobj.batch_no
        despStrg_obj.medicine_strg=medicineWarehouseStock_obj
        despStrg_obj.medicine=medicine_obj
        despStrg_obj.box_unit=medicineWarehouseStock_obj.box_unit
        despStrg_obj.piece_unit=medicineWarehouseStock_obj.piece_unit

        boxes=medicineWarehouseStock_obj.box_stored-boxes_stored
        despStrg_obj.box_stored=boxes
        despStrg_obj.piece_stored=medicineWarehouseStock_obj.piece_stored-pieces_in_storage_left
        despStrg_obj.box_price_unit=medicineWarehouseStock_obj.box_price_unit
        despStrg_obj.piece_price_unit=medicineWarehouseStock_obj.piece_price_unit
        despStrg_obj.save()

        despStrgHist_obj=despensoryStockHistory()
        despStrgHist_obj.batch_no=1
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
        medicineWarehouseStock_obj.strip_stored=0
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

        
    




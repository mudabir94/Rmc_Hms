from rmcapp.models import medicineBatches
from rmcapp.models import Medicine
from rmcapp.models import tt_tempMedWhStk_Med
from django.db.models import Max


class MedicineController:
    def __init__(self,m_id=None,med_strg_id=None,med_name_type_list=None):
        if med_name_type_list==None:   
            self.med_name_type_list = []
        else:
            self.med_name_type_list=med_name_type_list
        self.med_name_type_dict={}
        self.m_id=None
        self.med_strg_id=None

        # self.createMedNameTypeDict()
    def printFunc(self):
        self.m_id=m_id
        self.med_strg_id=med_strg_id
        print("self.m_id",self.m_id)
        


    def createMedNameTypeDict(self):
        print("createMedNameTypeDict",self.med_name_type_list)
        for med_name,med_type in self.med_name_type_list:
            # print(med_name,med_type)
            self.med_name_type_dict[med_name]=med_type
        print(self.med_name_type_dict)
        return  self.med_name_type_dict

    # Get Expiry date of the medicine 
    def getMedExpDate(self,mid):
        pass
    def createBatchNo(self,m_id):
        print("In Create Batch ")
        result="Created Batch for Medicine"
        batch_no=1
        return batch_no 

    def checkMedicineBatchNo_Status(self):
        pass
    def addEntryTomedicineBatches(self):
        pass
    def updateEntryTomedicineBatches(self):
        pass
    def retrieveBatchNo(self,batchObj=None,mid=None,mstrg_id=None):
        return batchObj.batch_no
    def incrementBatchNo(self,batchno=None):
        batchno=int(batchno)
        batchno+=1
        return batchno
    def checkMedInmedicineBatches(self,mid=None,mobj=None):        
        try:
            batchObj= medicineBatches.objects.filter(medicine=mobj)
            
            
            try:
                tt_tempMedWhStk_Meddict=tt_tempMedWhStk_Med.objects.filter(medicine=mobj).aggregate(Max('batch_no'))
                batchno=tt_tempMedWhStk_Meddict['batch_no__max']
                batchno=self.incrementBatchNo(batchno)
                return batchno

                
            except:
                batchObj=medicineBatches.objects.filter(medicine=mobj).aggregate(Max('batch_no'))
                batchno=batchObj['batch_no__max']
                print("batchno",batchno)
                # batchno=batchObj.batch_no
                # batchno=self.retrieveBatchNo(batchObj)
                batchno=self.incrementBatchNo(batchno)
                return batchno

        except:
            batch_no=self.createBatchNo(mid)
            if batch_no!=0:
                return batch_no
            else:
                return print("Nothing found")


       
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime as dt
from pandas import DataFrame

import numpy as np
import math
import os

import rmcapp.AttendanceScripts.fop1 as fop1 
import rmcapp.AttendanceScripts.sop2 as sop2
import rmcapp.AttendanceScripts.top3 as top3
from django.conf import settings
from rmcapp.models import attendanceRecords
from rmcapp.models import User,Employee


def finalGenReports(FileOutPut3Dict):
    # file_name_list=os.listdir("E://Desktop//Rmc_Att//FinalAttReport-test//")
    # file_name_list=os.getcwd()+'\\FileOutPut2'

    for key in FileOutPut3Dict:
        # df = pd.read_excel("E://Desktop//Rmc_Att//FinalAttReport-test//"+filename)
        df=FileOutPut3Dict[key]
        
        df_len=df.shape[0]
        # df_len=4
        rowindexes_todelete=[]
        count=0
        while (count<df_len):
            if (count+1!=df_len):
              
                if isinstance(df['DateTime'][count], datetime.date):
                    currentdate=df['DateTime'][count]
                    print("currentdate-1",currentdate)
                else:
                    currentdate=df['DateTime'][count].date()
                    print("currentdate-2",currentdate)
                if isinstance(df['DateTime'][count+1], datetime.date):
                    nextdate=df['DateTime'][count+1]
                    print("nextdate-1",nextdate)
                else:
                    nextdate=df['DateTime'][count+1].date()
                    print("nextdate-2",nextdate)
                print(currentdate,":",nextdate)
                if currentdate.date()==nextdate.date():
                    print("MATCH FOUND")
                    currentdate_status=df['Status'][count]
                    print("currentdate_status",currentdate_status)
                    if currentdate_status=="ABSENT":
                        rowindexes_todelete.append(count)
                                      

            count+=1

        df=df.drop(df.index[rowindexes_todelete]).reset_index(drop=True)
       
            
        
        for attrec in df.itertuples():
            try:
                attendanceRecords.objects.filter(monthyear=attrec.MonthYear,emp_name=attrec.Name).delete()
            except:
                print("No Previous Record Found")
        
        # iterate over DataFrame and create your objects
        for attrec in df.itertuples():
            if attrec.CheckIn and attrec.CheckOut :
                thw=attrec.THW
                mw=attrec.MW
                print("thw +",thw)
                print("mw type_",type(thw))
                if thw!="" and mw!="":
                    thw=float(thw)
                    mw=float(mw)
                else:
                    thw=0
                    mw=0
                print("thw type",type(mw))
                print("mw type",type(mw))
                try:
                    UserObj=User.objects.get(username=attrec.Name)
                    EmpObj=Employee.objects.get(user=UserObj)
                    attendanceRecords.objects.create(
                    emp_name=attrec.Name,
                    emp_user=EmpObj,
                    date=attrec.DateTime,
                    checkin=attrec.CheckIn,
                    checkout=attrec.CheckOut,
                    day=attrec.DateTime.date().day,
                    month=attrec.DateTime.date().month,
                    year=attrec.DateTime.date().year,
                    status=attrec.Status,
                    hours_worked=thw,
                    minutes_worked=mw,
                    monthyear=attrec.MonthYear
                )
                except:
                    attendanceRecords.objects.create(emp_name=attrec.Name,
                    date=attrec.DateTime,
                    checkin=attrec.CheckIn,
                    checkout=attrec.CheckOut,
                    day=attrec.DateTime.date().day,
                    month=attrec.DateTime.date().month,
                    year=attrec.DateTime.date().year,
                    status=attrec.Status,
                    hours_worked=thw,
                    minutes_worked=mw,
                    monthyear=attrec.MonthYear
                    )
            else:
                thw=attrec.THW
                mw=attrec.MW
                print("thw -",thw)
                print("mw type-",type(thw))
                thw=thw.replace(" ","")
                mw=mw.replace(" ","")
                if thw!="" and mw!="":
                    thw=float(thw)
                    mw=float(mw)
                else:
                    thw=0
                    mw=0
                print("thw type",type(thw))
                print("mw type",type(mw))
                
                try:
                    UserObj=User.objects.get(username=attrec.Name)
                    EmpObj=Employee.objects.get(user=UserObj)
                    attendanceRecords.objects.create(
                    emp_user=EmpObj,
                    emp_name=attrec.Name,
                    date=attrec.DateTime,
                    day=attrec.DateTime.date().day,
                    month=attrec.DateTime.date().month,
                    year=attrec.DateTime.date().year,
                    status=attrec.Status,
                    hours_worked=thw,
                    minutes_worked=mw,
                    monthyear=attrec.MonthYear
                    )

                except:
                    attendanceRecords.objects.create(
                    emp_name=attrec.Name,
                    date=attrec.DateTime,
                    day=attrec.DateTime.date().day,
                    month=attrec.DateTime.date().month,
                    year=attrec.DateTime.date().year,
                    status=attrec.Status,
                    hours_worked=thw,
                    minutes_worked=mw,
                    monthyear=attrec.MonthYear
                    )


        # finaloutputpath=settings.ATTENDANCE_OUTPUT_ROOT
        # finaloutputpath=os.path.dirname(os.path.realpath(finaloutputpath))
        # finaloutputpath=finaloutputpath.replace("\\", '//')
        # finaloutputpath=finaloutputpath+"//attendancefiles//fileoutfiles//fileoutput4//"+key+".xls"
        # print(finaloutputpath)
        # writer = ExcelWriter(finaloutputpath)

        # df.to_excel(writer,'Sheet1',index=False)
        # writer.save()


def main(file_url=None):
    try:
        FileOutPut1Dict=fop1.loadAndExtractRawFile(file_url)
        FileOutPut2Dict=sop2.processOfRawAttData(FileOutPut1Dict)
        FileOutPut3Dict=top3.calculatingAttendance(FileOutPut2Dict)
        # print("FileOutPut3Dict",FileOutPut3Dict)
        finalGenReports(FileOutPut3Dict)
        message='complete'
    except:
        message="error"
    return message
    
if __name__== "__main__":
    main()
    
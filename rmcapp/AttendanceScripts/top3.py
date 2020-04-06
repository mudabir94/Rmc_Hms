
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




def calculatingAttendance(FileOutPut2Dict=None):
    # file_name_list=os.listdir("E://Desktop//Rmc_Att//FileOutPut2-test")
    # file_name_list=os.getcwd()+'\\FileOutPut2'
    FileOutPut3Dict={}
    for key in FileOutPut2Dict:
        # df = pd.read_excel("E://Desktop//Rmc_Att//FileOutPut2-test//"+filename)

        # df = pd.read_excel("C://Users//Mudabir Ahmad//Desktop//att_test_outputs/test1.xlsx", sheetname='Sheet1')
        df=FileOutPut2Dict[key]
        df_len=df.shape[0]
        # df_len=4
        count=0
        morning=[8,9,10,11]
        afternoon=[12,13,14,15,16,17,18,19]
        night=[20,21,22,23,00,1,2,3,4,5,6,7]
        odd_times_to_check_in=[11,12]
        oddtimes_to_check_in_out=[1,2,3,4,5]
        #TTW:Total Time Worked


        cal_df = DataFrame({},columns= ['Department','Name',"DateTime","CheckIn","CheckOut","THW","MW","Status","MonthYear"])


        print("LEN",df_len)
        index=0
        while (count<df_len):
            print("C",count)
            if (count+1!=df_len):
                print(df['Time'][count])
                print(df['Time'][count+1])
                clockin=df['DateTime'][count]
                clockout=df['DateTime'][count+1]
                print(df['In/Out'][count])
                if (df['In/Out'][count]=="Check Out/IN Missing" or df['In/Out'][count]=="Check In Missing" or df['In/Out'][count]=="Check Out Missing"):
                    # adding a row
                    monthyear=df['DateTime'][count].strftime("%b")+"-"+str(df['DateTime'][count].date().year)
                    cal_df_temp_list=[
                    df['Department'][count],
                    df['Name'][count],
                    # df['No.'][count],
                    df['DateTime'][count],
                    "",
                    "",
                    "",
                    "",
                    "Missing Check In/Out",
                    monthyear
                    ]  
                    cal_df.loc[-1] = cal_df_temp_list
                    cal_df.index = cal_df.index + 1  # shifting index
                    cal_df = cal_df.sort_index()  # sorting by index
                    count+=1
                    print(cal_df)
                    # NEW MODIFICATION> NOT ADDED IN ATT_CAL_TEST.py DATE:EID_CHANDRAAT
                elif (df['In/Out'][count]=="ABSENT"):
                    monthyear=df['DateTime'][count].strftime("%b")+"-"+str(df['DateTime'][count].date().year)

                    cal_df_temp_list=[
                    df['Department'][count],
                    df['Name'][count],
                    # df['No.'][count],
                    df['DateTime'][count],
                    "",
                    "",
                    "",
                    "",
                    "ABSENT",
                    monthyear
                    ]  
                    cal_df.loc[-1] = cal_df_temp_list
                    cal_df.index = cal_df.index + 1  # shifting index
                    cal_df = cal_df.sort_index()  # sorting by index
                    count+=1
                    print(cal_df)

                else:

                    diff_in_hours=clockout-clockin
                    diff_in_hours=diff_in_hours/np.timedelta64(1,'h')
                    diff_in_hours=float(diff_in_hours)
                    if diff_in_hours<0:
                        diff_in_hours=-(diff_in_hours)
                    b = diff_in_hours - np.fix(diff_in_hours)
                    diff_in_hours=round(diff_in_hours,3)
                    print("diff_in_hours_ROIND!",diff_in_hours)
                    diff_in_hours=round(diff_in_hours,1)
                    print("diff_in_hours_ROINd2",diff_in_hours)
                    diff_in_hours=round(diff_in_hours)


                    print(round(b*60,2))
                    minworked=round(b*60,2)

                    print(diff_in_hours)
                    monthyear=df['DateTime'][count].strftime("%b")+"-"+str(df['DateTime'][count].date().year)

                    # adding a row
                    cal_df_temp_list=[
                    df['Department'][count],
                    df['Name'][count],
                    # df['No.'][count],
                    df['DateTime'][count],
                    clockin,
                    clockout,
                    diff_in_hours,
                    minworked,
                    "Present",
                    monthyear

                    ]  
                    cal_df.loc[-1] = cal_df_temp_list
                    cal_df.index = cal_df.index + 1  # shifting index
                    cal_df = cal_df.sort_index()  # sorting by index
                    print("Count",count)
                    count+=2
            else:
                monthyear=df['DateTime'][count].strftime("%b")+"-"+str(df['DateTime'][count].date().year)
                cal_df_temp_list=[
                df['Department'][count],
                df['Name'][count],
                # df['No.'][count],
                df['DateTime'][count],
                "",
                "",
                "",
                "",
                "Missing Check In/Out",
                monthyear

                ]  
                cal_df.loc[-1] = cal_df_temp_list
                cal_df.index = cal_df.index + 1  # shifting index
                cal_df = cal_df.sort_index()  # sorting by index
                count+=1
        

        # print(cal_df)
        cal_df=cal_df.iloc[::-1]
        # print("PRINTING CAL DF")
        # print(cal_df)

        
        # writer = ExcelWriter("E://Desktop//Rmc_Att//FinalAttReporttest2//"+key+".xls")
        # # writer = ExcelWriter("C://Users//Mudabir Ahmad//Desktop//WeekChecksOn-C-in-out.xlsx")

        # cal_df.to_excel(writer,'Sheet1',index=False)
        # writer.save()
        FileOutPut3Dict[key]=cal_df.reset_index(drop=True)
    return FileOutPut3Dict



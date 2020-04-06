import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime as dt

import numpy as np
import math
import os
import subprocess







def processOfRawAttData(FileOutPut1Dict=None):
    # file_name_list=os.getcwd()
    # file_name_list=os.listdir("E://Desktop//Rmc_Att//FileOutPut1-test")
    # print("file_name_list",file_name_list)
    FileOutPut2Dict={}
    for key in FileOutPut1Dict:

        emplyoee_name=key
        # emp=emplyoee_name.split(".")
        # emplyoee_name=emp[0]
        # df = pd.read_excel("E://Desktop//Rmc_Att//FileOutPut1-test//"+filename)
        
        # print( df.shape[0])
        df=FileOutPut1Dict[key]
        print(df.columns)
        if 'index' in df.columns:
            df.set_index('index', inplace=True)
            df = df.rename_axis(None)
        

        df_len=df.shape[0]
        print("DF LEN",df_len)
        count=0
        morning=[8,9,10,11]
        afternoon=[12,13,14,15,16,17,18,19]
        night=[20,21,22,23,00,1,2,3,4,5,6,7]
        odd_times_to_check_in_night=[23,0,1,2,3]
        odd_times_to_check_in_morning=[11,12]
        oddtimes_to_check_in_out_in_night=[1,2,3,4,5]

        df['In/Out'].fillna("", inplace=True)
        # print(df)
        
        

        while (count<df_len):
            # print(df.head())
            print("Clock in date/time START ",df['Time'][count])

            clockin_hr=df['Hour'][count]
            clockin=df['Time'][count]

            if (count+1!=df_len):
                # Check in Check out Check... 

                # Check for missing checkin and also check for missing checkout. 
                print("COUNT",count)
                
                if count-1>=0:            
                    if not df['In/Out'][count-1] or df['In/Out'][count-1]=="Check In Missing" or df['In/Out'][count-1]=="Check Out Missing"or df['In/Out'][count-1]=="PLZ CHECK Shift Time C/In Missing" or  df['In/Out'][count-1]=="C OUT True" :
                        diff_in_days= df['Time'][count-1]-df['Time'][count]
                        diff_in_days=diff_in_days/np.timedelta64(1,'D')
                        diff_in_hours= df['Time'][count-1]-df['Time'][count]
                        diff_in_hours=diff_in_hours/np.timedelta64(1,'h')
                        day_floats=float(diff_in_days)
                        diff_in_days=int(day_floats)

                        if diff_in_days<0:
                            diff_in_days=-(diff_in_days)
                        if diff_in_hours<0:
                            diff_in_hours=-(diff_in_hours)
                        if diff_in_days>=1:  
                        #    for ABSENT check
                            if diff_in_days>1:
                                print("prev",df['Time'][count-1])   
                                print("current",df['Time'][count])
                                date = df['Time'][count-1].date()
                               
                                firstpart=df[:count]
                                if 'index' in firstpart.columns:
                                    firstpart.set_index('index', inplace=True)
                                    firstpart = firstpart.rename_axis(None)
                                secondpart=df[count:]
                                if 'index' in secondpart.columns:
                                    secondpart.set_index('index', inplace=True)
                                    secondpart = secondpart.rename_axis(None)
                                # print("firestpasrt",firstpart)
                                # print("secondpart",secondpart)
                                
                                list_row=[]
                                numofdays=diff_in_days
                                print("diff in hours",diff_in_hours)
                                print("numofdays_before",numofdays)
                                # if numofdays!=2:
                                dfd=1
                                # else:
                                #     dfd=1
                            
                                print("numofdays",numofdays)  
                                print("Dfd start",dfd)      
                                for i in range(numofdays): 
                                    dfd+=1
                                    date += datetime.timedelta(days=1)
                                    date=pd.Timestamp(date)
                                    row_value = ['RMC', emplyoee_name,date,"ABSENT",date,date.day,date.month,date.year,date,1,1,1]
                                    list_row.append(row_value)
                                rowdf=(pd.DataFrame(list_row, columns=df.columns))
                                res=pd.concat([firstpart,rowdf],ignore_index=True)
                                res2=pd.concat([res,secondpart],ignore_index=True)
                                df=res2
                                #  A VERY HEAVY LOGIC>>> IT TOOK ME MORE THAN 3 HOURS TO FIGURE OUT WHAT This Code does... 
                                # 
                                print("IN OUT?",df["In/Out"][count])
                                if(df["In/Out"][count]=="ABSENT"):
                                    print("IN?",df["In/Out"][count-1])
                                    if (df["In/Out"][count-1]=="C OUT True" or df['In/Out'][count-1]=="Check In Missing" or df['In/Out'][count-1]=="PLZ CHECK Shift Time C/In Missing"):
                                        count=count-1
                                

                                df_len=df.shape[0]
                                count=count+dfd
                                print(df)
                                print(df["Time"][count])

                            else:
                                print("diff_in_days INNN",diff_in_days)
                                
                                print("PRE TIME",df['Time'][count-1])
                                # 1st Check is lenient towards Checking if Check-in is missing the other is not. 
                                if (df['In/Out'][count-1]=="C OUT True" or df['In/Out'][count-1]=="Check Out Missing"or df['In/Out'][count-1]=="PLZ CHECK Shift Time C/In Missing" or df['In/Out'][count-1]=="Check In Missing" or df['In/Out'][count-1]=="Absent"):
                                    if df['In/Out'][count-1]=="Check Out Missing":
                                        print("Previous Entry CheckOut is missing But The current Entry is not linked to it. ")
                                    elif (df['Hour'][count] in odd_times_to_check_in_night):
                                        print("ODD TIMES TO CHECK IN NIGHT")
                                        df.at[count, 'In/Out']= "Check In Missing"
                                        count+=1
                                        print(df)
                                        continue

                                    elif(df['Hour'][count] in odd_times_to_check_in_morning):
                                        print("ODD TIMES TO CHECK IN NIGHT")

                                        df.at[count, 'In/Out']= "Check In Missing"
                                        count+=1
                                        print(df)
                                        continue
                                    else : 
                                        date = df['Time'][count-1].date()
                                        firstpart=df[:count]
                                        if 'index' in firstpart.columns:
                                            firstpart.set_index('index', inplace=True)
                                            firstpart = firstpart.rename_axis(None)
                                        secondpart=df[count:]
                                        if 'index' in secondpart.columns:
                                            secondpart.set_index('index', inplace=True)
                                            secondpart = secondpart.rename_axis(None)
                                        # print("firestpasrt",firstpart)
                                        # print("secondpart",secondpart)
                                        
                                        

                                        list_row=[]
                                        numofdays=diff_in_days
                                        print("diff in hours",diff_in_hours)
                                        print("numofdays_before",numofdays)
                                        # if numofdays!=2:
                                        dfd=1
                                        # else:
                                        #     dfd=1
                                    
                                        print("numofdays",numofdays)  
                                        print("Dfd start",dfd)      
                            
                                        for i in range(numofdays): 
                                            dfd+=1
                                            date += datetime.timedelta(days=1)
                                            date=pd.Timestamp(date)
                                            row_value = ['RMC', emplyoee_name,date,"ABSENT",date,date.day,date.year,date.month,date,1,1,1]
                                            list_row.append(row_value)
                                        rowdf=(pd.DataFrame(list_row, columns=df.columns))
                                        res=pd.concat([firstpart,rowdf],ignore_index=True)
                                        res2=pd.concat([res,secondpart],ignore_index=True)
                                        df=res2
                                        #  A VERY HEAVY LOGIC>>> IT TOOK ME MORE THAN 3 HOURS TO FIGURE OUT WHAT This Code does... 
                                        # 
                                        print("IN OUT?",df["In/Out"][count])
                                        if(df["In/Out"][count]=="ABSENT"):
                                            print("IN?",df["In/Out"][count-1])
                                            if (df["In/Out"][count-1]=="C OUT True" or df['In/Out'][count-1]=="Check In Missing" or df['In/Out'][count-1]=="PLZ CHECK Shift Time C/In Missing"):
                                                count=count-1
                                

                                        df_len=df.shape[0]
                                        count=count+dfd
                                        # print(df)
                                        print(df["Time"][count])
                                        print("NEW CHECK",diff_in_hours)
                                    

                                else:
                                    df.at[count, 'In/Out']= "Check In Missing"
                                    count+=1
                                    continue
                                # 2nd Check
                                # print("Check In Missing")
                                # df.at[count, 'In/Out']= "Check In Missing"
                                # count+=1
                                # continue

                        else:
                            print("Previous time",df['Time'][count-1])
                            print("Current time",df['Time'][count])
                            diff_in_hours=df['Time'][count-1]-df['Time'][count]
                            diff_in_hours=diff_in_hours/np.timedelta64(1,'h')
                            diff_in_hours=float(diff_in_hours)
                            if diff_in_hours<0:
                                diff_in_hours=-(diff_in_hours)
                            if diff_in_hours>=23:
                                
                                if df['In/Out'][count-1]=="C OUT True" or df['In/Out'][count-1]=="ABSENT":
                                    if (df['Hour'][count] in oddtimes_to_check_in_out_in_night):
                                        print ("Check in Missing")
                                        df.at[count, 'In/Out']= "Check In Missing"
                                        count+=1
                                        continue
                                    else:
                                        print("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
                                        cout_flag=True
                                else:
                                # print("Clock outdate/time----- IN",df['Time'][count+1])
                                    if df['In/Out'][count-1]=="Check Out Missing":
                                        print("going to check if cout missing.")
                                        cout_flag=True

                                    else:
                                        print ("Check in Missing")
                                        df.at[count, 'In/Out']= "Check In Missing"
                                        count+=1
                                        continue
                                # df.set_value(count, 'In/Out', "Check In Missing")
                                # df.insert(count, 'In/Out', "Check In Missing", allow_duplicates = True)
                                # df['C In/Out'][count]="Check In Missing"
                                # add "Check in Missing" in df['C IN/Out'][count]
                                
                            elif diff_in_hours>=20 and diff_in_hours<=22 :
                                print ("PLZ CHECK Shift Time C/In Missing")
                                # print("Clock outdate/time----- IN",df['Time'][count+1])
                                if df['In/Out'][count-1]=="C OUT True" or df['In/Out'][count-1]=="ABSENT":
                                    cout_flag=True
                                else:
                                    #  if same day then maybe checkin not missing.
                                    print("df['Day'][count-1***",df['Day'][count-1]) 
                                    print("df['Day']@@@",df['Day'][count])
                                    if df['Day'][count-1]==df['Day'][count]:
                                        cout_flag=True

                                    else:
                                        df.at[count, 'In/Out']= "PLZ CHECK Shift Time C/In Missing"
                                        count+=1
                                        print(df)
                                        continue

                            else:
                                if (df['In/Out'][count-1]=="Check In Missing" ):
                                    print("Going TO CHECKOUT FUNCTion")
                                elif (df['In/Out'][count-1]=="C OUT True"):
                                    if(df['Day'][count-1]==df['Day'][count]):
                                        print("PPPPPPPPPPPPPP")

                                        print(diff_in_hours)
                                        if (diff_in_hours<=8):
                                            print("Difference is less or eq to 8 ")
                                            if df['In/Out'][count-1]=="C OUT True" or df['In/Out'][count-1]=="ABSENT":
                                                cout_flag=True
                                            else:
                                                print ("PLZ CHECK Shift Time C/In Missing Less")
                                                # print("Clock outdate/time----- IN",df['Time'][count+1])
                                                df.at[count, 'In/Out']= "PLZ CHECK Shift Time C/In Missing"
                                                count+=1
                                                print(df)
                                                continue
                                        elif (diff_in_hours>10): 

                                            print ("PLZ CHECK Shift Time C/In Missing Less")
                                            print("df['Day'][count-1***",df['Day'][count-1]) 
                                            print("df['Day']@@@",df['Day'][count])
                                            if df['Day'][count-1]==df['Day'][count]:
                                                cout_flag=True

                                            else:
                                                df.at[count, 'In/Out']="PLZ CHECK Shift Time C/In Missing"
                                                count+=1
                                                print(df)
                                                continue



                                    else:
                                        if (diff_in_hours>=12):
                                            print("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
                                            if (df['Hour'][count] in odd_times_to_check_in_night ):
                                                print("NIGHT CHECK IN ODD TIME")
                                                df.at[count, 'In/Out']="PLZ CHECK Shift Time C/In Missing"
                                                count+=1
                                                print(df)
                                                continue
                                            elif (df['Hour'][count] in odd_times_to_check_in_morning ):
                                                print("Morning Check in ODD TIME")
                                                df.at[count, 'In/Out']="PLZ CHECK Shift Time C/In Missing"
                                                count+=1
                                                print(df)
                                                continue
                                        else:
                                            print("Going TO CHECKOUT FUNC")


                                    

                                else:

                                    df.at[count, 'In/Out']="C IN True"
                                    df.at[count+1, 'In/Out']="C OUT True"

                                    print("Total Time Worked",diff_in_hours)
                                    cout_flag=False

                                    
                        
                    else:
                        
                        print("RUNNING C OUT FUNCT",df['In/Out'][count])
                        cout_flag=True
                else:
                    cout_flag=True


                print("COUT FLAG",cout_flag)
                if cout_flag==True:
                    if df['Time'][count+1]:
                        clockout_for_outm=df['Time'][count+1]
                        diff_in_days= clockout_for_outm-clockin
                        diff_in_days=diff_in_days/np.timedelta64(1,'D')
                        diff_in_days=float(diff_in_days)
                        diff_in_days=int(diff_in_days)
                        if diff_in_days<0:
                            diff_in_days=-(diff_in_days)
                        if diff_in_days>=1:
                            if diff_in_days>1:  
                                    print("current",df['Time'][count])
                                    print("after",df['Time'][count+1])   
                            
                        
                                    date = df['Time'][count].date()
                                    firstpart=df[:count+1]
                                    if 'index' in firstpart.columns:
                                        firstpart.set_index('index', inplace=True)
                                        firstpart = firstpart.rename_axis(None)
                                    secondpart=df[count+1:]
                                    if 'index' in secondpart.columns:
                                        secondpart.set_index('index', inplace=True)
                                        secondpart = secondpart.rename_axis(None)

                                    list_row=[]
                                    numofdays=diff_in_days
                                    dfd=1
                                    

                                    print("numofdays",numofdays)  
                                    for i in range(numofdays): 
                                        dfd+=1
                                        date += datetime.timedelta(days=1)
                                        date=pd.Timestamp(date)
                                        row_value = ['RMC', emplyoee_name,date,"ABSENT",date,date.day,date.month,date.year,date,1,1,1]
                                        list_row.append(row_value)
                                    rowdf=(pd.DataFrame(list_row, columns=df.columns))
                                    res=pd.concat([firstpart,rowdf],ignore_index=True)
                                    res2=pd.concat([res,secondpart],ignore_index=True)
                                    df=res2
                                    print("IN OUT?",df["In/Out"][count])
                                    df["In/Out"][count]="Check Out Missing"
                                    print(df)
                                    # if(df["In/Out"][count]=="ABSENT"):
                                    #     print("IN?",df["In/Out"][count-1])
                                    #     if (df["In/Out"][count-1]=="C OUT True"):
                                    #         count=count-1
                                

                                    count=count+dfd
                                    continue
                                
                                    # count+=dfd
                    
                                    # print("Count_DFD",count)
                                    # continue
                            else:
                                
                                print("diff_in_days --OUT",diff_in_days)
                                print ("Check out Missing")
                                
                                df.at[count, 'In/Out']= "Check Out Missing"
                            
                                count+=1
                                print(df)
                                continue

                        else:  
                            diff_in_hours= clockout_for_outm-clockin
                            diff_in_hours=diff_in_hours/np.timedelta64(1,'h')
                            diff_in_hours=float(diff_in_hours)
                            print("Diff in hours",diff_in_hours)
                            if diff_in_hours<0:
                                diff_in_hours=-(diff_in_hours)
                            if diff_in_hours>=23:
                                print ("Check out Missing--hours check ---OUT")
                                #  commenting an actual working code to test 1 cond
                                print ("Check Out Missing")
                                df.at[count, 'In/Out']= "Check Out Missing"
                                count+=1
                                continue
                                # if (df['Hour'][count] in oddtimes_to_check_in_out_in_night):
                                #     print ("Check Out Missing")
                                #     df.at[count, 'In/Out']= "Check Out Missing"
                                #     count+=1
                                #     continue
                                # else:
                                #     df.at[count, 'In/Out']="C IN True"
                                #     df.at[count+1, 'In/Out']="C OUT True"
                            elif diff_in_hours>=20 and diff_in_hours<=22 :
                                # print ("PLZ CHECK Shift Time C/OUT Missing")


                                # df.at[count, 'In/Out']= "PLZ CHECK Shift Time C/OUT Missing"
                                # count+=1
                                # continue
                                if df['Hour'][count+1] in oddtimes_to_check_in_out_in_night:
                            
                                    if df['In/Out'][count-1]=="ABSENT":
                                        df.at[count, 'In/Out']="C IN True"
                                        df.at[count+1, 'In/Out']="C OUT True"

                                    else:

                                        print ("PLZ CHECK Shift Time C/OUT Missing")


                                        df.at[count, 'In/Out']= "PLZ CHECK Shift Time C/OUT Missing"
                                        count+=1
                                        continue
                                else:
                                    print("HERERERERERERERERE")
                                    df.at[count, 'In/Out']="C IN True"
                                    df.at[count+1, 'In/Out']="C OUT True"
                                    print("Total Time Worked",diff_in_hours)
                                    print("__________________________________________________________")
                            else:
                                df.at[count, 'In/Out']="C IN True"
                                df.at[count+1, 'In/Out']="C OUT True"

                                print("Total Time Worked",diff_in_hours)
            else:
                df.at[count, 'In/Out']= "Check Out/IN Missing"

            count+=2
            print("CCC",count)
    
        
      
        FileOutPut2Dict[key]=df
        
    return FileOutPut2Dict
        # writer = ExcelWriter("E://Desktop//Rmc_Att//FileOutPut2-test//"+filename)

        # df.to_excel(writer,'Sheet1',index=False)
        # writer.save()
        # print(df)

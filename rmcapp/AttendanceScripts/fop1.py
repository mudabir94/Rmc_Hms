
import pandas as pd
from pandas import ExcelWriter
from pandas import ExcelFile
import datetime
from datetime import date
from datetime import timedelta
from datetime import datetime as dt
import numpy as np
import math
# Data to be sorted
import os
from django.conf import settings

def loadAndExtractRawFile(file_url=None):
    rawfilepath=settings.MEDIA_URL
    rawfilepath=os.path.dirname(os.path.realpath(rawfilepath))
    rawfilepath=rawfilepath.replace("\\", '//')
    file_url=file_url.replace("/","//")
    rawfilepath=rawfilepath+"rmc"+file_url
    print(rawfilepath)
    df = pd.read_excel(rawfilepath)
    df=df.rename(columns={"Date/Time": "DateTime"})
    print(df.columns)
    print( df.shape[0])
    df.Name.unique()
    # print(df.Name.unique())
    Emp_name_list=df.Name.unique()
    FileOutPut1Dict={}
    for name in Emp_name_list:
        subsetDataFrame = df[df['Name'] == name]
        subsetDataFrame=subsetDataFrame.drop(columns=["No.",'Location ID',"VerifyCode","ID Number","CardNo"])
        subsetDataFrame['In/Out']=""
        subsetDataFrame['Date'] = subsetDataFrame['DateTime']
        subsetDataFrame['Day'] = [d.date().day for d in subsetDataFrame['DateTime']]
        subsetDataFrame['Month'] = [d.date().month for d in subsetDataFrame['DateTime']]
        subsetDataFrame['Year'] = [d.date().year for d in subsetDataFrame['DateTime']]
        subsetDataFrame['Time'] = subsetDataFrame['DateTime']
        subsetDataFrame['Hour'] = [d.time().hour for d in subsetDataFrame['DateTime']]
        subsetDataFrame['Minutes'] = [d.time().minute for d in subsetDataFrame['DateTime']]
        subsetDataFrame['Seconds'] = [d.time().second for d in subsetDataFrame['DateTime']]
        # print(subsetDataFrame.columns)
        # subsetDataFrame.set_index('index', inplace=True)
        subsetDataFrame=subsetDataFrame.reset_index(drop=True)

        if 'index' in subsetDataFrame.columns:
            subsetDataFrame.set_index('index', inplace=True)
            subsetDataFrame = subsetDataFrame.rename_axis(None)
            print("INDEX")
        print(subsetDataFrame)
        

        FileOutPut1Dict[name]=subsetDataFrame
    return FileOutPut1Dict



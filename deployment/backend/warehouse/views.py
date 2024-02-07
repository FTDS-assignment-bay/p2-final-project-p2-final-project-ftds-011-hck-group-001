from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from bs4 import BeautifulSoup
import requests
from django.views.decorators.csrf import csrf_exempt
import json
import os

from pyspark.sql import SparkSession
import pandas as pd
import numpy as np

# Create your views here.
@csrf_exempt
def get_data(request):
    path = os.path.join(os.getcwd(),'warehouse','data','rfm_cluster.csv')
    # spark = SparkSession.builder.appName("DataFrame").getOrCreate()
    
    # df = spark.read.format('csv').option('header','true').option('inferSchema','true').load(path)
    # test = df.toJSON().collect()
    # df_dictlist = [json.loads(i) for i in test]
    # df_json = json.dumps(df_dictlist)
    
    df = pd.read_csv('https://raw.githubusercontent.com/FTDS-assignment-bay/p2-final-project-p2-final-project-ftds-011-hck-group-001/main/data/backend.csv').head()
    df_json = df.to_json(orient='split')

    return JsonResponse(df_json,safe=False,content_type='application/json')

@csrf_exempt
def get_one_data(request):
    results = json.loads(request.body)
    print(results)
    columns = results['columns']
    value = int(results['value'])
    
    print(f"columns:{columns}, value:{value}")
    
    path = os.path.join(os.getcwd(),'warehouse','data','rfm_cluster.csv')
    df = pd.read_csv('https://raw.githubusercontent.com/FTDS-assignment-bay/p2-final-project-p2-final-project-ftds-011-hck-group-001/main/data/backend.csv')
    df = df.query(f'{columns} == {value}').sort_values(by=['monetary_value','frequency']).reset_index(drop=True).iloc[0:10]
    print(df.head())
    df_json = df.to_json(orient='split')
    
    return JsonResponse(df_json,safe=False,content_type='application/json')
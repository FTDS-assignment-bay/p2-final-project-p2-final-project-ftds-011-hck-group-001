# import libraries
import pandas as pd
import os
import time
import sys
from datetime import datetime
# Airflow
from airflow.models import DAG
from airflow.operators.python import PythonOperator
from airflow.providers.postgres.operators.postgres import PostgresOperator
from airflow.utils.task_group import TaskGroup
# Joblib
import joblib
# sqlalchemy
from sqlalchemy import create_engine
from time import sleep

def feedsql():
    username = os.environ['POSTGRES_USER']
    password = os.environ['POSTGRES_PASSWORD']
    database = os.environ['POSTGRES_DB']
    host = os.environ['POSTGRES_HOST']
    
    pg_url = f'postgresql+psycopg2://{username}:{password}@{host}/{database}'
    engine = create_engine(pg_url)
    conn = engine.connect()
    
    cwd = os.getcwd()
    filelist = os.listdir(os.path.join(cwd,'data'))
    file = [i for i in filelist if '.csv' in i][0]
    df = pd.read_csv(f'/opt/airflow/data/{file}')
    # raise Exception(df)
    df.to_sql('dirty',conn,index=False,if_exists='replace')
    sleep(3)
    
def feedcsv():
    username = os.environ['POSTGRES_USER']
    password = os.environ['POSTGRES_PASSWORD']
    database = os.environ['POSTGRES_DB']
    host = os.environ['POSTGRES_HOST']
    
    pg_url = f'postgresql+psycopg2://{username}:{password}@{host}/{database}'
    engine = create_engine(pg_url)
    conn = engine.connect()
    
    df = pd.read_sql_query('select * from dirty',conn)
    df.to_csv('/opt/airflow/data/dirty.csv',sep=',', index=False)
    sleep(3)

def preprocessing():
    username = os.environ['POSTGRES_USER']
    password = os.environ['POSTGRES_PASSWORD']
    database = os.environ['POSTGRES_DB']
    host = os.environ['POSTGRES_HOST']
    
    pg_url = f'postgresql+psycopg2://{username}:{password}@{host}/{database}'
    engine = create_engine(pg_url)
    conn = engine.connect()
    
    df = pd.read_csv('/opt/airflow/data/dirty.csv')
    
    # Missing Value Handling
    # - = SimpleImputter(0), . = SimpleImputter(0)
    df.replace('.','0',inplace=True)
    df.replace('-','0',inplace=True)
    df.drop_duplicates(inplace=True)
    df.fillna(0,inplace=True)
    
    # Save Cleaned Data
    df.to_csv('/opt/airflow/data/clean.csv',index=False,sep=',')
    df.to_sql('clean',conn,index=False,if_exists='replace')
    sleep(3)

def modeling():
    try:
        get_model = os.listdir(os.path.join(os.getcwd(),'models'))
        name_model = [i for i in get_model if 'pkl' in i][0]
        model = joblib.load(f'/opt/airflow/models/{get_model}')
        
        df = pd.read_csv('/opt/airflow/data/clean.csv')
        df['cluster'] = model.predict(df)
        
        df.to_csv('/opt/airflow/data/clustered.csv',index=False)
        
    except Exception as e:
        raise Exception(e)
        


default_args = {
    'owner': 'adam',
    'start_date': datetime(2022, 12, 24, 12, 00)
}
    

with DAG('data_clustering',
         description='Data Clustering',
         schedule_interval='30 6 * * *',
         default_args=default_args,
         catchup=False) as dag:
    # Pass data to sql
    sqlconvert = PythonOperator(
        task_id='sqlconvert',
        python_callable=feedsql
    )
    # Pass data to csv
    csvconvert = PythonOperator(
        task_id='csvconvert',
        python_callable=feedcsv
    )
    # Cleaning Data
    maid = PythonOperator(
        task_id='maid',
        python_callable=preprocessing
    )
    clustering = PythonOperator(
        task_id='clustering',
        python_callable=preprocessing
    )
    
    sqlconvert >> csvconvert >> maid >> clustering
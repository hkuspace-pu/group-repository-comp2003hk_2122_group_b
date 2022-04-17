import sys
import pymysql

import rds_config

import GetController
import PutController
import PostController
import DeleteController

# 1. Install pymysql to local directory
# pip install -t $PWD pymysql

# 2. (If using Lambda) Write your code, then zip the content all up (not include the outer folder)

# Lambda Permissions:
# AWSLambdaVPCAccessExectionRole

# Configuration Values
endpoint = rds_config.db_endpoint
username = rds_config.db_username
password = rds_config.db_password
database_name = rds_config.db_database

# Connection
try:
    connection = pymysql.connect(host=endpoint,user=username, passwd=password, db=database_name, port=3306, connect_timeout=5)
except pymysql.Error as e:
    print("ERROR: Unexpected error: Could not connect to MySQL")
    print(e)
    sys.exit()

print("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    response = {
        'statusCode': 501,
    }
    
    if event["httpMethod"] == "GET":
        response = GetController.get(connection)
    if event["httpMethod"] == "PUT":
        response = PutController.put(connection, event['body'])
    # if event["httpMethod"] == "POST":
    #     response = PostController.post(connection, event['body'])
    # if event["httpMethod"] == "DELETE":
    #     response = DeleteController.delete(connection, event['body'])

    return response

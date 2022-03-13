import sys
import rds_config
import pymysql
import json

# 1. Install pymysql to local directory
# pip install -t $PWD pymysql

# 2. (If using Lambda) Write your code, then zip it all up
# a) Mac/Linux --> zip -r9 ${PWD}/function.zip
# b) Windows --> Via Windows Explorer

# Lambda Permissions:
# AWSLambdaVPCAccessExectionRole

# Configuration Values
endpoint = rds_config.db_endpoint
username = rds_config.db_username
password = rds_config.db_password
database_name = rds_config.db_database

# Connection
try:
    connection = pymysql.connect(
        host=endpoint,
        user=username, 
        passwd=password, 
        db=database_name, 
        port=3306, 
        connect_timeout=5
    )
except pymysql.Error as e:
    print("ERROR: Unexpected error: Could not connect to MySQL")
    print(e)
    sys.exit()

print("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    print("httpmethod")
    print(event['httpMethod'])
    
    cursor = connection.cursor()
    body = json.loads(event['body'])
    
    sql = "UPDATE trees SET "
    sql += "tree_name=%s, "
    sql += "alias=%s, "
    sql += "scientific_name=%s, "
    sql += "family_code=%s, "
    sql += "ecologic=%s, "
    sql += "cap_95=%s, "
    sql += "cap_586=%s, "
    sql += "hk_rare=%s, "
    sql += "cn_rare=%s, "
    sql += "flowering_start=%s, "
    sql += "flowering_end=%s, "
    sql += "fruit_start=%s, "
    sql += "fruit_end=%s, "
    sql += "tree_desc=%s "
    sql += "WHERE tree_id=%s"
    val = (
        body["treeName"],
        body["alias"],
        body["scientificName"],
        body["familyCode"],
        body["ecologic"],
        
        body["cap95"],
        body["cap586"],
        body["hkRare"],
        body["cnRare"],
        
        body["floweringStart"],
        body["floweringEnd"],
        body["fruitStart"],
        body["fruitEnd"],
        
        body["treeDesc"],
        
        body["treeID"]
    )
    
    statusCode = 502
    message = "Update tree record failure"
    try:
        cursor.execute(sql, val)
        connection.commit()
        statusCode = 200
        message = "Update tree record failure "
    except:
        connection.rollback();
    
    return {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': message
    }

# lambda_handler('', '')

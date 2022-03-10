import sys
import rds_config
import pymysql

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
    connection = pymysql.connect(host=endpoint,user=username, passwd=password, db=database_name, port=3306, connect_timeout=5)
except pymysql.Error as e:
    print("ERROR: Unexpected error: Could not connect to MySQL")
    print(e)
    sys.exit()

print("SUCCESS: Connection to RDS MySQL instance succeeded")
def lambda_handler(event, context):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM trees")

    rows = cursor.fetchall()

    print(rows)
    return rows

# lambda_handler('', '')

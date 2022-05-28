import json

def delete(connection, data):
    cursor = connection.cursor()
    body = json.loads(data)
    
    sql = "DELETE FROM trees WHERE tree_id = %s" % body['treeID']
    
    statusCode = 502
    message = "Delete tree record failure"
    try:
        cursor.execute(sql)
        connection.commit()
        statusCode = 200
        message = "Delete tree record succeeded"
    except:
        connection.rollback()

    # print(rows)
    return {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
        },
        'body': message
    }
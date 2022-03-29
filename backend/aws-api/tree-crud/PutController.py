import json

def put(connection, data):
    cursor = connection.cursor()
    body = json.loads(data['body'])
    
    sql = "INSERT INTO trees "
    sql += "(tree_name, tree_alias, scientific_name, family_code, ecologic, cap_96, cap_586, hk_rare, cn_rare, flowering_start, flowering_end, fruit_start, fruit_end, tree_desc, tree_image) "
    sql += "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    val = (
        body["treeName"],
        body["treeAlias"],
        body["scientificName"],
        body["familyCode"],
        body["ecologic"],
        
        body["cap96"],
        body["cap586"],
        body["hkRare"],
        body["cnRare"],
        
        body["floweringStart"],
        body["floweringEnd"],
        body["fruitStart"],
        body["fruitEnd"],
        
        body["treeDesc"],
        body["treeImage"]
        
    )
    
    statusCode = 502
    message = "Create tree record failure"
    try:
        cursor.execute(sql, val)
        connection.commit()
        statusCode = 200
        message = "Create tree record succeeded "
    except:
        connection.rollback()
    
    return {
        'statusCode': statusCode,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,PUT'
        },
        'body': message
    }
    
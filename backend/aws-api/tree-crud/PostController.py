import json

def post(connection, data):
    cursor = connection.cursor()
    body = json.loads(data['body'])
    
    sql = "UPDATE trees SET "
    sql += "tree_name=%s, "
    sql += "tree_alias=%s, "
    sql += "scientific_name=%s, "
    sql += "family_code=%s, "
    sql += "ecologic=%s, "
    sql += "cap_96=%s, "
    sql += "cap_586=%s, "
    sql += "hk_rare=%s, "
    sql += "cn_rare=%s, "
    sql += "flowering_start=%s, "
    sql += "flowering_end=%s, "
    sql += "fruit_start=%s, "
    sql += "fruit_end=%s, "
    sql += "tree_desc=%s "
    sql += "tree_image=%s"
    sql += "WHERE tree_id=%s"
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
        body["treeImage"],
        
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
        connection.rollback()
    
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
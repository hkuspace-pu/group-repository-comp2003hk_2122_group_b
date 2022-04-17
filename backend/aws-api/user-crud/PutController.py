import json
import hashlib
import rds_config

def put(connection, data):
    cursor = connection.cursor()
    body = json.loads(data)
    
    print("=====testing=====")
    print(body)
    
    username = body["userName"]
    email = body["email"]
    membership= body["membership"]
    password = body["password"]
    key = rds_config.user_password_key
    iv = body["iv"]
    print(password)
    print(key)
    print(iv)
    
    # m = hashlib.sha256()
    # m.update(password.encode('utf-8'))
    # m.digest()
    # print(m)
    
    # cipher = AES.new(key, AES.MODE_CBC, iv=iv)
    # originalData = unpad(cipher.decrypt(cipheredData), AES.block_size)
    # print(originalData)
    
    # sql = "INSERT INTO users "
    # sql += "(tree_name_en, tree_name_cn, tree_alias, scientific_name, family_code, ecologic, cap_96, cap_586, hk_rare, cn_rare, flowering, fruit, tree_desc_en, tree_desc_cn, tree_image) "
    # sql += "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    # val = (
    #     body["treeNameEn"],
    #     body["treeNameCn"],
    #     body["treeAlias"],
    #     body["scientificName"],
    #     body["familyCode"],
    #     body["ecologic"],
        
    #     body["cap96"],
    #     body["cap586"],
    #     body["hkRare"],
    #     body["cnRare"],
        
    #     body["flowering"],
    #     body["fruit"],
        
    #     body["treeDescEn"],
    #     body["treeDescCn"],
    #     body["treeImage"]
        
    # )
    
    statusCode = 502
    message = "Create user record failure"
    # try:
    #     cursor.execute(sql, val)
    #     connection.commit()
    #     statusCode = 200
    #     message = "Create tree record succeeded "
    # except:
    #     connection.rollback()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,PUT'
        },
        'body': message
    }
    
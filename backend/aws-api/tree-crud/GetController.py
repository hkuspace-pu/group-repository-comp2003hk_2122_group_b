import json

def get(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM trees")

    rows = cursor.fetchall()
    results = []
    for row in rows:
        results.append({
            "treeId": row[0],
            "treeName": row[1],
            "alias": row[2],
            "scientificName": row[3],
            "familyCode": row[4],
            "ecologic": row[5],
            "cap96": row[6],
            "cap586": row[7],
            "hkRare": row[8],
            "cnRare": row[9],
            "floweringStart": row[10],
            "floweringEnd": row[11],
            "fruitStart": row[12],
            "fruitEnd": row[13],
            "treeDesc": row[14]
        })
        
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': json.dumps(results)
    }
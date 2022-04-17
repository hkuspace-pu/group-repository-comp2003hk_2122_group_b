import json

def get(connection):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users")

    rows = cursor.fetchall()
    results = []
    for row in rows:
        results.append({
            "userId": row[0],
            "userName": row[1],
            "email": row[2],
            "membership": row[4]
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

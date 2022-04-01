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
            "flowering": row[10],
            "fruit": row[11],
            "treeDesc": row[12],
            "treeImage": row[13]
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
    
def getWithOptions(connection, data):
    options = json.loads(data["0"])
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM trees")
    
    print("===testing start===")
    print(options)
    print("===testing end===")

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
            "flowering": row[10],
            "fruit": row[11],
            "treeDesc": row[12],
            "treeImage": row[13]
        })
    
    # check species
    if options["species"] != None:
        filtered = []
        checkstr = ""
        if options["species"] == 1:
            checkstr = "Exotic"
        if options["species"] == 2:
            checkstr = "Native"
        if len(checkstr) > 0:
            for result in results:
                if result["ecologic"] == checkstr:
                    filtered.append(result)
            results = filtered
            
    # check flowering
    if options["flowering"] != None:
        filtered = []
        for result in results:
            for index, month in enumerate(list(result["flowering"])):
                if month == "1":
                    if (index+1) in options["flowering"]:
                        filtered.append(result)
                        break
        results = filtered
    
    # check fruit
    if options["fruit"] != None:
        filtered = []
        for result in results:
            for index, month in enumerate(list(result["fruit"])):
                if month == "1":
                    if (index+1) in options["fruit"]:
                        filtered.append(result)
                        break
        results = filtered
        
    # check rare
    if options["cap96"] != None:
        filtered = []
        for result in results:
            if options["cap96"]:
                filtered.append(result)
        results = filtered
        
    if options["cap586"] != None:
        filtered = []
        for result in results:
            if options["cap586"]:
                filtered.append(result)
        results = filtered
        
    if options["hkRare"] != None:
        filtered = []
        for result in results:
            if options["hkRare"]:
                filtered.append(result)
        results = filtered
    
    if options["cnRare"] != None:
        filtered = []
        for result in results:
            if options["cnRare"]:
                filtered.append(result)
        results = filtered
        
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
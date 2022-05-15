const { decrypt, hash } = require("CryptoUtil");

exports.post = function(pool, body, callback) {
    let obj = JSON.parse(body),
        userName = obj["userName"],
        email = obj["email"],
        membership = obj["membership"],
        password = obj["password"],
        iv = obj["iv"],
        key = process.env.PASSWORD_KEY,
        decrypted = decrypt(password, key, iv),
        hashed = hash(decrypted),
        sql = "INSERT INTO users (user_name, email, password, membership) VALUES ";
    
    sql += `('${userName}', '${email}', '${hashed}', ${membership});`;
        
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, function(error, results) {
            if(error) {
                callback(error);
            } else {
                const result = {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,PUT'
                    },
                    'body': "Create user success"
                };
                callback(null, result);
            }
        });
    });
};
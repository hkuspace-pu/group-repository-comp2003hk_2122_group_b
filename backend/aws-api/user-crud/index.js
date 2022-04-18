const mysql = require('mysql');
const CryptoJS = require("crypto-js");
const { createHash } = require('crypto');

const pool = mysql.createPool({
    host    : process.env.RDS_HOSTNAME,
    user    : process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE
});

console.log("====start====")
exports.handler = (event, context, callback) => {
    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;
    
    console.log("====event", event["httpMethod"]);
    console.log("====body", event["body"]);
    
    switch (event["httpMethod"]) {
        case 'GET':
            get(callback);
            break;
        case 'PUT':
            put(event["body"], callback);
            break;
        default:
            get(callback);
    }
};

function get(callback) {
    const sql = "SELECT * FROM users";
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        connection.query(sql, function(error, results) {
           if(error) {
               callback(error);
           } else {
               let r = [];
               for (var i = 0; i < results.length; i++) {
                   r.push({
                       userId: results[i]["user_id"],
                       userName: results[i]["user_name"],
                       email: results[i]["email"],
                       membership: results[i]["membership"]
                   });
               }
               const result = {
                   'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,GET'
                    },
                    'body': JSON.stringify(r)
               };
               callback(null, result);
           }
        });
    });
}

function put(body, callback) {
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
}

function decrypt(word, keyStr, ivStr) {
    let key = CryptoJS.enc.Utf8.parse(keyStr),
        iv = CryptoJS.enc.Utf8.parse(ivStr);

    let decrypt = CryptoJS.AES.decrypt(word, key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypt.toString(CryptoJS.enc.Utf8);
}

function hash(word) {
    return createHash('sha256').update(word).digest('hex');
}
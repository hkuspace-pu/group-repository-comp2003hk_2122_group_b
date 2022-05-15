const { decrypt, hash } = require("CryptoUtil");

exports.put = function(pool, body, callback) {
    let obj = JSON.parse(body);
    switch(obj["requestType"]) {
        case "updateDetail":
            updateDetail(pool, obj, callback);
            break;
        case "changePassword":
            changePassword(pool, obj, callback);
            break;
        case "login":
            login(pool, obj, callback);
            break;
    }
};

function updateDetail(pool, data, callback) {
    let userId = data["userId"],
        userName = data["userName"],
        email = data["email"],
        membership = data["membership"],
        sql = `UPDATE users SET user_name='${userName}', email='${email}', membership=${membership} WHERE user_id=${userId}`;
        
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
                        'Access-Control-Allow-Methods': 'OPTIONS,POST'
                    },
                    'body': "Update details success"
                };
                callback(null, result);
            }
        });
    });
}

function changePassword(pool, data, callback) {
    let userId = data["userId"],
        key = process.env.PASSWORD_KEY;
        
    let oldPassword = data["oldPassword"],
        oldPasswordIV = data["oldPasswordIV"],
        decryptedOldPassword = decrypt(oldPassword, key, oldPasswordIV),
        hashedOldPassword = hash(decryptedOldPassword);
        
    let newPassword = data["newPassword"],
        newPasswordIV = data["newPasswordIV"],
        decryptedNewPassword = decrypt(newPassword, key, newPasswordIV),
        hashedNewPassword = hash(decryptedNewPassword);
        
    let checkingSql = `SELECT * FROM users WHERE user_id=${userId}`,
        updateSql = `UPDATE users SET password='${hashedNewPassword}' WHERE user_id=${userId}`;
    
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        
        connection.query(checkingSql, function(error, results) {
            if(error) {
                callback(error);
            } else {
                let recordPassword = results[0]["password"];
                if(recordPassword === hashedOldPassword) {
                    connection.query(updateSql, function(error2, results2) {
                        if(error2) {
                            callback(error2);
                        } else {
                            const result = {
                                'statusCode': 200,
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Headers': 'Content-Type',
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'OPTIONS,POST'
                                },
                                'body': "Password changed success"
                            };
                            callback(null, result);
                        }
                    });
                } else {
                    const result = {
                        'statusCode': 401,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'OPTIONS,POST'
                        },
                        'body': "Old password Unauthorized"
                    };
                    callback(null, result);
                }
            }
        });
    });
}

function login(pool, data, callback) {
    let email = data["email"],
        key = process.env.PASSWORD_KEY,
        password = data["password"],
        iv = data["iv"],
        decrypted = decrypt(password, key, iv),
        hashed = hash(decrypted),
        checkingSQL = `SELECT * FROM users WHERE email='${email}'`;
        
    pool.getConnection(function(err, connection) {
        if(err) throw err;
        
        connection.query(checkingSQL, function(error, results) {
            if(error) {
                callback(error);
            } else {
                let recordPassword = results[0]["password"];
                if(recordPassword === hashed) {
                    let timestamp = Date.now(),
                        setTimeSQL = `UPDATE user SET login='${timestamp}' WHERE email='${email}'`;
                    
                    connection.getConnection(setTimeSQL, function(error2, results) {
                        if(error2) {
                            callback(error2);
                        } else {
                            const result = {
                                'statusCode': 200,
                                'headers': {
                                    'Content-Type': 'application/json',
                                    'Access-Control-Allow-Headers': 'Content-Type',
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'OPTIONS,POST'
                                },
                                'body': {
                                    message: "Login success",
                                    userId: results[0]["user_id"],
                                    userName: results[0]["user_name"],
                                    email: email,
                                    membership: results[0]["membership"],
                                    timestamp: timestamp
                                }
                            };
                            callback(null, timestamp);
                        }
                    });
                } else {
                    const result = {
                        'statusCode': 401,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'OPTIONS,POST'
                        },
                        'body': "User Unauthorized"
                    };
                    callback(null, result);
                }
            }
        });
    });
}
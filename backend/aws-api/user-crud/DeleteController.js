exports.remove = function(pool, body, callback) {
    let obj = JSON.parse(body),
        userId = obj["userId"],
        sql = `DELETE FROM users WHERE user_id = ${userId}`;
        
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
                        'Access-Control-Allow-Methods': 'OPTIONS,DELETE'
                    },
                    'body': "Delete user success"
                };
                callback(null, result);
            }
        });
    });
};
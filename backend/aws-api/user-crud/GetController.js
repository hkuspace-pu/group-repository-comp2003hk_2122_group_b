exports.get = function(pool, callback) {
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
};
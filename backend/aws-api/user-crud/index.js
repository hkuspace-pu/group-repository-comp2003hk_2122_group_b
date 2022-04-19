const mysql = require('mysql');

const { get } = require('GetController');
const { put } = require('PutController');
const { remove } = require('DeleteController');
const { post } = require('PostController');

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
    
    console.log("====event====", event["httpMethod"]);
    console.log("====body====", event["body"]);
    
    switch (event["httpMethod"]) {
        case 'GET':
            get(pool, callback);
            break;
        case 'PUT':
            put(pool, event["body"], callback);
            break;
        case 'DELETE':
            remove(pool, event["body"], callback);
            break;
        case 'POST':
            post(pool, event["body"], callback);
            break;
        default:
            get(pool, callback);
    }
};
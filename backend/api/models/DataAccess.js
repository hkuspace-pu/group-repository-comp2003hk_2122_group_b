const dbConfig = require("../config/dbConfig");
const sql = require("mssql");
const Tree = require("./Tree.js")

class DataAccess {
    constructor() { }

    getTrees(callback) {
        sql.connect(dbConfig, function(err) {
            const request = new sql.Request();
            const queryString = "SELECT * FROM gp.Trees";

            if(err) {
                console.log(err);
                return;
            }

            request.query(queryString, function(err, records) {
                if(err) {
                    console.log(err);
                    return;
                }

                var trees = [];
                records.recordset.forEach(record => trees.push(new Tree(record)));

                callback(trees);
            });
        });
    }
}

const instance = new DataAccess();
Object.freeze(instance);

module.exports = instance;

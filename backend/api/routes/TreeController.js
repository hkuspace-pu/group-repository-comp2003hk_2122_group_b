const express = require("express");
const router = express.Router();

const DataAccess = require("../model/DataAccess.js");

router.get("/", function(req, res) {
    const callback = (record) => {
        res.send(record);
    };

    DataAccess.getTrees(callback);
});

module.exports = router;

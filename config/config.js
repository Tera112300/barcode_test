const NCMB = require("ncmb");
// envファイル読み込み
require('dotenv').config();
const env = process.env;

const Views = '../views/';

var ncmb = new NCMB(env.AppKey,env.ClientKey);



var ErrorFunc = function(req, res,error) {
    var data = {
        method: req.method,
        protocol: req.protocol,
        version: req.httpVersion,
        name: error.name,
        message: error.message,
        stack: error.stack
    };
    res.status(500);
    if (req.xhr) {
        res.json(data);
    } else {
        res.render(Views + '500.ejs', {
            data: data
        });
    }
}



module.exports = {
    env,
    ncmb,
    Views,
    ErrorFunc
};
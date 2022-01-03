const ncmb = require('../config/config').ncmb;


module.exports = {
    qrClassbyID: function () {
        return new Promise(function (res, rej) {
            var qrClass = ncmb.DataStore('qrClass');

            var item = qrClass.fetch().then(item => {
                res(item);
            }).catch(function (e) {
                rej(e);
            });

        })
    }
}
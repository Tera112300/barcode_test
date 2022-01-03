const ncmb = require('../config/config').ncmb;


module.exports = {
    recoEequalto: function (objectId) {
        return new Promise(function (res, rej) {
            var recordClass = ncmb.DataStore('recordClass');
            var item = recordClass.equalTo("user_id",objectId).fetch().then(item => {
                res(item);
            }).catch(function (e) {
                rej(e);
            });
        })
    }
}
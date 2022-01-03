const ncmb = require('../config/config').ncmb;


module.exports = {
    isBelongTo: function (role) {
        me = ncmb.User.getCurrentUser();
        return new Promise(function (res, rej) {
            ncmb.request({
                    path: "/" + ncmb.version + "/users",
                    query: {
                        where: JSON.stringify({
                            "objectId": me.objectId,
                            "$relatedTo": {
                                "object": {
                                    "__type": "Pointer",
                                    "className": "role",
                                    "objectId": role.objectId
                                },
                                "key": "belongUser"
                            }
                        })
                    }
                })
                .then(function (ary) {
                    var json = JSON.parse(ary).results;
                    res(json.length == 1);
                })
                .catch(function (e) {
                    rej(e);
                });
        });
    }
}
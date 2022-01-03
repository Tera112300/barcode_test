const Qr = require('../models/Qr');

const Record = require('../models/Record');

const ncmb = require('../config/config').ncmb;

const Views = require('../config/config').Views;

const ErrorFunc = require('../config/config').ErrorFunc;


module.exports = {
  index(req, res){
    
    ncmb.Role.fetchById("rX3ATXOYBZbnDS39").then(function(role){
      return role.fetchUser();
     }).then(function(users){
     
      let data = {
        users: users,
      };
      res.render(Views + 'index.ejs', {
        data: data,
        current:ncmb.User.getCurrentUser()
      });
     }).catch(function(error){
      ErrorFunc(req, res,error);
     });
  },
  detail(req, res) {

    ncmb.Role.fetchById("rX3ATXOYBZbnDS39").then(function(role){
      return role.fetchUser();
     }).then(function(users){
      let userfind = users.find((user) => {
        return (user.objectId === req.params.objectId);
      });


      if(userfind){
        Record.recoEequalto(req.params.objectId).then(function(recode){
          var moment = require('moment');
          Qr.qrClassbyID().then(function (item) {
            let data = {
              user_data:userfind,
              latitude: item.latitude,
              longitude: item.longitude,
              user_id: req.params.objectId,
              recode_data:recode
            };
            res.render(Views + 'detail.ejs', {
              data: data,
              moment:moment,
              current:ncmb.User.getCurrentUser()
            });
          })
        }).catch(function (error) {
          ErrorFunc(req, res,error);
        });
      }else{
        res.redirect("/administration");
      }

     }).catch(function(error){
      ErrorFunc(req, res,error);
     });

    

  },
}
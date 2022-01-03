const User = require('../models/User');
const ncmb = require('../config/config').ncmb;


const Views = require('../config/config').Views;

const ErrorFunc = require('../config/config').ErrorFunc;


module.exports = {
  index(req, res) {
    var CurrentUser = ncmb.User.getCurrentUser();
    if (CurrentUser) {
      res.redirect("/administration");
    }

    res.render(Views + 'login.ejs', {
      current:ncmb.User.getCurrentUser()
    });
  },
  check(req, res) {
    ncmb.User.login(req.body.name, req.body.password)
      .then(function (user) {
        ncmb.Role.equalTo("roleName", "管理者").fetch().then(function (role) {
          User.isBelongTo(role).then(function (result) {
            if (result) {
              res.redirect("/administration");
            } else {
              ncmb.User.logout() //<-- メソッド使用
                .then(function (user) {
                  res.redirect("/administration/login");
                })
                .catch(function (error) {
                  ErrorFunc(req, res,error);
                });
            }
          }, function (error) {
            ErrorFunc(req, res,error);
          })
        });
      })
      .catch(function (error) {
        res.redirect("/administration/login");
      });
  },
  logout(req, res) {
    ncmb.User.logout().then(function (user) {
      res.redirect("/administration/login");
    }).catch(function (error) {
      ErrorFunc(req, res,error);
    });
  },
  login_redirect(req, res) {
    var nocheck = [
      "/administration/login",
      "/administration/login/check"
    ];
    for (var i = 0; i < nocheck.length; i++) {
      if (req.url == nocheck[i]) {
        return false;
      }
    }
    var CurrentUser = ncmb.User.getCurrentUser();
    if (!CurrentUser) {
      res.redirect("/administration/login");
    }
  }
}
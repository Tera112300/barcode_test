/* expressモジュールをロードし、インスタンス化してappに代入。*/
const express = require("express");
const app = express();

const bodyParser = require('body-parser');

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



/* listen()メソッドを実行して3000番ポートで待ち受け。*/
const server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

/* 以後、アプリケーション固有の処理 */



// View EngineにEJSを指定。
app.set('view engine', 'ejs');



//ルーティング
const userController = require('./controllers/UserController');
const qrController = require('./controllers/QrController');




app.use(express.static('public'));
app.use(express.static('files'));

app.use((req, res, next) => {
    userController.login_redirect(req, res);
	next();
});

app.get("/administration/",qrController.index);

app.get("/administration/user/:objectId",qrController.detail);

app.get("/administration/login",userController.index);


app.get("/administration/logout",userController.logout);

app.post("/administration/login/check",userController.check);

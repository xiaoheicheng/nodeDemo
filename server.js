const express = require("express")
//引入express-session用于在express中操作session
let session = require('express-session');
//引入connect-mongo用于session持久化
const MongoStore = require('connect-mongo')(session);
const dbPromise = require("./db/连接mongodb")

const uiRouter = require("./routers/uiRouter")
const businessRouter = require("./routers/businessRouter")
const app = express()
app.use(session({
    name: 'haha',   //设置cookie的name，默认值是：connect.sid
    secret: 'atguigu', //参与加密的字符串（又称签名）
    saveUninitialized: false, //是否在存储内容之前创建会话
    resave: true ,//是否在每次请求时，强制重新保存session，即使他们没有变化
    store: new MongoStore({
      url: 'mongodb://localhost:27017/cookies_container',
      touchAfter: 1800//修改频率（例：//在24小时之内只更新一次）
    }),
    cookie: {
      httpOnly: true, // 开启后前端无法通过 JS 操作cookie
      maxAge: 1000*30 // 设置cookie的过期时间
    },
  }));
;(async() => {
    try {
        await dbPromise
        app.set("view engine", 'ejs')
        app.set("views", "./views")
        app.use(express.urlencoded({ extended: true }))
        app.use(express.static("./public"))
        app.use(uiRouter)
        app.use(businessRouter)
        app.listen(3000, (err) => {
            if (!err) {
                console.log("服务器启动成功，端口3000");
                console.log("访问  http://localhost:3000/register  注册");
                console.log("访问  http://localhost:3000/login  登录");
            } else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
})()
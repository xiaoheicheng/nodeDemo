let {Router} = require("express")
const { resolve } = require("path")
let cookieParser = require("cookie-parser")

const  userModel= require("../models/users")
let uiRouter = new Router()
uiRouter.use(cookieParser())
uiRouter.get("/register", (req, res)=>{
    // let url = resolve(__dirname, "./public/register.html")
    res.render("register", {errMsg:{}})
})
uiRouter.get("/login", (req, res)=>{
    // let url = resolve(__dirname, "./public/login.html")
    let {email} = req.query
    res.render("login", {errMsg:{email}})
})
uiRouter.get("/userCenter", async(req, res)=>{
    let _id = req.session._id
    if(_id){//有相应的cookie
        let findRes = await userModel.findOne({_id})
        if(findRes){//合法用户
            res.render("userCenter", {nickName:findRes.nickName})
        }else{//非法
            res.redirect("/login")
        }
    }else{
        res.redirect("/login")
    }
  
})
module.exports = uiRouter
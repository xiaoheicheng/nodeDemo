let { Router } = require("express")

const userModel = require("../models/users")

let businessRouter = new Router()

businessRouter.post("/register", async (req, res) => {
    let { email, nickName, password, repassword } = req.body
    let emailReg = /^[a-zA-Z0-9]{6,16}@[a-zA-Z0-9]{2,6}.com$/
    let nickNameReg = /[\u4e00-\u9fa5]/gm
    let passwordReg = /^[a-zA-Z0-9_@!#]{6,16}$/
    let errMsg = {}
    if (!emailReg.test(email)) {
        errMsg.emailErr = '邮箱不合法'
    }
    if (!nickNameReg.test(nickName)) {
        errMsg.nickErr = '昵称必须为中文'
    }
    if (!passwordReg.test(password)) {
        errMsg.pwdErr = '密码不合法'
    }
    if (password !== repassword) {
        errMsg.repwdErr = '两次密码不一致'
    }
    if (JSON.stringify(errMsg) === '{}') {//输入合法，尝试注册
        try {
            let findRes = await userModel.findOne({ email })
            if (findRes) {//数据库存在该用户，驳回
                errMsg.existUserErr = "该邮箱已被注册，请登录"
                res.render("register", { errMsg })
            } else {//准许注册，写入数据库
                let createRes = await userModel.create({ email, nickName, password })
                console.log("用户" + createRes.nickName + "注册成功");
                res.redirect(`/login?email=${email}`)
            }
        } catch (error) {
            errMsg.networkErr = "网络不稳定，请稍后重试"
            res.render("register", errMsg)
        }
    } else {
        res.render("register", { errMsg })
    }
})
businessRouter.post("/login", async (req, res) => {
    let { email, password } = req.body
    let emailReg = /^[a-zA-Z0-9]{6,16}@[a-zA-Z0-9]{2,6}.com$/
    let passwordReg = /^[a-zA-Z0-9_@!#]{6,16}$/
    let errMsg = {}
    if (!emailReg.test(email)) {
        errMsg.emailErr = "邮箱不合法"
    }
    if (!passwordReg.test(password)) {
        errMsg.pwdErr = '密码不合法'
    }
    if (JSON.stringify(errMsg) === '{}') {//合法
        try {
            let findRes = await userModel.findOne({ email, password })
            console.log("findRes", findRes);
            if (findRes) {
                console.log(11);
                req.session._id = findRes._id
                console.log(22);
                res.redirect("/userCenter")
                console.log(33);
            } else {
                console.log(44);
                errMsg.err = '邮箱或密码错误或未注册'
                console.log(55);
                res.render("login", errMsg)
                console.log(66);
            }
        } catch (error) {
            console.log(error);
            errMsg.networkErr = "网络不稳定，请稍后重试"
            res.render("login", {errMsg})
        }
    } else {
        res.render("login", {errMsg})
    }
})
module.exports = businessRouter
const express = require('express');
const router = express.Router();
const UserModel = require('../models/UserMdodel');
const md5 = require('md5');



router.get('/reg',(req,res)=>{
    res.render('reg');
});


// 注册
router.post('/reg',(req,res)=>{
    UserModel.create({
        ...req.body,
        username:req.body.account,
        password : md5(req.body.password)
    }).then((data,err)=>{
        if (err) {
            return res.send({
                code: 400,
                msg: '注册失败',
            })
        }
        res.send({
            code: 200,
            msg: '注册成功',
        })
    
    })
});

// 登录
router.get('/login',(req,res)=>{
    res.render('login');
});

// 登录
router.post('/login',(req,res)=>{
    let {account,password}=req.body
    UserModel.findOne({
        username: account,
        password : md5(password)
    }).then((data)=>{
        if (!data) {
            return res.send({
                code: 400,
                msg: '账号或密码错误',
            });
        }
        
        req.session.account = data.account;
        req.session._id = data._id;
        res.send({
            code: 200,
            msg: '登录成功',
            session: data._id
        });
    }).catch(err => {
        console.error('Login error:', err);
        res.send({
            code: 500,
            msg: '服务器错误，请稍后重试',
        });
    });
});

module.exports=router;
var express = require("express");
var router = express.Router();

const low = require("lowdb");
const shortid = require("shortid");
const moment = require("moment");
const AccountModel = require("../models/AccountModel");

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync(__dirname + "/../data/db.json");

const db = low(adapter);
// 检测登录
let checkloginMiddle = (req, res, next) => {
  if (!req.headers.token) {
    // return res.redirect("/login");
    return res.send({
      code: 404,
      msg: "请登录！",
    });
  }
  next();
};

// router.get("/", (req, res) => {
//   res.redirect("/account");
// });

// 读取
router.get("/account", checkloginMiddle, (req, res, next) => {
  AccountModel.find()
    .sort({ time1: -1 })
    .exec()
    .then((data, err) => {
      if (err) {
        return res.send({
          code: 500,
          msg: "读取失败",
        });
      }
      // res.render('list',{accounts:data,moment});
      res.send({
        code: 200,
        msg: "读取成功",
        enity: data,
      });
    });
});

// router.get("/account/create", (req, res) => {
//   res.render("create");
// });

// 新增
router.post("/account", checkloginMiddle, (req, res) => {
  AccountModel.create({
    ...req.body,
    time: moment(req.body.time).toDate(),
  }).then((data, err) => {
    if (err) {
      return res.send({
        code: 500,
        msg: "添加失败",
      });
    }
    // res.render("success", { msg: "添加成功", url: "/account" });
    res.send({
      code: 200,
      msg: "添加成功",
    });
  });
});

//获取单条账单信息
router.post("/account/editlist", async (req, res) => {
  try {
    const accountId = req.body.id;
    const account = await AccountModel.findById(accountId).exec(); // 这里使用了 await关键字
    if (!account) {
      return res.send({
        code: 500,
        msg: "账单未找到",
      });
    }

    // 渲染编辑页面并将账单信息传递给视图
    // res.render("editlist", { id: accountId });
    res.send({
      code: 200,
      msg: "账单读取成功",
      enity: account,
    });
  } catch (err) {
    // 错误处理
    return res.send({
      code: 500,
      msg: "账单未找到",
    });
  }
});

// 修改记录
router.post("/account/editdata", checkloginMiddle, async (req, res) => {
  try {
    const updateTime = moment(req.body.time).toDate();
    const id = req.body.id;
    // 使用updateOne并直接等待结果
    const updateResult = await AccountModel.updateOne(
      { _id: id },
      {
        ...req.body,
        time: updateTime,
      }
    );

    if (updateResult.nModified === 0) {
      throw new Error("记录未找到");
    }

    // 更新成功后，直接重定向或渲染成功页面，无需再次查找该文档
    // res.render("success", { msg: "更新成功", url: "/account" });
    res.send({
      code: 200,
      msg: "更新成功",
    });
  } catch (err) {
    console.error(err); // 记录错误日志
    if (err.message === "记录未找到") {
      // res.status(404).send("记录未找到");
      res.send({
        code: 404,
        msg: "记录未找到",
      });
    } else {
      // res.status(500).send("更新失败");
      res.send({
        code: 500,
        msg: "更新失败",
      });
    }
  }
});

// 删除记录
router.post("/account/deletelist", checkloginMiddle, (req, res) => {
  let id = req.body.id;
  AccountModel.deleteOne({ _id: id }).then((data, err) => {
    if (err) {
      // res.status(500).send("删除失败");
      return res.send({
        code: 500,
        msg: "删除失败",
      });
      
    }
    // res.render("success", { msg: "删除成功", url: "/account" });
    res.send({
      code: 200,
      msg: "删除成功",
    });
  });
});

module.exports = router;

# Tallybook记账本系统技术方案文档
 如果此项目对你有帮助请给我一个Star，感谢！
 如有问题请联系 wx : Chasin7gdreams  (支持各种软件、网页定制、大学生作业 + 毕业设计)
## 1. 摘要与关键词

### 摘要

Tallybook记账本系统是一个基于uni-app跨平台框架和Node.js后端技术栈开发的个人财务管理应用。系统采用前后端分离架构，前端使用Vue
3 + uni-app实现多端适配，后端基于Express.js + MongoDB提供RESTful
API服务。系统具备用户注册登录、账单记录管理（增删改查）、收支分类统计等核心功能，支持移动端、小程序等多平台部署，为用户提供便捷的个人财务管理解决方案。

### 关键词

记账本系统、uni-app、Vue
3、Node.js、Express.js、MongoDB、前后端分离、跨平台开发、个人财务管理

------------------------------------------------------------------------

## 2. 绪论

### 2.1 项目背景

随着移动互联网的普及和人们理财意识的增强，个人财务管理需求日益增长。传统的纸质记账方式已无法满足现代人的快节奏生活需求，开发一款便捷、高效的数字化记账应用具有重要意义。

### 2.2 项目目标

- 构建跨平台个人记账应用，支持移动端、小程序等多平台
- 提供直观的用户界面和流畅的用户体验
- 实现账单数据的增删改查和统计分析功能
- 确保数据安全性和系统稳定性

### 2.3 技术选型依据

- **前端框架**：uni-app + Vue 3，支持一次开发多端部署
- **后端框架**：Express.js，轻量级、高性能的Node.js Web框架
- **数据库**：MongoDB，文档型数据库，适合存储灵活的账单数据结构
- **认证机制**：基于Session的用户认证，确保数据安全

------------------------------------------------------------------------

## 3. 技术基础

### 3.1 前端技术栈

- **uni-app**：跨平台应用开发框架，支持Vue语法
- **Vue 3**：渐进式JavaScript框架，采用Composition API
- **uni-ui组件库**：提供丰富的UI组件
- **SCSS**：CSS预处理器，提升样式开发效率

### 3.2 后端技术栈

- **Node.js**：JavaScript运行时环境
- **Express.js**：Web应用框架
- **MongoDB**：NoSQL文档数据库
- **Mongoose**：MongoDB对象建模工具
- **express-session**：会话管理中间件
- **connect-mongo**：MongoDB会话存储

### 3.3 开发工具与环境

- **开发工具**：HBuilderX、VS Code
- **版本控制**：Git
- **包管理**：npm
- **数据库工具**：MongoDB Compass

------------------------------------------------------------------------

## 4. 需求分析

### 4.1 功能性需求

#### 4.1.1 用户管理模块

- **用户注册**：支持用户名和密码注册
- **用户登录**：基于账号密码的身份验证
- **用户退出**：安全退出系统，清除会话信息

#### 4.1.2 账单管理模块

- **添加账单**：记录收支信息，包括标题、金额、类型、时间、备注
- **查看账单**：列表展示所有账单记录，支持按时间排序
- **编辑账单**：修改已存在的账单信息
- **删除账单**：删除不需要的账单记录

#### 4.1.3 数据统计模块

- **收支分类**：区分收入和支出类型
- **账单统计**：显示账单总数和金额统计

### 4.2 非功能性需求

#### 4.2.1 性能需求

- **响应时间**：页面加载时间 \< 2秒，API响应时间 \< 500ms
- **并发量**：支持100个并发用户同时访问
- **数据处理**：支持单用户10000+条账单记录

#### 4.2.2 安全需求

- **数据加密**：用户密码采用MD5加密存储
- **会话管理**：基于Session的用户认证机制
- **输入验证**：前后端双重数据验证

#### 4.2.3 可用性需求

- **跨平台兼容**：支持iOS、Android、微信小程序等平台
- **界面友好**：现代化UI设计，操作简单直观
- **数据持久化**：数据安全存储，支持离线查看

------------------------------------------------------------------------

## 5. 系统设计

### 5.1 总体架构设计

    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
    │   前端应用层     │    │   后端服务层     │    │   数据存储层     │
    │                 │    │                 │    │                 │
    │  uni-app + Vue  │◄──►│  Express.js     │◄──►│   MongoDB       │
    │                 │    │                 │    │                 │
    │  - 用户界面      │    │  - RESTful API  │    │  - 用户数据      │
    │  - 业务逻辑      │    │  - 业务处理      │    │  - 账单数据      │
    │  - 数据展示      │    │  - 数据验证      │    │  - 会话数据      │
    └─────────────────┘    └─────────────────┘    └─────────────────┘

### 5.2 功能模块设计

#### 5.2.1 前端模块结构

    app/
    ├── pages/                 # 页面模块
    │   ├── index/            # 首页（账单列表）
    │   ├── login/            # 登录页面
    │   ├── register/         # 注册页面
    │   ├── create/           # 添加账单页面
    │   └── edit/             # 编辑账单页面
    ├── api/                  # API接口模块
    ├── util/                 # 工具模块
    ├── static/               # 静态资源
    └── uni_modules/          # uni-app组件库

#### 5.2.2 后端模块结构

    serve/
    ├── routes/               # 路由模块
    │   ├── index.js         # 账单相关路由
    │   └── user.js          # 用户相关路由
    ├── models/              # 数据模型
    │   ├── AccountModel.js  # 账单模型
    │   └── UserModel.js     # 用户模型
    ├── config/              # 配置文件
    ├── data/                # 数据文件
    └── views/               # 视图模板

### 5.3 数据库设计

#### 5.3.1 用户表（userdatas）

    {
      _id: ObjectId,          // 用户ID
      username: String,       // 用户名
      password: String        // 密码（MD5加密）
    }

#### 5.3.2 账单表（accountdatas）

    {
      _id: ObjectId,          // 账单ID
      title: String,          // 账单标题
      time: Date,             // 账单时间
      type: Number,           // 类型（1:收入, -1:支出）
      account: Number,        // 金额
      remarks: String         // 备注
    }

#### 5.3.3 ER图

    用户 (User)
    ├── _id (PK)
    ├── username
    └── password

    账单 (Account)
    ├── _id (PK)
    ├── title
    ├── time
    ├── type
    ├── account
    └── remarks

------------------------------------------------------------------------

## 6. 系统开发

### 6.1 各功能模块的代码实现

#### 6.1.1 用户认证模块

**前端登录实现（pages/login/index.vue）**

    // 登录逻辑
    const login = async () => {
      try {
        const res = await loginAPI({
          account: formData.username,
          password: formData.password
        });
        
        if (res.code === '200') {
          uni.setStorageSync('token', res.session);
          uni.navigateTo({ url: '/pages/index' });
        } else {
          uni.showToast({ title: res.msg, icon: 'error' });
        }
      } catch (error) {
        console.error('登录失败:', error);
      }
    };

**后端登录接口（routes/user.js）**

    router.post('/login', (req, res) => {
      const { account, password } = req.body;
      
      UserModel.findOne({
        username: account,
        password: md5(password)
      }).then((data) => {
        if (!data) {
          return res.send({
            code: 400,
            msg: '账号或密码错误'
          });
        }
        
        req.session.account = data.account;
        req.session._id = data._id;
        res.send({
          code: 200,
          msg: '登录成功',
          session: data._id
        });
      });
    });

#### 6.1.2 账单管理模块

**前端账单列表实现（pages/index.vue）**

    // 获取账单列表
    const getdatalist = async () => {
      try {
        const res = await listAPI();
        if (res.code === '200') {
          listdata.value = res.enity;
        } else {
          uni.showToast({ title: res.msg, icon: 'error' });
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    // 删除账单
    const delbook = async (id) => {
      try {
        const res = await dellistAPI({ id });
        if (res.code === '200') {
          uni.showToast({ title: '删除成功', icon: 'success' });
          getdatalist(); // 刷新列表
        } else {
          uni.showToast({ title: res.msg, icon: 'error' });
        }
      } catch (error) {
        console.error('删除失败:', error);
      }
    };

**后端账单CRUD接口（routes/index.js）**

    // 获取账单列表
    router.get("/account", checkloginMiddle, (req, res) => {
      AccountModel.find()
        .sort({ time: -1 })
        .exec()
        .then((data, err) => {
          if (err) {
            return res.send({ code: 500, msg: "读取失败" });
          }
          res.send({
            code: 200,
            msg: "读取成功",
            enity: data
          });
        });
    });

    // 添加账单
    router.post("/account", checkloginMiddle, (req, res) => {
      AccountModel.create({
        ...req.body,
        time: moment(req.body.time).toDate()
      }).then((data, err) => {
        if (err) {
          return res.send({ code: 500, msg: "添加失败" });
        }
        res.send({ code: 200, msg: "添加成功" });
      });
    });

#### 6.1.3 数据模型设计

**账单模型（models/AccountModel.js）**

    const mongoose = require('mongoose');

    let AccountSchema = new mongoose.Schema({
      title: {
        type: String,
        required: true
      },
      time: Date,
      type: {
        type: Number,
        default: -1  // -1:支出, 1:收入
      },
      account: {
        type: Number,
        required: true
      },
      remarks: {
        type: String 
      }
    });

    let AccountModel = mongoose.model('accountdatas', AccountSchema);
    module.exports = AccountModel;

### 6.2 第三方服务集成

#### 6.2.1 数据库连接配置

    // config/config.js
    module.exports = {
      DBHOST: '127.0.0.1',
      DBPORT: 27017,
      DBNAME: 'Account'
    };

    // app.js - MongoDB连接
    const mongoose = require('mongoose');
    const { DBHOST, DBPORT, DBNAME } = require('./config/config');

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

#### 6.2.2 会话管理集成

    // app.js - Session配置
    const session = require('express-session');
    const MongoStore = require('connect-mongo');

    app.use(session({
      name: 'sid',
      secret: 'keyboardCat',
      saveUninitialized: false,
      resave: true,
      store: MongoStore.create({
        mongoUrl: `mongodb://${DBHOST}:${DBPORT}/${DBNAME}`
      }),
      cookie: { 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7  // 7天
      }
    }));

#### 6.2.3 HTTP请求封装

    // util/request.js
    const http = (url, data, loading = true, method = 'GET') => {
      return new Promise((resolve, reject) => {
        uni.request({
          url: baseURL + url,
          data: data,
          method: method,
          header: {
            'Content-Type': 'application/json',
            'token': uni.getStorageSync('token') || ''
          },
          success: (res) => {
            resolve(res.data);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    };

------------------------------------------------------------------------

## 7. 系统测试

### 7.1 功能测试

#### 7.1.1 用户管理测试

- **注册功能测试**：验证用户注册流程，包括数据验证、密码加密
- **登录功能测试**：验证用户登录认证机制
- **会话管理测试**：验证用户会话的创建、维护和销毁

#### 7.1.2 账单管理测试

- **添加账单测试**：验证账单数据的添加功能
- **查询账单测试**：验证账单列表的获取和排序
- **编辑账单测试**：验证账单数据的修改功能
- **删除账单测试**：验证账单数据的删除功能

### 7.2 性能测试

#### 7.2.1 响应时间测试

- 页面加载时间测试
- API接口响应时间测试
- 数据库查询性能测试

#### 7.2.2 并发测试

- 多用户同时访问测试
- 数据库并发操作测试
- 会话管理并发测试

### 7.3 安全测试

#### 7.3.1 认证安全测试

- 未授权访问测试
- 会话劫持测试
- 密码安全测试

#### 7.3.2 数据安全测试

- SQL注入防护测试
- XSS攻击防护测试
- 数据验证测试

------------------------------------------------------------------------

## 8. 部署与运维

### 8.1 环境配置

#### 8.1.1 开发环境

    # 前端环境
    npm install -g @vue/cli
    npm install -g @dcloudio/uvm

    # 后端环境
    npm install
    npm install -g nodemon

    # 数据库环境
    # 安装并启动MongoDB服务

#### 8.1.2 生产环境

    # 服务器环境要求
    - Node.js >= 14.0.0
    - MongoDB >= 4.0.0
    - PM2 (进程管理)
    - Nginx (反向代理)

### 8.2 部署流程

#### 8.2.1 前端部署

    # 1. 构建生产版本
    npm run build:h5
    npm run build:mp-weixin

    # 2. 部署到服务器
    # H5版本部署到Web服务器
    # 小程序版本上传到微信开发者平台

#### 8.2.2 后端部署

    # 1. 安装依赖
    npm install --production

    # 2. 配置环境变量
    export NODE_ENV=production
    export DBHOST=your-mongodb-host
    export DBPORT=27017
    export DBNAME=Account

    # 3. 启动服务
    pm2 start app.js --name tallybook-api

### 8.3 监控与维护

#### 8.3.1 系统监控

- 服务器资源监控（CPU、内存、磁盘）
- 应用性能监控（响应时间、错误率）
- 数据库性能监控

#### 8.3.2 日志管理

- 应用日志记录
- 错误日志收集
- 访问日志分析

#### 8.3.3 备份策略

- 数据库定期备份
- 代码版本管理
- 配置文件备份

------------------------------------------------------------------------

## 9. 附录

### 9.1 项目依赖清单

#### 9.1.1 前端依赖

    {
      "dependencies": {
        "vue": "^3.0.0",
        "uni-app": "^3.0.0",
        "@dcloudio/uni-app": "^3.0.0"
      }
    }

#### 9.1.2 后端依赖

    {
      "dependencies": {
        "express": "^4.16.1",
        "mongoose": "^8.2.2",
        "express-session": "^1.18.0",
        "connect-mongo": "^5.1.0",
        "md5": "^2.3.0",
        "moment": "^2.30.1",
        "lowdb": "^1.0.0",
        "shortid": "^2.2.16"
      }
    }

### 9.2 API接口文档

#### 9.2.1 用户相关接口

- `POST /reg` - 用户注册
- `POST /login` - 用户登录

#### 9.2.2 账单相关接口

- `GET /account` - 获取账单列表
- `POST /account` - 添加账单
- `POST /account/editlist` - 获取单条账单
- `POST /account/editdata` - 修改账单
- `POST /account/deletelist` - 删除账单

### 9.3 数据库索引设计

    // 账单表索引
    db.accountdatas.createIndex({ "time": -1 });  // 时间倒序索引
    db.accountdatas.createIndex({ "type": 1 });   // 类型索引

    // 用户表索引
    db.userdatas.createIndex({ "username": 1 }, { unique: true });  // 用户名唯一索引

### 9.4 错误码说明

- `200` - 操作成功
- `400` - 请求参数错误
- `404` - 资源未找到
- `500` - 服务器内部错误

------------------------------------------------------------------------

## 总结

Tallybook记账本系统采用现代化的技术栈和架构设计，实现了跨平台的个人财务管理功能。系统具备良好的可扩展性、安全性和用户体验，能够满足用户日常记账需求。通过前后端分离的架构设计，系统具有良好的维护性和扩展性，为后续功能升级和性能优化提供了良好的基础。

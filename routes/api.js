var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('OK')
});

router.get('/user', async (req, res, next) => {
    var userModel = require('../model/user')
    const model = await userModel.find().populate('role')
    res.send(model)
});

router.get('/user/:id', async (req, res, next) => {
    var userModel = require('../model/user')
    const model = await userModel.findById(req.params.id).populate('role')
    res.send(model)
});

router.put('/user/:id', async (req, res, next) => {
    var userModel = require('../model/user')
    const model = await userModel.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

router.delete('/user/:id', async (req, res, next) => {
    var userModel = require('../model/user')
    const model = await userModel.findByIdAndDelete(req.params.id)
    res.send(model)
});

router.post('/user/create', async (req, res, next) => {
    var userModel = require('../model/user')
    const model = await userModel.create(req.body)
    res.send(model)
});

router.post('/user/login', async (req, res, next) => {
    var userModel = require('../model/user')
    var roleModel = require('../model/role')
    const { UID, PWD } = req.body;
    const user = await userModel.findOne({ userName: UID }).populate('role')
    if (!user) {
        res.send({ code: 1, message: '用户不存在' })
    } else {
        if (PWD != user.passWord) {
            res.send({ code: 2, message: '密码错误' })
        } else {
            res.send({ code: 0, message: '校验成功', data: user })
        }
    }
});

//--------------

router.get('/role', async (req, res, next) => {
    var roleModel = require('../model/role')
    const model = await roleModel.find().limit(50)
    res.send(model)
});

router.get('/role/:id', async (req, res, next) => {
    var roleModel = require('../model/role')
    const model = await roleModel.findById(req.params.id)
    res.send(model)
});

router.put('/role/:id', async (req, res, next) => {
    var roleModel = require('../model/role')
    const model = await roleModel.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
})

router.delete('/role/:id', async (req, res, next) => {
    var roleModel = require('../model/role')
    const model = await roleModel.findByIdAndDelete(req.params.id)
    res.send(model)
});

router.post('/role/create', async (req, res, next) => {
    var roleModel = require('../model/role')
    const model = await roleModel.create(req.body)
    res.send(model)
});

module.exports = router;
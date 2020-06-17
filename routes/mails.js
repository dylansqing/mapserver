var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mail = require('nodemailer');

router.get('/mail', function (req, res, next) {
    res.render('mail');
})

router.get('/test', function (req, res, next) {
    console.log('固定格式发送任务！');
    sendMail();
    res.render('mail');
})

router.post('/sendMessage', function (req, res, next) {
    console.log('接受发送邮件任务！');

    var emailaddress = req.body.emailaddress;
    var firstname = req.body.firstname;
    var messages = req.body.messages;
    var lastname = req.body.lastname;

    var sendHtml = `<div>
    <div>${firstname}</div>
    <div>${lastname}</div>
    <div>${emailaddress}</div>
    <div>${messages}</div>
    </div>`

    var mailOptions2 = {
        from: '"Express-demo" <549633079@qq.com>', // 发送方
        to: 'shuang.qing@wellintech.com', //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎来到"Express-demo"', // 标题
        text: '设备需要保养！',
        html: sendHtml
    };

    //发送函数
    transporter.sendMail(mailOptions2, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    res.status(200).json({
        message: req.body.firstname
    });
})

module.exports = router;


var transporter = mail.createTransport({
    service: 'qq',
    port: 465,
    secure: true,
    auth: {
        user: '549633079@qq.com',
        pass: 'huaugmaskhocbbgj',
    }
});

function sendMail(mail, code, call) {

    var mailOptions1 = {
        from: '"Express-demo" <549633079@qq.com>', // 发送方
        to: 'shuang.qing@wellintech.com', //接收者邮箱，多个邮箱用逗号间隔
        subject: '欢迎来到"Express-demo"', // 标题
        text: '设备需要保养！', // 文本内容
        html: '<p>检修提醒测试，XX设备需要保养，请在2020年3月1日前完成保养！</p>'
        //html: '<p>这里是"Express-demo"详情请点击:</p><a href="https://www.jianshu.com/u/5cdc0352bf01">点击跳转</a>', //页面内容
    };

    //发送函数
    transporter.sendMail(mailOptions1, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.message);
    });
}
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('OK')
});

router.post('/sendMessage', function (req, res, next) {
    let smsBody = JSON.parse(JSON.stringify(req.body))
    console.log(KK)
    res.send(KK)
});

module.exports = router;

// sendCode(Option)
//-------------------------------------------------------------------------------------------------------------------------
//发送填充数据示例{报警}
var setOptionAlarm = {
    "phoneNum": "13072890590",
    "TemplateCode": 'SMS_143700872',
    "TemplateParam": `{device: '进水泵',item: '电流'}`
}
//发送填充数据示例{维保}
var setOptionMaintain = {
    "name": '王工',
    "phoneNum": "13072890590",
    "TemplateCode": 'SMS_187930988',
    "TemplateParam": `{device: '鼓风机',maintainTime: '2020-05-08',remarks:'备注'}`
}
//-------------------------------------------------------------------------------------------------------------------------
const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = '' // '=>LTAIBbEYy05fK8Zb'
const secretAccessKey = '' // '=>rQ7HpvyFhpnDZKlBN4djQj90EjukZt'

const smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
})

function sendCode(options) {
    smsClient.sendSMS({
        PhoneNumbers: options.phoneNum,
        SignName: '淏园环保', //按照严格意义来说，此处的签名和模板的ID都是可变的
        TemplateCode: options.TemplateCode,
        TemplateParam: options.TemplateParam
    }).then(function (res) {
        console.log('-------------------------------------')
        console.log(res)
        console.log('-------------------------------------')
        let {
            Code
        } = res
        if (Code === 'OK') {
            //处理返回参数
            let smsInfo = {
                Name: options.name,
                RequestId: res.RequestId,
                RequestTime: (new Date()).toLocaleString(),
                PhoneNum: options.phoneNum,
                Param: options.TemplateParam,
                Status: 'success'
            }
            SMSRecord(smsInfo)
        }
    }, function (err) {
        console.log('-------------------------------------')
        if (err.data.Code == 'isv.AMOUNT_NOT_ENOUGH') {
            console.log('账户余额不足，发送短信失败')
            console.log(err.data.RequestId)
        } else if (err.data.Code == 'isv.TEMPLATE_PARAMS_ILLEGAL') {
            console.log('变量不符合规范！')
            console.log(err.data.RequestId)
        } else {
            console.log('发生错误如下：')
            console.log(err.data)
        }
        let smsInfo = {
            Name: options.name,
            RequestId: err.RequestId,
            RequestTime: (new Date()).toLocaleString(),
            PhoneNum: options.phoneNum,
            Param: err.Message,
            Status: 'unsuccess'
        }
        SMSRecord(smsInfo)
        console.log('-------------------------------------')
    })
}
//-------------------------------------------------------------------------------------------------------------------------
const mysql = require('mysql');

const connectInfo = {
    host: '39.99.213.143',
    user: 'root',
    password: 'root',
    database: 'kpdata',
    multipleStatements: true
}

function SMSRecord(options) {
    console.log(options)
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('记录短信信息')
    });
    let sqlStr = `INSERT INTO smsrecords (createtime,name,phonenumber,status,requestId,param) VALUES('${options.RequestTime}','${options.Name}','${options.PhoneNum}','${options.Status}','${options.RequestId}',"${options.Param}")`
    connection.query(sqlStr, function (error, results, fields) {
        if (error) {
            //错误处理
            console.log(error);
        } else {
            //执行记录返回
            console.log(results)
        }
    })
    connection.end();
}
//-------------------------------------------------------------------------------------------------------------------------

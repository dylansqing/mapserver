var express = require('express');
var router = express.Router();
const querystring = require("querystring");
const request = require('request')
const https = require('https')
const fs = require('fs')
const mysql = require('mysql');

var connectInfo = {
    host: '39.99.213.143',
    user: 'root',
    password: 'root',
    database: 'kpdata',
    multipleStatements: true
}

//http://localhost:8888/video/list?id=02
router.get('/list', function (req, res, next) {
    res.header("Content-Type", 'text/html;charset=utf8')
    var myobj = querystring.parse(req.url.split("?")[1]);
    if (myobj) {
        res.render('videoPhone' + myobj.id);
    } else {
        res.write("未找到相应的视频文件");
    }
});

//http://localhost:8888/video/replay
router.get('/replay', function (req, res, next) {
    res.header("Content-Type", 'text/html;charset=utf8')
    res.render('videoReplay')
});

//http://localhost:8888/video/PClist?id=01
router.get('/PClist', function (req, res, next) {
    res.header("Content-Type", 'text/html;charset=utf8')
    var myobj = querystring.parse(req.url.split("?")[1]);
    if (myobj) {
        res.render('videoPC' + myobj.id);
    } else {
        res.write("未找到相应的视频文件");
    }
});

// http: //localhost:8888/video/getVideoInfo?addrId=10&equId=02
router.get('/getVideoInfo', function (req, res, next) {
    var myobj = querystring.parse(req.url.split("?")[1]);
    if (myobj) {
        const connection = mysql.createConnection(connectInfo)
        connection.connect(() => {
            console.log('查找视频信息')
        });
        connection.query(`SELECT name,code,cameraUrl FROM cameraInfo WHERE addrCode = ${myobj.addrId} AND equCode = ${myobj.equId}`, function (error, results, fields) {
            if (error) {
                res.send(error);
            } else {
                console.log(results)
                res.send(results);
            }
        })
        connection.end();
    } else {
        res.write("未找到相应的视频信息");
    }
});


//获取参数摄像头的token，至少7天需要更新一下，存放token于数据库appToken
router.get('/updataToken', function (req, res, next) {
    let connection0 = mysql.createConnection(connectInfo)
    connection0.connect(() => {
        console.log('查询Token更新时间')
    })
    let sqlString0 = `SELECT expireTime FROM appToken`
    connection0.query(sqlString0, (error0, results0, fields0) => {
        if (error0) {
            console.log('错误')
            res.send('未查询到原始过期时间')
        } else {
            const time = new Date().getTime()
            if (results0[0].expireTime <= time) {
                console.log('开始更新Token！')
                var url = 'https://open.ys7.com/api/lapp/token/get'
                request.post({
                    url: url,
                    form: {
                        appKey: 'a3d0ff335ef440e296e1a7d075065910',
                        appSecret: '23335a355cfcc2e31363df6cad4ee461'
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let tokenInfo = JSON.parse(response.body).data.accessToken
                        let expireInfo = JSON.parse(response.body).data.expireTime
                        let connection1 = mysql.createConnection(connectInfo)
                        connection1.connect(() => {
                            console.log('开始存储新Token')
                        })
                        let sqlString = `UPDATE appToken SET accessToken = '${tokenInfo}',expireTime = '${expireInfo}' WHERE appKey = 'a3d0ff335ef440e296e1a7d075065910'`
                        connection1.query(sqlString, (error, results, fields) => {
                            if (error) {
                                console.error(error.message)
                            } else {
                                console.log(JSON.parse(response.body).data)
                                res.json('更新Token成功！')
                            }
                        })
                        connection1.end()
                    }
                })
            } else {
                console.log('检测不需要被更新')
                res.send('当前Token还未过期！')
            }
        }
    })
    connection0.end()
})

//获取accessToken
router.get('/getToken', function (req, res, next) {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('开始获取Token')
    })
    let sqlString = `SELECT accessToken FROM apptoken`
    connection.query(sqlString, (error, results, fields) => {
        if (error) {
            console.log(error.message)
            res.send('获取失败')
        } else {
            res.send(results)
        }
    })
    connection.end()
})

//http://127.0.0.1:8888/video/getCameraName
router.get('/getCameraName', function (req, res, next) {
    const connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('开始查询设备及ID')
    })
    let sqlString = `SELECT name,code FROM camerainfo`
    connection.query(sqlString, (error, results, fields) => {
        if (error) {
            console.error(error.message)
        } else {
            res.send(results)
        }
    })
    connection.end()
});

//http://127.0.0.1:8888/video/getIDbyCameraName?name=%E5%90%AF%E8%92%99%E6%B1%A1%E6%B0%B4%E5%8E%82
router.get('/getIDbyCameraName', function (req, res, next) {
    var myobj = querystring.parse(req.url.split("?")[1]);
    if (myobj) {
        const connection = mysql.createConnection(connectInfo)
        connection.connect(() => {
            console.log('开始查询设备及ID')
        })
        let sqlString = `SELECT ID1,ID2 FROM camerainfo WHERE name = '${myobj.name}'`
        connection.query(sqlString, (error, results, fields) => {
            if (error) {
                console.error(error.message)
            } else {
                res.send(results)
            }
        })
        connection.end()
    } else {
        res.send('null')
    }
});

//http://127.0.0.1:8888/video/getIDbyCode?code=E10_02
router.get('/getIDbyCode', function (req, res, next) {
    var myobj = querystring.parse(req.url.split("?")[1]);
    if (myobj) {
        const connection = mysql.createConnection(connectInfo)
        connection.connect(() => {
            console.log('开始查询设备及ID')
        })
        let sqlString = `SELECT ID1,ID2 FROM camerainfo WHERE code = '${myobj.code}'`
        connection.query(sqlString, (error, results, fields) => {
            if (error) {
                console.error(error.message)
            } else {
                res.send(results)
            }
        })
        connection.end()
    } else {
        res.send('null')
    }
});


//----------------------------------------------------------------------------------------------------------
//持久化任务栏，完成定时检查appToken是否过期，过期就马上更新
setInterval(() => {
    changeTokenInDatabase()
}, 60000);
//----------------------------------------------------------------------------------------------------------
//任务
function changeTokenInDatabase() {
    let connection0 = mysql.createConnection(connectInfo)
    connection0.connect(() => {
        console.log('查询Token更新时间')
    })
    let sqlString0 = `SELECT expireTime FROM appToken`
    connection0.query(sqlString0, (error0, results0, fields0) => {
        if (error0) {
            console.log('错误,未找到过期时间')
            connection0.end()
        } else {
            const time = new Date().getTime()
            if (results0[0].expireTime <= time) {
                console.log('开始更新Token！')
                var url = 'https://open.ys7.com/api/lapp/token/get'
                request.post({
                    url: url,
                    form: {
                        appKey: 'a3d0ff335ef440e296e1a7d075065910',
                        appSecret: '23335a355cfcc2e31363df6cad4ee461'
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let tokenInfo = JSON.parse(response.body).data.accessToken
                        let expireInfo = JSON.parse(response.body).data.expireTime
                        let connection1 = mysql.createConnection(connectInfo)
                        connection1.connect(() => {
                            console.log('开始存储新Token')
                        })
                        let sqlString = `UPDATE appToken SET accessToken = '${tokenInfo}',expireTime = '${expireInfo}' WHERE appKey = 'a3d0ff335ef440e296e1a7d075065910'`
                        connection1.query(sqlString, (error, results, fields) => {
                            if (error) {
                                console.error(error.message)
                            } else {
                                console.log(JSON.parse(response.body).data)
                                console.log('更新Token成功！')
                            }
                        })
                        connection1.end()
                    }
                })
            } else {
                console.log('检测不需要被更新')
            }
        }
    })
    connection0.end(() => {
        console.log('断开连接')
    })
}

module.exports = router;
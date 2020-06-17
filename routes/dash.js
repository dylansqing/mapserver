/*
 * @Author: dylan.qingshuang
 * @Date: 2020-06-02 12:43:23 
 * @Last Modified by: dylan.qingshuang
 * @Last Modified time: 2020-06-08 08:50:08
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connectInfo = {
    host: '39.99.213.143',
    user: 'root',
    password: 'root',
    database: 'kpdata',
    multipleStatements: true
}

/*测试连接*/
router.get('/table', function (req, res, next) {
    res.render('index')
});

router.get('/getAlarmDataToList', function (req, res, next) {
    const connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('报警轮播图数据。。。')
    });

    let queryString = `SELECT TagName,AlarmValue,AlarmTime FROM alarm WHERE AlarmTime ORDER BY AlarmTime DESC LIMIT 50`

    connection.query(queryString, function (error, results, fields) {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end(() => {
        console.log('断开数据库。。。')
    })
})

/**
 * @name: getAlarmCategory
 * @router: 
 * @msg: 获取报警数据
 * @param {type} 
 * @return: 
 */
router.get('/getAlarmCategory', function (req, res) {
    const connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('报警轮播图数据。。。')
    });

    let queryString = `SELECT TagName,GroupName,AlarmValue,AlarmTime FROM alarm WHERE AlarmTime ORDER BY AlarmTime DESC LIMIT 50`

    connection.query(queryString, function (error, results, fields) {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})

/**
 * 获取实时出水数据
 * 数据库：realtimewateroutput
 *  */
router.get('/getRealTimeWaterFlow', (req, res) => {
    const connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('实时出水数据。。。')
    });
    let queryString = `SELECT dt,data FROM realtimewateroutput LIMIT 1`
    connection.query(queryString, function (error, results, fields) {
        if (error) {
            res.send(error)
        } else {
            res.send(results[0])
        }
    })
    connection.end()
})

/**
 * 获取各水厂的累计出水数据
 * 数据库：realtimewaterproduction
 */
router.get('/getRealTimeWaterProduction', (req, res) => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('累计出水数据。。。')
    });
    let queryString = `SELECT dt,mengqi,pinglve,maoping,pingqiu,xinhua,datong,zhongling,tongluo,changling FROM realtimewaterproduction ORDER BY dt DESC LIMIT 100`
    connection.query(queryString, function (error, results, fields) {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})

/**
 * @name: getHistoryWaterCumulative
 * @router: dash
 * @msg: 获取总累计出水数据
 * @param {type} 
 * @return: 
 */
router.get('/getHistoryWaterCumulative', (req, res) => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('总累计出水数据。。。')
    })
    let queryString = `SELECT qimeng,pinglve,maoping,pingqiu,xinhua,datong,zhongling,tongluo,changling FROM cumulativewatervalue`
    connection.query(queryString, (error, results, fields) => {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})

router.get('/getMarkerCounts', (req, res) => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('站点总数数据。。。')
    })
    let queryString = `SELECT fatherMarker AS addr,COUNT(*) AS total,markers.longitude,markers.latitude FROM labellistdata LEFT JOIN markers ON labellistdata.fatherMarker = markers.address GROUP BY fatherMarker`
    connection.query(queryString, (error, results, fields) => {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})

router.get('/getDeviceStatusCounts', (req, res) => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('设备状态数据。。。')
    })
    let queryString = `SELECT status,COUNT(*) AS counts FROM labellistdata GROUP BY status`
    connection.query(queryString, (error, results, fields) => {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})

router.get('/getAlarmDeviceCategory', (req, res) => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('获取报警设备统计。。。')
    })
    let queryString = `SELECT ExtendField3 AS name,COUNT(ExtendField3) AS total FROM alarm GROUP BY ExtendField3`
    connection.query(queryString, (error, results, fields) => {
        if (error) {
            res.send(error)
        } else {
            res.send(results)
        }
    })
    connection.end()
})


/**
 * 定时任务
 * 情况累计瞬时数据库3天前的数据
 */
setInterval(() => {
    let connection = mysql.createConnection(connectInfo)
    connection.connect(() => {
        console.log('开始清空累计数据。。。')
    })
    let queryString = `DELETE FROM realtimewaterproduction WHERE dt < DATE_SUB(CURDATE(),INTERVAL 3 DAY)`
    connection.query(queryString, (error, results, fields) => {
        if (error) {
            connection.end(() => {
                console.log('清空失败-断开连接')
            })
        } else {
            console.log('清空完成')
        }
    })
    connection.end(() => {
        console.log('清空完成-断开连接')
    })
}, 1000 * 60 * 60 * 24)


module.exports = router;
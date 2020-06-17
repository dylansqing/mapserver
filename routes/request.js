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

/* GET Request page. */
/**
 * /markers       请求获取基础数据表的点位信息     驾驶舱用     markers
 * /info          获取标注点数据                  驾驶舱用     markers
 * /label         获取标注点聚合物数据            GIS          markers
 * /labeldata     获取单个标注点信息              GIS         labellistdata
 * /fatherMarker  获取父级标注点信息              GIS         labellistdata
 * /getMarkerByName  ---
 * */
router.get('/markers', function (req, res, next) {
  //  开启数据库
  const connection = mysql.createConnection(connectInfo)
  connection.connect(() => {
    console.log('获取标注点')
  });
  connection.query('SELECT address,longitude,latitude,name,infoCode,fatherMarker,company,processingCapacity,contacts,contactNumber,status FROM labellistdata', function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      console.log(results)
      res.send(results);
    }
  })
  connection.query('UPDATE markers AS A SET count = (SELECT count(*) FROM labellistdata WHERE fatherMarker = A.address)', function (error, results, fields) {
    if (error) {
      console.log(error);
    } else {
      console.log('更新了数据库')
      console.table(results)
    }
  })
  connection.end();
});

router.get('/info', function (req, res, next) {
  const connection = mysql.createConnection(connectInfo)
  connection.connect(() => {
    console.log('获取信息')
  });
  connection.query('SELECT address,variable,value FROM info', function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })

  connection.end();
})

router.get('/label', function (req, res, next) {
  const connection = mysql.createConnection(connectInfo)
  connection.connect(() => {
    console.log('获取标注')
  });
  connection.query('SELECT address,code,longitude,latitude,count FROM markers', function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })

  connection.end();
})

router.get('/labeldata', function (req, res, next) {
  const connection = mysql.createConnection(connectInfo)
  connection.connect(() => {
    console.log('获取标注')
  });
  connection.query('SELECT fatherMarker,name,code,longitude,latitude,flowAll,flowOut,status,address,company,processingCapacity,contacts,contactNumber,windPressure,membranePressure FROM labelListData', function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
  connection.end();
})

router.get('/fatherMarkers', function (req, res, next) {
  const connection = mysql.createConnection(connectInfo);
  connection.connect(() => {
    console.log('地图初始化！加载省份数据...')
  });
  connection.query('SELECT DISTINCT(fatherMarker) FROM labelListData', function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
  connection.end();
})

router.get('/getAreaByName', function (req, res, next) {
  console.log(req.query);
  const connection = mysql.createConnection(connectInfo);
  connection.connect(() => {
    console.log('地图初始化！加载区域数据...')
  });
  connection.query("SELECT DISTINCT(area) FROM labelListData WHERE fatherMarker = '" + req.query.addr + "'", function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
  connection.end();
})

router.get('/getMarkerByArea', function (req, res, next) {
  console.log(req.query);
  const connection = mysql.createConnection(connectInfo);
  connection.connect(() => {
    console.log('地图初始化！加载站点数据...')
  });
  connection.query("SELECT name,longitude,latitude FROM labelListData WHERE area = '" + req.query.area + "'", function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  })
  connection.end();
})

router.get('/getDeviceStatusCount', function (req, res, next) {
  const connection = mysql.createConnection(connectInfo);
  connection.connect(() => {
    console.log('获取设备状态中...')
  });
  //SELECT COUNT(status = '0' OR NULL) AS offLine,COUNT(status = '1' OR NULL) AS onLine ,COUNT(status) AS counts FROM labellistdata
  connection.query(`SELECT name,status,address,infoCode FROM labellistdata`, function (error, results, fields) {
    if (error) {
      res.send(error)
    } else {
      res.send(results);
    }
  })
  connection.end();
})

router.get('/alarmsByThatTime', function (req, res) {
  var device = '';
  req.query.device.split(',').forEach(item => {
    device += `'${item}',`
  })
  device = device.slice(0, -1)
  console.log(device)
  const connection = mysql.createConnection(connectInfo);
  connection.connect(() => {
    console.log('获取报警信息中...')
  });
  var sqlStr = `SELECT TagName,GroupName,AlarmValue,AlarmTime FROM alarm WHERE GroupName in (${device}) ORDER BY AlarmTime DESC LIMIT 50`;
  console.log(sqlStr);
  connection.query(sqlStr, function (error, results, fields) {
    console.table(results);
    if (error) {
      res.send(error)
    } else {
      res.send(results)
    }
  })
  connection.end();
})

module.exports = router;
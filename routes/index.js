var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('map');
});

router.get('/mapview', function (req, res, next) {
  res.render('mapview');
});

router.get('/portMail', function (req, res, next) {
  res.send('mapview');
});

router.get('/CR', function (req, res, next) {
  res.render('loading');
});

//------------------------
// router.get('/PClist', function (req, res, next) {
//   var myobj = querystring.parse(req.url.split("?")[1]);
//   console.log('000000000000000000000000000000')
//   console.log(myobj)
//   console.log('000000000000000000000000000000')
//   if (myobj) {
//     res.render('videoPC' + myobj.id);
//   } else {
//     res.write("未找到相应的视频文件");
//   }
// });

// router.get('/replay', function (req, res, next) {
//   res.render('videoReplay')
// });


router.get('/user/edit', function (req, res, next) {
  res.render('userEdit')
});

router.get('/user/list', function (req, res, next) {
  res.render('userLists')
});

router.get('/role/edit', function (req, res, next) {
  res.render('roleEdit')
});

router.get('/role/list', function (req, res, next) {
  res.render('roleLists')
});

module.exports = router;
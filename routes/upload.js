var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');

const upload_dir = path.resolve("E:/map/mapServer/public", "", "upload");

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
/*测试连接*/
router.post('/', function (req, res, next) {
    new multiparty.Form().parse(req, function (err, fields, file) {
        if (err) {
            res.send({
                code: 1,
                codeText: err
            })
            return;
        }
        const [chunk] = file.chunk;
        const [filename] = fields.filename;
        const chunk_dir = `${upload_dir}/${filename}`;

        let readStream = fs.createReadStream(chunk.path);
        let writeStream = fs.createWriteStream(chunk_dir);

        readStream.pipe(writeStream);
        readStream.on('end', function () {
            fs.unlinkSync(chunk.path);
        })

        res.send({
            code: 0,
            codeText: '成功',
            path: `http://${getIPAddress()}:8888/public/upload/${filename}`
            //path: `upload/?src=${filename}`
        })
    })
});

router.get('/', function (req, res, next) {
    console.log(req.query.src)

    res.send({
        src: `http://${getIPAddress()}:8888/${req.query.src}`
    })
});

module.exports = router;
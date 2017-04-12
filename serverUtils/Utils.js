var fs = require('fs');

var XLSX = require("xlsx");

var images = require("images");

var action = require('../mySql/mysql_db');

var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var xiTongID = req.session.user.XiTongID;
        if(req.url == '/postFormKeJian' || req.url=='/upDataKeJian'){
            var kjPhoto = 'public/upload/kjImage/' + xiTongID;
            fs.exists(kjPhoto, function (exists) {
                if (exists) {
                    cb(null, kjPhoto)
                } else {
                    fs.mkdir(kjPhoto, function (err) {
                        if (err)return;
                        cb(null, kjPhoto);
                    })
                }
            });
            return
        }
        if(req.url == '/photo'){
            var userPhoto = 'public/upload/userImage/' + xiTongID;
            fs.exists(userPhoto, function (exists) {
                if (exists) {
                    cb(null,'public/upload/tempPhoto')
                } else {
                    fs.mkdir(userPhoto, function (err) {
                        if (err)return;
                        cb(null,'public/upload/tempPhoto')
                    })
                }
            });
            return
        }
        if(req.url == '/daoRuKeJian' ||req.url == '/daoRuZhangJie'){
            var filePath = 'public/upload/file/' + xiTongID;
            fs.exists(filePath, function (exists) {
                if (exists) {
                    cb(null, filePath)
                } else {
                    fs.mkdir(filePath, function (err) {
                        if (err)return;
                        cb(null, filePath);
                    })
                }
            });
            return
        }
    },
    filename: function (req, file, cb) {
        var suffix = /\.[^\.]+$/.exec(file.originalname);
        if(req.url == '/postFormKeJian' || req.url=='/upDataKeJian'){
            var kjDaiMa = req.body.kjdm;
            cb(null, kjDaiMa + suffix);
            return
        }
        if(req.url == '/photo'){
             cb(null, new Date().getTime() + '-' +file.originalname);
            return
        }
        if(req.url == '/daoRuKeJian' ||req.url == '/daoRuZhangJie'){
            cb(null, new Date().getTime() + '-' + file.originalname);
            return
        }

    }
});

var upload = multer({storage: storage});

function GuoLv(req) {
    var opation = req.body;
    var xiTongID = req.session.user.XiTongID;
    var file = '';
    if (req.file) {
        file = '/upload/kjImage/' + xiTongID + '\/' + req.file.filename
    }
    var obj = {
        KeChengDaiMa: opation.kjdm,
        KeChengMing: opation.kjmc,
        PaiXu: opation.px,
        KeChengTuPianLuJing: file,
        KeChengJianJie: opation.kjjj,
        ZongShiChang: opation.kjsc,
        ZhuJiangJiaoShi: opation.zjjs,
        KeChengLuJing: opation.kjlj,
        IsShunXuXueXi: opation.sxxx,
        IsYunXuTuoDong: opation.yxtd,
        IsZiDongBoFang: opation.zdbf,
        IsZiDongJiaZaiXiaYiZhang: opation.zdjzxyz
    };
    return obj
}

function Guolv2(req) {
    var opation = {
        KeChengDaiMa: req.body.kjm,
        FuZhangJieDaiMa: req.body.fzjdm,
        ZhangJieDaiMa: req.body.zjdm,
        ZhangJieMing: req.body.zjmc,
        ZhangJieXuHao: req.body.zjxh,
        KeJianShiChang: req.body.kjsc,
        KeJianDiZhi: req.body.kjdz
    };
    return opation
}

function Guolv3(req) {
    var suffix = /\.[^\.]+$/.exec(req.body.path);
    var xiTongID = req.session.user.XiTongID;
    var file = req.body.is=='true'?'/upload/userImage/'+xiTongID+'/'+req.body.yhm+suffix:req.body.path;
    var opation = {
        YongHuMing: req.body.yhm,
        YongHuLeiXingID: req.body.yhlxid,
        XingMing: req.body.xm,
        MiMa: req.body.mm,
        YongHuTouXiang:file
    };
    return opation
}

function imageCj(req) {
    var suffix = /\.[^\.]+$/.exec(req.body.path);
    var x = parseInt(req.body.x),
        y = parseInt(req.body.y),
        w = parseInt(req.body.w),
        h = parseInt(req.body.h),
        is = req.body.is,
        XiTongID = req.session.user.XiTongID;
    if (is != 'true') return;
    var cjImage = 'public/upload/userImage/'+XiTongID+'/'+req.body.yhm+suffix;;
    var targetImage = 'public/upload/tempPhoto/'+req.body.path;
    images(images(targetImage).size(w, h), x, y, 120, 120)
        .save(cjImage, {               //Save the image to a file,whih quality 50
            quality: 1000                   //保存图片到文件,图片质量为50
        });
}

function readXlsx(filePath) {
    var workbook = XLSX.readFile(filePath);
// 获取 Excel 中所有表名
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
    const worksheet = workbook.Sheets[sheetNames[0]];
//生成json格式文件
    return XLSX.utils.sheet_to_json(worksheet);
}

function testKjKong(data) {
    var tempObj = {
        '课件代码': '',
        '课件名称': '',
        '课件总时长': '',
        '主讲教师': '',
        '课件域名': '',
        '是否顺序学习': '否',
        '是否允许拖动播放': '否',
        '是否自动播放': '否',
        '是否自动加载下一章': '否',
        '课件简介': ''
    },
        tempDea = [],
        daoRuAry = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i];
        var flag = true;
        for (var a in tempObj) {
            if (!value[a]) {
                if (a == '课件代码'||a == '课件名称'||a == '课件总时长'||a == '主讲教师') {
                    if(flag){
                        value.ShiBaiYuanYin = '必填项目为空';
                        tempDea.push(value);
                        flag = false
                    }
                }
                value[a] = tempObj[a]
            }
        }
        if (flag) {
            daoRuAry.push(value)
        }
    }
    return obj = {
        tempDea: tempDea,
        daoRuAry: daoRuAry
    }
}

function testZjKong(data) {
    var tempObj = {
        '父章节代码': '',
        '章节代码': '',
        '章节名称': '',
        '章节序号': '',
        '课件时长': '',
        '课件地址': ''
    },
        tempDea = [],
        daoRuAry = [];
    for (var i = 0; i < data.length; i++) {
        var value = data[i];
        var flag = true;
        for (var a in tempObj) {
            if (!value[a]) {
                if (a == '课件代码'||a == '章节代码'||a == '章节名称'||a == '章节序号'||a == '课件时长') {
                    if(flag){
                        value.ShiBaiYuanYin = '必填项目为空';
                        tempDea.push(value);
                        flag = false
                    }
                }
                value[a] = tempObj[a]
            }
        }
        if (flag) {
            daoRuAry.push(value)
        }
    }
    return obj = {
        tempDea: tempDea,
        daoRuAry: daoRuAry
    }
}


module.exports = {
    GuoLv: GuoLv,
    Guolv2: Guolv2,
    Guolv3: Guolv3,
    imageCj: imageCj,
    upload: upload,
    readXlsx: readXlsx,
    testKjKong:testKjKong,
    testZjKong:testZjKong
};
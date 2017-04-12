var express = require('express');

var app = express();

var path = require('path');

// var ccap = require('ccap');
//
// var captcha = ccap({
//     width:120,//set width,default is 256
//     height:40,//set height,default is 60
//     offset:40,//set text spacing,default is 40
//     quality:100,//set pic quality,default is 50
//     fontsize:35//set font size,default is 57
// });
var captchapng = require('captchapng');

var cookieParser = require('cookie-parser');

var session = require('express-session');

var bodyParser = require('body-parser');

var checkLogin = require('./checkLogin');

var {GuoLv, Guolv2, Guolv3, imageCj, upload, readXlsx, testKjKong,testZjKong} =  require('./serverUtils/Utils');

var action = require('./mySql/mysql_db');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'jhzyxbfq',
    rolling: true,
    cookie: {maxAge: 1000 * 60 * 20}
}));

//登录
app.get('/', function (req, res) {
    res.sendFile('./template/login.html', {root: __dirname})
});

app.post('/login', function (req, res) {
    var user = req.body;
    if (req.session.captcha != user.yzm.toLocaleUpperCase()) {
        res.send({
            ZhiXingZhuangTai: -1,
            ZhiXingJieGuo: "验证码错误"
        });
        return
    }
    action.login('KJ_e_YongHu', {YongHuMing: user.yhm}, function (err, recordset) {
        var loginData = {
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            YongHuID: '',
            YongHuTouXiang: '',
            XiTongID: '',
            YongHuMing: '',
            XingMing: '',
        };
        if (err) {
            loginData.ZhiXingZhuangTai = -1;
            loginData.ZhiXingJieGuo = err;
            res.send(loginData);
            return
        }
        if (recordset.length >= 1) {
            if (parseInt(recordset[0].MiMa) == parseInt(req.body.mm)) {
                req.session.user = recordset[0];
                loginData.YongHuID = recordset[0].YongHuID;
                loginData.YongHuTouXiang = recordset[0].YongHuTouXiang;
                loginData.XiTongID = recordset[0].XiTongID;
                loginData.YongHuMing = recordset[0].YongHuMing;
                loginData.XingMing = recordset[0].XingMing;
                loginData.YongHuLeiXingID = recordset[0].YongHuLeiXingID;
            } else {
                loginData.ZhiXingZhuangTai = -1;
                loginData.ZhiXingJieGuo = '密码错误';
            }
        } else {
            loginData.ZhiXingZhuangTai = -1;
            loginData.ZhiXingJieGuo = '用户名不存在';
        }
        res.send(loginData)

    });
});

//验证码
app.get('/captcha/:id', function (req, res) {
    var code = parseInt(Math.random()*900000+100000);
    req.session.captcha = code;
    var p = new captchapng(150,40, code);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
});

//首页路由
app.get('/index', function (req, res) {
    res.sendFile('./template/dizi.html', {root: __dirname})
});


app.get('/indexYmDaoHang', checkLogin, function (req, res) {
    var obj = {
        ZhiXingZhuangTai: 1,
        ZhiXingJieGuo: '',
        ShuJu:[]
    };
    var ShuJu ={};
    var YongHuLeiXingID = req.session.user.YongHuLeiXingID,
        XiTongID = req.session.user.XiTongID;
    action.menu(YongHuLeiXingID,XiTongID,function (err,recordset,YeMian) {
        res.set('Content-Type', 'text/html');
        if(err){
            obj.ZhiXingZhuangTai = -1;
            obj.ZhiXingJieGuo = err;
            res.send(obj);
            return
        }
        var YeMianLan = recordset,YeMian = YeMian;
        YeMianLan.forEach(function (val) {
            val.ShuJu = [];
            var LanMuID = val.LanMuID;
            YeMian.forEach(function (value) {
                if(value.LanMuID == LanMuID){
                    val.ShuJu.push(value)
                }
            })
        });
        obj.ShuJu = YeMianLan;
        res.send(obj)
    })
});


//首页统计图路由
app.get('/tongjitu.html', function (req, res) {
    res.sendFile('./template/tongjitu.html', {root: __dirname})
});

app.get('/json/tongji.json', function (req, res) {
    res.sendFile('/json/tongji.json', {root: __dirname})
});


//-------------------------------课件路由

//添加课件页面
app.get('/kejiantianjia', function (req, res) {
    res.sendFile('./template/tianjiakejian.html', {root: __dirname})
});

//添加课件操作
app.post('/postFormKeJian', checkLogin, upload.single('kjtp'), function (req, res) {
    var kejian = GuoLv(req);
    kejian.XiTongID = req.session.user.XiTongID;
    action.saveDate('KJ_e_KeCheng', kejian, function (err, recordset) {
        res.set('Content-Type', 'text/html');
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '添加成功',
        })
    })
});

//查询课件页面
app.get('/kejianchaxun', function (req, res) {
    res.sendFile('./template/chaxunkejian.html', {root: __dirname})
});

//查询操作
app.post('/searchKeJian', checkLogin, function (req, res) {
    var offset = req.body.dqym,
        limit = req.body.myts,
        params = {
            KeChengDaiMa: req.body.kjdm,
            KeChengMing: req.body.kjmc,
            ZhuJiangJiaoShi: req.body.zjjs
        };

    for (var p in params) {
        if (!params[p]) {
            delete params[p]
        }
    }

    params = JSON.stringify(params) == '{}' ? '' : params;

    action.searchKeJian('KJ_e_KeCheng', params, req.session.user.XiTongID, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        var obj = {
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            JiLuShu: recordset.length,
            ShuJu: recordset.slice(limit * (offset - 1), offset * limit)
        };
        res.send(obj)
    });
});

//获取某一课件
app.get('/oneKeJian', checkLogin, function (req, res) {
    var params = {KeChengDaiMa: req.query.kjdm};
    action.searchOne('KJ_e_KeCheng', params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询出错',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//修改课件
app.post('/upDataKeJian', checkLogin, upload.single('kjtp'), function (req, res) {
    var params = GuoLv(req);
    var id = 'KeChengDaiMa = \'' + params.KeChengDaiMa + '\'';
    delete params.KeChengDaiMa;
    action.upDate('KJ_e_KeCheng', params, id, function (err, recordset) {
        res.set('Content-Type', 'text/html');
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '修改错误',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '修改成功',
        })
    })
});

//删除课件
app.get('/deleteKeJian', checkLogin, function (req, res) {
    var id = 'KeChengDaiMa = \'' + req.query.kjdm + '\' and XiTongID = ' + req.session.user.XiTongID;
    action.deleteDate('KJ_e_KeCheng', 'KJ_h_KeCheng', id, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '删除成功',
        })
    });
});

//获取系统密钥
app.get('/XiTong', checkLogin, function (req, res) {
    action.searchOne('KJ_e_XiTong', {XiTongID: req.session.user.XiTongID}, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            MiYao: recordset[0].MiYao
        })
    })
});


//------------------------章节路由

//进入章节添加章节页面
app.get('/addZhangJie', function (req, res) {
    res.sendFile('./template/tianjiazhangjie.html', {root: __dirname})
});

//获取课件名（代码）下拉列表
app.get('/kjList', checkLogin, function (req, res) {
    var target = 'KeChengDaiMa,KeChengMing,KeChengID';
    var params = {
        XiTongID: req.session.user.XiTongID
    };
    action.ListDate('KJ_e_KeCheng', target, params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            })
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//获取父章节名（代码）下拉列表
app.get('/zjList', checkLogin, function (req, res) {
    var target = 'ZhangJieDaiMa,ZhangJieMing';
    var params = {
        KeChengDaiMa: req.query.kjdm,
        XiTongID: req.session.user.XiTongID,
        KeJianDiZhi: ''
    };
    action.ListDate('KJ_e_KeChengZhangJie', target, params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            })
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//添加章节表单
app.post('/addZhangJie', checkLogin, function (req, res) {
    var zhangJieData = Guolv2(req);
    zhangJieData.XiTongID = req.session.user.XiTongID;
    action.saveDate('KJ_e_KeChengZhangJie', zhangJieData, function (err, recordset) {
        res.set('Content-Type', 'text/html');
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '添加成功',
        })
    })
});

//章节查询页面
app.get('/searchZhangJie', function (req, res) {
    res.sendFile('./template/chaxunzhangjie.html', {root: __dirname})
});

//查询章节列表
app.post('/searchZhangJie', checkLogin, function (req, res) {
    var offset = req.body.dqym,
        limit = req.body.myts,
        params = {
            'KeChengZhangJie.KeChengDaiMa': req.body.kjdm,
            'KeCheng.KeChengMing': req.body.kjmc,
            'KeChengZhangJie.ZhangJieMing': req.body.zjmc,
            'KeChengZhangJie.ZhangJieDaiMa': req.body.zjdm
        };
    for (var p in params) {
        if (!params[p]) {
            delete params[p]
        }
    }
    params = JSON.stringify(params) == '{}' ? '' : params;

    action.searchZhangJie(params, req.session.user.XiTongID, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询失败',
            });
            return;
        }
        var obj = {
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '查询成功',
            JiLuShu: recordset.length,
            ShuJu: recordset.slice(limit * (offset - 1), offset * limit)
        };
        res.send(obj)
    })
});

//删除章节
app.get('/deleteZhangJie', checkLogin, function (req, res) {
    var id = 'ZhangJieID in (' + req.query.zjid + ') and XiTongID = ' + req.session.user.XiTongID;
    action.deleteDate('KJ_e_KeChengZhangJie', 'KJ_h_KeChengZhangJie', id, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '删除成功',
        })
    })
});

//查找某一章节
app.get('/oneZhangJie', checkLogin, function (req, res) {
    var params = {
        ZhangJieID: req.query.zjid
    };
    action.searchOne('KJ_e_KeChengZhangJie', params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询出错',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//修改章节
app.post('/updateZhangJie', checkLogin, function (req, res) {
    var id = 'ZhangJieID =' + req.query.zjid;
    var params = Guolv2(req);
    action.upDate('KJ_e_KeChengZhangJie', params, id, function (err, recordset) {
        res.set('Content-Type', 'text/html');
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '修改成功',
        })
    })
});

//---------------------------------导入

//导入课件
app.get('/daoRuKeJian', checkLogin, function (req, res) {
    res.sendFile('./template/daorukejian.html', {root: __dirname})
});

app.post('/daoRuKeJian', checkLogin, upload.single('drwj'), function (req, res) {
    var XiTongID = req.session.user.XiTongID,
        xlsxData = readXlsx('./public/upload/file/' + XiTongID + '/' + req.file.filename),
        kongEnd = testKjKong(xlsxData),
        tempDea = kongEnd.tempDea,
        daoRuAry = kongEnd.daoRuAry,
        mark = '课件代码',
        target = 'KeChengDaiMa',
        NoAllDaoRu = req.body.isAllDR;
   res.set('Content-Type', 'text/html');;   
    if(daoRuAry.length<=0){
        res.send({
            ZhiXingZhuangTai: -1,
            ZhiXingJieGuo:'导入失败',
            ShuJu: tempDea
        });
        return
    }
    action.searchRepeat(daoRuAry, mark, 'KJ_e_KeCheng', target, XiTongID, NoAllDaoRu,'',function (err, recordset) {
        if (err)return;
        var aryRepeat = [], endDaoRuData = [];
        if (recordset.length > 0) {
            for(var i =0; i<daoRuAry.length;i++){
                var temp = daoRuAry[i],flag = true;
                for(var j =0 ;j<recordset.length;j++){
                    var temp2 = recordset[j];
                    if (temp[mark] == temp2[target]) {
                        temp.ShiBaiYuanYin = '课件代码已存在';
                        aryRepeat.push(temp);
                        flag =false
                    }
                }
                if(flag){
                    endDaoRuData.push(temp);
                    flag = false
                }
            }
        } else {
            endDaoRuData = daoRuAry
        }
        var endFailure = tempDea.concat(aryRepeat);
        if (endFailure.length>0&&NoAllDaoRu == 'yes') {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo:'导入失败',
                ShuJu: endFailure
            });
            return
        }
        action.DaoRu('KJ_e_KeCheng', endDaoRuData, XiTongID,'',function (err, recordset) {
            if (err) {
                res.send({
                    ZhiXingZhuangTai: -1,
                    ZhiXingJieGuo: err,
                });
                return
            }
            if(endFailure){
                res.send({
                    ZhiXingZhuangTai: 1,
                    ZhiXingJieGuo: '部分导入成功',
                    ShuJu:endFailure
                });
                return
            }
            res.send({
                ZhiXingZhuangTai: 1,
                ZhiXingJieGuo: '导入成功',
                ShuJu:[]
            })
        });
    });
});

//导入章节
app.get('/daoRuZhangJie', function (req, res) {
    res.sendFile('./template/daoruzhangjie.html', {root: __dirname})
});

app.post('/daoRuZhangJie', checkLogin, upload.single('drwj'), function (req, res) {
    var XiTongID = req.session.user.XiTongID,
        xlsxData = readXlsx('./public/upload/file/' + XiTongID + '/' + req.file.filename),
        kongEnd = testZjKong(xlsxData),
        tempDea = kongEnd.tempDea,
        daoRuAry = kongEnd.daoRuAry,
        mark = '章节代码',
        target = 'ZhangJieDaiMa',
        NoAllDaoRu = req.body.isAllDR,
        KeChengDaiMa = req.body.kjm;
     res.set('Content-Type', 'application/json');   
    if(daoRuAry.length<=0){
        res.send({
            ZhiXingZhuangTai: -1,
            ZhiXingJieGuo:'导入失败',
            ShuJu: tempDea
        });
        return
    }
    action.searchRepeat(daoRuAry, mark, 'KJ_e_KeChengZhangJie', target, XiTongID, NoAllDaoRu,KeChengDaiMa,function (err, recordset) {
        if (err)return;
        var aryRepeat = [], endDaoRuData = [];
        if (recordset.length > 0) {
            for(var i =0; i<daoRuAry.length;i++){
                var temp = daoRuAry[i],flag = true;
                for(var j =0 ;j<recordset.length;j++){
                    var temp2 = recordset[j];
                    if (temp[mark] == temp2[target]) {
                        temp.ShiBaiYuanYin = '课件代码已存在';
                        aryRepeat.push(temp);
                        flag =false
                    }
                }
                if(flag){
                    endDaoRuData.push(temp);
                    flag = false
                }
            }
        } else {
            endDaoRuData = daoRuAry
        }
        var endFailure = tempDea.concat(aryRepeat);
         res.set('Content-Type', 'text/html');
        if (endFailure.length>0&&NoAllDaoRu == 'yes') {
            res.set('Content-Type', 'text/html');
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo:'导入失败',
                ShuJu: endFailure
            });
            return
        }
        action.DaoRu('KJ_e_KeChengZhangJie', endDaoRuData, XiTongID, KeChengDaiMa,function (err, recordset) {
            if (err) {
                res.send({
                    ZhiXingZhuangTai: -1,
                    ZhiXingJieGuo: err,
                });
                return
            }
            if(endFailure){
                res.send({
                    ZhiXingZhuangTai: 1,
                    ZhiXingJieGuo: '部分导入成功',
                    ShuJu:endFailure
                });
                return
            }
            res.send({
                ZhiXingZhuangTai: 1,
                ZhiXingJieGuo: '导入成功',
                ShuJu:[]
            })
        });
    });
});

//--------------------用户管理

//添加用界面
app.get('/addYongHu', function (req, res) {
    res.sendFile('./template/addUser.html', {root: __dirname})
});

//用户类型下拉列表
app.get('/userType', checkLogin, function (req, res) {
    var target = 'YongHuLeiXingID,YongHuLeiXing';
    var params = {
        XiTongID: req.session.user.XiTongID
    };
    action.ListDate('KJ_b_YongHuLeiXing', target, params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            })
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//添加用户
app.post('/addUser', checkLogin, function (req, res) {
    var params = Guolv3(req);
    imageCj(req);
    params.XiTongID = req.session.user.XiTongID;
    action.saveDate('KJ_e_YongHu', params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '添加成功',
        })
    })
});

//管理用户界面
app.get('/searchUser', function (req, res) {
    res.sendFile('./template/searchUser.html', {root: __dirname})
});

//查询用户
app.post('/searchUser', checkLogin, function (req, res) {
    var offset = req.body.dqym,
        limit = req.body.myts,
        params = {
            'YongHu.YongHuLeiXingID': req.body.yhlxid,
            'YongHu.YongHuMing': req.body.yhm,
            'YongHu.YongHuXingMing': req.body.xm,
        };
    for (var p in params) {
        if (!params[p]) {
            delete params[p]
        }
    }
    params = JSON.stringify(params) == '{}' ? '' : params;

    action.searchUser(params, req.session.user.XiTongID, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询失败',
            });
            return
        }
        var obj = {
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '查询成功',
            JiLuShu: recordset.length,
            ShuJu: recordset.slice(limit * (offset - 1), offset * limit)
        };
        res.send(obj)
    })
});

//oneUser
app.get('/oneUser', checkLogin, function (req, res) {
    var params = {
        YongHuID: req.query.yhid
    };
    action.searchOne('KJ_e_YongHu', params, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询出错',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});

//修改用户信息
app.post('/updateUser', checkLogin, function (req, res) {
    var id = ' YongHuID = ' + req.query.yhid;
    var params = Guolv3(req);
    imageCj(req);
    action.upDate('KJ_e_YongHu', params, id, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '修改错误',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '修改成功',
        })
    })
});

//删除用户信息
app.get('/deleteUser', checkLogin, function (req, res) {
    var id = 'YongHuID in (' + req.query.yhid + ') and XiTongID = ' + req.session.user.XiTongID;
    action.deleteDate('KJ_e_YongHu', 'KJ_h_YongHu', id, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: err,
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '删除成功',
        })
    })
});

//--------个人信息页面
app.get('/myself', function (req, res) {
    res.sendFile('./template/myself.html', {root: __dirname})
});

//--------课件访问情况
app.get('/kjView', function (req, res) {
    res.sendFile('./template/kjView.html', {root: __dirname})
});

app.post('/kjVew', checkLogin, function (req, res) {
    var view = req.body;
    action.kjView(view.tjts, view.kcdmlb, req.session.user.XiTongID, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询失败',
            });
            return
        }
        res.send({
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '',
            ShuJu: recordset
        })
    })
});


//裁剪图片上传文件
app.post('/photo', upload.single('myPhoto'), function (req, res) {
    var file = req.file;
    var xiTongID = req.session.user.XiTongID;
    res.set('Content-Type', 'text/html');
    if(file.size>(1024*1024*2) || !/image/ig.test(file.mimetype)){
        res.send({
             ZhiXingZhuangTai: -1,
             ZhiXingJieGuo: file.size>(1024*1024*2)?'图片过大，应小于2M':'图片格式错误，应为"jpg","jpeg","png","gif"',
             path:'',
        })
        return
    }
    res.send({
        ZhiXingZhuangTai: 1,
        ZhiXingJieGuo:'',
        path:file.filename
    })
});

//消息页面
app.get('/allMessage', function (req, res) {
    res.sendFile('./template/MessageList.html', {root: __dirname})
});

app.post('/MessageList',checkLogin, function (req, res) {
    var limit = req.body.myts,
        offset = req.body.dqym;
    action.searchMessage(req.session.user.XiTongID, function (err, recordset) {
        if (err) {
            res.send({
                ZhiXingZhuangTai: -1,
                ZhiXingJieGuo: '查询失败',
            });
            return
        }
        var obj = {
            ZhiXingZhuangTai: 1,
            ZhiXingJieGuo: '查询成功',
            JiLuShu: recordset.length,
            ShuJu: recordset.slice(limit * (offset - 1), offset * limit)
        };
        res.send(obj)
    })
});

//退出登录
app.get('/out', function (req, res) {
    req.session.user = null;
    res.sendFile('./template/login.html', {root: __dirname})
});

app.listen(3000, function () {
    console.log('端口3000，启动成功')
});
app.get('/sss',function(req,res){
     res.sendFile('./ajax.html', {root: __dirname})
})
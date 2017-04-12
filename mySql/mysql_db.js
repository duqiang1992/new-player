var mssql = require('mssql');

const config = {
    user: 'db_oms',
    password: 'oms2005',
    server: '192.168.100.6',
    database: 'React'
    // options: {
    //     encrypt: true // Use this if you're on Windows Azure
    // }
};

// var login1 = function (tableName, params,req,res) {
//     var sql = "select * from " + tableName + " ";
//
//     sql += ' where ';
//
//     sql += tryParams(params);
//
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//         var loginData = {
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'',
//             YongHuID:'',
//             YongHuTouXiang:''
//         };
//         if(result.length>=1){
//             if(parseInt(result[0].MiMa) == parseInt(req.body.mm)){
//                 req.session.user = result[0] ;
//                 loginData.YongHuID = result[0].YongHuID;
//                 loginData.YongHuTouXiang = result[0].YongHuTouXiang
//             }else{
//                 loginData.ZhiXingZhuangTai = -1;
//                 loginData.ZhiXingJieGuo = '密码错误';
//             }
//         }else{
//             loginData.ZhiXingZhuangTai = -1;
//             loginData.ZhiXingJieGuo = '用户名不存在';
//         }
//         res.send(loginData)
//     }).catch(err=>{
//         if(!err)return;
//         console.log('登录错误 : '+err);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'登录失败',
//             YongHuID:'',
//             YongHuTouXiang:''
//         })
//     })
// };

var login = function (tableName, params, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);

        var sql = "select * from " + tableName + " ";

        sql += ' where ';

        sql += tryParams(params);

        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var saveDate1 = function (tableName,opation, res) {
//     var sqlName = [];
//     var value = [];
//     for (var index in opation) {
//         if(opation[index]==''||opation[index]==undefined){
//             delete opation[index];
//             continue
//         }
//         sqlName.push(index);
//         if (typeof opation[index] == 'string') {
//             value.push('\'' + opation[index] + '\'')
//         } else {
//             value.push(opation[index])
//         }
//     }
//     var sql = 'insert into '+tableName+' (' + sqlName.join(',') + ') values (' + value.join(',') + ')';
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//         res.send({
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'添加成功',
//         })
//     }).catch(err => {
//         console.log('添加失败 ：'+err);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'添加失败',
//         })
//     });
//
// };

var saveDate = function (tableName, opation, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sqlName = [];
        var value = [];
        for (var index in opation) {
            if (opation[index] == '' || opation[index] == undefined) {
                delete opation[index];
                continue
            }
            sqlName.push(index);
            if (typeof opation[index] == 'string') {
                value.push('\'' + opation[index] + '\'')
            } else {
                value.push(opation[index])
            }
        }
        var sql = 'insert into ' + tableName + ' (' + sqlName.join(',') + ') values (' + value.join(',') + ')';

        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};


// var searchKeJian1 = function (fromTable,params,limit,offset,XiTongID,res) {
//     var sql = 'select * from '+fromTable+' where ZhuangTai=0 and XiTongID='+XiTongID;
//     if(params != ''){
//         sql +=' and '+tryParams(params);
//     }
//     sql +='ORDER BY PaiXu';
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//          var obj = {
//              ZhiXingZhuangTai:1,
//              ZhiXingJieGuo:'',
//              JiLuShu:result.length,
//              ShuJu:result.slice(limit*(offset-1),offset*limit)
//          };
//          res.send(obj)
//     }).catch(err => {
//         console.log('查询失败 ：'+err);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:err,
//         });
//     });
// };

var searchKeJian = function (fromTable, params, XiTongID, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'select * from ' + fromTable + ' where ZhuangTai=0 and XiTongID=' + XiTongID;
        if (params != '') {
            sql += ' and ' + tryParams(params);
        }
        sql += 'ORDER BY PaiXu';
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var searchOne1 = function (fromTable,params,res) {
//     var sql = 'select *from '+fromTable+' where ';
//     if(fromTable == 'KJ_e_YongHu'){
//         sql = 'select YongHuTouXiang,XingMing,YongHuMing,YongHuLeiXingID,ZuiHouDengLuShiJian from '+fromTable+' where ';
//     }
//     sql += tryParams(params);
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//         res.send({
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'',
//             ShuJu:result
//         })
//     }).catch(error =>{
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'查询出错',
//         });
//     })
// };

var searchOne = function (fromTable, params, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'select *from ' + fromTable + ' where ';
        if (fromTable == 'KJ_e_YongHu') {
            sql = 'select YongHuTouXiang,XingMing,YongHuMing,YongHuLeiXingID,ZuiHouDengLuShiJian from ' + fromTable + ' where ';
        }
        sql += tryParams(params);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute(params, function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var upDate1 = function (fromTable,params,id,res) {
//         var sql = 'update '+fromTable+ ' set ';
//         var ary = [];
//         for(var index in params){
//                 if(params[index]==''||params[index]==undefined){
//                     delete params[index];
//                 }else{
//                     if(typeof params[index] == 'string'){
//                         ary.push(index +'='+ '\''+params[index]+ '\'');
//                     }else{
//                         ary.push(index +'='+params[index])
//                     }
//                 }
//         }
//         sql +=ary.join(',');
//         sql +=' where '+id;
//         mssql.connect(config).then(pool =>{
//             return pool.request()
//                 .query(sql);
//         }).then(result =>{
//             res.send({
//                 ZhiXingZhuangTai:1,
//                 ZhiXingJieGuo:'修改成功',
//             })
//         }).catch(error=>{
//             console.log('修改错误 ：'+error);
//             res.send({
//                 ZhiXingZhuangTai:-1,
//                 ZhiXingJieGuo:'修改错误',
//             })
//         })
// };

var upDate = function (fromTable, params, id, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'update ' + fromTable + ' set ';
        var ary = [];
        for (var index in params) {
            if (params[index] == '' || params[index] == undefined) {
                delete params[index];
            } else {
                if (typeof params[index] == 'string') {
                    ary.push(index + '=' + '\'' + params[index] + '\'');
                } else {
                    ary.push(index + '=' + params[index])
                }
            }
        }
        sql += ary.join(',');
        sql += ' where ' + id;
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var deleteDate1 = function (fromTable,targetTable,id,res) {
//     var kj = '';
//     if(fromTable == 'KJ_e_KeCheng'){
//         kj  = 'KeChengDaiMa,KeChengMing,XiTongID,PaiXu,ZhuangTai,TianJiaShiJian,KeChengTuPianLuJing,KeChengJianJie,ZongShiChang,ZhuJiangJiaoShi,KeChengLuJing,KeChengID,IsShunXuXueXi,IsYunXuTuoDong,IsZiDongBoFang,IsZiDongJiaZaiXiaYiZhang';
//     }
//     if(fromTable == 'KJ_e_KeChengZhangJie'){
//         kj  = 'ZhangJieID,KeChengDaiMa,ZhangJieDaiMa,XiTongID,FuZhangJieDaiMa,ZhangJieMing,KeJianDiZhi,KeJianShiChang,PaiXu,ZhuangTai,TianJiaShiJian,ZhangJieXuHao'
//     }
//     if(fromTable == 'KJ_e_YongHu'){
//         kj  = 'YongHuID,YongHuMing,XiTongID,XingMing,MiMa,YongHuLeiXingID,ZuiHouDengLuShiJian,ShiBaiCiShu';
//     }
//     var  sql = 'INSERT INTO '+targetTable+'('+kj+')'
//              +' SELECT '+kj
//              +' FROM '+fromTable
//              +' WHERE '+id +';'
//              +' delete from '+fromTable
//              +' WHERE '+id +';';
//     mssql.connect(config).then(pool=>{
//         return pool.request()
//             .query(sql)
//     }).then(result=>{
//         res.send({
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'删除成功',
//         })
//     }).catch(error =>{
//         console.log('删除失败:'+error);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'修改错误',
//         })
//     })
// };

var deleteDate = function (fromTable, targetTable, id, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var kj = '';
        if (fromTable == 'KJ_e_KeCheng') {
            kj = 'KeChengDaiMa,KeChengMing,XiTongID,PaiXu,ZhuangTai,TianJiaShiJian,KeChengTuPianLuJing,KeChengJianJie,ZongShiChang,ZhuJiangJiaoShi,KeChengLuJing,KeChengID,IsShunXuXueXi,IsYunXuTuoDong,IsZiDongBoFang,IsZiDongJiaZaiXiaYiZhang';
        }
        if (fromTable == 'KJ_e_KeChengZhangJie') {
            kj = 'ZhangJieID,KeChengDaiMa,ZhangJieDaiMa,XiTongID,FuZhangJieDaiMa,ZhangJieMing,KeJianDiZhi,KeJianShiChang,PaiXu,ZhuangTai,TianJiaShiJian,ZhangJieXuHao'
        }
        if (fromTable == 'KJ_e_YongHu') {
            kj = 'YongHuID,YongHuMing,XiTongID,XingMing,MiMa,YongHuLeiXingID,ZuiHouDengLuShiJian,ShiBaiCiShu';
        }
        var sql = 'INSERT INTO ' + targetTable + '(' + kj + ')'
            + ' SELECT ' + kj
            + ' FROM ' + fromTable
            + ' WHERE ' + id + ';'
            + ' delete from ' + fromTable
            + ' WHERE ' + id + ';';
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var ListDate1 = function (fromTable,target,params,res) {
//     var sql ='select '+target+' from '+fromTable;
//     if(params !=''){
//         sql +=' where '+tryParams(params)
//     }
//     mssql.connect(config).then(pool =>{
//         return pool.request()
//             .query(sql)
//     }).then(result =>{
//             res.send({
//                 ZhiXingZhuangTai:1,
//                 ZhiXingJieGuo:'',
//                 ShuJu:result
//             })
//     }).catch(error =>{
//             console.log('获取列表失败：'+error);
//             res.send({
//                 ZhiXingZhuangTai:-1,
//                 ZhiXingJieGuo:'获取列表失败',
//             })
//     })
// };

var ListDate = function (fromTable, target, params, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'select ' + target + ' from ' + fromTable;
        if (params != '') {
            sql += ' where ' + tryParams(params)
        }
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var searchZhangJie1 = function (params,limit,offset,XiTongID,res) {
//     var sql = 'SELECT FuZhangJie.ZhangJieMing AS FuZhangJieMing, KeChengZhangJie.*,KeCheng.KeChengMing'
//              +' FROM KJ_e_KeChengZhangJie AS KeChengZhangJie'
//              +' LEFT JOIN KJ_e_KeChengZhangJie AS FuZhangJie'
//              +' ON KeChengZhangJie.KeChengDaiMa=FuZhangJie.KeChengDaiMa'
//              +' AND KeChengZhangJie.FuZhangJieDaiMa=FuZhangJie.ZhangJieDaiMa'
//              +' AND FuZhangJie.KeJianDiZhi=\'\''
//              +' LEFT join KJ_e_KeCheng AS KeCheng'
//              +' ON KeCheng.KeChengDaiMa = KeChengZhangJie.KeChengDaiMa'
//              +' WHERE KeChengZhangJie.ZhuangTai = 0 and KeChengZhangJie.XiTongID = '+XiTongID;
//     if(params!=''){
//         sql +=' and ' +tryParams(params)
//     }
//     sql +='ORDER BY PaiXu';
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//         var obj = {
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'查询成功',
//             JiLuShu:result.length,
//             ShuJu:result.slice(limit*(offset-1),offset*limit)
//         };
//         res.send(obj)
//     }).catch(err => {
//         console.log('查询失败 ：'+err);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'查询失败',
//         });
//     });
// };

var searchZhangJie = function (params, XiTongID, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'SELECT FuZhangJie.ZhangJieMing AS FuZhangJieMing, KeChengZhangJie.*,KeCheng.KeChengMing'
            + ' FROM KJ_e_KeChengZhangJie AS KeChengZhangJie'
            + ' LEFT JOIN KJ_e_KeChengZhangJie AS FuZhangJie'
            + ' ON KeChengZhangJie.KeChengDaiMa=FuZhangJie.KeChengDaiMa'
            + ' AND KeChengZhangJie.FuZhangJieDaiMa=FuZhangJie.ZhangJieDaiMa'
            + ' AND FuZhangJie.KeJianDiZhi=\'\''
            + ' LEFT join KJ_e_KeCheng AS KeCheng'
            + ' ON KeCheng.KeChengDaiMa = KeChengZhangJie.KeChengDaiMa'
            + ' WHERE KeChengZhangJie.ZhuangTai = 0 and KeChengZhangJie.XiTongID = ' + XiTongID;
        if (params != '') {
            sql += ' and ' + tryParams(params)
        }
        sql += 'ORDER BY PaiXu';
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

// var searchUser1 = function (params,limit,offset,XiTongID,res) {
//     var sql ='SELECT YongHuLeiXing.YongHuLeiXing AS YongHuLeiXing,YongHu.*'
//             +' FROM KJ_e_YongHu AS YongHu'
//             +' LEFT JOIN KJ_b_YongHuLeiXing AS YongHuLeiXing'
//             +' ON YongHu.YongHuLeiXingID = YongHuLeiXing.YongHuLeiXingID'
//             +' where YongHu.XiTongID = '+XiTongID;
//     if(params!=''){
//         sql +=' and ' +tryParams(params)
//     }
//     mssql.connect(config).then(pool => {
//         return pool.request()
//             .query(sql);
//     }).then(result => {
//         var obj = {
//             ZhiXingZhuangTai:1,
//             ZhiXingJieGuo:'查询成功',
//             JiLuShu:result.length,
//             ShuJu:result.slice(limit*(offset-1),offset*limit)
//         };
//         res.send(obj)
//     }).catch(err => {
//         console.log('查询失败 ：'+err);
//         res.send({
//             ZhiXingZhuangTai:-1,
//             ZhiXingJieGuo:'查询失败',
//         });
//     });
// };

var searchUser = function (params, XiTongID, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'SELECT YongHuLeiXing.YongHuLeiXing AS YongHuLeiXing,YongHu.*'
            + ' FROM KJ_e_YongHu AS YongHu'
            + ' LEFT JOIN KJ_b_YongHuLeiXing AS YongHuLeiXing'
            + ' ON YongHu.YongHuLeiXingID = YongHuLeiXing.YongHuLeiXingID'
            + ' where YongHu.XiTongID = ' + XiTongID;
        if (params != '') {
            sql += ' and ' + tryParams(params)
        }
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

var searchMessage = function (XiTongID, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'SELECT ZhangJieMing,KeChengMing,ZhangJieID,KeChengDaiMa '
            + 'FROM ( '
            + 'SELECT DISTINCT IsZiZhangJie=(CASE WHEN ZiZhangJie.ZhangJieDaiMa IS NULL THEN 0 ELSE 1 END) '
            + ',KeChengZhangJie.ZhangJieMing,KeCheng.KeChengMing, KeChengZhangJie.KeJianDiZhi,KeChengZhangJie.XiTongID,KeChengZhangJie.ZhangJieID,KeChengZhangJie.KeChengDaiMa '
            + 'FROM KJ_e_KeChengZhangJie AS KeChengZhangJie '
            + 'LEFT JOIN KJ_e_KeChengZhangJie AS ZiZhangJie '
            + 'ON KeChengZhangJie.KeChengDaiMa=ZiZhangJie.KeChengDaiMa '
            + 'AND KeChengZhangJie.XiTongID=ZiZhangJie.XiTongID '
            + 'AND KeChengZhangJie.ZhangJieDaiMa=ZiZhangJie.FuZhangJieDaiMa '
            + 'AND ZiZhangJie.ZhangJieDaiMa<>ZiZhangJie.FuZhangJieDaiMa '
            + 'LEFT JOIN KJ_e_KeCheng AS KeCheng '
            + 'ON KeCheng.KeChengDaiMa = KeChengZhangJie.KeChengDaiMa '
            + ') AS ZhangJie '
            + 'WHERE KeJianDiZhi=\'\' AND IsZiZhangJie=0 AND XiTongID=' + XiTongID;
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

var kjView = function (TianShu, KeChengIDLieBiao, XiTongID, callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'EXEC dbo.KJ_sp_KeJianMeiRiFangWenQingKuangTongJi @TianShu=' + TianShu + ', @KeChengIDLieBiao=\'' + KeChengIDLieBiao + '\', @XiTongID=' + XiTongID;
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

var DaoRu = function (tableName,params,id,zjkc,callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = execData(tableName,params,id,zjkc);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

var searchRepeat = function (data,mark, tableName, target, XiTongID ,NoAllDaoRu ,zjkc,callback) {
    var ary = [],params;
    data.forEach(function (value, index) {
        ary.push('\''+value[mark]+'\'')
    });
    params = ary.join(',');
    var strMark = mark=='课件代码'?'KeChengDaiMa':'ZhangJieDaiMa';
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection),
             sql = ' select ' + target + ' from  ' + tableName + ' where ' + strMark + ' in (' + params + ') AND XiTongID='+XiTongID;
       if(zjkc!=''){  sql+=' AND KeChengDaiMa =\''+zjkc+'\'' }
        console.log(sql);
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
};

function tryParams(params) {
    if (params != "") {
        var sql = '', flag = true;
        for (var index in params) {
            var value = typeof params[index] == "string" ? '\'' + params[index] + '\'' : params[index];
            if (flag) {
                sql += index + '=' + value;
                flag = false
            } else {
                sql += ' and ' + index + '=' + value;
            }
        }
        return sql
    }
}

function execData(tableName,data,id,zjkc) {
    var sql = 'insert into ' + tableName;
    if (tableName == 'KJ_e_KeCheng') {
        sql += ' (KeChengDaiMa,KeChengMing,ZongShiChang,ZhuJiangJiaoShi,KeChengLuJing,IsShunXuXueXi,IsYunXuTuoDong,IsZiDongBoFang,IsZiDongJiaZaiXiaYiZhang,KeChengJianJie,XiTongID)';
    }
    if (tableName == 'KJ_e_KeChengZhangJie') {
        sql += ' (FuZhangJieDaiMa,ZhangJieDaiMa,ZhangJieMing,ZhangJieXuHao,KeJianShiChang,KeJianDiZhi,XiTongID,KeChengDaiMa)';
    }
    var sqlAry = [];
    data.forEach(function (value, index) {
        var ary = [];
        for (var a in value) {
          if(a=='是否顺序学习'|| a=='是否允许拖动播放'|| a=='是否自动播放'|| a=='是否自动加载下一章'){
              value[a]=value[a]=='否'?0:1
          }
          if(Number(value[a])){
              ary.push(Number(value[a])+' AS '+ a)
          }else{
              ary.push('\''+value[a]+'\' AS '+ a)
          }
        }
        ary.push(id + ' AS XiTongID ');
        if(zjkc!=''){
            ary.push('\''+zjkc + '\' AS KeChengDaiMa ');
        }
        sqlAry.push('select ' + ary.join(','))
    });
    sql += sqlAry.join(' UNION ALL ');
    return sql
}

function searchLanMu(XiTongID,YeMian,callback) {
    var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = 'select * from KJ_e_YeMianLanMu where XiTongID ='+ XiTongID + ' order by PaiXu ';
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err, recordset) {
                callback(err, recordset,YeMian);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
}

function  menu(YongHuLeiXingID,XiTongID,callback){
     var connection = new mssql.Connection(config, function (err) {
        var ps = new mssql.PreparedStatement(connection);
        var sql = ' select YeMian.* '
                + ' from KJ_e_YeMian AS YeMian '
                + ' left join KJ_r_YongHuLeiXingYeMian AS YongHuLeiXingYeMian '
                + ' ON YongHuLeiXingYeMian.YeMianID = YeMian.YeMianID AND YeMian.XiTongID = YongHuLeiXingYeMian.XiTongID '
                + ' WHERE YongHuLeiXingYeMian.YongHuLeiXingID = '+YongHuLeiXingID+' AND YeMian.XiTongID ='+XiTongID
                + ' order by PaiXu ';
        ps.prepare(sql, function (err) {
            if (err)
                console.log(err);
            ps.execute('', function (err,recordset) {
                if(err) return;
                var YeMian = recordset;
                searchLanMu(XiTongID,YeMian,callback);
                ps.unprepare(function (err) {        //回收连接至连接池
                    if (err)
                        console.log(err);
                });
            });
        });
    });
}


var action = {
    login: login,
    // daoHan:daoHan,
    saveDate: saveDate,
    searchKeJian: searchKeJian,
    searchOne: searchOne,
    upDate: upDate,
    deleteDate: deleteDate,
    ListDate: ListDate,
    searchZhangJie: searchZhangJie,
    searchUser: searchUser,
    searchMessage: searchMessage,
    kjView: kjView,
    DaoRu: DaoRu,
    searchRepeat: searchRepeat,
    menu:menu
};

module.exports = action;

var total = function (fromTable, params) {
    var sql = 'select count(*) from ' + fromTable;
    if (params != '') {
        sql += ' where ' + tryParams(params)
    }
    mssql.connect(config).then(pool => {
        return pool.request()
            .query(sql);
    }).then(result => {
        return result;
    }).catch(err => {
        console.log('查询total ：' + err);
        res.send({
            ZhiXingZhuangTai: -1,
            ZhiXingJieGuo: '查询出错',
        });
    });
};
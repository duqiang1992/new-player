function cheackLogin(req,res,next) {
    if( req.session.user){
        next()
    }else{
        res.send({
            ZhiXingZhuangTai:-105,
            ZhiXingJieGuo:'登录超时'
        });
    }
}
module.exports = cheackLogin;
$(document).ready(function () {
    toHeight()
});
function toHeight() {
    var height = $(".page-content").height() + 'px';
    $('#frame_content', window.parent.document).css({"height": height})
};
function responseState(data,s,f) {
    var state = parseInt(data.ZhiXingZhuangTai);
    if(state>=0) {
        s?s(data):alert(data.ZhiXingJieGuo)
    }
    if(state<0&&state!=-105){
        f?f(data):alert(data.ZhiXingJieGuo)
    }
    if(state==-105){
        alert('用户登录超时');
        window.parent.location = '/'
    }
}
function preventDefa(e){
        e.returnValue = false;
        e.preventDefault();
}
//      关闭修改框
$('.modifyClose').bind('click',function () {
    $('#modifyBox').hide();
});
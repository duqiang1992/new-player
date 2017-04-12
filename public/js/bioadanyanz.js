//利用juquery.validate.js插件表单验证
function biaoDanYanZ(el,url,s,f) {
        $(el).validate({
        debug: false, //false表示验证通过后不要自动提交表单
        focusInvalid:true,
        rules: { //验证规则
            kjdm: {
                required: true
            },
            kjm:{
                required: true
            },
            kjmc: {
                required: true,
                maxlength: 50
            },
            kjsc: {
                required: true,
                number: true
            },
            zjjs: {
                required: true
            },
            kjlj: {
                required: true,
                url: true
            },
            px: {
                required: true,
                number: true
            },
            zjdm: {
                required: true,
                maxlength: 30
            },
            zjmc: {
                required: true,
                maxlength: 50
            },
            zjxh: {
                required: true,
                number: true
            },
            drwj: {
                required: true,
                fileType: ["xls", "xlsx"]
            },
            yhm:{
                required: true,
                maxlength:50
            },
            yhlxid:{
                required: true
            },
            xm:{
                required: true,
                maxlength:50
            },
            mm:{
                required: true,
                maxlength:50,
                minlength:6
            },
            qrmm:{
                required: true,
                maxlength:50,
                equalTo: "#password"
            },
            xgmm:{
                maxlength:50,
                minlength:6
            },
            xgqrmm:{
                maxlength:50,
                equalTo: "#password"
            },
            yhtx:{
                txfileType: ["jpg","jpeg","png","gif"],
                feilSize:2097152
            },
            yhtxM:{
                txfileType: ["jpg","jpeg","png","gif"],
                feilSize:2097152
            },
            kjtp:{
                txfileType: ["jpg","jpeg","png","gif"],
                feilSize:2097152
            },
            myPhoto:{
                 txfileType: ["jpg","jpeg","png","gif"],
                feilSize:2097152
            }
        },
        errorElement:"span",
        errorPlacement: function(error, element){
            error.appendTo(element.parent().parent().parent().find('.errorMessage'));
        },
        //验证通过可以在这里做你想做的事情
        submitHandler: function (form) {
            $(el).ajaxSubmit({
                url: url,
                type: "POST",
                dataType:'json',
                success: function (data) {
                     try{
                            data = JSON.parse(data)
                    } catch(e){

                    }
                    var state = parseInt(data.ZhiXingZhuangTai);
                    if(state>=0) {
                        alert(data.ZhiXingJieGuo);
                        s&&s(data);
                    }
                    if(state<0&&state!=-105){
                        alert(data.ZhiXingJieGuo);
                        f&&f(data);
                    }
                    if(state==-105){
                        alert('用户登录超时');
                        window.parent.location = '/'
                    }
                },
                error:function(){
                    console.log(arguments)
                }
            });
        }
    })
}
jQuery.validator.messages.equalTo = '两次输入密码不同';
jQuery.validator.addMethod("fileType", function (value, element, param) {
    var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
    return this.optional(element) || $.inArray(fileType, param) != -1;
}, "只能上传xls，xlsx格式的文件");
jQuery.validator.addMethod("txfileType", function (value, element, param) {
    var fileType = value.substring(value.lastIndexOf(".") + 1).toLowerCase();
    return this.optional(element) || $.inArray(fileType, param) != -1;
}, "文件格式限制为jpg,jpeg,png,gif");
jQuery.validator.addMethod("feilSize",function (value,element,param) {
        try {
            return this.optional(element) || element.files[0].size<=param;
        }catch (e){
            return true
        }
},"文件应小于2048KB");

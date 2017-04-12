var jcrop_api,
    boundx = "",
    boundy = "",
    $pcnt = $('#preview-pane .preview-container'),
    $pimg = $('#preview-pane .preview-container img'),
    xsize = $pcnt.width(),
    ysize = $pcnt.height(),
    pathImage = '',
    ImageSrc = '',
    widthTx,
    heightTx,
    marginLeftTx,
    marginTopTx,
    checkFormResult;

var test = $('#cutImageForm').validate({
    debug: false,
    onkeyup: true,
    rules: { //验证规则
        myPhoto: {
            required: true,
            txfileType: ["jpg", "jpeg", "png", "gif"],
            feilSize: 2097152
        }
    },
    errorElement: "span",
    errorPlacement: function (error, element) {
        $('.errorImgMessage').find('span').remove();
        error.appendTo($('.errorImgMessage'));
    },
});

$('#tx').bind('click', function () {
    if ($('#yhm').val() == '') {
        alert('请先添加用户名，在上传头像');
        return
    }
    ;
    $('#ImageCut').show();
    return false
});

$('#myPhoto').bind('change', function () {
    checkFormResult = test.checkForm();
    if(!checkFormResult) return;
    $('#cutImageForm').ajaxSubmit({
        url:'/photo',
        type:'post',
        dataType:'json',
        data:{yhm:$('#yhm').val()},
        success:function(response)
        {
            if(response.ZhiXingZhuangTai<0){
                alert(response.ZhiXingJieGuo)
                return
            }
            pathImage = response.path;
            ImageSrc = '/upload/tempPhoto/'+response.path;
            //上传成功后在将服务器上刚刚上传的图片显示在img1上
            $("#cutImage").attr("src", ImageSrc+'?cache ='+ Math.random());
            $("#pImage").attr("src", ImageSrc+'?cache ='+ Math.random());
            try {
                jcrop_api.destroy();
            }catch (e){}
            //同时启动裁剪操作，触发裁剪框显示，让用户选择图片区域
            $("#cutImage").Jcrop({
                setSelect: [90, 90, 210,240],  //设定4个角的初始位置
                aspectRatio: xsize / ysize,
                onChange: showCoords,   //当裁剪框变动时执行的函数
                onSelect: showCoords,   //当选择完成时执行的函数
            },function(){
                jcrop_api = this;
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];
            });

        }    ,
        error:function () {
            console.log(arguments)
        }
    });
});

$('#CJ').bind('click',function () {
    if(!checkFormResult) return;
    $('#is').val('true');
    $('#path').val(pathImage);
    $('#ImageCut').hide();
    $('#tx').attr('src',ImageSrc+'?cache ='+ Math.random()).css({
        width:widthTx ,
        height: heightTx,
        marginLeft:marginLeftTx ,
        marginTop: marginTopTx
    });
    return false
});

$('.imageClose').bind('click', function () {
    $('#ImageCut').hide();
    return false
});

function showCoords(c) {
    if (parseInt(c.w) > 0) {
        var rx = xsize / c.w;
        var ry = ysize / c.h;
        widthTx = Math.round(rx * boundx) + 'px',
        heightTx = Math.round(ry * boundy) + 'px',
        marginLeftTx = '-' + Math.round(rx * c.x) + 'px',
        marginTopTx = '-' + Math.round(ry * c.y) + 'px';
        $pimg.css({
            width: widthTx,
            height: heightTx,
            marginLeft: marginLeftTx,
            marginTop: marginTopTx
        });
        $("#w").val(Math.round(rx * boundx));
        $("#h").val(Math.round(ry * boundy));
        $("#x").val(Math.round(rx * c.x));
        $("#y").val(Math.round(ry * c.y));
    }
}
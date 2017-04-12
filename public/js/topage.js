//     页码跳转
function toPage() {
    $('#pagination span').bind('click',function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if($(target).parent().hasClass('disabled'))return;
        var txt = $(target).html();
        switch (txt) {
            case '&lt;&lt;':
                searchData.dqym = 1;
                break;
            case '&lt;':
                searchData.dqym -= 1;
                break;
            case '&gt;&gt;':
                searchData.dqym = yeMeiShu;
                break;
            case '&gt;':
                searchData.dqym += 1;
                break;
            default :
                searchData.dqym = parseInt(txt);
        }
        toAJax();
        return false
    });
}

//    页码禁止点击
function stop() {
    $('#pagination span').removeClass('disabled');
    if (searchData.dqym === 1) {
        $('#first').addClass('disabled');
        $('#pre').addClass('disabled')
    }
    if (searchData.dqym === yeMeiShu) {
        $('#next').addClass('disabled');
        $('#last').addClass('disabled')
    }
}

//    页码点亮
function pageLight() {
    $('#pagination span').each(function (index, item) {
        if (parseInt($(this).html()) === searchData.dqym) {
            $(this).parent().addClass('active')
        }
    })
}

//全选与反选
// function checkAll() {
//     var $checkAll = $('#checkAll');
//     var $tbr = $('#tBody tr');
//     $checkAll.bind('click',function () {
//         $tbr.find('input').prop('checked', $(this).prop('checked'));
//         return false
//     });
//     $tbr.find('input').bind('click',function () {
//         $checkAll.prop('checked', $tbr.find('input:checked').length == $tbr.length ? true : false);
//         return false
//     });
// }
function checkAll() {
    var $checkAll = $('#checkAll');
    var $tbr = $('#tBody tr');
    $checkAll.click(function (event) {
        $tbr.find('input').prop('checked', $(this).prop('checked'));
        event.stopPropagation();
    });
    $tbr.find('input').click(function (event) {
        $checkAll.prop('checked', $tbr.find('input:checked').length == $tbr.length ? true : false);
        event.stopPropagation();
    });
}

// 获取用户类型下拉列表
function getUserID(id,callback) {
    $.ajax({
        url:"/userType",
        dataType:"json",
        success:function (data) {
            responseState(data,userId);
            callback&&callback()
        }
    });
}

// 生成用户类型下拉列表
function userId(data) {
    var str ='<option disabled selected>请从下拉列表选择</option>';
    $(data.ShuJu).each(function (index,item) {
        str+='<option>'+item.YongHuLeiXingID+'</option>'
    });
    $('.yhlxid').html(str);
    str = null ;
}

function initPage() {
    stop();
    pageLight();
    toPage()
}
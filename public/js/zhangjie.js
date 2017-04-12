var firstZjListFlag,firstParentZj;
// 获取课件下拉列表
function getKjList(id,callback) {
    $.ajax({
        url: "/kjList",
        dataType: "json",
        type:'get',
        success: function (data) {
            responseState(data,kjList,null);
            callback&&callback()
        }
    });
}

//  获取父章节下拉列表
function getZjList(target) {
        $.ajax({
            url: "/zjList",
            dataType: "json",
            type:'get',
            data: {kjdm:target},
            success: function (data) {
                responseState(data,zjList,null)
            }
        })
}

// 修改章节时首次下拉列表获取
function firstZjList(target,math) {
    firstZjListFlag = true;
    firstParentZj = math;
    getZjList(target)
}


//生成课件下拉列表
function kjList(data) {
    var first = true;
    var str = '<option disabled selected>请从下拉列表选择</option>';
    $(data.ShuJu).each(function (index, item) {
        str += '<option>' + item.KeChengDaiMa + '</option>'
    });
    $('#kjm').html(str);
    str = null;
}

// 生产章节下拉列表
function zjList(data) {
    var str = '<option disabled selected>请从下拉列表选择</option>';
    $(data.ShuJu).each(function (index, item) {
        str += '<option>' + item.ZhangJieDaiMa + '</option>'
    });
    $('#fzjdm').html(str);
    str = null;
    if(firstZjListFlag){
        parentDaiMList()
    }
}

function parentDaiMList() {
    $('#fzjdm').find('option').each(function (index, item) {
        $(item).html() == firstParentZj ? $(item).prop('selected', true) : null;
    });
}


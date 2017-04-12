
function MeiRiTongJiTu(tongJiTuRongQiID, jsonTongJiTuXZhouLieMing, jsonTongJiTuShuJu) {
    $('#' + tongJiTuRongQiID).highcharts({
        title: {
            text: '',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: jsonTongJiTuXZhouLieMing
        },
        yAxis: {
            title: {
                text: '访问次数'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '次'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: jsonTongJiTuShuJu
    });
}


//生成每日统计图
function ShengChengMeiRiTongJiTu(iTianShu, strBiaoShi, strTongJiShuJuMing, funCallback) {
    $.ajax({
        type: "Post",
        url: "TongJi/Get" + strBiaoShi + "MeiRiTongJiTuShuJu.ashx",
        data: "TianShu=" + iTianShu,
        dataType: "json",
        cache: false,
        success: function (data) {
            $("#divMeiRi" + strBiaoShi + "TongJiTuLoading").hide();
            $("#divMeiRi" + strBiaoShi + "TongJiTuJieGuo").show();
            if (data == null || typeof (data) != "object") {
                $("#divMeiRi" + strBiaoShi + "TongJiTu").html("获取每日" + strTongJiShuJuMing + "统计图数据失败。");
                return false;
            }
            var iRet = parseInt(data.Ret);
            if (iRet && !isNaN(iRet)) {
                switch (iRet) {
                    case 1:
                        MeiRiTongJiTu("divMeiRi" + strBiaoShi + "TongJiTu", data.TongJiTuXZhouLieMing, data.TongJiTuShuJu);
                        break;
                    case -109:
                        $("#divMeiRi" + strBiaoShi + "TongJiTu").html("您的账号还没有关联课程，目前无法生成统计图。");
                        break;
                    case 110:
                        $("#divMeiRi" + strBiaoShi + "TongJiTu").html("当前还没有统计数据。");
                        break;
                    default:
                        MeiRiTongJiTu("divMeiRi" + strBiaoShi + "TongJiTu", data.TongJiTuXZhouLieMing, data.TongJiTuShuJu);
                        break;
                }
            } else {
                $("#divMeiRi" + strBiaoShi + "TongJiTu").html("获取每日课程统计图执行状态失败。");
                return false;
            }
            if (funCallback && typeof (funCallback) == "function") {
                funCallback();
            }
        },
        error: function (err) {
            $("#divMeiRi" + strBiaoShi + "TongJiTu").html("获取每日课程统计图数据失败，失败原因：" + err.message);
        }
    });
}

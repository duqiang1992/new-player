

//级联菜单
//vID - 当前菜单ID
//vUrl - 获取下级菜单数据的Url
//vParam - 参数名
//vTargetID - 下级菜单ID
//vDefaultText - 下级菜单默认选中信息
//vCallback - 回调函数
function JiLianCaiDan(vID, vUrl, vParam, vTargetID, vDefaultText, vCallback) {
    var strDangQianCaiDanZhi = $(vID).val();
    var str = vParam + "=" + strDangQianCaiDanZhi + "&d=" + (+new Date());

    var strDefaultText = "==请选择==";
    if (vDefaultText) {
        strDefaultText = vDefaultText;
    }
    $.ajax({
        type: "GET",
        url: vUrl,
        data: str,
        success: function (data, textStatus) {
            var $XiaJiCaiDan = $(vTargetID);
            if (data != "-1") {
                if ($XiaJiCaiDan.val() != null) {
                    $XiaJiCaiDan.empty();
                    $("<option value=''>" + strDefaultText + "</option>").appendTo($XiaJiCaiDan);
                }
                var subject = data.split(",");
                $.each(subject, function () {
                    var opt = this.split("|");
                    $("<option value=" + opt[0] + ">" + opt[1] + "</option>").appendTo($XiaJiCaiDan);
                });
                if (vCallback && typeof (vCallback) == "function") {
                    vCallback();
                }
            }
            else {
                if ($XiaJiCaiDan.val() != null) {
                    $XiaJiCaiDan.empty();
                    $("<option value=''>" + strDefaultText + "</option>").appendTo($XiaJiCaiDan);
                }
            }
            $XiaJiCaiDan.select2("val", "");
        },
        error: function (request, settings) {
            //alert(request);
        }
    });
}

var _IsChongXinJiaZaiYeMian = false;
var _bIsViewLoading = true;

$(function () {
    //初始化iframe弹出层
    $(document).off('click.iframeModal').on('click.iframeModal.data-api', '[data-toggle="iframeModal"]', function (e) {
        var $this = $(this);
        e.preventDefault();
        //var $model = $("#modalTanChuKuang");
        //$model.find(".modal-title").html($this.attr("title"));
        //$("#frameTanChuKuang").attr("src", $this.attr("href"));
        ////$model.modal({ show: true, backdrop: 'static' });
        //$model.modal('show');
        OpenIframeModal($this.attr("href"), $this.attr("title"));
    });

    $(document).off('click.dismiss.iframeModal').on('click.dismiss.iframeModal', '[data-dismiss="iframeModal"]', function (e) {
        parent.CloseIframeModal();
    });

    SetFormControlName($("input.serverControl, select.serverControl, textarea.serverControl"));

    //如果找到文件上传表单，则设置当前form接收上传文件
    if($("input:file").length > 0)
    {
        SheZhiBiaoDanWenJianShuXin();
    }
    
    $(".nav-item").each(function () {
        if ($(this).children("ul").length == 0) {
            $(this).find(".arrow").remove();
        }
    });

    //添加全选操作
    QuanXuan();

    //判断Cookie中的是否有页面加载完后要运行的脚本
    RunCookieScript();

    //下拉菜单选中点击项
    $(".dropdown-menu li").bind("click", function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active");
    });

    //颜色选择框
    $(".YanSeXuanZe").each(function () {
        $(this).minicolors({
            control: $(this).attr('data-control') || 'hue',
            defaultValue: $(this).attr('data-defaultValue') || '',
            inline: $(this).attr('data-inline') === 'true',
            letterCase: $(this).attr('data-letterCase') || 'lowercase',
            opacity: $(this).attr('data-opacity'),
            position: $(this).attr('data-position') || 'bottom left',
            change: function (hex, opacity) {
                if (!hex) return;
                if (opacity) hex += ', ' + opacity;
                if (typeof console === 'object') {
                    console.log(hex);
                }
            },
            theme: 'bootstrap'
        });
    });

    $("input:submit").bind("click", function () {
        var strAnNiuMing = $.trim($(this).val());
        alert(strAnNiuMing);
        if(strAnNiuMing == "导出" || strAnNiuMing == "导 出")
        {
            SetNoDisplayLoading();
        }
        else
        {
            SetDisplayLoading();
        }
    });

    //离开当前页面时显示loading动画
    $(window).bind("beforeunload", function () {
        if (_bIsViewLoading) {
            App.blockUI({
                boxed: true
            });
        }
    });
});

//设置为不显示loading动画
function SetNoDisplayLoading()
{
    _bIsViewLoading = false;
}

//设置为显示loading动画
function SetDisplayLoading() {
    _bIsViewLoading = true;
}

//设置表单的name值和id一致
function SetFormControlName($controls) {
    $.each($controls, function (i) {
        $(this).attr("name", $(this).attr("id"));
    });
}

//显示iframe弹出层
function OpenIframeModal(aUrl, aTitle, aWidth, aHeight, aTargetID, aCallBack)
{
    if (aTargetID == null)
    {
        aTargetID = "modalTanChuKuang";
    }
    var $model = $("#" + aTargetID);
    if (aTitle) {
        $model.find(".modal-title").html(aTitle);
    }
    if (aUrl) {
        $model.find(".modal-iframe").attr("src", aUrl);
    }
    if (aWidth) {
        $model.find(".modal-dialog").css("width", aWidth + "px");
    }
    if (aHeight) {
        $model.find(".modal-iframe").css("height", aHeight + "px");
    }
    $model.modal('show', aCallBack);
}

//关闭iframe弹出层
function CloseIframeModal(aTargetID)
{
    if (aTargetID == null) {
        aTargetID = "modalTanChuKuang";
    }
    $("#" + aTargetID).modal('hide');
}

//显示信息弹出层
function TiShiKuang(aTitle, aContent, aWidth, aHeight, aTargetID, aCallBack)
{
    if (aTargetID == null)
    {
        aTargetID = "modalTiShi";
    }
    var $model = $("#" + aTargetID);
    if (aTitle) {
        $model.find(".modal-title").html(aTitle);
    }
    if (aContent) {
        $model.find(".modal-body").html(aContent);
    }
    if (aWidth) {
        $model.find(".modal-dialog").css("width", aWidth + "px");
    }
    if (aHeight) {
        $model.find(".modal-body").css("height", aHeight + "px");
    }
    $model.modal('show', aCallBack);
}

//关闭弹出层
function GuanBiTiShiKuang(aTargetID)
{
    if (aTargetID == null) {
        aTargetID = "modalTiShi";
    }
    $("#" + aTargetID).modal('hide');
}

//提示操作成功并关闭弹出层
function OperationSuccessful(strTiShiNeiRong) {
    var strScript = "toastr.success('" + strTiShiNeiRong + "');";
    Cookies.set("OnloadScript", strScript);
    try {
        _IsChongXinJiaZaiYeMian = true;
        parent.Refresh();
    } catch (err) { }
    //parent.ChengGongTiShi(strTiShiNeiRong);
    parent.CloseIframeModal();
}

function CloseAndRefresh() {
    try {
        parent.Refresh();
    } catch (err) { }
    parent.CloseIframeModal();
}

function CloseWindow() {
    parent.CloseIframeModal();
}

function Refresh() {
    eval($("#lbnRefreash").attr("href"));
}

//添加表单验证
function BiaoDanYanZheng(objYanZhengGuiZe, objYanZhengTiShi) {
    var currentForm = $('form').eq(0);
    var error1 = $('.alert-danger', currentForm);
    var success1 = $('.alert-success', currentForm);

    currentForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        ignore: "",  // validate all fields including form hidden input
        messages: objYanZhengTiShi,
        rules: objYanZhengGuiZe,

        invalidHandler: function (event, validator) { //display error alert on form submit              
            success1.hide();
            error1.show();
            App.scrollTo(error1, -200);
        },

        errorPlacement: function (error, element) { // render error placement for each input type
            if (element.hasClass("select2") || element.hasClass("select2-allow-clear") || element.hasClass("select2-multiple")) {
                error.insertAfter(element.parent().find(".select2-container"));
            }
            else {
                error.insertAfter(element);
                var icon = $(element).parent('.input-icon').children('i');
                icon.removeClass('fa-check').addClass("fa-warning");
                icon.attr("data-original-title", error.text()).tooltip({ 'container': 'body' });
            }
        },

        highlight: function (element) { // hightlight error inputs
            //$(element).closest('.form-group').addClass('has-error');
            $(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group   
        },

        unhighlight: function (element) { // revert the change done by hightlight
            //$(element).closest('.form-group').removeClass('has-error');
        },

        success: function (label, element) {
            var icon = $(element).parent('.input-icon').children('i');
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
            icon.removeClass("fa-warning").addClass("fa-check");
        },

        submitHandler: function (form) {
            try {
                App.blockUI({
                    boxed: true,
                    message: '正在提交...'
                });
                /*
                window.setTimeout(function () {
                    App.unblockUI();
                }, 2000);
                */
            } catch (err) { }
            success1.show();
            error1.hide();
            form.submit(); // submit the form
        }
    });

    $(".select2, .select2-allow-clear, .select2-multiple").bind("change", function () { $(this).valid(); });
}

//设置表单允许上传文件
function SheZhiBiaoDanWenJianShuXin()
{
    var currentForm = $('form').eq(0);
    currentForm.attr("enctype", "multipart/form-data");
}


//增加全选操作
function QuanXuan() {
    $("#cbkQuanXuan").bind("change", function () {
        var bXuanZhong = $(this).prop("checked");
        var arrXuanZe = $("input.XuanZe").prop("checked", bXuanZhong);
        var arrXuanZhongHang = $(this).parents("table").find("tr:not(:first)");
        if (bXuanZhong) {
            arrXuanZhongHang.addClass("active");
        }
        else {
            arrXuanZhongHang.removeClass("active");
        }
    });
    $("input.XuanZe").bind("change", function () {
        var bXuanZhong = $(this).prop("checked");
        var trXuanZhong = $(this).parents("tr");
        if (trXuanZhong != null) {
            if (bXuanZhong) {
                trXuanZhong.addClass("active");
            }
            else {
                trXuanZhong.removeClass("active");
            }
        }
    });
}

//未选择提示
function WeiXuanTiShi(strTiShiXinXi) {
    if($("input.XuanZe:checked").length == 0)
    {
        ShiBaiTiShi(strTiShiXinXi);
        return false;
    }
    return true;
}

//提示设置
function TiShiSheZhi()
{
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-top-center",
        "onclick": null,
        "timeOut": "8000"
    };
}
TiShiSheZhi();

//信息提示
function TiShi(strTiShiNeiRong, bIsChongZhiBiaoDan, strTiShiBiaoTi) {
    strTiShiBiaoTi = SheZhiTiShiMoRenBiaoTi(strTiShiBiaoTi);
    //toastr.info(strTiShiNeiRong, strTiShiBiaoTi);
    var strScript = "toastr.info('" + strTiShiNeiRong + "', '" + strTiShiBiaoTi + "');";
    ChongZhiBiaoDan(bIsChongZhiBiaoDan, strScript);
}

//成功提示
function ChengGongTiShi(strTiShiNeiRong, bIsChongZhiBiaoDan, strTiShiBiaoTi){
    strTiShiBiaoTi = SheZhiTiShiMoRenBiaoTi(strTiShiBiaoTi);
    //toastr.success(strTiShiNeiRong, strTiShiBiaoTi);
    var strScript = "toastr.success('" + strTiShiNeiRong + "', '" + strTiShiBiaoTi + "');";
    ChongZhiBiaoDan(bIsChongZhiBiaoDan, strScript);
}

//失败提示
function ShiBaiTiShi(strTiShiNeiRong, bIsChongZhiBiaoDan, strTiShiBiaoTi) {
    strTiShiBiaoTi = SheZhiTiShiMoRenBiaoTi(strTiShiBiaoTi);
    //toastr.error(strTiShiNeiRong, strTiShiBiaoTi);
    var strScript = "toastr.error('" + strTiShiNeiRong + "', '" + strTiShiBiaoTi + "');";
    ChongZhiBiaoDan(bIsChongZhiBiaoDan, strScript);
}

//警告提示
function JingGaoTiShi(strTiShiNeiRong, bIsChongZhiBiaoDan, strTiShiBiaoTi) {
    strTiShiBiaoTi = SheZhiTiShiMoRenBiaoTi(strTiShiBiaoTi);
    //toastr.warning(strTiShiNeiRong, strTiShiBiaoTi);
    var strScript = "toastr.warning('" + strTiShiNeiRong + "', '" + strTiShiBiaoTi + "');";
    ChongZhiBiaoDan(bIsChongZhiBiaoDan, strScript);
}

//重置表单
function ChongZhiBiaoDan(bIsChongZhiBiaoDan, strScript) {
    if (bIsChongZhiBiaoDan) {
        _IsChongXinJiaZaiYeMian = true;
        Cookies.set("OnloadScript", strScript);
        location.href = location.href;
        //$("form").get(0).reset();
    }
    else {
        eval(strScript);
    }
}

//设置提示默认标题
function SheZhiTiShiMoRenBiaoTi(strTiShiBiaoTi) {
    if (typeof (strTiShiBiaoTi) == "undefined") {
        strTiShiBiaoTi = "";
    }
    return strTiShiBiaoTi;
}

//运行Cookie中的脚本
function RunCookieScript() {
    var strJiaoBen = Cookies.get("OnloadScript");
    if (strJiaoBen != "undefined" && strJiaoBen != "")
    {
        if (!_IsChongXinJiaZaiYeMian) {
            eval(strJiaoBen);
            Cookies.remove("OnloadScript");
        }
    }
}

function ACTLM(LM) {
    var str = LM;
    $(str).parent("li").addClass("active");
}
function ACTYM(YM) {
    // var str = "#" + YM;
    var str = YM;
    //alert(str);
    $(str).parent("li").addClass("active");
    $(str).parent("li").parent("ul").attr("display", "block");
    $(str).parent("li").parent("ul").parent("li").addClass("active");
}

//设置课程指定字段列表的为必填
function SheZhiBiTianZiDuan(strBiTianZiDuanLieBiao, bIsYanZhengBiTian)
{
    var arrBiTianZiDuanLieBiao = strBiTianZiDuanLieBiao.split(",");
    $.each(arrBiTianZiDuanLieBiao, function (i, strZiDuanMing) {
        $("span[name='" + strZiDuanMing + "_Required']").removeClass("hidden");
    });
    if(bIsYanZhengBiTian == true)
    {
        
    }
}

/* Session维持的方法，传入参数为Session维持的页面 */
var iSessionTimeCount = 0;
var iTiWenFaZhi = 0;    //连续维持一段时间后，要提示用户是否还继续，防止长时间的无效维持

function SessionWeiChi(serverPage) {
    iSessionTimeCount++;

    if (iSessionTimeCount > 305) {
        iTiWenFaZhi++;
        iSessionTimeCount = 0;

        if (iTiWenFaZhi <= 20) {
            try {
                serverPage = serverPage;

                var request = $.ajax({
                    url: serverPage,
                    cache: false
                });

                request.fail(function () {
                    alert("登录信息已经失效，请保存好页面上的重要信息到本地计算机上，准备重新填写！");
                });

            }
            catch (e) {
                alert("登录信息无效，请保存好页面上的重要信息到本地计算机上，准备重新填写！");
            }
        }
        else {
            if (confirm("已经很久没有收到您的访问请求，如果您还在继续使用，请点击“确认”，否则，请点击“取消”！")) {
                iTiWenFaZhi = 0;
            }
            else {
                return false;
            }
        }
    }
}
/*******************************************************************************************/
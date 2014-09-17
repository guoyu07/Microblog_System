//��̬ˢ�£�΢������Ч��
(function(jQuery){
    jQuery.fn.iscroll = function(params){
        options = {
            ShowTime: 500, //��ʾʱ��
            moveTime: 3000, //�ƶ�ʱ��
            charElement:"li", //�ӽڵ�
            ajaxTrunOn: false, //�Ƿ���ajax���󣬶�ʱ��ȡ����
            ajaxTime: 30000, //����һ��ajax����ʱ�䣬Ĭ����30���ȡһ������
            ajaxUrl: "", //ajax��������·��
            setAjaxHtml: function(data){ //����Դ�������
                //data��ajax��������
    //�����ﶼ����и�ʽ�����
            }
        };
        jQuery.extend(options, params);
        //���浱ǰ����
        var _this = this,
            isIE = !!window.ActiveXObject,
            isIE6 = isIE&&!window.XMLHttpRequest,
            jsonData = false,
            jsonCount = -1;
        //��꾭������nameֵΪ"hovered"
        function setHover(){
            _this.hover(function(){
               _this.attr("name","hovered");
            },function(){
               _this.removeAttr("name");
            });
        }setHover();
        function animateHandler(){
            if(options.ajaxTrunOn){
                //������������
                handlerJson();
            }
            var height = _this.find(".itemt:last").height();
            _this.find(".itemt:last").css({"opacity":0,"height":0});
            _this.find(".itemt:first").before( _this.find(".itemt:last") );
            _this.find(".itemt:first").animate({"height":height},options.ShowTime);
            _this.find(".itemt:first").animate({"opacity":"1"},options.ShowTime);
        }
        function setMove(){
            if(_this.attr("name") != "hovered"){
                animateHandler();
            }
        }
        //���ö�ʱ����
        setInterval(function(){
            jsonCount++;
            setMove();
        },options.moveTime);
        //��ʱ��ѯһ������
        if(options.ajaxTrunOn){
            setInterval(function(){
               getNewsList();
            },options.ajaxTime);
        }
        //ajax����
        function getNewsList(){
            $.ajax({
                url: options.ajaxUrl,
                dataTypes: "json",
                success: function(json){
                    jsonCount = -1;
                    jsonData = json;
                }
            })
        }
        //�������������json
        function handlerJson(){
            if(jsonData){
                _jsonData = eval( "(" +jsonData + ")");
                var _length = _jsonData.length;
                if(jsonCount < _length){
                    //������Ӧ�ĺ���
                    _this.find(".itemt:last").css("height","auto");//����߶�
                    _this.find(".itemt:last").html(options.setAjaxHtml(_jsonData[jsonCount]));
                }
            }
        }
    }
})(jQuery);
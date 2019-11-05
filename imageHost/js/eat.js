//随机生成一个随机数
var htmlobj, index, arrList, int

function arrindex() {
	htmlobj = $.ajax({
		url: "../json/csm.json",
		async: false
	});
	arrList = htmlobj.responseJSON.nameList
	index = Math.floor((Math.random() * arrList.length));
	var text = arrList[index].name;
	$("#csm").text(text);
}
//点击今晚吃什么
var number = 0;
layui.use('layer', function() {
	var layer = layui.layer;
	$("#start").click(function() {
		var _this = $("#start").text();
		if(localStorage.getItem("num") == 3) {
			//						layer.msg('不要再纠结了！')
		};
		if(_this == "开始") {
			number++
			localStorage.setItem("num", number);
			$("#start").text("结束");
			int = setInterval("arrindex()", "80");

		} else {
			$("#start").text("开始");
			window.clearInterval(int);
			$("#what").text($("#csm").text());
		}
	});

	$("#cp").click(function() {
		var menu = $("#csm").text();
		if(menu == "什么") {
			layer.msg('你什么都还没选，就问我怎么做？')
		} else {
			layer.open({
				type: 2,
				title: '教你做' + menu + '',
				shadeClose: true,
				shade: 0.8,
				area: ['90%', '90%'],
				content: 'Eatlist.html?menu=' + encodeURI(encodeURI(menu)) + '' //iframe的url
			});
		}

	})
});

//菜谱详情
function eatDetail(menu){
	document.getElementById("list").innerHTML = "";
	$.ajax({
		url: 'https://apis.juhe.cn/cook/query',
		type: 'get',
		dataType: 'jsonp',
		data: {
			key: '685f0a5c133ba52a43f67b5f92edea7d',
			menu: menu,
			rn: '1',
			pn: '1',
		},
		success: function(data) {
			if(data.resultcode == 200){
				var result = data.result.data[0];
				var innerHTML = "";
				console.log(data)
				$(".albums").attr("src",result.albums[0]);
				$(".title").text(result.title);
				$(".burden").text(result.ingredients+';'+result.burden)
				for (var i = 0; i < result.steps.length; i++) {
					innerHTML +='<li>';
					innerHTML +='<p>'+result.steps[i].step+'</p>';
					innerHTML +='<img src="'+result.steps[i].img+'" />';
					innerHTML +='</li>';
				};
				$("#list").append(innerHTML)
				$(".eatList").show();
			}else{
				alert("额，我并没有找到菜谱...")
			}
			
		}
	});
}








// 获取url地址参数
function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}
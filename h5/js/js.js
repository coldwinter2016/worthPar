window.onload = function() {
	//注册页面；
	
	var $telReg =/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
		$paswardReg = /\w{1,20}/i,
		$btn = $("#register_btn");
		$btn.on("tap",function(e) {
			e.preventDefault();
			var $telVal = $("#regTel").val(),
				$paswVal = $("#regpasw").val();
				$nickName = $("#userName").val();
				if( $telReg.test($telVal) && $paswardReg.test($paswVal) ){
					$.ajax({
						url : "http://localhost:8080/Proxy/FootBall/user/json/reg.do",
						data: {"loginname" : $telVal,"password" : $paswVal,"nickname" : $nickName},
						success : function(data) {
					
							alert(data);
						}
					});
				}
				else{
					alert("输入错误，请重新输入！");
				}
			
				
	});


//登录页面；
	$("#login_btn").on("tap",function(e) {
		e.preventDefault();
		var $loginName = $("#loginName").val(),
			$loginPassword = $("#loginPassword").val();
		$.ajax({
			url: "http://localhost:8080/Proxy/FootBall/user/json/login.do",
			data: {"loginname" : $loginName , "password" : $loginPassword},
			success: function(data) {
				data = JSON.parse(data);
				if(window.localStorage) {
					localStorage.setItem("loginName",JSON.stringify(data.data) );
				}
				if(data.errorinfo) {
					alert(data.errorinfo);
				}
				else{
					open("http://localhost:8080/html/h5/index8.html");
				}
			}
		});
	});


//关注-点赞；
	$("#zan").on("tap",function() {
		$.ajax({
			url: "http://localhost:8080/Proxy/FootBall/like/json/add.do",
			data: {},
		});
	});


//首页iScroll;

var myscroll,
	myscroll2,
	myscroll3;
	$("#swiper_pic").height( $(window).height() - $(".hot_hearder").height() - $(".live_tab").height() - $(".footer_search").height() );
    $(".wrapper").height( $(window).height() - $(".hot_hearder").height() - $(".live_tab").height() - $(".footer_search").height() );            
    myscroll = new iScroll("wrapper",{hScrollbar:false, vScrollbar:false}); 
    myscroll2 = new iScroll("wrapper2",{hScrollbar:false, vScrollbar:false}); 
    myscroll3 = new iScroll("wrapper3",{hScrollbar:false, vScrollbar:false}); 
    var $swiper = $("#swiper");
    var $tab = $("#girl_tab li");
    var mySwiper = new Swiper ('.swiper-container', {
		    direction: 'horizontal',
		    loop: false,
		    onSlideChangeEnd: function(mySwiper){
              	var index = mySwiper.activeIndex;
              	// console.log(index);
              	$tab.eq(index).children("a").addClass("hover").parent().siblings().children("a").removeClass("hover");
            }
        });       
    for(var i=0; i<$tab.length; i++) {
	    $tab.on("tap",function(e) {
	    	e.preventDefault();
	    	var ind = $(this).index();
	    	// console.log(ind);
	    	$(this).children("a").addClass("hover").parent().siblings().children("a").removeClass("hover");
	    	$swiper.css({transform : "translate3d(" + -$(window).width()*ind + "px,0px,0px)","-webkit-transform" : "translate3d(" + -$(window).width()*ind + "px, 0px, 0px)","transition-duration": "300ms","-webkit-transition-duration": "300ms"});	
		});		
    } 
    

    // $.ajax({
    // 	url: "http://localhost:8080/Prexy/FootBall/tweet/json/query/hotspot.do",
    // 	data: {"category" : 1},
    // 	success: function(data) {
    // 		console.log(data);
    // 	}
    // });








}
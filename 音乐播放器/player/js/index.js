
		var oBtn=document.getElementsByClassName('btn')[0],
		oIsPlay=oBtn.getElementsByClassName('iconfont'),
		oCurrentTime=document.getElementsByClassName('current-time')[0],
		oAllTime=document.getElementsByClassName('all-time')[0],
		oBtn=document.getElementsByClassName('btn')[0],
		oIsPlay=oBtn.getElementsByClassName('iconfont'),
		oRadioBox=document.getElementsByClassName('radio-box')[0],
		oProBox=document.getElementsByClassName('pro-box')[0],
		oProActive=document.getElementsByClassName('pro-active')[0];
		
	    var oAudio=document.getElementById('audio');
//		console.log(oAudio);
    	var num = 0;
    	var MusicArray = ["./music/五月天 - 温柔 (CCTV音乐频道).mp3","./music/许嵩 - 如约而至.mp3","./music/xusong.mp3"];



		var timer,duration,
		bgWidth=232;
		
		//把当前时间currentTime和总时间duration渲染出来
		oAudio.oncanplay = function(){
			oCurrentTime.innerHTML=conversion(this.currentTime);
			duration=this.duration;
			oAllTime.innerHTML=conversion(duration);
			
		}

		// 下一首
		oIsPlay[2].onclick = function(){
			num++;
			oIsPlay[1].className='iconfont icon-weibiaoti-- ';
			if(num >= MusicArray.length){
				num = 0;
			}
			oAudio.src = MusicArray[num];		
			oAudio.load();
			musicPlay()	
		}
		// 上一首
		oIsPlay[0].onclick = function(){
			num--;
			oIsPlay[1].className='iconfont icon-weibiaoti-- ';
			if(num < 0){
				num = MusicArray.length-1;
			}
			oAudio.src = MusicArray[num];
			oAudio.load();
			musicPlay()
		}

		//转换数字
		function conversion(time){
		    var sec=parseInt(time%60)<10?'0'+parseInt(time%60):parseInt(time%60);//获取秒
		    var min=parseInt(time/60)<10?'0'+parseInt(time/60):parseInt(time/60);//获取分
		    
		    return min+":"+sec;
		}

		//点击按钮进行播放或暂停
		oBtn.onmouseup=function(){
			if(oAudio.paused){
				musicPlay();
			}else{
				musicPause();
			}
		}
		//执行播放
		function musicPlay(){
			oAudio.play();
			oIsPlay[1].className='iconfont icon-bofang';//把图标变成当前状态的图标
		    timer=setInterval(movePro,200);//每隔200毫秒执行一次进步条，让进度条和时间同步变化
		}
		//执行暂停
		function musicPause(){
			oAudio.pause();
				oIsPlay[1].className='iconfont icon-weibiaoti-- ';
				clearInterval(timer);
		}
		//播放的同时变化的效果
		function movePro(){
			 var currentTime=oAudio.currentTime;
			 oCurrentTime.innerHTML=conversion(currentTime);	
		     oProActive.style.width=currentTime/duration*bgWidth+"px";
		}
		//播放完毕自动播放下一首
		oAudio.onended=function(){
		      num++;
		      oAudio.src = MusicArray[num];
		       musicPlay();
		}
		//拖拽进度条功能
		oRadioBox.onmousedown=function(){
		    clearInterval(timer);
		    var c=oAudio.currentTime;
			document.body.onmousemove=function(e){
			var newWidth=e.clientX-oProBox.getBoundingClientRect().left;//获取当前元素距离浏览器的left值
			if(newWidth<8){
		         newWidth=8;
			}else if(newWidth>240){
			     newWidth=240;
			}

			    oProActive.style.width=newWidth+'px';
			     c=(newWidth-8)/bgWidth*duration;
			    
			    oCurrentTime.innerHTML=conversion(c);
			}
			
			document.body.onmouseup=function(){
				document.body.onmousemove=null;
				document.body.onmouseup=null;
		        musicPlay();
				oAudio.currentTime=c;
			}
		}
		
		//音量
		var Volume = document.getElementById("volume1");
		var VolumeBox = document.getElementsByClassName("volume")[0];
		var VolumePlan = document.getElementsByClassName("volumePlan")[0];
		var VolumeAdd = document.getElementById("volumeAdd");
		var VolumeSub = document.getElementById("volumeSub");
		var VolumeHeader = document.getElementById("volumeHeader");
 		var volumeNumber = true;
 		
 		//点击喇叭，加减号，进度条都显示隐藏
		Volume.onclick = function(){
			if(volumeNumber){
				VolumeAdd.style.display = "block";
				VolumeSub.style.display = "block";
				VolumePlan.style.display = "block";
				volumeNumber = false;
			}else{
				VolumeAdd.style.display = "none";
				VolumeSub.style.display = "none";
				VolumePlan.style.display = "none";
				volumeNumber = true;
			}
		}
		
		//点击加号，进度条+10，音量+0.1;
	 	var VolumeHeight = oAudio.volume*100;
		VolumePlan.style.height = oAudio.volume*100 +"px"
		VolumeAdd.onclick = function(){
			if(VolumeHeight<100){
				VolumeHeight+=10;
			}			
			if(VolumeHeight>=100){
				VolumeHeight = 100;
			}
			VolumePlan.style.height = VolumeHeight+"px";
			VolumeHeight.onchange = VolumeChange();
			console.log(VolumePlan.style.height);
		}
		
		//点击加号，进度条-10，音量-0.1;
		VolumeSub.onclick = function(){
			if(VolumeHeight>0){
				VolumeHeight-=10;
			}
			if(VolumeHeight<=0){
				VolumeHeight = 0;
			}
			VolumePlan.style.height = VolumeHeight+"px";
			VolumeHeight.onchange = VolumeChange();
			console.log(VolumePlan.style.height);
		}
		
		//鼠标拖拽改变音量
		VolumeHeader.onmousedown = function(){
			document.body.onmousemove = function(e){
				var VolumeNewHeight =VolumePlan.getBoundingClientRect().bottom -e.clientY;
				if(VolumeNewHeight<=0){
					VolumeNewHeight = 0;
				}
				if(VolumeNewHeight>100){
					VolumeNewHeight = 100;
				}
				console.log(VolumeNewHeight);
				VolumePlan.style.height  = (VolumeNewHeight-8)+"px";
				VolumeHeight.onchange = VolumeChange();
				console.log(VolumePlan.style.height);
			}
		}
		document.body.onmouseup=function(){
				document.body.onmousemove=null;			
				VolumeHeight.onchange = VolumeChange();
		}
		
		//控制音量值等于进度条的高度值
		function VolumeChange(){
		 	oAudio.volume = parseInt(VolumePlan.style.height)/100;
		 	console.log(oAudio.volume);
		}	
    
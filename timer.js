//skewb scrambler
/*
function getskewboptscramble(e){
 function t(e){var t=arguments.length-1,n=e[arguments[t]];for(var r=t;r>1;r--){e[arguments[r]]=e[arguments[r-1]]}e[arguments[1]]=n}function n(e,t){return e[t>>3]>>((t&7)<<2)&15}function r(e,t,n,r){for(var i=0;i<r;i++){e[i]=[];for(var s=0;s<t;s++){e[i][s]=n(s,i)}}}function i(e,t,r,i,s,o,u){var a=Array.isArray(s);for(var f=0,l=r+7>>>3;f<l;f++){e[f]=-1}e[t>>3]^=15<<((t&7)<<2);for(var c=0;c<=i;c++){var h=c+1^15;for(var p=0;p<r;p++){if(n(e,p)==c){for(var d=0;d<o;d++){var v=p;for(var m=0;m<u;m++){v=a?s[d][v]:s(v,d);if(n(e,v)==15){e[v>>3]^=h<<((v&7)<<2)}}}}}}}function s(e,t,r,i,o){if(0==r)return 0==e&&0==t;if(n(a,e)>r||n(f,t)>r)return!1;for(var u=0;4>u;u++)if(u!=i)for(var h=e,p=t,d=0;2>d;d++)if(h=l[u][h],p=c[u][p],s(h,p,r-1,u,o))return o.push(u*2+(1-d)),!0;return!1}function o(e,n){var r=e%12;e=~~(e/12);for(var i=[],s=5517840,o=0,u=0;5>u;u++){var a=h[5-u],f=~~(e/a),e=e-f*a,o=o^f,f=f<<2;i[u]=s>>f&15;a=(1<<f)-1;s=(s&a)+(s>>4&~a)}0==(o&1)?i[5]=s:(i[5]=i[4],i[4]=s);0==n&&t(i,0,3,1);2==n&&t(i,1,5,2);1==n&&t(i,0,2,4);3==n&&t(i,3,4,5);e=0;s=5517840;for(u=0;4>u;u++)f=i[u]<<2,e*=6-u,e+=s>>f&15,s-=1118480<<f;return e*12+p[r][n]}function u(e,t){var n=[];var r=[];for(var i=0;i<4;i++){n[i]=e%3;e=~~(e/3)}for(var i=0;i<3;i++){r[i]=e%3;e=~~(e/3)}r[3]=(6-r[0]-r[1]-r[2])%3;n[t]=(n[t]+1)%3;var s;if(t==0){var s=r[0];r[0]=r[2]+2;r[2]=r[1]+2;r[1]=s+2}else if(t==1){var s=r[0];r[0]=r[1]+2;r[1]=r[3]+2;r[3]=s+2}else if(t==2){var s=r[0];r[0]=r[3]+2;r[3]=r[2]+2;r[2]=s+2}else if(t==3){var s=r[1];r[1]=r[2]+2;r[2]=r[3]+2;r[3]=s+2}for(var i=2;i>=0;i--){e=e*3+r[i]%3}for(var i=3;i>=0;i--){e=e*3+n[i]}return e}var a=[],f=[],l=[],c=[];var h=[1,1,1,3,12,60,360];var p=[[6,5,10,1],[9,7,4,2],[3,11,8,0],[10,1,6,5],[0,8,11,3],[7,9,2,4],[4,2,9,7],[11,3,0,8],[1,10,5,6],[8,0,3,11],[2,4,7,9],[5,6,1,10]];var d=[0,1,2,0,2,1,1,2,0,2,1,0];var v,m,y=[];r(l,4320,o,4);i(a,0,4320,7,l,4,2);r(c,2187,u,4);i(f,0,2187,6,c,4,2);do{v=0|Math.random()*4320;m=0|Math.random()*2187}while(v==0&&m==0||d[v%12]!=(m+~~(m/3)+~~(m/9)+~~(m/27))%3);for(;99>e&&!s(v,m,e,-1,y);e++){}var b=[];var w=["L","R","B","U"];for(var u=0;u<y.length;u++){var E=y[u]>>1;var S=y[u]&1;if(E==2){for(var l=0;l<=S;l++){var x=w[0];w[0]=w[1];w[1]=w[3];w[3]=x}}b.push(w[E]+(S==1?"'":""))}
 ss[0]+=b.join(" ")
}
*/
function updatestats(){
  if(times[sn].length > 0){
    $('#timelist').html(times[sn].join());
    $('#sm').text(Math.floor(times[sn].average() * 1000) / 1000);
    $('#pb').text(Math.min.apply(Math, times[sn]));
    $('#pw').text(Math.max.apply(Math, times[sn]));
    if(times[sn].length > 2){
      var dup = times[sn].slice(0);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      $('#sa').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 3){
      $('#sa').text('DNF');
    }
    if(times[sn].length > 4){
      var dup = times[sn].slice(times[sn].length - 5);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      $('#aof').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 5){
      $('#aof').text('DNF');
    }
    if(times[sn].length > 11){
      var dup = times[sn].slice(times[sn].length - 12);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      $('#aot').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 12){
      $('#aot').text('DNF');
    }
    if(times[sn].length > 99){
      var dup = times[sn].slice(times[sn].length - 100);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      $('#aoh').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 100){
      $('#aoh').text('DNF');
    }
  } else {
    $('#timelist').text('None submitted.');
    $('.modal-body span:not(#timelist, .input-group-btn)').text('DNF');
  }
}
var Timer = function(DOM_element){

	this.start_t = null;
	this.interval = null;
	this.DOM = DOM_element;

	/**
	 * toggle start stop of current timer
	 */
	this.toggle = function(){
		this.interval==null? this.start() : this.end();
	}

	/**
	 * start timer ticking
	 */
	this.start = function(){

		// create the starting point
		this.start_t = new Date();

		// store this in another reference to be accessible from update function
		var myself = this;

		// updating document with time
		var inline_update = function(){ myself.update(); }

		// execute this function every 10 milliseconds to give the speed effect
		this.interval = setInterval( inline_update, 10);
	}

	/**
	 * stop updating the DOM and clear the interval from object
	 */
	this.end = function(){
		clearInterval(this.interval);
		this.interval = null;
	}

	 this.update = function(){
			// get the ellapsed milliseconds
			var ellapsed = ( (new Date()-this.start_t)/1000 );

			this.DOM.innerHTML = ellapsed.toFixed(3);
	}

}
Array.prototype.sum = Array.prototype.sum || function(){
  return this.reduce(function(sum, a) { return sum + Number(a) }, 0);
}
Array.prototype.average = Array.prototype.average || function(){
  return this.sum() / (this.length || 1);
}
var times = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var event = ['222', '333', '333oh', '333bf', '333ft', '444', '444bf', '555', '555bf', '666', '777', 'minx', 'pyram', 'sq1', 'clock'];

//cookie get
$.cookie.json = true;
if($.cookie('times') != undefined){
  times = $.cookie('times');
}

//timer and scramble initialization
var st = "333";
var sn = 1;
var timer_obj = new Timer(document.getElementById('time'));
scramblers["222"].initialize(null, Math);
scramblers["333"].initialize(null, Math);
scramblers["333oh"].initialize(null, Math);
scramblers["333bf"].initialize(null, Math);
scramblers["333ft"].initialize(null, Math);
scramblers["444"].initialize(null, Math);
scramblers["444bf"].initialize(null, Math);
scramblers["555"].initialize(null, Math);
scramblers["555bf"].initialize(null, Math);
scramblers["666"].initialize(null, Math);
scramblers["777"].initialize(null, Math);
scramblers["minx"].initialize(null, Math);
scramblers["pyram"].initialize(null, Math);
scramblers["sq1"].initialize(null, Math);
scramblers["clock"].initialize(null, Math);
$('#scramble').html(scramblers["333"].getRandomScramble().scramble_string);
//hide mobile toolbar
setTimeout(function(){
  window.scrollTo(0, 1);
}, 0);

//inspection time
var ins;
$('#ins').mouseup(function(){
  $('#time').text('15');
  var x = 14;
  $('.dis').fadeTo('fast', 0.01);
  $('button, a').blur().attr('disabled', 'true');
  ins = setInterval(function(){
    $('#time').text(x);
    if(x == 0){
      clearInterval(ins);
      timer_obj.start();
    } else {
      x--;
    }
  }, 1000);
});

var record = false;
//timer key events
$(document).keydown(function(e){
  if(e.keyCode == 32 && record == true){
    timer_obj.end();
  }
});
$(document).keyup(function(e){
  if(e.keyCode == 32){
    if(record == false){
      record = true;
      clearInterval(ins);
      timer_obj.start();
      $('.dis').fadeTo('fast', 0.01);
      $('.plus2, .dnf').fadeOut('fast');
      $('button, a').blur().attr('disabled', 'true');
    } else {
      record = false;
    	$('.dis').fadeTo('fast', 1);
    	$('button, a').removeAttr('disabled');
      times[sn].push(parseFloat($('#time').text()));
    	$('#scramble').html(scramblers[st].getRandomScramble().scramble_string);
    }
  }
});

//timer tap events
$('#time').on('touchend', function(){
  if(record == false){
    record = true;
    clearInterval(ins);
    timer_obj.start();
    $('.dis').fadeTo('fast', 0.01);
    $('.plus2, .dnf').fadeOut('fast');
    $('button, a').blur().attr('disabled', 'true');
  } else {
    record = false;
    $('.dis').fadeTo('fast', 1);
    $('button, a').removeAttr('disabled');
    times[sn].push(parseFloat($('#time').text()));
    $('#scramble').html(scramblers[st].getRandomScramble().scramble_string);
  }
});
$('#time').on('touchstart', function(){
  if(record == true){
    timer_obj.end();
  }
});

//stats
$('#stats').click(function(){
  updatestats();
});

//reset
$('#reset').on('dblclick doubletap', function(){
  times[sn].length = 0;
  updatestats();
});
$('#resl').click(function(){
  times[sn].pop();
  updatestats();
});

//change events
$('#st li a:not(.nosel)').click(function(){
  st = $(this).attr('class');
  $('#scramble').html(scramblers[st].getRandomScramble().scramble_string);
  sn = event.indexOf(st);
});
$('.skewb').click(function(){
  sn = 16;
  $('#scramble').html(getskewboptscramble(0));
});

//change scramble
$('#scramble').click(function(){
  $('#scramble').html(scramblers[st].getRandomScramble().scramble_string);
});

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
//mobile only: orientation stuff for modal
if(window.innerHeight < window.innerWidth && isMobile.any()){
	$('#mod').modal('show');
}
$(window).on('orientationchange', function(){
  if(window.innerHeight < window.innerWidth && isMobile.any()){
    updatestats();
    $('#mod').modal('show');
  } else {
    $('#mod').modal('hide');
  }
});

//time submitting
$('#subet').click(function(){
  if(!isNaN(parseFloat($('#et').val()))){
    times[sn].push(parseFloat($('#et').val()));
    updatestats();
  }
});

//cookie store
window.onbeforeunload = function(){
  $.cookie('times', times);
};
  

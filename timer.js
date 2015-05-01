var startTimer=function(t){this.start_t=null,this.interval=null,this.DOM=t,this.toggle=function(){null==this.interval?this.start():this.end()},this.start=function(){this.start_t=new Date;var t=this,i=function(){t.update()};this.interval=setInterval(i,10)},this.end=function(){clearInterval(this.interval),this.interval=null},this.update=function(){var t=(new Date-this.start_t)/1e3,i=60>t?0:Math.floor(Math.floor(t)/60);t=(t%60).toFixed(3),this.DOM.innerHTML=i.toString()+":"+t}};
function skewbScramble(r){function a(r){for(var a=arguments.length-1,f=r[arguments[a]],n=a;n>1;n--)r[arguments[n]]=r[arguments[n-1]];r[arguments[1]]=f}function f(r,a){return r[a>>3]>>((7&a)<<2)&15}function n(r,a,f,n){for(var o=0;n>o;o++){r[o]=[];for(var v=0;a>v;v++)r[o][v]=f(v,o)}}function o(r,a,n,o,v,t,e){for(var u=Array.isArray(v),i=0,s=n+7>>>3;s>i;i++)r[i]=-1;r[a>>3]^=15<<((7&a)<<2);for(var c=0;o>=c;c++)for(var m=c+1^15,g=0;n>g;g++)if(f(r,g)==c)for(var h=0;t>h;h++)for(var l=g,d=0;e>d;d++)l=u?v[h][l]:v(l,h),15==f(r,l)&&(r[l>>3]^=m<<((7&l)<<2))}function v(r,a,n,o,t){if(0==n)return 0==r&&0==a;if(f(s,r)>n||f(c,a)>n)return!1;for(var e=0;4>e;e++)if(e!=o)for(var u=r,i=a,h=0;2>h;h++)if(u=m[e][u],i=g[e][i],v(u,i,n-1,e,t))return t.push(2*e+(1-h)),!0;return!1}function t(r,f){var n=r%12;r=~~(r/12);for(var o=[],v=5517840,t=0,e=0;5>e;e++){var u=h[5-e],i=~~(r/u),r=r-i*u,t=t^i,i=i<<2;o[e]=v>>i&15,u=(1<<i)-1,v=(v&u)+(v>>4&~u)}for(0==(1&t)?o[5]=v:(o[5]=o[4],o[4]=v),0==f&&a(o,0,3,1),2==f&&a(o,1,5,2),1==f&&a(o,0,2,4),3==f&&a(o,3,4,5),r=0,v=5517840,e=0;4>e;e++)i=o[e]<<2,r*=6-e,r+=v>>i&15,v-=1118480<<i;return 12*r+l[n][f]}function e(r,a){for(var f=[],n=[],o=0;4>o;o++)f[o]=r%3,r=~~(r/3);for(var o=0;3>o;o++)n[o]=r%3,r=~~(r/3);n[3]=(6-n[0]-n[1]-n[2])%3,f[a]=(f[a]+1)%3;var v;if(0==a){var v=n[0];n[0]=n[2]+2,n[2]=n[1]+2,n[1]=v+2}else if(1==a){var v=n[0];n[0]=n[1]+2,n[1]=n[3]+2,n[3]=v+2}else if(2==a){var v=n[0];n[0]=n[3]+2,n[3]=n[2]+2,n[2]=v+2}else if(3==a){var v=n[1];n[1]=n[2]+2,n[2]=n[3]+2,n[3]=v+2}for(var o=2;o>=0;o--)r=3*r+n[o]%3;for(var o=3;o>=0;o--)r=3*r+f[o];return r}var u,i,s=[],c=[],m=[],g=[],h=[1,1,1,3,12,60,360],l=[[6,5,10,1],[9,7,4,2],[3,11,8,0],[10,1,6,5],[0,8,11,3],[7,9,2,4],[4,2,9,7],[11,3,0,8],[1,10,5,6],[8,0,3,11],[2,4,7,9],[5,6,1,10]],d=[0,1,2,0,2,1,1,2,0,2,1,0],b=r?0:8,p=[];n(m,4320,t,4),o(s,0,4320,7,m,4,2),n(g,2187,e,4),o(c,0,2187,6,g,4,2);do u=0|4320*Math.random(),i=0|2187*Math.random();while(0==u&&0==i||d[u%12]!=(i+~~(i/3)+~~(i/9)+~~(i/27))%3);for(;99>b&&!v(u,i,b,-1,p);b++);for(var w=[],y=["L","R","B","U"],e=0;e<p.length;e++){var A=p[e]>>1,M=1&p[e];if(2==A)for(var m=0;M>=m;m++){var j=y[0];y[0]=y[1],y[1]=y[3],y[3]=j}w.push(y[A]+(1==M?"'":""))}return w.join(" ")}

var str_to_time = function(time_str) {
  var pieces = time_str.split(/:|\./g);
  return {
    minutes: parseInt(pieces[0], 10),
    seconds: parseInt(pieces[1], 10),
    milliseconds: parseInt(pieces[2], 10)
  };
};
var str_array_to_time_array = function(str_array) {
  return str_array.map(str_to_time);
};
var average_time = function(time_array) {
  var minutes = 0;
  var seconds = 0;
  var milliseconds = 0;

  for (var i = 0; i < time_array.length; i++) {
    minutes += time_array[i].minutes;
    seconds += time_array[i].seconds;
    milliseconds += time_array[i].milliseconds;
  }

  minutes /= time_array.length;
  seconds /= time_array.length;
  milliseconds /= time_array.length;

  // Minutes and seconds may be fractional. Carry the fractions down.
  seconds += (minutes - Math.floor(minutes)) * 60;
  minutes = Math.floor(minutes);
  milliseconds += (seconds - Math.floor(seconds)) * 1000;
  seconds = Math.floor(seconds);
  milliseconds = Math.round(milliseconds);
  // if milliseconds is >= 1000, add a second.
  seconds += Math.floor(milliseconds / 1000);
  milliseconds %= 1000;
  // If seconds >= 60, add a minute.
  minutes += Math.floor(seconds / 60); 
  seconds %= 60;

  return {
    minutes: minutes,
    seconds: seconds,
    milliseconds: milliseconds
  };
};

var times = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var event = ['222', '333', '333oh', '333bf', '333ft', '444', '444bf', '555', '555bf', '666', '777', 'minx', 'pyram', 'sq1', 'clock', 'skewb'];

//stored time get
if(typeof(Storage) != 'undefined') {
  if(localStorage.getItem('times') != null){
    times = JSON.parse(localStorage['times']);
  }
} else {
  $.cookie.json = true;
  if($.cookie('times') != undefined && $.cookie('times').length == 15){
    times = $.cookie('times');
  }
}

//timer and scramble initialization
var sn = 1;
var st = '333';
var timer_obj = new startTimer(document.getElementById('time'));
$.each(event, function(i, v){
	scramblers[v].initialize(null, Math);
});
var scr = function(){
  return scramblers[st].getRandomScramble().scramble_string;
};
$('#scramble').html(scr);

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
      times[sn].push($('#time').text());
      $('#scramble').html(scr);
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
    times[sn].push($('#time').text());
    $('#scramble').html(scr);
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
  scr = function(){
    return scramblers[st].getRandomScramble().scramble_string;
  };
  $('#scramble').html(scr);
  sn = event.indexOf(st);
});

//skewb change event
$('.nosel').click(function(){
  st = 'skewb';
  scr = function(){
    return skewbScramble(true);
  }
  sn = event.indexOf('skewb');
});

//change scramble
$('#scramble').click(function(){
  $('#scramble').html(scr);
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
  if($('#et').val().replace(/\d/g, '') == ':.' && $('#et').val().split(/:|\./g)[1].length <= 2 && $('#et').val().split(/:|\./g)[1].length > 0 && $('#et').val().split(/:|\./g)[2].length <= 3){
    times[sn].push($('#et').val());
    updatestats();
  }
});

//store times
window.onbeforeunload = function(){
  if(typeof(Storage) != 'undefined'){
    localStorage['times'] = JSON.stringify(times);
  }
  $.cookie('times', JSON.stringify(times));
};
  
//function for updating stats
function updatestats(){
  var m = average_time(str_array_to_time_array(times[sn]));
  var mt = m.minutes.toString() + ':' + m.seconds.toString() + '.' + m.milliseconds.toString();
  var avg, avgt;
  var sort = times[sn].slice(0).sort();
  if(times[sn].length > 0){
    $('#timelist').html('<button class="btn btn-default timeitem">' + times[sn].join('</button><button class="btn btn-default">') + '</button>');
    $('#sm').text(mt);
    $('#pb').text(sort[0]);
    $('#pw').text(sort[times[sn].length - 1]);
    if(times[sn].length > 2){
      var dup = times[sn].slice(0);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      avg = average_time(str_array_to_time_array(dup));
      avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
      $('#sa').text(avgt);
    }
    if(times[sn].length < 3){
      $('#sa').text('DNF');
    }
    if(times[sn].length > 4){
      var dup = times[sn].slice(times[sn].length - 5);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      avg = average_time(str_array_to_time_array(dup));
      avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
      $('#aof').text(avgt);
    }
    if(times[sn].length < 5){
      $('#aof').text('DNF');
    }
    if(times[sn].length > 11){
      var dup = times[sn].slice(times[sn].length - 12);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      avg = average_time(str_array_to_time_array(dup));
      avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
      $('#aot').text(avgt);
    }
    if(times[sn].length < 12){
      $('#aot').text('DNF');
    }
    if(times[sn].length > 99){
      var dup = times[sn].slice(times[sn].length - 100);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
      avg = average_time(str_array_to_time_array(dup));
      avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
      $('#aoh').text(avgt);
    }
    if(times[sn].length < 100){
      $('#aoh').text('DNF');
    }
  } else {
    $('#timelist').text('None submitted.');
    $('.modal-body span:not(#timelist, .input-group-btn)').text('DNF');
  }
}

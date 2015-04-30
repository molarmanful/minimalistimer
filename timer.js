var startTimer=function(t){this.start_t=null,this.interval=null,this.DOM=t,this.toggle=function(){null==this.interval?this.start():this.end()},this.start=function(){this.start_t=new Date;var t=this,i=function(){t.update()};this.interval=setInterval(i,10)},this.end=function(){clearInterval(this.interval),this.interval=null},this.update=function(){var t=(new Date-this.start_t)/1e3,i=60>t?0:Math.floor(Math.floor(t)/60);t=(t%60).toFixed(3),this.DOM.innerHTML=i.toString()+":"+t}};

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

var times = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var event = ['222', '333', '333oh', '333bf', '333ft', '444', '444bf', '555', '555bf', '666', '777', 'minx', 'pyram', 'sq1', 'clock'];

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
var st = "333";
var sn = 1;
var timer_obj = new startTimer(document.getElementById('time'));
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
    times[sn].push($('#time').text());
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

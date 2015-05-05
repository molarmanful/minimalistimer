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
function stms(secs){
	var divisor_for_minutes = secs % (60 * 60);
	var minutes = Math.floor(divisor_for_minutes / 60);
	var divisor_for_seconds = divisor_for_minutes % 60;
	var seconds = Math.round(divisor_for_seconds * 1000) / 1000;
	return minutes.toString() + ':' + seconds.toString();
}

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
  if(e.keyCode == 32 && record == true && !$('#myModal').is(':visible')){
    timer_obj.end();
  }
});
$(document).keyup(function(e){
  if(e.keyCode == 32 && !$('#myModal').is(':visible')){
    if(record == false){
      record = true;
      clearInterval(ins);
      timer_obj.start();
      $('.dis').fadeTo('fast', 0.01);
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

//penalties
$('#pen').click(function(){
  var orig = times[sn][$('#sel').index()];
  if($(this).text() == 'No penalty'){
    pt = $('#sel').text().split(':')[0] + ':' + (parseFloat($('#sel').text().split(':')[1]) + 2).toString();
    $(this).text('+2');
    $('#sel').text(pt);
    times[sn][$('#sel').index()] = pt;
  }
  else if($(this).text() == '+2'){
    $(this).text('DNF');
    $('#sel').text(pt);
    times[sn][$('#sel').index()] = 'DNF';
  }
  else {
    $(this).text('No penalty');
    $('#sel').text('DNF');
    times[sn][$('#sel').index()] = orig;
  }
});
$('#sel').click(function(){
  $('.tdp').fadeOut('fast');
  $(this).removeClass('btn-primary');
  $(this).removeAttr('id');
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
  var eva = $('#et').val();
  //blank
  if(eva.match(/^\s+$/g)){
    if(!$('.input-group').hasClass('has-error')){
      $('.input-group').addClass('has-error');
    }
    if(!$('#subet').hasClass('btn-danger')){
      $('#subet').addClass('btn-danger');
    }
    if(!$('.help').hasClass('text-danger')){
      $('.help').fadeIn('fast').addClass('text-danger').html('Please enter a time.');
    } else {
    	$('.help').html('Please enter a time.');
    }
  }
  //invalid
  else if(eva.match(/[^0-9:.]/g) || !eva.match(/dnf/ig) || parseInt(eva) == 0){
    if(!$('.input-group').hasClass('has-error')){
      $('.input-group').addClass('has-error');
    }
    if(!$('#subet').hasClass('btn-danger')){
      $('#subet').addClass('btn-danger');
    }
    if(!$('.help').hasClass('text-danger')){
      $('.help').fadeIn('fast').addClass('text-danger').html('Please enter a valid time.');
    } else {
      $('.help').html('Please enter a valid time.');
    }
  }
  //no minutes
  else if(!eva.match(':') && !eva.match(/dnf/ig)){
    eva = stms(parseFloat(eva));
    subt(eva);
  }
  //dnf
  else if(eva.match(/dnf/ig)){
    subt('DNF');
  }
  //minutes
  else {
    subt(eva);
  }
  $('#et').val('');
});
function subt(x){
  times[sn].push(x);
  $('.input-group').removeClass('has-error');
  $('#subet').removeClass('btn-danger');
  $('.help').fadeIn('fast').removeClass('text-danger').html('Time submitted successfully.').promise().done(function(){
    setTimeout(function(){
      $('.help').fadeOut('slow');
    }, 1000);
  });
  updatestats();
}

//store times
window.onbeforeunload = function(){
  if(typeof(Storage) != 'undefined'){
    localStorage['times'] = JSON.stringify(times);
  }
  $.cookie('times', JSON.stringify(times));
};
  
//function for updating stats
function updatestats(){
  $.each(times[sn], function(i, v){
    var val = v.split(':');
    times[sn][i] = val[0] + ':' + parseFloat(val[1]).toFixed(3).toString();
  });
  var m = average_time(str_array_to_time_array(times[sn]));
  var mt = m.minutes.toString() + ':' + m.seconds.toString() + '.' + m.milliseconds.toString();
  var avg, avgt;
  var sort = times[sn].slice(0).sort();
  if(times[sn].length == 0 || isdnf(0) || (times[sn].length == 1 && times[sn][0] == 'DNF')){
    $('#timelist').text('None submitted.');
    $('#sm, #pb, #pw, #sa, #sm, #aof, #aot, #aoh').text('DNF');
  }
  if(times[sn].length > 0){
    $('#timelist').html('<button class="btn btn-default timeitem">' + times[sn].join('</button><button class="btn btn-default timeitem">') + '</button>');
    $('.timeitem:not(#sel)').click(function(){
      $('#pen').text('No penalty');
      $('.tdp').fadeIn('fast');
      $(this).addClass('btn-primary');
      $('.timeitem').removeAttr('id');
      $(this).attr('id', 'sel');
    });
    $('#sm').text(mt);
    $('#pb').text(sort[0]);
    $('#pw').text(sort[times[sn].length - 1]);
  } 
  if(times[sn].length > 2){
    var dup = times[sn].slice(0);
    dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
    avg = average_time(str_array_to_time_array(dup));
    avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
    $('#sa').text(avgt);
  }
  if(times[sn].length < 3 || isdnf(0)){
    $('#sa').text('DNF');
  }
  if(times[sn].length > 4){
    var dup = times[sn].slice(times[sn].length - 5);
    dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
    avg = average_time(str_array_to_time_array(dup));
    avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
    $('#aof').text(avgt);
  }
  if(times[sn].length < 5 || isdnf(times[sn].length - 5)){
    $('#aof').text('DNF');
  }
  if(times[sn].length > 11){
    var dup = times[sn].slice(times[sn].length - 12);
    dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
    avg = average_time(str_array_to_time_array(dup));
    avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
    $('#aot').text(avgt);
  }
  if(times[sn].length < 12 || isdnf(times[sn].length - 12)){
    $('#aot').text('DNF');
  }
  if(times[sn].length > 99){
    var dup = times[sn].slice(times[sn].length - 100);
    dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1);
    avg = average_time(str_array_to_time_array(dup));
    avgt = avg.minutes.toString() + ':' + avg.seconds.toString() + '.' + avg.milliseconds.toString();
    $('#aoh').text(avgt);
  }
  if(times[sn].length < 100 || isdnf(times[sn].length - 100)){
    $('#aoh').text('DNF');
  }
}
function isdnf(x){
  var y = times[sn].slice(x);
  var z = 0;
  $.each(y, function(i, v){
    if(v == 'DNF'){
      z++;
    }
    if(z > 1){
      return true;
    } else {
      return false;
    }
  });
}

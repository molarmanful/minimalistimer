var startTimer=function(t){this.start_t=null,this.interval=null,this.DOM=t,this.toggle=function(){null==this.interval?this.start():this.end()},this.start=function(){this.start_t=new Date;var t=this,i=function(){t.update()};this.interval=setInterval(i,10)},this.end=function(){clearInterval(this.interval),this.interval=null},this.update=function(){var t=(new Date-this.start_t)/1e3,i=60>t?0:Math.floor(Math.floor(t)/60);t=(t%60).toFixed(3),this.DOM.innerHTML=i.toString()+":"+t}};
!function(e){if(e){var t=80,n=45;e.fn.jChester=function(o,i){if(!this.is("div"))throw"jChester can only be applied to divs";e.isPlainObject(o)&&(i=o,o=null);var l=["millis","moveCount","puzzlesSolvedCount","puzzlesAttemptedCount"],r=this,s=e.extend({},e.fn.jChester.defaults,i),a=this.data("jChesterData");a||(a={},this.data("jChesterData",a),a.$form=e('<form class="form-inline" role="form">'),r.append(a.$form),a.$form.append(e('<div class="form-group"><input type="text" name="millis-mask" class="form-control" readonly tabindex="-1"></input><input name="millis" type="text" class="form-control"></input></div>')),a.$form.find('input[name="millis-mask"]').css({position:"absolute",backgroundColor:"white",fontFamily:"monospace",textAlign:"right"}),a.$form.find('input[name="millis"]').css({position:"relative",backgroundColor:"transparent",fontFamily:"monospace",textAlign:"right"}),a.$form.append(e('<div class="form-group"><input name="moveCount" type="text" class="form-control"></input></div>')),a.$form.append(document.createTextNode(" ")),a.$form.append(e('<div class="form-group"><input name="puzzlesSolvedCount" min="0" type="number" class="form-control"></input></div>')),a.$form.append(e('<span name="puzzlesAttemptedCount">&nbsp;/&nbsp;</span>')),a.$form.append(e('<div class="form-group"><input name="puzzlesAttemptedCount" min="0" type="number" class="form-control"></input></div>')),a.$form.append(e('<span class="help-block">')),a.$form.find('input[type="text"]').width(t),a.$form.find('input[type="number"]').width(n),a.$form.find(".form-group").css({display:"inline-block"}),a.inputChanged=function(){var t={},n=null;if(a.editableSolveTimeFields.millis){var o=a.$form.find('input[name="millis"]'),i=a.$form.find('input[name="millis-mask"]'),r=o.val();if(r=r.replace(/ /g,""),r.match(/^\d+$/)){var s=7;r.length>s&&(r=r.substring(0,s));var u=r.length,m=r.substring(u-2,u),p=r.substring(u-4,u-2),d=r.substring(u-6,u-4),f=r.substring(0,u-6),v="",h="",C=function(e,t){for(var n=0;n<t-e.length;n++)v+=" ",h+="0";v+=e,h+=e};f.length>0&&(C(f,1),C(":",0)),d.length>0&&(C(d,h.length>0?2:1),C(":",0)),C(p,h.length>0?2:1),C(".",0),C(m,2),o.val(v.replace(/[.:]/g," ")),i.val(h),r=v.replace(/ /g,"0")}else r!==o.val()&&o.val(r),i.val("");try{n=jChester.stopwatchFormatToSolveTime(r)}catch(z){t.millis=0===r.length?"Please enter a time.":z}}if(a.editableSolveTimeFields.moveCount){var c=a.$form.find('input[name="moveCount"]').val();try{n?e.extend(n,jChester.stopwatchFormatToSolveTime(c,!0)):n=jChester.stopwatchFormatToSolveTime(c,!0)}catch(z){t.moveCount=0===c.length?"Please enter a number of moves.":z}}var g,S;if(a.hideField={},n)if(jChester.solveTimeIsDNF(n))g="0",S="1",a.hideField.puzzlesSolvedCount=!0,a.hideField.puzzlesAttemptedCount=!0;else if(jChester.solveTimeIsDNS(n))g="0",S="0",a.hideField.puzzlesSolvedCount=!0,a.hideField.puzzlesAttemptedCount=!0;else if(a.editableSolveTimeFields.puzzlesSolvedCount||a.editableSolveTimeFields.puzzlesAttemptedCount){var I=a.$form.find('input[name="puzzlesSolvedCount"]');g=I.val();var T=a.$form.find('input[name="puzzlesAttemptedCount"]');S=T.val()}else g="1",S="1";else g=null,S=null,a.hideField.puzzlesSolvedCount=!0,a.hideField.puzzlesAttemptedCount=!0;if(n){if(jChester._isInt(g)){var $=parseInt(g);n.puzzlesSolvedCount=$}else t.puzzlesSolvedCount="Invalid number of puzzles solved.";if(jChester._isInt(S)){var b=parseInt(S);n.puzzlesAttemptedCount=b,!t.puzzlesSolvedCount&&n.puzzlesSolvedCount>n.puzzlesAttemptedCount&&(t.puzzlesAttemptedCount="Cannot have more puzzles solved than attemped.")}else t.puzzlesAttemptedCount="Invalid number of puzzles attempted."}var F=function(e){return t[e]};a.validationErrors=l.filter(F).map(F),a.validationErrors.length>0&&(n=null),a.solveTime=n,a.$form.find(".help-block").text(a.validationErrors.join(" ")),a.$form.find(".input-group").removeClass("has-error"),l.forEach(function(e){var n=a.$form.find('input[name="'+e+'"]'),o=n.parent(".form-group"),i=!!t[e];o.toggleClass("has-error",i)}),l.forEach(function(e){var t=a.editableSolveTimeFields[e]&&!a.hideField[e];t=!!t,a.$form.find('input[name="'+e+'"]').parent().toggle(t),a.$form.find('span[name="'+e+'"]').toggle(t)})},a.$form.find("input").on("input",function(){a.inputChanged(),r.trigger("solveTimeInput",[a.validationErrors,a.solveTime])}),a.$form.find("input").on("keydown",function(t){var n=e(t.currentTarget);("millis"===n.attr("name")||"moveCount"===n.attr("name"))&&!t.altKey&&!t.ctrlKey&!t.metaKey&&(106===t.which||68===t.which?(n.val("DNF"),n.select(),a.inputChanged(),r.trigger("solveTimeInput",[[],a.solveTime]),t.preventDefault()):(111===t.which||83===t.which)&&(n.val("DNS"),n.select(),a.inputChanged(),r.trigger("solveTimeInput",[[],a.solveTime]),t.preventDefault()))}),this.attr("tabindex","-1"),this.focus(function(){var t=e(this).find("input:visible:not([readonly])").first();t.focus(),t.select()}));var u=function(e){if(null===e)a.$form.find('input[name="millis"]').val(""),a.$form.find('input[name="moveCount"]').val(""),a.$form.find('input[name="puzzlesSolvedCount"]').val(""),a.$form.find('input[name="puzzlesAttemptedCount"]').val(""),a.inputChanged();else if(e){var t="";jChester.solveTimeIsDNF(e)?t="DNF":jChester.solveTimeIsDNS(e)&&(t="DNS");var n;n=e.millis?jChester.solveTimeToStopwatchFormat(e,!0):t,a.$form.find('input[name="millis"]').val(n);var o;o=e.moveCount?e.moveCount:t,a.$form.find('input[name="moveCount"]').val(o),a.$form.find('input[name="puzzlesSolvedCount"]').val(e.puzzlesSolvedCount),a.$form.find('input[name="puzzlesAttemptedCount"]').val(e.puzzlesAttemptedCount),a.inputChanged()}};if("getSolveTime"===o)return a.solveTime;if("setSolveTime"===o){var m=arguments[1];return void u(m)}if("getValidationErrors"===o)return a.validationErrors;if(o)throw"Unrecognized method: "+o;return a.editableSolveTimeFields=s.editableSolveTimeFields,a.inputChanged(),u(s.solveTime),r},e.fn.jChester.defaults={solveTime:null,editableSolveTimeFields:{millis:!0}}}}("undefined"==typeof jQuery?null:jQuery);var MILLIS_PER_SECOND=1e3,MILLIS_PER_MINUTE=60*MILLIS_PER_SECOND,MILLIS_PER_HOUR=60*MILLIS_PER_MINUTE;jChester={stopwatchFormatToSolveTime:function(e,t){if(0===e.length)return null;if("DNF"===e.toUpperCase())return{puzzlesSolvedCount:0,puzzlesAttemptedCount:1};if("DNS"===e.toUpperCase())return{puzzlesSolvedCount:0,puzzlesAttemptedCount:0};if(t){if(!jChester._isInt(e))throw"Invalid move count.";var n=parseInt(e);if(0>=n)throw"Move count must be greater than zero.";return{moveCount:n}}var o=e.match(/^(?:(\d*):)??(?:(\d*):)?(\d+)?(?:[.,](\d*))?$/);if(!o)throw"Invalid stopwatch format.";var i=parseInt(o[1]||"0"),l=parseInt(o[2]||"0"),r=parseInt(o[3]||"0"),s=o[4]||"",a=parseInt(s||"0"),u=Math.pow(10,s.length-3),m=a?Math.round(a/u):0,p=i*MILLIS_PER_HOUR+l*MILLIS_PER_MINUTE+r*MILLIS_PER_SECOND+m;if(0>=p)throw"Time must be greater than zero.";var d=Math.min(3,s.length);return{millis:p,decimals:d}},solveTimeIsDNF:function(e){if("undefined"!=typeof e.puzzlesSolvedCount&&"undefined"!=typeof e.puzzlesAttemptedCount)if(1===e.puzzlesAttemptedCount){if(0===e.puzzlesSolvedCount)return!0}else if(e.puzzlesAttemptedCount>1){var t=e.puzzlesAttemptedCount-e.puzzlesSolvedCount,n=e.puzzlesSolvedCount-t;if(0>n||1===e.puzzlesSolvedCount)return!0}return!1},solveTimeIsDNS:function(e){return"undefined"!=typeof e.puzzlesAttemptedCount&&0===e.puzzlesAttemptedCount?!0:!1},solveTimeIsDN:function(e){return jChester.solveTimeIsDNF(e)||jChester.solveTimeIsDNS(e)},solveTimeToStopwatchFormat:function(e,t){function n(e,t,n){for(var o=e+"";o.length<n;)o=t+o;return o}if(!e)return"";if(!t){if(jChester.solveTimeIsDNF(e))return"DNF";if(jChester.solveTimeIsDNS(e))return"DNS"}if(e.moveCount)return e.moveCount.toFixed(e.decimals||0);var o=e.millis,i=Math.floor(o/MILLIS_PER_HOUR);o%=MILLIS_PER_HOUR;var l=Math.floor(o/MILLIS_PER_MINUTE);o%=MILLIS_PER_MINUTE;var r=Math.floor(o/MILLIS_PER_SECOND);o%=MILLIS_PER_SECOND;var s="";s.length>0?s+=":"+n(i,"0",2):i&&(s+=i),s.length>0?s+=":"+n(l,"0",2):l&&(s+=l),s+=s.length>0?":"+n(r,"0",2):r;var a=e.decimals;if(a>0){a=Math.min(3,a);var u=n(o,"0",3);s+=".";for(var m=0;a>m;m++)s+=u.charAt(m)}return s},_isInt:function(e){return 0===e.length?!1:+e%1===0}}

var stt = function(a) {
  return a.map(function(s) {
    return jChester.stopwatchFormatToSolveTime(s).millis.toFixed(3);
  });
};
Array.prototype.average = function(){
  var sum = 0, j = 0;
  for(var i = 0; i < this.length, isFinite(this[i]); i++){
    sum += parseFloat(this[i]); ++j;
  }
  return j ? sum / j : 0;
};

var times = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
var ev = ['222', '333', '333oh', '333bf', '333ft', '444', '444bf', '555', '555bf', '666', '777', 'minx', 'pyram', 'sq1', 'clock', 'skewb'];

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
var st = '333';
var sn = 1;
var timer_obj = new startTimer(document.getElementById('time'));
$.each(ev, function(i, v){
  scramblers[v].initialize(null, Math);
});
var scr = function(){
  return scramblers[st].getRandomScramble().scramble_string;
};
$('#scramble').html(scr);
$('.navbar-brand .type').html('<span class="cubing-icon icon-333"></span> 3x3x3');

//no spacebar scrolls allowed!
$(document).keydown(function(e) {
  if(e.keyCode == 32) {
    return false;
  }
});

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
      record = true;
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
      times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime($('#time').text())));
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
    times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime($('#time').text())));
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
$('#st li a').click(function(){
  st = $(this).attr('class');
  sn = $.inArray(st, ev);
  scr = function(){
    return scramblers[st].getRandomScramble().scramble_string;
  };
  $('#scramble').html(scr);
  $('.navbar-brand .type').html($(this).html());
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
  else if(eva.match(/[^0-9:.]/g) || parseInt(eva) == 0){
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
  else {
    subt(eva);
  }
  $('#et').val('');
});
function subt(x){
  times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime(x)));
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
  var sort = times[sn].slice(0).sort();
  if(times[sn].length > 0){
    $('#timelist').html('<button class="btn btn-default timeitem">' + times[sn].join('</button><button class="btn btn-default timeitem">') + '</button>');
    $('#sm').text(jChester.solveTimeToStopwatchFormat({millis: stt(sort).average(), decimals: 3}));
    $('#pb').text(sort[0]);
    $('#pw').text(sort[times[sn].length - 1]);
    if(times[sn].length > 2){
      var dup = times[sn].slice(0);
      dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
      dup.splice(dup.indexOf(sort[0]), 1);
      $('#sa').text(jChester.solveTimeToStopwatchFormat({millis: stt(dup).average(), decimals: 3}));
    }
    if(times[sn].length < 3){
      $('#sa').text('DNF');
    }
    if(times[sn].length > 4){
      var dup = times[sn].slice(times[sn].length - 5);
      dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
      dup.splice(dup.indexOf(sort[0]), 1);
      $('#aof').text(jChester.solveTimeToStopwatchFormat({millis: stt(dup).average(), decimals: 3}));
    }
    if(times[sn].length < 5){
      $('#aof').text('DNF');
    }
    if(times[sn].length > 11){
      var dup = times[sn].slice(times[sn].length - 12);
      dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
      dup.splice(dup.indexOf(sort[0]), 1);
      $('#aot').text(jChester.solveTimeToStopwatchFormat({millis: stt(dup).average(), decimals: 3}));
    }
    if(times[sn].length < 12){
      $('#aot').text('DNF');
    }
    if(times[sn].length > 99){
      var dup = times[sn].slice(times[sn].length - 100);
      dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
      dup.splice(dup.indexOf(sort[0]), 1);
      $('#aoh').text(jChester.solveTimeToStopwatchFormat({millis: stt(dup).average(), decimals: 3}));
    }
    if(times[sn].length < 100){
      $('#aoh').text('DNF');
    }
  } else {
    $('#timelist').text('None submitted.');
    $('.modal-body span:not(#timelist, .input-group-btn)').text('DNF');
  }
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}
function updatestats(){
  if(times[sn].length > 0){
    $('#timelist').html(times[sn].join());
    $('#sm').text(Math.floor(times[sn].average() * 1000) / 1000);
    $('#pb').text(Math.min.apply(Math, times[sn]));
    $('#pw').text(Math.max.apply(Math, times[sn]));
    if(times[sn].length > 2){
      var dup = times[sn].slice(0);
      dup.splice(dup.indexOf('DNF'), 1);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1).splice(dup.indexOf('DNF'), 1);
      $('#sa').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 3){
      $('#sa').text('DNF');
    }
    if(times[sn].length > 4){
      var dup = times[sn].slice(times[sn].length - 5);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1).splice(dup.indexOf('DNF'), 1);
      $('#aof').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 5){
      $('#aof').text('DNF');
    }
    if(times[sn].length > 11){
      var dup = times[sn].slice(times[sn].length - 12);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1).splice(dup.indexOf('DNF'), 1);
      $('#aot').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 12){
      $('#aot').text('DNF');
    }
    if(times[sn].length > 99){
      var dup = times[sn].slice(times[sn].length - 100);
      dup.splice(dup.indexOf(Math.max.apply(Math, dup)), 1).splice(dup.indexOf(Math.min.apply(Math, dup)), 1).splice(dup.indexOf('DNF'), 1);
      $('#aoh').text(Math.floor(dup.average() * 1000) / 1000);
    }
    if(times[sn].length < 100){
      $('#aoh').text('DNF');
    }
  } else {
    $('#timelist').text('None submitted.');
    $('.modal-body span:not(#timelist)').text('DNF');
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
var times = [[],[],[],[],[],[],[],[],[],[]];
var event = ['222', '333', '444', '555', '666', '777', 'minx', 'pyram', 'sq1', 'clock'];

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
scramblers["444"].initialize(null, Math);
scramblers["555"].initialize(null, Math);
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
    	$('.dis, .plus2, .dnf').fadeTo('fast', 1);
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
    $('.dis, .plus2, .dnf').fadeTo('fast', 1);
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
$('#st li a').click(function(){
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

//cookie store
window.onbeforeunload = function(){
  $.cookie('times', times);
};
  

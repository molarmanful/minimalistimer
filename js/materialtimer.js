var time, scramble;
var startTimer=function(e){this.start_t=null,this.interval=null,this.DOM=e,this.toggle=function(){null==this.interval?this.start():this.end()},this.start=function(e){this.start_t=new Date;var t=this,n=function(){t.update(e)};this.interval=setInterval(n,10)},this.end=function(){clearInterval(this.interval),this.interval=null},this.update=function(e){var t=(new Date-this.start_t)/1e3,n=60>t?0:Math.floor(Math.floor(t)/60);t=(t%60).toFixed(3),this.DOM.innerHTML=n.toString()+":"+t,time=n.toString()+":"+t,void 0!=e&&(this.DOM.innerHTML=e)}};!function(e){if(e){var t=80,n=45;e.fn.jChester=function(o,i){if(!this.is("div"))throw"jChester can only be applied to divs";e.isPlainObject(o)&&(i=o,o=null);var r=["millis","moveCount","puzzlesSolvedCount","puzzlesAttemptedCount"],l=this,a=e.extend({},e.fn.jChester.defaults,i),s=this.data("jChesterData");s||(s={},this.data("jChesterData",s),s.$form=e('<form class="form-inline" role="form">'),l.append(s.$form),s.$form.append(e('<div class="form-group"><input type="text" name="millis-mask" class="form-control" readonly tabindex="-1"></input><input name="millis" type="text" class="form-control"></input></div>')),s.$form.find('input[name="millis-mask"]').css({position:"absolute",backgroundColor:"white",fontFamily:"monospace",textAlign:"right"}),s.$form.find('input[name="millis"]').css({position:"relative",backgroundColor:"transparent",fontFamily:"monospace",textAlign:"right"}),s.$form.append(e('<div class="form-group"><input name="moveCount" type="text" class="form-control"></input></div>')),s.$form.append(document.createTextNode(" ")),s.$form.append(e('<div class="form-group"><input name="puzzlesSolvedCount" min="0" type="number" class="form-control"></input></div>')),s.$form.append(e('<span name="puzzlesAttemptedCount">&nbsp;/&nbsp;</span>')),s.$form.append(e('<div class="form-group"><input name="puzzlesAttemptedCount" min="0" type="number" class="form-control"></input></div>')),s.$form.append(e('<span class="help-block">')),s.$form.find('input[type="text"]').width(t),s.$form.find('input[type="number"]').width(n),s.$form.find(".form-group").css({display:"inline-block"}),s.inputChanged=function(){var t={},n=null;if(s.editableSolveTimeFields.millis){var o=s.$form.find('input[name="millis"]'),i=s.$form.find('input[name="millis-mask"]'),l=o.val();if(l=l.replace(/ /g,""),l.match(/^\d+$/)){var a=7;l.length>a&&(l=l.substring(0,a));var u=l.length,m=l.substring(u-2,u),d=l.substring(u-4,u-2),p=l.substring(u-6,u-4),f=l.substring(0,u-6),v="",h="",c=function(e,t){for(var n=0;n<t-e.length;n++)v+=" ",h+="0";v+=e,h+=e};f.length>0&&(c(f,1),c(":",0)),p.length>0&&(c(p,h.length>0?2:1),c(":",0)),c(d,h.length>0?2:1),c(".",0),c(m,2),o.val(v.replace(/[.:]/g," ")),i.val(h),l=v.replace(/ /g,"0")}else l!==o.val()&&o.val(l),i.val("");try{n=jChester.stopwatchFormatToSolveTime(l)}catch(C){t.millis=0===l.length?"Please enter a time.":C}}if(s.editableSolveTimeFields.moveCount){var z=s.$form.find('input[name="moveCount"]').val();try{n?e.extend(n,jChester.stopwatchFormatToSolveTime(z,!0)):n=jChester.stopwatchFormatToSolveTime(z,!0)}catch(C){t.moveCount=0===z.length?"Please enter a number of moves.":C}}var g,I;if(s.hideField={},n)if(jChester.solveTimeIsDNF(n))g="0",I="1",s.hideField.puzzlesSolvedCount=!0,s.hideField.puzzlesAttemptedCount=!0;else if(jChester.solveTimeIsDNS(n))g="0",I="0",s.hideField.puzzlesSolvedCount=!0,s.hideField.puzzlesAttemptedCount=!0;else if(s.editableSolveTimeFields.puzzlesSolvedCount||s.editableSolveTimeFields.puzzlesAttemptedCount){var S=s.$form.find('input[name="puzzlesSolvedCount"]');g=S.val();var T=s.$form.find('input[name="puzzlesAttemptedCount"]');I=T.val()}else g="1",I="1";else g=null,I=null,s.hideField.puzzlesSolvedCount=!0,s.hideField.puzzlesAttemptedCount=!0;if(n){if(jChester._isInt(g)){var w=parseInt(g);n.puzzlesSolvedCount=w}else t.puzzlesSolvedCount="Invalid number of puzzles solved.";if(jChester._isInt(I)){var b=parseInt(I);n.puzzlesAttemptedCount=b,!t.puzzlesSolvedCount&&n.puzzlesSolvedCount>n.puzzlesAttemptedCount&&(t.puzzlesAttemptedCount="Cannot have more puzzles solved than attemped.")}else t.puzzlesAttemptedCount="Invalid number of puzzles attempted."}var F=function(e){return t[e]};s.validationErrors=r.filter(F).map(F),s.validationErrors.length>0&&(n=null),s.solveTime=n,s.$form.find(".help-block").text(s.validationErrors.join(" ")),s.$form.find(".input-group").removeClass("has-error"),r.forEach(function(e){var n=s.$form.find('input[name="'+e+'"]'),o=n.parent(".form-group"),i=!!t[e];o.toggleClass("has-error",i)}),r.forEach(function(e){var t=s.editableSolveTimeFields[e]&&!s.hideField[e];t=!!t,s.$form.find('input[name="'+e+'"]').parent().toggle(t),s.$form.find('span[name="'+e+'"]').toggle(t)})},s.$form.find("input").on("input",function(){s.inputChanged(),l.trigger("solveTimeInput",[s.validationErrors,s.solveTime])}),s.$form.find("input").on("keydown",function(t){var n=e(t.currentTarget);("millis"===n.attr("name")||"moveCount"===n.attr("name"))&&!t.altKey&&!t.ctrlKey&!t.metaKey&&(106===t.which||68===t.which?(n.val("DNF"),n.select(),s.inputChanged(),l.trigger("solveTimeInput",[[],s.solveTime]),t.preventDefault()):(111===t.which||83===t.which)&&(n.val("DNS"),n.select(),s.inputChanged(),l.trigger("solveTimeInput",[[],s.solveTime]),t.preventDefault()))}),this.attr("tabindex","-1"),this.focus(function(){var t=e(this).find("input:visible:not([readonly])").first();t.focus(),t.select()}));var u=function(e){if(null===e)s.$form.find('input[name="millis"]').val(""),s.$form.find('input[name="moveCount"]').val(""),s.$form.find('input[name="puzzlesSolvedCount"]').val(""),s.$form.find('input[name="puzzlesAttemptedCount"]').val(""),s.inputChanged();else if(e){var t="";jChester.solveTimeIsDNF(e)?t="DNF":jChester.solveTimeIsDNS(e)&&(t="DNS");var n;n=e.millis?jChester.solveTimeToStopwatchFormat(e,!0):t,s.$form.find('input[name="millis"]').val(n);var o;o=e.moveCount?e.moveCount:t,s.$form.find('input[name="moveCount"]').val(o),s.$form.find('input[name="puzzlesSolvedCount"]').val(e.puzzlesSolvedCount),s.$form.find('input[name="puzzlesAttemptedCount"]').val(e.puzzlesAttemptedCount),s.inputChanged()}};if("getSolveTime"===o)return s.solveTime;if("setSolveTime"===o){var m=arguments[1];return void u(m)}if("getValidationErrors"===o)return s.validationErrors;if(o)throw"Unrecognized method: "+o;return s.editableSolveTimeFields=a.editableSolveTimeFields,s.inputChanged(),u(a.solveTime),l},e.fn.jChester.defaults={solveTime:null,editableSolveTimeFields:{millis:!0}}}}("undefined"==typeof jQuery?null:jQuery);var MILLIS_PER_SECOND=1e3,MILLIS_PER_MINUTE=60*MILLIS_PER_SECOND,MILLIS_PER_HOUR=60*MILLIS_PER_MINUTE;jChester={stopwatchFormatToSolveTime:function(e,t){if(0===e.length)return null;if("DNF"===e.toUpperCase())return{puzzlesSolvedCount:0,puzzlesAttemptedCount:1};if("DNS"===e.toUpperCase())return{puzzlesSolvedCount:0,puzzlesAttemptedCount:0};if(t){if(!jChester._isInt(e))throw"Invalid move count.";var n=parseInt(e);if(0>=n)throw"Move count must be greater than zero.";return{moveCount:n}}var o=e.match(/^(?:(\d*):)??(?:(\d*):)?(\d+)?(?:[.,](\d*))?$/);if(!o)throw"Invalid stopwatch format.";var i=parseInt(o[1]||"0"),r=parseInt(o[2]||"0"),l=parseInt(o[3]||"0"),a=o[4]||"",s=parseInt(a||"0"),u=Math.pow(10,a.length-3),m=s?Math.round(s/u):0,d=i*MILLIS_PER_HOUR+r*MILLIS_PER_MINUTE+l*MILLIS_PER_SECOND+m;if(0>=d)throw"Time must be greater than zero.";var p=Math.min(3,a.length);return{millis:d,decimals:p}},solveTimeIsDNF:function(e){if("undefined"!=typeof e.puzzlesSolvedCount&&"undefined"!=typeof e.puzzlesAttemptedCount)if(1===e.puzzlesAttemptedCount){if(0===e.puzzlesSolvedCount)return!0}else if(e.puzzlesAttemptedCount>1){var t=e.puzzlesAttemptedCount-e.puzzlesSolvedCount,n=e.puzzlesSolvedCount-t;if(0>n||1===e.puzzlesSolvedCount)return!0}return!1},solveTimeIsDNS:function(e){return"undefined"!=typeof e.puzzlesAttemptedCount&&0===e.puzzlesAttemptedCount?!0:!1},solveTimeIsDN:function(e){return jChester.solveTimeIsDNF(e)||jChester.solveTimeIsDNS(e)},solveTimeToStopwatchFormat:function(e,t){function n(e,t,n){for(var o=e+"";o.length<n;)o=t+o;return o}if(!e)return"";if(!t){if(jChester.solveTimeIsDNF(e))return"DNF";if(jChester.solveTimeIsDNS(e))return"DNS"}if(e.moveCount)return e.moveCount.toFixed(e.decimals||0);var o=e.millis,i=Math.floor(o/MILLIS_PER_HOUR);o%=MILLIS_PER_HOUR;var r=Math.floor(o/MILLIS_PER_MINUTE);o%=MILLIS_PER_MINUTE;var l=Math.floor(o/MILLIS_PER_SECOND);o%=MILLIS_PER_SECOND;var a="";a.length>0?a+=":"+n(i,"0",2):i&&(a+=i),a.length>0?a+=":"+n(r,"0",2):r&&(a+=r),a+=a.length>0?":"+n(l,"0",2):l;var s=e.decimals;if(s>0){s=Math.min(3,s);var u=n(o,"0",3);a+=".";for(var m=0;s>m;m++)a+=u.charAt(m)}return a},_isInt:function(e){return 0===e.length?!1:+e%1===0}};var randomInt=function(){function e(){var e="WARNING: randomInt is falling back to Math.random for random number generation.";console.warn?console.warn(e):console.log(e),r=!0}function t(e){if("number"!=typeof e||0>e||Math.floor(e)!==e)throw new Error("randomInt.below() not called with a positive integer value.");if(e>i)throw new Error("Called randomInt.below() with max == "+e+", which is larger than Javascript can handle with integer precision.")}function n(e){t(e);var r=o(),l=Math.floor(i/e)*e;return l>r?r%e:n(e)}var o,i=9007199254740992,r=!1,l=window.crypto||window.msCrypto||window.cryptoUint32;if(l)o=function(){var e=2097152,t=new Uint32Array(2);return l.getRandomValues(t),t[0]*e+(t[1]>>21)};else{var a="ERROR: randomInt could not find a suitable crypto.getRandomValues() function.";console.error?console.error(a):console.log(a),o=function(){if(r)return Math.floor(Math.random()*i);throw new Error("randomInt cannot get random values.")}}return{below:n,enableInsecureMathRandomFallback:e}}(),stt=function(e){return e.map(function(e){return jChester.stopwatchFormatToSolveTime(e).millis.toFixed(3)})};Array.prototype.average=function(){for(var e=0,t=0,n=0;n<this.length,isFinite(this[n]);n++)e+=parseFloat(this[n]),++t;return t?e/t:0};

var times = [];
var scrambles = [];
var ev = ['222', '333', '333oh', '333bf', '333ft', '444', '444bf', '555', '555bf', '666', '777', 'minx', 'pyram', 'sq1', 'clock', 'skewb'];

//stored time get
if (typeof (Storage) != 'undefined') {
    if (localStorage.getItem('times') != null && JSON.parse(localStorage['times']).length == ev.length) {
        times = JSON.parse(localStorage['times']);
    }
    if (localStorage.getItem('scrambles') != null && JSON.parse(localStorage['scrambles']).length == ev.length) {
        scrambles = JSON.parse(localStorage['scrambles']);
    }
    if (localStorage.getItem('csstxt') != null) {
        $('#csstxt').val(localStorage['csstxt']);
        $('#ccss').html(localStorage['csstxt']);
    }
    if (localStorage.getItem('jstxt') != null) {
        $('#jstxt').val(localStorage['jstxt']);
        eval(localStorage['jstxt']);
    }
} else {
    $.cookie.json = true;
    if ($.cookie('times') != undefined && $.cookie('times').length == ev.length) {
        times = $.cookie('times');
    }
    if ($.cookie('scrambles') != undefined && $.cookie('scrambles').length == ev.length) {
        times = $.cookie('scrambles');
    }
    if ($.cookie('csstxt') != undefined) {
        $('#csstxt').val($.cookie('csstxt'));
    }
    if ($.cookie('jstxt') != undefined) {
        $('#jstxt').val($.cookie('jstxt'));
    }
}
while (times.length < ev.length) {
    times.push([]);
}
while (scrambles.length < ev.length) {
    scrambles.push([]);
}

//timer and scramble initialization
var st = '333';
var sn = 1;
var timer_obj = new startTimer(document.getElementById('time'));
$.each(ev, function (i, v) {
    scramblers[v].initialize(null, Math);
});
var scr = function () {
    scramble = scramblers[st].getRandomScramble().scramble_string;
    if (st == '333bf') {
        scramble += ' ' + ["", "Rw", "Rw2", "Rw'", "Fw", "Fw'"][randomInt.below(6)] + " " + ["", "Dw", "Dw2", "Dw'"][randomInt.below(4)];
    }
    return scramble;
};
$('#scramble').html(scr);
$('.type').html('<span class="cubing-icon icon-333"></span> 3x3x3');

//inspection time
var ins;
$('#ins').mouseup(function () {
    $('#time').text('15');
    var x = 14;
    $('.dis').fadeTo('fast', 0.01);
    $('button, a').blur().addClass('disabled');
    ins = setInterval(function () {
        $('#time').text(x);
        if (x == 0) {
            record = true;
            clearInterval(ins);
            timer_obj.start($('#dmask').is(':checked') ? 'Timing' : []._);
        } else {
            x--;
        }
    }, 1000);
});

var record = false;
//timer key events
$(document).keydown(function (e) {
    if (e.keyCode == 32 && record == true && !$('.modal').is(':visible')) {
        timer_obj.end();
        $('#time').html(time);
    }
});
$(document).keyup(function (e) {
    if (!e.ctrlKey && e.keyCode == 32 && !$('.modal').is(':visible')) {
        if (record == false) {
            record = true;
            clearInterval(ins);
            timer_obj.start($('#dmask').is(':checked') ? 'Timing' : []._);
            $('.dis').fadeTo('fast', 0.01);
            $('button, a').blur().attr('disabled', 'true');
        } else {
            record = false;
            $('.dis').fadeTo('fast', 1);
            $('button, a').removeAttr('disabled');
            times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime($('#time').text())));
            scrambles[sn].push(scramble);
            $('#scramble').html(scr);
        }
    } else if (e.ctrlKey && e.keyCode == 32 && !$('.modal').is(':visible')) {
        $('#time').text('15');
        var x = 14;
        $('.dis').fadeTo('fast', 0.01);
        $('button, a').blur().attr('disabled', 'true');
        ins = setInterval(function () {
            $('#time').text(x);
            if (x == 0) {
                record = true;
                clearInterval(ins);
                timer_obj.start($('#dmask').is(':checked') ? 'Timing' : []._);
            } else {
                x--;
            }
        }, 1000);
    }
});

//timer tap events
$('#time').on('touchend', function () {
    if (record == false) {
        record = true;
        clearInterval(ins);
        timer_obj.start($('#dmask').is(':checked') ? 'Timing' : []._);
        $('.dis').fadeTo('fast', 0.01);
        $('button, a').blur().attr('disabled', 'true');
    } else {
        record = false;
        $('.dis').fadeTo('fast', 1);
        $('button, a').removeAttr('disabled');
        times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime($('#time').text())));
        scrambles[sn].push(scramble);
        $('#scramble').html(scr);
    }
});
$('#time').on('touchstart', function () {
    if (record == true) {
        timer_obj.end();
        $('#time').html(time);
    }
});

//stats
$('#stats').click(function () {
    updatestats();
});

//reset
$('#reset').on('dblclick doubletap', function () {
    times[sn].length = 0;
    scrambles[sn].length = 0;
    $('#time').text('0:0.000');
    updatestats();
});
$('#resl').click(function () {
    times[sn].pop();
    scrambles[sn].pop();
    $('#time').text('0:0.000');
    updatestats();
});

//change events
$('#st li a').click(function () {
    st = $(this).attr('class');
    sn = $.inArray(st, ev);
    updatestats();
    $('#scramble').html(scr);
    $('.navbar-brand .type').html($(this).html());
    $('#time').text('0:0.000');
});

//change scramble
$('#scramble').click(function () {
    $('#scramble').html(scr);
});

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
//mobile only: orientation stuff for modal
if (window.innerHeight < window.innerWidth && isMobile.any()) {
    $('#mod').modal('show');
}
$(window).on('orientationchange', function () {
    if (window.innerHeight < window.innerWidth && isMobile.any()) {
        updatestats();
        $('#mod').openModal();
    } else {
        $('#mod').closeModal();
    }
});
//time submitting
$('#subet').click(function () {
    var eva = $('#et').val().trim();
    if (eva.length == 0) {
        if (!$('.input-group').hasClass('has-error')) {
            $('.input-group').addClass('has-error');
        }
        if (!$('#subet').hasClass('btn-danger')) {
            $('#subet').addClass('btn-danger');
        }
        if (!$('.help').hasClass('text-danger')) {
            $('.help').fadeIn('fast').addClass('text-danger').html('Please enter a time.');
        } else {
            $('.help').html('Please enter a time.');
        }
    } else if (eva.match(/[^0-9:.]/g) || parseInt(eva) == 0) {
        if (!$('.input-group').hasClass('has-error')) {
            $('.input-group').addClass('has-error');
        }
        if (!$('#subet').hasClass('btn-danger')) {
            $('#subet').addClass('btn-danger');
        }
        if (!$('.help').hasClass('text-danger')) {
            $('.help').fadeIn('fast').addClass('text-danger').html('Please enter a valid time.');
        } else {
            $('.help').html('Please enter a valid time.');
        }
    } else {
        subt(eva);
    }
    $('#et').val('');
});

function subt(x) {
    times[sn].push(jChester.solveTimeToStopwatchFormat(jChester.stopwatchFormatToSolveTime(x)));
    scrambles[sn].push(scramble);
    $('.input-group').removeClass('has-error');
    $('#subet').removeClass('btn-danger');
    $('.help').fadeIn('fast').removeClass('text-danger').html('Time submitted successfully.').promise().done(function () {
        setTimeout(function () {
            $('.help').fadeOut('slow');
        }, 1000);
    });
    updatestats();
}

//submit code
$('#subcode').click(function () {
    $('style#ccss').html($('#csstxt').val());
    eval($('#jstxt').val());
});

//indent for code
$(document).delegate('textarea', 'keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode == 9) {
        e.preventDefault();
        var start = $(this).get(0).selectionStart;
        var end = $(this).get(0).selectionEnd;
        $(this).val($(this).val().substring(0, start) + "    " + $(this).val().substring(end));
        $(this).get(0).selectionStart =
            $(this).get(0).selectionEnd = start + 1;
    }
});

//store times
window.onbeforeunload = function () {
    if (typeof (Storage) != 'undefined') {
        localStorage['times'] = JSON.stringify(times);
        localStorage['scrambles'] = JSON.stringify(scrambles);
        localStorage['csstxt'] = $('#csstxt').val();
        localStorage['jstxt'] = $('#jstxt').val();
    }
    $.cookie('times', JSON.stringify(times));
    $.cookie('scrambles', JSON.stringify(scrambles));
    $.cookie('csstxt', $('#csstxt').val());
    $.cookie('jstxt', $('#jstxt').val());
};

//function for updating stats
function updatestats() {
    var sort = stt(times[sn].slice(0)).sort(function (a, b) {
        return a - b
    });
    $('#timelist').html('');
    if (times[sn].length > 0) {
        $.each(times[sn], function (i, v) {
            $('#timelist').append('<button class="btn tooltipped timeitem" data-position="right" data-tooltip="' + scrambles[sn][i] + '">' + v + '</button>');
        });
        $('#sm').text(jChester.solveTimeToStopwatchFormat({
            millis: sort.average(),
            decimals: 3
        }));
        $('#pb').text(jChester.solveTimeToStopwatchFormat({
            millis: sort[0],
            decimals: 3
        }));
        $('#pw').text(jChester.solveTimeToStopwatchFormat({
            millis: sort[times[sn].length - 1],
            decimals: 3
        }));
        if (times[sn].length > 2) {
            var dup = times[sn].slice(0);
            dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
            dup.splice(dup.indexOf(sort[0]), 1);
            $('#sa').text(jChester.solveTimeToStopwatchFormat({
                millis: stt(dup).average(),
                decimals: 3
            }));
        }
        if (times[sn].length < 3) {
            $('#sa').text('DNF');
        }
        if (times[sn].length > 4) {
            var dup = times[sn].slice(times[sn].length - 5);
            dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
            dup.splice(dup.indexOf(sort[0]), 1);
            $('#aof').text(jChester.solveTimeToStopwatchFormat({
                millis: stt(dup).average(),
                decimals: 3
            }));
        }
        if (times[sn].length < 5) {
            $('#aof').text('DNF');
        }
        if (times[sn].length > 11) {
            var dup = times[sn].slice(times[sn].length - 12);
            dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
            dup.splice(dup.indexOf(sort[0]), 1);
            $('#aot').text(jChester.solveTimeToStopwatchFormat({
                millis: stt(dup).average(),
                decimals: 3
            }));
        }
        if (times[sn].length < 12) {
            $('#aot').text('DNF');
        }
        if (times[sn].length > 99) {
            var dup = times[sn].slice(times[sn].length - 100);
            dup.splice(dup.indexOf(sort[times[sn].length - 1]), 1)
            dup.splice(dup.indexOf(sort[0]), 1);
            $('#aoh').text(jChester.solveTimeToStopwatchFormat({
                millis: stt(dup).average(),
                decimals: 3
            }));
        }
        if (times[sn].length < 100) {
            $('#aoh').text('DNF');
        }
    } else {
        $('#timelist').text('None submitted.');
        $('#mod .modal-body span:not(#timelist, .input-group-btn)').text('DNF');
    }
    $('.tooltipped').tooltip({delay: 50});
}
"use strict";if("undefined"==typeof scramblers)var scramblers={};scramblers.clock=function(){function n(){function n(n,r,a,s,e,p){var o=n.replace(/\<\./g,"<span class='peg_changed'>").replace(/\<\_/g,"<span class='peg_same___'>").replace(/\>/g,"</span>"),U=r.replace(/\<\./g,"<span class='peg_changed'>").replace(/\<\_/g,"<span class='peg_same___'>").replace(/\>/g,"</span>");c+="<div class='clock_outer'><div class='clock_inner'>",c+=a+" <span class='clock_pegs'>"+o+"</span>&nbsp;"+s+"<br>",c+=e+" <span class='clock_pegs'>"+U+"</span>&nbsp;"+p,c+="</div></div>"}function r(n,r){var a;return 0===r?"&nbsp;&nbsp;&nbsp;":(a=1===r?"</span>&nbsp;&nbsp;":-1===r?"'</span>&nbsp;&nbsp;":r>=0?""+r+"</span>&nbsp;":""+-r+"'</span>","<span class='clock_turn'>"+n+a)}var a,s,p=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),o="dU",U=[0,0,0,0],t=new Array,d=new Array;for(d[0]=new Array(1,1,1,1,1,1,0,0,0,-1,0,-1,0,0,0,0,0,0),d[1]=new Array(0,1,1,0,1,1,0,1,1,-1,0,0,0,0,0,-1,0,0),d[2]=new Array(0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,-1,0,-1),d[3]=new Array(1,1,0,1,1,0,1,1,0,0,0,-1,0,0,0,0,0,-1),d[4]=new Array(0,0,0,0,0,0,1,0,1,0,0,0,-1,-1,-1,-1,-1,-1),d[5]=new Array(1,0,0,0,0,0,1,0,0,0,-1,-1,0,-1,-1,0,-1,-1),d[6]=new Array(1,0,1,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,0,0,0),d[7]=new Array(0,0,1,0,0,0,0,0,1,-1,-1,0,-1,-1,0,-1,-1,0),d[8]=new Array(0,1,1,1,1,1,1,1,1,-1,0,0,0,0,0,-1,0,-1),d[9]=new Array(1,1,0,1,1,1,1,1,1,0,0,-1,0,0,0,-1,0,-1),d[10]=new Array(1,1,1,1,1,1,1,1,0,-1,0,-1,0,0,0,0,0,-1),d[11]=new Array(1,1,1,1,1,1,0,1,1,-1,0,-1,0,0,0,-1,0,0),d[12]=new Array(1,1,1,1,1,1,1,1,1,-1,0,-1,0,0,0,-1,0,-1),d[13]=new Array(1,0,1,0,0,0,1,0,1,-1,-1,-1,-1,-1,-1,-1,-1,-1),a=0;14>a;a++)t[a]=Math.floor(12*e.random())-5;for(a=0;4>a;a++)U[a]=Math.floor(2*e.random());for(a=0;14>a;a++)for(s=0;18>s;s++)p[s]+=t[a]*d[a][s];for(s=0;18>s;s++)for(p[s]%=12;p[s]<=0;)p[s]+=12;var c="";n("<_U><_U>","<_d><_d>","",r("U",t[0]),"",r("d",t[4])),n("<.d><_U>","<_d><.U>","",r("U",t[1]),"",r("d",t[5])),n("<_d><.d>","<.U><_U>","",r("U",t[2]),"",r("d",t[6])),n("<.U><_d>","<_U><.d>","",r("U",t[3]),"",r("d",t[7])),n("<.d><.U>","<_U><.U>","",r("U",t[8]),"","&nbsp;&nbsp;&nbsp;"),n("<.U><.d>","<_U><_U>","",r("U",t[9]),"","&nbsp;&nbsp;&nbsp;"),n("<_U><.U>","<_U><.d>","",r("U",t[10]),"","&nbsp;&nbsp;&nbsp;"),n("<_U><_U>","<.d><.U>","",r("U",t[11]),"","&nbsp;&nbsp;&nbsp;"),n("<_U><_U>","<.U><_U>","",r("U",t[12]),"","&nbsp;&nbsp;&nbsp;"),n("<.d><.d>","<.d><_d>","",r("d",t[13]),"","&nbsp;&nbsp;&nbsp;"),n(o[U[0]]+o[U[1]],o[U[2]]+o[U[3]],"","","","");var i="",l=function(n,r){var a;return 0===r?"":(a=1===r?"":-1===r?"'":r>=0?""+r:""+-r+"'"," "+n+a)},_=function(n,r,a){i+="["+n+"]"+l("U",r)+l("d",a)+" "};return _("UU/dd",t[0],t[4]),_("dU/dU",t[1],t[5]),_("dd/UU",t[2],t[6]),_("Ud/Ud",t[3],t[7]),_("dU/UU",t[8],0),_("Ud/UU",t[9],0),_("UU/Ud",t[10],0),_("UU/dU",t[11],0),_("UU/UU",t[12],0),_("dd/dd",0,t[13]),_(o[U[0]]+o[U[1]]+"/"+o[U[2]]+o[U[3]],0,0),{state:{dials:p,pegs:U},scramble_string:i}}function r(n,r,a,s,e,p){for(var o="",t=0;t<d.length;t++){var c=U(r,a,[d[t],p[t]]);o+=(0===t?"M":"L")+c[0]+","+c[1]}return o+="z",n.path(o).attr({fill:s,stroke:"none"})}function a(n,a,s,e,p,o,i){var l=U(a,s,[e,p])[0],_=U(a,s,[e,p])[1];t(n,a,s,e,p,13,o,"none",0),t(n,a,s,e,p,4,"#F00","none",0);Math.cos(i/12*Math.TAU),Math.sin(i/12*Math.TAU);d=[e,e+4,e-4],c=[p-12,p-1,p-1];var b=r(n,a,s,"#F00",d,c);b.rotate(30*i,l,_),t(n,a,s,e,p,2,"#FF0","none",0),d=[e,e+2,e-2],c=[p-8,p-.5,p-.5];var f=r(n,a,s,"#FF0",d,c);f.rotate(30*i,l,_)}function s(n,r,a,s,e,p){var o,U=6;o=1===p?"#FF0":"#440",t(n,r,a,s,e,U,o,"#000","1px")}var e=void 0,p=function(n){e=n},o=function(n,r){p(r),n&&setTimeout(n,0)},U=function(n,r,a){var s=220,e=110,p=Math.min(n/s,r/e),o=a[0]*p+(n-s*p)/2,U=a[1]*p+(r-e*p)/2;return[o,U,p]},t=function(n,r,a,s,e,p,o,t,d){var c=U(r,a,[s,e]);return n.circle(c[0],c[1],c[2]*p).attr({fill:o,stroke:t,"stroke-width":d})};Math.TAU=2*Math.PI;var d,c,i=function(n,r,e,p){var o=52,U=30,d=29,c=18,i=Raphael(n,e,p),l=function(n,r,a,s,U){t(i,e,p,n,r,o,a,s,U);for(var l=n-d;n+d>=l;l+=d)for(var _=r-d;r+d>=_;_+=d)t(i,e,p,l,_,c,a,s,U)},_=55,b=55;l(_,b,"none","#000","3px"),l(_,b,"#36F","none");for(var f=0,v=b-U;b+U>=v;v+=U)for(var u=_-U;_+U>=u;u+=U)a(i,e,p,u,v,"#8AF",r.dials[f]),f++;s(i,e,p,_-U/2,b-U/2,r.pegs[0]),s(i,e,p,_+U/2,b-U/2,r.pegs[1]),s(i,e,p,_-U/2,b+U/2,r.pegs[2]),s(i,e,p,_+U/2,b+U/2,r.pegs[3]);var _=165,b=55;l(_,b,"#none","#000",3),l(_,b,"#8AF","none");var f=9;for(v=b-U;b+U>=v;v+=U)for(u=_-U;_+U>=u;u+=U)a(i,e,p,u,v,"#36F",r.dials[f]),f++;s(i,e,p,_+U/2,b-U/2,1-r.pegs[0]),s(i,e,p,_-U/2,b-U/2,1-r.pegs[1]),s(i,e,p,_+U/2,b+U/2,1-r.pegs[2]),s(i,e,p,_-U/2,b+U/2,1-r.pegs[3])};return{version:"December 30, 2011",initialize:o,setRandomSource:p,getRandomScramble:n,drawScramble:i}}();
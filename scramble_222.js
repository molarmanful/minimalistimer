"use strict";if("undefined"==typeof scramblers)var scramblers={};scramblers[222]=function(){function r(){u=new Array(1,1,1,1,2,2,2,2,5,5,5,5,4,4,4,4,3,3,3,3,0,0,0,0)}function a(){for(var r=6,a=[0,1,2,3,4,5,6,7],n=Array(),e=0;7>e;e++){var o=Math.floor(q.random()*(7-e));o=a[o]===r?(o+1)%(8-e):o,n[e>=r?e+1:e]=a[o],a[o]=a[7-e]}n[r]=r;for(var f=0,t=Array(),e=0===r?1:0;7>e;e=e===r-1?e+2:e+1)t[e]=Math.floor(3*q.random()),f+=t[e];7>=e&&(t[e]=(3-f%3)%3),t[r]=0;for(var i=1,v=2,y=5,w=4,A=3,l=0,c=[[w,A,l],[w,y,A],[w,v,y],[w,l,v],[i,l,A],[i,A,y],[i,y,v],[i,v,l]],g=[[15,16,21],[13,9,17],[12,5,8],[14,20,4],[3,23,18],[1,19,11],[0,10,7],[2,6,22]],e=0;8>e;e++)for(var h=0;3>h;h++)u[g[e][(t[e]+h)%3]]=c[n[e]][h]}function n(){var r,a;for(r=0;6>r;r++)for(a=0;6>a;a++)c[r][a]=0;for(r=0;48>r;r+=2)u[l[r]]<=5&&u[l[r+1]]<=5&&c[u[l[r]]][u[l[r+1]]]++}function e(){n();var r=new Array;for(f=0;6>f;f++)for(y=0;6>y;y++)f!=y&&c[f][y]+c[y][f]===0&&(r[f]=y,r[y]=f);for(var a=new Array,e=new Array,f=0,t=0;7>t;t++){var i=0;for(y=f;f+6>y;y+=2)u[l[y]]===u[l[42]]&&(i+=4),u[l[y]]===u[l[44]]&&(i+=1),u[l[y]]===u[l[46]]&&(i+=2);a[t]=i,e[t]=u[l[f]]===u[l[42]]||u[l[f]]===r[u[l[42]]]?0:u[l[f+2]]===u[l[42]]||u[l[f+2]]===r[u[l[42]]]?1:2,f+=6}for(var v=0,f=0;7>f;f++){for(var y=0,w=0;7>w&&a[w]!==f;w++)a[w]>f&&y++;v=v*(7-f)+y}for(var A=0,f=5;f>=0;f--)A=3*A+e[f]-3*Math.floor(e[f]/3);if(0!=v||0!=A){s.length=0;for(var g=j;100>g&&!o(0,v,A,g,-1);g++);for(A="",v=0;v<s.length;v++)A="URF".charAt(s[v]/10)+"'2 ".charAt(s[v]%10)+" "+A;return A}}function o(r,a,n,e,f){if(0===e){if(0===a&&0===n)return!0}else{if(F[a]>e||p[n]>e)return!1;var t,i,v,y;for(y=0;3>y;y++)if(y!=f)for(t=a,i=n,v=0;3>v;v++)if(t=b[t][y],i=d[i][y],s[r]=10*y+v,o(r+1,t,i,e-1,y))return!0}return!1}function f(){for(var r=0;5040>r;r++){F[r]=-1,b[r]=new Array;for(var a=0;3>a;a++)b[r][a]=t(r,a)}F[0]=0;for(var n=0;6>=n;n++)for(var e=0,r=0;5040>r;r++)if(F[r]===n)for(var a=0;3>a;a++)for(var o=r,f=0;3>f;f++){var o=b[o][a];-1===F[o]&&(F[o]=n+1,e++)}for(var r=0;729>r;r++){p[r]=-1,d[r]=new Array;for(var a=0;3>a;a++)d[r][a]=i(r,a)}p[0]=0;for(var n=0;5>=n;n++)for(var e=0,r=0;729>r;r++)if(p[r]===n)for(var a=0;3>a;a++)for(var o=r,f=0;3>f;f++){var o=d[o][a];-1===p[o]&&(p[o]=n+1,e++)}}function t(r,a){var n,e,o,f,t=new Array;for(f=r,n=1;7>=n;n++){for(e=f%n,f=(f-e)/n,o=n-1;o>=e;o--)t[o+1]=t[o];t[e]=7-n}for(0===a?(o=t[0],t[0]=t[1],t[1]=t[3],t[3]=t[2],t[2]=o):1===a?(o=t[0],t[0]=t[4],t[4]=t[5],t[5]=t[1],t[1]=o):2===a&&(o=t[0],t[0]=t[2],t[2]=t[6],t[6]=t[4],t[4]=o),f=0,n=0;7>n;n++){for(e=0,o=0;7>o&&t[o]!==n;o++)t[o]>n&&e++;f=f*(7-n)+e}return f}function i(r,a){var n,e,o,f,t,i=new Array;for(t=r,f=0,n=0;5>=n;n++)o=Math.floor(t/3),e=t-3*o,t=o,i[n]=e,f-=e,0>f&&(f+=3);for(i[6]=f,0===a?(o=i[0],i[0]=i[1],i[1]=i[3],i[3]=i[2],i[2]=o):1===a?(o=i[0],i[0]=i[4],i[4]=i[5],i[5]=i[1],i[1]=o,i[0]+=2,i[1]++,i[5]+=2,i[4]++):2===a&&(o=i[0],i[0]=i[2],i[2]=i[6],i[6]=i[4],i[4]=o,i[2]+=2,i[0]++,i[4]+=2,i[6]++),t=0,n=5;n>=0;n--)t=3*t+i[n]%3;return t}function v(){for(var r=0;6>r;r++){S[r]=R.length-3;for(var a=0;a<R.length;a+=3)if(M.charAt(r)===R[a]){S[r]=a;break}}}function y(){if(!z){var r,a;for(h=new Array(12*m*m),r=0;r<h.length;r++)h[r]=-1;for(r=0;m>r;r++)for(a=0;m>a;a++)h[4*m*(3*m-r-1)+m+a]=r*m+a,h[4*m*(m+r)+m-a-1]=(m+r)*m+a,h[4*m*(m+r)+4*m-a-1]=(2*m+r)*m+a,h[4*m*r+m+a]=(3*m+r)*m+a,h[4*m*(m+r)+2*m+a]=(4*m+r)*m+a,h[4*m*(m+r)+m+a]=(5*m+r)*m+a}}function w(r){return"r"===r?"#FF0000":"o"===r?"#FF8000":"b"===r?"#0000FF":"g"===r?"#00FF00":"y"===r?"#FFFF00":"w"===r?"#FFFFFF":"x"===r?"#000000":void 0}function A(r,a,n,e,o,f,t){for(var i=[e-f,e-f,e+f,e+f],v=[o-f,o+f,o+f,o-f],y="",A=0;A<i.length;A++){var u=U(a,n,[i[A],v[A]]);y+=(0===A?"M":"L")+u[0]+","+u[1]}y+="z",r.path(y).attr({fill:w(t),stroke:"#000"})}var u=new Array;r();var l=(new Array,new Array(15,16,16,21,21,15,13,9,9,17,17,13,14,20,20,4,4,14,12,5,5,8,8,12,3,23,23,18,18,3,1,19,19,11,11,1,2,6,6,22,22,2,0,10,10,7,7,0)),c=new Array;c[0]=new Array,c[1]=new Array,c[2]=new Array,c[3]=new Array,c[4]=new Array,c[5]=new Array;var g=(new Array,new Array);g[0]=new Array(0,2,3,1,23,19,10,6,22,18,11,7),g[1]=new Array(4,6,7,5,12,20,2,10,14,22,0,8),g[2]=new Array(8,10,11,9,12,7,1,17,13,5,0,19),g[3]=new Array(12,13,15,14,8,17,21,4,9,16,20,5),g[4]=new Array(16,17,19,18,15,9,1,23,13,11,3,21),g[5]=new Array(20,21,23,22,14,16,3,6,15,18,2,4);var h,s=new Array,F=new Array,p=new Array,b=new Array,d=new Array,m=2,j=0,M="yobwrg",R=new Array("y","yellow.jpg","yellow","b","blue.jpg","blue","r","red.jpg","red","w","white.jpg","white","g","green.jpg","green","o","orange.jpg","orange","p","purple.jpg","purple","0","grey.jpg","grey"),S=new Array,u=(new Array,new Array),k=new Array;k[0]=new Array(5,0,1,4,3,2);var z=!1,T=2,x=2,D=20,L=4,U=function(r,a,n){var e=2*x+4*D*T+3*L,o=2*x+3*D*T+2*L,f=Math.min(r/e,a/o),t=n[0]*f+(r-e*f)/2,i=n[1]*f+(a-o*f)/2;return[t,i]},_=function(r,a,n,e){G();var o,f,t=Raphael(r,n,e),i="",v=0,y=0;for(v=0,i="<table border=0 cellpadding=0 cellspacing=0>",o=0;3*m>o;o++){for(i+="<tr>",f=0;4*m>f;f++){if(h[v]<0)i+="<td></td>";else{var w=k[y][a[h[v]]],u=R[S[w]+0];A(t,n,e,x+D/2+f*D+L*Math.floor(f/2),x+D/2+o*D+L*Math.floor(o/2),D/2,u)}v++}i+="</tr>"}return i+="</table>"},q=void 0,B=function(r){q=r},C=function(){a();var r=e();return{state:u,scramble_string:r}},E=!1,G=function(r){E||(f(),v(),y(),E=!0),r&&setTimeout(r,0)},H=function(r,a){B(a),G(),r&&setTimeout(r,0)};return{version:"December 29, 2011",initialize:H,setRandomSource:B,getRandomScramble:C,drawScramble:_}}();

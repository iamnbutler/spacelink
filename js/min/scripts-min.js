$(document).ready(function(){for(var e=$("#chart"),d=[[2,1,0,1],[2,4,0,.4],[3,3,0,.2],[3,4,1,1],[3,6,0,.5],[4,1,0,.8],[4,2,0,1]],n=[0,0,0,0],t=5,a,a=0;a<d.length;a++){var i=$('<div class="node node-'+a+'"></div>'),o=parseInt(d[a][0])*t,r=parseInt(d[a][1])*t,s=d[a][2],c=d[a][3];e.append(i);var p=e.children("div").last();p.css({top:o+"%",left:r+"%",width:t+"%",height:t+"%",opacity:c}).addClass("nodeType"+s)}}),$(document).resize(function(){});
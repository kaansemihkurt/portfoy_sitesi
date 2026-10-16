(function(){
var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var root=document.documentElement;
root.classList.add('js');

// Yıl
var yr=document.getElementById('yr');
if(yr)yr.textContent=new Date().getFullYear();

// Kaydırma ilerleme çubuğu
var pg=document.getElementById('prog');
if(pg){
  var sp=function(){pg.style.transform='scaleX('+(scrollY/Math.max(1,root.scrollHeight-innerHeight))+')'};
  addEventListener('scroll',sp,{passive:true});sp();
}

// Kaydırınca beliren bölümler
var rv=[].slice.call(document.querySelectorAll('.rv'));
if('IntersectionObserver' in window&&!rm){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1});
  rv.forEach(function(el,i){el.style.transitionDelay=(i%3)*90+'ms';io.observe(el)});
}else rv.forEach(function(el){el.classList.add('in')});

// Kartlarda fareyi izleyen ışık
document.addEventListener('mousemove',function(e){
  var g=e.target.closest&&e.target.closest('.glass');
  if(g){var r=g.getBoundingClientRect();g.style.setProperty('--mx',e.clientX-r.left+'px');g.style.setProperty('--my',e.clientY-r.top+'px')}
});

// Unvan daktilo gibi yazılır
var t=document.querySelector('[data-type]');
if(t&&!rm){var s=t.textContent,i=0;t.textContent='';setTimeout(function k(){t.textContent=s.slice(0,++i);if(i<s.length)setTimeout(k,50)},350)}

// Yağmur
var c=document.getElementById('rain');
if(c&&!rm){
  var x=c.getContext('2d'),w,h,d;
  var rs=function(){w=c.width=innerWidth;h=c.height=innerHeight;d=[];for(var n=0;n<Math.round(w/16);n++)d.push({x:Math.random()*w,y:Math.random()*h,l:10+Math.random()*16,v:5+Math.random()*5})};
  rs();addEventListener('resize',rs);
  (function f(){x.clearRect(0,0,w,h);x.fillStyle='rgba(170,200,255,.28)';
    d.forEach(function(p){x.fillRect(Math.round(p.x),Math.round(p.y),2,p.l);p.y+=p.v;p.x-=p.v*.12;if(p.y>h){p.y=-p.l;p.x=Math.random()*w}});
    requestAnimationFrame(f)})();
}
})();

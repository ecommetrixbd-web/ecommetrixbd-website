(function(){
  var root=document.documentElement;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce) root.classList.add('motion');

  /* Content calendar tiles (Content Support illustration) */
  var cal=document.getElementById('cal');
  if(cal){var cols=['#FF7A59','#FFD43B','#8B5CF6','#FFB547','#FF8FB8'],out='';
    for(var r=0;r<4;r++)for(var c=0;c<6;c++){var x=42+c*33,y=62+r*38,on=((r*6+c)%3!==1);
      out+='<rect x="'+x+'" y="'+y+'" width="28" height="32" rx="3" fill="#22161C"/>';
      if(on) out+='<rect class="a-pop" style="--i:'+(r*6+c)%12+'" x="'+(x+3)+'" y="'+(y+12)+'" width="22" height="16" rx="2" fill="'+cols[(r+c)%5]+'"/>';}
    cal.innerHTML=out;}

  /* Sticky nav */
  var nav=document.getElementById('nav');
  function onScroll(){nav.classList.toggle('solid',window.scrollY>40)}
  onScroll();window.addEventListener('scroll',onScroll,{passive:true});

  /* Mobile menu with focus trap */
  var burger=document.getElementById('burger'),mm=document.getElementById('mobileMenu');
  function setMenu(open){burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Close menu':'Open menu');mm.hidden=!open;document.body.style.overflow=open?'hidden':'';nav.classList.toggle('solid',open?false:window.scrollY>40);if(open){var f=mm.querySelector('a');f&&f.focus()}}
  burger.addEventListener('click',function(){setMenu(burger.getAttribute('aria-expanded')!=='true')});
  mm.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!mm.hidden){setMenu(false);burger.focus()}});

  /* Hero rotator */
  var rot=document.getElementById('rot'),words=[],wi=0;try{words=JSON.parse(rot.getAttribute('data-words'))||[]}catch(e){}
  if(words.length<2)rot=null;
  if(!reduce&&rot){setInterval(function(){if(document.hidden)return;wi=(wi+1)%words.length;rot.textContent=words[wi];rot.classList.remove('swap');void rot.offsetWidth;rot.classList.add('swap')},2400)}

  /* Marquee: duplicate track for seamless loop */
  var mq=document.getElementById('marquee');if(mq){mq.innerHTML+=mq.innerHTML;Array.prototype.slice.call(mq.children,mq.children.length/2).forEach(function(n){n.setAttribute('aria-hidden','true')})}

  /* Reveal: only hide things that start below the fold */
  var vh=window.innerHeight;
  var revealables=[].slice.call(document.querySelectorAll('.rv'));
  var services=[].slice.call(document.querySelectorAll('.svc'));
  if(!reduce&&'IntersectionObserver' in window){
    revealables.forEach(function(el){if(el.getBoundingClientRect().top>vh*0.95)el.classList.add('pre')});
    services.forEach(function(el){if(el.getBoundingClientRect().top>vh*0.9)el.classList.add('pre')});
    var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){en.target.classList.remove('pre');io.unobserve(en.target)}})},{threshold:.18,rootMargin:'0px 0px -6% 0px'});
    revealables.concat(services).forEach(function(el){if(el.classList.contains('pre'))io.observe(el)});
    /* loops run only while visible */
    var live=new IntersectionObserver(function(ents){ents.forEach(function(en){en.target.classList.toggle('live',en.isIntersecting)})},{threshold:0});
    [].slice.call(document.querySelectorAll('.svc, .mini-flow')).forEach(function(el){live.observe(el)});
  }

  /* Framework progress line tied to scroll (no scroll-jacking) */
  var steps=document.getElementById('steps'),prog=document.getElementById('progress'),stepEls=[].slice.call(document.querySelectorAll('.step'));
  if(!reduce&&steps){
    function upd(){var r=steps.getBoundingClientRect();var p=Math.min(1,Math.max(0,(vh*0.85-r.top)/(r.height+vh*0.35)));prog.style.setProperty('--p',p.toFixed(3));stepEls.forEach(function(s,i){s.classList.toggle('on',p>=i/4+0.02)})}
    var ticking=false;window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(function(){upd();ticking=false})}},{passive:true});upd();
  }

  /* Tabs (keyboard: arrows/home/end) */
  var tabs=[].slice.call(document.querySelectorAll('.tab'));
  function selectTab(t,focus){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',String(on));x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on});if(focus)t.focus()}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){selectTab(t)});t.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(e.key==='Home')n=tabs[0];if(e.key==='End')n=tabs[tabs.length-1];if(n){e.preventDefault();selectTab(n,true)}})});
  var qt=new URLSearchParams(location.search).get('tab');if(qt){var qtab=document.getElementById('tab-'+qt);if(qtab)selectTab(qtab)}
  [].slice.call(document.querySelectorAll('[data-tab]')).forEach(function(a){a.addEventListener('click',function(){var t=document.getElementById('tab-'+a.getAttribute('data-tab'));if(t)selectTab(t)})});

  /* FAQ accordion */
  [].slice.call(document.querySelectorAll('.faq-q')).forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-expanded',String(b.getAttribute('aria-expanded')!=='true'))})});

  /* Video modal with focus trap */
  var modal=document.getElementById('modal'),mclose=document.getElementById('modal-close'),mtitle=document.getElementById('modal-title'),mcat=document.getElementById('modal-cat'),stage=document.getElementById('modal-stage'),lastTrigger=null;
  var empty=document.getElementById('modal-empty');
  function embed(src){var y=src.match(/(?:youtu\.be\/|v=|shorts\/)([\w-]{11})/);if(y)return '<iframe src="https://www.youtube-nocookie.com/embed/'+y[1]+'?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>';
    var v=src.match(/vimeo\.com\/(\d+)/);if(v)return '<iframe src="https://player.vimeo.com/video/'+v[1]+'?autoplay=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="Video"></iframe>';
    return '<video src="'+src.replace(/"/g,'')+'" controls autoplay playsinline></video>'}
  function openModal(btn){lastTrigger=btn;mtitle.textContent=btn.getAttribute('data-video');mcat.textContent=btn.getAttribute('data-cat');stage.classList.toggle('tall',!!btn.getAttribute('data-tall'));
    var src=btn.getAttribute('data-src');var old=stage.querySelector('.player');if(old)old.remove();
    if(src){empty.hidden=true;var d=document.createElement('div');d.className='player';d.innerHTML=embed(src);stage.appendChild(d)}else{empty.hidden=false}
    modal.hidden=false;document.body.style.overflow='hidden';mclose.focus()}
  function closeModal(){var old=stage.querySelector('.player');if(old)old.remove();modal.hidden=true;document.body.style.overflow='';if(lastTrigger)lastTrigger.focus()}
  [].slice.call(document.querySelectorAll('[data-video]')).forEach(function(b){b.addEventListener('click',function(){openModal(b)})});
  mclose.addEventListener('click',closeModal);
  modal.addEventListener('click',function(e){if(e.target===modal)closeModal()});
  document.addEventListener('keydown',function(e){if(modal.hidden)return;if(e.key==='Escape')closeModal();if(e.key==='Tab'){e.preventDefault();mclose.focus()}});

  /* Copy buttons */
  [].slice.call(document.querySelectorAll('.copy-btn')).forEach(function(b){b.addEventListener('click',function(){var v=b.getAttribute('data-copy');var done=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1600)};try{navigator.clipboard.writeText(v).then(done,function(){})}catch(e){}})});


  /* Lead form (preview: validates and shows success; WordPress sends email + dataLayer generate_lead) */
  var form=document.getElementById('leadForm');
  if(form){
    var rules={name:function(v){return v.trim().length>=2||'Please enter your name.'},
      email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())||'Please enter a valid email address.'},
      phone:function(v){return v.replace(/[^\d]/g,'').length>=10||'Please enter a phone number with at least 10 digits.'},
      service:function(v){return !!v||'Please choose a service.'}};
    function check(el){var r=rules[el.name];if(!r)return true;var ok=r(el.value);var box=el.closest('.field'),err=document.getElementById(el.id+'-err');
      if(ok===true){box.classList.remove('bad');el.removeAttribute('aria-invalid');err.textContent='';return true}
      box.classList.add('bad');el.setAttribute('aria-invalid','true');el.setAttribute('aria-describedby',el.id+'-err');err.textContent=ok;return false}
    [].slice.call(form.querySelectorAll('input[required],select[required]')).forEach(function(el){el.addEventListener('blur',function(){if(el.value)check(el)});el.addEventListener('input',function(){if(el.closest('.field').classList.contains('bad'))check(el)})});
    form.addEventListener('submit',function(e){e.preventDefault();
      if(form.company_website.value)return;
      var els=[].slice.call(form.querySelectorAll('input[required],select[required]')),first=null;
      els.forEach(function(el){if(!check(el)&&!first)first=el});
      if(first){first.focus();return}
      var btn=form.querySelector('.lf-submit');
      function done(){window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'generate_lead',form_id:'cta_lead_form',service:form.service.value});
        document.getElementById('lfName').textContent=form.name.value.trim().split(' ')[0];
        document.getElementById('lfSuccess').hidden=false;}
      var key=form.getAttribute('data-key');
      if(!key){done();return}
      btn.disabled=true;
      var fd=new FormData(form);fd.append('access_key',key);fd.append('subject','New website lead: '+form.service.value);fd.delete('company_website');
      fetch('https://api.web3forms.com/submit',{method:'POST',body:fd}).then(function(r){return r.json()}).then(function(j){btn.disabled=false;if(j.success)done();else alert('Sorry, the form could not be sent. Please message us on WhatsApp.')}).catch(function(){btn.disabled=false;alert('Sorry, the form could not be sent. Please message us on WhatsApp.')});
    });
  }

  var yr=document.getElementById('yr');if(yr)yr.textContent=new Date().getFullYear();

  /* Hero carousel: swipe on touch, dots, auto-advance (paused on hover/touch/hidden tab, off for reduced motion) */
  var track=document.getElementById('hcTrack');
  if(track){
    var dots=[].slice.call(document.querySelectorAll('.hc-dot')),cur=0,paused=false;
    function go(i){cur=(i+dots.length)%dots.length;track.scrollTo({left:track.clientWidth*cur,behavior:reduce?'auto':'smooth'})}
    function mark(){var i=Math.round(track.scrollLeft/track.clientWidth);cur=i;dots.forEach(function(d,k){d.setAttribute('aria-current',String(k===i))})}
    track.addEventListener('scroll',function(){window.requestAnimationFrame(mark)},{passive:true});
    dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
    track.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(cur+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1)}});
    var box=track.parentNode;
    ['mouseenter','touchstart','focusin'].forEach(function(ev){box.addEventListener(ev,function(){paused=true},{passive:true})});
    ['mouseleave','focusout'].forEach(function(ev){box.addEventListener(ev,function(){paused=false})});
    box.addEventListener('touchend',function(){setTimeout(function(){paused=false},4000)},{passive:true});
    if(!reduce)setInterval(function(){if(!paused&&!document.hidden)go(cur+1)},3800);
  }

  /* Play the Video & Creative card clip only while it is on screen */
  var clip=document.querySelector('.svc-video video');
  if(clip&&'IntersectionObserver' in window&&!reduce){
    new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){var p=clip.play();if(p)p.catch(function(){})}else clip.pause()})},{threshold:.25}).observe(clip);
  }
})();

/* BUSINESS SETTINGS — supplied contact/hours; menu prices remain editable samples. */
const SITE = {
  name: 'Mr. Biriyaniwala', city: 'Adelaide', timezone: 'Australia/Adelaide',
  currency: 'AUD', locale: 'en-AU', phone: '03368933584', phoneDisplay:'0336 8933584', address: 'Jail Road, Heerabad', instagram: '', whatsapp:'923368933584', publicUrl:'', bookingUrl:'',
  hours: { 0: ['18:00', '02:00'], 1: ['18:00', '02:00'], 2: ['18:00', '02:00'],
    3: ['18:00', '02:00'], 4: ['18:00', '02:00'], 5: ['18:00', '02:00'], 6: ['18:00', '02:00'] }
};
const SIGNATURES = [
  { id:'biryani-rise', mediaVersion:'biryani-v2', image:'handi-dum', name:'Dum Biriyani', word:'Biriyani', category:'01 / THE HYDERABADI ORIGINAL', title:['Sealed with','a little soul.'], description:'Aged basmati. Eleven spices. Ninety minutes on dum. Some things are simply too good to hurry.', price:24.90, note:'Chicken dum biriyani · the house signature', accent:'#f0a032', veg:false },
  { id:'butter-chicken', image:'butter-chicken', name:'Butter Chicken', word:'Makhani', category:'02 / THE COPPER KADAI CLASSIC', title:['Butter makes','it better.'], description:'Charred chicken, slow-simmered tomatoes and a very generous idea of butter. Save some naan for this.', price:23.90, note:'Chicken makhani · creamy & comforting', accent:'#e99860', veg:false },
  { id:'tandoori', image:'tandoori', name:'Tandoori Chicken', word:'Tandoori', category:'03 / STRAIGHT FROM THE FIRE', title:['A little char.','A lot of heart.'], description:'Twelve hours in our marinade. A moment in the fire. Smoky, scarlet, and worth getting your hands into.', price:22.90, note:'Charcoal roasted · half chicken', accent:'#e16743', veg:false },
  { id:'seekh', image:'seekh', name:'Lamb Seekh', word:'Seekh', category:'04 / HAND SHAPED. FIRE KISSED.', title:['On a skewer.','Off the charts.'], description:'Spiced lamb, fresh herbs and a kiss of ghee. Lift it off the skewer. Drag it through the mint chutney.', price:19.90, note:'Lamb seekh kebab · two skewers', accent:'#c79564', veg:false },
  { id:'paneer', image:'paneer', name:'Paneer Tikka', word:'Tikka', category:'05 / THE GARDEN MEETS THE FLAME', title:['All the fire.','All the flavour.'], description:'Soft paneer, bright peppers and a tangy tikka marinade. Proof that the vegetables came to the party.', price:20.90, note:'Paneer tikka · vegetarian', accent:'#b0bb78', veg:true },
  { id:'dal', image:'dal', name:'Dal Makhani', word:'Dal', category:'06 / PATIENCE IN A CLAY POT', title:['Slow is','the secret.'], description:'Black lentils and kidney beans, simmered until silky. Finished with cream. Comfort doesn’t need a shortcut.', price:18.90, note:'Dal makhani · vegetarian', accent:'#d2ab7e', veg:true },
  { id:'naan', image:'naan', name:'Garlic Naan', word:'Naan', category:'07 / YOUR CURRY’S BETTER HALF', title:['Tear. Dip.','Repeat.'], description:'Blistered in the tandoor, brushed with garlic butter. The last piece is a test of friendship.', price:5.50, note:'Garlic butter naan · vegetarian', accent:'#e5bf75', veg:true },
  { id:'lassi', image:'lassi', name:'Mango Lassi', word:'Lassi', category:'08 / A SWEET LITTLE FINALE', title:['The sweetest','cool down.'], description:'Golden mango, thick yoghurt and a little saffron. For after the fire. Or before. We don’t make the rules.', price:7.90, note:'Mango lassi · vegetarian', accent:'#f3bd4e', veg:true }
];

// Full menu: the eight signatures plus editable additional dishes.
const MENU = [
  ...SIGNATURES.map((dish,i)=>({...dish,group:['Biriyani','Curries','Tandoor','Tandoor','Tandoor','Curries','Breads & Sides','Drinks'][i]})),
  {name:'Lamb Dum Biriyani',group:'Biriyani',description:'Tender lamb, aged basmati, saffron and crisp fried onions.',price:27.90,veg:false},
  {name:'Vegetable Dum Biriyani',group:'Biriyani',description:'Seasonal vegetables layered with fragrant rice, mint and whole spices.',price:21.90,veg:true},
  {name:'The Family Handi',group:'Biriyani',description:'Chicken dum biriyani to share, with raita and salan. Serves four.',price:79.00,veg:false},
  {name:'Chicken Malai Tikka',group:'Tandoor',description:'A creamy yoghurt marinade, green cardamom and a gentle charcoal char.',price:22.90,veg:false},
  {name:'Tandoori Mixed Grill',group:'Tandoor',description:'Chicken tikka, lamb seekh and tandoori chicken, made for sharing.',price:36.90,veg:false},
  {name:'Lamb Rogan Josh',group:'Curries',description:'Slow-cooked lamb in a fragrant Kashmiri chilli and whole-spice gravy.',price:26.90,veg:false},
  {name:'Palak Paneer',group:'Curries',description:'Soft paneer folded into spinach with garlic and a touch of cream.',price:20.90,veg:true},
  {name:'Chana Masala',group:'Curries',description:'Chickpeas, tomatoes, ginger and a bright finish of house masala.',price:18.90,veg:true},
  {name:'Butter Naan',group:'Breads & Sides',description:'Hot from the clay oven. Brushed generously with butter.',price:4.50,veg:true},
  {name:'Cucumber Raita',group:'Breads & Sides',description:'Cool yoghurt, cucumber, toasted cumin and mint.',price:4.90,veg:true},
  {name:'Mirchi Ka Salan',group:'Breads & Sides',description:'The classic biriyani companion: green chillies, sesame and peanuts.',price:5.90,veg:true},
  {name:'Masala Chai',group:'Drinks',description:'Milk tea simmered with ginger, cardamom and a little conversation.',price:4.50,veg:true},
  {name:'Sweet or Salted Lassi',group:'Drinks',description:'Thick, cool yoghurt. Choose your side.',price:6.50,veg:true},
  {name:'Rose Lemonade',group:'Drinks',description:'Fresh lemon, a little rose and sparkling water.',price:5.90,veg:true}
];
const SPICES = [
 ['Green cardamom','Floral, citrusy and quietly sweet. The fragrance that greets you first.'],
 ['Black cardamom','Deep, smoky warmth. A little goes a long, fragrant way.'],
 ['Cloves','A small bud with a big voice. Warm, sweet and beautifully bold.'],
 ['Cinnamon','Sweet wood, gentle warmth. The slow note beneath the spice.'],
 ['Star anise','A star-shaped whisper of liquorice. Whole, never hidden.'],
 ['Bay leaf','Earthy and herbal. The quiet backbone of the handi.'],
 ['Mace','Delicate, fragrant ribbons with a soft peppery warmth.'],
 ['Saffron','Just a few golden threads. An unmistakable perfume.'],
 ['Cumin','Toasted until nutty. Small seeds, serious depth.'],
 ['Coriander seed','Bright citrus notes that bring every other spice into focus.'],
 ['Black pepper','A warm, lingering finish. The last word in the masala.']
];
const HOUSE_RULES = [
 ['Leftovers are a compliment.','Containers are on the house.','COME HUNGRY. LEAVE HAPPY.'],
 ['The last piece of naan?','A test of friendship.','SHARING IS STRONGLY ENCOURAGED.'],
 ['Good biriyani takes time.','Good company makes it fly.','SLOW COOKED. WELL SPENT.'],
 ['One more plate is always','a very good idea.','ONE MORE PLATE?']
];
window.restaurantData={site:SITE,menu:MENU,signatures:SIGNATURES};

(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const hero = $('#hero');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 899px)');
  const gs = window.gsap;
  const st = window.ScrollTrigger;
  const animated = !!(gs && st) && !motion.matches;
  const money = n => new Intl.NumberFormat(SITE.locale, {style:'currency',currency:SITE.currency}).format(n);
  let current = 0, desired = 0, localProgress = 0, totalProgress = 0, switchToken = 0, pending = -1;
  let scrollTrigger, lenis, loaderDone = false, lastScroll = 0;
  const clips = SIGNATURES.map(() => ({video:null, ready:false, promise:null, time:0, url:null, error:null}));
  const events = new AbortController();

  // Every video has its own DOM node and local blob; no network seeking.
  SIGNATURES.forEach((dish, index) => {
    const video = document.createElement('video');
    video.className = 'hero-clip'; video.muted = true; video.defaultMuted = true;
    video.playsInline = true; video.preload = 'auto'; video.setAttribute('playsinline','');
    video.setAttribute('webkit-playsinline',''); video.setAttribute('aria-hidden','true');
    video.dataset.dish = dish.id;
    $('.clip-stack').append(video); clips[index].video = video;
    const button = document.createElement('button');
    button.innerHTML = `<span>${String(index+1).padStart(2,'0')}</span>${dish.name}`;
    button.setAttribute('aria-label', `Explore ${dish.name}`);
    button.dataset.index = index;
    button.addEventListener('click', () => goToDish(index));
    $('.dish-index').append(button);
    const overlayButton = button.cloneNode(true);
    overlayButton.addEventListener('click', () => {closeMenu();goToDish(index);});
    $('.overlay-links').append(overlayButton);
    const row = document.createElement('button');
    row.className = 'signature-row';row.dataset.image=dish.image;row.dataset.cursor='Taste';
    row.setAttribute('aria-label', `See ${dish.name} in the hero · ${money(dish.price)}`);
    row.innerHTML = `<span class="signature-number">${String(index+1).padStart(2,'0')}</span><img src="media/img/${dish.image}.webp" alt="" width="100" height="64" loading="lazy"><span class="signature-name">${dish.name}${dish.veg?'<i class="veg-dot" aria-label="Vegetarian"></i>':''}<small>${dish.note.split('·').pop().trim()}</small></span><span class="signature-price">${money(dish.price)}</span><span class="signature-arrow" aria-hidden="true">↗</span>`;
    row.addEventListener('click', () => goToDish(index));
    $('.signature-rows').append(row);
  });

  function updateCopy(index, direction=1, animate=false) {
    const dish = SIGNATURES[index];
    $('.dish-category').textContent = dish.category;
    $('.title-first').textContent = dish.title[0]; $('.title-second').textContent = dish.title[1];
    $('.dish-description').textContent = dish.description;
    $('.dish-price').textContent = money(dish.price); $('.dish-note').textContent = dish.note;
    $('.current-count').textContent = String(index+1).padStart(2,'0');
    $$('.dish-index button').forEach((button,i) => button.setAttribute('aria-current', i===index?'true':'false'));
    $('.giant-word').replaceChildren(...[...dish.word].map(letter => {const span=document.createElement('span');span.textContent=letter;return span;}));
    if (animate && animated) {
      gs.to(hero, {'--accent':dish.accent,duration:.8});
      gs.fromTo(['.title-first','.title-second'],{yPercent:direction*115},{yPercent:0,duration:.85,ease:'expo.out',stagger:.08,overwrite:true});
      gs.fromTo(['.dish-category','.dish-description','.dish-details'],{opacity:0,y:direction*15},{opacity:1,y:0,duration:.6,stagger:.04,overwrite:true});
      gs.fromTo('.giant-word span',{yPercent:direction*110,rotation:direction*8,opacity:0},{yPercent:0,rotation:0,opacity:1,duration:.95,stagger:{each:.035,from:direction>0?'start':'end'},ease:'expo.out',overwrite:true});
    } else {hero.style.setProperty('--accent',dish.accent);}
  }
  updateCopy(0);

  function waitFor(video, type, test, timeout=15000) {
    if (test()) return Promise.resolve();
    return new Promise((resolve,reject) => {
      const done = () => {cleanup();resolve();};
      const fail = () => {cleanup();reject(new Error(`Could not decode ${video.dataset.dish}`));};
      const timer = setTimeout(fail,timeout);
      const cleanup = () => {clearTimeout(timer);video.removeEventListener(type,done);video.removeEventListener('error',fail);};
      video.addEventListener(type,done,{once:true}); video.addEventListener('error',fail,{once:true});
    });
  }
  async function decodeAt(clip,time) {
    const video=clip.video;
    if (video.seeking) await waitFor(video,'seeked',()=>!video.seeking);
    if (Math.abs(video.currentTime-time)>.008) {
      video.currentTime=time;
      await waitFor(video,'seeked',()=>!video.seeking && video.readyState>=2);
    }
    await waitFor(video,'loadeddata',()=>video.readyState>=2);
    clip.time=video.currentTime;
  }
  async function loadClip(index) {
    const clip=clips[index];
    if(clip.promise) return clip.promise;
    clip.promise=(async()=>{
      const revision=SIGNATURES[index].mediaVersion?`?v=${encodeURIComponent(SIGNATURES[index].mediaVersion)}`:'';
      const response=await fetch(`media/hero/${SIGNATURES[index].id}${mobile.matches?'-m':''}.mp4${revision}`,{signal:events.signal});
      if(!response.ok) throw new Error(`Hero asset ${response.status}`);
      clip.url=URL.createObjectURL(await response.blob());clip.video.src=clip.url;clip.video.load();
      await waitFor(clip.video,'loadeddata',()=>clip.video.readyState>=2);
      // iOS primes the decoder before paused, programmatic seeking.
      try {await clip.video.play();clip.video.pause();} catch {clip.video.pause();}
      await decodeAt(clip,0);
      clip.ready=true;
      if(index===desired) void showDish(index,localProgress);
      return clip;
    })().catch(error=>{clip.error=error.message;return clip;});
    return clip.promise;
  }
  async function loadAll() { for(let i=0;i<SIGNATURES.length;i++) await loadClip(i); }

  async function showDish(index,progress) {
    const clip=clips[index];
    if(!clip.ready) return;
    if(index===current && clip.video.classList.contains('active')) return;
    if(pending===index)return;
    pending=index;
    const token=++switchToken;
    const direction=index>=current?1:-1;
    const previous=current;
    try {await decodeAt(clip,progress*Math.max(0,clip.video.duration-.05));} catch {if(token===switchToken)pending=-1;return;}
    if(token!==switchToken || index!==desired){if(token===switchToken)pending=-1;return;}
    pending=-1;
    const oldVideo=clips[previous].video;
    current=index;
    // Only reveal a frame after loadeddata + seeked have confirmed decoding.
    clip.video.classList.add('active');
    gs?.killTweensOf([oldVideo,clip.video]);
    if(animated && oldVideo!==clip.video && oldVideo.classList.contains('active')) {
      gs.to(oldVideo,{opacity:0,yPercent:-direction*13,scale:.86,filter:'blur(14px)',duration:.65,ease:'power3.inOut',onComplete:()=>{if(current!==previous)oldVideo.classList.remove('active');}});
    } else if(oldVideo!==clip.video) {oldVideo.style.opacity=0;oldVideo.classList.remove('active');}
    if(animated) {
      gs.fromTo(clip.video,{opacity:0,yPercent:direction*12,scale:1.18,filter:'blur(16px)'},{opacity:1,yPercent:0,scale:1,filter:'blur(0px)',duration:1,ease:'expo.out',overwrite:true});
      if(previous!==index) {
        gs.to('.giant-word span',{yPercent:-direction*100,opacity:0,duration:.16,stagger:{each:.008,from:direction>0?'start':'end'},overwrite:true,onComplete:()=>{if(current===index)updateCopy(index,direction,true);}});
      }
    } else {clip.video.style.opacity=1;clip.video.style.transform='none';clip.video.style.filter='none';}
    if(!animated || previous===index)updateCopy(index,direction,false);
    $('.hero-fallback').style.visibility='hidden';
  }

  function onProgress(progress) {
    totalProgress=Math.max(0,Math.min(1,progress));
    const scaled=totalProgress*SIGNATURES.length;
    const next=Math.min(7,Math.floor(scaled));
    if(next!==desired){switchToken++;pending=-1;}
    desired=next;
    localProgress=totalProgress===1?1:scaled-desired;
    $('.hero-progress>span').style.transform=`scaleX(${totalProgress})`;
    $('.hero-progress').setAttribute('aria-valuenow',String(Math.round(totalProgress*100)));
    if(desired!==current || !clips[desired].video.classList.contains('active')) void showDish(desired,localProgress);
  }

  function tick(time,deltaTime=16.67) {
    lenis?.raf(time*1000);
    if(!animated || current!==desired)return;
    const clip=clips[current]; const video=clip.video;
    if(!clip.ready || !Number.isFinite(video.duration))return;
    const target=localProgress*(video.duration-.05);
    // 0.2 at 60Hz; normalized to preserve the same response at 120Hz.
    clip.time+=(target-clip.time)*(1-Math.pow(.8,Math.min(deltaTime,64)/16.667));
    if(Math.abs(video.currentTime-clip.time)>.008 && !video.seeking)video.currentTime=clip.time;
  }
  if(animated) {
    gs.registerPlugin(st);
    if(window.Lenis) {lenis=new Lenis({lerp:.085,smoothWheel:true,syncTouch:false});lenis.on('scroll',st.update);lenis.stop();}
    scrollTrigger=st.create({id:'dish-hero',trigger:hero,start:'top top',end:()=>`+=${innerHeight*8*(mobile.matches?.9:1.05)}`,pin:true,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>onProgress(self.progress)});
    gs.ticker.add(tick);gs.ticker.lagSmoothing(0);
    // Arrow keys work like the clickable index when focus is inside the hero.
    hero.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();goToDish(Math.max(0,Math.min(7,desired+(event.key==='ArrowRight'?1:-1))));}});
  }
  function goToDish(index) {
    if(animated && scrollTrigger) {
      const y=scrollTrigger.start+(scrollTrigger.end-scrollTrigger.start)*(index+.015)/8;
      if(lenis)lenis.scrollTo(y,{duration:1.1,force:true});else window.scrollTo({top:y,behavior:'smooth'});
    } else {
      switchToken++;pending=-1;desired=index;localProgress=0;void showDish(index,0);
      if(!clips[index].ready){updateCopy(index);$('.hero-fallback').src=`media/img/${SIGNATURES[index].image}.webp`;$('.hero-fallback').alt=SIGNATURES[index].name;$('.hero-fallback').style.visibility='visible';clips.forEach(c=>{c.video.style.opacity=0;c.video.classList.remove('active');});current=index;}
      hero.scrollIntoView({behavior:'instant'});
    }
  }
  $('.dish-next').addEventListener('click',()=>goToDish((desired+1)%8));

  // Adelaide hours are independent of the visitor's computer timezone.
  function businessState(date=new Date()) {
    const parts=Object.fromEntries(new Intl.DateTimeFormat('en-AU',{timeZone:SITE.timezone,weekday:'short',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
    const day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(parts.weekday);
    const schedule=SITE.hours[day];
    const minutes=s=>{const [h,m]=s.split(':').map(Number);return h*60+m;};
    const now=Number(parts.hour)*60+Number(parts.minute);
    const previous=SITE.hours[(day+6)%7];
    const overnight=!!previous && minutes(previous[1])<=minutes(previous[0]) && now<minutes(previous[1]);
    const isOpen=overnight || !!schedule && now>=minutes(schedule[0]) && (minutes(schedule[1])<=minutes(schedule[0]) || now<minutes(schedule[1]));
    let nextOpening='';
    if(!isOpen){for(let offset=0;offset<8;offset++){const next=SITE.hours[(day+offset)%7];if(next && (offset>0 || now<minutes(next[0]))){nextOpening=`${offset===0?'':offset===1?'tomorrow ':['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][(day+offset)%7]+' '}${next[0]}`;break;}}}
    return {isOpen,parts,nextOpening};
  }
  function refreshStatus() {
    const {isOpen,parts,nextOpening}=businessState();
    $('.open-status').classList.toggle('closed',!isOpen);
    const status=isOpen?'Open now':nextOpening?`Closed · opens ${nextOpening}`:'Closed';
    $('.open-status span').textContent=status;
    $('.open-status').title=`${SITE.city} · ${parts.hour}:${parts.minute}`;
    $('.visit-status').textContent=status;$('.visit-status').classList.toggle('is-open',isOpen);
    $('#local-clock').textContent=`${parts.hour}:${parts.minute}:${parts.second}`;
    $('#local-clock').dateTime=new Date().toISOString();
  }
  refreshStatus();setInterval(refreshStatus,1000);
  window.siteStatusAt=date=>businessState(new Date(date));
  $$('[data-contact="phone"]').forEach(a=>a.href=`tel:${SITE.phone.replace(/[^+\d]/g,'')}`);
  $('.visit-phone').textContent=SITE.phoneDisplay||SITE.phone;
  $('[data-site-address]').textContent=SITE.address;
  $('[data-contact="directions"]').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;
  if(SITE.instagram){const a=$('[data-contact="instagram"]');a.href=SITE.instagram;a.textContent='Find us on Instagram ↗';a.removeAttribute('aria-disabled');a.target='_blank';a.rel='noopener noreferrer';}
  $('[data-year]').textContent=new Date().getFullYear();
  const formatHour=value=>{const [h,m]=value.split(':').map(Number);return `${h%12||12}${m?':'+String(m).padStart(2,'0'):''} ${h>=12?'pm':'am'}`;};
  const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const sameHours=Object.values(SITE.hours).length===7 && new Set(Object.values(SITE.hours).map(h=>JSON.stringify(h))).size===1;
  (sameHours?[[0,'Every day']]:[1,2,3,4,5,6,0].map(d=>[d,days[d]])).forEach(([day,label])=>{const hours=SITE.hours[day];const row=document.createElement('div');row.innerHTML=`<dt>${label}</dt><dd>${hours?`${formatHour(hours[0])} – ${formatHour(hours[1])}`:'Closed'}</dd>`;$('.opening-hours').append(row);});
  $('.opening-hours').insertAdjacentHTML('afterend','<p class="hours-note">Closing after midnight · Adelaide time</p>');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    $('.nav').classList.toggle('is-scrolled',y>60);
    if(animated && Math.abs(y-lastScroll)>6){gs.to('.nav',{yPercent:y>lastScroll&&y>100?-110:0,duration:.3,overwrite:true});lastScroll=y;}
  },{passive:true});
  const dialog=$('#navigation');
  function closeMenu(){dialog.close();$('.burger').setAttribute('aria-expanded','false');lenis?.start();}
  $('.burger').addEventListener('click',()=>{dialog.showModal();$('.burger').setAttribute('aria-expanded','true');lenis?.stop();});
  $('.close-menu').addEventListener('click',closeMenu);
  dialog.addEventListener('cancel',()=>{$('.burger').setAttribute('aria-expanded','false');lenis?.start();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeMenu();}});

  // HTML navigation remains usable without the animation libraries.
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',event=>{
    const target=$(a.getAttribute('href'));if(!target)return;
    event.preventDefault();if(dialog.open)closeMenu();
    if(lenis)lenis.scrollTo(target,{offset:-20,duration:1.3,force:true});else target.scrollIntoView({behavior:motion.matches?'instant':'smooth'});
    history.replaceState(null,'',a.getAttribute('href'));
  }));
  $$('.roll-link').forEach(a=>{const text=a.textContent;a.textContent='';a.setAttribute('aria-label',text);const wrap=document.createElement('span');wrap.className='roll-track';wrap.innerHTML='<span></span><span aria-hidden="true"></span>';wrap.children[0].textContent=text;wrap.children[1].textContent=text;a.append(wrap);});

  // Accessible full-menu tabs, rendered entirely from MENU.
  const categories=['Biriyani','Tandoor','Curries','Breads & Sides','Drinks'].filter(group=>MENU.some(item=>item.group===group));
  function selectMenu(index,focus=false){
    $$('.menu-tabs button').forEach((tab,i)=>{tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;if(i===index&&focus)tab.focus();});
    const panel=$('#menu-panel');panel.setAttribute('aria-labelledby',`menu-tab-${index}`);panel.replaceChildren();
    const filter=window.restaurantFilter||{};
    MENU.filter(item=>item.group===categories[index]&&(!filter.vegetarian||item.veg)&&(!filter.specials||item.special)&&(!filter.query||`${item.name} ${item.description}`.toLowerCase().includes(filter.query.toLowerCase()))).forEach(item=>{const article=document.createElement('article');article.className='menu-item';article.dataset.id=item.id||item.name.toLowerCase().replace(/[^a-z0-9]+/g,'-');const heading=document.createElement('h3');heading.textContent=item.name;if(item.veg){const marker=document.createElement('i');marker.className='veg-dot';marker.setAttribute('aria-label','Vegetarian');heading.append(marker);}const price=document.createElement('span');price.className='menu-item-price';price.textContent=money(item.special&&item.salePrice!=null?item.salePrice:item.price);const desc=document.createElement('p');desc.textContent=item.description;article.append(heading,price,desc);if(item.special){const badge=document.createElement('span');badge.className='special-badge';badge.textContent=item.specialText||'House special';article.append(badge);}panel.append(article);});
    if(!panel.children.length){const empty=document.createElement('p');empty.className='menu-empty';empty.textContent='No dishes in this category match your filters. Try another category or clear the filters.';panel.append(empty);}
    window.dispatchEvent(new CustomEvent('restaurant:menu-render',{detail:{category:categories[index]}}));
    st?.refresh();
  }
  categories.forEach((category,i)=>{const tab=document.createElement('button');tab.id=`menu-tab-${i}`;tab.textContent=category;tab.setAttribute('role','tab');tab.setAttribute('aria-controls','menu-panel');tab.addEventListener('click',()=>selectMenu(i));tab.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%categories.length;else if(e.key==='ArrowLeft')next=(i-1+categories.length)%categories.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=categories.length-1;else return;e.preventDefault();selectMenu(next,true);});$('.menu-tabs').append(tab);});
  selectMenu(0);
  function applyBusinessCopy(){
    $$('.brand').forEach(brand=>{const span=brand.querySelector(':scope > span');if(span?.firstChild)span.firstChild.textContent=SITE.name;brand.setAttribute('aria-label',SITE.name+' home');});
    $('.visit-location h3').textContent=SITE.name;document.title=SITE.name+' — A little fire. A lot of soul.';
    $('.visit-clock .eyebrow').textContent=SITE.city.toUpperCase()+' LOCAL TIME';
    const instagram=$('[data-contact="instagram"]');if(SITE.instagram){instagram.href=SITE.instagram;instagram.textContent='Find us on Instagram ↗';instagram.removeAttribute('aria-disabled');instagram.target='_blank';instagram.rel='noopener noreferrer';}else{instagram.removeAttribute('href');instagram.textContent='Instagram · coming soon';instagram.setAttribute('aria-disabled','true');}
  }
  window.restaurantControls={refreshMenu:()=>selectMenu(Math.max(0,$$('.menu-tabs button').findIndex(t=>t.getAttribute('aria-selected')==='true'))),applyCatalog:catalog=>{Object.assign(SITE,catalog.site);MENU.splice(0,MENU.length,...catalog.menu);SIGNATURES.forEach(dish=>{const item=catalog.menu.find(x=>x.id===dish.id);if(item)Object.assign(dish,{name:item.name,price:item.special&&item.salePrice!=null?item.salePrice:item.price,description:item.description,veg:item.veg});});updateCopy(current);$$('.signature-row').forEach((row,i)=>{row.querySelector('.signature-price').textContent=money(SIGNATURES[i].price);const name=row.querySelector('.signature-name');name.firstChild.textContent=SIGNATURES[i].name;});$$('[data-contact="phone"]').forEach(a=>a.href=`tel:${SITE.phone.replace(/[^+\d]/g,'')}`);$('.visit-phone').textContent=SITE.phoneDisplay||SITE.phone;$('[data-site-address]').textContent=SITE.address;$('[data-contact="directions"]').href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.address)}`;$('.opening-hours').replaceChildren();for(const day of [1,2,3,4,5,6,0]){const hours=SITE.hours[day];const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=days[day];dd.textContent=hours?`${formatHour(hours[0])} – ${formatHour(hours[1])}`:'Closed';row.append(dt,dd);$('.opening-hours').append(row);}applyBusinessCopy();refreshStatus();window.restaurantControls.refreshMenu();}};
  window.addEventListener('restaurant:modal',()=>{if(document.querySelector('dialog[open]'))lenis?.stop();else lenis?.start();});

  // Spice names remain English during hover, keyboard focus and text animation.
  SPICES.forEach(([name,note],i)=>{
    const item=document.createElement('li');item.innerHTML=`<button class="spice-name" aria-label="${name}"><span class="spice-number">${String(i+1).padStart(2,'0')}</span><span class="spice-text">${name}</span><span class="spice-star" aria-hidden="true">✦</span></button><p>${note}</p>`;
    $('.spice-list').append(item);const button=item.querySelector('button'),label=item.querySelector('.spice-text');let timer;
    const scramble=()=>{clearInterval(timer);label.lang='en';if(!animated){label.textContent=name;return;}const letters=[...name];const start=performance.now();timer=setInterval(()=>{const progress=Math.min(1,(performance.now()-start)/460);label.textContent=letters.map((letter,j)=>letter===' '||j/letters.length<progress?letter:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random()*26)]).join('');if(progress===1){clearInterval(timer);label.textContent=name;}},30);};
    const restore=()=>{clearInterval(timer);label.textContent=name;};
    button.addEventListener('pointerenter',scramble);button.addEventListener('pointerleave',restore);button.addEventListener('focus',scramble);button.addEventListener('blur',restore);button.addEventListener('click',scramble);
  });

  // Films are fetched and played only near the viewport; reduced motion uses posters.
  const films=$$('video[data-film]');
  const filmObserver=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{
    target.dataset.near=String(isIntersecting);
    if(isIntersecting&&!motion.matches&&!document.hidden){if(!target.src){const version=target.dataset.film==='biryani-rise'?'?v=biryani-v2':'';target.src=`media/v/${target.dataset.film}.mp4${version}`;}target.play().catch(()=>{});}else target.pause();
  }),{rootMargin:'160px 0px',threshold:0});
  films.forEach(video=>filmObserver.observe(video));
  document.addEventListener('visibilitychange',()=>films.forEach(v=>{if(document.hidden)v.pause();else if(v.dataset.near==='true'&&!motion.matches)v.play().catch(()=>{});}));

  let ruleIndex=0;
  function showRule(index){ruleIndex=(index+HOUSE_RULES.length)%HOUSE_RULES.length;const [first,second,caption]=HOUSE_RULES[ruleIndex];const render=()=>{$('.rule-stage blockquote p').replaceChildren(document.createTextNode(first),document.createElement('br'));const em=document.createElement('em');em.textContent=second;$('.rule-stage blockquote p').append(em);$('.rule-caption').textContent=`HOUSE RULE ${String(ruleIndex+1).padStart(2,'0')} / ${caption}`;$$('.rule-dots button').forEach((b,i)=>b.setAttribute('aria-current',String(i===ruleIndex)));};if(animated){gs.killTweensOf('.rule-stage');gs.to('.rule-stage',{opacity:0,y:-8,duration:.15,onComplete:()=>{render();gs.fromTo('.rule-stage',{y:12,opacity:0},{y:0,opacity:1,duration:.45});}});}else render();}
  HOUSE_RULES.forEach((_,i)=>{const dot=document.createElement('button');dot.setAttribute('aria-label',`House rule ${i+1}`);dot.setAttribute('aria-current',String(i===0));dot.addEventListener('click',()=>showRule(i));$('.rule-dots').append(dot);});
  $('.rule-prev').addEventListener('click',()=>showRule(ruleIndex-1));$('.rule-next').addEventListener('click',()=>showRule(ruleIndex+1));

  // The mask is HTML type composited over video, then zoomed through the first I.
  $('.mask-word').replaceChildren(...[...'BIRIYANI'].map((letter,i)=>{const span=document.createElement('span');span.textContent=letter;if(i===1)span.className='first-i';return span;}));
  $('.footer-word').replaceChildren(...[...'BIRIYANIWALA'].map(letter=>{const span=document.createElement('span');span.textContent=letter;span.setAttribute('aria-hidden','true');return span;}));
  function prepareHeadlines(){
    $$('.reveal-heading').forEach(heading=>{
      const lines=[[]];const walk=(node,italic=false)=>{if(node.nodeType===3)lines.at(-1).push({text:node.textContent,italic});else if(node.nodeName==='BR')lines.push([]);else node.childNodes.forEach(child=>walk(child,italic||node.nodeName==='EM'));};heading.childNodes.forEach(n=>walk(n));
      heading.replaceChildren(...lines.map(parts=>{const line=document.createElement('span');line.className='headline-line';const inner=document.createElement('span');inner.className='line-inner';parts.forEach(part=>{if(part.italic){const em=document.createElement('em');em.textContent=part.text;inner.append(em);}else inner.append(document.createTextNode(part.text));});line.append(inner);return line;}));
      if(animated)gs.fromTo(heading.querySelectorAll('.line-inner'),{yPercent:112},{yPercent:0,ease:'expo.out',duration:1.15,stagger:.1,scrollTrigger:{trigger:heading,start:'top 90%',toggleActions:'play none none reverse'}});
    });
  }
  function initStoryAnimations(){
    prepareHeadlines();
    if(!animated)return;
    const marqueeTweens=$$('.marquee-track').map((track,i)=>gs.fromTo(track,{xPercent:i?-50:0},{xPercent:i?0:-50,duration:32,repeat:-1,ease:'none'}));
    st.create({trigger:'.marquee',start:'top bottom',end:'bottom top',onUpdate:self=>{const speed=Math.min(5,1+Math.abs(self.getVelocity())/1400);marqueeTweens.forEach(t=>gs.to(t,{timeScale:speed,duration:.25,overwrite:true}));gs.to('.marquee-track',{skewX:Math.max(-6,Math.min(6,self.getVelocity()/-700)),duration:.3,overwrite:'auto'});gs.delayedCall(.2,()=>{marqueeTweens.forEach(t=>gs.to(t,{timeScale:1,duration:.7}));gs.to('.marquee-track',{skewX:0,duration:.7});});}});
    const manifesto=$('.manifesto');
    const walker=document.createTreeWalker(manifesto,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())if(walker.currentNode.textContent.trim())nodes.push(walker.currentNode);
    nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim())fragment.append(document.createTextNode(word));else{const span=document.createElement('span');span.className='manifesto-word';span.textContent=word;fragment.append(span);}});node.replaceWith(fragment);});
    const tokens=[...manifesto.querySelectorAll('.manifesto-word,.video-pill')];
    const manifestoTimeline=gs.timeline({scrollTrigger:{trigger:manifesto,start:'top 82%',end:'bottom 35%',scrub:true}});
    tokens.forEach((token,i)=>{if(token.classList.contains('video-pill'))manifestoTimeline.fromTo(token,{scale:.6,opacity:.25},{scale:1,opacity:1,duration:4},i);else manifestoTimeline.fromTo(token,{opacity:.17},{opacity:1,duration:3},i);});
    const track=$('.method-track');
    const distance=()=>Math.max(0,track.scrollWidth-innerWidth+innerWidth*.04);
    const horizontal=gs.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{id:'method',trigger:'.method-section',start:'top top',end:()=>`+=${distance()}`,pin:'.method-pin',scrub:1,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{$('.method-progress span').style.transform=`scaleX(${self.progress})`;}}});
    $$('.method-media video,.method-media img').forEach(media=>gs.fromTo(media,{xPercent:-6},{xPercent:6,ease:'none',scrollTrigger:{trigger:media.parentElement,containerAnimation:horizontal,start:'left right',end:'right left',scrub:true}}));
    const mask=$('.word-mask');
    function maskPoint(){gs.set(mask,{scale:1,x:0,y:0});const letter=$('.first-i'),word=$('.mask-word').getBoundingClientRect(),p=mask.getBoundingClientRect(),style=getComputedStyle(letter),measure=document.createElement('canvas').getContext('2d');measure.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;const ink=measure.measureText('I');return{x:word.left-p.left+letter.offsetLeft+(ink.actualBoundingBoxRight-ink.actualBoundingBoxLeft)/2,y:word.top-p.top+letter.offsetTop+letter.offsetHeight*.45};}
    let point=maskPoint();
    const wordTimeline=gs.timeline({scrollTrigger:{id:'word-film',trigger:'.word-film',start:'top top',end:'+=180%',pin:'.word-film-pin',scrub:.8,invalidateOnRefresh:true,onRefreshInit:()=>{point=maskPoint();}}});
    wordTimeline.set(mask,{transformOrigin:()=>`${point.x}px ${point.y}px`},0).fromTo('.mask-word span',{yPercent:120},{yPercent:0,stagger:.05,duration:1,ease:'power3.out'},0).to(mask,{x:()=>innerWidth/2-point.x,y:()=>innerHeight/2-point.y,duration:.5,ease:'power2.inOut'},1.3).to(mask,{scale:110,duration:2.2,ease:'power2.in'},1.8).fromTo('.word-film-pin>video',{scale:1},{scale:1.12,duration:2.2},1.8).to(mask,{opacity:0,duration:.1},3.95).fromTo('.word-caption',{opacity:0,y:25},{opacity:1,y:0,duration:.5},3.5).to({},{duration:.5});
    $$('.spice-list li').forEach((item,i)=>{const activate=()=>{$('.spice-counter b').textContent=String(i+1).padStart(2,'0');$$('.spice-list li').forEach((li,n)=>li.classList.toggle('is-active',n===i));};st.create({trigger:item,start:'top 58%',end:'bottom 58%',onEnter:activate,onEnterBack:activate});});
    $$('[data-count]').forEach(el=>{const value=Number(el.dataset.count),counter={value:0};gs.to(counter,{value,duration:1.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true},onUpdate:()=>el.textContent=String(Math.round(counter.value))});});
    $$('.pour-words>span').forEach((word,i)=>gs.fromTo(word,{xPercent:i%2?55:-55,opacity:.2},{xPercent:0,opacity:1,ease:'none',scrollTrigger:{trigger:word,start:'top 90%',end:'top 28%',scrub:true}}));
    gs.fromTo('.footer-word span',{yPercent:120,rotation:5},{yPercent:0,rotation:0,stagger:{each:.055,from:'center'},duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.footer-word',start:'top 95%',toggleActions:'play none none reverse'}});
    st.refresh();
  }
  (document.fonts?.ready||Promise.resolve()).then(initStoryAnimations);

  // A bounded spark field, active only while the tandoor is near the viewport.
  const canvas=$('#sparks'),context=canvas.getContext('2d');let sparks=[],sparkVisible=false,cw=0,ch=0;
  function resizeSparks(){const r=$('#tandoor').getBoundingClientRect(),dpr=Math.min(devicePixelRatio,2);cw=r.width;ch=r.height;canvas.width=Math.round(cw*dpr);canvas.height=Math.round(ch*dpr);context.setTransform(dpr,0,0,dpr,0,0);sparks=Array.from({length:mobile.matches?70:160},()=>({x:Math.random()*cw,y:Math.random()*ch,size:Math.random()*1.7+.4,speed:Math.random()*45+18,phase:Math.random()*Math.PI*2}));}
  resizeSparks();window.addEventListener('resize',resizeSparks,{passive:true});
  new IntersectionObserver(entries=>{sparkVisible=entries[0].isIntersecting;},{rootMargin:'80px'}).observe($('#tandoor'));
  if(animated)gs.ticker.add((time,delta)=>{if(!sparkVisible||document.hidden)return;context.clearRect(0,0,cw,ch);const dt=Math.min(delta,50)/1000;sparks.forEach(p=>{p.y-=p.speed*dt;p.x+=Math.sin(time+p.phase)*10*dt;if(p.y<-5){p.y=ch+5;p.x=Math.random()*cw;}context.globalAlpha=.2+.65*(1-p.y/ch);context.fillStyle=p.size>1.3?'#ffc35a':'#c06a3a';context.beginPath();context.ellipse(p.x,p.y,p.size*.6,p.size*1.8,-.3,0,Math.PI*2);context.fill();});});

  // Fine pointer enhancements are never installed on touch or reduced motion.
  if(animated && matchMedia('(pointer:fine)').matches) {
    const dot=$('.cursor-dot'),ring=$('.cursor-ring');
    const moveX=gs.quickTo(ring,'x',{duration:.25}),moveY=gs.quickTo(ring,'y',{duration:.25});
    window.addEventListener('pointermove',event=>{document.body.classList.add('has-pointer');gs.set(dot,{x:event.clientX,y:event.clientY});moveX(event.clientX);moveY(event.clientY);});
    document.documentElement.addEventListener('pointerleave',()=>document.body.classList.remove('has-pointer'));
    $$('[data-cursor]').forEach(el=>{el.addEventListener('pointerenter',()=>{ring.classList.add('media');ring.firstElementChild.textContent=el.dataset.cursor;});el.addEventListener('pointerleave',()=>{ring.classList.remove('media');ring.firstElementChild.textContent='';});});
    hero.addEventListener('pointermove',event=>{gs.to('.arch',{rotationY:(event.clientX/innerWidth-.5)*5,rotationX:-(event.clientY/innerHeight-.5)*4,duration:1,ease:'power2.out'});});
    hero.addEventListener('pointerleave',()=>gs.to('.arch',{rotationX:0,rotationY:0,duration:1}));
    $$('.magnetic').forEach(el=>{el.addEventListener('pointermove',event=>{const r=el.getBoundingClientRect();gs.to(el,{x:(event.clientX-r.left-r.width/2)*.12,y:(event.clientY-r.top-r.height/2)*.16,duration:.3});});el.addEventListener('pointerleave',()=>gs.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}));});
    $$('.tilt-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();gs.to(card,{rotationX:-(e.clientY-r.top-r.height/2)/r.height*8,rotationY:(e.clientX-r.left-r.width/2)/r.width*8,transformPerspective:900,duration:.5});});card.addEventListener('pointerleave',()=>gs.to(card,{rotationX:0,rotationY:0,duration:.7}));});
    const hover=$('.menu-hover');
    $$('.signature-row').forEach(row=>{row.addEventListener('pointerenter',()=>{hover.querySelector('img').src=`media/img/${row.dataset.image}.webp`;gs.to(hover,{opacity:1,scale:1,rotation:-5,duration:.25});});row.addEventListener('pointermove',e=>gs.to(hover,{x:Math.min(innerWidth-330,Math.max(20,e.clientX-150)),y:Math.max(20,e.clientY-210),duration:.3,overwrite:true}));row.addEventListener('pointerleave',()=>gs.to(hover,{opacity:0,scale:.8,rotation:0,duration:.2}));});
  }

  async function runLoader() {
    const start=performance.now();
    const progressTimer=setInterval(()=>{
      const elapsed=performance.now()-start;
      const percent=Math.min(94,Math.round(elapsed/1600*94));
      $('.loader-count').textContent=String(percent).padStart(3,'0');
      $('.loader-track span').style.width=`${percent}%`;
      $('.loader-message').textContent=percent<30?'Sealing the handi with dough':percent<72?'Slow-cooking on dum':'Lifting the lid';
    },45);
    const fontReady=document.fonts?.ready||Promise.resolve();
    const loadPromise=loadAll();
    await Promise.race([Promise.all([fontReady,clips[0].promise,new Promise(resolve=>setTimeout(resolve,1400))]),new Promise(resolve=>setTimeout(resolve,4500))]);
    clearInterval(progressTimer);
    $('.loader-count').textContent='100';$('.loader-track span').style.width='100%';$('.loader-message').textContent='Lifting the lid';
    const finish=()=>{$('.loader').remove();loaderDone=true;if(!document.querySelector('dialog[open]'))lenis?.start();st?.refresh();window.dispatchEvent(new Event('restaurant:ready'));};
    if(animated){gs.timeline({onComplete:finish}).to('.loader-content',{opacity:0,duration:.25,delay:.18}).to('.loader-top',{yPercent:-100,duration:.75,ease:'power3.inOut'},.3).to('.loader-bottom',{yPercent:100,duration:.75,ease:'power3.inOut'},.3);}
    else finish();
    await loadPromise;
  }
  void runLoader();
  // Browsers can suspend pages in bfcache; keep object URLs intact until unload.
  window.addEventListener('pagehide',event=>{if(!event.persisted){events.abort();clips.forEach(c=>{if(c.url)URL.revokeObjectURL(c.url);});}});
  motion.addEventListener('change',()=>location.reload());
  mobile.addEventListener('change',()=>location.reload());
  // Read-only diagnostic surface for the hero acceptance checks.
  window.heroDebug=()=>({current,desired,localProgress,totalProgress,loaderDone,reducedMotion:motion.matches,clips:clips.map((c,i)=>({id:SIGNATURES[i].id,ready:c.ready,error:c.error,source:c.video.currentSrc,displayed:c.video.classList.contains('active'),time:c.video.currentTime,duration:c.video.duration,seeking:c.video.seeking,width:c.video.videoWidth}))});
})();


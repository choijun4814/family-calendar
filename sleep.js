/* sleep.js - 수면 소리: 비·파도·숲의 밤·모닥불 (계속 달라지는 생성음 + 타이머) */
(()=>{
const M=Math,rn=M.random,rr=(a,b)=>a+rn()*(b-a);
const LY=[['rain','🌧 빗소리'],['wave','🌊 파도'],['wood','🌲 숲의 밤'],['fire','🔥 모닥불']];
let st={rain:70,wave:0,wood:0,fire:0,tm:30};try{Object.assign(st,JSON.parse(localStorage.getItem('sl1')))}catch(e){}
const sv=()=>{try{localStorage.setItem('sl1',JSON.stringify(st))}catch(e){}};
let ac,mg,nb,L={},on=0,gen=0,t0=0,built=0,iv=0;
const now=()=>ac.currentTime;
function nz(ty,f,q,dst){const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type=ty;fl.frequency.value=f;fl.Q.value=q;s.connect(fl);fl.connect(dst);s.start(0,rn()*3);return fl}
function sub(k,v){const g=ac.createGain();g.gain.value=v||0;g.connect(L[k].g);return g}
function pn(dst,p){if(!ac.createStereoPanner)return dst;const q=ac.createStereoPanner();q.pan.value=p;q.connect(dst);return q}
function burst(k,d,f,q,v,ty,p){const s=ac.createBufferSource();s.buffer=nb;const fl=ac.createBiquadFilter();fl.type=ty||'bandpass';fl.frequency.value=f;fl.Q.value=q;const g=ac.createGain(),t=now();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(pn(L[k].g,p));s.start(t,rn()*3);s.stop(t+d+.05)}
function lp(fn,a,b){const id=gen;const go=()=>{if(!on||id!==gen)return;fn();setTimeout(go,rr(a,b))};setTimeout(go,rr(a,b))}
function init(){ac=new(window.AudioContext||window.webkitAudioContext)();const cp=ac.createDynamicsCompressor();mg=ac.createGain();mg.gain.value=0;mg.connect(cp);cp.connect(ac.destination);
const n=ac.sampleRate*4,b=ac.createBuffer(2,n,ac.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=rn()*2-1}nb=b;
LY.forEach(([k])=>{const g=ac.createGain();g.gain.value=0;const p=ac.createStereoPanner?ac.createStereoPanner():null;if(p){g.connect(p);p.connect(mg)}else g.connect(mg);L[k]={g,p}});
/* 비: 굵은 빗소리 + 잔잔한 쉿 소리 */
const rb=sub('rain'),rh=sub('rain');nz('lowpass',900,.3,rb);nz('bandpass',3200,.7,rh);nz('highpass',7000,.5,sub('rain',.05));L.rain.b=rb;L.rain.h=rh;
/* 파도 */
const sw=sub('wave'),fg=sub('wave');L.wave.sw=sw;L.wave.fg=fg;L.wave.fl=nz('lowpass',400,.5,sw);nz('highpass',2600,.4,fg);
/* 숲: 나뭇잎 스치는 소리 */
const lf=sub('wood');L.wood.lf=lf;nz('bandpass',3000,.6,lf);
/* 모닥불 */
const fr=sub('fire');L.fire.fr=fr;nz('lowpass',260,.5,fr);built=1}
function layers(){const g=gen;
/* 비 세기가 몇 초마다 천천히 달라짐 */
lp(()=>{const x=rn()<.15?rr(.25,.45):rr(.5,1),t=now();L.rain.b.gain.setTargetAtTime(x*.8,t,2.5);L.rain.h.gain.setTargetAtTime(x*.55,t,2.5);L.rain.x=x;if(L.rain.p)L.rain.p.pan.setTargetAtTime(rr(-.3,.3),t,6)},4000,9000);
lp(()=>{const x=L.rain.x||.7;if(rn()<x)burst('rain',.025,rr(2000,6500),3,.12*x,'bandpass',rr(-1,1))},35,180);
/* 파도: 주기 8~14초, 매번 크기가 다름 */
const wv=()=>{if(!on||g!==gen)return;const T=rr(8,14),a=rr(.45,1),t=now(),{sw,fg,fl}=L.wave;[sw.gain,fg.gain,fl.frequency].forEach(p=>{p.cancelScheduledValues(t);p.setValueAtTime(p.value,t)});
sw.gain.linearRampToValueAtTime(a,t+T*.4);sw.gain.linearRampToValueAtTime(.08,t+T);fl.frequency.linearRampToValueAtTime(250+700*a,t+T*.4);fl.frequency.linearRampToValueAtTime(250,t+T);
fg.gain.linearRampToValueAtTime(0,t+T*.25);fg.gain.linearRampToValueAtTime(.3*a,t+T*.45);fg.gain.linearRampToValueAtTime(0,t+T*.85);if(L.wave.p)L.wave.p.pan.setTargetAtTime(rr(-.5,.5),t,T*.4);setTimeout(wv,T*1000*rr(.75,1.05))};wv();
/* 숲: 귀뚜라미 3마리(음높이·박자 제각각), 먼 개구리, 아주 가끔 올빼미, 바람결 */
for(let i=0;i<3;i++){const f=rr(4100,5300),o=ac.createOscillator(),ag=ac.createGain(),rt=rr(.085,.14);o.type='sine';o.frequency.value=f;ag.gain.value=0;o.connect(ag);ag.connect(pn(L.wood.g,rr(-.9,.9)));o.start();
const ch=()=>{if(!on||g!==gen)return;const t=now(),n=3+(rn()*4|0);o.frequency.setValueAtTime(f*rr(.985,1.015),t);for(let j=0;j<n;j++){const s=t+j*rt;ag.gain.setValueAtTime(0,s);ag.gain.linearRampToValueAtTime(.035,s+rt*.2);ag.gain.linearRampToValueAtTime(0,s+rt*.6)}setTimeout(ch,(n*rt+rr(.3,3))*1000)};setTimeout(ch,rr(0,3000))}
lp(()=>{const t=now(),n=2+(rn()*3|0),p=rr(-.9,.9),f=rr(110,170);for(let j=0;j<n;j++){const o=ac.createOscillator(),fl=ac.createBiquadFilter(),ag=ac.createGain(),s=t+j*.16;o.type='sawtooth';o.frequency.setValueAtTime(f,s);o.frequency.linearRampToValueAtTime(f*1.4,s+.09);fl.type='lowpass';fl.frequency.value=420;ag.gain.setValueAtTime(.0001,s);ag.gain.exponentialRampToValueAtTime(.05,s+.03);ag.gain.exponentialRampToValueAtTime(.0001,s+.12);o.connect(fl);fl.connect(ag);ag.connect(pn(L.wood.g,p));o.start(s);o.stop(s+.14)}},9000,26000);
lp(()=>{const t=now(),p=rr(-.7,.7),f=rr(300,350);[0,.7,1.05].forEach((d,j)=>{const o=ac.createOscillator(),ag=ac.createGain(),s=t+d;o.type='sine';o.frequency.setValueAtTime(f,s);o.frequency.linearRampToValueAtTime(f*.88,s+.35);ag.gain.setValueAtTime(.0001,s);ag.gain.exponentialRampToValueAtTime(j==2?.05:.035,s+.1);ag.gain.exponentialRampToValueAtTime(.0001,s+(j==2?.5:.3));o.connect(ag);ag.connect(pn(L.wood.g,p));o.start(s);o.stop(s+.6)})},70000,180000);
lp(()=>L.wood.lf.gain.setTargetAtTime(rr(.03,.16),now(),2),3000,7000);
/* 모닥불: 불규칙한 톡톡 + 낮은 으르렁 */
lp(()=>{L.fire.fr.gain.setTargetAtTime(rr(.25,.5),now(),.8)},1500,4000);
lp(()=>{const n=rn()<.2?2+(rn()*4|0):1;for(let j=0;j<n;j++)setTimeout(()=>on&&burst('fire',rr(.01,.05),rr(1500,5500),1.5,rr(.1,.55),'highpass',rr(-.8,.8)),j*rr(15,60))},50,550)}
function vol(){if(!built)return;const t=now();LY.forEach(([k])=>L[k].g.gain.setTargetAtTime((st[k]||0)/100,t,.3))}
function tick(){const s=document.getElementById('slst'),el=(Date.now()-t0)/1000,tot=st.tm*60;let m=1;if(tot){m=1-.45*M.min(1,el/tot);if(tot-el<90)m*=M.max(0,(tot-el)/90);if(el>=tot){stop();return}}mg.gain.setTargetAtTime(m,now(),1);if(s)s.textContent='재생 중 · '+(tot?'남은 '+M.ceil((tot-el)/60)+'분 (갈수록 작아져요)':'계속 재생')}
function start(){if(!ac)init();ac.resume();gen++;on=1;t0=Date.now();vol();mg.gain.cancelScheduledValues(now());mg.gain.setValueAtTime(mg.gain.value,now());mg.gain.linearRampToValueAtTime(1,now()+5);layers();clearInterval(iv);iv=setInterval(tick,1000);tick();ui2()}
function stop(){if(!on)return;on=0;gen++;clearInterval(iv);const t=now();mg.gain.cancelScheduledValues(t);mg.gain.setTargetAtTime(0,t,.8);setTimeout(()=>{if(!on)ac.suspend()},4000);ui2();const s=document.getElementById('slst');if(s)s.textContent='꺼짐'}
function ui2(){const b=document.getElementById('slgo');if(b)b.textContent=on?'■ 멈추기':'▶ 재생'}
document.addEventListener('click',e=>{const a=e.target.closest('[data-sl]');if(!a)return;e.stopPropagation();if(a.dataset.sl==='go')on?stop():start();else{st.tm=+a.dataset.v;sv();a.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===a));if(on){t0=Date.now();tick()}}},true);
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.slk;if(!k)return;st[k]=+e.target.value;sv();vol()});
const card=()=>`<div class="mu" style="margin-top:18px"><b style="color:var(--g2)">🌙 수면 소리</b><br>소리가 계속 조금씩 달라져서 질리지 않아요. 작게 틀고 타이머를 맞춰 보세요.</div>`
+LY.map(([k,n])=>`<div style="display:flex;align-items:center;gap:10px;margin-top:10px;width:100%"><span style="min-width:84px">${n}</span><input type="range" min="0" max="100" value="${st[k]||0}" data-slk="${k}" style="flex:1"></div>`).join('')
+`<div class="fn" style="margin-top:10px">${[[15,'15분'],[30,'30분'],[60,'60분'],[0,'계속']].map(([v,t])=>`<button data-sl="tm" data-v="${v}" class="${st.tm===v?'on':''}">${t}</button>`).join('')}</div><div class="fn"><button data-sl="go" id="slgo">${on?'■ 멈추기':'▶ 재생'}</button></div><div class="mu" id="slst" style="margin-top:6px">${on?'재생 중':'꺼짐'}</div>`;
if(window.FX){const o=FX.ui;FX.ui=()=>o()+card()}
})();

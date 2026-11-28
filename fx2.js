/* fx2.js - 실감 효과음(SFX) + 계절 풍경(SCENE) */
(()=>{
const M=Math,PI2=6.2832,rn=M.random,rr=(a,b)=>a+rn()*(b-a);
/* ───── 효과음: 비·바람·우박·천둥 (최대 음량 + 리미터) ───── */
let ac,mg,nb,G={},lt=0,hc=0;
const vol=()=>M.min(1,(typeof S!=='undefined'&&S.vol!==undefined?S.vol:100)/100),mute=()=>typeof S!=='undefined'&&S.sn===0;
function loop(t,f,q){const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type=t;fl.frequency.value=f;fl.Q.value=q;const g=ac.createGain();g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(mg);s.start(0,rn()*1.5);return g}
function init(){if(ac)return ac;try{ac=new(window.AudioContext||window.webkitAudioContext)();const cp=ac.createDynamicsCompressor();cp.threshold.value=-10;cp.knee.value=6;cp.ratio.value=16;mg=ac.createGain();mg.gain.value=0;mg.connect(cp);cp.connect(ac.destination);
const n=ac.sampleRate*2,b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=rn()*2-1;nb=b;
G.r1=loop('bandpass',2400,.5);G.r2=loop('lowpass',800,.4);G.w=loop('bandpass',420,.8)}catch(e){ac=null}return ac}
function go(){if(!init())return false;if(ac.state==='suspended')ac.resume();return ac.state==='running'&&!mute()}
function burst(t0,d,f,q,v,ty,pan){const s=ac.createBufferSource();s.buffer=nb;const fl=ac.createBiquadFilter();fl.type=ty||'bandpass';fl.frequency.value=f;fl.Q.value=q||1;const g=ac.createGain();g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+d);s.connect(fl);fl.connect(g);let o=g;if(ac.createStereoPanner){const p=ac.createStereoPanner();p.pan.value=pan||0;g.connect(p);o=p}o.connect(mg);s.start(t0,rn());s.stop(t0+d+.05)}
function ping(t0,f,v,pan){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(v,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.09);o.connect(g);g.connect(mg);o.start(t0);o.stop(t0+.1)}
function rum(t0,d,v){const s=ac.createBufferSource();s.buffer=nb;s.loop=true;const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.setValueAtTime(260,t0);fl.frequency.exponentialRampToValueAtTime(70,t0+d);const g=ac.createGain();g.gain.setValueAtTime(.0001,t0);g.gain.linearRampToValueAtTime(v,t0+.25);for(let i=1;i<7;i++)g.gain.linearRampToValueAtTime(v*rr(.3,1)*(1-i/8),t0+.25+i*d/7);g.gain.linearRampToValueAtTime(.0001,t0+d);s.connect(fl);fl.connect(g);g.connect(mg);s.start(t0,rn());s.stop(t0+d+.1)}
window.SFX={init,
crack(){if(!go())return;mg.gain.value=3.4*vol();const t=ac.currentTime+.01,p=rr(-.6,.6);burst(t,.5,2200,.6,2.2,'highpass',p);burst(t+.02,.9,700,.5,2.6,'lowpass',p);rum(t+.05,2.2,2.4)},
thunder(){if(!go())return;mg.gain.value=3.4*vol();rum(ac.currentTime+.02,rr(4,6.5),3)},
frog(){if(!go())return;const t=ac.currentTime+.01;for(let i=0;i<2;i++){const o=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain(),t0=t+i*.17;o.type='sawtooth';o.frequency.setValueAtTime(150,t0);o.frequency.linearRampToValueAtTime(230,t0+.1);f.type='bandpass';f.frequency.value=700;f.Q.value=3;g.gain.setValueAtTime(.0001,t0);g.gain.exponentialRampToValueAtTime(.5,t0+.03);g.gain.exponentialRampToValueAtTime(.0001,t0+.13);o.connect(f);f.connect(g);g.connect(mg);o.start(t0);o.stop(t0+.15)}},
tick(R,w,hz,sz,T,blz,now){lt=now;if(!go()){if(mg&&G.r1)off();return}const t=ac.currentTime,v=vol();mg.gain.setTargetAtTime(3.4*v,t,.1);
const rain=M.min(1,R+sz*.4+hz*.2);G.r1.gain.setTargetAtTime(rain*1.5,t,.4);G.r2.gain.setTargetAtTime(rain*1.1,t,.4);
G.w.gain.setTargetAtTime(M.min(1.6,(w*1.2+T*.9+blz*.8)*(1+.3*M.sin(now/900))),t,.3);
if(rain>.15&&rn()<rain*.35)burst(t,.025,rr(3000,6500),3,.25,'bandpass',rr(-1,1));
if(hz>.05&&rn()<hz*.9){burst(t,.03,rr(3500,6000),2,1.3,'bandpass',rr(-1,1));if(rn()<.3)ping(t,rr(2200,4200),.35)}}};
function off(){const t=ac.currentTime;['r1','r2','w'].forEach(k=>G[k].gain.setTargetAtTime(0,t,.2))}
setInterval(()=>{if(ac&&G.r1&&performance.now()-lt>800)off()},500);
['pointerdown','touchend','click'].forEach(e=>addEventListener(e,()=>{init();ac&&ac.state==='suspended'&&ac.resume()},{passive:true}));
/* ───── 계절 풍경: 계절마다 3가지 테마가 돌아가며 나와요 ───── */
if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
let cv,g,W,H,gy=0,fc=0,off0=rn()*9e4;
const sr=s=>()=>(s=(s*16807)%2147483647)/2147483647,K=()=>M.min(1.5,M.max(.85,W/400));
function mk(){const w=document.getElementById('wx');if(!w)return 0;cv=document.createElement('canvas');cv.id='sc2';w.before(cv);g=cv.getContext('2d');rs();addEventListener('resize',rs);const s=document.createElement('style');s.textContent='#sc2{position:fixed;inset:0;z-index:-1;pointer-events:none;display:none}html[data-skin=scenic] #sc2{display:block}html[data-sa="0"] #sc2{display:none}';document.head.append(s);return 1}
function rs(){const d=M.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cv.style.width=W+'px';cv.style.height=H+'px';g.setTransform(d,0,0,d,0,0)}
function gnd(){const l=document.querySelector('#v-cal .lg'),n=document.querySelector('nav');let t=H-100;if(l&&l.getClientRects().length)t=l.getBoundingClientRect().top-6;else if(n&&n.getClientRects().length)t=n.getBoundingClientRect().top-6;gy=M.min(H-40,M.max(H*.5,t))}
const blob=(x,y,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(x,y,r,0,PI2);g.fill()},el=(x,y,a,b,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(x,y,a,b,0,0,PI2);g.fill()};
function hill(c1,c2,amp,off,ph){const gr=g.createLinearGradient(0,gy-amp-off,0,gy+30);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.beginPath();g.moveTo(0,gy+30);for(let x=0;x<=W;x+=16)g.lineTo(x,gy-off-amp*(.5+.5*M.sin(x/(W*.17)+ph)));g.lineTo(W,gy+30);g.fill()}
function tree(x,b,h,c1,c2,sw,tr){const k=K();g.fillStyle=tr||'#5a3a22';g.fillRect(x-2.2*k,b-h*.5,4.4*k,h*.5);const sx=sw*3;[[0,-.78,.34,c1],[-.22,-.62,.26,c2],[.22,-.62,.26,c2],[0,-.55,.3,c1]].forEach(a=>blob(x+a[0]*h+sx*(1+a[1]),b+a[1]*h,a[2]*h,a[3]))}
function pine(x,b,h,sn,sw){const k=K();g.fillStyle='#4a2f1c';g.fillRect(x-2*k,b-h*.15,4*k,h*.15);for(let i=0;i<3;i++){const y=b-h*.12-i*h*.27,w=h*(.36-i*.09),sx=sw*i*1.5;g.fillStyle='#1f5a3c';g.beginPath();g.moveTo(x+sx*.5,y-h*.38);g.lineTo(x-w,y);g.lineTo(x+w,y);g.fill();if(sn){g.fillStyle='rgba(255,255,255,.93)';g.beginPath();g.moveTo(x+sx*.5,y-h*.38);g.lineTo(x-w*.55,y-h*.17);g.quadraticCurveTo(x,y-h*.1,x+w*.55,y-h*.17);g.fill()}}}
function fl(x,b,h,c,ct,sw,kd){g.strokeStyle='#3f9a46';g.lineWidth=1.8;const tx=x+sw*4;g.beginPath();g.moveTo(x,b);g.quadraticCurveTo(x+sw,b-h*.5,tx,b-h);g.stroke();const r=h*.2;if(kd===1)el(tx,b-h,r*.8,r*1.2,c);else if(kd===2){for(let i=0;i<10;i++)el(tx+M.cos(i*.628)*r*1.1,b-h+M.sin(i*.628)*r*1.1,r*.55,r*.3,c);blob(tx,b-h,r*.85,ct)}else{blob(tx,b-h,r,c);blob(tx,b-h,r*.45,ct)}}
function house(x,b,w,h,c,now){g.fillStyle=c;g.fillRect(x-w/2,b-h,w,h);g.fillStyle='#8a3a2a';g.beginPath();g.moveTo(x-w*.62,b-h);g.lineTo(x,b-h-w*.45);g.lineTo(x+w*.62,b-h);g.fill();g.fillStyle='#fff';g.beginPath();g.moveTo(x-w*.62,b-h);g.lineTo(x,b-h-w*.45);g.lineTo(x+w*.62,b-h);g.lineTo(x+w*.5,b-h-2);g.lineTo(x,b-h-w*.38);g.lineTo(x-w*.5,b-h-2);g.fill();const a=.75+.2*M.sin(now/500+x);g.fillStyle=`rgba(255,215,110,${a})`;g.fillRect(x-w*.28,b-h*.7,w*.22,h*.28);g.fillRect(x+w*.08,b-h*.7,w*.22,h*.28)}
const pal=(x,b,h,sw)=>{g.strokeStyle='#7a5230';g.lineWidth=5;g.beginPath();g.moveTo(x,b);g.quadraticCurveTo(x+h*.12+sw*3,b-h*.5,x+sw*6+h*.1,b-h);g.stroke();const tx=x+sw*6+h*.1,ty=b-h;g.strokeStyle='#2f9a4a';g.lineWidth=4;g.lineCap='round';for(let i=0;i<6;i++){const a=-3.14+i*.63+sw*.05;g.beginPath();g.moveTo(tx,ty);g.quadraticCurveTo(tx+M.cos(a)*h*.3,ty+M.sin(a)*h*.3-8,tx+M.cos(a)*h*.45,ty+M.sin(a)*h*.45+14);g.stroke()}},
umb=(x,b,h,c)=>{g.strokeStyle='#eee';g.lineWidth=2;g.beginPath();g.moveTo(x,b);g.lineTo(x,b-h);g.stroke();g.fillStyle=c;g.beginPath();g.arc(x,b-h,h*.55,3.14,6.28);g.fill()},
reed=(x,b,h,sw)=>{g.strokeStyle='#b99a5a';g.lineWidth=1.4;const tx=x+sw*5;g.beginPath();g.moveTo(x,b);g.quadraticCurveTo(x+sw*2,b-h*.6,tx,b-h);g.stroke();g.fillStyle='rgba(235,225,200,.9)';g.beginPath();g.ellipse(tx,b-h,2.4,h*.16,sw*.3,0,PI2);g.fill()},
pump=(x,b,r)=>{el(x,b-r*.7,r,r*.75,'#f08a1f');el(x-r*.45,b-r*.7,r*.45,r*.72,'#e07a10');el(x+r*.45,b-r*.7,r*.45,r*.72,'#e07a10');g.fillStyle='#4a6a2a';g.fillRect(x-1.5,b-r*1.5,3,r*.4)},
snm=(x,b,r)=>{blob(x,b-r,r,'#fff');blob(x,b-r*2.3,r*.72,'#fff');blob(x-r*.25,b-r*2.4,1.6,'#222');blob(x+r*.25,b-r*2.4,1.6,'#222');g.fillStyle='#ff7a1a';g.beginPath();g.moveTo(x,b-r*2.25);g.lineTo(x+r*.7,b-r*2.2);g.lineTo(x,b-r*2.1);g.fill();g.fillStyle='#c22';g.fillRect(x-r*.6,b-r*1.7,r*1.2,r*.22)};
const TH=[
[(n,w,k,r)=>{hill('#9fdc8a','#6dbb62',22*k,6*k,1);for(let i=0;i<5;i++)tree(W*(.08+i*.21+r()*.05),gy-4,(70+r()*30)*k,'#ffb7d0','#ff94bd',M.sin(n/900+i)*w,'#6a4a32');for(let i=0;i<26;i++)blob(r()*W,gy+r()*14,2.2*k,'#fff')},
(n,w,k,r)=>{hill('#b6e06a','#7cc24a',16*k,4*k,2);for(let i=0;i<34;i++)fl(r()*W,gy+r()*16,(18+r()*16)*k,'#ffd93b','#f4a300',M.sin(n/700+i)*w*.8,0)},
(n,w,k,r)=>{hill('#8fd47a','#5fb25c',14*k,4*k,.5);const C=['#ff4d6d','#ffd23f','#c46bff','#ff8a3c','#fff'];for(let i=0;i<28;i++)fl(r()*W,gy+r()*16,(20+r()*14)*k,C[i%5],'#2f7a3a',M.sin(n/800+i)*w*.7,1)}],
[(n,w,k,r)=>{hill('#7fcf5a','#4fa646',18*k,4*k,2);for(let i=0;i<9;i++)fl(r()*W,gy+r()*14,(46+r()*26)*k,'#ffc61a','#6a3f12',M.sin(n/900+i)*w,2)},
(n,w,k,r)=>{el(W/2,gy+22,W*.8,38*k,'#f4dfa5');for(let i=0;i<3;i++)pal(W*(.12+i*.38+r()*.1),gy+8,(80+r()*30)*k,M.sin(n/1000+i)*w*.4);const C=['#ff5a5a','#ffd23f','#3fa9ff'];for(let i=0;i<3;i++)umb(W*(.25+i*.26),gy+16,34*k,C[i])},
(n,w,k,r)=>{hill('#8ccf6a','#5aa850',16*k,4*k,1.5);const C=['#6f8cff','#b88cff','#ff9ac8','#7fb8ff'];for(let i=0;i<7;i++){const x=W*(.06+i*.14),y=gy+6+r()*8;blob(x,y-8*k,14*k,'#3f8f4a');for(let j=0;j<16;j++)blob(x+(r()-.5)*28*k,y-14*k+(r()-.5)*20*k,3.4*k,C[(i+j)%4])}}],
[(n,w,k,r)=>{hill('#d6b36a','#a88040',16*k,4*k,1);const C=['#e2551f','#f08a2a','#b8341a','#d9a63a'];for(let i=0;i<5;i++)tree(W*(.08+i*.21+r()*.05),gy-4,(70+r()*30)*k,C[i%4],C[(i+1)%4],M.sin(n/900+i)*w);for(let i=0;i<22;i++)el(r()*W,gy+r()*14,5*k,2*k,C[i%4])},
(n,w,k,r)=>{hill('#d8bd7a','#b08e48',14*k,4*k,.8);for(let i=0;i<46;i++)reed(r()*W,gy+r()*16,(36+r()*30)*k,M.sin(n/800+i*.7)*w*.8)},
(n,w,k,r)=>{hill('#cfae62','#a07c3a',14*k,4*k,2);for(let i=0;i<4;i++)tree(W*(.1+i*.27+r()*.06),gy-4,(76+r()*24)*k,'#f2c230','#e6a81c',M.sin(n/900+i)*w);for(let i=0;i<5;i++)pump(W*(.12+i*.2+r()*.05),gy+8+r()*8,9*k)}],
[(n,w,k,r)=>{hill('#ffffff','#dbe8f6',14*k,4*k,1);for(let i=0;i<7;i++)pine(W*(.05+i*.15+r()*.05),gy,(60+r()*40)*k,1,M.sin(n/1100+i)*w)},
(n,w,k,r)=>{hill('#ffffff','#dbe8f6',12*k,4*k,.5);for(let i=0;i<3;i++)house(W*(.18+i*.32),gy+4,44*k,32*k,['#d9a87a','#c98a6a','#e0c090'][i],n);for(let i=0;i<4;i++)pine(W*(.04+i*.3+r()*.08),gy+4,50*k,1,M.sin(n/1100+i)*w)},
(n,w,k,r)=>{hill('#ffffff','#e4eef9',10*k,4*k,1);el(W/2,gy+16,W*.42,18*k,'rgba(190,230,255,.9)');snm(W*.2,gy+2,12*k);snm(W*.8,gy+2,14*k);for(let i=0;i<3;i++)pine(W*(.05+i*.45),gy,46*k,1,M.sin(n/1100+i)*w)}]];
function ok(){try{return S.sa!==0&&document.documentElement.dataset.skin==='scenic'&&!document.hidden&&window.WX&&WX.q.mo}catch(e){return false}}
function frame(now){requestAnimationFrame(frame);if(++fc&1)return;if(!ok()){if(cv)g.clearRect(0,0,W,H);return}if(!cv&&!mk())return;if(fc%30===2)gnd();const q=WX.q,mo=q.mo,se=mo>=3&&mo<=5?0:mo>=6&&mo<=8?1:mo>=9&&mo<=11?2:3,t=now+off0,ph=t%9e4,ti=(t/9e4|0)%3,a=M.min(1,ph/2500,(9e4-ph)/2500);
g.clearRect(0,0,W,H);g.save();g.globalAlpha=a;TH[se*3+ti](now,q.w*2+.3,K(),sr(se*7+ti*13+1));
let nt=false;try{nt=!!SCN.D[mo].st}catch(e){}if(nt){g.globalCompositeOperation='source-atop';g.fillStyle='rgba(10,16,44,.5)';g.fillRect(0,0,W,H)}g.restore()}
requestAnimationFrame(frame);
})();

/* 추가 풍경 효과 엔진 (fx.js)
   - 월·낮밤·날씨·기념일에 맞춰 자동 재생, 설정 화면에서 눌러 바로 보기
   - 기존 WX 엔진과 별개 캔버스(#fx)를 사용합니다 */
(()=>{
if(matchMedia('(prefers-reduced-motion:reduce)').matches){window.FX={ui:()=>'',fire(){},stop(){},count:0};return}
const M=Math,rn=M.random,rr=(a,b)=>a+rn()*(b-a),R2=a=>rr(a[0],a[1]),pick=a=>a[rn()*a.length|0],PI2=6.2832;
const SP=[3,4,5],SU=[6,7,8],AU=[9,10,11],WI=[12,1,2];
const CATS=[['flower','🌸','꽃·식물'],['autumn','🍁','가을·낙엽'],['winter','❄️','눈·겨울'],['summer','🌊','여름·물가'],['sky','🌌','하늘·별·빛'],['weather','🌦','비·바람·안개'],['animal','🦋','동물·새'],['life','🚲','일상·탈것'],['party','🎉','기념일·축제'],['magic','✨','반짝·판타지']];
const L=[];const A=(cat,id,nm,ic,m,k,o)=>L.push(Object.assign({cat,id,nm,ic,m,k},o));
const PK=['#pet:#ffc2d6','#pet:#ffb0cc','#pet:#fff0f4','🌸'],
CF=['#cf:#ff5a7a','#cf:#ffd34d','#cf:#5aa9ff','#cf:#8be28b','#cf:#d99bff','#cf:#ff9a4a'],
LV=['#leaf:#e2551f','#leaf:#f08a2a','#leaf:#b8341a','#leaf:#d9a63a'],
STR=['#star:#fff6d8','#star:#cfe0ff','#star:#ffffff'],
DRZ={k:'flow',n:80,f:'t',z:[1,1],s:['#snow'],vx:[1,2],vy:[11,15],ln:['200,215,245',12,1],al:.4,wet:1,sw:0};

/* ───────── 효과 목록 ───────── */
// 꽃·식물
A('flower','sakuraRain','벚꽃 비','🌸',[3,4],'flow',{s:PK,n:46,z:[9,16],vx:[.2,.8],vy:[.8,1.7],sw:.6,sp:.03});
A('flower','sakuraStorm','벚꽃 눈보라','🌸',[3,4],'flow',{s:PK,n:80,f:'l',z:[8,14],vx:[4,8],vy:[.4,1.8],sw:.5,sp:.05,wd:2});
A('flower','sakuraSwirl','벚꽃 회오리','🌸',[3,4],'swirl',{s:PK,n:44,z:[10,16]});
A('flower','sakuraEnd','벚꽃 엔딩','🌸',[4],'flow',{s:PK,n:60,z:[10,18],vx:[1,2.2],vy:[1,2],sw:.8,sp:.05,wd:1.5,xs:[{k:'tint',st:[[0,'255,180,210',.2],[1,'255,210,225',.12]]}]});
A('flower','forsythia','개나리 꽃잎','🌼',[3,4],'flow',{s:['#pet:#ffd93b','#pet:#ffe66b'],n:34,z:[8,13],vx:[.1,.6],vy:[.7,1.3],sw:.5,sp:.04});
A('flower','magnolia','목련 꽃잎','🤍',[3,4],'flow',{s:['#pet:#fffaf0','#pet:#f6e6ee'],n:26,z:[14,22],vx:[0,.5],vy:[.6,1.1],sw:.7,sp:.025});
A('flower','pollen','꽃가루 날림','🌾',[3,4,5],'flow',{s:['#dot:255,235,120'],f:'any',n:60,z:[6,12],vx:[-.3,.6],vy:[-.25,.25],lf:[3,6],al:.7,add:1,sw:.4});
A('flower','dandelion','민들레 홀씨','🌼',[4,5,6],'flow',{s:['#seed'],f:'b',n:22,z:[14,22],vx:[.5,1.3],vy:[-.55,-.15],sw:.5,al:.9,sp:.01});
A('flower','roseRain','장미 꽃잎','🌹',[5,6],'flow',{s:['#pet:#e0314b','#pet:#c4203a','#pet:#ff6a85'],n:36,z:[10,17],vx:[.1,.7],vy:[.8,1.6],sw:.6,sp:.035});
A('flower','tulip','튤립 바람','🌷',[4,5],'flow',{s:['🌷'],f:'l',n:12,z:[18,26],vx:[2.5,4],vy:[.3,1.2],sw:.5,sp:.03});
A('flower','cosmos','코스모스 바람','🌸',[9,10],'flow',{s:['#pet:#ff7fb0','#pet:#ffb3d1','#pet:#ffffff'],f:'l',n:44,z:[9,15],vx:[2,4.5],vy:[.3,1.4],sw:.5,sp:.05,wd:1.6});
A('flower','camellia','동백꽃 송이','🌺',[12,1,2,3],'flow',{s:['🌺'],n:12,z:[18,26],vy:[.9,1.5],vx:[0,.4],sw:.5,sp:.02});
A('flower','clover','네잎클로버 행운','🍀',[5,6],'flow',{s:['🍀','#star:#fff7a0'],f:'b',n:20,z:[14,24],vy:[-1.2,-.5],vx:[-.2,.4],sw:.5,sp:.02});
A('flower','lilac','라일락 향기','💜',[4,5],'flow',{s:['#dot:200,150,255'],f:'any',n:40,z:[16,30],lf:[4,7],al:.5,vy:[-.3,0],vx:[-.1,.3],add:1});
A('flower','sunflowerP','해바라기 꽃잎','🌻',[7,8],'flow',{s:['#pet:#ffcc1a','#pet:#ffb300'],f:'l',n:36,z:[10,16],vx:[1.5,3.2],vy:[.4,1.4],sw:.5,sp:.04,wd:1.2});
// 가을·낙엽
A('autumn','mapleShower','단풍잎 소나기','🍁',[10,11],'flow',{s:LV.concat(['🍁']),n:56,z:[12,22],vx:[.2,1],vy:[1.1,2.2],sw:.9,sp:.045});
A('autumn','ginkgoRain','은행잎 노란 비','🍂',[10,11],'flow',{s:['#gk'],n:52,z:[14,22],vx:[0,.7],vy:[1.2,2.2],sw:.8,sp:.05});
A('autumn','leafSwirl','낙엽 회오리','🍂',[9,10,11],'swirl',{s:LV,n:50,z:[11,18]});
A('autumn','leafGust','낙엽 바람','🍃',[9,10,11],'flow',{s:LV.concat(['#gk']),f:'l',n:46,z:[11,19],vx:[3.5,7],vy:[.2,1.6],sw:.6,sp:.07,wd:2});
A('autumn','acorn','도토리 후드득','🌰',[9,10],'flow',{s:['🌰'],n:9,z:[12,17],vy:[3.2,5.2],vx:[0,.3],sw:0,sp:.08});
A('autumn','reed','갈대 솜털','🌾',[10,11],'flow',{s:['#seed'],f:'any',n:36,z:[12,20],vx:[.5,1.4],vy:[-.3,.2],lf:[4,8],al:.8,sw:.5});
A('autumn','autumnGold','황금빛 가을 햇살','🍂',AU,'tint',{dy:1,st:[[0,'255,190,90',.14],[1,'255,150,50',.32]],xs:[{k:'rays',n:5,al:.1,c:'255,225,150'}]});
A('autumn','geese','기러기 V자 비행','🦆',[10,11,3],'cross',{s:['@bird:#2a2230'],gn:7,vf:1,gp:26,v:[1.5,2.2],y:[.12,.35],z:[9,13],ev:7,fl:.22,dy:1});
A('autumn','lateRain','늦가을 낙엽비','🌧',[11],'flow',{s:LV,n:34,z:[11,18],vx:[.5,1.5],vy:[1.6,2.6],sw:.5,sp:.04,wet:1,dm:.12,xs:[DRZ]});
// 눈·겨울
A('winter','bigSnow','함박눈','❄️',[12,1,2,3],'flow',{s:['#snow'],n:70,z:[8,16],vx:[-.3,.5],vy:[.8,1.6],sw:.7,al:.95});
A('winter','powder','가루눈','🌨',[12,1,2],'flow',{s:['#snow'],n:150,z:[3,6],vx:[.2,.7],vy:[2,3.5],sw:.3,al:.8});
A('winter','crystal','눈꽃 결정','❄️',[12,1,2],'flow',{s:['#sn2'],n:26,z:[14,24],vx:[-.3,.4],vy:[.6,1.2],sw:.4,sp:.03,al:.9});
A('winter','graupel','싸락눈','🌨',[11,12,2,3],'flow',{s:['#snow'],n:120,z:[3,5],vx:[.5,1],vy:[3.5,5],sw:.1,al:.85});
A('winter','snowSwirl','눈 회오리','🌪',[12,1,2],'swirl',{s:['#snow'],n:70,z:[5,10]});
A('winter','frostEdge','서리 성에','🧊',[12,1,2],'frost',{});
A('winter','diamondDust','다이아몬드 더스트','💎',[12,1,2],'flow',{s:['#star:#e8f4ff','#star:#ffffff'],f:'any',n:60,z:[8,16],lf:[1,2.5],add:1,tw:1,dy:1,vx:[-.1,.1],vy:[-.1,.2]});
A('winter','frostSparkle','서리 반짝','✨',[11,12,1,2,3],'flow',{s:['#star:#e8f4ff'],f:'any',y:[.55,1],n:40,z:[8,14],lf:[1,2.5],add:1,tw:1,vx:[0,0],vy:[0,0]});
A('winter','breath','하얀 입김','🌬️',[11,12,1,2,3],'flow',{s:['#puff'],f:'any',y:[.62,.9],n:16,z:[18,34],vx:[.2,.6],vy:[-.5,-.2],lf:[1.5,3],al:.45});
A('winter','snowman','눈사람 등장','⛄',[12,1,2],'stand',{s:['⛄'],n:2,z:[44,60],xs:[{k:'flow',s:['#snow'],n:40,z:[4,8],vy:[1,2],vx:[0,.4],sw:.4,al:.8}]});
A('winter','santa','산타 썰매','🎅',[12],'cross',{ch:['🦌','🦌','🛷'],gp:34,v:[2.4,3.2],y:[.1,.3],z:[34,42],ev:9,bob:8,bf:.05,tr:[255,240,160,110],dy:0});
A('winter','snowball','눈싸움 눈덩이','⚪',[12,1,2],'lob',{s:['#snow'],y:[.72,.82],dx:[120,240],hh:[60,110],T:[40,55],z:[14,18],ev:.7});
A('winter','skier','스키 활강','⛷',[12,1,2],'cross',{s:['⛷'],y:[.2,.4],sl:.35,v:[2.5,3.5],z:[28,34],ev:4,dy:1});
A('winter','snowboard','스노보드 질주','🏂',[12,1,2],'cross',{s:['🏂'],y:[.22,.42],sl:.3,v:[2.6,3.6],z:[28,34],ev:4,dy:1});
A('winter','sled','썰매 질주','🛷',[12,1,2],'cross',{s:['🛷'],g:6,v:[2.5,3.5],z:[30,38],ev:5});
A('winter','penguin','펭귄 행진','🐧',[12,1,2],'cross',{ch:['🐧','🐧','🐧','🐧'],gp:30,g:6,v:[.5,.8],z:[26,32],hop:3,hf:.12,ev:14});
A('winter','icicle','고드름 녹는 방울','💧',[2,3],'flow',{s:['#drop'],n:12,z:[8,12],vy:[3,5],vx:[0,0],sw:0});
A('winter','firstSnow','첫눈 소복','🌨',[11,12],'flow',{s:['#snow','#sn2'],n:24,z:[12,20],vx:[-.2,.4],vy:[.5,1],sw:.6,al:.9});
A('winter','coldWave','한파 몰아치다','🥶',[12,1,2],'frost',{dm:.1,xs:[{k:'flow',s:['#snow'],f:'l',n:90,z:[2,4],vx:[12,18],vy:[.5,2],al:.7,sw:0,wd:.5}]});
// 여름·물가
A('summer','fireflies','반딧불 군무','✨',SU,'swarm',{nt:1,n:34,c:'255,240,140',r:8,y:.62,sp:1.5,sf:.6});
A('summer','bubbles','비눗방울','🧼',[4,5,6,7,8,9],'flow',{s:['#bub'],f:'b',n:24,z:[16,34],vy:[-1,-.4],vx:[.2,.8],sw:.8,dy:1,al:.9});
A('summer','heatHaze','아지랑이','♨️',[4,5,7,8],'wave',{dy:1,xs:[{k:'tint',st:[[0,'255,230,170',.0],[1,'255,210,130',.22]]}]});
A('summer','glitter','물결 윤슬','✨',[5,6,7,8,9],'flow',{s:['#star:#ffffff','#star:#fff6d8'],f:'any',y:[.45,.85],n:50,z:[8,16],lf:[.8,2],add:1,tw:1,dy:1,vx:[0,0],vy:[0,0]});
A('summer','dolphin','돌고래 점프','🐬',SU,'lob',{s:['🐬'],y:[.66,.74],dx:[140,220],hh:[70,110],T:[55,75],z:[34,44],ev:3.5,rt:'tan',rp:1,dy:1});
A('summer','whale','고래 유영','🐋',SU,'cross',{s:['🐋'],y:[.58,.66],v:[.4,.7],z:[64,86],bob:5,bf:.03,ev:20,dy:1});
A('summer','seagull','갈매기 떼','🕊',[5,6,7,8,9],'cross',{s:['@bird:#ffffff'],gn:5,gp:24,v:[1.1,1.8],y:[.1,.35],z:[9,13],ev:6,bob:6,bf:.03,fl:.25,dy:1});
A('summer','waterBalloon','물풍선 싸움','💦',[7,8],'lob',{s:['#drop'],y:[.75,.85],dx:[160,260],hh:[90,140],T:[45,60],z:[16,22],ev:.8,rp:1,dy:1});
A('summer','beachBall','비치볼 통통','🏐',[6,7,8],'lob',{s:['🏐'],g:0,dx:[180,260],hh:[90,130],T:[60,80],z:[22,28],ev:2.5,spn:.15,dy:1});
A('summer','doubleRainbow','쌍무지개','🌈',[4,5,6,7,8,9],'rainbow',{n:2,al:.6,wet:1,dy:1});
A('summer','shower','소나기 퍼붓기','🌧',[6,7,8,9],'flow',{n:260,f:'t',z:[1,1],s:['#snow'],vx:[3,5],vy:[18,26],ln:['210,225,255',16,1.3],al:.55,wet:1,sw:0,dm:.2});
A('summer','glare','한여름 쨍한 햇빛','☀️',SU,'tint',{dy:1,st:[[0,'255,255,255',.16],[1,'255,250,210',.24]],xs:[{k:'flare'}]});
// 하늘·별·빛
A('sky','twinkle','별빛 반짝','✨',undefined,'flow',{nt:1,s:STR,f:'any',y:[0,.6],n:50,z:[8,16],lf:[2,4],add:1,tw:1,vx:[0,0],vy:[0,0]});
A('sky','starRain','별 비','🌟',undefined,'flow',{nt:1,s:['#star:#fff6c0'],n:28,z:[8,14],vy:[1,2],vx:[-.2,.3],sw:.3,add:1});
const MT=(id,nm,m,n,col,sp)=>A('sky',id,nm,'🌠',m,'flow',{nt:1,f:'tr',n,z:[1,1],s:['#snow'],vx:[-sp[0]-3,-sp[0]],vy:[sp[1]-1.5,sp[1]],lf:[.7,1.1],dl:[10,120],ln:[col,95,2],mt:1});
MT('quadrantids','사분의자리 유성우',[1],10,'210,225,255',[11,5.5]);
MT('lyrids','거문고자리 유성우',[4],7,'255,245,200',[10,5]);
MT('perseids','페르세우스 유성우',[8],14,'255,255,255',[12,6]);
MT('orionids','오리온자리 유성우',[10],8,'255,225,170',[10,5]);
MT('leonids','사자자리 유성우',[11],12,'190,255,230',[14,7]);
MT('geminids','쌍둥이자리 유성우',[12],16,'200,255,240',[11,5.5]);
A('sky','wishStars','소원 비는 별똥별','🌠',undefined,'flow',{nt:1,f:'tr',n:3,z:[1,1],s:['#snow'],vx:[-14,-10],vy:[5,7],lf:[.8,1.1],dl:[60,200],ln:['255,230,160',110,2.4],mt:1});
A('sky','comet','혜성 출현','☄️',undefined,'cross',{nt:1,s:['#dot:200,230,255'],y:[.1,.3],sl:.18,v:[1.2,1.7],z:[22,28],ev:30,tr:[200,230,255,190],tw:3,du:14});
A('sky','iss','우주정거장 통과','🛰',undefined,'cross',{nt:1,s:['#dot:255,255,235'],y:[.12,.3],v:[1.3,1.6],z:[12,16],ev:30,tr:[255,255,230,50],tw:1.5,du:16});
A('sky','ufo','미확인 비행물체','🛸',undefined,'cross',{nt:1,s:['🛸'],y:[.15,.4],v:[1.5,2.2],z:[32,40],zz:14,ev:20,du:14});
A('sky','milky','은하수','🌌',[6,7,8,9],'milky',{nt:1,du:20});
A('sky','dipper','북두칠성','⭐',[4,5,6],'const',{nt:1,x:.18,y:.14,w:.62,h:.2,lb:'북두칠성',p:[[0,.2],[.02,.6],[.28,.7],[.3,.35],[.5,.28],[.72,.15],[.98,.22]],l:[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]]});
A('sky','orion','오리온자리','⭐',[12,1,2],'const',{nt:1,x:.28,y:.12,w:.44,h:.3,lb:'오리온자리',p:[[.1,0,1],[.9,.05],[.35,.5],[.5,.48],[.65,.46],[.15,1],[.85,.95,1]],l:[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]]});
A('sky','cassio','카시오페이아','⭐',[10,11,12],'const',{nt:1,x:.2,y:.14,w:.6,h:.14,lb:'카시오페이아',p:[[0,.3],[.22,.85],[.5,.4],[.75,.9],[1,.2]],l:[[0,1],[1,2],[2,3],[3,4]]});
A('sky','triangle','여름의 대삼각형','⭐',[7,8,9],'const',{nt:1,x:.2,y:.12,w:.6,h:.28,lb:'여름의 대삼각형',p:[[.12,.2,1],[.92,.05,1],[.55,.95,1]],l:[[0,1],[1,2],[2,0]]});
A('sky','moonHarvest','한가위 보름달','🌕',[9,10],'moon',{nt:1,x:.7,y:.2,r:46,c:'255,236,170',bn:1});
A('sky','moonHalo','달무리','🌙',[11,12,1,2,3],'moon',{nt:1,x:.3,y:.2,r:36,c:'230,240,255',ring:1});
A('sky','moonSuper','슈퍼문','🌕',[1,8,11,12],'moon',{nt:1,x:.66,y:.24,r:78,c:'255,214,150'});
A('sky','moonBlood','붉은 달','🌑',[9,1],'moon',{nt:1,x:.35,y:.22,r:56,c:'255,110,80',red:1,dm:.12});
A('sky','moonCrescent','초승달','🌙',undefined,'moon',{nt:1,x:.74,y:.18,r:40,c:'255,245,210',cr:1});
A('sky','moonLight','달빛 가득','🌕',undefined,'moon',{nt:1,x:.5,y:.16,r:50,c:'235,240,255',xs:[{k:'rays',n:5,al:.1,c:'210,225,255',sl:.2}]});
A('sky','tintMorning','황금빛 아침 햇살','🌅',undefined,'tint',{dy:1,st:[[0,'255,214,140',0],[.55,'255,200,120',.12],[1,'255,170,90',.38]]});
A('sky','sunriseNY','새해 첫 해돋이','🌅',[1],'halo',{dy:1,at:[.5,.7],rise:90,r:60,c:'255,170,70',dt:[1,1,3],xs:[{k:'tint',st:[[0,'255,120,60',.1],[.5,'255,90,60',.28],[1,'255,200,100',.5]]}]});
A('sky','tintPink','분홍빛 노을','🌇',[3,4,5,9,10],'tint',{dy:1,st:[[0,'255,150,190',.22],[.5,'255,170,200',.14],[1,'255,200,160',.1]]});
A('sky','tintDusk','보랏빛 황혼','🌆',undefined,'tint',{dy:1,st:[[0,'90,60,170',.35],[.55,'180,90,170',.28],[1,'255,150,100',.3]]});
A('sky','tintBlue','푸른 새벽','🌃',undefined,'tint',{nt:1,st:[[0,'20,40,110',.4],[1,'60,110,190',.35]]});
A('sky','tintWinter','겨울 햇살','🌤',WI,'tint',{dy:1,st:[[0,'255,240,200',.1],[1,'255,230,170',.22]],xs:[{k:'flow',s:['#star:#ffffff'],f:'any',n:30,z:[8,14],lf:[1,2],add:1,tw:1,vx:[0,0],vy:[0,0]}]});
A('sky','tintSpring','봄 햇살','🌤',SP,'tint',{dy:1,st:[[0,'255,255,200',.14],[1,'200,255,200',.18]],xs:[{k:'rays',n:5,al:.1}]});
A('sky','godRays','구름 사이 빛내림','🌤',undefined,'rays',{dy:1,n:6,al:.16});
A('sky','sunHalo','햇무리','🌞',[12,1,2,3,4],'halo',{dy:1,r:44,c:'255,245,210',ring:1});
A('sky','lensFlare','렌즈 플레어','📸',[3,4,5,6,7,8,9],'flare',{dy:1});
A('sky','balloons','풍선 날리기','🎈',undefined,'flow',{dy:1,bd:1,s:['🎈'],f:'b',n:14,z:[24,34],vy:[-1.2,-.6],vx:[-.2,.4],sw:.5});
A('sky','plane','비행기 구름','✈️',undefined,'cross',{dy:1,s:['✈️'],y:[.08,.25],v:[2.2,3],z:[26,32],sl:-.12,fr:1,ev:20,tr:[255,255,255,200],tw:3,du:14});
A('sky','paraglider','패러글라이더','🪂',[4,5,9,10],'cross',{dy:1,s:['🪂'],y:[.15,.4],v:[.6,1],z:[32,40],sl:.05,bob:8,bf:.03,ev:16});
A('sky','helicopter','헬리콥터','🚁',undefined,'cross',{dy:1,s:['🚁'],y:[.2,.4],v:[1.8,2.4],z:[32,38],bob:3,bf:.2,ev:18,fr:0});
A('sky','skyLantern','풍등 날리기','🏮',[1,2,5,9],'flow',{nt:1,s:['#lan:#ffb040','#lan:#ff8a30'],f:'b',n:22,z:[20,30],vy:[-.9,-.4],vx:[.1,.5],sw:.5});
A('sky','moonbow','달무지개','🌈',[7,8,9],'rainbow',{nt:1,n:1,pl:1,al:.35});
A('sky','aurora','오로라','🌌',[11,12,1,2],'aurora',{nt:1,du:20});
A('sky','auroraRose','분홍 오로라','🌌',[12,1,2],'aurora',{nt:1,cl:['255,120,200','170,120,255','120,200,255'],du:20});
// 비·바람·안개
A('weather','drizzle','보슬비','🌦',[3,4,5,9,10,11],'flow',Object.assign({},DRZ,{n:70,vy:[8,11],ln:['200,215,245',9,1],al:.35,dm:.08}));
A('weather','mistRain','안개비','🌫',[3,4,10,11],'band',{c:'235,240,250',n:7,y:[.35,.7],al:.5,wet:1,xs:[Object.assign({},DRZ,{n:45,vy:[6,9],ln:['210,220,240',7,1],al:.3})]});
A('weather','fogBank','짙은 안개','🌫',[3,4,10,11,12,1,2],'band',{c:'255,255,255',n:8,y:[.38,.75],al:.55,w:1.1,h:.2});
A('weather','waterMist','물안개 피어오름','🌫',[4,5,9,10],'flow',{dy:1,s:['#puff'],f:'b',n:14,z:[60,110],vy:[-.35,-.15],vx:[.05,.3],al:.18,sw:.2});
A('weather','yellowDust','황사 바람','🟤',[3,4,5],'band',{c:'200,170,110',n:6,y:[.2,.7],al:.5,w:1.2,h:.25,dm:.06,xs:[{k:'flow',s:['#dot:190,160,100'],f:'l',n:40,z:[4,9],vx:[3,6],vy:[-.2,.5],al:.6,wd:1.5}]});
A('weather','dustDevil','먼지 회오리','🌪',[4,5,10],'swirl',{s:['#dot:200,170,120','#leaf:#b48a50'],n:46,z:[6,14]});
A('weather','glassDrops','유리창 빗방울','🪟',[3,4,5,6,7,8,9,10,11],'glass',{n:22,wet:1,dm:.08});
A('weather','heatLightning','먼 번개','⚡',SU,'flash',{nt:1,dm:.2,wet:1});
A('weather','stormCloud','먼 천둥구름','⛈',SU,'band',{c:'20,28,52',n:5,y:[0,.25],al:.6,w:1.3,h:.3,wet:1,dm:.12,xs:[{k:'flash',c:'200,210,255'}]});
A('weather','sunShower','여우비','🌦',[4,5,6,7,8,9,10],'flow',Object.assign({},DRZ,{n:60,vy:[9,12],ln:['235,240,255',10,1],al:.45,dy:1,xs:[{k:'rays',n:6,al:.16}]}));
A('weather','cloudShadow','구름 그림자','☁️',[4,5,6,7,8,9],'band',{dy:1,c:'20,30,60',n:4,y:[.1,.6],al:.22,w:1.4,h:.35,v:3});
A('weather','monsoon','장마철 먹구름','🌧',[6,7],'band',{c:'30,40,70',n:6,y:[0,.3],al:.55,w:1.3,h:.3,wet:1,dm:.18,xs:[Object.assign({},DRZ,{n:120,vy:[12,17],ln:['200,215,245',13,1.1],al:.45})]});
// 동물·새
A('animal','butterflies','나비 떼','🦋',[4,5,6,9],'flow',{dy:1,s:['🦋'],f:'any',y:[.25,.8],n:9,z:[18,26],lf:[6,10],vx:[-.4,.5],vy:[-.3,.3],sw:1.2,sf:350});
A('animal','bees','꿀벌 윙윙','🐝',[4,5,6,7],'flow',{dy:1,s:['🐝'],f:'any',y:[.3,.8],n:7,z:[12,16],lf:[5,9],vx:[-.5,.6],vy:[-.4,.4],sw:1.5,sf:250});
A('animal','ladybug','무당벌레 산책','🐞',[5,6,7],'cross',{dy:1,s:['🐞'],g:2,v:[.3,.5],z:[14,18],ev:8});
A('animal','frog','비 오는 날 개구리','🐸',[6,7,8],'cross',{s:['🐸'],g:4,v:[.8,1.2],z:[22,28],hop:12,hf:.2,ev:6,wet:1,dm:.1,xs:[DRZ]});
A('animal','snail','달팽이 느릿느릿','🐌',[6,7],'cross',{s:['🐌'],g:3,v:[.15,.25],z:[20,26],ev:12,wet:1,dm:.08,xs:[Object.assign({},DRZ,{n:50,vy:[7,10]})]});
A('animal','swallow','제비 귀환','🐦',[3,4,5,6],'cross',{dy:1,s:['@bird:#1c2230'],gn:4,gp:36,v:[3,4.5],y:[.25,.5],z:[8,11],bob:14,bf:.07,fl:.5,ev:5});
A('animal','sparrow','참새 총총','🐦',[9,10,11,12,1,2],'cross',{dy:1,ch:['🐦','🐦','🐦'],gp:22,g:3,v:[.9,1.3],z:[16,20],hop:6,hf:.25,ev:8});
A('animal','dragonfly','고추잠자리 떼','🔴',[8,9,10],'swarm',{dy:1,n:14,c:'#e23d2a',r:5,y:.45,sp:1.4,sf:.8,dfl:1});
A('animal','bat','박쥐 비행','🦇',[5,6,7,8,9,10],'cross',{nt:1,s:['🦇'],gn:4,gp:40,v:[2,3],y:[.15,.45],z:[20,26],zz:20,bob:10,bf:.1,ev:6});
A('animal','owl','올빼미 비행','🦉',[11,12,1,2],'cross',{nt:1,s:['🦉'],y:[.2,.4],v:[.9,1.3],z:[32,40],bob:6,bf:.05,ev:14});
A('animal','cat','산책하는 고양이','🐈',undefined,'cross',{s:['🐈'],g:3,v:[.7,1],z:[28,34],hop:2,hf:.12,ev:12});
A('animal','dog','산책하는 강아지','🐕',undefined,'cross',{s:['🐕'],g:4,v:[1.1,1.5],z:[30,36],hop:4,hf:.2,ev:12});
A('animal','squirrel','다람쥐 도토리','🐿',[9,10,11],'cross',{s:['🐿'],g:3,v:[1.4,1.9],z:[22,28],hop:9,hf:.22,ev:9});
A('animal','deer','사슴 가족','🦌',[10,11],'cross',{ch:['🦌','🦌'],gp:42,g:5,v:[.8,1],z:[38,46],hop:2,hf:.12,ev:18});
A('animal','rabbit','토끼 깡충','🐇',[3,4,5,9],'cross',{s:['🐇'],g:3,v:[1.1,1.5],z:[24,30],hop:16,hf:.2,ev:10});
A('animal','chicks','병아리 행렬','🐥',[4,5],'cross',{ch:['🐥','🐥','🐥','🐥'],gp:22,g:4,v:[.7,.9],z:[18,22],hop:5,hf:.22,ev:14,fr:0});
A('animal','ducklings','오리 가족','🦆',[4,5,6,7],'cross',{ch:['🦆','🐤','🐤','🐤'],gp:24,g:4,v:[.6,.8],z:[20,26],hop:3,hf:.15,ev:14});
A('animal','turtle','거북이 느릿느릿','🐢',[5,6,7,8],'cross',{s:['🐢'],g:3,v:[.2,.3],z:[24,30],ev:16});
A('animal','hedgehog','고슴도치 산책','🦔',[9,10],'cross',{s:['🦔'],g:3,v:[.4,.6],z:[20,26],hop:2,hf:.15,ev:14});
A('animal','fox','여우 살금살금','🦊',[10,11,12,1,2],'cross',{s:['🦊'],g:4,v:[1,1.3],z:[30,36],hop:3,hf:.18,ev:14});
A('animal','swan','백조 유영','🦢',[4,5,6],'cross',{dy:1,s:['🦢'],y:[.6,.68],v:[.4,.6],z:[34,42],bob:3,bf:.04,ev:18});
A('animal','eagle','독수리 활공','🦅',[9,10,11,12,1,2,3],'cross',{dy:1,s:['🦅'],y:[.1,.25],v:[1,1.4],z:[40,52],bob:8,bf:.03,ev:18});
A('animal','crows','까마귀 떼','🐦',[11,12,1,2],'cross',{dy:1,s:['@bird:#15151c'],gn:7,gp:30,v:[1.4,2],y:[.12,.35],z:[9,12],bob:8,bf:.05,fl:.3,ev:7,zz:10});
A('animal','starlings','찌르레기 군무','🐦',[11,12,1,2],'swarm',{dy:1,n:60,c:'25,25,35',r:1.8,dk:1,y:.28,sp:1.3,sf:.7});
// 일상·탈것
A('life','cyclist','자전거 라이더','🚲',[3,4,5,6,9,10],'cross',{dy:1,s:['🚲'],g:4,v:[2,2.6],z:[32,38],ev:9});
A('life','kickboard','킥보드 쌩쌩','🛴',[4,5,6,9],'cross',{dy:1,s:['🛴'],g:4,v:[1.8,2.3],z:[28,34],ev:9});
A('life','jogger','아침 달리기','🏃',undefined,'cross',{dy:1,s:['🏃'],g:4,v:[1.4,1.8],z:[30,36],hop:3,hf:.25,ev:10,fr:1});
A('life','walkers','산책 나온 사람들','🚶',undefined,'cross',{dy:1,ch:['🚶','🚶'],gp:26,g:4,v:[.6,.8],z:[32,38],hop:2,hf:.12,ev:12,fr:1});
A('life','train','꼬마 기차','🚂',undefined,'cross',{ch:['🚂','🚃','🚃','🚃'],gp:30,g:6,v:[2.2,2.8],z:[28,34],ev:22,du:16});
A('life','bus','마을버스','🚌',undefined,'cross',{s:['🚌'],g:8,v:[1.8,2.4],z:[40,48],ev:14});
A('life','umbrellaWalk','우산 행렬','☂️',[6,7,8,9],'cross',{ch:['☂️','☂️','☂️'],gp:28,g:2,v:[.6,.8],z:[30,36],hop:2,hf:.12,ev:10,wet:1,dm:.1,xs:[DRZ]});
A('life','sailboat','요트 유람','⛵',[5,6,7,8,9],'cross',{dy:1,s:['⛵'],y:[.56,.66],v:[.4,.7],z:[34,42],bob:4,bf:.04,fr:1,ev:20});
A('life','kite','연날리기','🪁',[1,2,3,4,5,10],'cross',{dy:1,s:['🪁'],y:[.15,.35],v:[1,1.5],z:[30,38],bob:14,bf:.05,ev:14,fr:0});
A('life','musicNotes','거리 음악회','🎵',undefined,'flow',{dy:1,s:['🎵','🎶'],f:'b',n:14,z:[16,24],vy:[-1.1,-.5],vx:[-.2,.4],sw:.9,sf:500});
// 기념일·축제
A('party','fireNY','새해 불꽃놀이','🎆',[1,12],'burst',{nt:1,cl:['255,215,120','255,255,255','255,120,120'],sh:['r','c','w'],ev:1.3,dt:[1,1,3],du:24});
A('party','fireSummer','한여름 밤 불꽃놀이','🎇',[5,6,7,8,9],'burst',{nt:1,cl:['255,100,120','120,200,255','255,230,100','170,255,150','220,150,255'],sh:['r','c','s'],ev:1.2,du:24});
A('party','fireHeart','하트 불꽃','💖',[2,5,10],'burst',{nt:1,bd:1,cl:['255,100,150','255,150,190','255,90,90'],sh:['h'],ev:1.6,pn:70,du:22});
A('party','fireFlower','꽃 모양 불꽃','🌸',[4,5,6,9,10],'burst',{nt:1,bd:1,cl:['255,140,190','255,200,100','150,220,255'],sh:['s'],ev:1.5,du:22});
A('party','fireWillow','황금 수양버들 불꽃','🎇',[10,12,1],'burst',{nt:1,cl:['255,200,90','255,225,150'],sh:['w'],ev:1.8,pn:90,du:22});
A('party','fireFinale','대형 불꽃 피날레','🎆',[7,8,10,12],'burst',{nt:1,cl:['255,100,120','120,200,255','255,230,100','170,255,150','220,150,255','255,255,255'],sh:['r','c','s','h','w'],ev:.55,du:18});
A('party','fireRing','링 불꽃','⭕',undefined,'burst',{nt:1,cl:['120,220,255','255,150,200','255,230,120'],sh:['c'],ev:1.2,pn:50,du:20});
A('party','confetti','축하 색종이','🎊',undefined,'flow',{bd:1,s:CF,n:80,z:[8,13],vy:[1.5,2.8],vx:[-.4,.6],sw:1.2,sp:.12,sf:400});
A('party','birthday','생일 파티','🎂',undefined,'flow',{bd:1,s:CF,n:60,z:[8,13],vy:[1.5,2.6],vx:[-.3,.5],sw:1.2,sp:.12,sf:400,xs:[{k:'flow',s:['🎈','🎈','#hrt:#ff5a8a'],f:'b',n:12,z:[24,34],vy:[-1.2,-.6],vx:[-.2,.4],sw:.5},{k:'stand',s:['🎂'],n:1,z:[50,62]}]});
A('party','popper','폭죽 팡파레','🎉',undefined,'flow',{bd:1,s:CF.concat(['#star:#ffd34d']),f:'p',n:70,z:[8,13],gr:.22,dg:.985,sp:.15,dl:[0,150],sw:0,wd:.3});
A('party','hearts','사랑의 하트','💕',undefined,'flow',{bd:1,s:['#hrt:#ff5a8a','#hrt:#ff8fb0','💕'],f:'b',n:26,z:[16,28],vy:[-1.4,-.6],vx:[-.3,.4],sw:.8});
A('party','valentine','밸런타인 하트 비','🍫',[2],'flow',{s:['#hrt:#ff5a8a','#hrt:#ff8fb0','🍫','💝'],n:32,z:[16,26],vy:[.9,1.7],vx:[-.2,.5],sw:.8,sp:.02,dt:[2,10,14]});
A('party','whiteDay','화이트데이 사탕 비','🍬',[3],'flow',{s:['🍬','🍭','#hrt:#ffc0e0'],n:28,z:[16,24],vy:[1,1.8],vx:[-.2,.5],sw:.7,sp:.03,dt:[3,10,14]});
A('party','luckyBag','복주머니 새해 복','🧧',[1,2],'flow',{s:['🧧','#star:#ffd34d'],n:16,z:[22,30],vy:[.9,1.6],vx:[-.2,.4],sw:.7,sp:.02});
A('party','childrensDay','어린이날 풍선','🎈',[5],'flow',{s:['🎈','#bub'],f:'b',n:22,z:[24,34],vy:[-1.2,-.6],vx:[-.2,.4],sw:.6,dt:[5,1,5],xs:[{k:'flow',s:['#bub'],f:'b',n:16,z:[16,30],vy:[-.9,-.4],vx:[.2,.7],sw:.8,al:.9}]});
A('party','parentsDay','카네이션 감사','💐',[5],'flow',{s:['💐','🌸','#hrt:#ff7a9a'],n:26,z:[18,28],vy:[.9,1.6],vx:[-.2,.4],sw:.7,sp:.02,dt:[5,6,8]});
A('party','lotusLantern','연등 행렬','🏮',[5],'flow',{nt:1,s:['🏮'],f:'b',n:16,z:[24,32],vy:[-.8,-.4],vx:[-.1,.3],sw:.4});
A('party','hangeul','한글날 자음 모음 비','🔤',[10],'flow',{s:['#tx:ㄱ','#tx:ㅏ','#tx:ㅎ','#tx:한','#tx:글','#tx:ㅁ','#tx:ㅣ','#tx:ㅅ'],n:26,z:[20,30],vy:[.9,1.6],vx:[-.2,.4],sw:.7,sp:.02,dt:[10,6,9]});
A('party','taegeuk','태극기 휘날리며','🇰🇷',[3,6,8,10],'flow',{dy:1,s:['🇰🇷'],f:'b',n:12,z:[24,30],vy:[-1,-.5],vx:[-.2,.4],sw:.5,dt:[8,13,16]});
A('party','chuseok','한가위 풍성한 가을','🥮',[9],'flow',{s:['🥮','🌕','#star:#ffe9a0'],n:16,z:[18,26],vy:[.8,1.4],vx:[-.2,.4],sw:.6,sp:.02});
A('party','halloweenBats','할로윈 박쥐 떼','🦇',[10],'cross',{nt:1,s:['🦇'],gn:6,gp:34,v:[2,3],y:[.12,.45],z:[20,28],zz:20,bob:10,bf:.1,ev:4,dt:[10,25,31]});
A('party','ghosts','할로윈 유령 파티','👻',[10],'flow',{nt:1,s:['👻','🎃'],f:'any',n:10,z:[28,40],lf:[5,9],vx:[-.4,.5],vy:[-.3,.2],sw:1.2,sf:500,al:.9,dt:[10,25,31]});
A('party','pumpkins','호박 등불','🎃',[10],'stand',{nt:1,s:['🎃'],n:3,z:[34,46],dt:[10,25,31]});
A('party','peppero','빼빼로 비','🍫',[11],'flow',{s:['🍫','🍪','#hrt:#ff8fb0'],n:18,z:[18,26],vy:[1,1.8],vx:[-.2,.5],sw:.7,sp:.03,dt:[11,8,11]});
A('party','suneung','수능 대박 응원','📝',[11],'flow',{s:['🍀','#star:#ffe066','📝'],f:'b',n:22,z:[16,26],vy:[-1.2,-.6],vx:[-.2,.4],sw:.6});
A('party','xmasSnow','화이트 크리스마스','🎄',[12],'flow',{nt:1,s:['#snow'],n:70,z:[6,14],vy:[.8,1.6],vx:[-.2,.5],sw:.7,dt:[12,18,25],xs:[{k:'lights',cl:['255,80,80','80,255,120','255,230,90','120,180,255']}]});
A('party','xmasGifts','선물 상자 비','🎁',[12],'flow',{s:['🎁','🎄','⭐'],n:20,z:[22,30],vy:[1,1.7],vx:[-.2,.4],sw:.6,sp:.03,dt:[12,18,25]});
A('party','xmasTree','크리스마스 트리','🎄',[12],'stand',{nt:1,s:['🎄'],n:2,z:[60,76],dt:[12,18,25],xs:[{k:'lights',cl:['255,80,80','80,255,120','255,230,90','120,180,255']}]});
A('party','rudolph','루돌프 달리기','🦌',[12],'cross',{ch:['🦌','🦌','🦌'],gp:36,g:5,v:[1.6,2.1],z:[36,44],hop:6,hf:.2,ev:14,dt:[12,18,25]});
A('party','carolBells','크리스마스 종소리','🔔',[12],'flow',{s:['🔔','#star:#ffd34d','🎶'],f:'b',n:20,z:[18,26],vy:[-1.1,-.5],vx:[-.2,.4],sw:.6,dt:[12,18,25]});
A('party','bellNY','제야의 종','🔔',[12],'flow',{nt:1,s:['🔔','#cf:#ffd34d','#cf:#ffffff','#star:#ffd34d'],n:60,z:[10,20],vy:[1.4,2.4],vx:[-.3,.5],sw:1,sp:.1,dt:[12,29,31]});
A('party','wedding','축복의 꽃잎 샤워','💐',[5,10],'flow',{s:['#pet:#ffffff','#pet:#ffd5e1','#pet:#fff0f4','💐'],n:56,z:[10,18],vy:[1,1.9],vx:[-.3,.7],sw:.9,sp:.045,bd:1});
// 반짝·판타지
A('magic','fairyDust','요정 가루','✨',undefined,'flow',{nt:1,bd:1,s:['#star:#ffc8ff','#star:#c8f0ff','#dot:255,200,255'],f:'any',n:50,z:[8,18],lf:[2,4],vy:[-.5,-.1],vx:[-.3,.4],add:1,tw:1});
A('magic','goldDust','황금 가루','💫',undefined,'flow',{bd:1,s:['#dot:255,215,100','#star:#ffe9a0'],f:'any',n:60,z:[6,14],lf:[2,5],vy:[-.4,.1],vx:[-.2,.3],add:1,tw:1});
A('magic','orbs','마법 구슬','🔮',undefined,'flow',{nt:1,s:['#dot:150,200,255','#dot:200,150,255','#dot:150,255,220'],f:'any',n:16,z:[30,60],lf:[5,9],vy:[-.35,-.1],vx:[-.2,.2],al:.35,add:1});
A('magic','bokeh','빛망울 보케','🔆',undefined,'flow',{nt:1,bd:1,s:['#dot:255,220,140','#dot:255,170,200','#dot:170,210,255'],f:'any',n:18,z:[40,90],lf:[5,9],vy:[-.2,.1],vx:[-.15,.15],al:.3,add:1});
A('magic','rainbowDust','무지개 가루','🌈',undefined,'flow',{dy:1,s:['#dot:255,110,110','#dot:255,200,90','#dot:120,230,140','#dot:110,180,255','#dot:190,130,255'],f:'any',n:46,z:[8,14],lf:[2,4],vy:[-.3,.2],vx:[-.3,.4],add:1,al:.8});
A('magic','gems','보석 비','💎',undefined,'flow',{s:['💎','#star:#bfe8ff'],n:20,z:[16,24],vy:[1.2,2.1],vx:[-.2,.4],sw:.5,sp:.04});
A('magic','sparkleRain','반짝이 비','✨',undefined,'flow',{s:['#star:#ffffff','#star:#fff2b0','#star:#ffd1f0'],n:40,z:[8,16],vy:[1.5,2.6],vx:[-.2,.3],add:1,tw:1,sw:.3});
A('magic','spotlights','무대 조명','🔦',undefined,'rays',{nt:1,n:5,al:.2,c:'255,200,255',sl:.45});
A('magic','pinkFireflies','요정 불빛','✨',[4,5,6,9],'swarm',{nt:1,n:26,c:'255,160,220',r:9,y:.55,sp:1.4,sf:.5});

/* ───────── 스프라이트 ───────── */
const SC={},FNT='46px "Apple Color Emoji","Noto Color Emoji","Segoe UI Emoji",sans-serif';
function shape(x,t,a){
 const gd=(r,c0,c1,m)=>{const q=x.createRadialGradient(0,0,0,0,0,r);q.addColorStop(0,c0);if(m!==undefined)q.addColorStop(m,c0);q.addColorStop(1,c1);return q},disc=(r)=>{x.beginPath();x.arc(0,0,r,0,PI2);x.fill()};
 if(t==='dot'){x.fillStyle=gd(30,`rgba(${a},1)`,`rgba(${a},0)`);disc(30)}
 else if(t==='puff'){x.fillStyle=gd(30,'rgba(255,255,255,.7)','rgba(255,255,255,0)');disc(30)}
 else if(t==='snow'){x.fillStyle=gd(30,'rgba(255,255,255,1)','rgba(255,255,255,0)',.5);disc(30)}
 else if(t==='pet'){x.fillStyle=a;x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(22,-8,0,26);x.quadraticCurveTo(-22,-8,0,-26);x.fill();x.strokeStyle='rgba(255,255,255,.35)';x.lineWidth=2;x.stroke()}
 else if(t==='leaf'){x.fillStyle=a;x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(24,0,0,26);x.quadraticCurveTo(-24,0,0,-26);x.fill();x.strokeStyle='rgba(0,0,0,.25)';x.lineWidth=2;x.beginPath();x.moveTo(0,-24);x.lineTo(0,26);x.stroke()}
 else if(t==='gk'){x.fillStyle='#f2c230';x.beginPath();x.moveTo(0,26);x.lineTo(-22,-12);x.quadraticCurveTo(0,-32,22,-12);x.closePath();x.fill();x.strokeStyle='rgba(150,100,0,.35)';x.lineWidth=2;x.beginPath();x.moveTo(0,26);x.lineTo(0,-20);x.stroke()}
 else if(t==='sn2'){x.strokeStyle='rgba(255,255,255,.95)';x.lineWidth=3;x.lineCap='round';for(let i=0;i<3;i++){x.save();x.rotate(i*1.0472);x.beginPath();x.moveTo(0,-26);x.lineTo(0,26);x.moveTo(-7,-17);x.lineTo(0,-10);x.lineTo(7,-17);x.moveTo(-7,17);x.lineTo(0,10);x.lineTo(7,17);x.stroke();x.restore()}}
 else if(t==='bub'){x.fillStyle=gd(26,'rgba(200,230,255,.02)','rgba(200,230,255,.22)');disc(26);x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=2.5;x.beginPath();x.arc(0,0,25,0,PI2);x.stroke();x.strokeStyle='rgba(255,255,255,.9)';x.lineWidth=3;x.beginPath();x.arc(0,0,17,3.6,4.6);x.stroke()}
 else if(t==='seed'){x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=1.8;x.lineCap='round';x.beginPath();x.moveTo(0,26);x.lineTo(0,-6);for(let i=0;i<9;i++){const an=-1.57+(i-4)*.32;x.moveTo(0,-6);x.lineTo(M.cos(an)*18,-6+M.sin(an)*18)}x.stroke();x.fillStyle='rgba(255,255,255,.9)';for(let i=0;i<9;i++){const an=-1.57+(i-4)*.32;x.beginPath();x.arc(M.cos(an)*18,-6+M.sin(an)*18,2,0,PI2);x.fill()}}
 else if(t==='drop'){x.fillStyle='rgba(150,205,255,.9)';x.beginPath();x.moveTo(0,-26);x.quadraticCurveTo(22,6,0,26);x.quadraticCurveTo(-22,6,0,-26);x.fill();x.fillStyle='rgba(255,255,255,.6)';x.beginPath();x.arc(-6,6,4,0,PI2);x.fill()}
 else if(t==='star'){x.fillStyle=gd(30,a,'rgba(255,255,255,0)',.0);x.globalAlpha=.35;disc(30);x.globalAlpha=1;x.fillStyle=a;x.beginPath();x.moveTo(0,-30);x.quadraticCurveTo(3,-3,30,0);x.quadraticCurveTo(3,3,0,30);x.quadraticCurveTo(-3,3,-30,0);x.quadraticCurveTo(-3,-3,0,-30);x.fill()}
 else if(t==='hrt'){x.fillStyle=a;x.beginPath();x.moveTo(0,22);x.bezierCurveTo(-34,-6,-16,-32,0,-12);x.bezierCurveTo(16,-32,34,-6,0,22);x.fill();x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(-10,-10,5,0,PI2);x.fill()}
 else if(t==='lan'){x.fillStyle=gd(30,'rgba(255,170,60,.55)','rgba(255,170,60,0)');disc(30);const q=x.createLinearGradient(0,-18,0,16);q.addColorStop(0,'#ffe9a0');q.addColorStop(1,a);x.fillStyle=q;x.beginPath();x.moveTo(-9,-18);x.lineTo(9,-18);x.lineTo(13,14);x.lineTo(-13,14);x.closePath();x.fill();x.fillStyle='#ffe066';x.beginPath();x.arc(0,16,4,0,PI2);x.fill()}
 else if(t==='dfly'){x.strokeStyle=a;x.lineWidth=4;x.lineCap='round';x.beginPath();x.moveTo(-24,0);x.lineTo(22,0);x.stroke();x.fillStyle=a;x.beginPath();x.arc(-24,0,5,0,PI2);x.fill();x.fillStyle='rgba(255,255,255,.55)';[[-6,-12,-.3],[-6,12,.3],[8,-10,-.15],[8,10,.15]].forEach(w=>{x.beginPath();x.ellipse(w[0],w[1],14,5,w[2],0,PI2);x.fill()})}
 else if(t==='cf'){x.fillStyle=a;x.fillRect(-14,-8,28,16)}
 else if(t==='tx'){x.font='bold 44px "Noto Sans KR",sans-serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='rgba(0,0,0,.5)';x.shadowBlur=4;x.fillStyle='#fff6d0';x.fillText(a,0,2)}
}
function spr(k){if(SC[k])return SC[k];const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.translate(32,32);
 if(k[0]!=='#'){x.font=FNT;x.textAlign='center';x.textBaseline='middle';x.fillText(k,0,3)}else{const i=k.indexOf(':');shape(x,k.slice(1,i<0?undefined:i),i<0?'':k.slice(i+1))}
 return SC[k]=c}
const FG={};function fog(c){if(FG[c])return FG[c];const f=document.createElement('canvas');f.width=256;f.height=96;const x=f.getContext('2d'),q=x.createRadialGradient(128,120,4,128,120,120);q.addColorStop(0,`rgba(${c},.55)`);q.addColorStop(1,`rgba(${c},0)`);x.scale(1,.4);x.fillStyle=q;x.fillRect(0,0,256,240);return FG[c]=f}
const MS={};function moonS(cr,col,red){const k=cr+col+red;if(MS[k])return MS[k];const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.translate(64,64);
 const q=x.createRadialGradient(-12,-12,4,0,0,62);q.addColorStop(0,red?'#ffb08a':'#ffffff');q.addColorStop(1,`rgb(${col})`);x.fillStyle=q;x.beginPath();x.arc(0,0,60,0,PI2);x.fill();
 x.fillStyle='rgba(120,110,100,.14)';[[-20,-14,13],[18,10,16],[-6,26,9],[24,-24,8]].forEach(b=>{x.beginPath();x.arc(b[0],b[1],b[2],0,PI2);x.fill()});
 if(cr){x.globalCompositeOperation='destination-out';x.beginPath();x.arc(30,-8,56,0,PI2);x.fill()}return MS[k]=c}

/* ───────── 상태 ───────── */
let W=0,H=0,K=1,sx=1,ox=0,oy=0,gy=0,g,cv,act=[],last=0,fc=0,nextAuto=0,bd=false,bdT=0,rec=[],raf=0;
const OPEN={rec:true},X=x=>ox+x*sx,Y=y=>oy+y*sx;
function size(){const d=M.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cv.style.width=W+'px';cv.style.height=H+'px';g.setTransform(d,0,0,d,0,0);K=M.min(1.6,M.max(.85,W/400));sx=M.max(W/400,H/800);ox=(W-400*sx)/2;oy=(H-800*sx)/2}
function gnd(){const l=document.querySelector('#v-cal .lg'),n=document.querySelector('nav');let t=H-100;if(l&&l.getClientRects().length)t=l.getBoundingClientRect().top-6;else if(n&&n.getClientRects().length)t=n.getBoundingClientRect().top-6;gy=M.min(H-40,M.max(H*.5,t))}
function mkcv(){const w=document.getElementById('wx');if(!w)return false;cv=document.createElement('canvas');cv.id='fx';w.after(cv);g=cv.getContext('2d');size();addEventListener('resize',size);return true}
function ds(k,x,y,z,rot,al,fl){const c=spr(k);g.save();g.globalAlpha=al;g.translate(x,y);if(rot)g.rotate(rot);if(fl)g.scale(-1,1);g.drawImage(c,-z/2,-z/2,z,z);g.restore()}
function glow(x,y,r,c,a){const q=g.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${c},${a})`);q.addColorStop(1,`rgba(${c},0)`);g.fillStyle=q;g.fillRect(x-r,y-r,2*r,2*r)}
function bird(x,y,z,ph,col){const f=M.sin(ph);g.strokeStyle=col;g.lineWidth=M.max(1.2,z*.14);g.lineCap='round';g.beginPath();g.moveTo(x-z,y+f*z*.6);g.quadraticCurveTo(x-z*.45,y-z*.3-f*z*.4,x,y);g.quadraticCurveTo(x+z*.45,y-z*.3-f*z*.4,x+z,y+f*z*.6);g.stroke()}

/* ───────── 종류별 동작 ───────── */
const H_={};
function spF(o){const f=o.f||'t',z=R2(o.z||[10,16])*K,p={k:pick(o.s),z,ph:rn()*6,r:rn()*6,a:0,lf:o.lf?R2(o.lf)*60:0,w:o.dl?R2(o.dl):0,vx:o.vx?R2(o.vx):0,vy:o.vy?R2(o.vy):(f==='t'?R2([.8,1.6]):0),x:0,y:0};
 if(f==='t'){p.x=rr(-.1*W,1.1*W);p.y=-z}else if(f==='b'){p.x=rr(0,W);p.y=H+z}else if(f==='l'){p.x=-z;p.y=rr(0,H)}else if(f==='r'){p.x=W+z;p.y=rr(0,H)}
 else if(f==='tr'){p.x=rr(W*.3,W*1.15);p.y=rr(-20,H*.35)}
 else if(f==='p'){const s=rn()<.5;p.x=s?0:W;p.y=H*.95;p.vx=(s?1:-1)*rr(3,9);p.vy=-rr(9,16)}
 else{const y=o.y||[0,1];p.x=rr(0,W);p.y=rr(y[0]*H,y[1]*H)}return p}
H_.flow={i(c){const o=c.o;c.p=[];for(let j=0;j<(o.n||30)*.55;j++){const p=spF(o);if(['t','b','l','r'].includes(o.f||'t')){p.x=rr(0,W);p.y=rr(0,H)}c.p.push(p)}},
 u(c,I,now,dt,en,q){const o=c.o,P=c.p,ramp=M.min(1,I.t/2.5),wd=(o.wd===undefined?.6:o.wd)*q.w*5,mg=90*K;
  if(!I.end){let k=0;while(P.length<(o.n||30)*ramp&&k++<2)P.push(spF(o))}
  for(let i=P.length-1;i>=0;i--){const p=P[i];if(p.w>0){p.w-=dt;continue}
   if(o.gr)p.vy+=o.gr*dt;if(o.dg){const f=M.pow(o.dg,dt);p.vx*=f;p.vy*=f}
   p.x+=(p.vx+wd)*dt+M.sin(now/(o.sf||800)+p.ph)*(o.sw||0)*dt;p.y+=p.vy*dt;p.r+=(o.sp||0)*dt*(p.ph>3?1:-1);p.a+=dt;
   if(p.x<-mg||p.x>W+mg||p.y<-mg||p.y>H+mg||(p.lf&&p.a>p.lf)){if(I.end)P.splice(i,1);else Object.assign(p,spF(o))}}
  if(o.ln){const col=o.ln[0],ln=o.ln[1]*K;if(o.mt){g.lineWidth=o.ln[2]||1.5;for(const p of P){if(p.w>0)continue;const al=(p.lf?M.sin(M.PI*M.min(1,p.a/p.lf)):1)*en,l=ln/(M.hypot(p.vx,p.vy)||1),tx=p.x-p.vx*l,ty=p.y-p.vy*l,gr=g.createLinearGradient(p.x,p.y,tx,ty);gr.addColorStop(0,`rgba(${col},${al})`);gr.addColorStop(1,`rgba(${col},0)`);g.strokeStyle=gr;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(tx,ty);g.stroke()}}
   else{g.strokeStyle=`rgba(${col},${(o.al||1)*en})`;g.lineWidth=o.ln[2]||1.2;g.beginPath();for(const p of P){if(p.w>0)continue;const l=ln/(M.hypot(p.vx,p.vy)||1);g.moveTo(p.x,p.y);g.lineTo(p.x-p.vx*l,p.y-p.vy*l)}g.stroke()}return}
  if(o.add)g.globalCompositeOperation='lighter';
  for(const p of P){if(p.w>0)continue;const lf=p.lf?M.sin(M.PI*M.min(1,p.a/p.lf)):1,al=(o.al||1)*lf*(o.tw?.55+.45*M.sin(now/170+p.ph*3):1)*en;if(al<.02)continue;ds(p.k,p.x,p.y,p.z,o.sp?p.r:0,al)}}};
const dirOf=o=>o.dir||(rn()<.5?1:-1);
H_.cross={i(c){c.gs=[];c.nx=0},u(c,I,now,dt,en){const o=c.o,GS=c.gs,al=M.min(1,en*2);
  if(!I.end&&I.t>=c.nx){c.nx=I.t+(o.ev||4)*rr(.8,1.25);const dir=dirOf(o),z=R2(o.z)*K,items=o.ch||Array.from({length:o.gn||1},()=>pick(o.s)),gp=(o.gp||24)*K,sp=items.length*gp+z+60*K,y=o.g!==undefined?gy+o.g*K-z*.42:R2(o.y)*H;GS.push({x:dir>0?-sp:W+sp,y,v:R2(o.v)*dir,dir,z,items,gp,a:0,ph:rn()*6,sl:o.sl||0})}
  for(let i=GS.length-1;i>=0;i--){const G=GS[i];G.a+=dt;G.x+=G.v*dt;G.y+=M.abs(G.v)*G.sl*dt;const sp=G.items.length*G.gp+G.z+60*K;if(G.dir>0?G.x-sp>W:G.x+sp<0){GS.splice(i,1);continue}
   const by=G.y+(o.bob?M.sin(G.a*(o.bf||.04)+G.ph)*o.bob*K:0),fl=o.fr?G.dir<0:G.dir>0;
   G.items.forEach((k,j)=>{const kk=o.vf?(j+1)>>1:j;let ox_=-G.dir*kk*G.gp,oy_=o.vf?(j%2?1:-1)*kk*G.gp*.55:0;if(o.hop)oy_-=M.abs(M.sin(G.a*(o.hf||.18)+j*1.3))*o.hop*K;if(o.zz)oy_+=M.sin(G.a*.12+j*2+G.ph)*o.zz*K;const x=G.x+ox_,y=by+oy_;
    if(o.tr&&j===0){const Ln=o.tr[3]*K,vx=G.v,vy=M.abs(G.v)*G.sl,n=M.hypot(vx,vy)||1,gr=g.createLinearGradient(x,y,x-vx/n*Ln,y-vy/n*Ln);gr.addColorStop(0,`rgba(${o.tr[0]},${o.tr[1]},${o.tr[2]},${.7*al})`);gr.addColorStop(1,`rgba(${o.tr[0]},${o.tr[1]},${o.tr[2]},0)`);g.strokeStyle=gr;g.lineWidth=o.tw||2;g.beginPath();g.moveTo(x,y);g.lineTo(x-vx/n*Ln,y-vy/n*Ln);g.stroke()}
    if(k[0]==='@'){g.globalAlpha=al;bird(x,y,G.z,G.a*(o.fl||.3)+j*.8+G.ph,k.slice(6));g.globalAlpha=1}else ds(k,x,y,G.z,0,al,fl)})}}};
H_.stand={i(c){const o=c.o,n=o.n||2;c.it=Array.from({length:n},(_,j)=>({x:W*(.12+.76*(j+rn()*.6)/n),z:R2(o.z)*K,k:pick(o.s),ph:rn()*6}))},
 u(c,I,now,dt,en){for(const s of c.it){const z=s.z*(.6+.4*en);g.save();g.globalAlpha=en;g.translate(s.x,gy+6);g.rotate(M.sin(now/900+s.ph)*.04);g.drawImage(spr(s.k),-z/2,-z,z,z);g.restore()}}};
H_.lob={i(c){c.gs=[];c.nx=0;c.rp=[]},u(c,I,now,dt,en){const o=c.o,al=M.min(1,en*2);
  if(!I.end&&I.t>=c.nx){c.nx=I.t+(o.ev||2)*rr(.8,1.3);const dir=rn()<.5?1:-1;c.gs.push({x0:rr(.12,.88)*W,y0:o.g!==undefined?gy+o.g*K:R2(o.y)*H,dx:dir*R2(o.dx)*K,hh:R2(o.hh)*K,T:R2(o.T),u:0,k:pick(o.s),z:R2(o.z)*K})}
  for(let i=c.gs.length-1;i>=0;i--){const G=c.gs[i];G.u+=dt/G.T;if(G.u>=1){if(o.rp)c.rp.push({x:G.x0+G.dx,y:G.y0,r:2,a:1});c.gs.splice(i,1);continue}
   const u=G.u,x=G.x0+G.dx*u,y=G.y0-4*G.hh*u*(1-u);let rot=0;if(o.rt==='tan')rot=M.atan2(-4*G.hh*(1-2*u),M.abs(G.dx))*(G.dx>0?1:-1);else rot=(o.spn||0)*u*60;ds(G.k,x,y,G.z,rot,al,G.dx>0)}
  for(let i=c.rp.length-1;i>=0;i--){const p=c.rp[i];p.r+=.9*dt;p.a-=.03*dt;if(p.a<=0){c.rp.splice(i,1);continue}g.strokeStyle=`rgba(255,255,255,${p.a*.7*en})`;g.lineWidth=1.4;g.beginPath();g.ellipse(p.x,p.y,p.r*2,p.r*.7,0,0,PI2);g.stroke()}}};
H_.burst={i(c){c.rk=[];c.pt=[];c.nx=0},u(c,I,now,dt,en){const o=c.o;
  if(!I.end&&I.t>=c.nx){c.nx=I.t+(o.ev||1.3)*rr(.8,1.3);c.rk.push({x:rr(.15,.85)*W,y:H*.78,ty:rr(.12,.45)*H,vy:-rr(5,7)*K,c:pick(o.cl),sh:pick(o.sh||['r'])})}
  g.globalCompositeOperation='lighter';
  for(let i=c.rk.length-1;i>=0;i--){const r=c.rk[i];r.y+=r.vy*dt;g.fillStyle=`rgba(255,240,200,${.9*en})`;g.beginPath();g.arc(r.x,r.y,2*K,0,PI2);g.fill();g.strokeStyle=`rgba(255,220,150,${.5*en})`;g.lineWidth=1.5;g.beginPath();g.moveTo(r.x,r.y);g.lineTo(r.x,r.y-r.vy*5);g.stroke();
   if(r.y<=r.ty){const n=o.pn||60,w=r.sh==='w';for(let j=0;j<n;j++){let vx,vy,a=j/n*PI2;
     if(r.sh==='r'){a=rn()*PI2;const v=rr(.8,4.2);vx=M.cos(a)*v;vy=M.sin(a)*v}
     else if(r.sh==='c'){vx=M.cos(a)*3.2;vy=M.sin(a)*3.2}
     else if(r.sh==='h'){vx=16*M.pow(M.sin(a),3)*.2;vy=-(13*M.cos(a)-5*M.cos(2*a)-2*M.cos(3*a)-M.cos(4*a))*.2}
     else if(r.sh==='s'){const v=1.5+2.4*M.abs(M.cos(2.5*a));vx=M.cos(a)*v;vy=M.sin(a)*v}
     else{a=rn()*PI2;const v=rr(.5,3);vx=M.cos(a)*v;vy=M.sin(a)*v}
     c.pt.push({x:r.x,y:r.y,vx:vx*K,vy:vy*K,l:w?rr(80,120):rr(55,80),m:w?100:68,c:r.c,gr:w?.06:.03})}
    c.pt.push({x:r.x,y:r.y,vx:0,vy:0,l:8,m:8,c:'255,255,255',gr:0,big:1});c.rk.splice(i,1)}}
  for(let i=c.pt.length-1;i>=0;i--){const p=c.pt[i];p.l-=dt;if(p.l<=0){c.pt.splice(i,1);continue}if(p.big){glow(p.x,p.y,40*K,p.c,.6*(p.l/p.m)*en);continue}
   p.x+=p.vx*dt;p.y+=p.vy*dt;const f=M.pow(.97,dt);p.vx*=f;p.vy=p.vy*f+p.gr*dt;const a=M.min(1,p.l/(p.m*.5))*en;
   g.strokeStyle=`rgba(${p.c},${a})`;g.lineWidth=1.8*K;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-p.vx*2,p.y-p.vy*2);g.stroke()}}};
H_.tint={u(c,I,now,dt,en){const gr=g.createLinearGradient(0,0,0,H);c.o.st.forEach(s=>gr.addColorStop(s[0],`rgba(${s[1]},${s[2]*en})`));g.fillStyle=gr;g.fillRect(0,0,W,H)}};
H_.halo={u(c,I,now,dt,en,q,d){const o=c.o;let x,y;if(o.at){x=o.at[0]*W;y=o.at[1]*H-(o.rise||0)*K*en}else{const s=d.o||{x:200,y:150};x=X(s.x);y=Y(s.y)}
  const r=o.r*K;g.globalCompositeOperation='lighter';glow(x,y,r*2.6,o.c,.5*en);
  if(o.ring){const R=r*3.4,q2=g.createRadialGradient(x,y,R-16*K,x,y,R+16*K),a=.3*en;[[0,'255,255,255',0],[.2,'255,120,120',a],[.38,'255,230,120',a],[.55,'140,255,160',a],[.72,'120,190,255',a],[.88,'190,140,255',a*.8],[1,'255,255,255',0]].forEach(s=>q2.addColorStop(s[0],`rgba(${s[1]},${s[2]})`));g.fillStyle=q2;g.fillRect(x-R*1.3,y-R*1.3,R*2.6,R*2.6)}
  g.globalCompositeOperation='source-over';g.fillStyle=`rgba(${o.c},${.85*en})`;g.beginPath();g.arc(x,y,r*.5,0,PI2);g.fill()}};
H_.rays={u(c,I,now,dt,en){const o=c.o,n=o.n||6,col=o.c||'255,240,190';g.globalCompositeOperation='lighter';for(let k=0;k<n;k++){const bx=W*(k+.5)/n+M.sin(now/3000+k)*W*.04,w=W*(.05+.035*((k*7)%3)),sl=(o.sl||.35)*H,a=en*(o.al||.14)*(.6+.4*M.sin(now/1800+k*1.7)),gr=g.createLinearGradient(0,0,0,H*.9);gr.addColorStop(0,`rgba(${col},${a})`);gr.addColorStop(1,`rgba(${col},0)`);g.fillStyle=gr;g.beginPath();g.moveTo(bx,-10);g.lineTo(bx+w,-10);g.lineTo(bx+w+sl,H*.9);g.lineTo(bx-w*.6+sl,H*.9);g.fill()}}};
H_.aurora={u(c,I,now,dt,en){const cl=c.o.cl||['80,255,170','150,120,255','80,200,255'];for(let k=0;k<3;k++){const gr=g.createLinearGradient(0,H*.05,0,H*.42);gr.addColorStop(0,`rgba(${cl[k]},0)`);gr.addColorStop(.5,`rgba(${cl[k]},${.3*en})`);gr.addColorStop(1,`rgba(${cl[(k+1)%3]},0)`);g.fillStyle=gr;g.beginPath();for(let x=0;x<=W;x+=14){const y=H*(.14+k*.05)+M.sin(x/110+now/1800+k*2)*22+M.sin(x/47+now/900)*7;x?g.lineTo(x,y):g.moveTo(x,y)}g.lineTo(W,H*.4+k*10);g.lineTo(0,H*.4+k*10);g.fill()}}};
H_.band={i(c){const o=c.o;c.f=Array.from({length:o.n||6},(_,j)=>({x:rr(-.2,1.1)*W,y:R2(o.y||[.3,.7])*H,v:rr(.1,.3)*(o.v||1)*(j%2?1:-1),s:rr(.8,1.5)}))},
 u(c,I,now,dt,en){const o=c.o,s=fog(o.c||'255,255,255');g.globalAlpha=(o.al||.5)*en;for(const f of c.f){f.x+=f.v*dt;if(f.x>W+200)f.x=-W;if(f.x<-W-200)f.x=W+100;g.drawImage(s,f.x,f.y,W*(o.w||.9)*f.s,H*(o.h||.16))}}};
H_.flash={i(c){c.nx=0;c.fl=[]},u(c,I,now,dt,en){const o=c.o;if(!I.end&&I.t>=c.nx){c.nx=I.t+rr(.9,2.6);const x=rr(.1,.9)*W,y=rr(.05,.35)*H,n=1+(rn()*3|0);for(let j=0;j<n;j++)c.fl.push({x,y,a:1,w:j*.18})}
  g.globalCompositeOperation='lighter';for(let i=c.fl.length-1;i>=0;i--){const f=c.fl[i];if(f.w>0){f.w-=dt/60;continue}f.a-=.06*dt;if(f.a<=0){c.fl.splice(i,1);continue}glow(f.x,f.y,W*.45,o.c||'190,205,255',f.a*en*.6)}}};
H_.flare={u(c,I,now,dt,en,q,d){const s=d.o||{x:300,y:150},x=X(s.x),y=Y(s.y),dx=W/2-x,dy=H*.5-y,sw=M.sin(now/2500)*.04;g.globalCompositeOperation='lighter';
  [[.25,40,'255,200,120',.28],[.5,22,'120,255,200',.2],[.75,60,'255,120,200',.14],[1.05,30,'120,170,255',.22],[1.4,50,'255,230,150',.14]].forEach(a=>glow(x+dx*(a[0]+sw),y+dy*(a[0]+sw),a[1]*K,a[2],a[3]*en));glow(x,y,90*K,'255,240,200',.35*en);
  g.strokeStyle=`rgba(255,245,210,${.3*en})`;g.lineWidth=2;g.beginPath();g.moveTo(x-W*.35,y);g.lineTo(x+W*.35,y);g.stroke()}};
H_.rainbow={u(c,I,now,dt,en){const o=c.o,a=en*(o.al||.55),cx=W*.5,cy=H*.66,r0=W*.62,bw=W*.022,cl=o.pl?['#dfe6ff','#e6ecff','#eef2ff','#f4f6ff','#e6ecff','#dfe6ff','#d8e0ff']:['#ff4d4d','#ff9d3d','#ffe24d','#52d96b','#4db8ff','#5b6bff','#b266ff'];g.lineWidth=bw+1;
  for(let i=0;i<7;i++){g.strokeStyle=cl[i];g.globalAlpha=a;g.beginPath();g.arc(cx,cy,r0-i*bw,M.PI,PI2);g.stroke();if(o.n>1){g.strokeStyle=cl[6-i];g.globalAlpha=a*.4;g.beginPath();g.arc(cx,cy,r0+W*.2+i*bw,M.PI,PI2);g.stroke()}}}};
H_.lights={u(c,I,now,dt,en){const cl=c.o.cl;g.globalCompositeOperation='lighter';let idx=0;[.04,.09].forEach((fy,r)=>{for(let s=0;s<4;s++){const x0=W*s/4,x1=W*(s+1)/4,sag=24*K;for(let b=0;b<=5;b++){const t=b/5,x=x0+(x1-x0)*t,y=H*fy+4*sag*t*(1-t)*.5+sag*.2*r,a=.5+.5*M.sin(now/400+idx*1.3+r*2),col=cl[idx%cl.length];idx++;glow(x,y,11*K,col,a*en*.9);g.fillStyle=`rgba(${col},${en})`;g.beginPath();g.arc(x,y,2.4*K,0,PI2);g.fill()}}})}};
H_.glass={i(c){c.d=[]},u(c,I,now,dt,en){const o=c.o;if(!I.end&&c.d.length<(o.n||22)&&rn()<.12*dt)c.d.push({x:rr(0,W),y:rr(-20,H*.8),r:rr(2,5.5)*K,v:0,st:rr(20,120),tl:0});
  for(let i=c.d.length-1;i>=0;i--){const p=c.d[i];if(p.st>0)p.st-=dt;else{p.v=M.min(3.5,p.v+.12*dt);if(rn()<.02*dt){p.v=0;p.st=rr(20,90)}}p.y+=p.v*dt;p.tl=M.min(p.tl+p.v*dt*.9,40*K);if(p.y>H+20){c.d.splice(i,1);continue}
   g.strokeStyle=`rgba(220,235,255,${.3*en})`;g.lineWidth=p.r*.55;g.beginPath();g.moveTo(p.x,p.y-p.tl);g.lineTo(p.x,p.y);g.stroke();g.fillStyle=`rgba(200,225,255,${.45*en})`;g.beginPath();g.ellipse(p.x,p.y,p.r,p.r*1.25,0,0,PI2);g.fill();g.fillStyle=`rgba(255,255,255,${.7*en})`;g.beginPath();g.arc(p.x-p.r*.3,p.y-p.r*.4,p.r*.3,0,PI2);g.fill()}}};
H_.frost={i(c){c.s=Array.from({length:36},()=>{const e=rn()<.5;return{x:e?(rn()<.5?rr(0,.12):rr(.88,1))*W:rr(0,W),y:e?rr(0,H):(rn()<.5?rr(0,.08):rr(.92,1))*H,z:rr(10,26)*K,p:rn()*6}})},
 u(c,I,now,dt,en){const gr=g.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,H*.75);gr.addColorStop(0,'rgba(220,240,255,0)');gr.addColorStop(1,`rgba(215,238,255,${.55*en})`);g.fillStyle=gr;g.fillRect(0,0,W,H);g.globalCompositeOperation='lighter';for(const s of c.s)ds('#sn2',s.x,s.y,s.z,0,.55*en*(.6+.4*M.sin(now/500+s.p)))}};
H_.wave={u(c,I,now,dt,en){g.strokeStyle=`rgba(255,255,255,${.1*en})`;g.lineWidth=3*K;for(let k=0;k<7;k++){const by=H*(.35+.07*k);g.beginPath();for(let x=0;x<=W;x+=12){const y=by+M.sin(x/55+now/600+k)*6*K+M.sin(x/23-now/400)*2.5*K;x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}}};
H_.swarm={i(c){c.d=Array.from({length:c.o.n||30},()=>({x:rr(0,W),y:rr(0,H*.5),a:rn()*6,r:rr(.2,1)}))},
 u(c,I,now,dt,en){const o=c.o,t=now/1000,cx=W*(.5+.38*M.sin(t*.32)),cy=H*(o.y||.3)+H*.08*M.sin(t*.47),sp=o.sp||1,sf=o.sf||.9;
  for(const d of c.d){const tx=cx+M.cos(t*sf+d.a)*W*.2*d.r*sp,ty=cy+M.sin(t*sf*1.3+d.a*2)*H*.08*d.r*sp;d.x+=(tx-d.x)*.03*dt;d.y+=(ty-d.y)*.03*dt;
   if(o.dk){g.fillStyle=`rgba(${o.c},${.85*en})`;g.beginPath();g.arc(d.x,d.y,(o.r||2)*K,0,PI2);g.fill()}
   else if(o.dfl){ds('#dfly:'+o.c,d.x,d.y,(o.r||5)*4*K,M.sin(now/300+d.a)*.4,.9*en)}
   else{g.globalCompositeOperation='lighter';ds('#dot:'+o.c,d.x,d.y,(o.r||6)*2.6*K,0,(.5+.5*M.sin(t*3+d.a*4))*en)}}}};
H_.swirl={i(c){const o=c.o;c.cx=rr(.1,.9)*W;c.v=(rn()<.5?1:-1)*rr(.35,.6);c.it=Array.from({length:o.n||40},()=>({a:rn()*6,h:rn(),r:rr(.4,1),k:pick(o.s),z:R2(o.z)*K}))},
 u(c,I,now,dt,en){c.cx+=c.v*dt;if(c.cx<-40||c.cx>W+40)c.v*=-1;g.globalAlpha=en;for(const s of c.it){s.a+=(.12/(.6+s.h))*dt;const rad=(14+s.h*70)*K*s.r,x=c.cx+M.cos(s.a)*rad+M.sin(now/700+s.h*4)*6,y=gy-s.h*H*.5+M.sin(s.a)*rad*.25;ds(s.k,x,y,s.z,s.a,en*(.45+.55*M.sin(s.a)*.5+.25))}}};
H_.moon={u(c,I,now,dt,en){const o=c.o,x=o.x*W,y=o.y*H+M.sin(now/4000)*3,r=o.r*K;g.globalCompositeOperation='lighter';glow(x,y,r*3.2,o.c,.38*en);g.globalCompositeOperation='source-over';g.globalAlpha=en;g.drawImage(moonS(o.cr?1:0,o.c,o.red?1:0),x-r,y-r,2*r,2*r);
  if(o.ring){const R=r*3,q2=g.createRadialGradient(x,y,R-14*K,x,y,R+14*K),a=.28*en;[[0,'255,255,255',0],[.25,'255,140,140',a],[.45,'255,235,140',a],[.6,'150,255,170',a],[.78,'130,190,255',a],[1,'255,255,255',0]].forEach(s=>q2.addColorStop(s[0],`rgba(${s[1]},${s[2]})`));g.globalCompositeOperation='lighter';g.fillStyle=q2;g.fillRect(x-R*1.3,y-R*1.3,R*2.6,R*2.6)}
  if(o.bn){g.globalCompositeOperation='source-over';ds('🐇',x-r*.1,y+r*.05,r*1.05,0,.75*en)}}};
H_.const={u(c,I,now,dt,en){const o=c.o,P=o.p,bx=o.x*W,by=o.y*H,w=o.w*W,h=o.h*H;g.globalCompositeOperation='lighter';g.strokeStyle=`rgba(180,205,255,${.35*en})`;g.lineWidth=1.2;g.setLineDash([4,5]);g.beginPath();o.l.forEach(l=>{g.moveTo(bx+P[l[0]][0]*w,by+P[l[0]][1]*h);g.lineTo(bx+P[l[1]][0]*w,by+P[l[1]][1]*h)});g.stroke();g.setLineDash([]);
  P.forEach((p,i)=>ds('#star:#ffffff',bx+p[0]*w,by+p[1]*h,(14+(p[2]||0)*8)*K*(.85+.15*M.sin(now/400+i)),0,en));g.globalCompositeOperation='source-over';g.fillStyle=`rgba(220,232,255,${.75*en})`;g.font=`${12*K}px sans-serif`;g.textAlign='center';g.fillText(o.lb,bx+w/2,by+h+22*K)}};
H_.milky={i(c){c.s=Array.from({length:140},()=>({u:rr(-1,1),v:rr(-1,1)*rr(0,1),r:rr(.5,1.6),p:rn()*6}))},
 u(c,I,now,dt,en){const th=H*.22;g.translate(W/2,H*.32);g.rotate(-.55);const gr=g.createLinearGradient(0,-th,0,th);gr.addColorStop(0,'rgba(190,200,255,0)');gr.addColorStop(.5,`rgba(210,215,255,${.22*en})`);gr.addColorStop(1,'rgba(190,200,255,0)');g.fillStyle=gr;g.fillRect(-W,-th,2*W,2*th);
  for(const s of c.s){g.fillStyle=`rgba(255,250,235,${(.5+.5*M.sin(now/500+s.p))*en*.9})`;g.beginPath();g.arc(s.u*W*.9,s.v*th*.8,s.r*K,0,PI2);g.fill()}}};

/* ───────── 실행 ───────── */
function start(e){const now=performance.now();while(act.length>=3)act.shift();
 const I={e,t0:now,t:0,du:e.du||({cross:22,burst:24,lob:20,stand:18})[e.k]||16,end:false,cs:[]};
 I.cs=[e].concat(e.xs||[]).map(o=>{const c={o};H_[o.k].i&&H_[o.k].i(c);return c});act.push(I)}
function fire(id){if(!ok())return;if(!cv&&!mkcv())return;const e=id==='?'?pick(L):L.find(x=>x.id===id);if(e)start(e)}
function ok(){try{return S.sa!==0&&document.documentElement.dataset.skin==='scenic'&&!document.hidden&&window.WX&&WX.q.mo&&window.SCN&&SCN.D}catch(e){return false}}
function autoPick(now,q,mo,night){const wet=q.R>.3||q.T>.3||q.w>.6,real=new Date(),rm=real.getMonth()+1,rd=real.getDate();
 const pool=L.filter(e=>(!e.m||e.m.includes(mo))&&!(e.dy&&night)&&!(wet&&!e.wet)&&!act.some(a=>a.e===e)&&!rec.includes(e.id));let tot=0;
 const ws=pool.map(e=>{let w=e.m?2:1;if(bd&&e.bd)w*=6;if(e.dt&&rm===mo&&rm===e.dt[0]&&rd>=e.dt[1]&&rd<=e.dt[2])w*=12;tot+=w;return w});
 let r=rn()*tot;for(let i=0;i<pool.length;i++){if((r-=ws[i])<=0){start(pool[i]);rec.push(pool[i].id);if(rec.length>12)rec.shift();return}}}
function frame(now){raf=requestAnimationFrame(frame);const dt=M.min(3,(now-last)/16.7||1);last=now;
 if(!ok()){if(act.length){act.length=0;g&&g.clearRect(0,0,W,H)}return}
 if(!cv&&!mkcv())return;fc++;if(fc%30===1)gnd();
 if(now-bdT>60000){bdT=now;try{bd=bdOn(new Date()).length>0}catch(e){bd=false}}
 let q;try{q=WX.q}catch(e){return}const mo=q.mo,d=SCN.D[mo]||{},night=!!d.st;
 if(!nextAuto)nextAuto=now+(bd?2500:6000);
 if(S.fx!==0&&now>nextAuto){if(act.length<2){if(bd&&!rec.includes('birthday')){start(L.find(e=>e.id==='birthday'));rec.push('birthday')}else autoPick(now,q,mo,night)}nextAuto=now+rr(14000,28000)}
 g.clearRect(0,0,W,H);
 for(let i=act.length-1;i>=0;i--){const I=act[i];I.t=(now-I.t0)/1000;I.end=I.t>I.du;if(I.t>I.du+2.6){act.splice(i,1);continue}
  const en=M.max(0,M.min(1,I.t/1.8,(I.du+2.2-I.t)/2.2)),nd=I.e.nt&&!night?((mo===8||mo===11)?.2:.42):0,dim=M.max(nd,I.e.dm||0)*en;
  if(dim>.01){g.fillStyle=`rgba(6,10,28,${dim})`;g.fillRect(0,0,W,H)}
  for(const c of I.cs){g.save();g.globalAlpha=1;g.globalCompositeOperation='source-over';H_[c.o.k].u(c,I,now,dt,en,q,d);g.restore()}}}

/* ───────── 설정 화면 UI ───────── */
const st=document.createElement('style');st.textContent='#fx{position:fixed;inset:0;z-index:-1;pointer-events:none;display:none}html[data-skin=scenic] #fx{display:block}html[data-sa="0"] #fx{display:none}.fxd{margin-top:10px;border:1px solid var(--l);border-radius:14px;background:var(--c);padding:2px 10px}.fxd summary{padding:10px 2px;cursor:pointer;list-style:none;font-weight:600}.fxd summary::-webkit-details-marker{display:none}.fxd summary:after{content:"▾";float:right;opacity:.7}.fxd[open] summary:after{content:"▴"}.fxd summary small{opacity:.65;font-weight:400;margin-left:4px}.fxd .fn{margin:0 0 10px}.fxd .fn button{padding:7px 11px;font-size:13px;border-radius:12px}';document.head.appendChild(st);
document.addEventListener('toggle',e=>{const t=e.target;if(t&&t.dataset&&t.dataset.fx!==undefined)OPEN[t.dataset.fx]=t.open},true);
const btn=e=>`<button data-a="fx" data-v="${e.id}">${e.ic} ${e.nm}</button>`;
window.FX={count:L.length,list:L,fire,stop(){act.length=0;g&&g.clearRect(0,0,W,H)},
 ui(){let mo=new Date().getMonth()+1;try{mo=WX.q.mo||mo}catch(e){}const rc=L.filter(e=>e.m&&e.m.includes(mo)),on=S.fx!==0;
  const det=(k,t,n,b)=>`<details class="fxd" data-fx="${k}"${OPEN[k]?' open':''}><summary>${t}<small>${n}</small></summary><div class="fn">${b}</div></details>`;
  return`<div class="mu" style="margin-top:16px"><b style="color:var(--g2)">✨ 추가 풍경 효과 ${L.length}가지</b><br>월·낮밤·기념일에 맞춰 자동으로 나오고, 눌러서 바로 볼 수도 있어요.</div><div class="fn"><button data-a="fxa" class="${on?'on':''}">자동 재생 ${on?'켜짐':'꺼짐'}</button><button data-a="fx" data-v="?">🎲 아무거나</button><button data-a="fxs">⏹ 멈추기</button></div>`
   +det('rec',`🗓 ${mo}월 추천`,rc.length,rc.map(btn).join(''))+CATS.map(c=>{const l=L.filter(e=>e.cat===c[0]);return det(c[0],c[1]+' '+c[2],l.length,l.map(btn).join(''))}).join('')}};
raf=requestAnimationFrame(t=>{last=t;frame(t)});
})();

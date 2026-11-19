/* PFT Desk – app logic (real time, saved data, native features via Tauri). */
const T=window.__TAURI__;
const $=id=>document.getElementById(id);
const mobile=/Android/i.test(navigator.userAgent);
const mq=window.matchMedia('(max-width:700px)'),applyM=()=>document.documentElement.classList.toggle('m',mq.matches||mobile);
mq.addEventListener('change',applyM);applyM();
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
[['Export CSV…','Ekspor CSV…','导出 CSV…'],['Log exported','Catatan diekspor','记录已导出'],['Could not export the log','Tidak dapat mengekspor catatan','无法导出记录'],['Sound on alerts','Suara saat alarm','提醒时播放声音'],['Desktop notifications','Notifikasi desktop','桌面通知'],['Clock','Jam','时钟'],['Off','Nonaktif','关闭'],['Arrived {0}','Tiba {0}','到达 {0}'],['All changes saved','Semua perubahan tersimpan','所有更改已保存'],['Could not save data','Tidak dapat menyimpan data','无法保存数据'],['Your data is saved automatically to:','Data Anda disimpan otomatis ke:','您的数据会自动保存到：'],
['Saved data could not be read. A backup copy may exist next to the data file.','Data tersimpan tidak dapat dibaca. Salinan cadangan mungkin ada di samping berkas data.','无法读取已保存的数据。数据文件旁可能有备份副本。'],['Test build, version 0.9','Versi uji, versi 0.9','测试版，版本 0.9'],
['Disclaimer: this program was made with Claude, an AI assistant from Anthropic. It is an early test build that has not been reviewed or tested as real school software, so check it carefully before relying on it for real student records or safety decisions.','Penafian: program ini dibuat dengan Claude, asisten AI dari Anthropic. Ini adalah versi uji awal yang belum ditinjau atau diuji sebagai perangkat lunak sekolah sungguhan, jadi periksa dengan cermat sebelum mengandalkannya untuk data siswa nyata atau keputusan keselamatan.','免责声明：本程序由 Anthropic 的 AI 助手 Claude 制作。这是早期测试版，尚未作为真正的学校软件经过审核或测试，在将其用于真实的学生记录或安全决策之前，请仔细检查。']
].forEach(([e,i,z])=>{D.id[e]=i;D.zh[e]=z});
[['Went home','Pulang','已回家'],['Leaving school for the day','Pulang untuk hari ini','今天提前离校'],['Undo','Urungkan','撤销'],['Went home {0}','Pulang {0}','{0} 已回家'],['{0} went home','{0} pulang','{0} 已回家'],['Went home status removed for {0}','Status pulang untuk {0} dibatalkan','已取消 {0} 的回家状态']].forEach(([e,i,z])=>{D.id[e]=i;D.zh[e]=z});
[['This program was made with prominent use of Claude, Anthropic’s AI model. Proceed with this knowledge and with caution.','Program ini dibuat dengan penggunaan Claude, model AI dari Anthropic, secara menonjol. Lanjutkan dengan mengetahui hal ini dan dengan hati-hati.','本程序大量使用了 Anthropic 的 AI 模型 Claude 制作。请在了解这一点的前提下谨慎使用。'],['Version: 0.9','Versi: 0.9','版本：0.9']].forEach(([e,i,z])=>{D.id[e]=i;D.zh[e]=z});
[['Randomizer','Pengacak','随机抽选'],['Students per group','Siswa per kelompok','每组人数'],['Skip students already picked','Lewati siswa yang sudah terpilih','跳过已被抽中的学生'],['Pick students','Pilih siswa','抽选学生'],['Clear picks','Hapus pilihan','清除抽选记录'],['{0} available to pick','{0} siswa tersedia','{0} 人可抽选'],['{0} already picked','{0} sudah terpilih','已抽中 {0} 人'],['Only {0} available','Hanya {0} tersedia','仅有 {0} 人可选'],['No one available','Tidak ada yang tersedia','无人可选'],['Press “Pick students” to choose players.','Tekan “Pilih siswa” untuk memilih pemain.','点击“抽选学生”来选出参赛者。'],['Nobody is available to pick. Mark students as present first.','Tidak ada siswa yang tersedia. Tandai siswa hadir terlebih dahulu.','没有可抽选的学生。请先将学生标记为出席。'],['Picked {0} students','Memilih {0} siswa','已抽选 {0} 名学生'],['Picks cleared','Pilihan dihapus','已清除抽选记录']].forEach(([e,i,z])=>{D.id[e]=i;D.zh[e]=z});
[['Search students…','Cari siswa…','搜索学生…'],['No students match “{0}”.','Tidak ada siswa yang cocok dengan “{0}”.','没有与“{0}”匹配的学生。'],['{0} shown','{0} ditampilkan','显示 {0} 人']].forEach(([e,i,z])=>{D.id[e]=i;D.zh[e]=z});
const fg=c=>{const n=parseInt(c.slice(1),16);return ((n>>16)*299+(n>>8&255)*587+(n&255)*114)/1000>150?'#1f1f1f':'#fff'};
const PAL=['#da4453','#f5c211','#27ae60','#1d99f3','#8e44ad','#e67e22','#16a085','#e84393'];
const S={lang:'en',sound:true,notif:true,cur:0,ws:[],next:1,tab:'att',edit:null,askDel:-1};
const nid=()=>S.next++;
const mkG=(n,c)=>({id:nid(),n,c,f:fg(c),s:0});
const mkWs=(name,g,names,cls)=>({id:nid(),name,g,st:names.map((n,i)=>({id:nid(),n,c:cls[i%cls.length],g:g[i%g.length].id})),att:{},home:{},out:{},log:[],hist:[],rand:{n:2,skip:false,res:null,used:[]},due:'14:15',dueOn:true,lim:0,max:0,ban:false,sort:'name'});
function seed(){S.ws=[mkWs('PFT',[mkG('Matthew','#da4453'),mkG('Mark','#f5c211'),mkG('Luke','#27ae60'),mkG('John','#1d99f3')],['Aiden Brooks','Bella Nguyen','Caleb Tan','Daisy Wong','Ethan Lim','Fiona Reyes','Gabriel Ong','Hannah Lee','Isaac Chua','Jade Patel','Kai Santos','Lily Ramos','Micah Yeo','Nora Fernandez','Owen Gomez','Priya Nair'],['5A','5B','6A']),
  mkWs('NS Cup',[mkG('Crimson','#c0392b'),mkG('Navy','#2c5aa0'),mkG('Emerald','#1e9e6a')],['Amir Hassan','Beth Collins','Chen Wei','Dina Park','Eli Moreau','Farah Khan','Gus Lindqvist','Hana Sato'],['7A','7B'])]}
const WF=['st','g','att','home','out','log','hist','rand','due','dueOn','lim','max','ban','sort'];
const saveWs=()=>WF.forEach(k=>S.ws[S.cur][k]=S[k]);
const loadWs=i=>{S.cur=i;WF.forEach(k=>S[k]=S.ws[i][k])};
/* time helpers: everything is stored as epoch milliseconds */
function dkey(ms){const d=new Date(ms==null?Date.now():ms);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
const keyDate=k=>{const[y,m,d]=k.split('-').map(Number);return new Date(y,m-1,d)};
const fmt=(ms,sec)=>new Date(ms).toLocaleTimeString(LOC[S.lang],{hour:'numeric',minute:'2-digit',...(sec?{second:'2-digit'}:{})});
const mmss=s=>{s=Math.abs(Math.floor(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const dueMs=()=>{const[h,m]=S.due.split(':').map(Number),d=new Date();d.setHours(h,m,0,0);return d.getTime()};
const secs=ms=>(Date.now()-ms)/1000;
function dateLabel(k,noRel){return (k===dkey()&&!noRel?tr('Today')+' · ':'')+keyDate(k).toLocaleDateString(LOC[S.lang],{weekday:'short',month:'short',day:'numeric',year:'numeric'})}
const st=id=>S.st.find(s=>s.id==id);
const gp=id=>S.g.find(x=>x.id==id)||{n:tr('No group'),c:'#8a8f94',f:'#fff'};
const gi=id=>S.g.findIndex(x=>x.id==id);
const isP=id=>!!(S.att[dkey()]||{})[id];
const isH=id=>!!(S.home[dkey()]||{})[id];
const recOf=o=>S.log.find(r=>r.id===o.rid);
function setHtml(el,h){if(el._h===h)return;const y=el.scrollTop;el.innerHTML=h;el._h=h;el.scrollTop=y}
function toast(m){const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2800)}
const noteTxt=r=>r.notes.map(x=>tr(...x)).join(', ');
/* native helpers (safe no-ops in a plain browser) */
async function notify(title,body){try{const N=T&&T.notification;if(!N)return;let ok=await N.isPermissionGranted();if(!ok)ok=(await N.requestPermission())==='granted';if(ok)N.sendNotification({title,body})}catch(e){}}
function beep(){try{const c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.frequency.value=880;g.gain.value=.15;o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.4)}catch(e){}}
function attention(){try{T.window.getCurrentWindow().requestUserAttention(2)}catch(e){}}
const store={async load(){return T?T.core.invoke('load_data'):localStorage.getItem('pft-desk')},async save(j){if(T)await T.core.invoke('save_data',{json:j});else localStorage.setItem('pft-desk',j)}};
const snapshot=()=>{saveWs();return JSON.stringify({v:1,lang:S.lang,sound:S.sound,notif:S.notif,cur:S.cur,next:S.next,ws:S.ws})};
let lastSaved='';
async function flush(){const j=snapshot();if(j===lastSaved)return;try{await store.save(j);lastSaved=j;$('saved').textContent='✓ '+tr('All changes saved')}catch(e){$('saved').textContent=tr('Could not save data')}}
/* floating menu */
function menu(ev,items){ev.stopPropagation();const m=$('pmenu'),w=$('win').getBoundingClientRect(),b=ev.currentTarget.getBoundingClientRect();
  m.innerHTML=items.map(i=>`<button ${i.d?'disabled':''} onclick="closeMenu();${i.f}"><b>${i.t}</b>${i.s?`<small>${i.s}</small>`:''}</button>`).join('');
  m.classList.add('on');const x=b.right-w.left-m.offsetWidth;let y=b.bottom-w.top+4;if(y+m.offsetHeight>w.height-8)y=b.top-w.top-m.offsetHeight-4;
  m.style.left=Math.max(8,x)+'px';m.style.top=Math.max(8,y)+'px'}
function closeMenu(){$('pmenu').classList.remove('on')}
document.addEventListener('click',closeMenu);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='f'){e.preventDefault();showTab('att');const q=$('q');q.focus();q.select()}});
const full=()=>S.max&&Object.keys(S.out).length>=S.max;
function permMenu(ev,id){const can=isP(id)&&!S.out[id],fl=full();menu(ev,[{t:tr('Timer'),s:fl?tr('Limit reached ({0} out)',S.max):tr('Bathroom, errands…'),d:!can||fl,f:`goOut(${id},true)`},{t:tr('No timer'),s:tr('Emergencies and other situations'),d:!can,f:`goOut(${id},false)`},{t:tr('Went home'),s:tr('Leaving school for the day'),f:`goHome(${id})`}])}
function extMenu(ev,id){menu(ev,[1,3,5].map(m=>({t:tr('Extend {0} min',m),f:`ext(${id},${m})`})).concat({t:tr('Dismiss alert'),f:`excuse(${id})`}))}
/* rendering */
let Q='';
const nrm=t=>String(t).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function matchQ(s){const q=nrm(Q).trim();if(!q)return true;const hay=nrm(s.n+' '+(s.c||'')+' '+gp(s.g).n);return q.split(/\s+/).every(t=>hay.includes(t))}
function sorted(){const a=[...S.st],nc=(x,y)=>x.n.localeCompare(y.n);
  if(S.sort==='class')a.sort((x,y)=>x.c.localeCompare(y.c,undefined,{numeric:true})||nc(x,y));
  else if(S.sort==='group')a.sort((x,y)=>gi(x.g)-gi(y.g)||nc(x,y));else a.sort(nc);return a}
function renderAtt(){
  let last=null,h='';const day=S.att[dkey()]||{},hm=S.home[dkey()]||{};
  sorted().filter(matchQ).forEach(s=>{const g=gp(s.g),o=S.out[s.id],p=!!day[s.id],ho=hm[s.id],key=S.sort==='class'?(s.c||tr('No class')):S.sort==='group'?g.n:null;
    if(key!==null&&key!==last){last=key;h+=`<div class="grp">${esc(key)}</div>`}
    h+=`<div class="row ${p||ho?'':'abs'}"><input type="checkbox" ${p?'checked':''} onchange="togP(${s.id})" aria-label="${esc(tr('Present: {0}',s.n))}"><div class="av" style="background:${g.c};color:${g.f}">${esc(s.n[0]||'?')}</div><div class="nm">${esc(s.n)}<small>${esc(s.c||tr('No class'))} · ${esc(g.n)}${ho?'':' · '+(p?tr('Arrived {0}',fmt(day[s.id])):tr('not here yet'))}</small></div><div class="act">${o?`<span class="tag out">${tr('Out')}</span>`:''}${ho?`<span class="tag home">${tr('Went home {0}',fmt(ho.t))}</span><button class="sm" onclick="undoHome(${s.id})">${tr('Undo')}</button>`:`<button class="sm" onclick="permMenu(event,${s.id})">${tr('Permission')} ▾</button>`}<button class="sm" onclick="openStu(${s.id})" aria-label="${esc(tr('Edit {0}',s.n))}">${tr('Edit')}</button></div></div>`});
  $('att').innerHTML=h||(Q.trim()&&S.st.length?`<div class="empty">${esc(tr('No students match “{0}”.',Q.trim()))}</div>`:null)||`<div class="empty">${tr('No students in this workspace yet.<br>Use “Add student” or “Import CSV…”.')}</div>`;
  $('attc').textContent=tr('{0} of {1} present',S.st.filter(s=>day[s.id]).length,S.st.length)+(S.st.some(s=>hm[s.id])?' · '+tr('{0} went home',S.st.filter(s=>hm[s.id]).length):'');
  if(Q.trim())$('attc').textContent+=' · '+tr('{0} shown',S.st.filter(matchQ).length);
  renderBanner()}
function renderBanner(){
  const miss=S.st.filter(s=>!isP(s.id)&&!isH(s.id));
  if(S.dueOn&&Date.now()>=dueMs()&&miss.length&&S.ban!==dkey())
    setHtml($('banner'),`<div class="banner" role="alert"><b>${tr('Attendance notice')}</b><span>${esc(tr(miss.length>1?'{0} students are still missing at {1}: {2}.':'{0} student is still missing at {1}: {2}.',miss.length,fmt(dueMs()),miss.map(s=>s.n.split(' ')[0]).join(', ')))}</span><span class="sp"></span><button class="sm" onclick="S.ban=dkey();renderBanner()">${tr('Dismiss')}</button></div>`);
  else setHtml($('banner'),'')}
function renderSc(){
  const sc=S.g.map(g=>g.s),mx=Math.max(1,...sc),top=Math.max(...sc),lead=sc.filter(v=>v===top).length;
  $('sco').innerHTML=S.g.map(g=>`<div class="sc"><div class="h" style="background:${g.c};color:${g.f}"><span>${esc(g.n)}</span><span>${g.s>0&&g.s===top?tr(lead>1?'Tied':'Leading'):''}</span></div><div class="b"><div class="big">${g.s}</div><div class="btns"><button onclick="add(${g.id},-1)">−1</button><button onclick="add(${g.id},1)">+1</button><button onclick="add(${g.id},5)">+5</button><button onclick="add(${g.id},10)">+10</button></div><div class="bar"><i style="width:${Math.max(0,g.s)/mx*100}%;background:${g.c}"></i></div></div></div>`).join('')||`<div class="empty">${tr('No groups yet. Use “Groups…” to add one.')}</div>`;
  $('lead').textContent=tr('Total {0} pts',sc.reduce((a,b)=>a+b,0));
  $('hc').textContent=S.hist.length||'';$('undoBtn').disabled=!S.hist.length;
  $('hist').innerHTML=S.hist.length?[...S.hist].reverse().slice(0,80).map(h=>{
    if(h.k==='reset')return `<div class="row"><span class="tag">${fmt(h.t,true)}</span><div class="nm">${tr('All scores reset')}</div></div>`;
    const g=gp(h.g);return `<div class="row"><span class="tag">${fmt(h.t,true)}</span><div class="nm"><span class="dot" style="background:${g.c}"></span>${esc(g.n)}</div><b>${h.d>0?'+':''}${h.d}</b><span class="tag">${h.tot}</span></div>`}).join(''):`<div class="empty">${tr('No score changes yet.')}</div>`}
let sig='';
function renderToi(){
  const ids=Object.keys(S.out);$('outc').textContent=S.max?ids.length+' / '+S.max:ids.length?tr('{0} out',ids.length):'';
  const ns=JSON.stringify(ids.map(i=>[i,S.out[i].lim,S.out[i].timer]));
  if(ns!==sig){sig=ns;
    $('toi').innerHTML=ids.length?ids.map(id=>{const o=S.out[id],s=st(id);if(!s)return '';const g=gp(s.g);
      const opts=[...new Set([0,3,5,10,15,o.lim/60])].sort((a,b)=>a-b).map(m=>`<option value="${m}" ${m*60===o.lim?'selected':''}>${m?tr('{0} min',m):tr('None')}</option>`).join('');
      const ctl=o.timer?`<label class="al">${tr('Alert at')} <select onchange="setLim(${id},+this.value)">${opts}</select></label>${o.lim?`<button class="sm" onclick="extMenu(event,${id})">${tr('Extend timer or dismiss alert')} ▾</button>`:''}`:'';
      return `<div class="trow" id="t${id}"><div class="top"><div class="av" style="background:${g.c};color:${g.f}">${esc(s.n[0])}</div><div class="nm">${esc(s.n)}<small id="lb${id}"></small></div><div class="cd" id="cd${id}"></div></div>${o.lim?`<div class="prog"><i id="pg${id}"></i></div>`:''}<div class="btns">${ctl}<button class="sm" onclick="back(${id})">${tr('Back in class')}</button></div></div>`}).join(''):`<div class="empty">${tr('Nobody is out.<br>Use “Permission” on a present student to give them a break.')}</div>`}
  ids.forEach(id=>{const o=S.out[id],e=secs(o.start),late=o.lim&&e>o.lim,row=$('t'+id);if(!row)return;
    row.classList.toggle('late',!!late);
    if(!o.timer){$('lb'+id).textContent=tr('Out · no timer');return}
    $('cd'+id).textContent=mmss(e);
    $('lb'+id).textContent=o.lim?(late?tr('Over the limit by {0}',mmss(e-o.lim)):tr('Alert set for {0}',mmss(o.lim))):tr('Out with permission · no alert');
    const p=$('pg'+id);if(p)p.style.width=Math.min(100,e/o.lim*100)+'%'})}
function renderLog(){const L=[...S.log].sort((a,b)=>a.day<b.day?1:a.day>b.day?-1:b.start-a.start);$('logc').textContent=tr(L.length==1?'{0} entry':'{0} entries',L.length);
  let last=null,h='';
  L.forEach(r=>{if(r.day!==last){last=r.day;const rs=L.filter(x=>x.day===r.day),f=rs.filter(x=>x.end!=null).length;
    h+=`<div class="grp dg"><span>${dateLabel(r.day)} · ${rs.length}</span><button class="sm" ${f?'':'disabled'} onclick="clearDay('${r.day}')">${tr('Clear {0} finished',f)}</button></div>`}
    const g=gp(r.g),d=((r.end==null?Date.now():r.end)-r.start)/1000,nt=r.timer===false;
    h+=`<div class="row"><div class="av" style="background:${g.c};color:${g.f}">${esc(r.n[0])}</div><div class="nm">${esc(r.n)}<small>${fmt(r.start,true)}${r.home?'':' → '+(r.end==null?tr('still out'):fmt(r.end,true))}${r.notes.length?' · '+esc(noteTxt(r)):''}</small></div><span class="tag ${r.home?'home':r.end==null?'out':''}">${r.home?tr('Went home'):nt?tr('No timer'):mmss(d)}</span></div>`});
  setHtml($('log'),h||`<div class="empty">${tr('No permissions yet.<br>Each trip out appears here with its times and any alerts.')}</div>`)}
function renderStats(){
  const dur=r=>((r.end==null?Date.now():r.end)-r.start)/1000,sum=a=>a.reduce((x,y)=>x+y,0);
  const rows=S.st.map(s=>{const L=S.log.filter(r=>r.sid===s.id&&!r.home),T2=L.filter(r=>r.timer!==false),d=T2.map(dur),last=[...L].sort((a,b)=>a.day<b.day?1:a.day>b.day?-1:b.start-a.start)[0];
    return{s,k:L.length,tot:sum(d),avg:d.length?sum(d)/d.length:0,mx:Math.max(0,...d),al:L.filter(r=>r.notes.some(x=>x[0]==='Alert reached at {0}')).length,nt:L.length-T2.length,td:d.length,last}}).sort((a,b)=>b.k-a.k||a.s.n.localeCompare(b.s.n));
  $('stc').textContent=tr('{0} trips · {1} timed total',S.log.filter(r=>!r.home).length,mmss(sum(S.log.filter(r=>!r.home&&r.timer!==false).map(dur))));
  setHtml($('stb'),rows.map(r=>{const g=gp(r.s.g),m=v=>r.td?mmss(v):'–';
    return `<tr><td><span class="dot" style="background:${g.c}"></span>${esc(r.s.n)}</td><td>${r.k}</td><td>${m(r.tot)}</td><td>${m(r.avg)}</td><td>${m(r.mx)}</td><td>${r.al}</td><td>${r.nt}</td><td>${r.last?keyDate(r.last.day).toLocaleDateString(LOC[S.lang],{month:'short',day:'numeric'})+' '+fmt(r.last.start):'–'}</td></tr>`}).join('')||`<tr><td colspan="8" class="empty">${tr('No students yet')}</td></tr>`)}
function badges(){const n=Object.keys(S.out).length,late=Object.values(S.out).some(o=>o.lim&&secs(o.start)>o.lim),a=S.st.filter(s=>!isP(s.id)&&!isH(s.id)).length,set=(i,v)=>$('bd-'+i).textContent=v||'';set('att',a);set('toi',n);set('log',S.log.length);$('bd-toi').classList.toggle('hot',late)}
function marks(){[...$('wsSel').options].forEach((o,i)=>{const w=S.ws[i];if(!w)return;const n=Object.keys(w.out).length,late=Object.values(w.out).some(x=>x.lim&&secs(x.start)>x.lim);o.textContent=w.name+(late?' '+tr('⚠ alert'):n?' · '+tr('{0} out',n):'')})}
function live(){
  saveWs();$('clock').textContent=dateLabel(dkey(),1)+', '+fmt(Date.now(),true);$('due').textContent=S.dueOn?fmt(dueMs()):tr('Off');
  renderToi();renderBanner();checkAlert();badges();renderLog();renderStats();marks();randInfo()}
/* alerts: scan every workspace so a timer in a hidden workspace still notifies */
function scan(){saveWs();S.ws.forEach(w=>Object.entries(w.out).forEach(([id,o])=>{
  if(o.lim&&secs(o.start)>=o.lim&&o.fired!==o.lim){o.fired=o.lim;const r=w.log.find(x=>x.id===o.rid);if(r)r.notes.push(['Alert reached at {0}',mmss(o.lim)]);
    const s=w.st.find(x=>x.id==id);if(S.notif)notify('PFT Desk — '+w.name,tr('{0} has been out longer than the alert time',s?s.n:''));if(S.sound)beep();attention()}}))}
function checkAlert(){
  const id=Object.keys(S.out).find(i=>{const o=S.out[i];return o.lim&&secs(o.start)>=o.lim});
  const ov=$('alertOv');
  if(id===undefined){ov.classList.remove('on');delete ov.dataset.id;return}
  const o=S.out[id],s=st(id);if(!s)return;
  $('ab').textContent=tr('Out for {0}, alert was set for {1}.',mmss(secs(o.start)),mmss(o.lim));
  if(ov.dataset.id===id&&ov.classList.contains('on'))return;
  ov.dataset.id=id;$('at').textContent=tr('{0} has been out longer than the alert time',s.n);
  $('af').innerHTML=`<button class="pri" onclick="extMenu(event,${id})">${tr('Extend timer or dismiss alert')} ▾</button><button onclick="back(${id})">${tr('Back in class')}</button>`;
  ov.classList.add('on')}
/* Android: JS timers pause in the background, so alerts are also scheduled as native notifications */
function unsched(rid){if(!mobile||!T)return;try{T.notification.cancel([rid])}catch(e){}}
function schedAlert(id){const o=S.out[id];if(!mobile||!T||!S.notif||!o||!o.lim)return;unsched(o.rid);try{const N=T.notification;N.sendNotification({id:o.rid,title:'PFT Desk — '+S.ws[S.cur].name,body:tr('{0} has been out longer than the alert time',st(id).n),schedule:N.Schedule.at(new Date(o.start+o.lim*1000),false,true)})}catch(e){}}
function closeOut(id,note){const o=S.out[id];if(!o)return;unsched(o.rid);const r=recOf(o);if(r){r.end=Date.now();if(note)r.notes.push([note])}delete S.out[id]}
function showTab(k){S.tab=k;document.querySelectorAll('[data-tab]').forEach(b=>b.classList.toggle('on',b.dataset.tab===k));document.querySelectorAll('.pane').forEach(p=>p.classList.toggle('on',p.id==='pane-'+k))}
/* actions */
function goHome(id){const s=st(id),k=dkey();closeOut(id,'Went home');if(S.att[k])delete S.att[k][id];const rec={id:nid(),sid:id,n:s.n,g:s.g,day:k,start:Date.now(),end:Date.now(),home:true,notes:[]};S.log.push(rec);S.home[k]=S.home[k]||{};S.home[k][id]={t:rec.start,rid:rec.id};S.ban=false;renderAtt();live();toast(tr('{0} went home',s.n))}
function clearHome(id){const k=dkey(),x=(S.home[k]||{})[id];if(!x)return;S.log=S.log.filter(r=>r.id!==x.rid);delete S.home[k][id]}
function undoHome(id){clearHome(id);renderAtt();live();toast(tr('Went home status removed for {0}',st(id).n))}
function togP(id){const k=dkey();S.att[k]=S.att[k]||{};if(isH(id)){clearHome(id);S.att[k][id]=Date.now()}else if(S.att[k][id]){delete S.att[k][id];closeOut(id,'Marked absent')}else S.att[k][id]=Date.now();S.ban=false;renderAtt();live()}
function allPresent(){const k=dkey();S.att[k]=S.att[k]||{};S.st.forEach(s=>{if(!S.att[k][s.id]&&!isH(s.id))S.att[k][s.id]=Date.now()});renderAtt();live();toast(tr('Everyone marked present'))}
function resetAtt(){S.att[dkey()]={};S.st.forEach(s=>clearHome(s.id));Object.keys(S.out).forEach(i=>closeOut(i,'Attendance cleared'));S.ban=false;renderAtt();live()}
function add(id,v){const g=gp(id);g.s+=v;S.hist.push({k:'add',g:id,d:v,tot:g.s,t:Date.now()});renderSc()}
function resetScores(){S.hist.push({k:'reset',prev:S.g.map(g=>[g.id,g.s]),t:Date.now()});S.g.forEach(g=>g.s=0);renderSc();toast(tr('Scores reset for a new session'))}
function undoScore(){const h=S.hist.pop();if(!h){toast(tr('Nothing to undo'));return}
  if(h.k==='add'){const g=S.g.find(x=>x.id==h.g);if(g)g.s-=h.d}else h.prev.forEach(([id,s])=>{const g=S.g.find(x=>x.id==id);if(g)g.s=s});
  renderSc();toast(tr('Score change undone'))}
function goOut(id,timer){
  if(timer&&full()){toast(tr('Limit of {0} students out at once reached',S.max));return}
  const s0=st(id),rec={id:nid(),sid:id,n:s0.n,g:s0.g,day:dkey(),start:Date.now(),end:null,timer,notes:[]};S.log.push(rec);
  S.out[id]={start:rec.start,lim:timer?S.lim*60:0,timer,rid:rec.id};schedAlert(id);renderAtt();live();toast(tr('{0} has permission to leave',s0.n))}
function setLim(id,m){S.out[id].lim=m*60;schedAlert(id);live()}
function ext(id,m){const o=S.out[id];o.lim=(o.lim||secs(o.start))+m*60;recOf(o).notes.push(['Extended {0} min',m]);schedAlert(id);live();toast(tr('Alert for {0} moved back {1} min',st(id).n,m))}
function back(id){const n=st(id).n;closeOut(id,'');renderAtt();live();toast(tr('{0} is back in class',n))}
function excuse(id){const o=S.out[id];o.lim=0;unsched(o.rid);recOf(o).notes.push(['Alert dismissed']);live();toast(tr('Alert dismissed for {0}',st(id).n))}
function logCsv(){const q=v=>'"'+String(v).replace(/"/g,'""')+'"';
  return 'student,date,left,back,minutes,notes\r\n'+S.log.map(r=>[r.n,dateLabel(r.day,1),fmt(r.start,true),r.end==null||r.home?'':fmt(r.end,true),r.timer===false||r.home?'':Math.floor(((r.end==null?Date.now():r.end)-r.start)/60000),noteTxt(r)].map(q).join(',')).join('\r\n')}
async function exportLog(){
  try{if(T&&!mobile){const path=await T.dialog.save({defaultPath:'pft-permission-log.csv',filters:[{name:'CSV',extensions:['csv']}]});if(!path)return;await T.core.invoke('write_text_file',{path,contents:'\uFEFF'+logCsv()})}else await navigator.clipboard.writeText(logCsv());
    toast(tr(mobile?'Log copied as CSV':'Log exported'))}catch(e){toast(tr('Could not export the log'))}}
function clearLog(){S.log=S.log.filter(r=>r.end==null);renderLog();badges();toast(tr('Finished entries cleared'))}
function clearDay(d){S.log=S.log.filter(r=>!(r.day===d&&r.end!=null));renderLog();badges();toast(tr('Cleared finished entries for {0}',dateLabel(d,1)))}
/* students */
const gopts=sel=>S.g.map(g=>`<option value="${g.id}" ${g.id===sel?'selected':''}>${esc(g.n)}</option>`).join('');
function openStu(id){
  if(!S.g.length){toast(tr('Add a group first'));return}
  S.edit=id;const s=id?st(id):{n:'',c:'',g:S.g[0].id};
  $('stt').textContent=tr(id?'Edit student':'Add student');
  $('sform').innerHTML=`<label for="sn">${tr('Name')}</label><input type="text" id="sn" value="${esc(s.n)}" maxlength="40"><label for="sc">${tr('Class')}</label><input type="text" id="sc" value="${esc(s.c)}" maxlength="12" placeholder="${tr('e.g. 5A')}"><label for="sg">${tr('Group')}</label><select id="sg">${gopts(s.g)}</select>`;
  $('sdel').style.display=id?'':'none';$('stuOv').classList.add('on');$('sn').focus()}
function saveStu(){
  const n=$('sn').value.trim();if(!n){toast(tr('Enter a name first'));return}
  const d={n,c:$('sc').value.trim(),g:+$('sg').value};
  if(S.edit)Object.assign(st(S.edit),d);else S.st.push({id:nid(),...d});
  $('stuOv').classList.remove('on');renderAtt();live();toast(tr(S.edit?'Saved {0}':'Added {0}',n))}
function delStu(){const s=st(S.edit);S.st=S.st.filter(x=>x.id!==s.id);closeOut(s.id,'Student removed');Object.values(S.att).forEach(d=>delete d[s.id]);Object.values(S.home).forEach(d=>delete d[s.id]);$('stuOv').classList.remove('on');renderAtt();live();toast(tr('Removed {0}',s.n))}
function parseCSV(t){const rows=[];let r=[],f='',q=false;t=t.replace(/^\uFEFF/,'');for(let i=0;i<t.length;i++){const c=t[i];
  if(q){if(c=='"'){if(t[i+1]=='"'){f+='"';i++}else q=false}else f+=c}
  else if(c=='"')q=true;else if(c==',')r.push(f),f='';
  else if(c=='\n'||c=='\r'){if(c=='\r'&&t[i+1]=='\n')i++;r.push(f);rows.push(r);r=[];f=''}else f+=c}
  r.push(f);rows.push(r);return rows.filter(r=>r.some(x=>x.trim()))}
function openImp(){$('imt').value='';$('imf').value='';$('impOv').classList.add('on')}
function readFile(inp){const f=inp.files[0];if(!f)return;const r=new FileReader();r.onload=()=>$('imt').value=r.result;r.readAsText(f)}
function doImport(){
  let rows=parseCSV($('imt').value);if(!rows.length){toast(tr('Choose a file or paste some rows first'));return}
  if(/^(student|name|nama|姓名)/i.test(rows[0][0].trim()))rows.shift();
  const list=[];let made=0;rows.forEach(r=>{const n=(r[0]||'').trim();if(!n)return;
    const raw=(r[2]||'').trim(),gv=raw.toLowerCase();let g=S.g.find(x=>x.n.toLowerCase()===gv);
    if(!g&&/^\d+$/.test(gv))g=S.g[+gv-1];
    if(!g&&raw){g=mkG(raw,PAL[S.g.length%PAL.length]);S.g.push(g);made++}
    if(!g){if(!S.g.length){g=mkG(tr('Group {0}',1),PAL[0]);S.g.push(g);made++}else g=S.g[list.length%S.g.length]}
    list.push({id:nid(),n,c:(r[1]||'').trim(),g:g.id})});
  if(!list.length){toast(tr('No student names found'));return}
  if($('imr').checked){Object.keys(S.out).forEach(i=>closeOut(i,'List replaced'));S.st=[]}
  S.st.push(...list);$('impOv').classList.remove('on');renderAtt();renderSc();live();toast(tr('Imported {0} students',list.length)+(made?' · '+tr('{0} new groups created',made):''))}
/* settings, groups, workspaces, about */
function openSet(){
  const ck=(id,v,l)=>`<label for="${id}"></label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="${id}" ${v?'checked':''}> ${l}</label>`;
  $('form').innerHTML=`<label for="so">${tr('Late notice')}</label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="so" ${S.dueOn?'checked':''} onchange="$('sd').disabled=!this.checked"> ${tr('Warn if students aren’t marked present')}</label><label for="sd">${tr('Attendance due by')}</label><input type="time" id="sd" value="${S.due}" ${S.dueOn?'':'disabled'}><label for="sm">${tr('Default alert for timed permissions (min, 0 = none)')}</label><input type="number" id="sm" min="0" max="60" value="${S.lim}"><label for="sx">${tr('Max students out at once (0 = no limit)')}</label><input type="number" id="sx" min="0" max="50" value="${S.max}">${ck('sn1',S.notif,tr('Desktop notifications'))}${ck('ss1',S.sound,tr('Sound on alerts'))}<label for="sl">${tr('Language')}</label><select id="sl"><option value="en" ${S.lang=='en'?'selected':''}>English</option><option value="id" ${S.lang=='id'?'selected':''}>Bahasa Indonesia</option><option value="zh" ${S.lang=='zh'?'selected':''}>中文</option></select>`;
  $('setOv').classList.add('on')}
function closeSet(){$('setOv').classList.remove('on')}
function saveSet(){S.dueOn=$('so').checked;S.due=$('sd').value||S.due;S.lim=Math.max(0,+$('sm').value||0);S.max=Math.max(0,+$('sx').value||0);S.notif=$('sn1').checked;S.sound=$('ss1').checked;S.ban=false;
  const l=$('sl').value;closeSet();if(l!==S.lang){S.lang=l;document.documentElement.lang=l;trStatic();afterWs()}else{renderAtt();renderToi();live()}
  toast(tr('Settings applied to {0}',S.ws[S.cur].name));flush()}
const grow=(id,n,c,k)=>`<div class="grow" data-id="${id}"><input type="color" value="${c}" aria-label="${tr('Colour')}"><input type="text" value="${esc(n)}" maxlength="16" aria-label="${tr('Group name')}"><span class="tag">${tr(k==1?'{0} student':'{0} students',k)}</span><button class="sm" onclick="this.parentNode.remove()">${tr('Delete')}</button></div>`;
function openGrp(){$('grows').innerHTML=S.g.map(g=>grow(g.id,g.n,g.c,S.st.filter(s=>s.g===g.id).length)).join('');$('grpOv').classList.add('on')}
function addGrow(){const n=$('grows').children.length;$('grows').insertAdjacentHTML('beforeend',grow('new',tr('Group {0}',n+1),PAL[n%PAL.length],0))}
function saveGrp(){const rows=[...$('grows').children];if(!rows.length){toast(tr('Keep at least one group'));return}
  const ng=rows.map(r=>{const[c,t]=r.querySelectorAll('input'),o=S.g.find(x=>x.id==r.dataset.id),n=t.value.trim()||tr('Group');return o?Object.assign(o,{n,c:c.value,f:fg(c.value)}):mkG(n,c.value)});
  S.g=ng;const keep=new Set(ng.map(x=>x.id));let moved=0;S.st.forEach(s=>{if(!keep.has(s.g)){s.g=ng[0].id;moved++}});
  $('grpOv').classList.remove('on');afterWs();toast(moved?tr('Groups saved · {0} moved to {1}',moved,ng[0].n):tr('Groups saved'))}
function titles(){$('wsSel').innerHTML=S.ws.map((w,i)=>`<option value="${i}" ${i===S.cur?'selected':''}>${esc(w.name)}</option>`).join('');$('wtitle').textContent='PFT Desk — '+S.ws[S.cur].name;marks()}
function afterWs(){sig='';delete $('log')._h;delete $('stb')._h;const o=$('alertOv');o.classList.remove('on');delete o.dataset.id;closeMenu();titles();$('sortSel').value=S.sort;renderAtt();renderSc();renderRand();live()}
function switchWs(i){if(i===S.cur)return;saveWs();loadWs(i);afterWs();toast(tr('Switched to {0}',S.ws[i].name))}
function openWs(){S.askDel=-1;renderWs();$('wsOv').classList.add('on')}
function closeWs(){S.askDel=-1;$('wsOv').classList.remove('on')}
function renderWs(){saveWs();$('wrows').innerHTML=S.ws.map((w,i)=>`<div class="grow"><input type="text" value="${esc(w.name)}" maxlength="24" aria-label="${tr('Workspace name')}" onchange="renameWs(${i},this.value)"><span class="tag">${tr(w.st.length==1?'{0} student':'{0} students',w.st.length)}</span>${i===S.cur?`<span class="tag out">${tr('Open')}</span>`:`<button class="sm" onclick="switchWs(${i});closeWs()">${tr('Open')}</button>`}<button class="sm" ${S.ws.length<2?'disabled':''} onclick="delWs(${i})" ${S.askDel===i?'style="background:var(--neg);color:#fff"':''}>${tr(S.askDel===i?'Confirm delete':'Delete')}</button></div>`).join('')}
function renameWs(i,v){S.ws[i].name=v.trim()||S.ws[i].name;titles()}
function addWs(){saveWs();S.ws.push(mkWs(tr('Workspace {0}',S.ws.length+1),[mkG('Team A',PAL[0]),mkG('Team B',PAL[3])],[],['-']));titles();renderWs();toast(tr('Workspace added. Press Open to switch to it.'))}
function delWs(i){if(S.ws.length<2)return;if(S.askDel!==i){S.askDel=i;renderWs();return}
  S.askDel=-1;const nm=S.ws[i].name;
  if(i===S.cur){S.ws.splice(i,1);loadWs(Math.min(i,S.ws.length-1));afterWs()}else{saveWs();S.ws.splice(i,1);if(i<S.cur)S.cur--;titles()}
  renderWs();toast(tr('Deleted workspace {0}',nm))}
function moreMenu(ev){menu(ev,[['Mark all present','allPresent()'],['Clear attendance','resetAtt()'],['Reset scores','resetScores()'],['Workspaces','openWs()'],['Groups…','openGrp()'],['Settings…','openSet()'],['About…','openAbout()']].map(([k,f])=>({t:tr(k),f})))}
/* randomizer */
function randElig(){const r=S.rand;return S.st.filter(s=>isP(s.id)&&!S.out[s.id]&&!(r.skip&&r.used.includes(s.id)))}
function randInfo(){const r=S.rand;$('rinfo').textContent=tr('{0} available to pick',randElig().length)+(r.used.length?' · '+tr('{0} already picked',r.used.length):'')}
function randOpt(){S.rand.n=Math.max(1,Math.min(20,+$('rn').value||1));S.rand.skip=$('rs').checked;renderRand()}
function randPick(){randOpt();const r=S.rand;
  r.res=S.g.map(g=>{const pool=randElig().filter(s=>s.g===g.id);for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}return{g:g.id,avail:pool.length,ids:pool.slice(0,r.n).map(s=>s.id)}});
  r.res.forEach(x=>x.ids.forEach(id=>{if(!r.used.includes(id))r.used.push(id)}));
  renderRand();toast(tr('Picked {0} students',r.res.reduce((a,x)=>a+x.ids.length,0)))}
function randClear(){S.rand.res=null;S.rand.used=[];renderRand();toast(tr('Picks cleared'))}
function renderRand(){const r=S.rand;$('rn').value=r.n;$('rs').checked=r.skip;randInfo();
  $('rres').innerHTML=!r.res?`<div class="empty">${tr(S.st.some(s=>isP(s.id))?'Press “Pick students” to choose players.':'Nobody is available to pick. Mark students as present first.')}</div>`:r.res.map(x=>{const g=gp(x.g);
    return `<div class="sc"><div class="h" style="background:${g.c};color:${g.f}"><span>${esc(g.n)}</span><span>${x.ids.length}</span></div><div class="rl">${x.ids.map(id=>{const s=st(id);return s?`<div class="row"><div class="av" style="background:${g.c};color:${g.f}">${esc(s.n[0])}</div><div class="nm">${esc(s.n)}<small>${esc(s.c||tr('No class'))}</small></div></div>`:''}).join('')}${!x.avail?`<div class="note">${tr('No one available')}</div>`:x.ids.length<r.n?`<div class="note">${tr('Only {0} available',x.avail)}</div>`:''}</div></div>`}).join('')}
function openAbout(){$('aboutOv').classList.add('on')}
/* start-up */
let lastDay=dkey();
function tick(){if(dkey()!==lastDay){lastDay=dkey();S.ban=false;renderAtt()}scan();live()}
async function init(){
  let raw=null,bad=false,ok=false;
  try{raw=await store.load()}catch(e){bad=true}
  if(raw){try{const d=JSON.parse(raw);if(d.v!==1||!Array.isArray(d.ws)||!d.ws.length)throw 0;
    S.lang=d.lang||'en';S.sound=d.sound!==false;S.notif=d.notif!==false;S.next=d.next||1;S.ws=d.ws;S.ws.forEach(w=>{w.home=w.home||{};w.rand=w.rand||{n:2,skip:false,res:null,used:[]}});loadWs(Math.min(d.cur||0,d.ws.length-1));ok=true}catch(e){bad=true}}
  if(!ok){seed();loadWs(0)}
  document.documentElement.lang=S.lang;trStatic();afterWs();
  if(bad)toast(tr('Saved data could not be read. A backup copy may exist next to the data file.'));
  lastSaved=ok?snapshot():'';
  if(T)try{$('dpath').textContent=await T.core.invoke('data_location')}catch(e){}else $('dpath').textContent='(browser storage)';
  setInterval(tick,1000);setInterval(flush,1000);
  if(T&&S.notif)try{const N=T.notification;if(!(await N.isPermissionGranted()))await N.requestPermission()}catch(e){}}
init();

/* AFC thankful board design preview. Client side only: localStorage + BroadcastChannel. No network calls. */
(function(){
  var KEY='afc-thankful-notes-v2', TKEY='afc-thankful-theme-v1';
  var THEMES={
    turkey:{id:'turkey',month:'November',name:'Thankful turkey',unit:'feather',units:'feathers',question:'Why are you thankful for chiropractic?',live:true},
    ornaments:{id:'ornaments',month:'December',name:'Winter ornaments',unit:'ornament',units:'ornaments',question:'What brings you joy this winter?',live:false},
    hearts:{id:'hearts',month:'February',name:'Valentine hearts',unit:'heart',units:'hearts',question:'What do you love about your visits?',live:false}
  };
  function seed(){
    var t=Date.now();
    return [
      {id:'s1',type:'text',text:'Sample: The friendly team every visit',status:'pending',sample:true,ts:t-500000},
      {id:'s2',type:'text',text:'Sample: Feeling cared for',status:'pending',sample:true,ts:t-400000},
      {id:'s3',type:'text',text:'Sample: A welcoming front desk that knows my family',status:'pending',sample:true,ts:t-300000},
      {id:'s4',type:'text',text:'Sample: Time set aside just for me',status:'pending',sample:true,ts:t-200000},
      {id:'s5',type:'text',text:'Sample: Kind people and a calm office',status:'pending',sample:true,ts:t-100000},
      {id:'s6',type:'text',text:'Sample: Being listened to',status:'pending',sample:true,ts:t-50000}
    ];
  }
  var ch=null; try{ch=new BroadcastChannel('afc-thankful');}catch(e){}
  var listeners=[];
  function notify(){listeners.forEach(function(f){f();});}
  function load(){
    var raw=localStorage.getItem(KEY);
    if(!raw){var s=seed();localStorage.setItem(KEY,JSON.stringify(s));return s;}
    try{return JSON.parse(raw);}catch(e){return seed();}
  }
  function save(list){localStorage.setItem(KEY,JSON.stringify(list));if(ch)ch.postMessage('changed');notify();}
  if(ch)ch.onmessage=notify;
  window.addEventListener('storage',function(e){if(e.key===KEY||e.key===TKEY)notify();});
  window.AFC={
    THEMES:THEMES,
    all:load,
    add:function(note){var l=load();note.id='n'+Date.now()+Math.floor(Math.random()*1000);note.status='pending';note.sample=false;note.ts=Date.now();l.push(note);save(l);return note;},
    update:function(id,patch){var l=load();l.forEach(function(n){if(n.id===id){for(var k in patch)n[k]=patch[k];}});save(l);},
    reset:function(){localStorage.removeItem(KEY);localStorage.removeItem(TKEY);load();if(ch)ch.postMessage('changed');notify();},
    theme:function(){return THEMES[localStorage.getItem(TKEY)]||THEMES.turkey;},
    setTheme:function(id){localStorage.setItem(TKEY,id);if(ch)ch.postMessage('changed');notify();},
    onChange:function(f){listeners.push(f);},
    esc:function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  };
})();

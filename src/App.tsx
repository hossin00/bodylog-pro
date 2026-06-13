import { useState } from 'react';
import { Activity, Plus, TrendingUp, X } from 'lucide-react';
const C='#14b8a6';
interface Log { id:string; date:string; weight:number; waist:number; chest:number; hips:number; notes:string; }
const SK='bl_logs_v1';
const ld=():Log[]=>{try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}};
export default function App() {
  const [logs,setLogs]=useState<Log[]>(ld);
  const [showAdd,setShowAdd]=useState(false);
  const [form,setForm]=useState({date:new Date().toISOString().split('T')[0],weight:'',waist:'',chest:'',hips:'',notes:''});
  const sv=(items:Log[])=>{setLogs(items);localStorage.setItem(SK,JSON.stringify(items))};
  const inp={width:'100%',background:'#080c0c',border:`1px solid ${C}20`,borderRadius:'10px',padding:'10px 14px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'};
  const add=()=>{if(!form.weight)return;sv([{id:crypto.randomUUID(),...form,weight:+form.weight,waist:+form.waist||0,chest:+form.chest||0,hips:+form.hips||0},...logs]);setShowAdd(false);};
  const sorted=[...logs].sort((a,b)=>b.date.localeCompare(a.date));
  const first=sorted[sorted.length-1];const last=sorted[0];
  const wDiff=first&&last?last.weight-first.weight:0;
  return (<div style={{minHeight:'100vh',background:'#060c0c',display:'flex',flexDirection:'column'}}>
    <header style={{padding:'16px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`linear-gradient(135deg,${C},#0d9488)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C}30`}}><Activity size={16} color="white"/></div>
        <div><div style={{fontWeight:'700',fontSize:'16px',color:'white',lineHeight:1}}>BodyLog Pro</div>
        <div style={{fontSize:'11px',color:`${C}60`,marginTop:'2px'}}>{logs.length} measurements</div></div>
      </div>
      <button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'9px',background:C,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter',boxShadow:`0 4px 12px ${C}30`}}><Plus size={13}/> Log</button>
    </header>
    {logs.length>=2&&<div style={{margin:'12px 20px',padding:'14px',background:`${C}10`,border:`1px solid ${C}20`,borderRadius:'12px',display:'flex',justifyContent:'space-between'}}>
      <div style={{textAlign:'center'}}><div style={{fontSize:'16px',fontWeight:'700',color:wDiff<=0?'#34d399':'#f87171'}}>{wDiff<=0?'-':'+'}{Math.abs(wDiff).toFixed(1)} kg</div><div style={{fontSize:'10px',color:`${C}60`}}>Weight change</div></div>
      <div style={{textAlign:'center'}}><div style={{fontSize:'16px',fontWeight:'700',color:'white'}}>{last?.weight} kg</div><div style={{fontSize:'10px',color:`${C}60`}}>Current</div></div>
      <div style={{textAlign:'center'}}><div style={{fontSize:'16px',fontWeight:'700',color:`${C}`}}>{sorted.length}</div><div style={{fontSize:'10px',color:`${C}60`}}>Entries</div></div>
    </div>}
    <div style={{flex:1,overflow:'auto',padding:'0 20px 20px'}}>
      {logs.length===0?(<div style={{textAlign:'center',padding:'60px 20px'}}>
        <div style={{fontSize:'52px',marginBottom:'16px'}}>💪</div>
        <h3 style={{fontSize:'20px',fontWeight:'700',color:'white',marginBottom:'8px'}}>Track your body</h3>
        <p style={{color:`${C}60`,fontSize:'14px',lineHeight:'1.6',maxWidth:'240px',margin:'0 auto 24px'}}>Log weight and measurements to see your progress over time.</p>
        <button onClick={()=>setShowAdd(true)} style={{padding:'12px 24px',borderRadius:'10px',background:C,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Log first measurement</button>
      </div>):(<div style={{display:'flex',flexDirection:'column',gap:'8px',marginTop:'12px'}}>
        {sorted.map((l,i)=><div key={l.id} style={{background:`${C}08`,border:`1px solid ${i===0?C:C+'20'}`,borderRadius:'12px',padding:'14px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
            <span style={{color:'white',fontSize:'13px',fontWeight:'500'}}>{l.date}</span>
            <span style={{fontSize:'18px',fontWeight:'700',color:C}}>{l.weight} kg</span>
          </div>
          <div style={{display:'flex',gap:'12px'}}>
            {l.waist>0&&<span style={{color:`${C}60`,fontSize:'11px'}}>Waist: {l.waist}cm</span>}
            {l.chest>0&&<span style={{color:`${C}60`,fontSize:'11px'}}>Chest: {l.chest}cm</span>}
            {l.hips>0&&<span style={{color:`${C}60`,fontSize:'11px'}}>Hips: {l.hips}cm</span>}
          </div>
          {l.notes&&<p style={{color:`${C}50`,fontSize:'12px',marginTop:'5px'}}>{l.notes}</p>}
        </div>)}
      </div>)}
    </div>
    {showAdd&&(<div style={{position:'fixed',inset:0,background:'#00000080',zIndex:50,display:'flex',alignItems:'flex-end'}} onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
      <div style={{width:'100%',background:'#080c0c',borderRadius:'20px 20px 0 0',border:`1px solid ${C}20`,padding:'24px'}}>
        <div style={{width:'36px',height:'3px',background:'#0f1a1a',borderRadius:'2px',margin:'0 auto 20px'}}/>
        <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',fontFamily:'Inter',marginBottom:'14px'}}>Log Measurement</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} style={inp}/>
          <input type="number" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} placeholder="Weight (kg) *" style={inp} autoFocus/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px'}}>
            <input type="number" value={form.waist} onChange={e=>setForm({...form,waist:e.target.value})} placeholder="Waist (cm)" style={inp}/>
            <input type="number" value={form.chest} onChange={e=>setForm({...form,chest:e.target.value})} placeholder="Chest (cm)" style={inp}/>
            <input type="number" value={form.hips} onChange={e=>setForm({...form,hips:e.target.value})} placeholder="Hips (cm)" style={inp}/>
          </div>
          <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Notes (optional)" style={inp}/>
          <button onClick={add} style={{padding:'14px',borderRadius:'12px',background:C,border:'none',color:'white',fontSize:'15px',fontWeight:'700',cursor:'pointer',fontFamily:'Inter'}}>Save</button>
        </div>
      </div>
    </div>)}
  </div>);
}
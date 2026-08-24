import { Bug, ExternalLink, RefreshCw } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { API_BASE_URL } from '../../../config/apiConfig';
import { api } from '../../../services/api';

type Report = { id:number; reporter_name:string; description:string; page_url?:string; screenshot_url?:string; status:string; admin_notes?:string; created_at:string };
const backendOrigin = API_BASE_URL.replace(/\/api\/v1\/?$/, '');

export const BugReportManagement: React.FC = () => {
  const [reports,setReports]=useState<Report[]>([]); const [loading,setLoading]=useState(true); const [notes,setNotes]=useState<Record<number,string>>({});
  const load=useCallback(async()=>{setLoading(true);try{const r=await api.get('/admin/support/bug-reports');setReports(r.data);setNotes(Object.fromEntries(r.data.map((x:Report)=>[x.id,x.admin_notes||''])));}finally{setLoading(false);}},[]);
  useEffect(()=>{load();},[load]);
  const review=async(report:Report,status:string)=>{const data=new FormData();data.append('status',status);data.append('admin_notes',notes[report.id]||'');await api.patch(`/admin/support/bug-reports/${report.id}`,data);await load();};
  return <section className="bug-report-management"><div className="bug-report-toolbar"><span>{reports.length} submitted reports</span><button onClick={load}><RefreshCw size={15}/>Refresh</button></div>{loading?<p>Loading bug reports…</p>:reports.length===0?<div className="admin-empty-state"><Bug size={28}/><h3>No bug reports</h3></div>:<div className="bug-report-list">{reports.map(report=><article key={report.id}><header><div><strong>#{report.id} · {report.reporter_name}</strong><small>{new Date(report.created_at).toLocaleString()}</small></div><span className={`bug-status ${report.status}`}>{report.status.replace('_',' ')}</span></header><p>{report.description}</p>{report.page_url&&<a href={report.page_url} target="_blank" rel="noreferrer"><ExternalLink size={13}/>Reported page</a>}{report.screenshot_url&&<a href={`${backendOrigin}${report.screenshot_url}`} target="_blank" rel="noreferrer"><img src={`${backendOrigin}${report.screenshot_url}`} alt={`Bug report ${report.id} screenshot`}/></a>}<textarea value={notes[report.id]||''} onChange={e=>setNotes({...notes,[report.id]:e.target.value})} placeholder="Administrator review notes"/><div className="bug-review-actions"><button onClick={()=>review(report,'in_review')}>Mark in review</button><button onClick={()=>review(report,'resolved')}>Resolve</button><button onClick={()=>review(report,'closed')}>Close</button></div></article>)}</div>}</section>;
};

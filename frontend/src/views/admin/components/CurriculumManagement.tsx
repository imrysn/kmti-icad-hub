import { Archive, BookOpen, CheckCircle2, Loader2, Plus, Send, Undo2 } from 'lucide-react';
import React from 'react';
import { adminService, CurriculumCourse } from '../../../services/adminService';
import { authService } from '../../../services/authService';
import './CurriculumManagement.css';

const NEXT:Record<CurriculumCourse['lifecycle_status'],Array<{status:CurriculumCourse['lifecycle_status'];label:string;icon:React.ReactNode}>> = {
    draft:[{status:'in_review',label:'Send for review',icon:<Send size={15}/>},{status:'archived',label:'Archive',icon:<Archive size={15}/>}],
    in_review:[{status:'published',label:'Publish',icon:<CheckCircle2 size={15}/>},{status:'draft',label:'Return to draft',icon:<Undo2 size={15}/>}],
    published:[{status:'draft',label:'Return to draft',icon:<Undo2 size={15}/>},{status:'archived',label:'Archive',icon:<Archive size={15}/>}],
    archived:[{status:'draft',label:'Restore draft',icon:<Undo2 size={15}/>}],
};

export const CurriculumManagement:React.FC = () => {
    const [courses,setCourses]=React.useState<CurriculumCourse[]>([]), [loading,setLoading]=React.useState(true), [saving,setSaving]=React.useState(false);
    const [error,setError]=React.useState(''), [reason,setReason]=React.useState('');
    const [canPublish,setCanPublish]=React.useState(false);
    const [form,setForm]=React.useState({title:'',course_type:'',description:''});
    const load=React.useCallback(async()=>{ try{ setCourses(await adminService.getCurriculumCourses()); }catch{ setError('Unable to load courses.'); }finally{ setLoading(false); }},[]);
    React.useEffect(()=>{ load(); authService.getCurrentUserAccess().then(a=>setCanPublish(a.permissions.includes('content.publish'))); },[load]);
    const create=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);setError('');try{await adminService.createCurriculumCourse(form);setForm({title:'',course_type:'',description:''});await load();}catch(err:any){setError(err?.response?.data?.detail||'Course could not be created.');}finally{setSaving(false);}};
    const transition=async(course:CurriculumCourse,status:CurriculumCourse['lifecycle_status'])=>{if(reason.trim().length<3){setError('Enter a reason before changing course status.');return;}setSaving(true);setError('');try{await adminService.changeCourseLifecycle(course.id,status,reason.trim());setReason('');await load();}catch(err:any){setError(err?.response?.data?.detail||'Course status could not be changed.');}finally{setSaving(false);}};
    return <section className="curriculum-management">
        <div className="curriculum-summary"><div><span>COURSE LIFECYCLE</span><h2>Curriculum</h2><p>Create drafts, review course readiness, and publish approved training.</p></div><div className="curriculum-count"><strong>{courses.length}</strong><small>Total courses</small></div></div>
        {error&&<div className="curriculum-error">{error}</div>}
        <form className="curriculum-create" onSubmit={create}><div><h3><Plus size={16}/> New course draft</h3><p>New courses remain hidden from learners until reviewed and published.</p></div><input required minLength={2} placeholder="Course title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><input required pattern="[A-Za-z0-9_-]+" placeholder="Course code (example: icad_basics)" value={form.course_type} onChange={e=>setForm({...form,course_type:e.target.value})}/><input placeholder="Short description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/><button disabled={saving}>{saving?<Loader2 className="spin" size={16}/>:<Plus size={16}/>} Create draft</button></form>
        <div className="curriculum-reason"><label>Reason for status change</label><input value={reason} onChange={e=>setReason(e.target.value)} placeholder="Required for the audit record"/></div>
        {loading?<div className="curriculum-loading"><Loader2 className="spin"/> Loading curriculum…</div>:<div className="curriculum-grid">{courses.map(course=><article key={course.id}><header><BookOpen size={18}/><span className={`course-status ${course.lifecycle_status}`}>{course.lifecycle_status.replace('_',' ')}</span></header><h3>{course.title}</h3><code>{course.course_type}</code><p>{course.description||'No description yet.'}</p><footer>{NEXT[course.lifecycle_status].filter(action=>action.status!=='published'||canPublish).map(action=><button key={action.status} disabled={saving} onClick={()=>transition(course,action.status)}>{action.icon}{action.label}</button>)}</footer></article>)}</div>}
    </section>;
};

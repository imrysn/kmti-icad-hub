import FoundationSaveDialogIcon from './FoundationSaveDialogIcon';
import FoundationFileMenuIcon from './FoundationFileMenuIcon';
import { Menu, Save, FolderOpen, CheckCircle } from 'lucide-react';
import { renderFormattedText } from './WrittenTutorial_EN/WrittenTutorialPanel';
import './FoundationUsesCards.css';
import './FoundationSaveSteps.css';

export default function FoundationSaveSteps({text,saveAs=false,japanese=false}:{text:string;saveAs?:boolean;japanese?:boolean}) {
  const blocks=text.split('\n\n');
  const steps=blocks.filter(block=>/^\*\*(?:Step|ステップ)\s*\d+/.test(block));
  const firstStep=blocks.findIndex(block=>steps.includes(block));
  const intro=blocks.slice(0,firstStep);
  const notes=blocks.slice(firstStep).filter(block=>!steps.includes(block));
  const icons=saveAs?[Save,FolderOpen,CheckCircle]:[Menu,Save];
  return <div className="foundations-uses foundations-uses--aligned foundation-save-steps">
    {intro.map(note=><p key={note}>{renderFormattedText(note)}</p>)}
    <ol className="foundations-uses__grid" data-count={steps.length}>{steps.map((block,index)=>{
      const [heading,...body]=block.split('\n');const Icon=icons[index]||Save;
      return <li className="foundations-use-card" key={heading}>
        <span className="foundations-use-card__number" aria-hidden="true">{index+1}</span>
        <h5 className="foundations-use-card__title">{heading.replace(/\*\*/g,'').replace(/^.*?—\s*/,'')}</h5>
        <div className="foundations-use-card__icon-frame">{saveAs && index === 0 ? <FoundationFileMenuIcon saveAs japanese={japanese}/> : saveAs ? <FoundationSaveDialogIcon saveAs japanese={japanese}/> : !saveAs && index === 0 ? <FoundationFileMenuIcon save japanese={japanese}/> : !saveAs && index === 1 ? <FoundationSaveDialogIcon firstSave japanese={japanese}/> : <Icon className="foundations-use-card__icon" strokeWidth={1.6} aria-hidden="true"/>}</div>
        <div className="foundations-use-card__body"><p>{renderFormattedText(body.join('\n'))}</p></div>
      </li>;
    })}</ol>
    {notes.map(note=><p className="foundation-save-steps__note" key={note}>{renderFormattedText(note)}</p>)}
  </div>;
}

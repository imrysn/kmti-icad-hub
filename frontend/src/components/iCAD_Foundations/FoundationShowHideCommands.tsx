import { useFoundationVisuals } from './FoundationVisualContext';
import InterfaceIconPreview from './InterfaceIconPreview';
import ShowHideIconSvg from './ShowHideIconSvg';
import screen from '../../assets/icad-foundations/show-hide/interface.png';
import './FoundationShowHideCommands.css';
import './FoundationUsesCards.css';

const regions: [number,number,number,number][] = [[1816,212,30,31],[1848,212,30,31],[1752,212,30,31],[1784,212,30,31],[1752,244,30,32]];

export function ShowHideCommandPreview({index,title,japanese}: {index:number;title:string;japanese:boolean}) {
  const singleCommand=useFoundationVisuals();
  return <InterfaceIconPreview index={index} toolbar={false} title={title} japanese={japanese} custom={{artwork:<ShowHideIconSvg index={index} title={title} className={singleCommand ? "foundation-single-command" : undefined}/>,screen,region:{bounds:regions[index],landing:regions[index]}}}/>;
}

export default function FoundationShowHideCommands({text,japanese=false}: {text: string;japanese?:boolean}) {
  return <div className="foundations-uses foundations-uses--aligned foundations-show-hide">
    <ul className="foundations-uses__grid">
      {text.split('\n\n').map((block, index) => {
        const [heading, ...description] = block.split('\n');
        const title = heading.replaceAll('**', '');
        return <li className="foundations-use-card" key={title}>
          <span className="foundations-use-card__number" aria-hidden="true">{index + 1}</span>
          <h5 className="foundations-use-card__title">{title}</h5>
          <div className="foundations-use-card__icon-frame">
            <ShowHideCommandPreview index={index} title={title} japanese={japanese}/>
          </div>
          <div className="foundations-use-card__body"><p>{description.join(' ')}</p></div>
        </li>;
      })}
    </ul>
  </div>;
}

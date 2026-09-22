import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { resolveProfessionalLesson } from '../curriculum';
import { foundationKnowledgeQuestions } from '../../iCAD_Foundations/knowledgeCheck';
import FoundationShowHideSteps from '../../iCAD_Foundations/FoundationShowHideSteps';
import FoundationShowHideCommands from '../../iCAD_Foundations/FoundationShowHideCommands';

afterEach(cleanup);
describe('P11 publication consistency', () => {
  it.each(['en','ja'] as const)('renders each command and procedure once in %s', lang => {
    const overview=resolveProfessionalLesson('P11.1')!.content[lang];
    const {container,unmount}=render(<FoundationShowHideCommands text={overview.sections![0].text} japanese={lang==='ja'}/>);
    expect(container.querySelectorAll('.foundations-use-card')).toHaveLength(5);
    expect(container.querySelectorAll('.foundation-interface-icon-button')).toHaveLength(5);
    expect(container.querySelectorAll('img')).toHaveLength(0);
    unmount();
    for(const [id,section,command,count] of [['P11.2',0,0,2],['P11.2',1,1,3],['P11.3',1,2,2],['P11.3',2,3,2],['P11.4',0,4,3]] as const) {
      const text=resolveProfessionalLesson(id)!.content[lang].sections![section].text;
      const view=render(<FoundationShowHideSteps text={text} command={command} japanese={lang==='ja'}/>);
      expect(view.container.querySelectorAll('.foundations-use-card')).toHaveLength(count);
      expect(view.container.querySelectorAll('.foundation-interface-icon-button')).toHaveLength(1);
      const labels=[...view.container.querySelectorAll('svg[aria-label]')].map(el=>el.getAttribute('aria-label'));
      if(command>=1) expect(labels).toContain(lang==='ja'?'右クリック':'Right-click');
      view.unmount();
    }
  });
  it('keeps the supplied answer keys and fully localized Japanese copy', () => {
    for(const [id,answer] of [['P11.1',2],['P11.2',1],['P11.3',1],['P11.4',2]] as const) {
      const content=JSON.stringify(resolveProfessionalLesson(id)!.content.ja);
      expect(content).not.toMatch(/Show|Hide|pending/);
      for(const lang of ['en','ja'] as const) {
        const [question]=foundationKnowledgeQuestions(lang,id);
        expect(question.choices.findIndex(choice=>choice.isCorrect)).toBe(answer);
        if(lang==='ja') expect(JSON.stringify(question)).not.toMatch(/Show|Hide/);
      }
    }
  });
});

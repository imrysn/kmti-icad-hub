from pathlib import Path
import re
root=Path('frontend/src/components/iCAD_Foundations/__tests__')
for name in ['linearDimension','diameterDimension','angularDimension','notesLeaderLines','characterStrings','editCharacters','changeAttributes','changePosition']:
 p=root/f'{name}.test.tsx';s=p.read_text(encoding='utf-8')
 s=re.sub(r'  // Important [Rr]eminder[^\n]*\n.*?(?=  // Knowledge check)', '  expect(lesson.content[language].sections).toHaveLength('+('2' if name=='changePosition' else '1')+');\n\n',s,flags=re.S)
 s=re.sub(r'  // Step [45]: (?:Final result|Check Final Result)\n.*?(?=  (?:expect\(lesson|// Important))','',s,flags=re.S)
 if name in ['linearDimension','diameterDimension','angularDimension']:s=s.replace('expect(cards).toHaveLength(4)','expect(cards).toHaveLength(3)')
 if name=='characterStrings':s=s.replace('expect(cards).toHaveLength(5)','expect(cards).toHaveLength(4)')
 s=s.replace("language === 'ja' ? '注記ツール' : 'Annotation tools'", "'製図要素編集'")
 if name=='changeAttributes':s=re.sub(r'  // Dimension Lines\n.*?(?=  // Step 4)', '',s,flags=re.S)
 # Icon structure is path-only, with no raster image, font-dependent text, or button background.
 start=s.index("it('renders the clean Step 1")
 end=s.index('\n});',start)
 chunk=s[start:end];chunk=re.sub(r"  expect\(svg\.querySelector.*\n",'',chunk)
 chunk+="  expect(svg.querySelector('path')).toBeInTheDocument();\n  expect(svg.querySelector('rect, image, text')).toBeNull();"
 s=s[:start]+chunk+s[end:];p.write_text(s,encoding='utf-8')

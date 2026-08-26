const fs = require('fs');
let content = fs.readFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', 'utf-8');

// 1. Fix the syntax error around line 312 by replacing the whole block
const scrollReplaceRegex = /  \/\/ Auto-switch tabs as TTS progresses through the narrated tour[\s\S]*?\}, \[currentIndex, isSpeaking\]\);/;
const scrollReplaceContent = `  // Scroll as TTS progresses
  useEffect(() => {
    if (!isSpeaking) return;
    if (currentIndex === 7) {
      setTimeout(() => {
        beforeYouStartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    } else if (currentIndex === 9) {
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [currentIndex, isSpeaking]);`;
content = content.replace(scrollReplaceRegex, scrollReplaceContent);

// 2. Remove the faulty useEffects
const useEffectTabsRegex = /  useEffect\(\(\) => \{\n    if \(\!isSpeaking && wasSpeakingRef\.current\) \{[\s\S]*?\}, \[isSpeaking, activeTab\]\);/g;
content = content.replace(useEffectTabsRegex, '');

// 3. Remove unused useState
content = content.replace(/import React, \{ useState, useEffect, useRef, useMemo \} from 'react';/, 'import React, { useEffect, useRef, useMemo } from \'react\';');

// 4. Remove unused stop
content = content.replace(/stop, isSpeaking, currentIndex, currentCharIndex/g, 'isSpeaking, currentIndex, currentCharIndex');
content = content.replace(/speak, stop, isSpeaking, currentIndex, currentCharIndex/g, 'speak, isSpeaking, currentIndex, currentCharIndex');


fs.writeFileSync('frontend/src/components/3D_Modeling/3D_BasicOperation.tsx', content);
console.log('Fixed TS errors in 3D_BasicOperation.tsx!');

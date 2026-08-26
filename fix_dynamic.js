const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx', 'utf-8');

// 1. Add VideoTutorialViewer import
code = code.replace(/import LessonIntroPanel from \"\.\.\/\.\.\/LessonIntroPanel\";/, 'import VideoTutorialViewer from "../../3D_Modeling/VideoTutorialViewer";');

// 2. Remove isFirstLesson from props interface
code = code.replace(/  isFirstLesson\?: boolean;\r?\n/, '');

// 3. Remove isFirstLesson from component args
code = code.replace(/  isFirstLesson = false,\r?\n/, '');

// 4. Remove activeTab, hasStartedVideo
code = code.replace(/  const \[activeTab\] = useState\(\"content\"\);\r?\n/, '');
code = code.replace(/  const \[hasStartedVideo, setHasStartedVideo\] = useState\(false\);\r?\n/, '');

// 5. Remove setHasStartedVideo(false) inside useEffect
code = code.replace(/    setHasStartedVideo\(false\);\r?\n/, '');

// 6. Update useTTSAutoplay to not use activeTab
code = code.replace(/    activeTab,/, '    "content",');

// 7. Replace the video rendering block
const oldVideoBlockRegex = /              \{\/\* Render Video at the bottom of the lesson \*\/\}[\s\S]*?              \}/;
const newVideoBlock = `              {/* Render Video at the bottom of the lesson */}
              {videoId && videoMap[videoId] && (
                <div className="instruction-step foundations-video-section" style={{ height: '600px', position: 'relative' }}>
                  <VideoTutorialViewer 
                    steps={[{
                      id: '1',
                      title: title,
                      text: '',
                      zoom: '', origin: '', 
                      spotlight: { top: '0', left: '0', width: '0', height: '0', opacity: 0 },
                      subtitlePos: { bottom: '20px' },
                      videoSrc: videoMap[videoId]
                    }]}
                    introPanel={{
                      icon: Play,
                      eyebrow: "Interactive Video",
                      title: "Watch Video Demonstration",
                      description: "See this tool in action in the workspace."
                    }}
                  />
                </div>
              )}`;
code = code.replace(oldVideoBlockRegex, newVideoBlock);

// 8. Conditionally render the Previous button
code = code.replace(/<button className="nav-button" disabled=\{isFirstLesson\}.*?><ChevronLeft size=\{18\} \/> \{t\('common\.previous'\)\}<\/button>/, `{onPrevLesson && (\n              <button className="nav-button" onClick={() => { onPrevLesson(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ChevronLeft size={18} /> {t('common.previous')}</button>\n            )}`);

fs.writeFileSync('frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx', code);
console.log('Fixed DynamicFoundationsLesson.tsx completely!');

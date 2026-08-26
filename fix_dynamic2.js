const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx', 'utf-8');

// 1. Add VideoTutorialViewer import
if (!code.includes('VideoTutorialViewer')) {
    code = code.replace(/import \{ KaraokeLessonText \} from "\.\.\/\.\.\/KaraokeLessonText";/, 'import { KaraokeLessonText } from "../../KaraokeLessonText";\nimport VideoTutorialViewer from "../../3D_Modeling/VideoTutorialViewer";');
}

// 2. Replace the video rendering block
const oldVideoBlockRegex = /              \{\/\* Render Video at the bottom of the lesson \*\/\}[\s\S]*?              \)\}/;
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

fs.writeFileSync('frontend/src/components/PublicCourses/Foundations/DynamicFoundationsLesson.tsx', code);
console.log('Fixed DynamicFoundationsLesson.tsx completely!');

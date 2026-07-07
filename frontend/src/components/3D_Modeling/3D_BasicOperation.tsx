import React from 'react';
import BasicOperation1 from './BasicOperations/BasicOperation1';
import BasicOperation2 from './BasicOperations/BasicOperation2';
import BasicOperation3 from './BasicOperations/BasicOperation3';
import BasicOperation4 from './BasicOperations/BasicOperation4';
import BasicOperation5 from './BasicOperations/BasicOperation5';

interface BasicOperationLessonProps {
  subLessonId: string;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  nextLabel?: string;
}

const BasicOperationLesson: React.FC<BasicOperationLessonProps> = ({ subLessonId, onNextLesson, onPrevLesson, nextLabel }) => {
  switch (subLessonId) {
    case 'basic-op-1':
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-2':
      return <BasicOperation2 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-3':
      return <BasicOperation3 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-4':
      return <BasicOperation4 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    case 'basic-op-5':
      return <BasicOperation5 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
    default:
      return <BasicOperation1 subLessonId={subLessonId} onNextLesson={onNextLesson} onPrevLesson={onPrevLesson} nextLabel={nextLabel} />;
  }
};

export { BasicOperation1, BasicOperation2, BasicOperation3, BasicOperation4, BasicOperation5, BasicOperationLesson };
export default BasicOperationLesson;

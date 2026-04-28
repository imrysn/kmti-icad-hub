import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; import { X, CheckCircle2, AlertCircle, RotateCcw, ChevronRight, Volume2, Trophy, ShieldAlert, ArrowRight } from 'lucide-react';
import { Quiz } from '../mentorConstants'; import { useTTS } from '../../../hooks/useTTS';
import '../../../styles/mentor/QuizModal.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
  onComplete: (score: number, answers?: any[]) => void;
  onSuccessContinue?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ 
  isOpen, 
  onClose, 
  quiz, 
  onComplete,
  onSuccessContinue
}) => {
  const [currentIdx, setCurrentIdx] = useState(0); const [selectedOpt, setSelectedOpt] = useState<number | null>(null); const [answers, setAnswers] = useState<number[]>([]); const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0); const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  
  const { speak, stop } = useTTS();

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswers([]);
    setIsFinished(false);
    setScore(0);
    setIsAnswerChecked(false);
  };

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      resetQuiz();
    }
    return () => stop();
  }, [isOpen, stop]);

  if (!quiz || !quiz.questions) return null;

  const currentQuestion = quiz.questions[currentIdx];
  
  // Normalize question fields (handle both hardcoded and DB versions)
  const qText = currentQuestion.text;
  const qOptions = (currentQuestion as any).options || JSON.parse((currentQuestion as any).options_json || '[]');
  const qCorrect = (currentQuestion as any).correctAnswer !== undefined ? (currentQuestion as any).correctAnswer : (currentQuestion as any).correct_answer;
  const qExplanation = (currentQuestion as any).explanation;

  const progress = (answers.length / quiz.questions.length) * 100;
  const isLastQuestion = currentIdx === quiz.questions.length - 1;

  const handleSelect = (idx: number) => {
    if (!isAnswerChecked) {
      setSelectedOpt(idx);
    }
  };

  const handleAction = () => {
    if (selectedOpt === null) return;

    if (!isAnswerChecked) {
      // Phase 1: Check Answer
      const newAnswers = [...answers, selectedOpt];
      setAnswers(newAnswers);
      setIsAnswerChecked(true);
    } else {
      // Phase 2: Move to Next Question
      if (currentIdx < quiz.questions.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setIsAnswerChecked(false);
      } else {
        // Calculate final score correctly based on all answers
        const correctCount = answers.reduce((acc, ans, idx) => {
          const qIdx = quiz.questions[idx];
          const correct = (qIdx as any).correctAnswer !== undefined ? (qIdx as any).correctAnswer : (qIdx as any).correct_answer;
          return ans === correct ? acc + 1 : acc;
        }, 0);
        
        // Final score calculation
        const finalScore = (correctCount / quiz.questions.length) * 100;
        
        // Prepare detailed analytics
        const detailedAnswers = answers.map((ans, idx) => {
          const qObj = quiz.questions[idx];
          const correct = (qObj as any).correctAnswer !== undefined 
            ? (qObj as any).correctAnswer 
            : (qObj as any).correct_answer;
          
          return {
            question_id: (qObj as any).id,
            chosen_option: ans,
            is_correct: ans === correct
          };
        });

        setScore(finalScore);
        setIsFinished(true);
        onComplete(finalScore, detailedAnswers);
      }
    }
  };

  const handleSpeak = () => {
    if (currentQuestion) {
      speak([currentQuestion.text]);
    }
  };

  const passed = score >= 80;

  return (
    <>
      {isOpen && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal-container">
            {/* Header */}
            <div className="quiz-modal-header">
              <div className="quiz-info">
                <span className="quiz-badge">MODULE ASSESSMENT</span>
                <h2 className="quiz-title">{quiz.title}</h2>
              </div>
              {!isFinished && (
                <div className="quiz-close-btn" onClick={onClose} role="button" aria-label="Close Quiz">
                  <X size={26} />
                </div>
              )}
            </div>

            <div className="quiz-modal-content">
              {!isFinished ? (
                <>
                  {/* Segmented Color-Coded Progress Tracker */}
                  <div className="quiz-progress-wrapper">
                    <div className="progress-text">
                      Question <span>{currentIdx + 1}</span> of {quiz.questions.length}
                    </div>
                    <div className="quiz-progress-segments">
                      {quiz.questions.map((_, idx) => {
                        const isAnswered = idx < answers.length;
                        const correctIdx = (quiz.questions[idx] as any).correctAnswer !== undefined 
                            ? (quiz.questions[idx] as any).correctAnswer 
                            : (quiz.questions[idx] as any).correct_answer;
                        const isCorrect = isAnswered && answers[idx] === correctIdx;
                        const isActive = idx === currentIdx;
                        
                        let statusClass = 'pending';
                        if (isAnswered) statusClass = isCorrect ? 'correct' : 'wrong';
                        else if (isActive) statusClass = 'active';

                        return (
                          <motion.div 
                            key={idx}
                            className={`progress-segment ${statusClass}`}
                            initial={false}
                            animate={statusClass}
                            variants={{
                              pending: { backgroundColor: 'rgba(255, 255, 255, 0.05)', scale: 1 },
                              active: { backgroundColor: 'rgba(99, 102, 241, 0.3)', scale: 1.05, boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)' },
                              correct: { backgroundColor: '#10b981', scale: 1 },
                              wrong: { backgroundColor: '#ef4444', scale: 1 }
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Question Card */}
                    <div className="question-card">
                    <div className="question-header">
                      <p className="question-text">{qText}</p>
                      <div className="tts-btn" onClick={handleSpeak} role="button" aria-label="Speak Question">
                        <Volume2 size={24} />
                      </div>
                    </div>

                    <div className="options-container">
                      {qOptions.map((option: string, idx: number) => (
                        <div key={idx} className={`quiz-option-btn ${ selectedOpt === idx ? 'active' : '' } ${ isAnswerChecked && idx === qCorrect ? 'correct' : '' } ${ isAnswerChecked && selectedOpt === idx && idx !== qCorrect ? 'wrong' : '' } ${ isAnswerChecked && selectedOpt !== idx ? 'dimmed' : '' }`} onClick={() => handleSelect(idx)}
                        >
                          <span className="option-indicator">{String.fromCharCode(65 + idx)}</span>
                          <span className="option-text">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="quiz-modal-footer">
                    <button className={`quiz-next-btn ${isAnswerChecked ? 'checked' : ''}`} disabled={selectedOpt === null} onClick={handleAction}>
                      {!isAnswerChecked ? 'Check Answer' : (isLastQuestion ? 'Finish Assessment' : 'Next Question')}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
                /* Results Screen */
                <div className="quiz-results-view">
                  <div className={`results-hero ${passed ? 'success' : 'failure'}`}>
                    <div className="hero-icon-container">
                      {passed ? (
                        <Trophy className="hero-icon trophy" size={80} />
                      ) : (
                        <ShieldAlert className="hero-icon alert" size={80} />
                      )}
                    </div>
                    <h3 className="results-status">
                      {passed ? 'Mastery Achieved!' : 'Evaluation Incomplete'}
                    </h3>
                    <div className="results-score-pill">
                      <span className="final-score">{Math.round(score)}%</span>
                      <span className="score-label">Final Grade</span>
                    </div>
                  </div>

                  <div className="results-feedback">
                    <p>
                      {passed 
                        ? "Congratulations! You've successfully demonstrated competency in this module. The next section of the curriculum is now unlocked."
                        : "You did not reach the 80% competency threshold. Precision is critical in industrial modeling. Please review the lesson material and try again."}
                    </p>
                  </div>

                  <div className="results-actions">
                    {passed ? (
                      <button className="finish-btn success" onClick={onSuccessContinue || onClose}>
                        Continue to Next Module <ArrowRight size={18} />
                      </button>
                    ) : (
                      <button className="finish-btn retry" onClick={resetQuiz}>
                        <RotateCcw size={18} /> Try Again
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; import { X, CheckCircle2, AlertCircle, RotateCcw, ChevronRight, Volume2, Trophy, ShieldAlert, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Quiz } from '../mentorConstants'; import { useTTS } from '../../../hooks/useTTS';
import '../../../styles/mentor/QuizModal.css';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quiz: Quiz;
  lessonId: string;
  onComplete: (score: number, answers?: any[]) => void;
  onSuccessContinue?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({ 
  isOpen, 
  onClose, 
  quiz, 
  lessonId,
  onComplete,
  onSuccessContinue
}) => {
  const playSound = (type: 'success' | 'error') => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.1); // A5
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220.00, now); // A3
        osc.frequency.linearRampToValueAtTime(110.00, now + 0.2); // A2
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gain.gain.linearRampToValueAtTime(0, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      }
    } catch (e) {
      console.warn("Audio synthesis failed", e);
    }
  };

  const [currentIdx, setCurrentIdx] = useState(0); 
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null); 
  const [answers, setAnswers] = useState<number[]>([]); 
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0); 
  const [displayScore, setDisplayScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  
  const [timeLeft, setTimeLeft] = useState(120); // 120 seconds = 2 minutes
  const [durations, setDurations] = useState<number[]>([]); // Track time spent per question
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);
  
  // Shuffle Utility
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize Shuffled Questions and Options
  useEffect(() => {
    if (isOpen && quiz?.questions && quiz.questions.length > 0) {
      const processed = quiz.questions.map(q => {
        const opts = (q as any).options || JSON.parse((q as any).options_json || '[]');
        const correct = (q as any).correctAnswer !== undefined ? (q as any).correctAnswer : (q as any).correct_answer;
        
        // Map options to track original index
        const mappedOpts = opts.map((text: string, idx: number) => ({
          text,
          originalIdx: idx
        }));
        
        return {
          ...q,
          displayOptions: shuffleArray(mappedOpts),
          originalCorrectIdx: correct
        };
      });
      
      setShuffledQuestions(shuffleArray(processed));
    }
  }, [isOpen, quiz]);

  const { speak, stop } = useTTS();

  const storageKey = lessonId ? `kmti_quiz_state_${lessonId}` : null;

  const resetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setAnswers([]);
    setIsFinished(false);
    setScore(0);
    setDisplayScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsAnswerChecked(false);
    setDirection(0);
    setTimeLeft(120);
    setDurations([]);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleSpeak = () => {
    if (quiz?.questions?.[currentIdx]) {
      speak([quiz.questions[currentIdx].text]);
    }
  };

  // Question Timer Effect
  useEffect(() => {
    if (!isOpen || isFinished || isAnswerChecked) return;

    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isOpen, isFinished, isAnswerChecked]);

  // Reset timer when question changes
  useEffect(() => {
    if (isOpen && !isFinished && !isAnswerChecked) {
      setTimeLeft(120);
    }
  }, [currentIdx]);

  const handleTimeUp = () => {
    playSound('error');
    const timeSpent = 120 - timeLeft;
    const newAnswers = [...answers, -1]; // -1 indicates timeout/wrong
    const newDurations = [...durations, timeSpent];
    setAnswers(newAnswers);
    setDurations(newDurations);
    
    // Auto-advance logic
    if (currentIdx < shuffledQuestions.length - 1) {
      setDirection(1);
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsAnswerChecked(false);
    } else {
      finalizeQuiz(newAnswers, newDurations);
    }
  };

  const finalizeQuiz = (finalAnswers: number[], finalDurations: number[]) => {
    const correctCount = finalAnswers.reduce((acc, ans, idx) => {
      const qObj = shuffledQuestions[idx];
      const correct = qObj.originalCorrectIdx;
      return ans === correct ? acc + 1 : acc;
    }, 0);
    
    const finalScore = (correctCount / shuffledQuestions.length) * 100;
    
    let currentStreak = 0;
    let highestStreak = 0;
    finalAnswers.forEach((ans, idx) => {
      const qObj = shuffledQuestions[idx];
      const correct = qObj.originalCorrectIdx;
      if (ans === correct) {
        currentStreak++;
        highestStreak = Math.max(highestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    const detailedAnswers = finalAnswers.map((ans, idx) => {
      const qObj = shuffledQuestions[idx];
      const correct = qObj.originalCorrectIdx;
      return {
        question_id: (qObj as any).id,
        chosen_option: ans,
        is_correct: ans === correct,
        seconds_spent: finalDurations[idx] || 0
      };
    });

    setScore(finalScore);
    setMaxStreak(highestStreak);
    setIsFinished(true);
    onComplete(finalScore, detailedAnswers);
  };

  // 1. Initialize from storage if available (PRODUCTION ONLY)
  useEffect(() => {
    if (isOpen && storageKey && import.meta.env.PROD) {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setCurrentIdx(parsed.currentIdx || 0);
          setAnswers(parsed.answers || []);
          setIsFinished(parsed.isFinished || false);
          setScore(parsed.score || 0);
          // Reset interaction states for safety
          setSelectedOpt(null);
          setIsAnswerChecked(false);
        } catch (e) {
          console.error("Failed to restore quiz state", e);
          resetQuiz();
        }
      } else {
        resetQuiz();
      }
    } else if (isOpen) {
      // In Dev, always reset to fresh state when opened
      resetQuiz();
    }
    
    // Toggle global class for header blurring
    document.documentElement.classList.toggle('quiz-mode-active', isOpen);

    return () => {
      stop();
      document.documentElement.classList.remove('quiz-mode-active');
    };
  }, [isOpen, storageKey, stop]);

  // 2. Save state to storage on changes (PRODUCTION ONLY)
  useEffect(() => {
    if (isOpen && storageKey && !isFinished && import.meta.env.PROD) {
      const state = { currentIdx, answers, score };
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }, [currentIdx, answers, score, isOpen, storageKey, isFinished]);

  // 3. Autoplay question narration when currentIdx changes
  useEffect(() => {
    if (isOpen && !isFinished && quiz?.questions?.[currentIdx]) {
      handleSpeak();
    }
  }, [currentIdx, isOpen, isFinished, quiz]);

  // Score Count-up Effect
  useEffect(() => {
    if (isFinished) {
      let start = 0;
      const end = Math.round(score);
      const duration = 1000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayScore(end);
          clearInterval(timer);
          
          // Trigger celebration for perfect score
          if (end === 100) {
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 },
              colors: ['#10b981', '#6366f1', '#ffffff']
            });
          }
        } else {
          setDisplayScore(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isFinished, score]);

  if (!quiz || !shuffledQuestions || shuffledQuestions.length === 0) return null;

  const currentQuestion = shuffledQuestions[currentIdx];
  
  // Normalize question fields
  const qText = currentQuestion.text;
  const qOptions = currentQuestion.displayOptions; // Array of {text, originalIdx}
  const qCorrectOriginal = currentQuestion.originalCorrectIdx;
  const qExplanation = currentQuestion.explanation;

  // Find which UI index is actually correct
  const qCorrectUIIdx = qOptions.findIndex((o: any) => o.originalIdx === qCorrectOriginal);

  const progress = (answers.length / shuffledQuestions.length) * 100;
  const isLastQuestion = currentIdx === shuffledQuestions.length - 1;

  const handleSelect = (idx: number) => {
    if (!isAnswerChecked) {
      setSelectedOpt(idx);
    }
  };

  const handleAction = () => {
    if (selectedOpt === null) return;

    if (!isAnswerChecked) {
      const timeSpent = 120 - timeLeft;
      const selectedOriginalIdx = qOptions[selectedOpt].originalIdx;
      const newAnswers = [...answers, selectedOriginalIdx];
      const newDurations = [...durations, timeSpent];
      setAnswers(newAnswers);
      setDurations(newDurations);
      setIsAnswerChecked(true);
      
      const isCorrect = selectedOriginalIdx === qCorrectOriginal;
      if (isCorrect) playSound('success');
      else playSound('error');
    } else {
      if (currentIdx < shuffledQuestions.length - 1) {
        setDirection(1);
        setCurrentIdx(prev => prev + 1);
        setSelectedOpt(null);
        setIsAnswerChecked(false);
      } else {
        finalizeQuiz(answers, durations);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const passed = score >= 80;

  return (
    <>
      {isOpen && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal-container">
            <div className="quiz-modal-header">
              <div className="quiz-info">
                <span className="quiz-badge">MODULE ASSESSMENT</span>
                <h2 className="quiz-title">{quiz.title}</h2>
              </div>
            </div>

            <div className="quiz-modal-content">
              {!isFinished ? (
                <>
                  <div className="quiz-progress-wrapper">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '0.8rem' }}>
                      <div className="progress-text" style={{ margin: 0 }}>
                        Question <span>{currentIdx + 1}</span> of {shuffledQuestions.length}
                      </div>
                      <div className={`timer-display ${timeLeft <= 30 ? 'urgent' : ''}`} style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 800, 
                        fontFamily: 'monospace',
                        color: timeLeft <= 30 ? '#ef4444' : 'var(--primary)',
                        background: 'rgba(255,255,255,0.03)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '8px',
                        border: `1px solid ${timeLeft <= 30 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.1)'}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: timeLeft <= 30 ? '#ef4444' : 'var(--primary)', animation: timeLeft <= 30 ? 'pulse 1s infinite' : 'none' }}></div>
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    <div className="quiz-progress-segments">
                      {shuffledQuestions.map((_, idx) => {
                        const isAnswered = idx < answers.length;
                        const correctIdx = shuffledQuestions[idx].originalCorrectIdx;
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

                  <div className="quiz-content-frame">
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={currentIdx}
                        custom={direction}
                        variants={{
                          enter: (direction: number) => ({
                            x: direction > 0 ? 50 : -50,
                            opacity: 0,
                            scale: 0.98
                          }),
                          center: {
                            zIndex: 1,
                            x: 0,
                            opacity: 1,
                            scale: 1
                          },
                          exit: (direction: number) => ({
                            zIndex: 0,
                            x: direction < 0 ? 50 : -50,
                            opacity: 0,
                            scale: 0.98
                          })
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                          x: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2 }
                        }}
                        className="question-card"
                      >
                        <div className="question-header">
                          <p className="question-text">{qText}</p>
                          <div className="tts-btn" onClick={handleSpeak} role="button" aria-label="Speak Question">
                            <Volume2 size={24} />
                          </div>
                        </div>

                        <div className="options-container">
                          {qOptions.map((option: any, idx: number) => {
                            const isSelected = selectedOpt === idx;
                            const isCorrect = idx === qCorrectUIIdx;
                            const isWrong = isAnswerChecked && isSelected && !isCorrect;
                            
                            return (
                              <motion.div 
                                key={idx} 
                                className={`quiz-option-btn ${ isSelected ? 'active' : '' } ${ isAnswerChecked && isCorrect ? 'correct' : '' } ${ isWrong ? 'wrong' : '' } ${ isAnswerChecked && !isSelected ? 'dimmed' : '' }`} 
                                onClick={() => handleSelect(idx)}
                                whileTap={{ scale: 0.98 }}
                                animate={isWrong ? { 
                                  x: [0, -10, 10, -10, 10, 0],
                                  transition: { duration: 0.4 }
                                } : {}}
                              >
                                <span className="option-indicator">{String.fromCharCode(65 + idx)}</span>
                                <span className="option-text">{option.text}</span>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="quiz-modal-footer">
                    <button className={`quiz-next-btn ${isAnswerChecked ? 'checked' : ''}`} disabled={selectedOpt === null} onClick={handleAction}>
                      {!isAnswerChecked ? 'Check Answer' : (isLastQuestion ? 'Finish Assessment' : 'Next Question')}
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </>
              ) : (
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

                    {maxStreak >= 3 && (
                      <div className="streak-badge">
                        <span className="streak-flame">🔥</span>
                        <span className="streak-count">{maxStreak} CORRECT STREAK</span>
                      </div>
                    )}

                    <div className="results-score-pill">
                      <span className="final-score">{displayScore}%</span>
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
                      <div className="failure-actions">
                        <button className="finish-btn retry" onClick={resetQuiz}>
                          <RotateCcw size={18} /> Try Again
                        </button>
                        <button className="finish-btn secondary" onClick={onClose}>
                          <X size={18} /> Review Lesson
                        </button>
                      </div>
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

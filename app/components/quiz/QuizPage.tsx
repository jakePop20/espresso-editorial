import {useMemo, useState} from 'react';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {QuizProgress} from '~/components/quiz/QuizProgress';
import {QuizResult} from '~/components/quiz/QuizResult';
import {QuizStepPanel} from '~/components/quiz/QuizStepPanel';
import {computeProfile} from '~/lib/quiz/scoring';
import type {QuizAnswerIndex, QuizPageContent} from '~/lib/quiz/types';

type QuizPageProps = {
  quiz: QuizPageContent;
};

export function QuizPage({quiz}: QuizPageProps) {
  const reducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerIndex[]>([]);
  const [pendingChoice, setPendingChoice] = useState<QuizAnswerIndex | null>(
    null,
  );

  const totalSteps = quiz.steps.length;
  const isComplete = stepIndex >= totalSteps;

  const activeStep = quiz.steps[Math.min(stepIndex, totalSteps - 1)];

  const progressPct = useMemo(() => {
    return (answers.length / totalSteps) * 100;
  }, [answers.length, totalSteps]);

  const stepLabel = useMemo(() => {
    const stepNumber = Math.min(stepIndex + 1, totalSteps);
    return `STEP ${stepNumber} / ${totalSteps}`;
  }, [stepIndex, totalSteps]);

  const result = useMemo(() => {
    if (!isComplete) return null;
    const profileKey = computeProfile(answers);
    return quiz.profiles[profileKey];
  }, [answers, isComplete, quiz.profiles]);

  const showProgressEntrance =
    stepIndex === 0 && answers.length === 0 && !isComplete && !reducedMotion;

  const stepEase = [0.22, 1, 0.36, 1] as const;
  const stepExitTransition = reducedMotion
    ? {duration: 0}
    : {duration: 0.45, ease: stepEase};
  const resultTransition = reducedMotion
    ? {duration: 0}
    : {duration: 0.7, ease: stepEase};

  const handlePick = (choice: QuizAnswerIndex) => {
    if (pendingChoice !== null) return;

    setPendingChoice(choice);

    const advance = () => {
      setAnswers((prev) => [...prev, choice]);
      setPendingChoice(null);
      setStepIndex((index) => index + 1);
    };

    if (reducedMotion) {
      advance();
      return;
    }

    window.setTimeout(advance, 180);
  };

  const reset = () => {
    setPendingChoice(null);
    setAnswers([]);
    setStepIndex(0);
  };

  const trailingLabel = isComplete ? quiz.resultLabel : activeStep.category;

  return (
    <main className="ee-quiz flex flex-col items-center">
      <section className="w-full -mt-12 max-w-[720px] px-page">
        <QuizProgress
          progressPct={progressPct}
          stepLabel={stepLabel}
          trailingLabel={trailingLabel}
          useEntrance={showProgressEntrance}
        />
      </section>

      <section className="w-full max-w-[1080px] px-page -mt-16 flex flex-col items-center">
        <div className="ee-quiz__step-stage w-full">
          <AnimatePresence mode="sync" initial={false}>
            {!isComplete ? (
              <motion.div
                key={`step-${stepIndex}`}
                exit={{opacity: 0, y: 16}}
                transition={stepExitTransition}
                className="w-full"
              >
                <QuizStepPanel
                  onPick={handlePick}
                  pendingChoice={pendingChoice}
                  step={activeStep}
                  stepKey={`step-${stepIndex}`}
                />
              </motion.div>
            ) : (
              result && (
                <motion.div
                  key="result"
                  initial={{opacity: 0, y: 24}}
                  animate={{opacity: 1, y: 0}}
                  transition={resultTransition}
                  exit={{opacity: 0, y: 24}}
                  className="w-full text-center"
                >
                  <QuizResult
                    onRetake={reset}
                    primaryCta={quiz.primaryCta}
                    profile={result}
                    retakeLabel={quiz.retakeLabel}
                  />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

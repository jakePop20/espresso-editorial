import {useEffect, useState} from 'react';
import {motion, useReducedMotion} from 'motion/react';
import {
  EDITORIAL_EASE,
  QUIZ_STEP_CARD_DURATION,
  quizStepEntranceDelay,
  quizStepFadeUp,
} from '~/lib/motion/presets';
import type {
  QuizAnswerIndex,
  QuizChoiceContent,
  QuizStepContent,
} from '~/lib/quiz/types';

const quizStepItemTransition = {
  duration: QUIZ_STEP_CARD_DURATION,
  ease: EDITORIAL_EASE,
};

function getChoiceCardClassName(isActive: boolean) {
  return [
    'ee-quiz__card group flex flex-col items-center text-center px-10 py-10 bg-cream-silk border border-espresso/15 rounded-md transition-editorial-fast',
    isActive ? 'ee-quiz__card--active' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

function ChoiceCardContent({choice}: {choice: QuizChoiceContent}) {
  return (
    <>
      <span
        aria-hidden
        className="material-symbols-outlined mb-4 text-3xl text-roasted-clay"
        style={{fontVariationSettings: "'FILL' 0, 'wght' 200"}}
      >
        {choice.icon}
      </span>
      <h3 className="font-display text-headline-md mb-2 text-espresso">
        {choice.title}
      </h3>
      <p className="font-body text-body-md text-ink-subtle">
        {choice.description}
      </p>
    </>
  );
}

type QuizStepPanelProps = {
  step: QuizStepContent;
  stepKey: string;
  pendingChoice: QuizAnswerIndex | null;
  onPick: (choice: QuizAnswerIndex) => void;
};

export function QuizStepPanel({
  step,
  stepKey,
  pendingChoice,
  onPick,
}: QuizStepPanelProps) {
  const reducedMotion = useReducedMotion();
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setPlay(true);
      return;
    }

    setPlay(false);

    let outerFrame = 0;
    let innerFrame = 0;

    outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => setPlay(true));
    });

    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, [stepKey, reducedMotion]);

  if (reducedMotion) {
    return (
      <>
        <div className="text-center mb-8">
          <h1 className="font-display text-headline-xl text-espresso mb-2">
            {step.question}
          </h1>
          <p className="font-body text-body-lg text-ink-subtle">{step.lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-page md:grid-cols-3">
          {step.choices.map((choice) => {
            const isActive = pendingChoice === choice.id;
            return (
              <button
                key={choice.id}
                className={getChoiceCardClassName(isActive)}
                onClick={() => onPick(choice.id)}
                type="button"
              >
                <ChoiceCardContent choice={choice} />
              </button>
            );
          })}
        </div>
      </>
    );
  }

  const stepItemTransition = (itemIndex: number) => ({
    ...quizStepItemTransition,
    delay: quizStepEntranceDelay(itemIndex, play),
  });

  return (
    <div className="ee-quiz__choices grid w-full grid-cols-1 gap-page md:grid-cols-3">
      <motion.div
        initial="hidden"
        animate={play ? 'visible' : 'hidden'}
        variants={quizStepFadeUp}
        transition={stepItemTransition(0)}
        className="col-span-1 mb-8 text-center md:col-span-3"
      >
        <h1 className="font-display text-headline-xl text-espresso mb-2">
          {step.question}
        </h1>
        <p className="font-body text-body-lg text-ink-subtle">{step.lead}</p>
      </motion.div>
      {step.choices.map((choice, index) => {
        const isActive = pendingChoice === choice.id;
        return (
          <motion.div
            key={choice.id}
            className="ee-quiz__choice-cell h-full"
            initial="hidden"
            animate={play ? 'visible' : 'hidden'}
            variants={quizStepFadeUp}
            transition={stepItemTransition(index)}
          >
            <button
              className={`${getChoiceCardClassName(isActive)} h-full w-full`}
              onClick={() => onPick(choice.id)}
              type="button"
            >
              <ChoiceCardContent choice={choice} />
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

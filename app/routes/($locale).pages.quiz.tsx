import {useMemo, useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).pages.quiz';
import {AnimatePresence, motion, useReducedMotion} from 'motion/react';
import {QUIZ_PAGE_METAOBJECT} from '~/lib/quiz/constants';
import {getDefaultQuizPage, parseQuizPage} from '~/lib/quiz/parse';
import {QUIZ_PAGE_LIST_QUERY, QUIZ_PAGE_QUERY} from '~/lib/quiz/queries';
import type {QuizAnswerIndex} from '~/lib/quiz/types';

function computeProfile(answers: QuizAnswerIndex[]): QuizAnswerIndex {
  const counts: Record<QuizAnswerIndex, number> = {0: 0, 1: 0, 2: 0};
  for (const answer of answers) counts[answer] += 1;

  const ordered: QuizAnswerIndex[] = [0, 1, 2];
  ordered.sort((a, b) => counts[b] - counts[a]);
  return ordered[0];
}

export const meta: Route.MetaFunction = ({loaderData}) => [
  {title: loaderData?.quiz.metaTitle ?? 'Espresso Editorial | Find Your Roast'},
];

export async function loader({context}: Route.LoaderArgs) {
  const {storefront} = context;

  try {
    let {quizPage} = await storefront.query(QUIZ_PAGE_QUERY, {
      variables: {
        handle: QUIZ_PAGE_METAOBJECT.handle,
        type: QUIZ_PAGE_METAOBJECT.type,
      },
      cache: storefront.CacheLong(),
    });

    if (!quizPage?.id) {
      const {quizPages} = await storefront.query(QUIZ_PAGE_LIST_QUERY, {
        variables: {type: QUIZ_PAGE_METAOBJECT.type},
        cache: storefront.CacheLong(),
      });
      const fallbackHandle = quizPages?.nodes?.[0]?.handle;
      if (fallbackHandle && fallbackHandle !== QUIZ_PAGE_METAOBJECT.handle) {
        console.warn(
          `Quiz metaobject "${QUIZ_PAGE_METAOBJECT.handle}" not found; using "${fallbackHandle}".`,
        );
        ({quizPage} = await storefront.query(QUIZ_PAGE_QUERY, {
          variables: {
            handle: fallbackHandle,
            type: QUIZ_PAGE_METAOBJECT.type,
          },
          cache: storefront.CacheLong(),
        }));
      }
    }

    return {quiz: parseQuizPage(quizPage) ?? getDefaultQuizPage()};
  } catch (error) {
    console.error('Quiz page metaobject query failed:', error);
    return {quiz: getDefaultQuizPage()};
  }
}

export default function QuizRoute() {
  const {quiz} = useLoaderData<typeof loader>();
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

  const transition = reducedMotion
    ? {duration: 0}
    : {duration: 0.7, ease: [0.22, 1, 0.36, 1] as const};

  const handlePick = (choice: QuizAnswerIndex) => {
    if (pendingChoice !== null) return;

    setPendingChoice(choice);
    const nextAnswers = [...answers, choice];
    setAnswers(nextAnswers);

    const advance = () => {
      setPendingChoice(null);
      setStepIndex((index) => index + 1);
    };

    if (reducedMotion) {
      advance();
      return;
    }

    window.setTimeout(advance, 220);
  };

  const reset = () => {
    setPendingChoice(null);
    setAnswers([]);
    setStepIndex(0);
  };

  return (
    <main className="ee-quiz flex flex-col items-center">
      <section className="w-full -mt-12 max-w-[720px] px-page">
        <div className="flex flex-col">
          <div className="flex justify-between items-end">
            <span className="font-label text-label-caps text-espresso tracking-widest">
              {stepLabel}
            </span>
            <span className="font-label text-label-caps text-ink-subtle">
              {isComplete ? quiz.resultLabel : activeStep.category}
            </span>
          </div>
          <div className="w-full h-[1px] bg-espresso/15 relative">
            <div
              className="ee-quiz__progress-line absolute top-0 left-0 h-[1px] bg-espresso"
              style={{width: `${progressPct}%`}}
            />
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1080px] px-page -mt-16 flex flex-col items-center">
        <AnimatePresence mode="wait" initial={false}>
          {!isComplete ? (
            <motion.div
              key={`step-${stepIndex}`}
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 24}}
              transition={transition}
              className="w-full"
            >
              <div className="text-center mb-8">
                <h1 className="font-display text-headline-xl text-espresso mb-2">
                  {activeStep.question}
                </h1>
                <p className="font-body text-body-lg text-ink-subtle">
                  {activeStep.lead}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-page">
                {activeStep.choices.map((choice) => {
                  const isActive = pendingChoice === choice.id;
                  return (
                    <button
                      key={choice.id}
                      className={[
                        'ee-quiz__card group flex flex-col items-center text-center px-10 py-10 bg-cream-silk border border-espresso/15 rounded-md transition-editorial-fast',
                        isActive ? 'ee-quiz__card--active' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handlePick(choice.id)}
                      type="button"
                    >
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
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{opacity: 0, y: 24}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 24}}
              transition={transition}
              className="w-full text-center"
            >
              <h1 className="font-display text-headline-xl text-espresso mb-6">
                {result?.title}
              </h1>
              <p className="font-label text-label-caps tracking-widest text-roasted-clay mb-10">
                {result?.subtitle}
              </p>
              <p className="font-body text-body-lg text-ink-subtle mb-12 max-w-[600px] mx-auto">
                {result?.description}
              </p>

              <div className="flex flex-col md:flex-row gap-page justify-center">
                <Link
                  className="btn-primary"
                  prefetch="intent"
                  to={quiz.primaryCta.to}
                >
                  {quiz.primaryCta.label}
                </Link>
                <button className="btn-ghost" onClick={reset} type="button">
                  {quiz.retakeLabel}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

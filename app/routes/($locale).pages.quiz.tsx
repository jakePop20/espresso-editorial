import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).pages.quiz';
import {QuizPage} from '~/components/quiz/QuizPage';
import {QUIZ_PAGE_METAOBJECT} from '~/lib/quiz/constants';
import {getDefaultQuizPage, parseQuizPage} from '~/lib/quiz/parse';
import {QUIZ_PAGE_LIST_QUERY, QUIZ_PAGE_QUERY} from '~/lib/quiz/queries';

export const meta: Route.MetaFunction = ({loaderData}) => [
  {title: loaderData?.quiz.metaTitle ?? 'Espresso Editorial | Find Your Roast'},
];

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Quiz steps, choices, and profiles — required to render the interactive flow.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
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

    const quiz = parseQuizPage(quizPage) ?? getDefaultQuizPage();
    return {quiz};
  } catch (error) {
    console.error('Quiz page metaobject query failed:', error);
    return {quiz: getDefaultQuizPage()};
  }
}

/**
 * Below-the-fold or non-blocking quiz data. Deferred so it does not block TTFB.
 * Do not throw here — failures should not 500 the page.
 *
 * Example future use: related products, subscription promo, analytics payload.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function QuizRoute() {
  const {quiz} = useLoaderData<typeof loader>();
  return <QuizPage quiz={quiz} />;
}

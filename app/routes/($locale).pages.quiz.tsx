import {useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).pages.quiz';
import {QuizPage} from '~/components/quiz/QuizPage';
import {QUIZ_PAGE_METAOBJECT} from '~/lib/quiz/constants';
import {getDefaultQuizPage, parseQuizPage} from '~/lib/quiz/parse';
import {QUIZ_PAGE_LIST_QUERY, QUIZ_PAGE_QUERY} from '~/lib/quiz/queries';

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
  return <QuizPage quiz={quiz} />;
}

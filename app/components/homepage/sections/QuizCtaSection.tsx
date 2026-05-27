import {Link} from 'react-router';
import {Reveal} from '~/components/motion/Reveal';
import {fadeIn} from '~/lib/motion/presets';
import {HomepageMediaImage} from '~/components/homepage/HomepageMediaImage';
import type {HomepageQuizContent} from '~/lib/homepage/types';

type QuizCtaSectionProps = {
  quiz: HomepageQuizContent;
};

export function QuizCtaSection({quiz}: QuizCtaSectionProps) {
  return (
    <section className="homepage-quiz" id="quiz">
      <Reveal
        aria-hidden
        className="homepage-quiz__media"
        duration={1.2}
        variants={fadeIn}
      >
        <HomepageMediaImage
          className="homepage-quiz__image"
          image={quiz.image}
          placeholderClassName="homepage-quiz__image bg-espresso"
          sizes="100vw"
        />
      </Reveal>
      <Reveal className="homepage-quiz__content section">
        <h2 className="homepage-quiz__title">{quiz.title}</h2>
        <p className="homepage-quiz__body">{quiz.body}</p>
        <Link className="homepage-quiz__cta" prefetch="intent" to={quiz.cta.to}>
          {quiz.cta.label}
        </Link>
      </Reveal>
    </section>
  );
}

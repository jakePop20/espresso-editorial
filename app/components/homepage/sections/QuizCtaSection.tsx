import {Link} from 'react-router';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {HOMEPAGE_QUIZ_CTA} from '~/lib/homepage/content';

export function QuizCtaSection() {
  return (
    <section className="homepage-quiz" id="quiz">
      <div className="homepage-quiz__media" aria-hidden>
        <img
          alt=""
          className="homepage-quiz__image"
          height={800}
          loading="lazy"
          src={HOMEPAGE_ASSETS.quiz}
          width={1920}
        />
      </div>
      <div className="homepage-quiz__content section">
        <h2 className="homepage-quiz__title">{HOMEPAGE_QUIZ_CTA.title}</h2>
        <p className="homepage-quiz__body">{HOMEPAGE_QUIZ_CTA.body}</p>
        <Link className="homepage-quiz__cta" prefetch="intent" to={HOMEPAGE_QUIZ_CTA.cta.to}>
          {HOMEPAGE_QUIZ_CTA.cta.label}
        </Link>
      </div>
    </section>
  );
}

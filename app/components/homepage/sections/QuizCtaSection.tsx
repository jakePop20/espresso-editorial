import {Link} from 'react-router';
import {Reveal} from '~/components/motion/Reveal';
import {fadeIn} from '~/lib/motion/presets';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {HOMEPAGE_QUIZ_CTA} from '~/lib/homepage/content';

export function QuizCtaSection() {
  return (
    <section className="homepage-quiz" id="quiz">
      <Reveal
        aria-hidden
        className="homepage-quiz__media"
        duration={1.2}
        variants={fadeIn}
      >
        <img
          alt=""
          className="homepage-quiz__image"
          height={800}
          loading="lazy"
          src={HOMEPAGE_ASSETS.quiz}
          width={1920}
        />
      </Reveal>
      <Reveal className="homepage-quiz__content section">
        <h2 className="homepage-quiz__title">{HOMEPAGE_QUIZ_CTA.title}</h2>
        <p className="homepage-quiz__body">{HOMEPAGE_QUIZ_CTA.body}</p>
        <Link className="homepage-quiz__cta" prefetch="intent" to={HOMEPAGE_QUIZ_CTA.cta.to}>
          {HOMEPAGE_QUIZ_CTA.cta.label}
        </Link>
      </Reveal>
    </section>
  );
}

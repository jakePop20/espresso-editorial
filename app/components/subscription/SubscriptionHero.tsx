import {QuizEntrance, QuizEntranceItem} from '~/components/motion/QuizEntrance';

type SubscriptionHeroProps = {
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
  };
};

export function SubscriptionHero({hero}: SubscriptionHeroProps) {
  return (
    <QuizEntrance className="section section-intro">
      <QuizEntranceItem>
        <span className="eyebrow">{hero.eyebrow}</span>
      </QuizEntranceItem>
      <QuizEntranceItem>
        <h1 className="font-display text-headline-xl text-espresso mb-4 leading-tight md:text-display-lg">
          {hero.title}
        </h1>
      </QuizEntranceItem>
      <QuizEntranceItem>
        <p className="font-body text-body-lg text-ink-subtle mx-auto max-w-2xl">
          {hero.lead}
        </p>
      </QuizEntranceItem>
    </QuizEntrance>
  );
}

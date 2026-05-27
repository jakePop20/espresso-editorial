import {Link} from 'react-router';
import type {HomepageCta} from '~/lib/homepage/types';
import type {QuizProfileContent} from '~/lib/quiz/types';

type QuizResultProps = {
  profile: QuizProfileContent;
  primaryCta: HomepageCta;
  retakeLabel: string;
  onRetake: () => void;
};

export function QuizResult({
  profile,
  primaryCta,
  retakeLabel,
  onRetake,
}: QuizResultProps) {
  return (
    <>
      <h1 className="font-display text-headline-xl text-espresso mb-6">
        {profile.title}
      </h1>
      <p className="font-label text-label-caps tracking-widest text-roasted-clay mb-10">
        {profile.subtitle}
      </p>
      <p className="font-body text-body-lg text-ink-subtle mb-12 max-w-[600px] mx-auto">
        {profile.description}
      </p>

      <div className="flex flex-col md:flex-row gap-page justify-center">
        <Link className="btn-primary" prefetch="intent" to={primaryCta.to}>
          {primaryCta.label}
        </Link>
        <button className="btn-ghost" onClick={onRetake} type="button">
          {retakeLabel}
        </button>
      </div>
    </>
  );
}

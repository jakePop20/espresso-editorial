import {useEffect, useState} from 'react';
import {useReducedMotion} from 'motion/react';
import type {SubscriptionPageContent} from '~/lib/subscription/types';

type SubscriptionTestimonialsProps = {
  testimonials: SubscriptionPageContent['testimonials'];
};

export function SubscriptionTestimonials({
  testimonials,
}: SubscriptionTestimonialsProps) {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const active = testimonials.items[index];

  useEffect(() => {
    if (reducedMotion || testimonials.items.length <= 1) return;

    const interval = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setIndex((current) => (current + 1) % testimonials.items.length);
        setVisible(true);
      }, 500);
    }, 6000);

    return () => window.clearInterval(interval);
  }, [reducedMotion, testimonials.items.length]);

  const backgroundStyle = testimonials.backgroundImage?.url
    ? {backgroundImage: `url('${testimonials.backgroundImage.url}')`}
    : undefined;

  return (
    <section className="section ee-subscription__testimonials-section">
      <div className="relative overflow-hidden bg-espresso px-page py-16 text-cream-silk md:py-20">
        <div
          aria-hidden
          className="absolute top-0 right-0 hidden h-full w-1/3 bg-cover opacity-20 md:block"
          style={backgroundStyle}
        />
        <div className="relative z-10 max-w-2xl">
          <span className="mb-8 block font-label text-label-caps uppercase tracking-[0.2em] text-inverse-primary">
            {testimonials.eyebrow}
          </span>
          <div className="flex min-h-[200px] items-center">
            <blockquote
              className={`font-display text-headline-md italic leading-snug transition-opacity duration-500 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              &ldquo;{active.quote}&rdquo;
            </blockquote>
          </div>
          <div
            className={`mt-8 flex items-center gap-4 transition-opacity duration-500 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-inverse-primary font-label text-label-caps text-espresso">
              {active.initials}
            </div>
            <div>
              <p className="font-label text-label-caps tracking-widest">
                {active.author}
              </p>
              <p className="font-body text-body-md text-inverse-primary/60">
                {active.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

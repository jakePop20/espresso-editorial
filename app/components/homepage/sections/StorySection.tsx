import {Image} from '@shopify/hydrogen';
import {Reveal} from '~/components/motion/Reveal';
import {Stagger, StaggerItem} from '~/components/motion/Stagger';
import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import type {HomepageStoryContent} from '~/lib/homepage/types';

type StorySectionProps = {
  story: HomepageStoryContent;
};

export function StorySection({story}: StorySectionProps) {
  const imageAlt =
    story.image?.altText ??
    'Freshly roasted coffee beans cooling on a tray in warm sunlight';

  return (
    <section className="homepage-story section" id="story">
      <div className="homepage-story__grid">
        <div className="homepage-story__copy">
          <Reveal>
            <span className="homepage-story__eyebrow">{story.eyebrow}</span>
            <h2 className="homepage-story__title">{story.title}</h2>
            <p className="homepage-story__body">{story.body}</p>
          </Reveal>
          <Stagger as="ul" className="homepage-story__pillars">
            {story.pillars.map((pillar) => (
              <StaggerItem
                as="li"
                className="homepage-story__pillar"
                key={pillar.number}
              >
                <span className="homepage-story__pillar-number">{pillar.number}</span>
                <div>
                  <h3 className="homepage-story__pillar-title">{pillar.title}</h3>
                  <p className="homepage-story__pillar-body">{pillar.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal className="homepage-story__visual" delay={0.12}>
          <div className="homepage-story__image-wrap">
            {story.image ? (
              <Image
                alt={imageAlt}
                className="homepage-story__image"
                data={story.image}
                loading="lazy"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            ) : (
              <img
                alt={imageAlt}
                className="homepage-story__image"
                height={1200}
                loading="lazy"
                src={HOMEPAGE_ASSETS.story}
                width={900}
              />
            )}
          </div>
          <Reveal as="blockquote" className="homepage-story__quote" delay={0.2}>
            <p className="homepage-story__quote-text">{story.quote.text}</p>
            <cite className="homepage-story__quote-cite">{story.quote.attribution}</cite>
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}

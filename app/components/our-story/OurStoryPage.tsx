import {useEffect} from 'react';
import {Link, useLocation} from 'react-router';
import {HomepageMediaImage} from '~/components/homepage/HomepageMediaImage';
import {
  HeroEntrance,
  HeroEntranceItem,
} from '~/components/motion/HeroEntrance';
import {Reveal} from '~/components/motion/Reveal';
import {Stagger, StaggerItem} from '~/components/motion/Stagger';
import type {OurStoryPageContent, OurStoryStory} from '~/lib/our-story/types';

type OurStoryPageProps = {
  content: OurStoryPageContent;
};

export function OurStoryPage({content}: OurStoryPageProps) {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (!hash) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  const heroMedia = (
    <>
      <HomepageMediaImage
        className="ee-our-story__hero-image"
        fetchPriority="high"
        image={content.hero.image}
        loading="eager"
        sizes="100vw"
      />
      <div className="ee-our-story__hero-overlay" aria-hidden />
    </>
  );

  const heroContent = (
    <>
      <HeroEntranceItem>
        <p className="ee-our-story__hero-eyebrow">{content.hero.eyebrow}</p>
      </HeroEntranceItem>
      <HeroEntranceItem>
        <h1 className="ee-our-story__hero-title text-white">
          {content.hero.titleLines.map((line) => (
            <span
              key={`${line.before}${line.emphasis}`}
              className="ee-our-story__hero-title-line"
            >
              {line.before}
              <em>{line.emphasis}</em>
              {line.after}
            </span>
          ))}
        </h1>
        <div className="ee-our-story__hero-rule" aria-hidden />
      </HeroEntranceItem>
      <HeroEntranceItem>
        <p className="ee-our-story__hero-lead">{content.hero.lead}</p>
      </HeroEntranceItem>
    </>
  );

  return (
    <div className="ee-our-story">
      <header className="ee-our-story__hero">
        <HeroEntrance
          content={heroContent}
          contentClassName="ee-our-story__hero-content"
          media={heroMedia}
          mediaClassName="ee-our-story__hero-media"
        />
      </header>

      <section className="section ee-our-story__philosophy">
        <div className="ee-our-story__philosophy-grid">
          <div className="ee-our-story__philosophy-copy">
            <Reveal>
              <span className="eyebrow">{content.philosophy.eyebrow}</span>
              <h2 className="ee-our-story__section-title">
                {content.philosophy.title}
              </h2>
              {content.philosophy.paragraphs.map((paragraph) => (
                <p key={paragraph} className="ee-our-story__body-lg">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          </div>
          <Reveal className="ee-our-story__philosophy-visual" delay={0.12}>
            <div className="ee-our-story__philosophy-image-wrap">
              <HomepageMediaImage
                className="ee-our-story__philosophy-image"
                image={content.philosophy.image}
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <Reveal
                as="blockquote"
                className="ee-our-story__philosophy-quote"
                delay={0.2}
              >
                <p>{content.philosophy.pullQuote}</p>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="ee-our-story__roastery">
        <div className="section ee-our-story__roastery-inner">
          <Reveal className="ee-our-story__roastery-intro">
            <span className="eyebrow">{content.roastery.eyebrow}</span>
            <h2 className="ee-our-story__section-title">
              {content.roastery.title}
            </h2>
          </Reveal>
          <Stagger className="ee-our-story__roastery-grid">
            {content.roastery.pillars.map((pillar, index) => (
              <StaggerItem
                as="article"
                className={
                  index === 1
                    ? 'ee-our-story__roastery-card ee-our-story__roastery-card--offset'
                    : 'ee-our-story__roastery-card'
                }
                key={pillar.title}
              >
                <div className="ee-our-story__roastery-image-wrap">
                  <HomepageMediaImage
                    className="ee-our-story__roastery-image"
                    image={pillar.image}
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <h3 className="ee-our-story__card-title">{pillar.title}</h3>
                <p className="ee-our-story__body-md">{pillar.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="ee-our-story__quote">
        <Reveal className="ee-our-story__quote-inner">
          <span
            aria-hidden
            className="material-symbols-outlined ee-our-story__quote-icon"
            style={{fontVariationSettings: "'FILL' 1, 'wght' 300"}}
          >
            format_quote
          </span>
          <blockquote className="ee-our-story__quote-text">
            {content.quote.text}
          </blockquote>
          <cite className="ee-our-story__quote-cite">
            {content.quote.attribution}
          </cite>
        </Reveal>
      </section>

      <section className="section ee-our-story__stories" id="stories">
        <Reveal className="ee-our-story__stories-header">
          <div>
            <span className="eyebrow">{content.stories.eyebrow}</span>
            <h2 className="ee-our-story__section-title">
              {content.stories.title}
            </h2>
          </div>
        </Reveal>
        <Stagger className="ee-our-story__stories-list">
          {content.stories.items.map((story, index) => (
            <StaggerItem
              as="article"
              className={
                index % 2 === 1
                  ? 'ee-our-story__story ee-our-story__story--reversed'
                  : 'ee-our-story__story'
              }
              id={story.id}
              key={story.id}
            >
              <OurStoryArticleContent story={story} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="section ee-our-story__cta section-intro">
        <Reveal>
          <h2 className="ee-our-story__cta-title">{content.cta.title}</h2>
          <p className="ee-our-story__body-lg mx-auto max-w-2xl">
            {content.cta.body}
          </p>
          <Link
            className="ee-our-story__cta-button"
            prefetch="intent"
            to={content.cta.button.to}
          >
            {content.cta.button.label}
          </Link>
        </Reveal>
      </section>
    </div>
  );
}

function OurStoryArticleContent({story}: {story: OurStoryStory}) {
  return (
    <>
      <div className="ee-our-story__story-image-wrap">
        <HomepageMediaImage
          className="ee-our-story__story-image"
          image={story.image}
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="ee-our-story__story-copy">
        <span className="eyebrow">{story.eyebrow}</span>
        <h3 className="ee-our-story__story-title">{story.title}</h3>
        <p className="ee-our-story__story-subtitle">{story.subtitle}</p>
        {story.paragraphs.map((paragraph) => (
          <p key={paragraph} className="ee-our-story__body-md">
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
}

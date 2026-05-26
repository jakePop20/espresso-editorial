import {HOMEPAGE_ASSETS} from '~/lib/homepage/assets';
import {HOMEPAGE_STORY} from '~/lib/homepage/content';

export function StorySection() {
  return (
    <section className="homepage-story section" id="story">
      <div className="homepage-story__grid">
        <div className="homepage-story__copy">
          <span className="homepage-story__eyebrow">{HOMEPAGE_STORY.eyebrow}</span>
          <h2 className="homepage-story__title">{HOMEPAGE_STORY.title}</h2>
          <p className="homepage-story__body">{HOMEPAGE_STORY.body}</p>
          <ul className="homepage-story__pillars">
            {HOMEPAGE_STORY.pillars.map((pillar) => (
              <li className="homepage-story__pillar" key={pillar.number}>
                <span className="homepage-story__pillar-number">{pillar.number}</span>
                <div>
                  <h3 className="homepage-story__pillar-title">{pillar.title}</h3>
                  <p className="homepage-story__pillar-body">{pillar.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="homepage-story__visual">
          <div className="homepage-story__image-wrap">
            <img
              alt="Freshly roasted coffee beans cooling on a tray in warm sunlight"
              className="homepage-story__image"
              height={1200}
              loading="lazy"
              src={HOMEPAGE_ASSETS.story}
              width={900}
            />
          </div>
          <blockquote className="homepage-story__quote">
            <p className="homepage-story__quote-text">{HOMEPAGE_STORY.quote.text}</p>
            <cite className="homepage-story__quote-cite">{HOMEPAGE_STORY.quote.attribution}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

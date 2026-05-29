import {parseEditorialContent} from '~/lib/homepage/parse';
import type {HomepageEditorialContent, HomepageEditorialItemContent} from '~/lib/homepage/types';
import type {OurStoryEditorialQuery} from 'storefrontapi.generated';
import {getOurStoryPageContent} from '~/lib/our-story/content';
import type {OurStoryPageContent, OurStoryStory} from '~/lib/our-story/types';

function findEditorialItem(
  editorial: HomepageEditorialContent,
  handle: string,
): HomepageEditorialItemContent | undefined {
  if (editorial.feature.handle === handle) return editorial.feature;

  return editorial.sidebar.find((item) => item.handle === handle);
}

function mergeStoryWithEditorial(
  story: OurStoryStory,
  editorialItem?: HomepageEditorialItemContent,
): OurStoryStory {
  if (!editorialItem) return story;

  return {
    ...story,
    eyebrow: editorialItem.eyebrow,
    title: editorialItem.title,
    image: editorialItem.image,
  };
}

export function mergeOurStoryPageContent(
  editorial: HomepageEditorialContent,
): OurStoryPageContent {
  const base = getOurStoryPageContent();

  return {
    ...base,
    stories: {
      eyebrow: editorial.intro.eyebrow,
      title: editorial.intro.title,
      items: base.stories.items.map((story) =>
        mergeStoryWithEditorial(story, findEditorialItem(editorial, story.id)),
      ),
    },
  };
}

export function parseOurStoryPageContent(
  data: OurStoryEditorialQuery | null | undefined,
): OurStoryPageContent {
  if (!data?.editorialFeature) {
    return getOurStoryPageContent();
  }

  const editorial = parseEditorialContent(data);

  return mergeOurStoryPageContent(editorial);
}

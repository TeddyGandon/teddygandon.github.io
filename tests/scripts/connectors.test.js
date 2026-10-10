// The connectors parse third-party markup, so they're tested against
// representative fixtures with fetch mocked: no network access in CI.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchMediumArticles } from '../../scripts/load-external-sources/connectors/medium.js';
import { fetchLeadDevArticles } from '../../scripts/load-external-sources/connectors/leaddev.js';
import { fetchLinkedInPosts } from '../../scripts/load-external-sources/connectors/linkedin.js';

// Routes fetch() to canned responses; unknown URLs get a 404.
function mockFetch(pages) {
  const fetch = vi.fn(async (url) => {
    const body = pages[url];
    return body === undefined
      ? { ok: false, status: 404, statusText: 'Not Found', text: async () => '' }
      : { ok: true, status: 200, statusText: 'OK', text: async () => body };
  });
  vi.stubGlobal('fetch', fetch);
  return fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe('Medium connector', () => {
  const feedUrl = 'https://medium.com/feed/@someone';
  const rss = `<?xml version="1.0"?><rss><channel>
    <item>
      <title><![CDATA[First & foremost]]></title>
      <link>https://medium.com/@someone/first-123?source=rss----abc</link>
      <pubDate>Mon, 28 Sep 2026 08:00:00 GMT</pubDate>
      <content:encoded><![CDATA[<figure><img src="https://cdn.test/first.jpg" /></figure><p>Intro &amp; more text.</p>]]></content:encoded>
    </item>
    <item>
      <title>Plain title</title>
      <link>https://medium.com/@someone/second-456</link>
      <pubDate></pubDate>
      <content:encoded><![CDATA[<p>No image here.</p>]]></content:encoded>
    </item>
    <item><title></title><link>https://medium.com/@someone/untitled</link></item>
  </channel></rss>`;

  it('normalizes feed items', async () => {
    mockFetch({ [feedUrl]: rss });
    const articles = await fetchMediumArticles({ username: 'someone' });
    expect(articles).toEqual([
      {
        source: 'medium',
        sourceLabel: 'Medium',
        title: 'First & foremost',
        excerpt: 'Intro & more text.',
        url: 'https://medium.com/@someone/first-123',
        date: '2026-09-28',
      },
      {
        source: 'medium',
        sourceLabel: 'Medium',
        title: 'Plain title',
        excerpt: 'No image here.',
        url: 'https://medium.com/@someone/second-456',
        date: '',
      },
    ]);
  });

  it('fails loudly when the feed is unavailable', async () => {
    mockFetch({});
    await expect(fetchMediumArticles({ username: 'someone' })).rejects.toThrow(/Medium feed request failed: 404/);
  });
});

describe('LeadDev connector', () => {
  const profileUrl = 'https://leaddev.com/community/someone';
  const card = (url, title, excerpt) => `
    <div class="ld-card">
      <a href="${url}" class="ld-card__title-link">${title}</a>
      <div class="ld-card__excerpt"><p>${excerpt}</p></div>
    </div>`;
  const profile = `<html><body>
    ${card('https://leaddev.com/a/one', 'Leading &amp; learning', 'An <em>excerpt</em>.')}
    ${card('https://leaddev.com/a/gone', 'Gone', 'Its page 404s.')}
  </body></html>`;
  const articleOne = `<html><head>
    <meta property="article:published_time" content="2026-06-02T10:00:00+00:00" />
    <meta property="og:image" content="https://leaddev.com/one.png" />
  </head></html>`;

  it('reads the cards, then fills date and image from each article page', async () => {
    mockFetch({ [profileUrl]: profile, 'https://leaddev.com/a/one': articleOne });
    const articles = await fetchLeadDevArticles({ username: 'someone' });
    expect(articles).toEqual([
      {
        source: 'leaddev',
        sourceLabel: 'LeadDev',
        title: 'Leading & learning',
        excerpt: 'An excerpt .',
        url: 'https://leaddev.com/a/one',
        date: '2026-06-02',
      },
      {
        source: 'leaddev',
        sourceLabel: 'LeadDev',
        title: 'Gone',
        excerpt: 'Its page 404s.',
        url: 'https://leaddev.com/a/gone',
        date: '',
      },
    ]);
  });

  it('fails loudly when the profile is unavailable', async () => {
    mockFetch({});
    await expect(fetchLeadDevArticles({ username: 'someone' })).rejects.toThrow(/LeadDev profile request failed: 404/);
  });
});

describe('LinkedIn connector', () => {
  const profileUrl = 'https://www.linkedin.com/in/someone/';
  // Activity ids are snowflakes; this one encodes 2026-10-05.
  const ownPost = 'https://www.linkedin.com/posts/someone_topic-activity-7512814053262737410-6aWD';
  const ownPostFr = 'https://fr.linkedin.com/posts/someone_other-activity-7505203828984795137-HlrV';
  const reactedPost = 'https://www.linkedin.com/posts/somebody-else_topic-activity-7505203828984795137-XXXX';
  const emptyPost = 'https://www.linkedin.com/posts/someone_empty-activity-7505203828984795999-ZZZZ';

  const profile = `<html><body>
    <a href="${ownPost}?trk=public_profile">post</a>
    <a href="${ownPost}">same post again</a>
    <a href="${ownPostFr}">country subdomain</a>
    <a href="${reactedPost}">reacted to</a>
    <a href="${emptyPost}">no text</a>
  </body></html>`;

  const postWithJsonLd = `<html><head>
    <meta property="og:description" content="I still code &amp; it&#39;s fine." />
    <meta property="og:image" content="https://media.test/1.jpg" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'SocialMediaPosting',
      interactionStatistic: [
        { '@type': 'InteractionCounter', interactionType: 'http://schema.org/LikeAction', userInteractionCount: 42 },
        { '@type': 'InteractionCounter', interactionType: 'http://schema.org/CommentAction', userInteractionCount: 3 },
      ],
    })}</script>
  </head><body>
    <img data-reaction-type="LIKE" /><img data-reaction-type="PRAISE" /><img data-reaction-type="LIKE" /><img data-reaction-type="BOGUS" />
  </body></html>`;

  const postWithDataAttributes = `<html><head>
    <meta name="description" content="Fallback description" />
  </head><body>
    <span data-num-reactions="1234"></span><span data-num-comments="7"></span>
  </body></html>`;

  it("keeps only the owner's posts, deduplicated, with text, image and reactions", async () => {
    const fetch = mockFetch({
      [profileUrl]: profile,
      [ownPost]: postWithJsonLd,
      'https://www.linkedin.com/posts/someone_other-activity-7505203828984795137-HlrV': postWithDataAttributes,
      [emptyPost]: '<html></html>',
    });
    const posts = await fetchLinkedInPosts({ username: 'someone' });

    expect(fetch).not.toHaveBeenCalledWith(reactedPost, expect.anything());
    expect(posts).toEqual([
      {
        date: '2026-10-05',
        text: "I still code & it's fine.",
        url: ownPost,
        image: 'https://media.test/1.jpg',
        reactions: { total: 42, types: ['LIKE', 'PRAISE'] },
        comments: 3,
      },
      {
        date: '2026-09-14',
        text: 'Fallback description',
        url: 'https://www.linkedin.com/posts/someone_other-activity-7505203828984795137-HlrV',
        image: null,
        reactions: { total: 1234, types: ['LIKE'] },
        comments: 7,
      },
    ]);
  });

  it('sends a browser-like user agent', async () => {
    const fetch = mockFetch({ [profileUrl]: profile });
    await fetchLinkedInPosts({ username: 'someone' });
    expect(fetch.mock.calls[0][1].headers['User-Agent']).toMatch(/Mozilla/);
  });

  it('fails loudly on an auth wall instead of returning nothing', async () => {
    mockFetch({ [profileUrl]: '<html>Sign in to view</html>' });
    await expect(fetchLinkedInPosts({ username: 'someone' })).rejects.toThrow(/listed no posts/);
  });

  it('fails loudly when the profile is unavailable', async () => {
    mockFetch({});
    await expect(fetchLinkedInPosts({ username: 'someone' })).rejects.toThrow(/LinkedIn profile request failed: 404/);
  });
});

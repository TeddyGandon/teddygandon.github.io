---
title: Writing guidelines
date: 1970-01-01
excerpt: How I write the articles on this site, from the tone and the shape to the topics and the sources. Mostly notes to myself, so the next article sounds like the previous ones.
tags: [example]
status: draft
---

I never planned a style for these articles. I wrote the first one, then the second, and somewhere around the fourth I noticed I kept making the same choices without thinking about them. These are those choices, written down so I stop rediscovering them every time, and so I have something to check a draft against before publishing it.

The Markdown side (what renders, how charts work) has its own pages: the [Markdown example](/articles/markdown-example) and the [charts example](/articles/charts-example).

## The voice

I write about things I've done. Almost everything else on this page comes from that.

So it's first person: "I", "my squads", "what worked for me". When something is an opinion, I say it's mine ("My own take sits closer to a different question") instead of dressing it up as a general truth.

I also tell the failures. "I learned this the expensive way" or "I've made it too" do more for a reader's trust than a success story, and they're usually more useful.

When there's a real debate, like whether managers should still code, I give both sides a fair hearing before saying where I land. I'd rather argue with the best version of the other side than with a caricature of it.

Every article needs at least one real scene: a meeting, a question someone asked, a joke that stopped being a joke. "I'm not sure I could still write this without the assistant" says more about deskilling than a paragraph of theory.

The engineering metaphors are probably the most recognizable thing in the articles. Lewin's model as a deployment pipeline, a failed change as a rollback, the do-everything AI assistant as a god-class, velocity as memory consumption. Most of my readers are engineers, so they land, but only when they explain something. One or two per article is plenty. Past that, it starts to feel like a gimmick.

I'm wary of anything that looks good on a slide: adoption dashboards, vanity metrics, the values page nobody reads. A lot of the articles end up being about what the number doesn't show. And whatever the starting topic, they nearly always come back to the people.

Humor is fine in small doses. "I am watching you, 'number of commits'" is about as far as it goes.

### Sentences

Short sentences when something matters ("It isn't.", "That window is short."), longer ones for the reasoning around them. Plain words. I'd rather be clear than clever.

A few mechanical rules:

- American spelling: behavior, organization, optimize.
- No em dashes in the text. Commas, colons or parentheses do the job, and none of the published articles use one.
- Straight quotes and apostrophes in the file. The site turns them into curly ones.
- Bold for maybe one idea per section, the one I'd want someone to remember. Never a whole paragraph.

There are also words I try to avoid, because they sound like a press release or a generated draft: "delve", "moreover", "it's worth noting", "game-changer", "in today's fast-paced world". "Leverage" sneaked into one article. Once is enough.

### Same words for the same things

Over time I settled on a small vocabulary. Mixing it up makes the articles read like they come from different people.

- **squad** for the group a manager runs. "Team" is fine for the wider organization.
- **one to one**, plural one to ones. The two early articles say 1:1, then I switched, and I'm sticking with it.
- **retrospective**, with "retro" allowed in a list or a quick aside.
- **seminar** for the rituals that gather the whole team.
- **scope** for what someone owns, explicitly. It comes back in almost every article.
- **friction** for the small, recurring costs of a badly designed setup.
- **hygiene**, as in "the hygiene of interactions" or "an AI-first hygiene".

## How an article is built

The recent articles almost all follow the same shape. I don't fill it in like a template, but if I drift away from it, I want it to be on purpose.

They open without a heading. One or two paragraphs that start from a situation (a question people keep asking me, the week I rolled something out) and get to the point quickly. If I catch myself writing "In this article, I will", I delete it.

Sometimes a short second paragraph links back to an earlier article and says how this one is different: "I wrote about how I use AI for my own management work. This one is about the squad."

Then come four to seven sections, each making one point. The headings say something: "Async isn't a fallback" rather than "Asynchronous communication". Imperatives work well too, like "Don't disappear" or "Lead first, name later". Sentence case, always. I only go down to `###` when a section splits into parallel cases, like the three countries in [your proofs are not their proof](/articles/your-proofs-are-not-their-proof) or the two warning signs in [deploying AI in a squad](/articles/deploying-ai-in-a-squad).

Leftover points that don't deserve their own section go into a short "a few more things I've learned" part. Each one is a paragraph that starts with a bold imperative, like **Ask, don't assign.** or **Make the way back explicit.**

The last section pulls everything together, under a heading like "What it comes down to" or "So why do I still code", and often ends on one bold line. Then the sources, and at the very bottom, an edit note if I changed the article after publishing it.

Length is usually between 1,000 and 2,000 words, five to ten minutes of reading. The [Brototype talks](/articles/two-talks-at-brototype) were around 550 words, which was fine for a recap. When I go past 2,000, it's usually two articles fighting for the same page.

I prefer prose to lists. Lists are for things that really are parallel, like habits or steps. A table can make a good ending when it turns the article into something people can reuse, like the framework parts at the end of [a framework for management](/articles/a-framework-for-management).

## What I write about

If there's one idea running through everything, it's that the parts of leadership we call soft skills are mostly systems nobody took the time to design. And that the people inside those systems matter more than the systems.

So far, the articles fall into five themes:

| Theme                           | Articles                                                              | Tags                                 |
| ------------------------------- | --------------------------------------------------------------------- | ------------------------------------ |
| Management as a designed system | A framework for management                                            | management, framework, leadership    |
| Growing people and managers     | Turning engineers into managers, Two talks at Brototype               | management, mentorship, education    |
| Multicultural management        | What multicultural management means, Your proofs are not their proof  | culture, leadership                  |
| AI in management and squads     | Using AI tools for managing, Deploying AI in a squad                  | ai, management, tools, mental-health |
| Staying technical               | Why do I still code?                                                  | management, coding, leadership       |

Some threads are still open. Seminars, skip-level one to ones and 360 feedback all came up in passing and deserve more than a sentence each. The follow-up questions people send after an article are usually a good next topic too.

Some things stay out. Nothing confidential: no internal figures, no unreleased products, no names of colleagues or partners. No criticism of a specific employer or person either. When something went wrong, I tell it as a lesson, preferably my own. I also skip generic advice. If I could have written it without having done the job, it isn't ready. And I don't write takes just to get reactions. Taking a position is fine, picking a fight isn't the goal.

## How I source things

Sources are what keep an article from being only my opinion. The published ones cite between three and ten, and the recent ones lean towards seven or more.

In the text, a source gets a number in parentheses, before the final punctuation: "...the less critical thinking they reported putting into their work (2)." The numbers follow the order in which sources first appear, and a source cited twice keeps its number.

I name the researchers when they're known ("Amy Edmondson's research on psychological safety showed..."), and I give the actual figure when there is one: 17% lower on the quiz, 19% slower while believing they were 20% faster. Numbers are what make a reader stop and think.

I also say where a study stops. With the METR result, I wrote that I don't take it as proof that AI slows everyone down, because the tools have moved a lot since. And old research sometimes explains a new problem better than anything recent: Bainbridge's "ironies of automation" dates from 1983 and describes AI deskilling almost exactly.

At the end, the sources are listed one per line, in number order:

```md
## Sources

- (1) Amy Edmondson, 1999, [Psychological Safety and Learning Behavior in Work Teams](https://journals.sagepub.com/doi/10.2307/2666999), *Administrative Science Quarterly*
- (2) [Google SRE Book, Postmortem Culture: Learning from Failure](https://sre.google/sre-book/postmortem-culture/)
```

For papers and books, that's the authors, the year, the linked title, then the journal or publisher in italics, with a DOI link when there is one. For reports and websites, the organization, year and title all go in the link. A short note after a colon helps when it isn't obvious why the source is there.

On quality, I go for peer-reviewed research and established books first (Edmondson, Bandura, Kahn, Erin Meyer, Camille Fournier), then serious surveys and research programs (Google re:Work, Gallup, Pew, Stack Overflow, DORA, METR), then practitioners with a track record (Charity Majors, the Google SRE book). Vendor blogs and SEO articles are a no. [Using AI tools for managing](/articles/using-ai-tools-for-managing) cites two of them, they're the weakest sources on the site and worth replacing.

Before publishing, I open every link and check that it actually says what I claim it says. Reusing a source across articles is fine: Kahn, Lewin and Charity Majors already show up more than once, and that's part of what makes the articles feel connected.

## Linking articles together

I link to earlier articles whenever it's relevant, with link text that reads as part of the sentence: "as I wrote about [multicultural teams](/articles/what-multicultural-management-means)". No "click here", no bare URLs. Internal links use the `/articles/slug` path.

It works both ways. When an article promises a follow-up, the follow-up should link back to it, and the older one can get an edit note pointing forward. For example, [a framework for management](/articles/a-framework-for-management) announces a piece on managing across cultures, but it doesn't link to the two that came after.

## Front matter

```md
---
title: Turning engineers into managers
date: 2026-11-09
excerpt: Promoting an engineer into a manager is not a title change, it's a change for the whole squad.
tags: [management, leadership, mentorship]
---
```

The title is short, in sentence case, and can be a question ("Why do I still code?"). The ones I like best take a position, like "Your proofs are not their proof".

Dates are in ISO format. Lately I publish on Mondays, every two or three weeks. A date in the future schedules the article: it stays hidden until that day.

The excerpt is one to three sentences, under 50 words, and says what the article argues. It shows up in the article list and in link previews, so it has to make sense on its own. No teasers.

Two or three tags, lowercase, picked from the ones already in use when possible: `management`, `leadership`, `culture`, `ai`, `mentorship`, `framework`, `tools`, `coding`, `mental-health`, `speaking`, `education`. A new tag is fine when a new theme starts.

`status: draft` stays while I'm writing, and goes when the article is ready.

## Editing after publication

Typos and broken links, I just fix. If I change what an article says, I add a horizontal rule and a dated note in italics at the very end, after the sources:

```md
---

*Edited on 2026-08-08: added a note on rollback in change management, and a section on managing people across cultures.*
```

## My checklist before publishing

- Is the point clear by the end of the first paragraph?
- Does every heading say something?
- Is there at least one real scene?
- Any em dashes, filler words or British spellings left?
- Is it "squad" and "one to one" everywhere?
- Does every factual claim have a source, and did I open every link?
- Is there a link to a related article? Should an older one link to this one?
- Anything confidential, or anyone recognizable?
- Does the excerpt make sense without the article?
- Does `npm run test:spelling` pass? New proper names go in `cspell.json`.
- Is `status: draft` gone, and is the date set to the next publishing Monday?

## Why write this down

None of this is meant to be followed to the letter. It's mostly a description of habits I already had, so that the next article sounds like it was written by the same person as the previous ones. Which, hopefully, it was.

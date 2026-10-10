---
title: Markdown example
date: 1970-01-01
excerpt: A sample article showing the Markdown features an article can use, from headings and lists to tables, images, captions and code.
tags: [example]
status: draft
---

This article is a reference for writing articles. It shows how each Markdown feature renders on the site, so a new one can be checked here before being used for real. Like the [charts example](/articles/charts-example), it's a draft: it only shows up when the `displayDrafts` flag is on.

## Text formatting

A paragraph is plain text. Within it, you can use **bold**, *italic*, ***bold and italic***, ~~strikethrough~~ and `inline code`. The typographer turns "straight quotes" into curly ones, -- into an en dash, --- into an em dash, and ... into an ellipsis. It also converts (c), (tm) and (r).

A single line break inside a paragraph
is ignored, so long sentences can be wrapped in the source file without changing the result.

## Links

- An internal link: [read the articles](/articles).
- An external link: [the Markdown guide](https://www.markdownguide.org/basic-syntax/).
- A link with a title, shown on hover: [markdown-it](https://github.com/markdown-it/markdown-it "The parser used by this site").
- A bare URL, linked automatically: https://teddygandon.github.io
- A reference-style link, defined at the end of the file: [CommonMark][commonmark].

## Headings

The article title is the only `h1`. Sections start at `##`.

### Third level heading

Used for sub-sections, like this one.

#### Fourth level heading

Rarely needed, but available.

## Lists

An unordered list:

- First item
- Second item, with a nested list:
  - Nested item
  - Another nested item
- Third item

An ordered list:

1. Set the expectations
2. Agree on the goals
3. Follow up in one to ones:
   1. What went well
   2. What could go better

A list item can also hold several paragraphs:

- **Psychological safety.** People only try things and make mistakes in public when they feel it's safe.

  This second paragraph belongs to the same item.

- **Clarity.** Everyone knows what is expected of them.

## Quotes

> The best way to find out if you can trust somebody is to trust them.
>
> — Ernest Hemingway

Quotes can be nested, and hold other elements:

> A quote with a list:
>
> - one point
> - another point
>
> > And a nested quote.

## Images and captions

An image, with its alt text for screen readers. A line in italics directly below it, without a blank line in between, is styled as its caption:

![Diagram of an engineering manager leading two squads and a platform team](/articles/markdown-example/team-topology.svg "Team topology")
*A typical setup: one manager, two product squads and a platform team.*

## Tables

Columns can be aligned left, centered or right with the colons in the separator line:

| Practice           | Frequency | Time spent |
| :----------------- | :-------: | ---------: |
| One to ones        |  Weekly   |      30 min |
| Squad retrospective | Biweekly |       1 h |
| Career review      | Quarterly |       1 h 30 |
| Skip-level meeting | Monthly   |      45 min |

Cells can hold inline formatting:

| Signal                 | Meaning                         |
| ---------------------- | ------------------------------- |
| **Silence** in reviews | Often a sign of *low safety*    |
| `git blame` jokes      | Check the team's ~~mood~~ trust |

## Code

Inline code looks like `npm run build`. A code block uses three backticks, with an optional language:

```js
export function getArticles() {
  return articles.filter((article) => article.date <= today);
}
```

```bash
npm install
npm run dev
```

## Horizontal rule

Three dashes on their own line separate two parts of an article.

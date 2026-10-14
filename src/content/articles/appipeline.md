---
title: Appipeline, or the frictions of applying for a job
date: 2026-10-14
excerpt: Applying for a job is mostly the same edit, made again for every offer, under filters you can't see. Appipeline is the open-source tool I built to remove that friction, so the time goes into the part that needs a human.
tags: [ai, tools, coding]
---

![Appipeline logo](/articles/appipeline/logo.svg "Appipeline")

Applying for a job looks like one task. In practice, it's the same handful of small edits, made again for every offer: reword the profile, move the right experience to the top, swap the skills around, check that the page still fits, write a cover letter that doesn't sound like the last one, then an email that doesn't sound like the cover letter. None of it is hard. All of it adds up, and it's exactly the kind of work that gets worse the more often you do it.

I just released [Appipeline](https://github.com/TeddyGandon/appipeline), an open-source tool that takes a job offer pasted into a GitHub issue and turns it into a tailored resume, a matching cover letter and an application email, committed as one-page PDFs and linked back on the issue. This article isn't a tour of the features. It's about the frictions it removes, because that's how it was designed: one friction at a time.

## The resume is a source file, not a document

The first friction is the file itself. A resume in a word processor gets copied for every application, and after a while you have a folder of near-identical files, each with a slightly different version of the same sentence, and no idea which one holds the best wording. Fix a typo in one, and it lives on in the others.

So in Appipeline, there's one master resume, a single HTML page with no build step and no framework. Every application starts from a copy of it, never from a previous application. The page carries its own rules in a comment at the top, a tailoring guide that the AI reads before touching anything. Blocks marked `data-tailorable="true"` (the profile, the experience highlights, the skills, the side projects) can be reworded, reordered and trimmed. Blocks marked `data-tailorable="false"` (identity, education, languages) can't. **Facts never change: employers, roles, dates and diplomas stay exactly as they are, and nothing gets invented.**

That split is the whole idea. Tailoring a resume is choosing what to emphasize, not rewriting who you are, and the markup is where that line is drawn.

## Write for the filter first

The second friction is that the first reader of a resume is often not a person. Applicant tracking systems (ATS) sort applications before anyone opens them, and they tend to look for the words of the job description, not for an equivalent you'd find natural.

The cost of missing those words is real. In Harvard Business School's Hidden Workers research, 88% of employers agreed that qualified high-skill candidates get vetted out of their process because they don't match the exact criteria of the job description (1). You can have done the job and still fail on vocabulary.

Rewording a resume to echo the offer is tedious, and it's the first corner that gets cut when applications pile up. It's also the part an AI does well. The resume prompt asks it to reuse the priorities and the key words of the offer, reorder the highlights so the most relevant ones come first, and drop the side projects that don't matter for this role. The filter gets its words. The facts underneath don't move.

## Then sound like a human

The third friction pulls the other way. Once AI writes your cover letter, it tends to sound like everyone else's cover letter. Recruiters read a lot of them, and the tells are easy to spot: "I am writing to express my interest", "passionate", "proven track record", three adjectives in a row.

AI detectors don't make this easier, and they don't treat everyone the same. Weixin Liang and colleagues at Stanford tested seven of them on essays written by non-native English speakers for the TOEFL: the detectors flagged 61% of them as AI-generated on average, and 97.8% were flagged by at least one detector (2). Simple, careful writing in a second language looks machine-made to a machine. That's a strange filter to put between a candidate and a job.

So the prompts for the cover letter and the email spend as many lines on how not to write as on what to write. First person, direct, like an email to a future colleague rather than a sales pitch. Vary the sentence length. No bullet lists, no em dashes, no rhetorical questions. A list of banned phrases, from "I am writing to express my interest" to "fast-paced environment". And a last instruction: reread the result and rewrite every sentence that could be sent to any company.

## One page, and it stays one page

The fourth friction is the dullest and the most stubborn. You reword one bullet point, and the resume spills onto a second page by two lines. The fonts on the recruiter's machine aren't yours, and the layout moves. Export from a browser, and the margins change.

Appipeline exports every document with a headless Chrome, using the page's own A4 rule and self-hosted fonts, and it reports the page count. With `--strict`, the export fails when a document goes over one page, and the resume prompt tells the AI to check that and trim until it fits. The page limit stops being something I notice at the last minute and becomes a test that has to pass.

## The issue is the tracker

The fifth friction is keeping track. After a few weeks, you've applied in a dozen places, and you no longer remember which version of the resume went where, or what you wrote in the email.

Running the whole thing from GitHub issues solves that for free. One issue per job offer, with the company, the title and the full description in a form. The labels choose which documents to generate. When the workflow is done, the documents are committed and linked in a comment on the issue, with the text of the email right there. The list of issues is the list of applications, and closing one is as good a status as any spreadsheet column.

If GitHub isn't your thing, the prompts work locally too, with any coding agent: a small script fills a prompt template with the fields of the offer, and you hand it to Claude Code, Copilot CLI or Codex.

## Don't trust the job offer

The last friction is the easiest to miss. The workflow runs an AI agent with its tools enabled on text pasted from a job offer, and that text is untrusted. A job offer can hide instructions aimed at AI agents, the same way a web page can. Kai Greshake and colleagues showed in 2023 how this kind of indirect prompt injection can take over applications that feed outside content to a model (3).

Simon Willison calls the dangerous combination the lethal trifecta: an agent with access to private data, exposed to untrusted content, and able to communicate with the outside (4). A resume generator ticks all three boxes. Your resume is the private data, the job offer is the untrusted content, and the agent has web access.

I can't make that risk disappear, so the design keeps it small. Only the repository owner can trigger the workflow. The agent can't commit or push: the workflow commits the one file it expects, after the agent is done. The tokens are scoped to what the job needs. And the README says it plainly: your copy holds personal data, so keep it private, and review every document before you send it.

## A few more things I've learned

**Keep the human step.** The tool writes drafts, not applications. Every document goes through me before it goes anywhere, and that review is where the time it saves should go.

**Write the rules where the work happens.** The tailoring guide lives in the resume itself, not in a separate document. Whoever edits the page, a person or an agent, reads the rules first.

**Ban the words, not the tool.** Telling a model what not to sound like turned out to be more effective than telling it what to sound like. It works on people too.

## What it comes down to

None of these frictions is a big problem on its own. A file to copy, a few words to swap, a page that overflows, a list to keep up to date. But they come back with every single application, and they eat the attention that should go into the parts that matter: picking the right offers, and preparing for the conversations that follow.

It's the same thing I look for when I bring AI into my own work, as I wrote about in [using AI tools for managing](/articles/using-ai-tools-for-managing): not a tool that thinks for me, but one that takes the repetitive part off my plate and leaves the judgment where it belongs. **Appipeline doesn't apply for you. It removes everything around applying that doesn't need you.**

It's MIT-licensed and on [GitHub](https://github.com/TeddyGandon/appipeline). Fork it, make the resume yours, and tell me what friction I missed.

## Sources

- (1) Joseph B. Fuller, Manjari Raman, Eva Sage-Gavin, Kristen Hines, 2021, [Hidden Workers: Untapped Talent](https://www.hbs.edu/managing-the-future-of-work/research/Pages/hidden-workers-untapped-talent.aspx), *Harvard Business School and Accenture*
- (2) Weixin Liang, Mert Yuksekgonul, Yining Mao, Eric Wu, James Zou, 2023, [GPT detectors are biased against non-native English writers](https://arxiv.org/abs/2304.02819), *Patterns*
- (3) Kai Greshake, Sahar Abdelnabi, Shailesh Mishra, Christoph Endres, Thorsten Holz, Mario Fritz, 2023, [Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection](https://arxiv.org/abs/2302.12173), *arXiv*
- (4) Simon Willison, 2025, [The lethal trifecta for AI agents: private data, untrusted content, and external communication](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)

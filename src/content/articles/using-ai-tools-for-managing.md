---
title: Using AI tools for managing
date: 2026-09-14
excerpt: AI is genuinely useful for management work, but only once you stop feeding it generic prompts and start feeding it the same discipline you'd apply to a codebase. Curated artifacts, and narrow, single-purpose skills instead of one do-everything assistant.
tags: [ai, management, tools]
---

Every manager I know is now using some form of AI, and almost every one of them is disappointed with it in the same way: the output sounds plausible, reads well, and is subtly wrong about the thing that actually mattered in the room. Surprisingly enough, it's not a model problem but usually **an input problem**. The teams I've seen get real leverage from AI treat it the way we treat any system with weak defaults: they control what goes in, and they scope what it's allowed to do. Two disciplines, both familiar from engineering, both usually skipped when the same person puts on their "manager" hat.

## Feeding it the right artifacts

The first discipline is about what you hand the model in the first place.

**Meeting notes stay hand-crafted.** I don't let an AI generate my 1:1 or incident-review notes from a transcript, and I'd push back on anyone who does it by default. Not out of distrust of the technology, but because summarization is compression, and compression is lossy in a specific, dangerous way: it keeps the sentence and drops the tone it was said in, the thing that got raised and then walked back, the hesitation before someone agreed to a deadline (1). Those are usually the parts that matter most six weeks later. Writing the notes myself, even briefly, is the moment I actually process what happened in the room. An AI can help me turn rough notes into something shareable afterward but that's a formatting task, not a listening task.

**Production excerpts and snapshots, not descriptions of production.** When I want an AI's help reasoning about a system issue, an incident, or a delivery risk, I feed it the actual excerpt (the real ticket, the real snapshot, the real diff) not my paraphrase of it. Every layer of paraphrasing between the source and the model is another chance for the interesting detail to get flattened into something generic. This is the same principle as grounding a model against real, current data instead of letting it fill gaps with statistically plausible guesses (2): the artifact is the guardrail.

**Integrated follow-up, not a floating chat log.** Insight that stays inside a chat window is insight that gets lost. Whatever an AI helps me think through (a retro theme, a risk in a delivery plan, a pattern across incidents) needs to land in the system the team already lives in: a Jira ticket, a linked comment, a decision recorded where the next person doing the work will actually see it. Otherwise you've built a second, invisible backlog that only you know about.

## Building narrow skills, not one assistant that does everything

The second discipline is about scope, and it's the one I see teams get wrong more often. The instinct is to configure one big "management assistant" and point it at everything: 1:1 prep, roadmap risk, hiring, retro synthesis. It's the same mistake as one god-class handling every responsibility in a codebase: technically works, quietly gets worse at all of it as you keep bolting things on.

What's worked for me instead is a set of narrow, single-task skills: one for surfacing patterns across a specific team's incident history, one for drafting a specific kind of async update, one for checking a delivery plan against a specific set of failure modes I've been burned by before. Each does one job well because it isn't also trying to do four others. The practical guidance on agent skills lands on roughly the same number: past two or three skills loaded onto one task, you get cognitive overhead and conflicting instructions instead of added capability, and skills built for one workflow actively mislead the model when applied to another (3). There is no skill that is a silver bullet across hiring, incident response, and roadmap planning at once and building one that tries is how you end up with an assistant that's mediocre at everything instead of sharp at anything.

## What this actually buys you...

None of this makes AI a replacement for judgment and **it was never going to be**. What it buys is time back on the parts of the job that were always mechanical: turning notes into something shareable, drafting the first version of an update, spotting a pattern across a dozen tickets you'd otherwise have to reread by hand. The discipline is the same one we already apply to software: control your inputs, scope your tools narrowly, and don't trust a system with more responsibility than it's earned.

## ...and why do I need AI now

As my responsabilities are growing and my scope is getting larger, I just needed something: time. Investing time in creating skills and refining them was in fact a time saver. But not only; the context switching is real when you are managing several squads and nothing is more energy-intensive than the context switching.

Nowadays, I am using them for:
- Surfacing the problems by grouping sources
- Comparing states to track down progresses
- Identifying the successes of my teams (and **celebrating it!**)
- Creating a short report to the reporting line with no effort
- Reducing the lag between the sources and my brain

## Sources

- (1) [Your AI Meeting Notes Are Losing Context](https://84em.com/blog/your-ai-meeting-notes-are-losing-context/)
- (2) [What is grounding in AI and how to implement it effectively](https://monday.com/blog/ai-agents/ai-grounding/)
- (3) [Building skills for AI agents: pitfalls and best practices — Red Hat Emerging Technologies](https://next.redhat.com/2026/07/28/building-skills-for-ai-agents-pitfalls-and-best-practices/)

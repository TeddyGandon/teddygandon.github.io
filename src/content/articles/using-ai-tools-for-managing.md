---
title: Using AI tools for managing
date: 2026-10-26
excerpt: AI is genuinely useful for management work, but only once you stop feeding it generic prompts and start feeding it the same discipline you'd apply to a codebase. Curated artifacts, and narrow, single-purpose skills instead of one do-everything assistant.
tags: [ai, management, tools]
---

Every manager I know is now using some form of AI, and almost every one of them is disappointed with it in the same way: the output sounds plausible, reads well, and is subtly wrong about the thing that actually mattered in the room. Surprisingly enough, it's not a model problem but usually **an input problem**. The teams I've seen get real leverage from AI treat it the way we treat any system with weak defaults: they control what goes in, and they scope what it's allowed to do. Two disciplines, both familiar from engineering, both usually skipped when the same person puts on their "manager" hat.

## Feeding it the right artifacts

The first discipline is about what you hand the model in the first place.

**Meeting notes stay hand-crafted.** I don't let an AI generate my one to one or incident-review notes from a transcript, and I'd push back on anyone who does it by default. Not out of distrust of the technology, but because summarization is compression, and compression is lossy in a specific, dangerous way: it keeps the sentence and drops the tone it was said in, the thing that got raised and then walked back, the hesitation before someone agreed to a deadline (1). Those are usually the parts that matter most six weeks later. Writing the notes myself, even briefly, is the moment I actually process what happened in the room. An AI can help me turn rough notes into something shareable afterward but that's a formatting task, not a listening task.

**Production excerpts and snapshots, not descriptions of production.** When I want an AI's help reasoning about a system issue, an incident, or a delivery risk, I feed it the actual excerpt (the real ticket, the real snapshot, the real diff) not my paraphrase of it. Every layer of paraphrasing between the source and the model is another chance for the interesting detail to get flattened into something generic. This is the same principle as grounding a model against real, current data instead of letting it fill gaps with statistically plausible guesses (2): the artifact is the guardrail.

**Integrated follow-up, not a floating chat log.** Insight that stays inside a chat window is insight that gets lost. Whatever an AI helps me think through (a retro theme, a risk in a delivery plan, a pattern across incidents) needs to land in the system the team already lives in: a Jira ticket, a linked comment, a decision recorded where the next person doing the work will actually see it. Otherwise you've built a second, invisible backlog that only you know about.

## Building narrow skills, not one assistant that does everything

The second discipline is about scope, and it's the one I see teams get wrong more often. The instinct is to configure one big "management assistant" and point it at everything: one to one prep, roadmap risk, hiring, retro synthesis. It's the same mistake as one god-class handling every responsibility in a codebase: technically works, quietly gets worse at all of it as you keep bolting things on.

What's worked for me instead is a set of narrow, single-task skills: one for surfacing patterns across a specific team's incident history, one for drafting a specific kind of async update, one for checking a delivery plan against a specific set of failure modes I've been burned by before. Each does one job well because it isn't also trying to do four others. The practical guidance on agent skills lands on roughly the same number: past two or three skills loaded onto one task, you get cognitive overhead and conflicting instructions instead of added capability, and skills built for one workflow actively mislead the model when applied to another (3). There is no skill that is a silver bullet across hiring, incident response, and roadmap planning at once and building one that tries is how you end up with an assistant that's mediocre at everything instead of sharp at anything.

## Inside one skill: comparing states

To make this less abstract, here is one of them, rebuilt for this article. It's the one behind "comparing states" in the list at the end, and probably the one I use the most.

The problem it solves is simple. Every week, I look at the same things at two different moments: a squad's board, a roadmap, the results of a health check. What I want to know is not where things are, the board already tells me that. It's what moved since last time, what didn't, and what quietly changed shape. Doing it by hand means opening two exports side by side and reading them line by line, which is exactly the kind of mechanical work I don't want to spend an hour on. It's also the measurement I described in [a framework for management](/articles/a-framework-for-management): the interesting signal is in the transitions between states, not in the final "Done".

Skills follow an open format: a folder with a `SKILL.md` file, a short header saying what the skill does and when to use it, and the instructions below it (4). The header is what the assistant reads to decide whether the skill is relevant, so it has to be precise. The instructions are only loaded when the skill is actually used. For the output, I borrowed the idea of the weekly update skill Anthropic published as an example: a fixed format, a few sentences per section, something you can read in under a minute (5).

Here is the skill:

```md
---
name: compare-states
description: >
  Compares two snapshots of the same scope (board export, roadmap,
  health check results) taken at two dates, and reports what moved,
  what stalled and what changed. Use when the user provides two exports
  or snapshots and asks what changed or progressed between them.
---

# Compare states

## Inputs
Two snapshots of the same scope, each with its date. If a date is missing, or if
the snapshots don't cover the same scope (another squad, other filters, other
columns), stop and say so before comparing anything.

## Steps
1. Match items between the two snapshots by their ID, never by their title.
2. Put every item in exactly one group:
   - Moved forward: its status advanced.
   - Moved back: its status went backwards, or it was reopened.
   - Stalled: same status in both snapshots.
   - Added: only in the newer snapshot.
   - Removed: only in the older snapshot.
3. List what changed shape: new estimate, new due date, new owner,
   split or merged items.
4. For stalled items, say how long they've been in that status,
   if the data allows it.

## Output
- First, one line of numbers: moved forward, moved back, stalled, added, removed.
- Then one short section per group, each item with its ID.
- End with "Questions to ask": 3 to 5 questions the data raises but can't answer.

## Rules
- Only use what is in the snapshots. If something can't be computed, say so.
- Report on work items, never on people. Don't rank, score or compare individuals,
  even when the snapshots contain assignees.
- No conclusions about why something stalled. That's what the questions are for.
```

A few lines in there matter more than they look.

Matching by ID sounds like a detail, but titles get renamed all the time. Compare by title, and a renamed ticket shows up as one item removed and one added, and the summary announces a scope change that never happened.

The "Questions to ask" part is the one I care about most. The skill doesn't tell me why something has been stalled for three weeks, because it can't know. Maybe the squad is waiting on another team, maybe the ticket was badly split, maybe someone is having a hard time. What it gives me is the list of questions to bring to the next planning or the next one to one. The analysis stays mine. The skill just makes sure I don't forget to ask.

And the rule about people is not a detail either. A board export contains assignees, and nothing would be easier than asking the model who moved the most tickets this week. That's a number I don't want to exist, for the reasons in the next section.

## What I don't use AI for

There's one line I don't cross, and it's about people.

I don't use AI to evaluate anyone. No performance review drafted from someone's tickets, no feedback written by a model, no summary of who's doing well and who isn't, no help on promotion, compensation or hiring decisions. These are the decisions that change someone's working life, and they depend on exactly what a model doesn't see: the context, the week someone had, everything they did that never showed up in a ticket. If I can't explain a decision about a person with my own words and my own observations, I'm not ready to make it.

I'm not the only one drawing that line. The EU AI Act classifies AI systems used to make decisions on promotion or termination, or to monitor and evaluate the performance and behavior of workers, as high-risk (6). Before that, the GDPR already gave people the right not to be subject to a decision based solely on automated processing (7). Asking a chat assistant to write a performance review is not necessarily illegal. But if the law considers this use risky enough to regulate, I'm not going to treat it as a shortcut.

Then there's what I never paste into a model: what people share with me in confidence. Health, family situations, someone telling me they're thinking about leaving, a conflict between two people. People tell these things to their manager because they trust it stays with their manager. Sending it to a tool, however secure, is not what they agreed to.

And I don't let it speak for me when the moment needs me. Congratulating someone, announcing bad news, answering someone who is upset. An AI can help me check that a written announcement is clear, but the words have to be mine. People notice when they aren't, and they're right to care.

## What this actually buys you...

None of this makes AI a replacement for judgment and **it was never going to be**. What it buys is time back on the parts of the job that were always mechanical: turning notes into something shareable, drafting the first version of an update, spotting a pattern across a dozen tickets you'd otherwise have to reread by hand. The discipline is the same one we already apply to software: control your inputs, scope your tools narrowly, and don't trust a system with more responsibility than it's earned.

## ...and why do I need AI now

As my responsibilities are growing and my scope is getting larger, I just needed something: time. Investing time in creating skills and refining them was in fact a time saver. But not only; the context switching is real when you are managing several squads and nothing is more energy-intensive than the context switching.

Nowadays, I am using them for:
- Surfacing the problems by grouping sources
- Comparing states to track down progresses (the skill above)
- Identifying the successes of my teams (and **celebrating it!**)
- Creating a short report to the reporting line with no effort
- Reducing the lag between the sources and my brain

## Sources

- (1) [Your AI Meeting Notes Are Losing Context](https://84em.com/blog/your-ai-meeting-notes-are-losing-context/)
- (2) [What is grounding in AI and how to implement it effectively](https://monday.com/blog/ai-agents/ai-grounding/)
- (3) [Building skills for AI agents: pitfalls and best practices — Red Hat Emerging Technologies](https://next.redhat.com/2026/07/28/building-skills-for-ai-agents-pitfalls-and-best-practices/)
- (4) [Agent Skills, Specification](https://agentskills.io/specification)
- (5) [Anthropic, internal-comms skill and its 3P updates example](https://github.com/anthropics/skills/tree/main/skills/internal-comms)
- (6) [Regulation (EU) 2024/1689, the AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj), Annex III, point 4: employment and workers management
- (7) [Regulation (EU) 2016/679, the GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj), Article 22: automated individual decision-making

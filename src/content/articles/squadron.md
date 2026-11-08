---
title: Squadron, or why agents don't fix poor requirements
date: 2026-11-02
excerpt: I built Squadron to find out whether three AI agents, a coder, a reviewer and a tester, could do the job of an engineering squad. By the fifth ticket, quality was dropping. Writing the code was never the hard part.
tags: [ai, coding, tools]
---

<img alt="Squadron logo" src="/articles/squadron/logo.svg" style="max-width:800px" class="mb-4" />

Can AI agents replace an engineering squad? It's the question behind half the headlines about AI in software, and I was tired of reading opinions about it, mine included. So I built an experiment to find out.

[Squadron](https://github.com/TeddyGandon/squadron) is a GitHub template where three agents share the work of a squad. A coder implements each ticket, a reviewer enforces quality, security and architecture rules, and a tester writes and runs tests against the functional requirements. When a review or a test fails, the work goes back to the coder automatically. The loop worked. The result wasn't the one the headlines promise: **agents don't fix poor requirements.** By the fifth ticket, code quality had degraded and regressions were showing up.

## A squad, minus the people

I built Squadron the way I'd organize a squad, because I wanted the agents to have a fair chance. Each ticket starts as an issue written from a form (feature, technical task or bug) that asks for the problem, the expected behavior and the acceptance criteria. Applying the `status:todo` label hands it to the coder, which implements it and opens a pull request. The reviewer reads the diff against the issue and posts a verdict. If it passes, the tester writes tests, runs them and merges. If not, the pull request goes back to the coder with the review or the failing test log, and the cycle starts again.

Three roles instead of one isn't decoration. Models are biased judges of their own work: Arjun Panickssery, Samuel Bowman and Shi Feng showed that LLMs recognize their own outputs better than chance, and that the better a model recognizes its own text, the more it favors it when asked to evaluate (1). One agent writing, reviewing and testing its own code is a developer approving their own pull request. No squad I've run would accept that.

All three roles run on the same model, so the independence had to come from somewhere else: from what each role is allowed to see. The tester gets the issue and nothing more. Not the README, not the pull request description, not the coder's summary of what it did. A tester who reads the developer's explanation tests what was built instead of what was asked. Agents also have a habit Victoria Krakovna and her colleagues at DeepMind call specification gaming: satisfying the letter of an objective instead of its intent (2). "Make the tests pass" has an obvious loophole, which is to weaken the tests. So the tester can't, and the workflow runs the tests again itself before merging.

On paper, it was a well-run squad: clear roles, independent checks, explicit handoffs and a way back when something fails.

## By the fifth ticket, it fell apart

The loop itself did its job. Tickets went from issue to pull request to review to tests without anyone touching them, and the rework cycle sent failures back to the coder the way it should.

What went wrong was everything around the code. By the fifth ticket, quality had visibly degraded, and changes started breaking things that earlier tickets had delivered. No single step had failed. The coder implemented what the issue said, the reviewer checked the diff against the issue, the tester tested what the issue described. **Each agent was right about its own ticket, and the product was still getting worse.**

My reading of why is simple. Every role treats the issue as the only source of truth, which is exactly how I designed it. So wherever the issue was vague, each agent filled the gap with its own reasonable guess. One guess is harmless. Five tickets of guesses, made by agents that don't remember the previous tickets and don't share a picture of the system, don't add up to a design. And since the tester only checks what the current issue asks for, nothing protects what the previous issues assumed.

I'm not the only one seeing this shape. The 2024 DORA report found that AI adoption improves individual productivity, flow and job satisfaction, but is associated with lower software delivery stability and throughput (3). Writing more code faster doesn't make a system more stable. Without something holding it together, it does the opposite.

## Agents don't ask what you meant

In a squad, a vague ticket rarely stays vague for long. Someone reads it, frowns, and comes to ask what you meant. Or they push back in refinement, or they notice during implementation that it conflicts with something built last month. That friction is annoying, and it's also how most requirement gaps get caught.

Agents don't do that. They don't push back, and they don't come and ask. They take the ticket as it is, fill in the blanks and move on, faster than any person would. **Without rigorous technical scoping, agents get clueless fast**, and they stay confident while they do.

That changes where the work is. With a human squad, a decent ticket plus good conversations was often enough. With agents, the ticket is the whole conversation. Architecture constraints, edge cases, what must not change, how this feature relates to the others: if it isn't written down, it doesn't exist.

## Writing code is the easy part

None of this surprised me as much as it confirmed something I already believed. In 1986, Fred Brooks wrote that "the hardest single part of building a software system is deciding precisely what to build" (4). Forty years and a lot of tooling later, that sentence is still true, and the experiment made it hard to ignore.

Writing code is the easy part, and honestly the most dehumanizing one when it's all you're asked to do. Defining the problem and solving it is where the engineering happens. AI doesn't change that. If anything, it makes scoping even more critical, because the code that follows a bad scope now arrives in minutes instead of days.

That's a core belief of mine: developers write code, engineers solve problems. Software has long been the exception where we expected the same person to do both, all the time. We wouldn't ask a civil engineer to lay the bricks and build the skyscraper by themselves. We ask them to conceive it and design it, and we expect the design to be good enough that the people building it don't have to guess. Agents put us in the same position. It's a good reason to take the engineer's half of the job seriously.

## What the plumbing taught me

The experiment was about requirements, but building it taught me a few things about running agents in a pipeline.

**An agent's answer is input, not a result.** The reviewer was supposed to return a JSON verdict. The first version asked it to write the JSON to a file, the next one asked it to return only JSON, and neither fully held. The fix was a small script that looks for the first valid verdict in the answer and fails the run when there isn't one. The workflow also fails if the reviewer touched a single file, since its job is to read.

**Keep the keys out of the agent's hands.** The agents run with their tools enabled, but the token that can push, comment and merge never reaches them. The workflow does that itself, after the agent is done. Issue text is treated as untrusted input, for the same reasons I gave in the [Appipeline article](/articles/appipeline).

**Write what each role can't do.** The prompts spend as many lines on limits as on tasks: the reviewer doesn't edit, the tester doesn't touch the product code, the coder doesn't push or merge. A role is defined by its boundaries as much as by its job.

**Keep the start human.** Nothing happens until someone applies `status:todo`. Deciding what's worth building, and when, isn't something I'd hand to the pipeline, and after this experiment I'm even less tempted to.

## What it comes down to

So, can AI agents replace an engineering squad? They can replace the typing. They didn't replace the part of the squad that decides what to build, notices when two tickets don't fit together, and remembers why the system looks the way it does.

There's a quieter loss too. Alberto Bacchelli and Christian Bird found that developers expect code review to catch defects, but that its main outcomes are knowledge transfer, team awareness and better alternatives (5). An agent reviewer catches some defects. It doesn't leave anyone on the squad understanding the code better, and that shared understanding is what was missing by the fifth ticket.

It's the same line I keep coming back to, from [why I still code](/articles/why-do-i-still-code) to [using AI tools for managing](/articles/using-ai-tools-for-managing): the tools are useful when they take the repetitive part, and risky when they take the understanding with it. **Agents can write the code. Someone still has to be the engineer.**

Squadron is on [GitHub](https://github.com/TeddyGandon/squadron). Use it as a template, give it your best-scoped issues, and tell me how far you get before it breaks.

## Sources

- (1) Arjun Panickssery, Samuel R. Bowman, Shi Feng, 2024, [LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076), *arXiv*
- (2) [DeepMind, 2020, Specification gaming: the flip side of AI ingenuity](https://deepmind.google/discover/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)
- (3) [DORA, 2024, Accelerate State of DevOps Report](https://dora.dev/research/2024/dora-report/)
- (4) Frederick P. Brooks, Jr., 1987, [No Silver Bullet: Essence and Accidents of Software Engineering](https://www.cgl.ucsf.edu/Outreach/pc204/NoSilverBullet.html), *IEEE Computer*: first presented in 1986, published in IEEE Computer in April 1987
- (5) Alberto Bacchelli, Christian Bird, 2013, [Expectations, Outcomes, and Challenges of Modern Code Review](https://www.microsoft.com/en-us/research/publication/expectations-outcomes-and-challenges-of-modern-code-review/), *ICSE*

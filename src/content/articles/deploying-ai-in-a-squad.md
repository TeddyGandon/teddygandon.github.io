---
title: Deploying AI in a squad, without forgetting the brains
date: 2026-11-23
excerpt: Rolling out AI tools in a squad is usually treated as a tooling project. It's a human one. Engineers won't embrace something they feel threatened by, and the fatigue that comes with it is individual, quiet, and something no dashboard will show you.
tags: [ai, management, mental-health]
---

When I introduced AI-assisted engineering in my squads, the technical part was the easy one. Pick the tools, sort out the licenses, write a few guidelines about what can and can't be sent to a model, done in a couple of weeks. What took much longer, and what I'm still working on, is everything that happens in people's heads once the tools are there. That part doesn't show up in any adoption metric, and it's the part that decides whether the rollout actually works.

I wrote about [how I use AI for my own management work](/articles/using-ai-tools-for-managing). This one is about the squad: what it does to the people who use it every day, and what a manager should be watching.

## First, make people feel secure

This is the most important point, and if you only keep one thing from this article, keep this one: engineers won't embrace AI if they feel threatened by it.

And many of them do feel threatened, even when they don't say it. The news around AI is mostly about jobs disappearing, and the people in your squad read it too. Pew Research found that American workers are more worried than hopeful about how AI will be used in their workplace (1). Then their manager shows up with a new tool and a presentation about productivity gains. You can guess what goes through their mind, whatever you actually said.

Someone who feels their job is at stake doesn't experiment. They either avoid the tool, or they use it quietly and never admit when it fails them, because admitting it feels like admitting they're the problem. Both are bad for the squad. It's the same thing I wrote about in [turning engineers into managers](/articles/turning-engineers-into-managers): people only speak up, try things and make mistakes in public when they feel it's safe to do so.

So before any rollout, I say out loud what the tools are for and what they are not for. They're here to remove the boring parts of the job, not to reduce the squad. Nobody gets evaluated on how much they use them. Saying "this didn't work for me" is a valid outcome, and an interesting one. It sounds obvious, but if you don't say it, people fill the silence with the worst version.

It also means being careful with what you measure. The moment AI usage becomes a number someone looks at in a review, people optimize the number, and you lose the honest signal you actually needed. A metric that becomes a target stops being a good metric, and AI usage is no exception.

## Watch individuals, not the group

Adoption dashboards will tell you that 90% of the squad uses the tools. That number tells you almost nothing about how people are doing. AI fatigue is real, and it's individual: two engineers with exactly the same usage can be in completely different places. So I look at people one by one, in one to ones, not at the squad as a whole.

There are two things I specifically watch for.

### The feeling of deskilling

The first is the feeling of losing skills, what some people now call cognitive atrophy. It usually comes out as a joke at first: "I'm not sure I could still write this without the assistant." Then one day it's not a joke anymore.

That feeling is not imaginary. Microsoft Research surveyed knowledge workers and found that the more people trusted generative AI, the less critical thinking they reported putting into their work (2). Anthropic ran a study with mostly junior developers learning a new library: those using AI scored 17% lower on a quiz about the concepts they had just used a few minutes before (3). None of this is new, by the way. In 1983, Lisanne Bainbridge was already describing the "ironies of automation": the more you automate, the less practice people get at exactly the skills they'll need when the automation fails (4).

The interesting detail in the Anthropic study is that it depended on how people used the tool. The developers who asked follow-up questions and requested explanations kept much more of what they learned. So the answer is not to stop using AI. It's to notice who is using it to understand and who is using it to avoid understanding, and to talk about it before it becomes a confidence problem.

### The switch from writing code to reading it

The second thing is less talked about. With AI, the job slowly moves from writing code to reading it: reviewing what the assistant produced, checking it, understanding code you didn't write. That's not the same work, and every engineer who has inherited a legacy codebase knows that reading code is harder than writing it. It's not just a feeling: an MIT fMRI study found that understanding code relies mostly on the brain's general executive regions, the ones used for problem solving and holding several things in mind at once, not on the language network (5). Reading someone else's code, all day, uses the brain differently than writing your own.

On top of that, the work becomes more fragmented: prompt, wait, read, correct, prompt again. We tend to compensate for that kind of fragmented work by going faster, and we pay for it in stress and tiredness. That's exactly what I see in engineers who are tired without being able to explain why. They didn't work more hours. They switched modes a hundred times a day.

The METR study on experienced open-source developers adds a twist: with AI tools, they were 19% slower on their tasks, while believing they had been 20% faster (6). I don't take that as a proof that AI slows everyone down, the tools have moved a lot since then. I take it as a reminder that people's own perception of how AI affects them is not reliable. Which is one more reason to ask, and to listen carefully.

### The best moment to ask: coming back from holiday

I've found that the best moment to assess how someone is really doing is when they come back from holiday. During a normal week, people are in the flow and don't notice their own fatigue, or the habits they've slipped into. After two weeks off, the contrast is visible, to them first. Some come back and realize how tired they were. Some sit in front of their editor and notice they don't know where to start without the assistant. Some come back with a fresh eye and a clear opinion about what works and what doesn't.

That window is short. A few days back at work, and the benefits of the break are already fading. So I try to have that conversation in the first days, before the routine takes over again: how did it feel to come back, what did you miss, what didn't you miss.

## Keep it human-centered

The brain is a muscle. That's true for writing code, and it's true for working with AI too: using it well is a skill that needs training, not a switch you turn on. Writing a good prompt, giving the right context, knowing when to stop and think by yourself instead of asking again: all of this is learned. I call it an AI-first hygiene. It's the same idea as the one in my [article on using AI for managing](/articles/using-ai-tools-for-managing): control the inputs, scope what you ask, review the output. Except here, it's also about protecting the brain of the person using it. Offloading thinking to a tool is natural, we've always done it with notes and calculators. The question is what you offload, and whether you still exercise what's left.

In practice, that means a few habits:

- **Ownership doesn't move.** The person who merges the code owns it, whoever wrote it. That alone changes how carefully people read.
- **Reading is budgeted as real work.** If the job becomes more reviewing, the planning has to reflect it. Otherwise people review faster, then worse, then they stop reviewing.
- **Some work stays without AI, on purpose.** Not as a rule against the tools, but as practice: a kata, a piece of the codebase someone wants to really understand, a debugging session done by hand. Like the side projects I mentioned in [why I still code](/articles/why-do-i-still-code), it keeps the muscle working.

And one assumption to drop: that the people using AI the most are the enthusiasts, and that they're fine. Heavy usage can mean enthusiasm. It can also mean pressure, fear of falling behind, or simply that someone feels they can't do their work without it anymore. The 2025 Stack Overflow survey found that more developers actively distrust the accuracy of AI tools than trust it, and that experienced developers are the most cautious (7). Most of the people using these tools every day have doubts about them. Don't confuse usage with comfort.

## Build a community, but don't confuse joining with belonging

A rollout needs momentum, and momentum comes from people, not from a license. What worked best for me is building a community around it: a channel where people share prompts and failures, short demos during seminars, people from different squads comparing how they work. The failures are the most valuable part. One person saying "it confidently invented an API that doesn't exist" does more for the squad's hygiene than any guideline.

But joining a channel is not being part of a community. Look at any channel: most members never post, a few post from time to time, and a handful write almost everything. Your AI channel will look exactly like that. The ten people who post every day are not the squad. The thirty who never say anything might be fine, might be uninterested, or might be quietly struggling and not willing to say it in front of everyone.

So the community is not a replacement for the one to ones. It creates the momentum, the one to ones tell you who is actually on board. And that last part, understanding what's going on in someone's head, is precisely the one thing AI can't do for you.

## What it comes down to

Deploying AI in a squad is a change like any other, and like any other change it goes through people before it goes through tools. Make them feel secure enough to try it and to say when it doesn't work. Watch them one by one, especially for the fatigue nobody talks about. Train the habits, not just the usage. And keep in mind that the tool is new, but the job of the manager isn't: it's still about the humans using it.

**The AI will tell you what it did. Only your people can tell you how they're doing.**

## Sources

- (1) [Pew Research Center, 2025, U.S. Workers Are More Worried Than Hopeful About Future AI Use in the Workplace](https://www.pewresearch.org/social-trends/2025/02/25/u-s-workers-are-more-worried-than-hopeful-about-future-ai-use-in-the-workplace/)
- (2) Lee et al., 2025, [The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers](https://doi.org/10.1145/3706598.3713778), *CHI 2025*
- (3) [Anthropic, How AI assistance impacts the formation of coding skills](https://www.anthropic.com/research/AI-assistance-coding-skills)
- (4) Lisanne Bainbridge, 1983, [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8), *Automatica*
- (5) Ivanova et al., 2020, [Comprehension of computer code relies primarily on domain-general executive brain regions](https://doi.org/10.7554/eLife.58906), *eLife*
- (6) METR, 2025, [Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity](https://arxiv.org/abs/2507.09089)
- (7) [Stack Overflow Developer Survey 2025, AI](https://survey.stackoverflow.co/2025/ai)

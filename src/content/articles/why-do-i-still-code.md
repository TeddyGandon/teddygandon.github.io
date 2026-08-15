---
title: Why do I still code?
date: 2026-10-26
excerpt: Engineering managers get asked constantly whether they should still code. My answer is yes, not to prove anything, but because operational context is what makes good management decisions possible, and writing code is still how I build and keep that context.
tags: [management, coding, leadership]
---

Every few months, in a hallway chat or a Slack thread, someone asks me some version of the same question: do you still code? The honest answer is yes, though a lot less than I used to, and the reasons why turned out to be more interesting to me than the question itself.

## The debate: should managers still code?

There is a whole industry of hot takes about whether engineering managers should keep writing code, and I understand why the debate exists.

On one side, many managers genuinely do not have the hours anymore. Once your calendar fills with one to ones, hiring loops, planning, and the dozens of small decisions that keep a team unblocked, the two or three uninterrupted hours a good pull request needs simply stop showing up: the two roles pull on completely different muscles, and trying to do both at full intensity at the same time usually means doing neither well. (1)

On the other side, some engineers find it genuinely strange to be led by someone who has quietly drifted out of the codebase. Not because they expect their manager to out code them, but because a manager who has not opened a terminal in a year starts making calls that sound reasonable in a meeting and slightly wrong on the ground. Google's own research into what makes managers effective found that a manager's technical ability to advise the team stayed on the list of behaviors employees actually value, even as soft skills topped it (2). Being disconnected from operational work is not a neutral state. It has a cost, and the people closest to the work are the first ones to notice it.

My own take sits closer to a different question: not should managers code, but why is it so hard for new managers to keep coding at all. In my experience, that first year of managing has little to do with a lack of technical skill and everything to do with the sheer cognitive load of learning to manage in the first place. You are learning how to run a one to one that actually helps someone, how to give feedback that lands, how to read a room in a language and a culture that might not be your own. That learning curve eats the same hours and the same mental bandwidth that used to go into code. It is not that new managers cannot code anymore. It is that they are in the middle of their own migration, and nobody ships two migrations at once.

## Management and operational work are not opposites

The debate above assumes that management and operational work sit on opposite ends of a spectrum, and the more you have of one, the less room is left for the other. I do not think that is true. They are not opposites. Management needs operational work to function at all.

A decision made without a source or a context is just a guess dressed up as a decision. If I do not understand what a migration to a new queue actually involves, what breaks, what takes a day versus three weeks, I cannot properly weigh a tradeoff someone brings to me, and I certainly cannot defend that tradeoff to my own manager or to another team. In other words, technical credibility is not about being the best engineer in the room, it is about holding enough grounding to ask the right question and recognize a bad plan when you see one. (3)

So the management needs to understand the operational work, not replicate it. In practice, that changes how I spend my attention. I get involved early, in the big picture decisions: the direction of an architecture, the tradeoff between two approaches, the risk nobody has named yet. Then I step back and let the leads run the execution, and I catch up afterward by reading the decision records they write along the way. I am not in every pull request, and I do not need to be. Reading how a decision actually got made, what was considered and rejected, keeps me close enough to the work without me having to redo any of it.

## Finding time to code

None of this answers the practical question: where does the time actually come from. For me, three (maybe four) things.

The first is automation, and yes, that still means writing code. I use AI heavily for a first pass on a lot of my own repetitive work, but I still build small in house tools when a process repeats often enough to justify it: a script that pulls a report together instead of a recurring afternoon of copy pasting between two dashboards, a bot that reminds a channel about an overdue review instead of me remembering to nag someone. Toil is toil whether it happens in a codebase or in a manager's calendar, and Google's own SRE team has spent years documenting that toil left unaddressed simply expands to fill whatever time you give it (4). Automating my own toil is the same discipline as automating a team's.

The second is rationalizing across teams. A lot of the operational load a manager carries is not one hard thing, it is the same small thing repeated five different ways because five teams each invented their own process for it. Standardizing how squads run retros, request access, or report a delivery risk removes a pile of decisions that never needed to be made five separate times. Every process I can make identical across teams is time I get back, and it is also less mental load for the people on those teams, who no longer have to remember which flavor of the process applies to them this week.

The third, and the one that took me the longest to genuinely believe, is trust. I cannot review everything, sit in on every decision, and still find two hours to write anything myself. At some point you have to trust the people you work with to run things well without you in the room, and let their outcomes prove it instead of your presence proving it for them. They are not working for me. They are working with me. That distinction sounds like a slogan until the day you actually act on it, and the two hours it frees up are the two hours I now spend at a keyboard.

The fourth is not about finding time at work at all. Some of it happens on my own time, outside any corporate constraint, and it serves a different purpose. At work you use the framework the team has already committed to, and that is correct, consistency matters more than any one person's curiosity. But it also means the codebase will never be a place to try an idea nobody asked for. On my own time I get to build the thing nobody needs: my own state manager instead of the one the team standardized on, my own take on a problem I have only ever solved with someone else's library. Most of it never ships anywhere, and that was never the point. It keeps my skills up, working on ideas a corporate stack would never let me touch, and it quietly feeds back into the technical judgment I bring to the big picture decisions above.

## So why do I still code

Not to prove I still can, and obviously not out of nostalgia for a former job. I code because it keeps me close enough to the operational reality that my decisions stay grounded, and because the discipline of automating and simplifying my own work is the same discipline I am asking my teams to apply to theirs. I would not trust that advice coming from someone who had quietly stopped taking it themselves.

## Sources

- (1) [Charity Majors, The Engineer/Manager Pendulum](https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/)
- (2) [Google re:Work, Identify what makes a great manager](https://rework.withgoogle.com/en/guides/managers-identify-what-makes-a-great-manager/)
- (3) [Camille Fournier, The Manager's Path](https://www.oreilly.com/library/view/the-managers-path/9781491973882/)
- (4) [Google SRE Book, Eliminating Toil](https://sre.google/sre-book/eliminating-toil/)

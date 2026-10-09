---
title: Turning engineers into managers
date: 2026-11-09
excerpt: Promoting an engineer into a manager is not a title change, it's a change for the whole squad. It works when the squad already knows how to go through change, when the management style exists before the manager does, and when the person who made the call doesn't disappear the day after.
tags: [management, leadership, mentorship]
---

At some point, every growing team needs more managers than it has. The obvious move is to look inside the squad, find the engineer people already go to, and give them the role. I've done it several times, and I've learned that the promotion itself is the easy part. Everything that makes it work, or makes it fail, happens before the announcement and in the months after it.

## A promotion is a change for the whole squad

We usually talk about turning an engineer into a manager as something that happens to one person. It isn't. The day someone becomes a manager, everyone in the squad gets a new manager, and one of them used to be their peer. The way they ask for help changes, the way they disagree changes, the person they complain to about the planning changes. That's a lot of change for a squad that didn't ask for any.

This is why I don't think you can turn engineers into managers in a squad that has no habit of change. In [a previous article](/articles/a-framework-for-management), I described how we use Lewin's change model (Unfreeze, Change, Refreeze) as the deployment pipeline for any new behavior in the team (1). Promoting a manager goes through exactly the same pipeline. You unfreeze by explaining why the squad needs a manager now, and what will be different. You change by actually running it, with room to adjust. You refreeze and you assess the change openly with everyone. A squad that has already gone through a few changes this way, and seen that they were explained, discussed and sometimes rolled back, will take a new manager much more calmly than a squad discovering the idea in an all-hands.

The other prerequisite is what I'd call the hygiene of interactions inside the squad: how people talk to each other when something goes wrong. If a broken release ends with someone being blamed, the squad learns that mistakes are dangerous. Then you promote one of them, and the first thing everyone wonders is whether the new manager will be the one doing the blaming. Amy Edmondson's research on psychological safety showed that teams learn and perform better when people believe they won't be punished for speaking up or making mistakes (2), and Google's Project Aristotle later found it was the single most important factor among the teams they studied (3). A squad running blameless retrospectives, in the spirit of the blameless postmortems that Google's SRE teams describe (4), already has the answer to that question: nobody is going to get blamed, including by the new manager. That's what makes everyone feel secure enough to accept the change.

## Expect friction, and make room for it

Even in a healthy squad, moving an engineer into a manager role creates friction. Someone else wanted the role. Someone thinks they are more senior. Someone is just uneasy about getting performance feedback from the person they used to pair with. Linda Hill, who followed new managers through their first year, describes this transition as far harder than people expect, mostly because the relationships with former peers have to be rebuilt on new terms (5).

You can't make that friction disappear, and I don't think you should try. What you can do is make sure it gets said out loud instead of leaking into code reviews and planning sessions. In practice, that means talking to people before the announcement, not after. It means one to ones where the honest question is "how do you feel about this", and where "not great" is an acceptable answer that doesn't get argued away. It means being clear about why this person, and also being clear about what the others' paths look like from now on.

This is where the blame-free culture pays off a second time. If the squad already knows that disagreeing is safe, people will tell you about their concerns, and most of those concerns are useful: a blind spot of the new manager, a relationship that needs attention, a scope that's still fuzzy. If the squad doesn't feel safe, you will hear nothing, and silence is not consent. As I wrote about [multicultural teams](/articles/what-multicultural-management-means), in some cultures dissent is never voiced in the room. Keeping the communication lines open means also giving people quieter ways to raise a concern, in private, in writing, later.

## Lead first, name later

One habit I've kept over the years: I don't name a manager for a squad I haven't managed myself for a while.

Before anyone gets the title, I run the squad directly. I hold the one to ones, the planning, the retrospectives, the hard conversations. Part of this is simply understanding the squad, its people, its friction points, what it needs from a manager. But the main reason is that a management style gets copied far more than it gets taught. People learn by watching what others do and what happens to them afterwards; Albert Bandura built a whole theory of social learning on that observation (6). The future manager has been watching me manage their squad for months. When they take over, they're not inventing a style from scratch, they're continuing one they've seen working, from the inside.

It also means the squad already has habits that don't depend on one person: how a one to one goes, how feedback is given, how a delivery risk is raised. The new manager inherits a running system, not an empty space. And the squad gets a kind of continuity: the way they're managed doesn't change overnight, only the face does.

## A clear scope, before the first day

The worst way to start as a manager is to find out what the job is by stepping on toes. So before someone starts, I write down the scope of the role with them: what they decide alone, what they decide with me, what they just need to inform me about, and what isn't theirs at all. It doesn't need to be long. It needs to be explicit, because role ambiguity is one of the most documented sources of stress and dissatisfaction at work (7), and a new manager has enough sources of stress already.

The scope is not a document you write once. In the first months, I reinforce it through feedback, as close as possible to the moment: "this one was yours to decide, you could have gone ahead", or "this one should have come to me before the team heard about it". This kind of feedback is how the scope stops being words in a page and becomes something the new manager actually feels.

The same goes for reporting. A new manager often doesn't know what their own manager needs to know, so they either report everything or nothing. I give them a short list of what matters to me (delivery risks, people risks, anything that involves another team, anything that will surprise someone), and where each of those goes: the weekly one to one, a written update, a message right away. This removes a surprising amount of anxiety on both sides. They know what to send, I know what to expect, and the communication line stays open because nobody has to guess how to use it.

## Don't disappear

The most common mistake I see, and I've made it too, is to promote someone and then leave. The new manager has the squad, so you move on to the next fire. That's exactly the moment they need you most.

For the new manager, I keep a regular coaching slot, separate from the usual one to one about delivery, where we only talk about management: the conversation they're dreading, the feedback that didn't land, the decision they're not sure about. It's the support I wish I'd had the first time I managed anyone.

For the engineers, I stay present. Not to manage them over their manager's head, which would destroy the new manager's credibility in a week, but to keep a link. I keep some rituals that cross the hierarchy: seminars with the whole team, 360 feedback cycles where everyone, including the engineers, gives feedback to their manager, and skip-level one to ones every now and then. Gallup estimates that managers account for at least 70% of the variance in team engagement (8). When you've just put a first-time manager in charge, that's a lot of weight on one person. Staying around is how you make sure that if something goes wrong between them and the squad, you hear it early, and from both sides.

## A few more things I've learned

**Don't promote the best engineer by default.** Being great at the job is not a predictor of being great at managing people who do it. The Peter principle is not just a joke. I look for the engineer people already go to when they're stuck, the one who explains instead of fixing, the one who notices when someone is having a bad week (9).

**Ask, don't assign.** Some excellent engineers have no interest in managing, and that's fine. A promotion into management that someone accepts because they felt they couldn't refuse is a slow failure for everyone. They need to genuinely want to work on people and systems instead of code, at least for a while.

**Make the way back explicit.** Charity Majors wrote about the engineer/manager pendulum: the idea that moving between the two roles over a career is healthy, not a demotion (10). I say it explicitly before the promotion: if in six months you realize it's not for you, going back to engineering is a normal outcome, not a failure. Funnily, saying it makes people much more willing to try.

**Expect them to code less, and say it.** As I wrote in [why I still code](/articles/why-do-i-still-code), the first year of managing eats the time and the mental bandwidth that used to go into code. A new manager who still measures their own worth in pull requests will feel like they're failing every week. Telling them early that this is normal, and temporary, saves them from that.

## Who is really being promoted

When it goes well, it's not one person who gets promoted. The squad does too: it now has a manager who knows the codebase, the people and the history, and who has been managed the way they're expected to manage. The new manager is the visible part of it, but the work that made it possible started months before, with a squad that had learned to change, to disagree, and to say things out loud.

**A good promotion is one that the whole squad was ready for.**

## Sources

- (1) Kurt Lewin, 1947, [Frontiers in Group Dynamics: Concept, Method and Reality in Social Science](https://journals.sagepub.com/doi/10.1177/001872674700100103), *Human Relations*
- (2) Amy Edmondson, 1999, [Psychological Safety and Learning Behavior in Work Teams](https://journals.sagepub.com/doi/10.2307/2666999), *Administrative Science Quarterly*
- (3) [Google re:Work, Understand team effectiveness](https://rework.withgoogle.com/en/guides/understanding-team-effectiveness)
- (4) [Google SRE Book, Postmortem Culture: Learning from Failure](https://sre.google/sre-book/postmortem-culture/)
- (5) Linda A. Hill, 2007, [Becoming the Boss](https://hbr.org/2007/01/becoming-the-boss), *Harvard Business Review*
- (6) Albert Bandura, 1977, Social Learning Theory, Prentice Hall ([overview](https://en.wikipedia.org/wiki/Social_learning_theory))
- (7) [Kahn et al., 1964, Role Theory](https://psycnet.apa.org/record/1965-08866-000)
- (8) [Gallup, State of the American Manager](https://www.gallup.com/services/182138/state-american-manager.aspx)
- (9) Benson, Li & Shue, 2019, [Promotions and the Peter Principle](https://doi.org/10.1093/qje/qjz022), *The Quarterly Journal of Economics*
- (10) [Charity Majors, The Engineer/Manager Pendulum](https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/)

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { mountCharts } from '../../utils/charts';

// Illustrative data, made up to rehearse the survey and the interviews.
// To be replaced with the study's own results before publishing.
const charts = {
  values: {
    type: 'bar',
    title: 'Values: Hofstede scores against the 20 engineers (illustrative)',
    labels: ['Power Distance', 'Individualism', 'Achievement', 'Uncertainty Avoidance', 'Long-Term', 'Indulgence'],
    series: [
      { name: 'India, Hofstede', data: [77, 48, 56, 40, 51, 26] },
      { name: 'Engineers, median', data: [60, 55, 50, 52, 54, 34] },
      { name: 'France, Hofstede', data: [68, 71, 43, 86, 63, 48] },
    ],
  },
  practices: {
    type: 'bar',
    title: 'Values against practices, median of the 20 engineers (illustrative)',
    labels: ['Power Distance', 'Individualism', 'Achievement', 'Uncertainty Avoidance', 'Long-Term', 'Indulgence'],
    series: [
      { name: 'India, Hofstede', data: [77, 48, 56, 40, 51, 26] },
      { name: 'Values', data: [60, 55, 50, 52, 54, 34] },
      { name: 'Practices', data: [45, 58, 46, 66, 42, 50] },
    ],
  },
  yearAgo: {
    type: 'bar',
    title: 'Practices 1 year ago and today, median of the engineers (illustrative)',
    labels: ['Power Distance', 'Individualism', 'Achievement', 'Uncertainty Avoidance', 'Long-Term', 'Indulgence'],
    series: [
      { name: '1 year ago', data: [64, 50, 54, 50, 47, 36] },
      { name: 'Today', data: [45, 58, 46, 66, 42, 50] },
    ],
  },
  tenure: {
    type: 'bar',
    title: 'Scores by time in the model (illustrative)',
    labels: ['1 to 2 years (n = 11)', 'More than 2 years (n = 9)'],
    series: [
      { name: 'Power Distance, values', data: [63, 57] },
      { name: 'Power Distance, practices', data: [50, 40] },
      { name: 'Uncertainty Avoidance, practices', data: [62, 70] },
    ],
  },
};

// Response sheets: one row per contributor, one column per question, left blank to fill in.
const contributors = Array.from({ length: 20 }, (_, i) => `C${i + 1}`);
const profileQuestions = ['A1', 'A2', 'A3', 'A4'];
const practiceQuestions = Array.from({ length: 12 }, (_, i) => `P${i + 1}`);
const bridgingQuestions = ['B1', 'B2', 'B3', 'B4'];
const bridgingOpenQuestions = ['B5', 'B6'];

const root = ref(null);
let destroyCharts = () => {};
let mounted = true;

onMounted(async () => {
  const destroy = await mountCharts(root.value);
  if (mounted) destroyCharts = destroy;
  else destroy();
});

onBeforeUnmount(() => {
  mounted = false;
  destroyCharts();
});
</script>

<template>
  <section class="section pt-6">
    <div ref="root" class="container container-narrow">
      <h1>Does a shared operating model bridge cultural gaps?</h1>

      <p>
        This study confronts 20 engineers in India, working inside an in-house operating model for a year or more,
        with what Hofstede's model predicts for India. It asks whether the operating model moves their values and
        practices away from their national profile, and whether that brings them closer to the colleagues they work
        with abroad.
      </p>

      <hr />

      <h2>Introduction</h2>
      <p>
        Hofstede's model predicts how people from a country expect hierarchy, decisions, risk and planning to work.
        An operating model prescribes its own answers to the same questions: who decides, how commitments are made,
        how uncertainty is handled. When an engineer raised in one culture works every day inside a model designed
        elsewhere, which one shapes what they do?
      </p>
      <p>
        The working idea is that the operating model acts as a third culture: a shared set of rules and rituals that
        sits between the engineers' national culture and their colleagues' culture, and narrows the gap between the
        two.
      </p>
      <p>Three questions:</p>
      <ol>
        <li>
          <strong>Shift</strong>: do the engineers' values and practices differ from what Hofstede's India profile
          predicts?
        </li>
        <li>
          <strong>Bridging</strong>: does that shift bring them closer to the culture of the colleagues they work
          with, here assumed to be France, or toward something that is neither?
        </li>
        <li>
          <strong>Mechanism</strong>: which practices of the model do the engineers credit for the change, and where
          does their national culture hold?
        </li>
      </ol>

      <h2>Context</h2>
      <p>
        Hofstede scores countries from 0 to 100 on six dimensions: Power Distance (PDI), Individualism (IDV),
        Motivation towards Achievement and Success (MAS), Uncertainty Avoidance (UAI), Long-Term Orientation (LTO)
        and Indulgence (IVR). The
        <a href="https://www.theculturefactor.com/country-comparison-tool" target="_blank" rel="noopener">Country
        Comparison tool</a> gives the published score of each country.
      </p>
      <p>
        These scores are national averages, not individual traits. They don't say how any one engineer thinks; they
        say what to expect from a group raised in India. That is why the study compares the 20 engineers as a group,
        and asks them about concrete behaviour rather than about themselves.
      </p>
      <p>
        India and France differ most on Uncertainty Avoidance, Individualism and Indulgence. They are close on Power
        Distance: a flat model pushes both away from their national profile there, rather than one toward the other.
      </p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Dimension</th>
              <th>India</th>
              <th>France</th>
              <th>What the model prescribes</th>
              <th>Hypothesis for the engineers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PDI</td>
              <td>77</td>
              <td>68</td>
              <td class="is-text">Who decides, and who speaks in rituals</td>
              <td class="is-text">H1: practices well below 77; values lower too, but less</td>
            </tr>
            <tr>
              <td>IDV</td>
              <td>48</td>
              <td>71</td>
              <td class="is-text">Individual ownership of tasks, shared team goals</td>
              <td class="is-text">H2: little change; the model mixes individual and team ownership</td>
            </tr>
            <tr>
              <td>MAS</td>
              <td>56</td>
              <td>43</td>
              <td class="is-text">How performance is recognised</td>
              <td class="is-text">H3: slightly lower, the weakest effect of the six</td>
            </tr>
            <tr>
              <td>UAI</td>
              <td>40</td>
              <td>86</td>
              <td class="is-text">Definitions of done, written commitments, change management</td>
              <td class="is-text">
                H4: practices rise toward France, as the model adds rules India's profile doesn't expect; values move
                less
              </td>
            </tr>
            <tr>
              <td>LTO</td>
              <td>51</td>
              <td>63</td>
              <td class="is-text">Planning horizon, iteration length</td>
              <td class="is-text">H5: practices become short-cycle, values stay near 51</td>
            </tr>
            <tr>
              <td>IVR</td>
              <td>26</td>
              <td>48</td>
              <td class="is-text">Retrospectives, celebrations, psychological safety</td>
              <td class="is-text">H6: practices rise, through rituals that make saying what went wrong normal</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Hofstede located organisational culture mostly in practices, what people do, and national culture in values,
        what people believe is right. The study measures both, and expects the model to move practices more than
        values.
      </p>

      <h2>Method</h2>
      <p>
        One group of 20 engineers, all working in India, all inside the operating model for a year or more. There is
        no control group, so each engineer is compared in three ways:
      </p>
      <ol>
        <li>
          <strong>Against Hofstede's India score</strong>: the group's values, measured with Hofstede's
          <a href="https://geerthofstede.com/research-and-vsm/vsm-2013/" target="_blank" rel="noopener">Values Survey
          Module 2013</a>, against India's published scores and France's.
        </li>
        <li>
          <strong>Values against practices</strong>: the same engineers answer questions on what they believe is
          right and on what they actually do in the model. Both are scaled from 0 to 100 and set side by side. Where
          practices sit further from India's score than values, the model shapes behaviour without changing beliefs.
        </li>
        <li>
          <strong>Against Hofstede's prediction</strong>: for each practice question, the answer India's profile
          predicts is written down before the survey. The study counts how many engineers give that answer, 1 year
          ago and today.
        </li>
        <li>
          <strong>Against themselves 1 year ago</strong>: each practice question is asked twice, about today and
          about 1 year ago. The pairs show a change for each engineer, not only a difference from a national score.
        </li>
      </ol>
      <p>
        There is no data from before the model, so the answers about 1 year ago are remembered, not measured. People
        tend to remember the past as closer to the present, which makes the change look smaller than it was. Each of
        these questions offers "I can't remember, or I wasn't in this team", and those answers are left out rather
        than guessed. Values are only asked about today: beliefs are harder to recall than events.
      </p>
      <p>
        A difference from Hofstede's score could also predate the model: the company, the engineering trade or the
        way engineers were hired may explain part of it. The comparison with 1 year ago and the values against
        practices comparison are the study's best guards against that.
      </p>
      <p>
        The bridging measure is the share of the India–France gap the engineers have crossed, per dimension:
        (engineers − India) ÷ (France − India). 0% means they sit on India's score, 100% on France's. It is only read
        where the two countries are more than 10 points apart, which leaves out Power Distance.
      </p>
      <p>
        After the survey, 6 to 8 engineers take part in a 45-minute interview, picked among those whose answers
        changed most and least. The interviews ask about moments of friction with colleagues abroad, how the model
        helped or got in the way, and which of its rules the team adapted.
      </p>
      <p>
        With 20 people the study reports medians and ranges, and counts of engineers rather than percentages. It
        describes this team; it doesn't claim to speak for India.
      </p>

      <h2>Findings</h2>
      <p>
        To be written
      </p>

      <h2>Discussion</h2>
      <p>
        To be written
      </p>

      <h2>Conclusion</h2>
      <p>
        To be written
      </p>

      <hr />

      <h2>Raw data</h2>

      <h3>Survey questions</h3>
      <p>
        The survey has four blocks and takes about 25 minutes. Practice questions ask about concrete events, so
        answers describe what people did rather than what the model says they should do.
      </p>
      <p>Profile</p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>A1</td><td class="is-text">Are you an employee of the company or a contractor?</td><td class="is-text">Employee · Contractor</td></tr>
            <tr><td>A2</td><td class="is-text">How long have you been working inside the operating model?</td><td class="is-text">1 to 2 years · More than 2 years</td></tr>
            <tr><td>A3</td><td class="is-text">Which rituals of the model do you take part in every month?</td><td class="is-text">Several choices, list of the model's rituals</td></tr>
            <tr><td>A4</td><td class="is-text">How did you learn the model?</td><td class="is-text">Formal training · From colleagues · On my own</td></tr>
          </tbody>
        </table>
      </div>
      <p>Values</p>
      <p>
        The 24 items of the Values Survey Module 2013, unchanged, each answered on its 5-point scale. Changing their
        wording would break the comparison with Hofstede scores. They are numbered V1 to V24, in the module's order.
      </p>
      <p>Practices</p>
      <p>
        Each question is asked twice: "In the last 3 months" and "1 year ago". The second adds the answer "I can't
        remember, or I wasn't in this team". The prediction is the answer India's Hofstede profile points to.
      </p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Dimension</th>
              <th>Question</th>
              <th>Answers</th>
              <th>Hofstede predicts for India</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>P1</td><td>PDI</td><td class="is-text">The last time you disagreed with a decision of your lead, what did you do?</td><td class="is-text">Said nothing · Told a peer · Told my own manager · Talked to the lead one-to-one · Said it in a team ritual</td><td class="is-text">Said nothing, or told a peer</td></tr>
            <tr><td>P2</td><td>PDI</td><td class="is-text">Who decided the priorities of your team's last cycle?</td><td class="is-text">My lead alone · My lead, after asking the team · The team together · Someone outside the team</td><td class="is-text">My lead alone</td></tr>
            <tr><td>P3</td><td>IDV</td><td class="is-text">The last time your team missed a commitment, how was it discussed?</td><td class="is-text">One person was named · The team owned it together · It wasn't discussed</td><td class="is-text">It wasn't discussed</td></tr>
            <tr><td>P4</td><td>IDV</td><td class="is-text">How often did you take over a teammate's task to reach the team's goal?</td><td class="is-text">Never · Rarely · Sometimes · Often · Very often</td><td class="is-text">Sometimes</td></tr>
            <tr><td>P5</td><td>MAS</td><td class="is-text">How was good work recognised in your team?</td><td class="is-text">Individual praise or reward · Team recognition · Both · Not recognised</td><td class="is-text">Individual praise or reward</td></tr>
            <tr><td>P6</td><td>MAS</td><td class="is-text">How often did you work beyond your usual hours to meet a commitment?</td><td class="is-text">Never · Rarely · Sometimes · Often · Very often</td><td class="is-text">Often or very often</td></tr>
            <tr><td>P7</td><td>UAI</td><td class="is-text">The last time the scope changed during a cycle, what happened?</td><td class="is-text">I did it, working late · I accepted and dropped another item · It moved to the next cycle · I asked for a written request first · I refused</td><td class="is-text">I did it, working late</td></tr>
            <tr><td>P8</td><td>UAI</td><td class="is-text">Before you start a task, how clear is what "done" means?</td><td class="is-text">1 (not clear at all) to 5 (fully clear)</td><td class="is-text">1 or 2</td></tr>
            <tr><td>P9</td><td>LTO</td><td class="is-text">How far ahead do you know what you will work on?</td><td class="is-text">This week · This cycle · This quarter · Further</td><td class="is-text">This cycle</td></tr>
            <tr><td>P10</td><td>LTO</td><td class="is-text">When a quick fix and a lasting fix compete, which one does your team usually choose?</td><td class="is-text">The quick fix · The lasting fix · It depends</td><td class="is-text">It depends</td></tr>
            <tr><td>P11</td><td>IVR</td><td class="is-text">In the last meeting where your team looked back on its work, how free did you feel to say what went wrong?</td><td class="is-text">1 (not free at all) to 5 (completely free)</td><td class="is-text">1 or 2</td></tr>
            <tr><td>P12</td><td>IVR</td><td class="is-text">How often does your team take time for things that aren't work, like celebrations or chats?</td><td class="is-text">Never · Rarely · Sometimes · Often · Very often</td><td class="is-text">Never or rarely</td></tr>
          </tbody>
        </table>
      </div>
      <p>Bridging</p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>B1</td><td class="is-text">How easy is it to work with colleagues from other countries?</td><td class="is-text">1 (very hard) to 5 (very easy)</td></tr>
            <tr><td>B2</td><td class="is-text">1 year ago, how easy was it to work with colleagues from other countries?</td><td class="is-text">1 (very hard) to 5 (very easy) · I can't remember, or I wasn't in this team</td></tr>
            <tr><td>B3</td><td class="is-text">How much does the operating model change that?</td><td class="is-text">1 (makes it much harder) to 5 (makes it much easier)</td></tr>
            <tr><td>B4</td><td class="is-text">Which practices of the model make working with other countries easier?</td><td class="is-text">Several choices, list of the model's practices · Other</td></tr>
            <tr><td>B5</td><td class="is-text">Which practices of the model make it harder?</td><td class="is-text">Open answer</td></tr>
            <tr><td>B6</td><td class="is-text">Describe a recent misunderstanding with a colleague from another country. How was it solved?</td><td class="is-text">Open answer</td></tr>
          </tbody>
        </table>
      </div>
      <p class="study-source">
        The predictions are the author's reading of India's Hofstede scores, written before the survey is sent.
      </p>

      <h3>Survey responses</h3>
      <p>
        One row per contributor, one column per question. Contributors are numbered C1 to C20; the numbers are not
        linked to names.
      </p>
      <p>Profile</p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Contributor</th>
              <th v-for="question in profileQuestions" :key="question">{{ question }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contributor in contributors" :key="contributor">
              <td>{{ contributor }}</td>
              <td v-for="question in profileQuestions" :key="question" class="is-blank"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Practices</p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th rowspan="2">Contributor</th>
              <th v-for="question in practiceQuestions" :key="question" colspan="2">{{ question }}</th>
            </tr>
            <tr>
              <template v-for="question in practiceQuestions" :key="question">
                <th>In the last 3 months</th>
                <th>1 year ago</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contributor in contributors" :key="contributor">
              <td>{{ contributor }}</td>
              <template v-for="question in practiceQuestions" :key="question">
                <td class="is-blank"></td>
                <td class="is-blank"></td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Bridging</p>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Contributor</th>
              <th v-for="question in bridgingQuestions" :key="question">{{ question }}</th>
              <th v-for="question in bridgingOpenQuestions" :key="question">{{ question }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contributor in contributors" :key="contributor">
              <td>{{ contributor }}</td>
              <td v-for="question in bridgingQuestions" :key="question" class="is-blank"></td>
              <td v-for="question in bridgingOpenQuestions" :key="question" class="is-text"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

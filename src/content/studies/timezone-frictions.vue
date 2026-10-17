<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { mountCharts } from '../../utils/charts';

// Sample records, to be replaced with the gathered data. Every time is in IST
// (UTC+05:30), so records from different hubs line up on one clock.
const slackLag = [
  {
    id: 'SL-001', date: '2026-11-03', sentAt: '10:12', senderRole: 'Engineer', senderTz: 'Asia/Kolkata',
    mentionedRole: 'Lead engineer', mentionedTz: 'Europe/Paris', place: 'Thread', repliedAt: '14:47', lag: 275,
  },
  {
    id: 'SL-002', date: '2026-11-03', sentAt: '15:30', senderRole: 'QA engineer', senderTz: 'Europe/Paris',
    mentionedRole: 'Engineer', mentionedTz: 'Asia/Kolkata', place: 'Channel', repliedAt: '15:52', lag: 22,
  },
  {
    id: 'SL-003', date: '2026-11-04', sentAt: '19:05', senderRole: 'Lead engineer', senderTz: 'Europe/Paris',
    mentionedRole: 'QA engineer', mentionedTz: 'Asia/Singapore', place: 'Thread', repliedAt: '09:40 (+1)', lag: 875,
  },
];

const calendarLoad = [
  {
    week: '2026-W45', person: 'P-014', role: 'Engineer', tz: 'Asia/Kolkata', invited: 14, accepted: 12,
    attended: 11, hours: 9.5, outsideHours: 3.0,
  },
  {
    week: '2026-W45', person: 'P-027', role: 'Lead engineer', tz: 'Europe/Paris', invited: 22, accepted: 20,
    attended: 19, hours: 16.0, outsideHours: 0.5,
  },
  {
    week: '2026-W45', person: 'P-031', role: 'QA engineer', tz: 'Asia/Singapore', invited: 11, accepted: 8,
    attended: 7, hours: 6.0, outsideHours: 2.5,
  },
];

const reviews = [
  {
    id: 'PR-1182', openedAt: '11:20', requesterRole: 'Engineer', requesterTz: 'Asia/Kolkata', reviewerTz: 'Europe/Paris',
    firstReviewAt: '15:05', firstReview: 225, rounds: 2, mergedAt: '18:40',
  },
  {
    id: 'PR-1187', openedAt: '14:10', requesterRole: 'Lead engineer', requesterTz: 'Europe/Paris', reviewerTz: 'Europe/Paris',
    firstReviewAt: '14:55', firstReview: 45, rounds: 1, mergedAt: '16:20',
  },
  {
    id: 'PR-1190', openedAt: '20:30', requesterRole: 'QA engineer', requesterTz: 'Europe/Paris', reviewerTz: 'Asia/Kolkata',
    firstReviewAt: '10:15 (+1)', firstReview: 825, rounds: 3, mergedAt: '16:00 (+1)',
  },
];

const blockedWork = [
  {
    ticket: 'ENG-4410', blockedAt: '12:00', blockedTz: 'Asia/Kolkata', blockerTz: 'Europe/Paris',
    reason: 'Waiting for an API decision', unblockedAt: '16:30', wait: 4.5,
  },
  {
    ticket: 'ENG-4415', blockedAt: '18:45', blockedTz: 'Europe/Paris', blockerTz: 'Asia/Singapore',
    reason: 'Missing test environment access', unblockedAt: '08:15 (+1)', wait: 13.5,
  },
  {
    ticket: 'ENG-4421', blockedAt: '10:30', blockedTz: 'Asia/Kolkata', blockerTz: 'Asia/Kolkata',
    reason: 'Pending code review', unblockedAt: '11:45', wait: 1.25,
  },
];

const workingHours = [
  { person: 'P-014', role: 'Engineer', tz: 'Asia/Kolkata', local: '09:30–18:30', ist: '09:30–18:30', overlapEu: 4.0 },
  { person: 'P-027', role: 'Lead engineer', tz: 'Europe/Paris', local: '09:00–18:00', ist: '13:30–22:30', overlapEu: 9.0 },
  { person: 'P-031', role: 'QA engineer', tz: 'Asia/Singapore', local: '09:00–18:00', ist: '06:30–15:30', overlapEu: 2.0 },
];

const quotes = [
  {
    text: 'By the time Paris is online, I have already been stuck for half a day, so I start something else and lose the thread.',
    role: 'Engineer', tz: 'Asia/Kolkata',
  },
  {
    text: 'A short "ok" from Bengaluru can mean yes, or I will look into it. I have learned to ask a second question.',
    role: 'Lead engineer', tz: 'Europe/Paris',
  },
  {
    text: 'Most of the meetings I need are at the end of my day. I join them, but I rarely speak.',
    role: 'QA engineer', tz: 'Asia/Singapore',
  },
];

const charts = {
  slackLag: {
    type: 'bar',
    title: 'Reply lag after a mention, by hour sent (IST, minutes)',
    labels: slackLag.map((r) => `${r.sentAt} · ${r.senderRole} → ${r.mentionedRole}`),
    series: [{ name: 'Lag (min)', data: slackLag.map((r) => r.lag) }],
  },
  calendarLoad: {
    type: 'bar',
    title: 'Meeting hours per week, inside and outside local working hours',
    labels: calendarLoad.map((r) => `${r.role} · ${r.tz}`),
    series: [
      { name: 'Inside working hours', data: calendarLoad.map((r) => r.hours - r.outsideHours) },
      { name: 'Outside working hours', data: calendarLoad.map((r) => r.outsideHours) },
    ],
  },
  reviews: {
    type: 'bar',
    title: 'Time to first review, by requester and reviewer timezone (minutes)',
    labels: reviews.map((r) => `${r.requesterTz} → ${r.reviewerTz}`),
    series: [{ name: 'Time to first review', data: reviews.map((r) => r.firstReview) }],
  },
  blockedWork: {
    type: 'bar',
    title: 'Hours blocked, by blocked and blocking timezone',
    labels: blockedWork.map((r) => `${r.blockedTz} ← ${r.blockerTz}`),
    series: [{ name: 'Hours blocked', data: blockedWork.map((r) => r.wait) }],
  },
  workingHours: {
    type: 'bar',
    title: 'Daily working-hours overlap with the EU hub (hours)',
    labels: workingHours.map((r) => `${r.role} · ${r.tz}`),
    series: [{ name: 'Overlap (h)', data: workingHours.map((r) => r.overlapEu) }],
  },
};

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
      <h1>Timezone frictions (temporary title)</h1>

      <p>
        To be written
      </p>

      <hr />

      <h2>Introduction</h2>
      <p>
        To be written
      </p>

      <!--

      <h2>Context</h2>
      <p>
        To be written
      </p>

      <h2>Method</h2>
      <p>
        To be written
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

      -->

      <hr />

      <h2>Raw data</h2>
      <p>
        Six data sets, each shown with its model and three sample records. Every time is given in IST (UTC+05:30) so
        that records from the different hubs share one clock; "(+1)" marks the next day. People are anonymised as
        P-xxx. The sample records only illustrate the model and will be replaced by the gathered data.
      </p>

      <h3>Slack conversation lag after a mention</h3>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Sent (IST)</th>
              <th>Sender role</th>
              <th>Sender timezone</th>
              <th>Mentioned role</th>
              <th>Mentioned timezone</th>
              <th>Reply in</th>
              <th>Replied (IST)</th>
              <th>Lag (min)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in slackLag" :key="r.id">
              <td>{{ r.id }}</td>
              <td>{{ r.date }}</td>
              <td>{{ r.sentAt }}</td>
              <td>{{ r.senderRole }}</td>
              <td>{{ r.senderTz }}</td>
              <td>{{ r.mentionedRole }}</td>
              <td>{{ r.mentionedTz }}</td>
              <td>{{ r.place }}</td>
              <td>{{ r.repliedAt }}</td>
              <td>{{ r.lag }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="md-chart" :data-chart="JSON.stringify(charts.slackLag)">
        <figcaption>{{ charts.slackLag.title }}</figcaption>
        <div class="md-chart__canvas"></div>
      </figure>
      <p class="study-source">
        <strong>Source:</strong> Slack messages from the team's public channels. <strong>Period:</strong> to be
        defined. <strong>Method:</strong> every message mentioning a person is a record. The reply is the first
        message from the mentioned person either in the message's thread or in the same channel after the mention;
        the lag is the time between the two. Roles are engineer, lead engineer and QA engineer. Mentions with no reply
        within five working days are kept and flagged as unanswered.
      </p>

      <h3>Calendar load and participation</h3>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Week</th>
              <th>Person</th>
              <th>Role</th>
              <th>Timezone</th>
              <th>Invited</th>
              <th>Accepted</th>
              <th>Attended</th>
              <th>Meeting hours</th>
              <th>Outside working hours</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in calendarLoad" :key="r.person">
              <td>{{ r.week }}</td>
              <td>{{ r.person }}</td>
              <td>{{ r.role }}</td>
              <td>{{ r.tz }}</td>
              <td>{{ r.invited }}</td>
              <td>{{ r.accepted }}</td>
              <td>{{ r.attended }}</td>
              <td>{{ r.hours }}</td>
              <td>{{ r.outsideHours }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="md-chart" :data-chart="JSON.stringify(charts.calendarLoad)">
        <figcaption>{{ charts.calendarLoad.title }}</figcaption>
        <div class="md-chart__canvas"></div>
      </figure>
      <p class="study-source">
        <strong>Source:</strong> team members' work calendars. <strong>Period:</strong> to be defined.
        <strong>Method:</strong> one record per person and week. Meetings with at least two people count; focus
        blocks and out-of-office events do not. "Attended" comes from the meeting tool's participant list. "Outside
        working hours" is the share of meeting time outside the person's declared working hours (see working-hours
        overlap below).
      </p>

      <h3>Code reviews by hour and requester timezone</h3>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Pull request</th>
              <th>Opened (IST)</th>
              <th>Requester role</th>
              <th>Requester timezone</th>
              <th>Reviewer timezone</th>
              <th>First review (IST)</th>
              <th>Time to first review (min)</th>
              <th>Review rounds</th>
              <th>Merged (IST)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in reviews" :key="r.id">
              <td>{{ r.id }}</td>
              <td>{{ r.openedAt }}</td>
              <td>{{ r.requesterRole }}</td>
              <td>{{ r.requesterTz }}</td>
              <td>{{ r.reviewerTz }}</td>
              <td>{{ r.firstReviewAt }}</td>
              <td>{{ r.firstReview }}</td>
              <td>{{ r.rounds }}</td>
              <td>{{ r.mergedAt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="md-chart" :data-chart="JSON.stringify(charts.reviews)">
        <figcaption>{{ charts.reviews.title }}</figcaption>
        <div class="md-chart__canvas"></div>
      </figure>
      <p class="study-source">
        <strong>Source:</strong> the code hosting platform's pull request history. <strong>Period:</strong> to be
        defined. <strong>Method:</strong> one record per pull request opened for review. The first review is the
        first approval, comment or change request from someone other than the requester. Reviews per hour are counted
        from the first-review times, grouped by hour in IST and by the requester's timezone. Draft and bot pull
        requests are excluded.
      </p>

      <h3>Work blocked by another timezone</h3>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Blocked (IST)</th>
              <th>Blocked team timezone</th>
              <th>Blocking timezone</th>
              <th>Reason</th>
              <th>Unblocked (IST)</th>
              <th>Hours blocked</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in blockedWork" :key="r.ticket">
              <td>{{ r.ticket }}</td>
              <td>{{ r.blockedAt }}</td>
              <td>{{ r.blockedTz }}</td>
              <td>{{ r.blockerTz }}</td>
              <td class="is-text">{{ r.reason }}</td>
              <td>{{ r.unblockedAt }}</td>
              <td>{{ r.wait }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="md-chart" :data-chart="JSON.stringify(charts.blockedWork)">
        <figcaption>{{ charts.blockedWork.title }}</figcaption>
        <div class="md-chart__canvas"></div>
      </figure>
      <p class="study-source">
        <strong>Source:</strong> the issue tracker's status history. <strong>Period:</strong> to be defined.
        <strong>Method:</strong> one record each time a ticket enters a "Blocked" status, closed when it leaves it.
        The blocking timezone is the timezone of the person or team named as the blocker. Same-timezone blocks are
        kept as a baseline.
      </p>

      <h3>Working-hours overlap</h3>
      <div class="study-table">
        <table>
          <thead>
            <tr>
              <th>Person</th>
              <th>Role</th>
              <th>Timezone</th>
              <th>Working hours (local)</th>
              <th>Working hours (IST)</th>
              <th>Overlap with EU hub (h)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in workingHours" :key="r.person">
              <td>{{ r.person }}</td>
              <td>{{ r.role }}</td>
              <td>{{ r.tz }}</td>
              <td>{{ r.local }}</td>
              <td>{{ r.ist }}</td>
              <td>{{ r.overlapEu }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure class="md-chart" :data-chart="JSON.stringify(charts.workingHours)">
        <figcaption>{{ charts.workingHours.title }}</figcaption>
        <div class="md-chart__canvas"></div>
      </figure>
      <p class="study-source">
        <strong>Source:</strong> working hours declared in Slack and calendar profiles, confirmed with each person.
        <strong>Period:</strong> a snapshot, to be dated. <strong>Method:</strong> one record per person. The overlap
        is the number of hours a day the person's working hours share with the EU hub's core hours, 09:00–18:00 Paris
        time. This data set is the reference used to decide what counts as "outside working hours" above.
      </p>

      <h3>What people say about timezone frictions</h3>
      <blockquote v-for="(quote, i) in quotes" :key="i">
        <p>&ldquo;{{ quote.text }}&rdquo;</p>
        <p class="study-quote__author">{{ quote.role }}, {{ quote.tz }}</p>
      </blockquote>
      <p class="study-source">
        <strong>Source:</strong> an anonymous survey and short interviews with team members. <strong>Period:</strong>
        to be defined. <strong>Method:</strong> open questions on waiting, meetings and written communication across
        hubs. Quotes are kept word for word, with only the role and timezone of the person.
      </p>
    </div>
  </section>
</template>

import { flags } from "./flags";

// Experience timeline, most recent first. Rendered by ExperienceView / TimelineItem.
export const experience = [
  {
    period: '2022 // Today',
    role: 'Engineering Manager',
    org: 'Believe France',
    description:
      "Leading 20 engineers in India through three engineering managers, owning delivery of financial reporting, internal marketing and video management platforms. Personally hired 10 engineers and grew engineers and managers through coaching and upskilling, with low turnover. Designed the operational framework behind faster onboarding, clearer roles, horizontal scaling and better delivery, and brought AI-assisted engineering (Claude, Gemini) into the squads' day-to-day work.",
  },
  {
    period: '2015 // 2021',
    role: 'Senior Backend Team Lead',
    org: 'Jellyfish France (formerly Tradelab)',
    description:
      'Designed and built backend systems for a fast-moving ad-tech platform. Grew from senior engineer into team lead of 3 backend engineers, owning technical decisions and delivery of backend applications for high-volume programmatic bidding, and mentoring the team day to day. Drawing on prior CTO experience, coached engineers into management roles.',
  },
  {
    period: '2011 // 2015',
    role: 'CTO, Platform Development Director',
    org: 'One Heart Communication',
    description:
      'Reporting directly to the CEO, owned technology end-to-end: the architecture and delivery of a CRM for nonprofit crowdsourcing and fundraising on a pragmatic PHP/Symfony stack, and a hybrid team of 6 developers (3 in-house, 3 outsourced), including oversight of the Polish branch.',
  },
  {
    period: '2007 // 2011',
    role: 'PHP / JS / ActionScript / Flex Developer',
    org: 'Cho You',
    description: 'Built web and Flash/Flex applications, the starting point of a twenty-year engineering path.',
  },
];

if (flags.displayNewRole) {
  experience[0].period = '2022 // 2026';
  experience.unshift({
    period: '2026 // Today',
    role: 'Head Of BTech Alliance',
    org: 'Believe France',
    description:
      'Leading the BTech Alliance, an outsourcing framework, taking the lead on all outsourced engineering teams globally. Driving 40+ engineers worldwide through engineering managers, owning delivery of several internal platforms for the music industry. Designed the operational framework behind faster onboarding, clearer roles, horizontal scaling and better delivery, and brought AI-assisted engineering (Claude, Gemini) into the squads\' day-to-day work.',
  });
}

// Soft skills, presented as a flat set of pills, no ranking implied.
export const softSkills = [
  'People leadership',
  'Stakeholder management',
  'Communication',
  'Problem solving',
  'Emotional intelligence',
  'Curiosity',
];

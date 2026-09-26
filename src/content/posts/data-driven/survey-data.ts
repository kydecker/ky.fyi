export type Survey = { id: string; label: string; date: string };

export type ScorecardCategory = {
  id: string;
  label: string;
  statement: string;
  scale: number;
  ratings: string[];
  counts: Record<string, number[]>;
};

type Question = {
  id: string;
  question: string;
  options: string[];
  counts: Record<string, number[]>;
};

export const surveys: Survey[] = [
  { id: "survey_1", label: "Jun 2024", date: "2024-06-01" },
  { id: "survey_2", label: "Dec 2024", date: "2024-12-01" },
  { id: "survey_3", label: "Jun 2025", date: "2025-06-01" },
  { id: "survey_4", label: "Dec 2025", date: "2025-12-01" },
];

/** @lintignore Raw survey data, kept for reference */
export const respondents: Record<string, number> = {
  survey_1: 22,
  survey_2: 23,
  survey_3: 20,
  survey_4: 19,
};

/** @lintignore Raw survey data, kept for reference */
export const questions: Question[] = [
  {
    id: "what_is_your_role_at_scribe",
    question: "What is your role at Scribe?",
    options: ["Engineer", "Designer", "Product Manager"],
    counts: {
      survey_1: [16, 4, 2],
      survey_2: [18, 5, 0],
      survey_3: [16, 3, 1],
      survey_4: [16, 3, 0],
    },
  },
  {
    id: "how_long_have_you_been_at_scribe",
    question: "How long have you been at Scribe?",
    options: [
      "Less than 3 months",
      "3–6 months",
      "6–12 months",
      "1–2 years",
      "Over 2 years",
    ],
    counts: {
      survey_1: [7, 1, 5, 1, 8],
      survey_2: [1, 2, 9, 4, 7],
      survey_3: [4, 0, 2, 8, 6],
      survey_4: [3, 3, 3, 6, 4],
    },
  },
  {
    id: "what_team_are_you_on",
    question: "What team are you on?",
    options: [
      "Docs",
      "Discover",
      "Growth",
      "Capture",
      "Platform",
      "DevOps",
      "Other",
      "Optimize",
    ],
    counts: {
      survey_1: [7, 4, 4, 0, 3, 1, 3, 0],
      survey_2: [7, 4, 4, 1, 2, 1, 4, 0],
      survey_3: [5, 7, 2, 5, 0, 0, 1, 0],
      survey_4: [4, 6, 1, 5, 1, 0, 1, 1],
    },
  },
  {
    id: "which_stylus_resources_have_you_used",
    question: "Which Stylus resources have you used?",
    options: ["Code", "Figma", "Docs", "Slack", "None"],
    counts: {
      survey_1: [13, 13, 15, 10, 4],
      survey_2: [16, 15, 13, 9, 2],
      survey_3: [15, 10, 14, 7, 1],
      survey_4: [16, 9, 19, 10, 0],
    },
  },
  {
    id: "have_you_worked_with_other_design_systems_in_the_past",
    question: "Have you worked with other design systems in the past?",
    options: ["Yes", "No"],
    counts: {
      survey_1: [15, 3],
      survey_2: [16, 4],
      survey_3: [16, 3],
      survey_4: [18, 1],
    },
  },
  {
    id: "in_the_past_5_work_days_how_often_did_you_interact_with_styl",
    question:
      "In the past 5 work days, how often did you interact with Stylus?",
    options: ["All 5 days", "3 or 4 days", "1 or 2 days", "Not at all"],
    counts: {
      survey_1: [4, 3, 6, 5],
      survey_2: [6, 4, 7, 4],
      survey_3: [1, 9, 5, 4],
      survey_4: [3, 5, 9, 2],
    },
  },
  {
    id: "have_you_ever_made_contributions_to_stylus",
    question: "Have you ever made contributions to Stylus?",
    options: ["Code", "Figma", "Docs", "Bug Reports", "No contributions"],
    counts: {
      survey_1: [11, 4, 5, 10, 2],
      survey_2: [11, 4, 5, 7, 5],
      survey_3: [10, 3, 5, 5, 5],
      survey_4: [12, 4, 4, 12, 3],
    },
  },
];

const scorecard: ScorecardCategory[] = [
  {
    id: "meeting_feature_needs",
    label: "Meeting feature needs",
    statement: "I can use existing Stylus components for most new features.",
    scale: 5,
    ratings: ["2", "3", "4", "5"],
    counts: {
      survey_1: [0, 3, 11, 3],
      survey_2: [1, 3, 8, 9],
      survey_3: [1, 3, 7, 6],
      survey_4: [0, 1, 9, 8],
    },
  },
  {
    id: "predictability",
    label: "Predictability",
    statement: "Stylus components generally work the way I expect them to.",
    scale: 5,
    ratings: ["3", "4", "5"],
    counts: {
      survey_1: [2, 11, 4],
      survey_2: [1, 6, 12],
      survey_3: [0, 5, 12],
      survey_4: [1, 5, 12],
    },
  },
  {
    id: "naming",
    label: "Naming",
    statement: "Stylus component, token, and property names make sense to me.",
    scale: 5,
    ratings: ["3", "4", "5"],
    counts: {
      survey_1: [1, 10, 6],
      survey_2: [0, 5, 14],
      survey_3: [0, 5, 12],
      survey_4: [0, 4, 14],
    },
  },
  {
    id: "saving_time",
    label: "Saving time",
    statement: "Stylus saves me time on work that would otherwise take longer.",
    scale: 5,
    ratings: ["3", "4", "5"],
    counts: {
      survey_1: [0, 5, 12],
      survey_2: [0, 3, 17],
      survey_3: [0, 2, 15],
      survey_4: [2, 2, 14],
    },
  },
  {
    id: "documentation",
    label: "Documentation",
    statement: "Stylus documentation helps answer most questions that arise.",
    scale: 5,
    ratings: ["2", "3", "4", "5"],
    counts: {
      survey_1: [5, 5, 5, 2],
      survey_2: [0, 5, 3, 12],
      survey_3: [0, 1, 3, 13],
      survey_4: [0, 2, 5, 11],
    },
  },
  {
    id: "aiding_collaboration",
    label: "Aiding collaboration",
    statement:
      "Stylus helps design and engineering roles collaborate more effectively.",
    scale: 5,
    ratings: ["3", "4", "5"],
    counts: {
      survey_1: [4, 8, 5],
      survey_2: [1, 2, 17],
      survey_3: [2, 6, 9],
      survey_4: [0, 3, 15],
    },
  },
];

export const categoryById: Record<string, ScorecardCategory> =
  Object.fromEntries(scorecard.map((category) => [category.id, category]));

export const overallRating: ScorecardCategory = {
  id: "overall_rating",
  label: "Overall rating",
  statement: "Overall, how would you rate the quality of Stylus?",
  scale: 10,
  ratings: ["5", "7", "8", "9", "10"],
  counts: {
    survey_1: [1, 6, 10, 1, 0],
    survey_2: [0, 2, 9, 6, 4],
    survey_3: [0, 1, 4, 3, 11],
    survey_4: [0, 1, 6, 3, 9],
  },
};

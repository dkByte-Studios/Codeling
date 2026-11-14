// The shape of the course data made by scripts/content-parser.mjs.

export type Block =
  | { t: 'p'; html: string }
  | { t: 'ul' | 'ol'; items: string[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | {
      t: 'code';
      lang: 'python' | 'json' | 'text';
      code: string;
      /** What the program prints. Shown after the learner answers, in questions. */
      output?: string;
      inputs?: string[];
      errorType?: string;
      trace?: { line: number; vars: string[] };
      invalid?: boolean;
    }
  | { t: 'file'; name: string; content: string };

export type Test = {
  inputs: string[];
  files: Record<string, string>;
  expected: string;
  /** Lines of the learner's program to swap before this test, to try another starting value. */
  substitute?: { from: string; to: string }[];
};

type Base = { prompt: Block[]; why?: string; hint?: string; number?: number; title?: string; id?: string; source?: string };

export type ChoiceExercise = Base & { type: 'choice'; options: string[]; answer: number; revealOutput?: boolean };
export type TrueFalseExercise = Base & { type: 'tf'; answer: boolean };
export type OrderExercise = Base & { type: 'order'; pieces: string[] };
export type MatchExercise = Base & { type: 'match'; pairs: [string, string][] };
export type TypedExercise = Base & {
  type: 'typed';
  starter: string;
  /** A model answer. Used for "show the answer" and to test the exercise itself. */
  solution: string;
  tests: Test[];
  mustContain: string[];
  mustMatch: string[];
};
export type TraceExercise = Base & {
  type: 'trace';
  code: string;
  line: number;
  vars: string[];
  rows: { final: boolean; values: Record<string, string> }[];
};

export type Exercise =
  | ChoiceExercise
  | TrueFalseExercise
  | OrderExercise
  | MatchExercise
  | TypedExercise
  | TraceExercise;

export type Lesson = { id: string; title: string; teach: Block[]; exercises: Exercise[]; recap: string };

export type Project = { title: string; blocks: Block[]; tests: Test[] };

export type Unit = {
  unit: number;
  title: string;
  lessons: Lesson[];
  project: Project | null;
  quiz: Exercise[];
  exam: Exercise[];
};

export type CourseIndex = {
  units: {
    unit: number;
    title: string;
    lessons: { id: string; title: string; exercises: number }[];
    hasProject: boolean;
    quizQuestions: number;
  }[];
};

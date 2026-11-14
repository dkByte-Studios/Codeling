export type CheckResult = {
  correct: boolean;
  /** A sentence about what went wrong, for typed code. */
  message?: string;
  /** Extra text shown in a box, like a Python error. */
  detail?: string;
};

/** What every exercise component offers to the lesson player. */
export type ExerciseApi = {
  check: () => Promise<CheckResult> | CheckResult;
};

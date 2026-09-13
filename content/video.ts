/**
 * The founders' own recordings.
 *
 * Both were filmed for social and already carry burned-in captions, which is
 * why the player can autoplay muted and still say something: most people meet
 * this page on a phone, often somewhere they will not turn sound on.
 *
 * Burned-in captions are pixels, though — a screen reader cannot read them —
 * so every video carries a `summary` that is rendered as real text beside it.
 * That is the accessible version of the same content, and it is what a search
 * engine indexes.
 *
 * Files come from `scripts/optimize-video.mjs`; the sources live in
 * `_brief/video/` and are not committed.
 */

export type Video = {
  id: string;
  /** Path under /public. */
  src: string;
  /** Path under /public. Shown before playback and whenever it is paused. */
  poster: string;
  /** Describes the video for assistive technology. */
  label: string;
  /** Rendered as visible text — the accessible equivalent of the footage. */
  summary: string;
};

export const introVideo: Video = {
  id: "intro",
  src: "/video/intro.mp4",
  poster: "/video/intro.jpg",
  label: "The GCSE2MED founders introducing the tuition",
  summary:
    "Thirty seconds on why we started GCSE2MED, and what a student gets that they would not get from a bigger class or a one-off tutor.",
};

export const lessonVideo: Video = {
  id: "lesson",
  src: "/video/lesson.mp4",
  poster: "/video/lesson.jpg",
  label: "A tutor working through a GCSE physics question on Newton's second law",
  summary:
    "An unedited minute and a half of actual teaching: a GCSE physics question on Newton's second law, worked from the free-body diagram through to the answer, at the pace a student would get it in a lesson.",
};

/**
 * Transcodes the founders' source recordings into web-sized MP4s under
 * public/video, with a poster frame for each.
 *
 * The sources are phone recordings straight out of a social editor: 1080x1920
 * at 15-37 Mbps, which is 130-180 MB for under two minutes. They are already
 * vertical and already carry burned-in captions, so this only needs to bring
 * the weight down — no cropping, no overlay.
 *
 * Unlike images, there is no next/image equivalent doing format negotiation at
 * request time: what is committed here is exactly what a parent downloads over
 * their phone data. Hence H.264 (universally decodable, hardware-accelerated
 * on every phone) rather than a smaller-but-pickier codec, and +faststart so
 * playback can begin before the file has finished arriving.
 *
 *   node scripts/optimize-video.mjs
 */
import { mkdir } from "node:fs/promises";
import { stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const SOURCE_DIR = "_brief/video";
const OUT_DIR = "public/video";
const WIDTH = 720;
const FPS = 30;
/** Visually lossless enough for burned-in captions at this size; 30+ smears them. */
const CRF = 28;

/**
 * source file -> [output name, poster timestamp in seconds]
 *
 * The poster is what every visitor sees before anything plays, and on a
 * connection slow enough it may be all they ever see — so it is chosen by
 * hand, not taken from frame 0, which on both of these is a half-raised arm
 * mid-gesture.
 */
const MAP = [
  ["intro.mp4", "intro", 8],
  ["second.mov", "lesson", 25],
];

await mkdir(OUT_DIR, { recursive: true });

for (const [source, name, posterAt] of MAP) {
  const src = path.join(SOURCE_DIR, source);
  const mp4 = path.join(OUT_DIR, `${name}.mp4`);
  const poster = path.join(OUT_DIR, `${name}.jpg`);

  await run("ffmpeg", [
    "-v", "error", "-i", src,
    "-vf", `scale=${WIDTH}:-2:flags=lanczos`,
    "-r", String(FPS),
    "-c:v", "libx264", "-profile:v", "high", "-crf", String(CRF), "-preset", "slow",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    // Mono: both recordings are a single speaker to camera, and stereo doubles
    // the audio weight to carry a duplicate channel.
    "-c:a", "aac", "-ac", "1", "-b:a", "96k",
    "-y", mp4,
  ]);

  await run("ffmpeg", [
    "-v", "error", "-ss", String(posterAt), "-i", src,
    "-frames:v", "1", "-vf", `scale=${WIDTH}:-2:flags=lanczos`,
    "-q:v", "4", "-y", poster,
  ]);

  const [v, p] = await Promise.all([stat(mp4), stat(poster)]);
  console.log(
    `${mp4}  ${(v.size / 1024 / 1024).toFixed(1)} MB` +
    `   ${poster}  ${(p.size / 1024).toFixed(0)} KB`,
  );
}

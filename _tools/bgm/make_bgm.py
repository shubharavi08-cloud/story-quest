#!/usr/bin/env python3
"""Cut a soft, seamless background loop from one of our own songs for a website game.

  python3 make_bgm.py <song.mp3|m4a|wav> <out.mp3> [start_s=0] [length_s=80] [xfade_s=4] [lufs=-21]

The loop is [start, start+length) of the song; its last `xfade` seconds are blended into the start
(equal-power) so it repeats with no click or gap. Loudness is normalised (quiet bed under game sounds),
then encoded as 112 kbps stereo MP3. Needs ffmpeg + numpy.
Games load it from audio/dasara/<game-key>.mp3 (dasara-kit.js plays it, falls back to a built-in bed)."""
import subprocess, sys, tempfile, os, wave
import numpy as np

src, out = sys.argv[1], sys.argv[2]
start = float(sys.argv[3]) if len(sys.argv) > 3 else 0.0
length = float(sys.argv[4]) if len(sys.argv) > 4 else 80.0
xf = float(sys.argv[5]) if len(sys.argv) > 5 else 4.0
lufs = float(sys.argv[6]) if len(sys.argv) > 6 else -21.0
SR = 44100
tmp = tempfile.mkdtemp()
raw = os.path.join(tmp, "raw.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(start), "-t", str(length + xf), "-i", src,
                "-ac", "2", "-ar", str(SR), raw], check=True)
w = wave.open(raw)
x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32).reshape(-1, 2) / 32768
n, k = int(length * SR), int(xf * SR)
if len(x) < n + k:
    sys.exit(f"song too short for start={start} length={length}")
body, tail = x[:n].copy(), x[n:n + k]
t = np.linspace(0, np.pi / 2, k)[:, None]
body[:k] = body[:k] * np.sin(t) + tail * np.cos(t)  # tail fades out while the head fades in
loop = os.path.join(tmp, "loop.wav")
with wave.open(loop, "wb") as o:
    o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR)
    o.writeframes((np.clip(body, -1, 1) * 32767).astype(np.int16).tobytes())
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", loop, "-af", f"loudnorm=I={lufs}:TP=-2:LRA=11",
                "-ar", str(SR), "-c:a", "libmp3lame", "-b:a", "112k", out], check=True)
print(out, f"{os.path.getsize(out) / 1024:.0f} KB, {length:.0f}s loop")

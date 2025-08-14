import { exec } from "child_process";

export function pullFromOriginMain(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      // fetch + reset para evitar merges problemáticos
      "git fetch origin main && git reset --hard origin/main",
      { env: process.env },
      (err, stdout, stderr) => {
        if (err) return reject(stderr || err.message);
        resolve(stdout);
      }
    );
  });
}
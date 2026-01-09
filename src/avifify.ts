// Imports
import nodePath from "node:path";

// Fetches pngs
const data = nodePath.resolve("data");
const glob = new Bun.Glob(nodePath.resolve(data, "**", "*.png"));
const filenames = await Array.fromAsync(glob.scan());
const iterator = filenames[Symbol.iterator]();

// Defines workers
const workers = new Array(16).fill(null).map(() => new Worker("src/avifify.worker.ts"));
const chore = (worker: Worker) => {
    const next = iterator.next();
    if(next.done) worker.terminate();
    else worker.postMessage(next.value);
};
for(const worker of workers) {
    worker.addEventListener("message", () => chore(worker));
    chore(worker);
}

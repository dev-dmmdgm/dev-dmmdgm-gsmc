// Imports
import sharp from "sharp";

// Defines worker
self.addEventListener("message", async (event) => {
    // Paths file
    const png = event.data as string;
    const avif = png.slice(0, ".png".length * -1) + ".avif";

    // Writes file
    if(await Bun.file(avif).exists()) return self.postMessage(null);
    await sharp(png).avif().toFile(avif);
    console.log(`Converted ${png} to ${avif}.`);
    self.postMessage(null);
});

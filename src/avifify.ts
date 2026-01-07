// Imports
import nodePath from "node:path";
import sharp from "sharp";

// Defines paths
const data = nodePath.resolve("data");

// Fetches pngs
const glob = new Bun.Glob(nodePath.resolve(data, "**", "*.png"));
const pngs = await Array.fromAsync(glob.scan());

// Converts pngs to avifs
for(const png of pngs) {
    // Checks avif
    const avif = png.slice(0, ".png".length * -1) + ".avif";
    if(await Bun.file(avif).exists()) continue;
    
    // Writes avif
    await sharp(png).avif().toFile(avif);
    console.log(`Converted ${png} to ${avif}.`);
}

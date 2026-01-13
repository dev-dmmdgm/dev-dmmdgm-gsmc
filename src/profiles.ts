// Imports
import nodePath from "node:path";
import { Archive, Profile } from "./type";

// Fetches uuids
const data = nodePath.resolve("data");
const glob = new Bun.Glob(nodePath.resolve(data, "*", "season.json"));
const filenames = await Array.fromAsync(glob.scan());
const archives = await Array.fromAsync(filenames.map((filename) => Bun.file(filename).json())) as Archive[];

// Fetches profiles
const uuids = Array.from(new Set(archives.flatMap((archive) => archive.players)));
const players = await Array.fromAsync(uuids.map(async (uuid) => { 
    const query = await fetch(new URL(`/minecraft/profile/lookup/${uuid}`, "https://api.minecraftservices.com"));
    if(!query.ok) return null;
    return await query.json() as { id: string; name: string; };
}));
const profiles: Profile[] = players.filter((player) => player !== null).map((player) => ({
    avatarURL: new URL(`/avatar/${player.id}`, "https://mc-heads.net").toString(),
    username: player.name,
    uuid: player.id
}));

// Writes profiles
await Bun.file("src/profiles.json").write(JSON.stringify(profiles, null, 4));
console.log("Downloaded profiles.");

// Exports
export {};
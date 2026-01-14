// Imports
import type { Archive, Profile } from "./type";
import nodePath from "node:path";

// Fetches uuids
const assets = nodePath.resolve("public/assets");
const data = nodePath.resolve("data");
const file = Bun.file(nodePath.resolve(assets, "profiles.json"));
const glob = new Bun.Glob(nodePath.resolve(data, "*", "season.json"));
const filenames = await Array.fromAsync(glob.scan());
const archives = await Array.fromAsync(filenames.map((filename) => Bun.file(filename).json())) as Archive[];
const cache = await file.exists() ? await file.json() as Profile[] : [];

// Fetches profiles
const uuids = Array.from(new Set(archives.flatMap((archive) => archive.players)));
const profiles = await Array.fromAsync(uuids.map(async (uuid) => {
    // Checks cache
    const cached = cache.find((profile) => profile.uuid === uuid);
    if(typeof cached !== "undefined") return cached;

    // Checks query
    const query = await fetch(new URL(`/api/player/minecraft/${uuid}`, "https://playerdb.co"));
    if(!query.ok) throw new Error(`Cannot resolve profile "${uuid}" at this time.`);

    // Parses data
    const json = await query.json() as {
        data: {
            player: {
                avatar: string;
                id: string;
                username: string;
            };
        };
    };
    const profile: Profile = {
        avatarURL: json.data.player.avatar,
        username: json.data.player.username,
        uuid: json.data.player.id
    };
    console.log(`Downloaded profile ${profile.uuid} (${profile.username}) from API.`);
    return profile;
}));

// Writes profiles
await file.write(JSON.stringify(profiles, null, 4));

// Exports
export {};

// Imports
import type { Archive, Gallery, Profile } from "./type";
import nodePath from "node:path";

// Defines paths
const data = nodePath.resolve("data");
const dist = nodePath.resolve("dist");
const src = nodePath.resolve("src");

// Fetches profiles
const profilesFile = Bun.file(nodePath.resolve(src, "profiles.json"));
const profilesJSON = await profilesFile.exists() ? await profilesFile.json() as Profile[] : [];

// Defines server
const server = Bun.serve({
    error: () => Response.error(),
    hostname: "127.0.0.1",
    routes: {
        // Defines api routes
        "/api/archives": {
            async GET() {
                // Fetches archives
                const dirname = nodePath.resolve(data, "*", "season.json");
                const glob = new Bun.Glob(dirname);
                const filenames = await Array.fromAsync(glob.scan());
                const archives = await Array.fromAsync(filenames.map((filename) => Bun.file(filename).json())) as Archive[];

                // Creates response
                const response = Response.json(archives);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/archives/:season": {
            async GET(request) {
                // Fetches archive
                const dirname = nodePath.resolve(data, request.params.season);
                if(!dirname.startsWith(data)) return Response.error();
                const filename = nodePath.resolve(dirname, "season.json");
                const archive = await Bun.file(filename).json() as Archive;

                // Creates response
                const response = Response.json(archive);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/archives/:season/gallery": {
            async GET(request) {
                // Creates response
                const response = Response.redirect(`/api/galleries/${request.params.season}`);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/archives/:season/profiles": {
            async GET(request) {
                // Fetches profiles
                const dirname = nodePath.resolve(data, request.params.season);
                if(!dirname.startsWith(data)) return Response.error();
                const filename = nodePath.resolve(dirname, "season.json");
                const archive = await Bun.file(filename).json() as Archive;
                const uuids = archive.players.map((player) => player);
                const profiles = profilesJSON.filter((profile) => uuids.includes(profile.uuid)) as Profile[];

                // Creates response
                const response = Response.json(profiles);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/galleries": {
            async GET() {
                // Fetches galleries
                const dirname = nodePath.resolve(data, "*", "gallery", "*.json");
                const glob = new Bun.Glob(dirname);
                const filenames = await Array.fromAsync(glob.scan());
                const galleries = await Array.fromAsync(filenames.map((filename) => Bun.file(filename).json())) as Gallery[];

                // Creates response
                const response = Response.json(galleries.flat());
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/galleries/:season": {
            async GET(request) {
                // Fetches gallery
                const dirname = nodePath.resolve(data, request.params.season, "gallery");
                if(!dirname.startsWith(data)) return Response.error();
                const glob = new Bun.Glob(nodePath.resolve(dirname, "*.json"));
                const filenames = await Array.fromAsync(glob.scan());
                const gallery = await Array.fromAsync(filenames.map((filename) => Bun.file(filename).json())) as Gallery;

                // Creates response
                const response = Response.json(gallery);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/profiles": {
            async GET() {
                // Creates response
                const response = Response.json(profilesJSON);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/profiles/:player": {
            async GET(request) {
                // Fetches profile
                const uuid = request.params.player;
                const profile = profilesJSON.find((profile) => profile.uuid === uuid);
                if(typeof profile === "undefined") return Response.error();

                // Creates response
                const response = Response.json(profile);
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },
        "/api/*": {
            async GET() {
                // Returns error
                return Response.error();
            }
        },

        // Defines data route
        "/data/*": {
            async GET(request) {
                // Fetches file
                const url = new URL(request.url);
                const filename = nodePath.resolve(data, url.pathname.slice("/data/".length));
                if(!filename.startsWith(data)) return Response.error();

                // Creates response
                const response = new Response(Bun.file(filename));
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },

        // Defines asset routes
        "/assets/*": {
            async GET(request) {
                // Fetches assets
                const url = new URL(request.url);
                const filename = nodePath.resolve(dist, "assets", url.pathname.slice("/assets/".length));
                if(!filename.startsWith(dist)) return Response.error();

                // Creates response
                const response = new Response(Bun.file(filename));
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        },

        // Defines index routes
        "/*": {
            async GET() {
                // Fetches index
                const filename = nodePath.resolve(dist, "index.html");

                // Creates response
                const response = new Response(Bun.file(filename));
                response.headers.set("access-control-allow-origin", "*");
                response.headers.set("cache-control", "max-age=86400");
                return response;
            }
        }
    }
});

// Prints status
console.log(`Server is now listening on ${server.url}.`);

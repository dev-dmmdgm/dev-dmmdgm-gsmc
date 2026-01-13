// Imports
import type { VNode } from "preact";
import type { RoutePropsForPath } from "preact-iso";
import type { Archive, Gallery, Profile, Screenshot } from "./type";
import DOMPurity from "dompurify";
import { marked } from "marked";
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import "./style.css";

// Defines date handlers
function dateDelta(since: Date, until: Date): number {
    // Calculates delta
    const delta = until.getTime() - since.getTime();
    return Math.floor(delta / 1000 / 60 / 60 / 24);
}
function dateUTC(date: Date): string {
    // Formats date
    const offset = date.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() + offset).toLocaleDateString();
}

// Defines routes
function HomeRoute() {
    // Defines splash
    useEffect(() => {
        // Creates splash urls
        const splashURLs = [
            "https://gsmc.dmmdgm.dev/data/s1/gallery/park_at_night.avif",
            "https://gsmc.dmmdgm.dev/data/s2/gallery/stable.avif",
            "https://gsmc.dmmdgm.dev/data/s3/gallery/ancient_city_full.avif",
            "https://gsmc.dmmdgm.dev/data/s3/gallery/welcome_to_geeseville.avif",
            "https://gsmc.dmmdgm.dev/data/s4/gallery/race_to_space.avif",
            "https://gsmc.dmmdgm.dev/data/s5/gallery/main_basement_2.avif",
            "https://gsmc.dmmdgm.dev/data/s6/gallery/fountain_beacon.avif",
            "https://gsmc.dmmdgm.dev/data/s6/gallery/iron_farm_sunrise.avif",
        ];
        let splashIndex = Math.floor(Math.random() * splashURLs.length);

        // Creates timeout
        let splashTimeout = setTimeout(() => {});

        // Fetches elements
        const splashBack = document.getElementById("splash-back") as HTMLImageElement;
        const splashFront = document.getElementById("splash-front") as HTMLImageElement;
        
        // Initializes elements
        splashFront.src = splashURLs[splashIndex];
        splashIndex = (splashIndex + 1) % splashURLs.length;
        splashBack.src = splashURLs[splashIndex];
        
        // Creates animation
        const splashInterval = setInterval(async () => {
            splashFront.style.opacity = "0%";
            splashTimeout = setTimeout(() => {
                splashFront.src = splashBack.src;
                splashFront.style.opacity = "";
                splashTimeout = setTimeout(() => {
                    splashIndex = (splashIndex + 1) % splashURLs.length;
                    splashBack.src = splashURLs[splashIndex];
                }, 3000);
            }, 3000);
        }, 15000);

        // Creates disposer
        return () => {
            clearTimeout(splashTimeout);
            clearInterval(splashInterval);
        };
    }, []);

    // Creates home route
    return <main id="home">
        <div id="splash">
            <img id="splash-back"/>
            <img id="splash-front"/>
            <h1>Welcome to Geesecraft!</h1>
            <h2>"Of the Gees, by the Gees, for the Gees!"</h2>
            <div>🞃</div>
        </div>
        <section>
            <h3>A Community of Geese</h3>
            <div>
                <p>
                    Geesecraft is a place where we fellow geese can come together and honk around as we please whenever we feel bored or happy.
                    It began simple around the summer break of 2021, where iiPython was experimenting with a multi-player survival world with another friend.
                    Soon, however, DmmD, emy, K4, and a few other temporary members also joined the fun and slowly converted the server to the Geesecraft we know and love today.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s1/gallery/ban_hammer.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s1/gallery/no_trespassing.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s2/gallery/dmmd_looking_up.avif"/>
            </div>
            <div>
                <p>
                    Modern Geesecraft actually hasn't changed much since its original form.
                    At its core, it is still all about the same free expression, loose rules (a.k.a. none), infinite possibilities, and casual chitchat time with friends as always.
                    And, of course, deep down, we are still the same geese as when we first started playing Geesecraft as well.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s5/gallery/t2_rocket.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/dmmd_ruby.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/k4ffu_staring_contest.avif"/>
            </div>
        </section>
        <section class="high">
            <h3>Freedom for All</h3>
            <div>
                <p>
                    We don't have rules. Rules have us.
                    After all, we're here to have fun, not to yell at each others about why what they are doing doesn't match up to our expectations.
                </p>
            </div>
            <div>
                <p>
                    Wanna explore the world? Go for it!
                    Wanna annoy your friends with this cool new noisy block you just found / crafted? Well, technically nobody is here to stop you.
                    Wanna just randomly mine a chunk out of this world for no apparent reason other than because you're bored and because you can?
                    Too late, We already did that. :3
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/bai_bai_chunk_3.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/bai_bai_chunk_2.avif"/>
            </div>
            <div>
                <p>
                    Case in point, there are no limitations on what you are allowed and not allowed to do on Geesecraft.
                    If it is possible within the realm of vanilla Minecraft (or within the realm of whatever mods we've decided to include in that season), it's all fair game.
                </p>
            </div>
        </section>
        <section>
            <h3>Technology and Automation First</h3>
            <div>
                <p>
                    Geesecraft prioritizes technology and automation more than anything else.
                    We've built countless automatic resource farms over the seasons.
                    From something simple, such as iron farms, tree farms, and cobblestone farms, to something as crazy as wither skeleton skull farms and totem of undying farms, we've done 'em all.
                    We carry our programmer motto to heart and most definitely to Minecraft: "Why spend one hour doing manual work when we can spend ten automating it!"
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s3/gallery/building_iron_farm.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s3/gallery/no_death_here_folks.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s3/gallery/shulker_chaos.avif"/>
            </div>
            <div>
                <p>
                    Since season 4, we also began to install mods to make the Minecraft experience more fun.
                    Of which, without competition, the two most popular mods ever included in Geesecraft are... (Drumroll, please!) Applied Energistics 2 and Tech Reborn!
                </p>
            </div>
            <div>
                <p>
                    For the most part, iiPython has been handling all of the Tech Reborn technology tree for power, industrialization, resource materializer, etc.
                    DmmD, on the other hand, handles Applied Energistics 2 for item storage and Wi-Fi.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s4/gallery/base_of_operations.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s4/gallery/silly_dmmd.avif"/>
            </div>
            <div>
                <p>
                    Beyond Tech Reborn and Applied Energistics 2, K4 and iiPython are also responsible for the space mod expedition when we had Ad Astra.
                    And DmmD becomes a self-proclaimed chef and is responsible for most of the agricultural mods, including Croptopia and Farmer's Delight.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s4/gallery/goose_rockets.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s4/gallery/looking_chilly.avif"/>
            </div>
        </section>
        <section class="high">
            <h3>Making the Most out of Memories</h3>
            <div>
                <p>
                    What is the most important part about Geesecraft, you ask?
                    It's our friendship and childhood, of course!
                    After all, Geesecraft will be 8 years of our lives by the end of season 6, that's nearly 30% of our lifespan for most members on the server as in 2026.
                </p>
            </div>
            <div>
                <p>
                    Geesecraft symbolizes our bondship together as geese and as friends, our commitment to fun and laughters, and our last goodbyes to our innocent and carefree lives.
                    It might have witnessed us grow up, slowly become busy with our mundane work, and share less and less time to enjoy Minecraft with each other, but at least it shall live on forever as a part of us as we enter college life and beyond.
                </p>
            </div>
            <div>
                <p>
                    It is an important page of our journey on this world, that's why we have decided to archive and document our entire Geesecraft history.
                    When we eventually grow old and look back at our times in Geesecraft, we can all smile at each other and remind ourselves once again of all the silly and goofy moments we had together on the server.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s4/gallery/weird_selfie.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s3/gallery/vibes_1.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/weeee.avif"/>
            </div>
            <div>
                <p>&lt;3</p>
            </div>
        </section>
        <section>
            <h3>Nyaa~ Kachow! :3</h3>
            <div>
                <p>
                    Well, that's it about Geesecraft. Thank you for reading!
                </p>
            </div>
            <div>
                <p>
                    Go check out the other pages on this website.
                </p>
            </div>
            <div>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/iipython_sailing_into_the_sunset.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/rainbow.avif"/>
                <img src="https://gsmc.dmmdgm.dev/data/s6/gallery/ravine_sunset.avif"/>
            </div>
        </section>
    </main>;
}
function ArchivesRoute() {
    // Defines archives
    let archiveIndex = 0;
    useEffect(() => {
        // Defines updater
        function updateArchive(archiveElement: HTMLDivElement, archive: Archive): void {
            // Fetches elements
            const archiveAnchor = archiveElement.children.item(0) as HTMLAnchorElement;
            const archiveBanner = archiveAnchor.children.item(0) as HTMLImageElement;
            const archiveSection = archiveAnchor.children.item(1) as HTMLElement;
            const archiveTitle = archiveSection.children.item(0) as HTMLHeadingElement;
            const archiveDescription = archiveSection.children.item(1) as HTMLParagraphElement;
            
            // Updates elements
            archiveAnchor.href = `/archives/${archive.season}`;
            archiveBanner.src = archive.bannerURL ?? "";
            archiveTitle.innerText = archive.title;
            archiveDescription.innerText = archive.description;
        }

        // Creates listeners
        let archivePreviousListener = async () => {};
        let archiveNextListener = async () => {};

        // Creates timeout
        let archiveTimeout = setTimeout(() => {});
        let archiveBusy = true;

        // Fetches elements
        const archivePrevious = document.getElementById("archive-previous") as HTMLButtonElement;
        const archiveNext = document.getElementById("archive-next") as HTMLButtonElement;
        let archiveBack = document.getElementById("archive-0") as HTMLDivElement;
        let archiveLeft = document.getElementById("archive-1") as HTMLDivElement;
        let archiveRight = document.getElementById("archive-2") as HTMLDivElement;
        let archiveFront = document.getElementById("archive-3") as HTMLDivElement;

        // Fetches api
        fetch("https://gsmc.dmmdgm.dev/api/archives").then(async (response) => {
            // Creates archives
            if(!response.ok) return;
            const archivesJSON = await response.json() as Archive[];
            archivesJSON.sort((a, b) => +new Date(a.since) - +new Date(b.since));
            if(archivesJSON.length === 0) return;
            
            // Updates listeners
            archivePreviousListener = async () => {
                // Checks busy
                if(archiveBusy) return;
                archiveBusy = true;

                // Cycles elements
                archiveIndex = (archivesJSON.length + archiveIndex - 1) % archivesJSON.length;
                localStorage.setItem("archive-season", archivesJSON[archiveIndex].season);
                updateArchive(archiveBack, archivesJSON[(archivesJSON.length + archiveIndex - 1) % archivesJSON.length]);
                archiveBack.classList.replace("archive-back", "archive-left");
                archiveLeft.classList.replace("archive-left", "archive-front");
                archiveRight.classList.replace("archive-right", "archive-back");
                archiveFront.classList.replace("archive-front", "archive-right");
                [ archiveLeft, archiveFront, archiveBack, archiveRight ] = [ archiveBack, archiveLeft, archiveRight, archiveFront ];

                // Awaits animation
                archiveTimeout = setTimeout(() => {
                    archiveBusy = false;
                }, 500);
            };
            archiveNextListener = async () => {
                // Checks busy
                if(archiveBusy) return;
                archiveBusy = true;

                // Cycles elements
                archiveIndex = (archiveIndex + 1) % archivesJSON.length;
                localStorage.setItem("archive-season", archivesJSON[archiveIndex].season);
                updateArchive(archiveBack, archivesJSON[(archiveIndex + 1) % archivesJSON.length]);
                archiveBack.classList.replace("archive-back", "archive-right");
                archiveLeft.classList.replace("archive-left", "archive-back");
                archiveRight.classList.replace("archive-right", "archive-front");
                archiveFront.classList.replace("archive-front", "archive-left");
                [ archiveRight, archiveBack, archiveFront, archiveLeft ] = [ archiveBack, archiveLeft, archiveRight, archiveFront ];
                
                // Awaits animation
                archiveTimeout = setTimeout(() => {
                    archiveBusy = false;
                }, 500);
            };
            
            // Appends listeners
            archivePrevious.addEventListener("click", archivePreviousListener);
            archiveNext.addEventListener("click", archiveNextListener);

            // Updates archives
            const archiveSeason = localStorage.getItem("archive-season");
            const archiveFind = archiveSeason !== null ? archivesJSON.findIndex((archive) => archive.season === archiveSeason) : -1;
            archiveIndex = archiveFind > -1 ? archiveFind : (archivesJSON.length - 1);
            localStorage.setItem("archive-season", archivesJSON[archiveIndex].season);
            updateArchive(archiveLeft, archivesJSON[(archivesJSON.length + archiveIndex - 1) % archivesJSON.length]);
            updateArchive(archiveRight, archivesJSON[(archiveIndex + 1) % archivesJSON.length]);
            updateArchive(archiveFront, archivesJSON[archiveIndex]);
            archiveBack.classList.add("archive-back");
            archiveLeft.classList.add("archive-left");
            archiveRight.classList.add("archive-right");
            archiveFront.classList.add("archive-front");
            archiveBusy = false;
        });

        // Creates disposer
        return () => {
            archivePrevious.removeEventListener("click", archivePreviousListener);
            archiveNext.removeEventListener("click", archiveNextListener);
            clearTimeout(archiveTimeout);
        };
    }, []);

    // Creates archives route
    return <main id="archives">
        <h1>Season Archives</h1>
        <h2>"Behold, the entire history of Geesecraft!"</h2>
        <div id="archive-list">
            <button id="archive-previous">🞀</button>
            <div id="archive-blank"/>
            <button id="archive-next">🞂</button>
            <div class="archive" id="archive-0"><a><img/><section><h3/><p/></section></a></div>
            <div class="archive" id="archive-1"><a><img/><section><h3/><p/></section></a></div>
            <div class="archive" id="archive-2"><a><img/><section><h3/><p/></section></a></div>
            <div class="archive" id="archive-3"><a><img/><section><h3/><p/></section></a></div>
        </div>
    </main>;
}
function ArchiveRoute(props: RoutePropsForPath<"/archives/:season">) {
    // Defines archive
    const empty: Archive = {
        achievements: [],
        active: false,
        bannerURL: null,
        contentURL: null,
        description: "",
        modifications: [],
        packURL: null,
        platform: "",
        players: [],
        season: "",
        since: "",
        title: "",
        until: "",
        version: "",
        worldURL: null
    };
    const [ archive, setArchive ] = useState<Archive>(empty);
    const [ content, setContent ] = useState<string>("");
    const [ profiles, setProfiles ] = useState<Profile[]>([]);
    useEffect(() => {
        // Fetches api
        fetch(`https://gsmc.dmmdgm.dev/api/archives/${props.season}`).then(async (response) => {
            // Creates archive
            if(!response.ok) return setArchive(empty);
            const archiveJSON = await response.json() as Archive;
            setArchive(archiveJSON);

            // Updates storage
            localStorage.setItem("archive-season", archiveJSON.season);

            // Creates content
            if(archiveJSON.contentURL !== null) {
                fetch(archiveJSON.contentURL).then(async (subresponse) => {
                    if(!subresponse.ok) return;
                    setContent(await subresponse.text());
                });
            }
        });
        fetch(`https://gsmc.dmmdgm.dev/api/archives/${props.season}/profiles`).then(async (response) => {
            // Creates profiles
            if(!response.ok) return setProfiles([]);
            const profilesJSON = await response.json() as Profile[];
            setProfiles(profilesJSON);
        });
    }, []);

    // Defines lookup
    const [ profilesLookup, setProfilesLookup ] = useState<Record<string, Profile>>({});
    useEffect(() => {
        // Updates lookups
        setProfilesLookup(Object.fromEntries(profiles.map((profile) => [ profile.uuid, profile ])));
    }, [ profiles ]);
    
    // Defines gallery
    const [ gallery, setGallery ] = useState<Gallery>([]);
    useEffect(() => {
        // Fetches api
        fetch(`https://gsmc.dmmdgm.dev/api/archives/${props.season}/gallery`).then(async (response) => {
            // Creates gallery
            if(!response.ok) return setGallery([]);
            const galleryJSON = await response.json() as Gallery;
            galleryJSON.sort((a, b) => a.filename.localeCompare(b.filename));
            setGallery(galleryJSON);
        });
    }, []);

    // Defines screenshot
    const [ camera, setCamera ] = useState<Profile | null>(null);
    const [ screenshotIndex, setScreenshotIndex ] = useState<number | null>(null);
    useEffect(() => {
        // Updates screenshot
        if(screenshotIndex === null) setCamera(null);
        else setCamera(profilesLookup[gallery[screenshotIndex].camera.replace(/-/g, "")] ?? null);
    }, [ screenshotIndex ]);
    
    // Creates archive route
    return <main id="archive">
        <img id="archive-splash" src={archive.bannerURL ?? ""}/>
        <div id="archive-data">
            <div id="archive-head">
                <h3>{archive.title}</h3>
                <h4>{archive.description}</h4>
            </div>
            <div id="archive-meta">
                <div>{dateUTC(new Date(archive.since))} - {dateUTC(new Date(archive.until))}</div>
                <div>{dateDelta(new Date(archive.since), new Date(archive.until))} Day(s)</div>
                <div>{archive.platform}</div>
                <div>{archive.version}</div>
                <div>{archive.active ? "Active" : "Sunset"}</div>
            </div>
            <div id="archive-body">
                <div id="archive-content" dangerouslySetInnerHTML={{ __html: DOMPurity.sanitize(marked.parse(content, { async: false })) }}/>
                <div id="archive-logistics">
                    <section>
                        <h3>Description</h3>
                        <p>{archive.description}</p>
                    </section>
                    <section>
                        <h3>Achievements</h3>
                        <ul>
                            {archive.achievements.map((achievement) => <li>
                                <span>•</span>
                                <span>{achievement}</span>
                            </li>)}
                        </ul>
                    </section>
                    <section>
                        <h3>Modifications</h3>
                        <ul>
                            {archive.modifications.map((modification) => <li>
                                <span>•</span>
                                <span>{modification}</span>
                            </li>)}
                        </ul>
                    </section>
                    <section>
                        <h3>Players</h3>
                        <ul>
                            {profiles.map((profile) => <li>
                                <span>•</span>
                                <img src={profile.avatarURL}/>
                                <span>{profile.username}</span>
                            </li>)}
                        </ul>
                    </section>
                    <section>
                        <h3>Pack Download</h3>
                        {archive.packURL !== null ? <a href={archive.packURL} download="pack.jsonc">Click to Download</a> : <p>Download Not Available</p>}
                    </section>
                    <section>
                        <h3>World Download</h3>
                        {archive.worldURL !== null ? <a href={archive.worldURL} download="world.zip">Click to Download</a> : <p>Download Not Available</p>}
                    </section>
                </div>
            </div>
            <div id="archive-gallery">
                {gallery.map((screenshot, index) => <button onClick={() => setScreenshotIndex(index)}>
                    <img src={screenshot.url}/>
                    <div><span>{screenshot.name}</span></div>
                </button>)}
            </div>
        </div>
        {screenshotIndex !== null && typeof gallery[screenshotIndex] !== "undefined" && <div id="screenshot">
            <button id="screenshot-previous" onClick={() => setScreenshotIndex((gallery.length + screenshotIndex - 1) % gallery.length)}>🞀</button>
            <div id="screenshot-display">
                <img id="screenshot-image" src={gallery[screenshotIndex].url}/>
                <section>
                    <h3>{gallery[screenshotIndex].name} ({gallery[screenshotIndex].filename})</h3>
                    <span>{gallery[screenshotIndex].description}</span>
                    <span>
                        {camera !== null && <span><img src={camera.avatarURL}/> {camera.username}</span>}
                        <span>•</span>
                        <span>{archive.title}</span>
                        <span>•</span>
                        <span>{dateUTC(new Date(gallery[screenshotIndex].time))}</span>
                    </span>
                    <span>
                        <a href={gallery[screenshotIndex].url} target="_blank" rel="noopener noreferrer">View Image</a>
                        <span>•</span>
                        <a href={gallery[screenshotIndex].url.slice(0, ".avif".length * -1) + ".png"} target="_blank" rel="noopener noreferrer">Open Original</a>
                    </span>
                </section>
                <button id="screenshot-close" onClick={() => setScreenshotIndex(null)}>Close</button>
            </div>
            <button id="screenshot-next" onClick={() => setScreenshotIndex((screenshotIndex + 1) % gallery.length)}>🞂</button>
        </div>}
    </main>;   
}
function GalleryRoute() {
    // Defines data
    const [ archives, setArchives ] = useState<Archive[]>([]);
    const [ galleries, setGalleries ] = useState<Gallery>([]);
    const [ profiles, setProfiles ] = useState<Profile[]>([]);
    useEffect(() => {
        // Fetches api
        fetch("https://gsmc.dmmdgm.dev/api/archives").then(async (response) => {
            if(!response.ok) return setArchives([]);
            const archivesJSON = await response.json() as Archive[];
            archivesJSON.sort((a, b) => +new Date(a.since) - +new Date(b.since));
            setArchives(archivesJSON);
        });
        fetch("https://gsmc.dmmdgm.dev/api/galleries").then(async (response) => {
            if(!response.ok) return setGalleries([]);
            const galleriesJSON = await response.json() as Gallery;
            galleriesJSON.sort((a, b) => a.filename.localeCompare(b.filename));
            setGalleries(galleriesJSON);
        });
        fetch("https://gsmc.dmmdgm.dev/api/profiles").then(async (response) => {
            if(!response.ok) return setProfiles([]);
            const profilesJSON = await response.json() as Profile[];
            setProfiles(profilesJSON);
        });
    }, []);

    // Defines lookups
    const [ archivesLookup, setArchivesLookup ] = useState<Record<string, Archive>>({});
    const [ profilesLookup, setProfilesLookup ] = useState<Record<string, Profile>>({});
    useEffect(() => {
        // Updates lookups
        setArchivesLookup(Object.fromEntries(archives.map((archive) => [ archive.season, archive ])));
        setProfilesLookup(Object.fromEntries(profiles.map((profile) => [ profile.uuid, profile ])));
    }, [ archives, profiles ]);

    // Defines find
    const sorts: {
        algorithm: (a: Screenshot, b: Screenshot) => number;
        display: (screenshot: Screenshot) => VNode;
        label: string;
    }[] = [
        {
            algorithm: (a, b) => a.name.localeCompare(b.name),
            display: (screenshot) => <div><span>{screenshot.name}</span></div>,
            label: "A - Z (Name)"
        },
        {
            algorithm: (a, b) => b.name.localeCompare(a.name),
            display: (screenshot) => <div><span>{screenshot.name}</span></div>,
            label: "Z - A (Name)"
        },
        {
            algorithm: (a, b) => a.filename.localeCompare(b.filename),
            display: (screenshot) => <div><span>{screenshot.filename}</span></div>,
            label: "A - Z (Filename)"
        },
        {
            algorithm: (a, b) => b.filename.localeCompare(a.filename),
            display: (screenshot) => <div><span>{screenshot.filename}</span></div>,
            label: "Z - A (Filename)"
        },
        {
            algorithm: (a, b) => {
                const aSince = a.season in archivesLookup ? +new Date(archivesLookup[a.season].since) : -1;
                const bSince = b.season in archivesLookup ? +new Date(archivesLookup[b.season].since) : -1;
                return bSince - aSince;
            },
            display: (screenshot) => {
                const archive = archivesLookup[screenshot.season];
                if(typeof archive === "undefined") return <div><span>Unknown Season</span></div>;
                return <div><span>{archive.title}</span></div>;
            },
            label: "Newest (Season)"
        },
        {
            algorithm: (a, b) => {
                const aSince = a.season in archivesLookup ? +new Date(archivesLookup[a.season].since) : -1;
                const bSince = b.season in archivesLookup ? +new Date(archivesLookup[b.season].since) : -1;
                return aSince - bSince;
            },
            display: (screenshot) => {
                const archive = archivesLookup[screenshot.season];
                if(typeof archive === "undefined") return <div><span>Unknown Season</span></div>;
                return <div><span>{archive.title}</span></div>;
            },
            label: "Oldest (Season)"
        },
        {
            algorithm: (a, b) => +new Date(b.time) - +new Date(a.time),
            display: (screenshot) => <div><span>{dateUTC(new Date(screenshot.time))}</span></div>,
            label: "Newest (Time)"
        },
        {
            algorithm: (a, b) => +new Date(a.time) - +new Date(b.time),
            display: (screenshot) => <div><span>{dateUTC(new Date(screenshot.time))}</span></div>,
            label: "Oldest (Time)"
        },
        {
            algorithm: (a, b) => a.camera.localeCompare(b.camera),
            display: (screenshot) => {
                const camera = profilesLookup[screenshot.camera.replace(/-/g, "")];
                if(typeof camera === "undefined") return <div><span>Unknown Camera</span></div>;
                return <div>
                    <img src={camera.avatarURL}/>
                    <span>{camera.username}</span>
                </div>;
            },
            label: "Camera"
        }
    ];
    const [ filter, setFilter ] = useState<string>("");
    const [ gallery, setGallery ] = useState<Gallery>([]);
    const [ sortIndex, setSortIndex ] = useState<number>(parseInt(localStorage.getItem("sort-index") ?? "0"));
    useEffect(() => {
        // Updates gallery
        const mode = sorts[sortIndex];
        setGallery(galleries.filter((screenshot) => {
            if(filter.length === 0) return true;
            const archive = archivesLookup[screenshot.season] ?? null;
            const profile = profilesLookup[screenshot.camera.replace(/-/g, "")] ?? null;
            if(archive === null || profile === null) return false;
            const targets = [
                archive.title, archive.season,
                screenshot.camera, screenshot.description, screenshot.filename,
                screenshot.name, dateUTC(new Date(screenshot.time)), screenshot.url,
                profile.username, profile.uuid
            ];
            return targets.some((target) => target.toLowerCase().includes(filter));
        }).toSorted(mode.algorithm));
        localStorage.setItem("sort-index", sortIndex.toString());
    }, [ archives, filter, galleries, profiles, sortIndex ]);

    // Defines screenshot
    const [ camera, setCamera ] = useState<Profile | null>(null);
    const [ screenshotIndex, setScreenshotIndex ] = useState<number | null>(null);
    const [ season, setSeason ] = useState<string | null>(null);
    useEffect(() => {
        // Updates screenshot
        if(screenshotIndex === null) {
            setCamera(null);
            setSeason(null);
        }
        else {
            const cameraJSON = profilesLookup[gallery[screenshotIndex].camera.replace(/-/g, "")];
            const archiveJSON = archivesLookup[gallery[screenshotIndex].season];
            setCamera(cameraJSON ?? null);
            setSeason(typeof archiveJSON !== "undefined" ? archiveJSON.title : null);
        }
    }, [ screenshotIndex ]);

    // Creates gallery route
    return <main id="gallery">
        <h1>Gallery Collection</h1>
        <h2>"Welcome to the Geesecraft family album!"</h2>
        <div id="gallery-find">
            <input placeholder="Search gallery..." onChange={(event) => setFilter(event.currentTarget.value.toLowerCase())}/>
            <button onClick={() => setSortIndex((sortIndex + 1) % sorts.length)}>{sorts[sortIndex].label}</button>
        </div>
        <div id="gallery-list">
            {gallery.map((screenshot, index) => <button onClick={() => setScreenshotIndex(index)}>
                <img src={screenshot.url}/>
                {sorts[sortIndex].display(screenshot)}
            </button>)}
            {gallery.length < 1 && <div id="gallery-empty">
                <h3>No Results Found</h3>
                <h4>Kachow!</h4>
            </div>}
        </div>
        {screenshotIndex !== null && typeof gallery[screenshotIndex] !== "undefined" && <div id="screenshot">
            <button id="screenshot-previous" onClick={() => setScreenshotIndex((gallery.length + screenshotIndex - 1) % gallery.length)}>🞀</button>
            <div id="screenshot-display">
                <img id="screenshot-image" src={gallery[screenshotIndex].url}/>
                <section>
                    <h3>{gallery[screenshotIndex].name} ({gallery[screenshotIndex].filename})</h3>
                    <span>{gallery[screenshotIndex].description}</span>
                    <span>
                        {camera !== null && <span><img src={camera.avatarURL}/> {camera.username}</span>}
                        <span>•</span>
                        {season !== null && <span>{season}</span>}
                        <span>•</span>
                        <span>{dateUTC(new Date(gallery[screenshotIndex].time))}</span>
                    </span>
                    <span>
                        <a href={gallery[screenshotIndex].url} target="_blank" rel="noopener noreferrer">View Image</a>
                        <span>•</span>
                        <a href={gallery[screenshotIndex].url.slice(0, ".avif".length * -1) + ".png"} target="_blank" rel="noopener noreferrer">Open Original</a>
                    </span>
                </section>
                <button id="screenshot-close" onClick={() => setScreenshotIndex(null)}>Close</button>
            </div>
            <button id="screenshot-next" onClick={() => setScreenshotIndex((screenshotIndex + 1) % gallery.length)}>🞂</button>
        </div>}
    </main>;
}
function PackerRoute() {
    // Creates packer route
    return <main id="packer">
        <h1>GSMC Pack</h1>
        <h2>"Still downloading manually? Check out gsmc-pack!"</h2>
        <div id="packer-list">
            <a href="https://github.com/DmmDGM/gsmc-pack/releases" target="_blank" rel="noopener noreferrer">Download GSMC Pack</a>
            <a href="https://github.com/DmmDGM/gsmc-pack" target="_blank" rel="noopener noreferrer">Clone from Source (Requires Bun)</a>
            <a href="https://pack.iipython.dev" target="_blank" rel="noopener noreferrer">Use Web Version (by iiPythonx)</a>
        </div>
        <div id="packer-disclaimer">
            <p>A tool to downloads mods, shaders, resourcepacks, and more automatically, so you don't have to do it manually!</p>
            <p>(All downloads are pulled directly from their intended sources to support the original content creators.)</p>
            <p>(GSMC Pack is neither approved by or associated with Mojang Studio or Microsoft.)</p>
        </div>
    </main>;
}
function MoreRoute() {
    // Creates more route
    return <main id="more">
        <h1>More Information</h1>
        <h2>"The boring stuff goes here."</h2>
        <section>
            <h3>Privacy Policy</h3>
            <p>
                Geesecraft Website (gsmc.dmmdgm.dev), by itself, does not collect cookies or personal information from visitors.
                After all, it is mostly a static site for season archival and for hosting raw data files related to Geesecraft.
                Feel free to check the source code for accuracy, which can be found in the upper right corner or below in the footer.
            </p>
            <p>
                However, it does use Cloudflare to provide service.
                Please see <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">Cloudflare's Privacy Policy</a> for more information on how Cloudflare processes your information.
            </p>
            <p>
                Additionally, some pages may have YouTube embeds or contain links directed to YouTube.
                Please see <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube's Terms of Service</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a> for more information on how Google processes your information.
            </p>
            <p>
                Links directed to <a href="https://iipython.dev/" target="_blank" rel="noopener noreferrer">https://iipython.dev</a> and all subdomains are subjected to <a href="https://iipython.dev/privacy.txt" target="_blank" rel="noopener noreferrer">iiPython's Privacy Policy</a>.
            </p>
            <p>
                Links directed to Discord and GitHub are subjected to <a href="https://discord.com/privacy/" target="_blank" rel="noopener noreferrer">Discord's Privacy Policy</a> and <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">GitHub's Privacy Policy</a> respectively.
            </p>
        </section>
        <section>
            <h3>License</h3>
            <p>
                "Geesecraft" isn't exactly trademarked, but please follows the policy of "dont disrespect the brand bro".
                Geesecraft Website (gsmc.dmmdgm.dev) and all its derived asset files are protected under the <a href="https://mit-license.org/" target="_blank" rel="nooperner noreferrer">MIT license</a>.
                All data files, including, but not limited to, season archive files, gallery images, and world downloads, are protected under <a href="https://www.wtfpl.net/" target="_blank" rel="noopener noreferrer">WTFPL</a>.
            </p>
        </section>
        <section>
            <h3>API Usage</h3>
            <p>
                Try not to spam it? We made the API usage open and free to everyone because we think everyone should have access to our Geesecraft archive, (and also because we can't keep track of it since we don't collect any data from you).
            </p>
            <p>
                • "/api/archives" - get all of the season archives' "season.json" in a single array
            </p>
            <p>
                • "/api/archives/:season" - get a specific season archive's "season.json"
            </p>
            <p>
                • "/api/archives/:season/gallery" - see "/api/galleries/:season"
            </p>
            <p>
                • "/api/archives/:season/profiles" - get all of the memebers's details in the specific season
            </p>
            <p>
                • "/api/galleries" - get all of the season archives' gallery in a single array
            </p>
            <p>
                • "/api/galleries/:season" - get a specific season archive's gallery
            </p>
            <p>
                • "/api/profiles" - get all of the members' details in the entirety of Geesecraft
            </p>
            <p>
                • "/api/profiles/:player" - get a specific member's details from Geesecraft
            </p>
        </section>
        <section>
            <h3>Kachow</h3>
            <p>Last Updated: 2025-01-12 23:09 EST.</p>
        </section>
    </main>;
}
function ErrorRoute() {
    // Creates error route
    return <main id="error">
        <h1>Uh huh.</h1>
        <h2>I don't know, man.</h2>
        <a href="/">Return to Home</a>
    </main>;
}

// Defines app
function App() {
    // Creates app
    return <LocationProvider>
        <nav>
            <div id="geesecraft">
                <img src="/assets/bread.png"/>
                <div>Geesecraft</div>
            </div>
            <ul id="tabs">
                <li><a href="/">Home</a></li>
                <li><a href="/archives">Archives</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/packer">Packer</a></li>
                <li><a href="/more">More</a></li>
            </ul>
            <div id="github">
                <a href="https://github.com/dev-dmmdgm/dev-dmmdgm-gsmc" target="_blank" rel="noopener noreferrer">&lt;/&gt;</a>
            </div>
        </nav>
        <Router>
            <Route path="/" component={HomeRoute}/>
            <Route path="/archives" component={ArchivesRoute}/>
            <Route path="/archives/:season" component={ArchiveRoute}/>
            <Route path="/gallery/" component={GalleryRoute}/>
            <Route path="/packer" component={PackerRoute}/>
            <Route path="/more" component={MoreRoute}/>
            <Route default component={ErrorRoute}/>
        </Router>
        <footer>
            <div>Geesecraft Server by <a href="https://iipython.dev/" target="_blank" rel="noopener noreferrer">iiPython</a> @ 2021 - 2026</div>
            <a href="https://discord.gg/HYgcp85g6u" target="_blank" rel="noopener noreferrer">Discord</a>
            <div>IP: gsmc.dmmdgm.dev</div>
            <a href="https://github.com/dev-dmmdgm/dev-dmmdgm-gsmc" target="_blank" rel="noopener noreferrer">GitHub</a>
            <div>Geesecraft Website by <a href="https://dmmdgm.dev/" target="_blank" rel="noopener noreferrer">DmmD GM</a> @ 2024 - 2026</div>
        </footer>
    </LocationProvider>;
}

// Renders app
render(<App/>, document.getElementById("app")!);

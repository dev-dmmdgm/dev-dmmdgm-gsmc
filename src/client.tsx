// Imports
import type { RoutePropsForPath } from "preact-iso";
import type { Archive, Gallery, Profile, Screenshot } from "./type";
import DOMPurity from "dompurify";
import { marked } from "marked";
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import "./style.css";

// Defines root
const root = "http://127.0.0.1:3000";

// Defines routes
function HomeRoute() {
    // Defines splash
    useEffect(() => {
        // Creates splash urls
        const splashURLs = [
            "/data/s1/gallery/park_at_night.avif",
            "/data/s2/gallery/stable.avif",
            "/data/s3/gallery/ancient_city_full.avif",
            "/data/s3/gallery/welcome_to_geeseville.avif",
            "/data/s4/gallery/race_to_space.avif",
            "/data/s5/gallery/main_basement_2.avif",
            "/data/s6/gallery/fountain_beacon.avif",
            "/data/s6/gallery/iron_farm_sunrise.avif",
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
                <img src="/data/s1/gallery/ban_hammer.avif"/>
                <img src="/data/s1/gallery/no_trespassing.avif"/>
                <img src="/data/s2/gallery/dmmd_looking_up.avif"/>
            </div>
            <div>
                <p>
                    Modern Geesecraft actually hasn't changed much since its original form.
                    At its core, it is still all about the same free expression, loose rules (a.k.a. none), infinite possibilities, and casual chitchat time with friends as always.
                    And, of course, deep down, we are still the same geese as when we first started playing Geesecraft as well.
                </p>
            </div>
            <div>
                <img src="/data/s5/gallery/t2_rocket.avif"/>
                <img src="/data/s6/gallery/dmmd_ruby.avif"/>
                <img src="/data/s6/gallery/k4ffu_staring_contest.avif"/>
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
                <img src="/data/s6/gallery/bai_bai_chunk_3.avif"/>
                <img src="/data/s6/gallery/bai_bai_chunk_2.avif"/>
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
                <img src="/data/s3/gallery/building_iron_farm.avif"/>
                <img src="/data/s3/gallery/no_death_here_folks.avif"/>
                <img src="/data/s3/gallery/shulker_chaos.avif"/>
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
                <img src="/data/s4/gallery/base_of_operations.avif"/>
                <img src="/data/s4/gallery/silly_dmmd.avif"/>
            </div>
            <div>
                <p>
                    Beyond Tech Reborn and Applied Energistics 2, K4 and iiPython are also responsible for the space mod expedition when we had Ad Astra.
                    And DmmD becomes a self-proclaimed chef and is responsible for most of the agricultural mods, including Croptopia and Farmer's Delight.
                </p>
            </div>
            <div>
                <img src="/data/s4/gallery/goose_rockets.avif"/>
                <img src="/data/s4/gallery/looking_chilly.avif"/>
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
                <img src="/data/s4/gallery/weird_selfie.avif"/>
                <img src="/data/s3/gallery/vibes_1.avif"/>
                <img src="/data/s6/gallery/weeee.avif"/>
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
                <img src="/data/s6/gallery/iipython_sailing_into_sunset.avif"/>
                <img src="/data/s6/gallery/rainbow.avif"/>
                <img src="/data/s6/gallery/ravine_sunset.avif"/>
            </div>
        </section>
    </main>;
}
function ArchiveRoute(props: RoutePropsForPath<"/archives/:season">) {
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

    // Defines archive
    const [ archive, setArchive ] = useState<Archive>({
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
    });
    const [ content, setContent ] = useState<string>("");
    const [ profiles, setProfiles ] = useState<Profile[]>([]);
    const [ gallery, setGallery ] = useState<Gallery>([]);
    const [ screenshotIndex, setScreenshotIndex ] = useState<number | null>(null);
    const [ camera, setCamera ] = useState<Profile | null>(null);
    useEffect(() => {
        // Fetches api
        fetch(new URL(`/api/archives/${props.season}`, root)).then(async (response) => {
            // Creates archive
            if(!response.ok) return;
            const archiveJSON = await response.json() as Archive;
            setArchive(archiveJSON);

            // Creates content
            if(archiveJSON.contentURL !== null) {
                fetch(archiveJSON.contentURL).then(async (subresponse) => {
                    if(!subresponse.ok) return;
                    setContent(await subresponse.text());
                });
            }
        });
        fetch(new URL(`/api/archives/${props.season}/gallery`, root)).then(async (response) => {
            // Creates gallery
            if(!response.ok) return;
            const galleryJSON = await response.json() as Gallery;
            setGallery(galleryJSON.sort((a, b) => a.filename.localeCompare(b.filename)));
        });
        fetch(new URL(`/api/archives/${props.season}/profiles`, root)).then(async (response) => {
            // Creates profiles
            if(!response.ok) return;
            const profilesJSON = await response.json() as Profile[];
            setProfiles(profilesJSON);
        });
    }, []);
    useEffect(() => {
        if(screenshotIndex === null) setCamera(null);
        else fetch(new URL(`/api/profiles/${gallery[screenshotIndex].camera}`, root)).then(async (response) => {
            if(!response.ok) setCamera({ avatarURL: "", username: "", uuid: "" });
            setCamera(await response.json() as Profile);
        });
    }, [ screenshotIndex ]);
    
    // Creates archive route
    return <main id="archive">
        <img id="archive-splash" src={archive.bannerURL ?? ""}/>
        <div id="archive-data">
            <h1>{archive.title}</h1>
            <h2>{archive.description}</h2>
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
                        <ul>{archive.achievements.map((achievement) => <li><span>• {achievement}</span></li>)}</ul>
                    </section>
                    <section>
                        <h3>Modifications</h3>
                        <ul>{archive.modifications.map((modification) => <li><span>• {modification}</span></li>)}</ul>
                    </section>
                    <section>
                        <h3>Players</h3>
                        <ul>{profiles.map((profile) => <li><span>• <img src={profile.avatarURL}/> {profile.username}</span></li>)}</ul>
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
            <div id="archive-gallery">{gallery.map((screenshot, index) => <button onClick={() => setScreenshotIndex(index)}><img src={screenshot.url}/><span>{screenshot.name}</span></button>)}</div>
        </div>
        {screenshotIndex !== null ? <div id="screenshot">
            <button id="screenshot-previous" onClick={() => setScreenshotIndex((gallery.length + screenshotIndex - 1) % gallery.length)}>🞀</button>
            <div id="screenshot-display">
                <img id="screenshot-image" src={gallery[screenshotIndex].url}/>
                <section>
                    <h3>{gallery[screenshotIndex].name} ({gallery[screenshotIndex].filename})</h3>
                    <span>{gallery[screenshotIndex].description}</span>
                    <span>{camera !== null ? <><span><img src={camera.avatarURL}/> {camera.username}</span><span>•</span></> : <></>} {dateUTC(new Date(gallery[screenshotIndex].time))}</span>
                </section>
                <button id="screenshot-close" onClick={() => setScreenshotIndex(null)}>Close</button>
            </div>
            <button id="screenshot-next" onClick={() => setScreenshotIndex((screenshotIndex + 1) % gallery.length)}>🞂</button>
        </div> : <></>}
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
        fetch(new URL("/api/archives", root)).then(async (response) => {
            // Creates archives
            if(!response.ok) return;
            const archivesJSON = await response.json() as Archive[];
            if(archivesJSON.length === 0) return;
            archivesJSON.sort((a, b) => +new Date(a.since) - +new Date(b.since));
            
            // Updates listeners
            archivePreviousListener = async () => {
                // Checks busy
                if(archiveBusy) return;
                archiveBusy = true;

                // Cycles elements
                updateArchive(archiveBack, archivesJSON[(archivesJSON.length + archiveIndex - 2) % archivesJSON.length]);
                archiveBack.classList.replace("archive-back", "archive-left");
                archiveLeft.classList.replace("archive-left", "archive-front");
                archiveRight.classList.replace("archive-right", "archive-back");
                archiveFront.classList.replace("archive-front", "archive-right");
                [ archiveLeft, archiveFront, archiveBack, archiveRight ] = [ archiveBack, archiveLeft, archiveRight, archiveFront ];

                // Awaits animation
                archiveTimeout = setTimeout(() => {
                    archiveIndex = (archivesJSON.length + archiveIndex - 1) % archivesJSON.length;
                    archiveBusy = false;
                }, 500);
            };
            archiveNextListener = async () => {
                // Checks busy
                if(archiveBusy) return;
                archiveBusy = true;

                // Cycles elements
                updateArchive(archiveBack, archivesJSON[(archiveIndex + 2) % archivesJSON.length]);
                archiveBack.classList.replace("archive-back", "archive-right");
                archiveLeft.classList.replace("archive-left", "archive-back");
                archiveRight.classList.replace("archive-right", "archive-front");
                archiveFront.classList.replace("archive-front", "archive-left");
                [ archiveRight, archiveBack, archiveFront, archiveLeft ] = [ archiveBack, archiveLeft, archiveRight, archiveFront ];
                
                // Awaits animation
                archiveTimeout = setTimeout(() => {
                    archiveIndex = (archiveIndex + 1) % archivesJSON.length;
                    archiveBusy = false;
                }, 500);
            };
            
            // Appends listeners
            archivePrevious.addEventListener("click", archivePreviousListener);
            archiveNext.addEventListener("click", archiveNextListener);

            // Updates archives
            archiveIndex = archivesJSON.length - 1;
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
function GalleryRoute() {
    return <></>;
}
function PackerRoute() {
    return <></>;
}
function MoreRoute() {
    return <></>;
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
            <div>Geesecraft Server by iiPython @ 2021 - 2026</div>
            <a href="https://discord.gg/HYgcp85g6u" target="_blank" rel="noopener noreferrer">Discord</a>
            <div>IP: gsmc.dmmdgm.dev</div>
            <a href="https://github.com/dev-dmmdgm/dev-dmmdgm-gsmc" target="_blank" rel="noopener noreferrer">GitHub</a>
            <div>Geesecraft Website by DmmD GM @ 2024 - 2026</div>
        </footer>
    </LocationProvider>;
}

// Renders app
render(<App/>, document.getElementById("app")!);

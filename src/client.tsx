// Imports
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import "./style.css";
import type { Archive } from "./type";

// Defines routes
function HomeRoute() {
    // Defines splash
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
    useEffect(() => {
        // Defines elements
        const splashBack = document.getElementById("splash-back") as HTMLImageElement;
        const splashFront = document.getElementById("splash-front") as HTMLImageElement;
        
        // Initializes elements
        splashFront.src = splashURLs[splashIndex];
        splashIndex = (splashIndex + 1) % splashURLs.length;
        splashBack.src = splashURLs[splashIndex];
        
        // Cycles elements
        let timeout: NodeJS.Timeout = setTimeout(() => {});
        const interval = setInterval(async () => {
            splashFront.style.opacity = "0%";
            timeout = setTimeout(() => {
                splashFront.src = splashBack.src;
                splashFront.style.opacity = "";
                timeout = setTimeout(() => {
                    splashIndex = (splashIndex + 1) % splashURLs.length;
                    splashBack.src = splashURLs[splashIndex];
                }, 3000);
            }, 3000);
        }, 15000);
        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
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
        <div class="about">
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
        </div>
        <div class="about float">
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
        </div>
        <div class="about">
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
        </div>
        <div class="about float">
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
        </div>
        <div class="about">
            <h3>Nyaa~ Kachow! :3</h3>
            <div>
                <p>
                    Well, that's it about Geesecraft. Thank you for reading!
                </p>
            </div>
            <div>
                <p>
                    Go checkout the other pages on this website.
                </p>
            </div>
            <div>
                <img src="/data/s6/gallery/iipython_sailing_into_sunset.avif"/>
                <img src="/data/s6/gallery/rainbow.avif"/>
                <img src="/data/s6/gallery/ravine_sunset.avif"/>
            </div>
        </div>
    </main>;
}
function ArchiveRoute() {
    return <></>;   
}
function ArchivesRoute() {
    const [ archives, setArchives ] = useState<Archive[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/api/archives").then(async (response) => setArchives(await response.json() as Archive[]));
    }, []);
    return <main id="archives">
        {archives.map((archive) => {
            return <div>{ archive.title }</div>;
        })}
    </main>;
}
function GalleryRoute() {
    return <></>;
}
function GalleriesRoute() {
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
                <li><a href="/galleries">Galleries</a></li>
                <li><a href="/packer">Packer</a></li>
                <li><a href="/more">More</a></li>
            </ul>
            <a id="github" href="https://github.com/dev-dmmdgm/dev-dmmdgm-gsmc" target="_blank" rel="noopener noreferrer">&lt;/&gt;</a>
        </nav>
        <Router>
            <Route path="/" component={HomeRoute}/>
            <Route path="/archives" component={ArchivesRoute}/>
            <Route path="/archives/:season" component={ArchiveRoute}/>
            <Route path="/galleries" component={GalleriesRoute}/>
            <Route path="/galleries/:season" component={GalleryRoute}/>
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

// Imports
import { render } from "preact";
import { LocationProvider, Route, Router } from "preact-iso";
import "./style.css";
import { useEffect, useRef } from "preact/hooks";

// Defines routes
function Home() {
    // Defines splash
    const splashURLs = [
        "/data/s3/gallery/welcome_to_geeseville.avif",
        "/data/s4/gallery/race_to_space.avif",
        "/data/s6/gallery/fountain_beacon.avif",
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
            splashIndex = (splashIndex + 1) % splashURLs.length;
            splashBack.src = splashURLs[splashIndex];
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

    return <main id="home">
        <div id="splash">
            <img id="splash-back"/>
            <img id="splash-front"/>
            <h1>Welcome to Geesecraft!</h1>
            <h2>"Of the Gees, by the Gees, for the Gees!"</h2>
            <div>🞃</div>
        </div>
        <div>

        </div>
    </main>;
}
function Archive() {
    return <></>;   
}
function Archives() {
    return <></>;
}
function Gallery() {
    return <></>;
}
function Galleries() {
    return <></>;
}
function Packer() {
    return <></>;
}
function More() {
    return <></>;
}
function Upload() {
    return <></>;
}
function Error() {
    return <></>;
}

// Creates app
function App() {
    return <LocationProvider>
        <nav>
            <div id="geesecraft">
                <img src="/bread.png"/>
                <div>Geesecraft</div>
            </div>
            <div id="tabs">
                <a href="/">Home</a>
                <a href="/archives">Archives</a>
                <a href="/galleries">Galleries</a>
                <a href="/packer">Packer</a>
                <a href="/more">More</a>
            </div>
            <div id="upload">
                <a href="/upload">Upload</a>
            </div>
        </nav>
        <Router>
            <Route path="/" component={Home}/>
            <Route path="/archives" component={Archives}/>
            <Route path="/archives/:season" component={Archive}/>
            <Route path="/galleries" component={Galleries}/>
            <Route path="/galleries/:season" component={Gallery}/>
            <Route path="/packer" component={Packer}/>
            <Route path="/more" component={More}/>
            <Route default component={Error}/>
        </Router>
    </LocationProvider>;
}

// Renders app
render(<App/>, document.getElementById("app")!);

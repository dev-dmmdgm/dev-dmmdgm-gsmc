// Impots
import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";

// Defines app
export function App() {
	return <LocationProvider>
        <main>
            <Router>
            </Router>
        </main>
    </LocationProvider>;
}

// Renders app
render(<App/>, document.getElementById("app"));

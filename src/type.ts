// Defines archive interface
export interface Archive {
    achievements:  string[];       // Array of achievements done on the server.
    active:        boolean;        // Whether the season is still active.
    bannerURL:     string | null;  // URL to the banner image.
    contentURL:    string | null;  // URL to the content page file.
    description:   string;         // Short description about the season.
    modifications: string[];       // Array of modification names that were installed on the server.
    packURL:       string | null;  // URL to the gsmc-pack file.
    platform:      string;         // Minecraft platform that the server used.
    players:       string[];       // Array of player UUIDs that played on the server.
    season:        string;         // Season ID for API usage.
    since:         string;         // Time when the season began.
    title:         string;         // Official title of the season.
    until:         string;         // Time when the season ended.
    version:       string;         // Minecraft version that the server used.
    worldURL:      string | null;  // URL to the world download.
}

// Defines profile interface
export interface Profile {
    avatarURL:     string;         // URL to the player's avatar.
    username:      string;         // Minecraft in-game username for the player.
    uuid:          string;         // Player's Minecraft UUID.
}

// Defines screenshot interface
export interface Screenshot {
    camera:        string;         // Player UUID of the person who took this screenshot.
    description:   string;         // Short description about the screenshot.
    filename:      string;         // Screenshot filename for download.
    name:          string;         // Short title for the screenshot.
    season:        string;         // Season ID for API usage.
    time:          string;         // Time when the screenshot was taken.
    url:           string;         // URL to the screenshot file.
}

// Defines gallery type
export type Gallery = Screenshot[];

fetch("https://api.minecraftservices.com/minecraft/profile/lookup/617d0b8a-148f-47c0-b4f4-36dfe1ac79c7").then(async (res) => {
    const json = await res.json();
    console.log(json);
});

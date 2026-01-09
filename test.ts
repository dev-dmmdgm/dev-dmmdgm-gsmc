if(Bun.isMainThread) {
    const worker = new Worker("./test.ts");
    worker.postMessage({ test: "hai" });
}
else {
    self.addEventListener("message", async (data) => {
        console.log(data);
        await Bun.sleep(1000);
        // process.exit();
    });
}
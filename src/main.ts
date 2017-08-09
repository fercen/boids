const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    count: 300,
    framerate: 60
};

let flock = new Flock(config.width, config.height, config.count);

const boidPoints = [new Vector(-5, -5), new Vector(5,0), new Vector(-5, 5)];

let renderer = new SvgRenderer(flock, boidPoints);

function animate() {
    flock.step();
    renderer.draw(flock);
}

let animation = setInterval(animate, 1000 / config.framerate);

function stop() {
    clearInterval(animation);
}
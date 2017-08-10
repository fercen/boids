import {getRenderer} from "./modules/renderer";
import {Flock} from "./modules/flock";
import {Vector} from "./modules/vector";
import {SvgRenderer} from "./modules/svgRenderer";
import {CanvasRenderer} from "./modules/canvasRenderer";

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    count: 300,
    framerate: 60
};

let running: boolean = true;

const flock = new Flock(config.width, config.height, config.count);

const boidPoints = [new Vector(-5, -5), new Vector(5, 0), new Vector(-5, 5)];

let renderer = getRenderer(SvgRenderer, flock, boidPoints);


function changeRenderer(data: KeyboardEvent) {

    switch (data.code) {
        case "Tab" :
            renderer.clear();
            if (renderer instanceof CanvasRenderer) {
                renderer = getRenderer(SvgRenderer, flock, boidPoints);
            } else if (renderer instanceof SvgRenderer) {
                renderer = getRenderer(CanvasRenderer, flock, boidPoints);
            }
            data.preventDefault();
            break;

        case "Space" :
            if (running) {
                clearInterval(animation);
                running = false;
            } else {
                animation = setInterval(animate, 1000 / config.framerate);
                running = true;
            }
            data.preventDefault();
            break;
    }
}

function animate() {
    flock.step();
    renderer.draw(flock);
}

let animation = setInterval(animate, 1000 / config.framerate);

document.addEventListener("keydown", changeRenderer);
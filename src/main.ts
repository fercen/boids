import {getRenderer, IRenderer} from "./modules/renderer";
import {Flock} from "./modules/flock";
import {Vector} from "./modules/vector";
import {SvgRenderer} from "./modules/svgRenderer";
import {CanvasRenderer} from "./modules/canvasRenderer";

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    count: 300,
    framerate: 70
};

function getParameterByName(name: string) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

let running: boolean = true;

let countParameter = parseInt(getParameterByName("count"));
let count = isNaN(countParameter) ? config.count : countParameter;


const flock = new Flock(config.width, config.height, count);

const boidPoints = [new Vector(-5, -5), new Vector(5, 0), new Vector(-5, 5)];

let renderer : IRenderer;

if(getParameterByName("renderer") == "canvas") {
    renderer = getRenderer(CanvasRenderer, flock, boidPoints);
}else{
    renderer = getRenderer(SvgRenderer, flock, boidPoints);
}

function changeRenderer() {
    renderer.clear();
    if (renderer instanceof CanvasRenderer) {
        renderer = getRenderer(SvgRenderer, flock, boidPoints);
    } else if (renderer instanceof SvgRenderer) {
        renderer = getRenderer(CanvasRenderer, flock, boidPoints);
    }
}

function handleKeypress(data: KeyboardEvent) {

    switch (data.code) {
        case "Tab" :
            changeRenderer();
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

document.addEventListener("keydown", handleKeypress);
import {Flock} from './modules/flock';

const config = {
    width: 400,
    height: 400,
    count: 10
};

function drawSVG () {
    let $vg = document.createElement('svg');
    $vg.setAttributeNS("http://www.w3.org/2000/svg", "viewBox", "0 0 400 400");
    document.body.appendChild($vg);
}

drawSVG();

let flock = new Flock(config.width, config.height, config.count);
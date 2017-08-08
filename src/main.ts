const svgNS = "http://www.w3.org/2000/svg";
const xlinkNS = "http://www.w3.org/1999/xlink";

const config = {
    width: 1200,
    height: 800,
    count: 300,
    framerate: 40
};

const $vg = document.createElementNS(svgNS, "svg");

function drawSVG (flock: Flock) {

    $vg.setAttribute( "viewBox"
        , "0 0 " + String(config.width) + " " + String(config.height));
    $vg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    let $defs = document.createElementNS(svgNS, "defs");
    let $boid = document.createElementNS(svgNS, "g");
    let $ymbol = document.createElementNS(svgNS, "polyline");

    $boid.setAttribute( "id", "boid");
    $ymbol.setAttribute( "points", "-5,-5 5,0 -5, 5");

    $boid.appendChild($ymbol);
    $defs.appendChild($boid);
    $vg.appendChild($defs);

    document.body.appendChild($vg);

    for(let boid of flock.boids){
        let $boid = document.createElementNS(svgNS, "g");
        let $use = document.createElementNS(svgNS, "use");
        $boid.setAttribute( "transform", `translate(${String(boid.location.x)} ${String(boid.location.y)})` );
        $use.setAttribute("transform", `rotate(${boid.orientation * 180 / Math.PI})`);
        $boid.appendChild($use);
        $vg.appendChild($boid);
        $use.setAttributeNS(xlinkNS, "href", "#boid");
        boid.element = $boid;
    }
}

let flock = new Flock(config.width, config.height, config.count);

drawSVG(flock);

function animateSVG(){
    // Step the flock and then reposition and reorient each boid element
    flock.step();
    for(let boid of flock.boids){
        boid.element.setAttribute( "transform"
            , `translate(${String(boid.location.x)} ${String(boid.location.y)})` );
        let $use = boid.element.firstElementChild;
        $use.setAttribute( "transform", "rotate(" + (boid.orientation * 180 / Math.PI) + ")")
    }

}

let animation = setInterval(animateSVG, 1000 / config.framerate);

function stop() {
    clearInterval(animation);
}
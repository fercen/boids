
const config = {
    width: 400,
    height: 400,
    count: 100
};

function drawSVG (flock: Flock) {


    const svgNS = "http://www.w3.org/2000/svg";
    const xlinkNS = "http://www.w3.org/1999/xlink";

    let $vg = document.createElementNS(svgNS, "svg");
    $vg.setAttribute( "viewBox"
        , "0 0 " + String(config.width) + " " + String(config.height));
    $vg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");

    let $defs = document.createElementNS(svgNS, "defs");
    let $boid = document.createElementNS(svgNS, "g");
    let $ymbol = document.createElementNS(svgNS, "polyline");

    $boid.setAttribute( "id", "boid");
    $ymbol.setAttribute( "points", "0,-5 10,0 0, 5");

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
    flock.step();
    for(let boid of flock.boids){
        boid.element.setAttribute( "transform"
            , `translate(${String(boid.location.x)} ${String(boid.location.y)})` );
        let $use = boid.element.firstElementChild;
        $use.setAttribute( "transform", "rotate(" + (boid.orientation * 180 / Math.PI) + ")")
    }
}

Boid.vision = 30;
Boid.speed = 0.2;
Boid.clearance = 20;
Boid.angularVelocity = .1;
let animation = setInterval(animateSVG, 10);

function stop() {
    clearInterval(animation);
}
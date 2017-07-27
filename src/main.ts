
const config = {
    width: 400,
    height: 400,
    count: 10
};

function drawSVG (flock: Flock) {


    const svgNS = "http://www.w3.org/2000/svg/";
    const xmlNS = "http://www.w3.org/2000/xmlns/";
    const xlinkNS = "http://www.w3.org/1999/xlink/";


    let $vg = document.createElementNS(svgNS, "svg");
    $vg.setAttributeNS(xmlNS, "xmlns:xlink", "http://www.w3.org/1999/xlink");
    $vg.setAttributeNS(xmlNS, "xmlns", "http://www.w3.org/2000/svg");
    $vg.setAttributeNS(svgNS, "viewBox", "0 0 400 400");
    $vg.setAttribute("width", "100%");
    $vg.setAttribute("height", "100%");

    let $rekt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    $rekt.setAttributeNS(svgNS, "width", "100");
    $rekt.setAttributeNS(svgNS, "height", "70");
    $rekt.setAttributeNS(svgNS, "fill", "black");
    $vg.appendChild($rekt);


    let $defs = document.createElementNS(svgNS, "defs");
    let $boid = document.createElementNS(svgNS, "g");
    let $ymbol = document.createElementNS(svgNS, "polyline");

    $boid.setAttributeNS(svgNS, "id", "boid");
    $ymbol.setAttributeNS(svgNS, "points", "0,-5 10,0 0, 5");

    $boid.appendChild($ymbol);
    $defs.appendChild($boid);
    $vg.appendChild($defs);
    document.body.appendChild($vg);

    for(let boid of flock.boids){
        let $boid = document.createElementNS(svgNS, "g");
        let $use = document.createElementNS(svgNS, "use");
        $boid.setAttribute( "transform", "translate(" + String(boid.location.x) + " " + String(boid.location.y) + ")" );
        $boid.appendChild($use);
        $vg.appendChild($boid);
        $use.setAttributeNS(xlinkNS, "href", "#boid");
        boid.element = $boid;
    }
}

let flock = new Flock(config.width, config.height, config.count);

drawSVG(flock);




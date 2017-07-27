class Boid {
    location: Vector;
    velocity: Vector;
    orientation: number;
    element: SVGGElement;

    static vision: number;
    static speed: number;
    static clearance: number;
    static angularVelocity: number;

    constructor(location = new Vector(), velocity = new Vector(1, 0)){
        this.location = location;
        this.velocity = velocity;
        this.orientation = velocity.angle();
    }

    static separation(neighbors: Boid[]): Vector{
        let result = new Vector();
        for(let boid of neighbors){




            let component = new Vector().add(boid.location);
            let magnitude = component.magnitude();
            if(magnitude > Boid.clearance){
                component.zero();
            }else{
                component = component.unit().scale(Boid.clearance - magnitude);
            }
            result = result.add(component);
        }
        return result;
    }
    static cohesion(neighbors: Boid[]): Vector{
        let center = new Vector();
        for(let boid of neighbors){
            center = center.add(boid.location);
        }
        return center.scale(1 / neighbors.length);
    }
    static alignment(neighbors: Boid[]): Vector{
        return new Vector();
    }

    step(flock: Flock): Boid{
        let delta = this.velocity;
        let neighbors = flock.getNeighbors(this.location, Boid.vision);

        let circler = document.createElementNS(svgNS, "circle");
        circler.setAttribute("r", "15");
        circler.setAttribute("cx", String(this.location.x));
        circler.setAttribute("cy", String(this.location.y));
        $vg.appendChild(circler);

        let markers: SVGCircleElement[] = [];
        for(let neighbor of neighbors){
            let circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("r", "10");
            circle.setAttribute("cx", String(neighbor.location.x + this.location.x));
            circle.setAttribute("cy", String(neighbor.location.y + this.location.y));
            markers.push(circle);
            $vg.appendChild(circle);
        }


        let separation = new Vector();
        let alignment = new Vector();
        let cohesion = new Vector();

        // No point in applying the rules if the boid is alone
        if(neighbors.length > 0){
            separation = Boid.separation(neighbors);
            alignment = Boid.alignment(neighbors);
            cohesion = Boid.cohesion(neighbors);
        }

        delta = delta.add(separation, alignment, cohesion).unit();

        let next = this.clone();
        next.location = next.location.add(delta.scale(Boid.speed));


        let diff: number = delta.angle() - this.orientation;
        diff *= .1;

        let clamp = Boid.angularVelocity * 180 / Math.PI;
        if(Math.abs(diff) > clamp){
            diff = diff > 0 ? clamp : -clamp;
        }

        next.orientation = this.orientation + diff;
        next.location.x = (next.location.x + flock.width) % flock.width;
        next.location.y = (next.location.y + flock.height) % flock.height;

        circler.remove();
        for(let circle of markers){
            circle.remove();
        }
        return next;
    }

    clone(): Boid{
        let clone = new Boid(this.location, this.velocity);
        clone.orientation = this.orientation;
        clone.element = this.element;
        return clone;
    }
}
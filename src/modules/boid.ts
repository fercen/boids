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

    separation(neighbors: Boid[]): Vector{
        let result = new Vector();
        for(let boid of neighbors){
            let component = new Vector(this.location.x, this.location.y).sub(boid.location);
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
    cohesion(neighbors: Boid[]): Vector{
        let center = new Vector();
        for(let boid of neighbors){
            center = center.add(boid.location);
        }
        return center.scale(1 / neighbors.length);
    }
    alignment(neighbors: Boid[]): Vector{
        return new Vector();
    }

    step(flock: Flock): Boid{
        let delta = this.velocity;
        let neighbors = flock.getNeighbors(this.location, Boid.vision);

        let separation = new Vector();
        let alignment = new Vector();
        let cohesion = new Vector();

        // No point in applying the rules if the boid is alone
        if(neighbors.length > 0){
            separation = this.separation(neighbors);
            alignment = this.alignment(neighbors);
            cohesion = this.cohesion(neighbors);
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

        return next;
    }

    clone(): Boid{
        let clone = new Boid(this.location, this.velocity);
        clone.orientation = this.orientation;
        clone.element = this.element;
        return clone;
    }
}
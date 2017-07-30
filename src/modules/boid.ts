class Boid {
    location: Vector;
    velocity: Vector;
    orientation: number;
    element: SVGGElement;

    static vision = 30;
    static speed = 1;
    static clearance = 10;
    static angularVelocity = 0.1;

    static cohesionFactor = 2;
    static separationFactor = 10;
    static alignmentFactor = 5;
    static inertia = 10;

    constructor(location = new Vector(), velocity = new Vector(1, 0)){
        this.location = location;
        this.velocity = velocity;
        this.orientation = velocity.angle();
    }

    static separation(neighbors: Boid[]): Vector{
        let result = new Vector();
        for(let neighbor of neighbors){
            let magnitude = neighbor.location.magnitude();
            if(magnitude < Boid.clearance){
                let factor = (Boid.clearance - magnitude) / magnitude;
                let component = neighbor.location;
                component = component.unit();
                component = component.scale(factor * Boid.clearance);
                component = component.neg();
                //result = result.add(neighbor.location.unit().scale(factor).neg());
                result = result.add(component);
            }
        }
        return result.unit();
    }
    static cohesion(neighbors: Boid[]): Vector{
        let center = new Vector();
        for(let boid of neighbors){
            center = center.add(boid.location);
        }
        return center.unit();
    }
    static alignment(neighbors: Boid[]): Vector{
        let result = new Vector();
        for(let neighbor of neighbors){
            result = result.add(neighbor.velocity.unit());
        }
        return result.unit();
    }

    step(flock: Flock): Boid{
        Debug.hilight(this.location, Boid.clearance, "red");
        Debug.hilight(this.location, Boid.vision, "silver");

        let delta = this.velocity.unit().scale(Boid.inertia);
        let neighbors = flock.getNeighbors(this.location, Boid.vision);


        for(let neighbor of neighbors){
            //Debug.hilight(neighbor.location, 10);
        }


        let separation = new Vector();
        let alignment = new Vector();
        let cohesion = new Vector();

        // No point in applying the rules if the boid is alone
        if(neighbors.length > 0){
            separation = Boid.separation(neighbors).scale(Boid.separationFactor);
            alignment = Boid.alignment(neighbors).scale(Boid.alignmentFactor);
            cohesion = Boid.cohesion(neighbors).scale(Boid.cohesionFactor);
        }

        Debug.line(this.location, this.location.add(separation), "red");
        Debug.line(this.location, this.location.add(cohesion), "green");
        Debug.line(this.location, this.location.add(alignment), "blue");

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

        Debug.clear();
        return next;
    }

    clone(): Boid{
        let clone = new Boid(this.location, this.velocity);
        clone.orientation = this.orientation;
        clone.element = this.element;
        return clone;
    }
}
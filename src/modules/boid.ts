class Boid {
    location: Vector;
    velocity: Vector;
    orientation: number;
    element: SVGGElement;

    static vision = 30;
    static speed = 1;
    static clearance = 15;
    static angularVelocity = 0.1;

    static cohesionFactor = 2;
    static separationFactor = 20;
    static alignmentFactor = 5;
    static inertia = 10;
    static drag = 0.95;

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

        let delta = this.velocity.unit().scale(Boid.inertia);
        let neighbors = flock.getNeighbors(this.location, Boid.vision);


        let separation = new Vector();
        let alignment = new Vector();
        let cohesion = new Vector();

        // No point in applying the rules if the boid is alone
        if(neighbors.length > 0){
            separation = Boid.separation(neighbors).scale(Boid.separationFactor);
            alignment = Boid.alignment(neighbors).scale(Boid.alignmentFactor);
            cohesion = Boid.cohesion(neighbors).scale(Boid.cohesionFactor);
        }


        delta = delta.add(separation, alignment, cohesion).unit().scale(Boid.speed);

        if(delta.sub(this.velocity).magnitude() < 0.2){
            delta = this.velocity;
        }

        let next = this.clone();
        next.location = next.location.add(delta);

        next.orientation = delta.scale(0.01).add(this.velocity).angle();
        next.location.x = (next.location.x + flock.width) % flock.width;
        next.location.y = (next.location.y + flock.height) % flock.height;
        next.velocity = delta.scale(1 - Boid.drag).add(this.velocity.scale(Boid.drag));

        return next;
    }

    clone(): Boid{
        let clone = new Boid(this.location, this.velocity);
        clone.orientation = this.orientation;
        clone.element = this.element;
        return clone;
    }
}
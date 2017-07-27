class Boid {
    location: Vector;
    velocity: Vector;
    orientation: number;
    element: SVGGElement;

    static vision: number;
    static speed: number;

    constructor(location = new Vector(), velocity = new Vector(1, 0)){
        this.location = location;
        this.velocity = velocity;
        this.orientation = velocity.angle();
    }

    step(flock: Flock): Boid{
        let neigbors = flock.getNeighbors(this.location, Boid.vision);

        let delta = this.velocity;

        let next = this.clone();
        next.location = next.location.add(delta.scale(Boid.speed));

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
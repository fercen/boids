class Boid {
    location: Vector;
    velocity: Vector;
    orientation: Number;
    element: Element;

    constructor(location = new Vector(), velocity = new Vector(1, 0)){
        this.location = location;
        this.velocity = velocity;
        this.orientation = velocity.angle();
    }
}
class Boid {
    location: Vector;
    velocity: Vector;
    orientation: number;  // The current angle of this boid
    element: SVGGElement; // Reference to the SVG element that represents this boid

    static vision = 30;             // The maximum distance to a boid that can affect this boids behavior
    static speed = 1;               // Multiplier of the velocity vector when calculating step
    static clearance = 15;          // The range of the avoidance rule
    static angularVelocity = 0.1;   // Limits the orientation change speed

    static cohesionFactor = 2;      // v
    static separationFactor = 10;   // Multiplier to the rule result vectors
    static alignmentFactor = 5;     // ^
    static inertia = 10;            // Multiplier of the current velocity
    static drag = 0.8;              // Change factor between the next and current velocity of a boid

    constructor(location = new Vector(), velocity = new Vector(1, 0)){
        this.location = location;
        this.velocity = velocity;
        this.orientation = velocity.angle();
    }

    /**
     *  The rules of boid flock behavior
     */

    /**
     * A boid will avoid colliding with other boids
     * @param {Boid[]} neighbors An array of boids within the boid field of vision
     * @returns {Vector} The effect of this rule
     */
    static separation(neighbors: Boid[]): Vector{

        let result = new Vector();

        for(let neighbor of neighbors){
            let magnitude = neighbor.location.magnitude();

            if(magnitude < Boid.clearance){
                // The closer the neighbor, the stronger the avoidance
                let factor = (Boid.clearance - magnitude) / magnitude;
                let component = neighbor.location;
                component = component.unit().scale(factor * Boid.clearance).neg();
                result = result.add(component);
            }
        }

        return result.unit();
    }

    /**
     * A boid will steer towards the center of mass of the neighboring boids
     * @param {Boid[]} neighbors An array of boids within the boid field of vision
     * @returns {Vector} The effect of this rule
     */
    static cohesion(neighbors: Boid[]): Vector{
        let center = new Vector();
        for(let boid of neighbors){
            center = center.add(boid.location);
        }
        return center.unit();
    }

    /**
     * A boid will assume the average orientation of the neighboring boids
     * @param {Boid[]} neighbors An array of boids within the boid field of vision
     * @returns {Vector} The effect of this rule
     */
    static alignment(neighbors: Boid[]): Vector{
        let result = new Vector();
        for(let neighbor of neighbors){
            result = result.add(neighbor.velocity.unit());
        }
        return result.unit();
    }


    /**
     * Calculate the next position of this boid based on the rules
     * @param {Flock} flock The flock whose member the boid is
     * @returns {Boid} A clone of the boid with the calculated next position, orientation and velocity
     */
    step(flock: Flock): Boid{

        let delta = this.velocity.unit().scale(Boid.inertia); // The sum of rule vectors
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

        // Work on a clone so that other boids don't react to the next state
        let next = this.clone();

        next.location = next.location.add(delta);

        // Smooth orientation change
        next.orientation = delta.scale(Boid.angularVelocity).add(Vector.fromAngle(this.orientation)).angle();

        // Wrapping with JS modulo operator
        next.location.x = (next.location.x + flock.width) % flock.width;
        next.location.y = (next.location.y + flock.height) % flock.height;

        // Apply drag
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
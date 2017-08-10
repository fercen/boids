/**
 * Boid algorithm TypeScript implementation by Janne Peltonen, 2017
 */
import {Boid} from "./boid";
import {Vector} from "./vector";

export class Flock {

    boids: Boid[];
    width: number;
    height: number;

    /**
     * Create a flock with boids in random locations.
     * @param {number} width The width of the internal coordinate system
     * @param {number} height The height of the internal coordinate system
     * @param {number} count Number of boids to generate
     */
    constructor(width: number, height: number, count: number){
        this.boids = [];
        this.width = width;
        this.height = height;
        for(let i = 0; i < count; ++i){
            this.boids.push(
                new Boid(
                    new Vector(Math.random() * width, Math.random() * height)
                    , new Vector(Math.random() - .5, Math.random() -.5)
                )
            );
        }
    }

    /**
     * Calculate the next position for each boid in the flock
     */
    step(){
        let nextState: Boid[] = [];
        for(let boid of this.boids){
            nextState.push(boid.step(this));
        }
        this.boids = nextState;
    }

    /**
     * Composes an array of boids near a given location. Boids near the opposite edges of the flock
     * are considered neighbors. The location of the neighbors are relative to location.
     * @param {Vector} location Location to which to find the neighbors for
     * @param {number} limit The range in which the boid is considered a neighbor
     * @returns {Boid[]} An array of the neighbors. Excludes a boid IN the location
     */
    getNeighbors(location: Vector, limit: number):Boid[] {
        let result: Boid[] = [];

        // Calculate the offset of the location from the center of the flock
        const center = new Vector(this.width / 2, this.height / 2);
        const offset = location.sub(center);

        for(let boid of this.boids){

            // Apply the offset to the candidate boid location
            let clamped = boid.location.sub(offset);

            // Wrap the candidate if it was offset beyond flock borders
            clamped.x = (clamped.x + this.width) % this.width;
            clamped.y = (clamped.y + this.height) % this.height;

            // Calculate the position relative to the location parameter
            let diff = clamped.sub(center);

            let distance = diff.magnitude();

            if(distance < limit && distance > 0){
                let clone = boid.clone();
                clone.location = diff;
                result.push(clone);
            }
        }

        return result;
    }
}
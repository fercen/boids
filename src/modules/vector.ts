/**
 * A 2D vector class by Janne Peltonen, 2017
 */


class Vector {

    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    zero(): void {
        this.x = 0;
        this.y = 0;
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y );
    }

    /**
     * Returns a unit vector with the same direction
     * @param {boolean} clamp If true, does not increase the magnitude even if lower than 1
     * @returns {Vector}
     */
    unit(clamp: boolean = false): Vector{
        let length = this.magnitude();
        if(length > 0){
            if(length <= 1 && clamp){
                return this;
            }
            return new Vector(this.x / length, this.y / length);
        }else{
            return new Vector();
        }
    }

    neg(): Vector {
        return new Vector(-this.x, -this.y);
    }

    add(...to: Vector[]): Vector {
        let resultant = new Vector(this.x, this.y);
        for(let vector of to){
            resultant.x += vector.x;
            resultant.y += vector.y;
        }
        return resultant;
    }

    sub(from: Vector): Vector {
        return this.add(from.neg());
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    scale(factor: number): Vector {
        return new Vector(this.x * factor, this.y * factor);
    }

    distance(other: Vector): number {
        let resultant = other.sub(this);
        return resultant.magnitude();
    }

    rotate(theta: number): Vector {
        let newX: number = this.x * Math.cos(theta) - this.y * Math.sin(theta);
        let newY: number = this.x * Math.sin(theta) + this.y * Math.cos(theta);
        return new Vector(newX, newY);
    }

    static fromAngle(theta: number): Vector{
        return new Vector(Math.cos(theta), Math.sin(theta));
    }
}
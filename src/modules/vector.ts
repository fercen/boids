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

    unit(): Vector{
        let length = this.magnitude();
        if(length > 0){
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

    static fromAngle(theta: number): Vector{
        return new Vector(Math.cos(theta), Math.sin(theta));
    }
}
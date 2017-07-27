class Vector {

    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y );
    }

    unit(): Vector{
        let length = this.magnitude();
        return new Vector(this.x / length, this.y / length);
    }

    neg(): Vector {
        return new Vector(-this.x, -this.y);
    }

    add(to: Vector): Vector {
        return new Vector(this.x + to.x, this.y + to.y);
    }

    sub(to: Vector): Vector {
        return this.add(to.neg());
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

}
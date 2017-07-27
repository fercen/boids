class Flock {

    boids: Boid[];
    width: number;
    height: number;

    constructor(width: number, height: number, count: number){
        this.boids = [];
        this.width = width;
        this.height = height;
        for(let i = 0; i < count; ++i){
            this.boids.push(new Boid(new Vector(Math.random() * width, Math.random() * height)));
        }
    }
}
class Flock {

    boids: Boid[];
    width: number;
    height: number;

    constructor(width: number, height: number, count: number){
        this.boids = [];
        this.width = width;
        this.height = height;
        for(let i = 0; i < count; ++i){
            this.boids.push(
                new Boid(
                    new Vector(Math.random() * width, Math.random() * height)
                    , new Vector(.5, 1)
                )
            );
        }
    }

    step(){
        let nextState: Boid[] = [];
        for(let boid of this.boids){
            nextState.push(boid.step(this));
        }
        this.boids = nextState;
    }

    getNeighbors(location: Vector, limit: number):Boid[] {
        let result: Boid[] = [];
        for(let boid of this.boids){
            let distance = location.distance(boid.location);
            if(distance < limit && distance > 0){
                result.push(boid);
            }
        }
        return result;
    }
}
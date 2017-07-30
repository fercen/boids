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
                    , new Vector(Math.random() - .5, Math.random() -.5)
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

        const center = new Vector(this.width / 2, this.height / 2);
        const offset = location.sub(center);


        for(let boid of this.boids){

            let clamped = boid.location.sub(offset);

            clamped.x = (clamped.x + flock.width) % flock.width;
            clamped.y = (clamped.y + flock.height) % flock.height;

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
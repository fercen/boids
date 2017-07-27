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
        let center = new Vector(this.width / 2, this.height / 2);
        let offset = location.sub(center);
        for(let boid of this.boids){
            let absoluteOffset = boid.location.sub(location);
            let clamped = offset.sub(boid.location);
            clamped.x = (clamped.x + flock.width / 2) % flock.width / 2 ;
            clamped.y = (clamped.y + flock.height / 2) % flock.height / 2 ;
            let clampedOffset = center.sub(clamped);
            let distance = center.distance(clamped);
            if(distance < limit && distance > 0){
                let clone = boid.clone();
                clone.location = center.sub(clamped);
                result.push(clone);
            }
        }
        return result;
    }
}
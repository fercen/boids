class CanvasRenderer implements IRenderer {

    readonly symbol: Vector[];
    readonly ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;

    constructor(flock: Flock, symbol: Vector[]) {
        const $canvas = document.createElement("canvas");
        this.width = flock.width;
        this.height = flock.height;
        $canvas.id = "canvas";
        $canvas.width = flock.width;
        $canvas.height = flock.height;
        this.ctx = $canvas.getContext('2d');
        this.symbol = symbol;
        document.body.appendChild($canvas);
    }

    drawBoid(boid: Boid): void {

        let absolutePoints: Vector[] = [];

        for(let point of this.symbol){
            absolutePoints.push(point.rotate(boid.orientation).add(boid.location));
        }

        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(absolutePoints[0].x, absolutePoints[0].y);
        this.ctx.lineTo(absolutePoints[1].x, absolutePoints[1].y);
        this.ctx.lineTo(absolutePoints[2].x, absolutePoints[2].y);
        this.ctx.stroke();
        this.ctx.closePath();
    }
    draw(flock: Flock) {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.width, this.height);
        for(let boid of flock.boids) {
            this.drawBoid(boid);
        }
    }
}

class CanvasRenderer implements IRenderer {

    readonly $canvas: HTMLCanvasElement;
    readonly symbol: Vector[];
    readonly ctx: CanvasRenderingContext2D;
    readonly width: number;
    readonly height: number;

    constructor(flock: Flock, symbol: Vector[]) {
        this.$canvas = document.createElement("canvas");
        this.width = flock.width;
        this.height = flock.height;
        this.$canvas.id = "canvas";
        this.$canvas.width = flock.width;
        this.$canvas.height = flock.height;
        this.ctx = this.$canvas.getContext('2d');
        this.symbol = symbol;
        document.body.appendChild(this.$canvas);
    }

    private drawBoid(boid: Boid): void {

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
        this.ctx.fillStyle = "green";
        this.ctx.fillText("<canvas>", 5, 15);
        this.ctx.fillStyle = "grey";
        this.ctx.fillText("press tab to toggle", 5, 25);
    }
    clear() {
        this.$canvas.remove();
    }
}

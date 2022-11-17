import randomInRange from '@/utils/randomInRange';

interface IPoint {
    x: number;
    y: number;
    directionalVector: number;
}

interface ILimit {
    from: number;
    to: number;
}

export default class Wave {
    private waveColor?: string | string[];
    // points: IPoint[];

    private force: number;
    private wavePower: number;
    private count: number;
    private y: number;
    private alpha: number;
    private pos: number;
    private dir: number;
    private h: number;
    constructor(height: number, power: number, waveColor?: string | string[], y?: number) {
        this.waveColor = waveColor;

        this.force = 0;
        this.wavePower = power;
        this.count = 0;
        this.y = y || 90;
        this.alpha = 1;
        this.pos = 0;
        this.dir = 0;
        this.h = height;

        // this.points = [];

        // const acc = (horizontalLimit.to - horizontalLimit.from) / waveCount;

        // for (let i = 0; i <= waveCount; i++) {
        //     const x = acc * i;
        //     const y = randomInRange(verticalLimit.from, verticalLimit.to);

        //     this.points.push({ x, y, directionalVector: accumulator * -1 });
        // }
    }

    set height(value: number) {
        this.h = Math.max(0, value);
    }

    get height() {
        return this.h;
    }

    get percent() {
        return (1 - this.y / this.h) * 100;
    }
    set percent(value) {
        this.y = this.h * (1 - value / 100);
    }

    update() {
        this.y -= this.dir * Math.random();
        if (this.y < 1 || this.y > this.h) {
            this.dir *= -1;
        }
        this.force = Math.sin(this.count);
        this.count += 0.1;
        this.pos += 0.04;
    }

    static makeGradientPattern(ctx: CanvasRenderingContext2D, height: number, fromColor?: string, toColor?: string) {
        const canvasGradient = ctx.createLinearGradient(0, 0, 0, height);
        canvasGradient.addColorStop(0, fromColor || '#419dff');
        canvasGradient.addColorStop(1, toColor || '#66bfff');
        return canvasGradient;
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        if (Array.isArray(this.waveColor)) {
            ctx.fillStyle = Wave.makeGradientPattern(ctx, height, this.waveColor[0], this.waveColor[1]);
        } else ctx.fillStyle = Wave.makeGradientPattern(ctx, height, this.waveColor);
        ctx.beginPath();
        ctx.moveTo(0, this.y);

        const p = Math.sin(this.pos);

        ctx.quadraticCurveTo(width * (p + 0.25), this.y + this.wavePower * this.force, width * (p + 0.5), this.y);
        ctx.quadraticCurveTo(width * (p + 0.75), this.y - this.wavePower * this.force, width, this.y);
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.lineTo(0, this.y);
        ctx.closePath();
        ctx.fill();
    }

    // draw(canvasContext: CanvasRenderingContext2D) {
    //     const maxIndex = this.points.length - 1;
    //     for (let i = 1; i < maxIndex; i++) {
    //         const currentPoint = this.points[i];
    //         const nextPoint = this.points[i + 1];
    //         const prevPoint = this.points[i - 1];
    //         canvasContext.strokeStyle = this.waveColor;
    //         canvasContext.beginPath();
    //         canvasContext.moveTo(currentPoint.x, currentPoint.y);
    //         canvasContext.bezierCurveTo(
    //             prevPoint.x + prevPoint.directionalVector,
    //             prevPoint.y + prevPoint.directionalVector,
    //             currentPoint.x + currentPoint.directionalVector,
    //             currentPoint.y + currentPoint.directionalVector,
    //             currentPoint.x,
    //             currentPoint.y
    //         );
    //         canvasContext.strokeStyle = this.waveColor;
    //         canvasContext.beginPath();
    //         canvasContext.moveTo(currentPoint.x, currentPoint.y);
    //         canvasContext.bezierCurveTo(
    //             currentPoint.x + currentPoint.directionalVector,
    //             currentPoint.y + currentPoint.directionalVector,
    //             nextPoint.x + nextPoint.directionalVector,
    //             nextPoint.y + nextPoint.directionalVector,
    //             nextPoint.x,
    //             nextPoint.y
    //         );
    //         canvasContext.stroke();
    //     }
    //     canvasContext.closePath();
    //     canvasContext.fill();
    // }
}

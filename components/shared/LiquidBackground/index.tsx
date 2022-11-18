'use client';

import Wave from '@/classes/Wave';
import React, { ReactNode, Component } from 'react';
// import WaveShape from './Wave';

interface IComponentProps {
    children: ReactNode;
}

interface IComponentState {
    test: true;
}

class LiquidBackground extends Component<IComponentProps, IComponentState> {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    canvasContext!: CanvasRenderingContext2D | null;
    waves: Wave[];

    private animationID: number;
    private canvasGradient?: CanvasGradient;

    constructor(props: IComponentProps) {
        super(props);
        this.state = { test: true };

        this.canvasRef = React.createRef<HTMLCanvasElement>();
        this.waves = [];
        this.animationID = -1;
    }

    initCanvasContext() {
        if (!this.canvasRef.current) {
            return;
        }

        this.canvasRef.current.width = window.innerWidth;
        this.canvasRef.current.height = window.innerHeight;

        this.canvasContext = this.canvasRef.current.getContext('2d');
    }

    animateWaves = () => {
        this.animationID = requestAnimationFrame(this.animateWaves);

        if (!this.canvasContext) {
            return;
        }

        // if (!this.canvasGradient) {
        //     this.canvasGradient = Wave.makeGradientPattern(this.canvasContext, this.canvasRef.current?.height || 0);
        // }

        // this.canvasContext.fillStyle = 'rgba(255, 255, 255, 1)';
        // this.canvasContext.fillRect(0, 0, this.canvasRef.current?.width || 0, this.canvasRef.current?.height || 0);

        this.canvasContext.globalCompositeOperation = 'source-over';
        this.canvasContext.fillStyle = '#fff';
        this.canvasContext.fillRect(0, 0, this.canvasRef.current?.width || 0, this.canvasRef.current?.height || 0);

        this.canvasContext.globalCompositeOperation = 'xor';
        this.canvasContext.fillStyle = '#000';
        this.canvasContext.fillRect(0, 0, this.canvasRef.current?.width || 0, this.canvasRef.current?.height || 0);

        this.waves.forEach((wave) =>
            wave.draw(
                this.canvasContext as CanvasRenderingContext2D,
                this.canvasRef.current?.width || 0,
                this.canvasRef.current?.height || 0
            )
        );

        this.waves.forEach((wave) => wave.update());
    };

    resizeCanvasHandler = () => {
        if (!this.canvasRef.current) {
            return;
        }

        this.canvasRef.current.width = window.innerWidth;
        this.canvasRef.current.height = window.innerHeight;
    };

    componentDidMount(): void {
        this.initCanvasContext();
        this.waves = [
            new Wave(this.canvasRef.current?.height || 0, 100, undefined, (this.canvasRef.current?.height || 0) - 100),
            // new Wave(this.canvasRef.current?.height || 0, 50, 'red'),
            // 5,
            // 'red',
            // { from: 0, to: this.canvasRef.current?.width || 0 },
            // { from: (this.canvasRef.current?.height || 0) - 500, to: this.canvasRef.current?.height || 0 }
        ];
        // this.waves.forEach((wave) => wave.draw(this.canvasContext as CanvasRenderingContext2D));
        // console.log('Waves: ', this.waves);

        this.animateWaves();

        window.addEventListener('resize', this.resizeCanvasHandler);
    }

    componentWillUnmount(): void {
        cancelAnimationFrame(this.animationID);
        window.removeEventListener('resize', this.resizeCanvasHandler);
    }

    render(): React.ReactNode {
        return (
            <div>
                <canvas className="fixed top-0 left-0 h-screen w-screen -z-[1]" ref={this.canvasRef}></canvas>
                {/* <WaveShape className="fixed bottom-0 left-0 h-screen w-screen -z-[1]" /> */}
                <div className="relative">{this.props.children}</div>
            </div>
        );
    }
}

export default LiquidBackground;

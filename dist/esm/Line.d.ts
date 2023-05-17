import Arc, { ArcProps } from './Arc';
export interface LineProps extends ArcProps {
    font?: string;
    label: boolean;
    labels: [string, string];
    canvasCtx: CanvasRenderingContext2D | null;
}
declare class Line extends Arc {
    font?: string;
    label: boolean;
    labels: [string, string];
    constructor(options: LineProps);
    draw(context: CanvasRenderingContext2D | null): void;
}
export default Line;

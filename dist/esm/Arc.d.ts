import { Context } from './store';
export interface ArcProps {
    from: [number, number];
    to: [number, number];
    width: number;
    color: string;
    ctx?: Context;
}
declare class Arc {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    centerX: number;
    centerY: number;
    startAngle: number;
    endAngle: number;
    radius: number;
    color: string;
    lineWidth: number;
    ctx: Context;
    constructor(options: ArcProps);
    draw(context: CanvasRenderingContext2D): void;
}
export default Arc;

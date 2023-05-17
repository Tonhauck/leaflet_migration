import Arc, { ArcProps } from './Arc';
import Marker from './Marker';
import { Direction, LineIcon } from './typings/base';
export interface SparkProps extends ArcProps {
    marker: LineIcon;
}
declare class Spark extends Arc {
    factor: number;
    deltaAngle: number;
    trailAngle: number;
    tailPointsCount: number;
    animateBlur?: boolean;
    marker: Marker;
    constructor(options: SparkProps);
    drawArc(context: CanvasRenderingContext2D, strokeColor: String, lineWidth: number, startAngle: number, endAngle: number): void;
    draw(context: CanvasRenderingContext2D, order?: Direction): void;
    drawMarker(context: CanvasRenderingContext2D): void;
    get isEnd(): boolean;
    restart(): void;
}
export default Spark;

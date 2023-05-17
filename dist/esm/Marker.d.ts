import { LineIcon } from "./typings/base";
export interface MarkerProps {
    style: LineIcon;
    color: string;
    borderWidth: number;
    borderColor: string;
}
export interface Position {
    x: number;
    y: number;
    angle: number;
}
declare class Marker {
    private options;
    img?: HTMLImageElement;
    constructor(options: MarkerProps);
    draw(context: CanvasRenderingContext2D, position: Position): void;
}
export default Marker;

import { Map } from "leaflet";
import { Data, Options } from "./typings/base";
export interface ContextProps {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    data: Data;
    options: Options;
    map: Map;
}
export declare class Context {
    options: Options;
    data: Data;
    map: Map;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    canvasCtx: CanvasRenderingContext2D | null;
    mapPosi: DOMRect;
    constructor({ container, canvas, data, options, map }: ContextProps);
    setOptions(options: Options): void;
    setData(data: Data): void;
    _convertData(data: Data): Data;
}

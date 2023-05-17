export declare function getDistance(width: number, height: number): number;
export declare function getLineCenter(start: number, end: number): number;
export declare function extend(arr: Array<any>, handler: (i: any) => number): [number, number];
export declare function getType(target: any): string;
export declare class CanvasCache {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    target: HTMLCanvasElement;
    targetCtx: CanvasRenderingContext2D | null;
    constructor(target: HTMLCanvasElement);
    clear(): void;
    restore(): void;
}

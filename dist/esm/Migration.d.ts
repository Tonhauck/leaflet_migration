import { CanvasCache } from './utils';
import Popover from './popover';
import { Context } from './store';
declare class Migration {
    ctx: Context;
    started: boolean;
    playAnimation: boolean;
    store: any;
    popover: Popover;
    index: number;
    requestAnimationId: number;
    lineCache: CanvasCache;
    sparkCache: CanvasCache;
    constructor({ ctx }: {
        ctx: Context;
    });
    refresh(): void;
    clear(): void;
    draw(shapes: any): void;
    drawLines(): void;
    restoreLines(): void;
    drawSpark(): void;
    drawSparkMarkers(): void;
    start(): void;
    play(): void;
    pause(): void;
}
export default Migration;

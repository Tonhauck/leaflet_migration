import Popover from './popover';
import { Context } from './store';
import { DataItem } from './typings/base';
export interface PulseProps {
    x: number;
    y: number;
    data: DataItem;
    index: number;
    popover: Popover;
    radius: number;
    ctx: Context;
}
declare class Pulse {
    options: PulseProps;
    scale: number;
    pulse: HTMLDivElement;
    ring: HTMLDivElement;
    static domCache: HTMLDivElement[];
    constructor(props: PulseProps);
    showPopover: (e: MouseEvent) => void;
    hidePopover: () => void;
    clear(): void;
    initDom(): void;
    draw(): void;
}
export default Pulse;

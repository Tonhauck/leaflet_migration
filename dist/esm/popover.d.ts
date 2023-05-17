import { Context } from './store';
declare class Popover {
    replace?: Function;
    onShow?: Function;
    onHide?: Function;
    el: HTMLDivElement;
    context: HTMLDivElement;
    constructor(ctx: Context);
    show(x: number, y: number, data: any, idx: any): void;
    hide(data: any, idx: any): void;
}
export default Popover;

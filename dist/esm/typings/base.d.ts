export declare enum IconType {
    circle = "circle",
    arrow = "arrow",
    img = "img"
}
export interface LineIcon {
    type: IconType;
    imgUrl: string;
    size: number;
}
export interface LineOption {
    width: number;
    order: boolean;
    icon: LineIcon;
}
export interface MarkerOption {
    radius: number[];
    pulse: boolean;
    textVisible: boolean;
}
export interface Options {
    marker: MarkerOption;
    line: LineOption;
    minZoom: number;
    replacePopover: () => HTMLElement;
    onShowPopover: () => void;
    onHidePopover: () => void;
}
export declare enum Direction {
    in = "in",
    out = "out"
}
export interface DataItem {
    color: string;
    from: [number, number];
    to: [number, number];
    labels: [string, string];
    value: number;
}
export declare type Data = DataItem[];

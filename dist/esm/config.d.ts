import { Direction, IconType } from "./typings/base";
export declare const FACTOR = 1.5;
export declare const MIN_ZOOM = 3;
export declare const STYLE: {
    minRadius: number;
    arcWidth: number;
    label: boolean;
    marker: string;
};
export declare const DEFAULT_OPTION: {
    marker: {
        radius: number[];
        pulse: boolean;
        textVisible: boolean;
    };
    line: {
        width: number;
        order: boolean;
        icon: {
            type: IconType;
            imgUrl: string;
            size: number;
        };
        direction: Direction;
    };
};
export declare const POPOVER_OFFSET = 12;

import { Direction, IconType } from "./typings/base"; // 因子

export var FACTOR = 3000;
export var MIN_ZOOM = 3;
export var STYLE = {
    minRadius: 5,
    arcWidth: 1,
    label: true,
    // arrow|circle|imgUrl
    marker: 'circle'
};
export var DEFAULT_OPTION = {
    marker: {
        // 最小半径、最大半径
        radius: [5, 10],
        // 是否显示波纹动销
        pulse: true,
        textVisible: false
    },
    // 飞线
    line: {
        // 飞线宽度
        width: 1,
        // 是否按顺序走飞线
        order: true,
        icon: {
            type: IconType.circle,
            imgUrl: '',
            size: 20
        },
        direction: Direction.out
    }
};
export var POPOVER_OFFSET = 12;
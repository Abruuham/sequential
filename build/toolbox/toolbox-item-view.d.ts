import { ToolboxItemData } from './toolbox-data-provider';
export declare class ToolboxItemView {
    private readonly root;
    static create(parent: HTMLElement, data: ToolboxItemData): ToolboxItemView;
    private constructor();
    bindMousedown(handler: (e: MouseEvent) => void): void;
    bindTouchstart(handler: (e: TouchEvent) => void): void;
    bindContextMenu(handler: (e: MouseEvent) => void): void;
}

import { Vector } from '../../core';
import { ContextMenuItem } from '../../designer-extension';
export declare class ContextMenu {
    private readonly menu;
    private readonly elements;
    private readonly items;
    private readonly startTime;
    static create(position: Vector, theme: string, items: ContextMenuItem[]): ContextMenu;
    private isAttached;
    private constructor();
    private readonly mouseDown;
    private readonly mouseUp;
    private findIndex;
    tryDestroy(): void;
}

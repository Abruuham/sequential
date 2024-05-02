import { ToolboxApi } from '../api/toolbox-api';
import { ToolboxItemData } from './toolbox-data-provider';
export declare class ToolboxItem {
    private readonly step;
    private readonly api;
    static create(parent: HTMLElement, data: ToolboxItemData, api: ToolboxApi): ToolboxItem;
    private constructor();
    private onTouchstart;
    private onMousedown;
    private onContextMenu;
    private tryDrag;
}

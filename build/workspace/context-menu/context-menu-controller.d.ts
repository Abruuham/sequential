import { Vector } from '../../core';
import { DesignerConfiguration } from '../../designer-configuration';
import { ClickCommand } from '../component';
import { ContextMenuItemsBuilder } from './context-menu-items-builder';
export declare class ContextMenuController {
    private readonly theme;
    private readonly configuration;
    private readonly itemsBuilder;
    private current?;
    constructor(theme: string, configuration: DesignerConfiguration, itemsBuilder: ContextMenuItemsBuilder);
    tryOpen(position: Vector, commandOrNull: ClickCommand | null): void;
    destroy(): void;
}

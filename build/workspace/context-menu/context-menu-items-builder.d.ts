import { ViewportApi } from '../../api/viewport-api';
import { StateModifier } from '../../modifier/state-modifier';
import { ContextMenuItem, ContextMenuItemsProvider } from '../../designer-extension';
import { DesignerState } from '../../designer-state';
import { ClickCommand } from '../component';
export declare class ContextMenuItemsBuilder {
    private readonly viewportApi;
    private readonly stateModifier;
    private readonly state;
    private readonly customMenuItemsProvider;
    constructor(viewportApi: ViewportApi, stateModifier: StateModifier, state: DesignerState, customMenuItemsProvider: ContextMenuItemsProvider | undefined);
    build(commandOrNull: ClickCommand | null): ContextMenuItem[];
    private tryAppendCustomItems;
}

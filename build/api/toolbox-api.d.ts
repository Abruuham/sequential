import { BehaviorController } from '../behaviors/behavior-controller';
import { SimpleEventListener, Vector } from '../core';
import { StepDefinition, UidGenerator } from '../designer-configuration';
import { DesignerState } from '../designer-state';
import { DesignerContext } from '../designer-context';
import { ToolboxDataProvider, ToolboxGroupData } from '../toolbox/toolbox-data-provider';
export declare class ToolboxApi {
    private readonly state;
    private readonly designerContext;
    private readonly behaviorController;
    private readonly toolboxDataProvider;
    private readonly uidGenerator;
    constructor(state: DesignerState, designerContext: DesignerContext, behaviorController: BehaviorController, toolboxDataProvider: ToolboxDataProvider, uidGenerator: UidGenerator | undefined);
    isCollapsed(): boolean;
    toggleIsCollapsed(): void;
    subscribeIsCollapsed(listener: SimpleEventListener<boolean>): void;
    getAllGroups(): ToolboxGroupData[];
    applyFilter(allGroups: ToolboxGroupData[], filter: string | undefined): ToolboxGroupData[];
    /**
     * @param position Mouse or touch position.
     * @param step Step definition.
     * @returns If started dragging returns true, otherwise returns false.
     */
    tryDrag(position: Vector, step: StepDefinition): boolean;
    private activateStep;
}

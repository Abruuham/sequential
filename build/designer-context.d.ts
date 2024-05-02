import { BehaviorController } from './behaviors/behavior-controller';
import { ComponentContext } from './component-context';
import { CustomActionController } from './custom-action-controller';
import { Definition, DefinitionWalker } from './definition';
import { StateModifier } from './modifier/state-modifier';
import { DesignerConfiguration } from './designer-configuration';
import { DesignerState } from './designer-state';
import { HistoryController } from './history-controller';
import { LayoutController } from './layout-controller';
import { Services } from './services';
import { WorkspaceController, WorkspaceControllerWrapper } from './workspace/workspace-controller';
export declare class DesignerContext {
    readonly theme: string;
    readonly state: DesignerState;
    readonly configuration: DesignerConfiguration;
    readonly services: Services;
    readonly componentContext: ComponentContext;
    readonly definitionWalker: DefinitionWalker;
    readonly stateModifier: StateModifier;
    readonly layoutController: LayoutController;
    readonly workspaceController: WorkspaceControllerWrapper;
    readonly behaviorController: BehaviorController;
    readonly customActionController: CustomActionController;
    readonly historyController: HistoryController | undefined;
    static create(parent: HTMLElement, startDefinition: Definition, configuration: DesignerConfiguration, services: Services): DesignerContext;
    constructor(theme: string, state: DesignerState, configuration: DesignerConfiguration, services: Services, componentContext: ComponentContext, definitionWalker: DefinitionWalker, stateModifier: StateModifier, layoutController: LayoutController, workspaceController: WorkspaceControllerWrapper, behaviorController: BehaviorController, customActionController: CustomActionController, historyController: HistoryController | undefined);
    setWorkspaceController(controller: WorkspaceController): void;
}

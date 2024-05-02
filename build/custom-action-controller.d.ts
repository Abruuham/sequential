import { Sequence, Step } from './definition';
import { CustomAction, DesignerConfiguration } from './designer-configuration';
import { DesignerState } from './designer-state';
import { StateModifier } from './modifier/state-modifier';
export declare class CustomActionController {
    private readonly configuration;
    private readonly state;
    private readonly stateModifier;
    constructor(configuration: DesignerConfiguration, state: DesignerState, stateModifier: StateModifier);
    trigger(action: CustomAction, step: Step | null, sequence: Sequence): void;
    private createCustomActionHandlerContext;
    private notifyStepChanged;
}

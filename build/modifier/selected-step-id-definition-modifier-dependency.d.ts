import { DefinitionWalker } from '../definition';
import { DesignerState } from '../designer-state';
import { StateModifierDependency } from './state-modifier-dependency';
export declare class SelectedStepIdDefinitionModifierDependency implements StateModifierDependency {
    private readonly state;
    private readonly definitionWalker;
    constructor(state: DesignerState, definitionWalker: DefinitionWalker);
    update(): void;
}

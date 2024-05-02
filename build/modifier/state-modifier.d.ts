import { Definition, DefinitionWalker, Sequence, Step } from '../definition';
import { DesignerConfiguration } from '../designer-configuration';
import { DesignerState } from '../designer-state';
import { StateModifierDependency } from './state-modifier-dependency';
export declare class StateModifier {
    private readonly definitionWalker;
    private readonly state;
    private readonly configuration;
    private readonly dependencies;
    static create(definitionWalker: DefinitionWalker, state: DesignerState, configuration: DesignerConfiguration): StateModifier;
    constructor(definitionWalker: DefinitionWalker, state: DesignerState, configuration: DesignerConfiguration, dependencies: StateModifierDependency[]);
    addDependency(dependency: StateModifierDependency): void;
    isSelectable(step: Step, parentSequence: Sequence): boolean;
    trySelectStep(step: Step, parentSequence: Sequence): void;
    trySelectStepById(stepId: string): void;
    isDeletable(stepId: string): boolean;
    tryDelete(stepId: string): boolean;
    tryInsert(step: Step, targetSequence: Sequence, targetIndex: number): boolean;
    isDraggable(step: Step, parentSequence: Sequence): boolean;
    tryMove(sourceSequence: Sequence, step: Step, targetSequence: Sequence, targetIndex: number): boolean;
    isDuplicable(step: Step, parentSequence: Sequence): boolean;
    tryDuplicate(step: Step, parentSequence: Sequence): boolean;
    replaceDefinition(definition: Definition): void;
    updateDependencies(): void;
}

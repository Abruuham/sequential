import { DesignerState } from './designer-state';
import { DesignerConfiguration, UndoStack } from './designer-configuration';
import { StateModifier } from './modifier/state-modifier';
import { Definition } from './definition';
export declare class HistoryController {
    private readonly stack;
    private readonly state;
    private readonly stateModifier;
    private readonly stackSize;
    static create(initialStack: UndoStack | undefined, state: DesignerState, stateModifier: StateModifier, configuration: DesignerConfiguration): HistoryController;
    constructor(stack: UndoStack, state: DesignerState, stateModifier: StateModifier, stackSize: number);
    canUndo(): boolean;
    undo(): void;
    canRedo(): boolean;
    redo(): void;
    dump(): UndoStack;
    replaceDefinition(definition: Definition): void;
    private rememberCurrent;
    private remember;
    private commit;
}

import { DesignerState } from '../designer-state';
import { StateModifier } from '../modifier/state-modifier';
import { RootEditorContext, StepEditorContext } from '../designer-configuration';
import { EditorRenderer, EditorRendererHandler } from './editor-renderer';
import { Definition, DefinitionWalker } from '../definition';
import { SimpleEvent, SimpleEventListener } from '../core';
import { StateModifierDependency } from '../modifier';
export interface SelectedStepIdProvider {
    onSelectedStepIdChanged: SimpleEvent<string | null>;
    selectedStepId: string | null;
}
export declare class EditorApi {
    private readonly state;
    private readonly definitionWalker;
    private readonly stateModifier;
    constructor(state: DesignerState, definitionWalker: DefinitionWalker, stateModifier: StateModifier);
    isCollapsed(): boolean;
    isReadonly(): boolean;
    toggleIsCollapsed(): void;
    subscribeIsCollapsed(listener: SimpleEventListener<boolean>): void;
    getDefinition(): Definition;
    addDefinitionModifierDependency(dependency: StateModifierDependency): void;
    runRenderer(rendererHandler: EditorRendererHandler, customSelectedStepIdProvider: SelectedStepIdProvider | null): EditorRenderer;
    createStepEditorContext(stepId: string): StepEditorContext;
    createRootEditorContext(): RootEditorContext;
}

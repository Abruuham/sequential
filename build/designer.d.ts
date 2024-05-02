import { SimpleEvent } from './core/simple-event';
import { Definition, DefinitionWalker, Sequence, Step, StepOrName } from './definition';
import { DesignerConfiguration, UndoStack } from './designer-configuration';
import { Viewport } from './designer-extension';
export declare class Designer<TDefinition extends Definition = Definition> {
    private readonly view;
    private readonly state;
    private readonly stateModifier;
    private readonly walker;
    private readonly historyController;
    private readonly api;
    /**
     * Creates a designer.
     * @param placeholder Placeholder where the designer will be attached.
     * @param startDefinition Start definition of a flow.
     * @param configuration Designer's configuration.
     * @returns An instance of the designer.
     */
    static create<TDef extends Definition>(placeholder: HTMLElement, startDefinition: TDef, configuration: DesignerConfiguration<TDef>): Designer<TDef>;
    private constructor();
    /**
     * @description Fires when the designer is initialized and ready to use.
     */
    readonly onReady: SimpleEvent<void>;
    /**
     * @description Fires when the definition has changed.
     */
    readonly onDefinitionChanged: SimpleEvent<TDefinition>;
    /**
     * @description Fires when the viewport has changed.
     */
    readonly onViewportChanged: SimpleEvent<Viewport>;
    /**
     * @description Fires when the selected step has changed.
     */
    readonly onSelectedStepIdChanged: SimpleEvent<string | null>;
    /**
     * @description Fires when the toolbox is collapsed or expanded.
     */
    readonly onIsToolboxCollapsedChanged: SimpleEvent<boolean>;
    /**
     * @description Fires when the editor is collapsed or expanded.
     */
    readonly onIsEditorCollapsedChanged: SimpleEvent<boolean>;
    /**
     * @returns the current definition of the workflow.
     */
    getDefinition(): TDefinition;
    /**
     * @returns the validation result of the current definition.
     */
    isValid(): boolean;
    /**
     * @returns the readonly flag.
     */
    isReadonly(): boolean;
    /**
     * @description Changes the readonly flag.
     */
    setIsReadonly(isReadonly: boolean): void;
    /**
     * @returns current selected step id or `null` if nothing is selected.
     */
    getSelectedStepId(): string | null;
    /**
     * @description Selects a step by the id.
     */
    selectStepById(stepId: string): void;
    /**
     * @returns the current viewport.
     */
    getViewport(): Viewport;
    /**
     * @description Sets the viewport.
     * @param viewport Viewport.
     */
    setViewport(viewport: Viewport): void;
    /**
     * @description Unselects the selected step.
     */
    clearSelectedStep(): void;
    /**
     * @description Moves the viewport to the step with the animation.
     */
    moveViewportToStep(stepId: string): void;
    /**
     * @description Rerender the root component and all its children.
     */
    updateRootComponent(): void;
    /**
     * @description Updates all badges.
     */
    updateBadges(): void;
    /**
     * @returns a flag that indicates whether the toolbox is collapsed.
     */
    isToolboxCollapsed(): boolean;
    /**
     * @description Sets a flag that indicates whether the toolbox is collapsed.
     */
    setIsToolboxCollapsed(isCollapsed: boolean): void;
    /**
     * @returns a flag that indicates whether the editor is collapsed.
     */
    isEditorCollapsed(): boolean;
    /**
     * @description Sets a flag that indicates whether the editor is collapsed.
     */
    setIsEditorCollapsed(isCollapsed: boolean): void;
    /**
     * @description Dump the undo stack.
     */
    dumpUndoStack(): UndoStack;
    /**
     * Replaces the current definition with a new one and adds the previous definition to the undo stack.
     * @param definition A new definition.
     */
    replaceDefinition(definition: TDefinition): Promise<void>;
    /**
     * @param needle A step, a sequence or a step id.
     * @returns parent steps and branch names.
     */
    getStepParents(needle: Sequence | Step | string): StepOrName[];
    /**
     * @returns the definition walker.
     */
    getWalker(): DefinitionWalker;
    /**
     * @description Destroys the designer and deletes all nodes from the placeholder.
     */
    destroy(): void;
    private getHistoryController;
}

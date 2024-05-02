import { DefinitionWalker, Step } from '../definition';
import { DesignerState } from '../designer-state';
import { SelectedStepIdProvider } from './editor-api';
export type EditorRendererHandler = (step: Step | null) => void;
export declare class EditorRenderer {
    private readonly state;
    private readonly selectedStepIdProvider;
    private readonly definitionWalker;
    private readonly handler;
    private readonly raceEvent;
    static create(state: DesignerState, selectedStepIdProvider: SelectedStepIdProvider, definitionWalker: DefinitionWalker, handler: EditorRendererHandler): EditorRenderer;
    private currentStepId;
    private constructor();
    destroy(): void;
    private render;
    private renderIfStepChanged;
    private readonly raceEventHandler;
}

import { SimpleEvent } from '../core';
import { StateModifier } from '../modifier/state-modifier';
import { DesignerState } from '../designer-state';
import { HistoryController } from '../history-controller';
import { ViewportApi } from './viewport-api';
export declare class ControlBarApi {
    private readonly state;
    private readonly historyController;
    private readonly stateModifier;
    private readonly viewportApi;
    static create(state: DesignerState, historyController: HistoryController | undefined, stateModifier: StateModifier, viewportApi: ViewportApi): ControlBarApi;
    private constructor();
    readonly onStateChanged: SimpleEvent<unknown>;
    resetViewport(): void;
    zoomIn(): void;
    zoomOut(): void;
    isDragDisabled(): boolean;
    toggleIsDragDisabled(): void;
    isUndoRedoSupported(): boolean;
    tryUndo(): boolean;
    canUndo(): boolean;
    tryRedo(): boolean;
    canRedo(): boolean;
    tryDelete(): boolean;
    canDelete(): boolean;
}

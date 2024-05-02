import { RootEditorProvider, StepEditorProvider } from '../designer-configuration';
import { EditorApi, SelectedStepIdProvider } from '../api';
export declare class Editor {
    private readonly view;
    private readonly renderer;
    static create(parent: HTMLElement, api: EditorApi, stepEditorClassName: string, stepEditorProvider: StepEditorProvider, rootEditorClassName: string, rootEditorProvider: RootEditorProvider, customSelectedStepIdProvider: SelectedStepIdProvider | null): Editor;
    private constructor();
    destroy(): void;
}

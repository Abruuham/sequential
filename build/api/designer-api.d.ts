import { DesignerContext } from '../designer-context';
import { ControlBarApi } from './control-bar-api';
import { EditorApi } from './editor-api';
import { PathBarApi } from './path-bar-api';
import { ToolboxApi } from './toolbox-api';
import { ViewportApi } from './viewport-api';
import { WorkspaceApi } from './workspace-api';
import { DefinitionWalker } from '../definition';
export declare class DesignerApi {
    readonly controlBar: ControlBarApi;
    readonly toolbox: ToolboxApi;
    readonly editor: EditorApi;
    readonly workspace: WorkspaceApi;
    readonly viewport: ViewportApi;
    readonly pathBar: PathBarApi;
    readonly definitionWalker: DefinitionWalker;
    static create(context: DesignerContext): DesignerApi;
    private constructor();
}

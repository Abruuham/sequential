import { DefinitionWalker } from '../definition';
import { DesignerState } from '../designer-state';
export declare class PathBarApi {
    private readonly state;
    private readonly definitionWalker;
    constructor(state: DesignerState, definitionWalker: DefinitionWalker);
    readonly onStateChanged: import("../core").SimpleEvent<[(string[] | undefined)?, (import("../designer-state").DefinitionChangedEvent | undefined)?, unknown?]>;
    setFolderPath(path: string[]): void;
    getFolderPath(): string[];
    getFolderPathStepNames(): string[];
}

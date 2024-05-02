import { DesignerApi } from '../api/designer-api';
import { Daemon } from '../designer-extension';
import { KeyboardConfiguration } from '../designer-configuration';
export declare class KeyboardDaemon implements Daemon {
    private readonly controlBarApi;
    private readonly configuration;
    static create(api: DesignerApi, configuration: KeyboardConfiguration): KeyboardDaemon;
    private constructor();
    private readonly onKeyUp;
    destroy(): void;
}

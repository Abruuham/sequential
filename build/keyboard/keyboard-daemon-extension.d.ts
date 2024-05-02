import { DesignerApi } from '../api';
import { KeyboardConfiguration } from '../designer-configuration';
import { DaemonExtension } from '../designer-extension';
import { KeyboardDaemon } from './keyboard-daemon';
export declare class KeyboardDaemonExtension implements DaemonExtension {
    private readonly configuration;
    static create(configuration: undefined | true | KeyboardConfiguration): KeyboardDaemonExtension;
    private constructor();
    create(api: DesignerApi): KeyboardDaemon;
}

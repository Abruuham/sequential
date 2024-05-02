import { CustomActionController } from '../../custom-action-controller';
import { TriggerCustomActionClickCommand } from '../../workspace';
import { PressingBehaviorHandler } from './pressing-behavior';
export declare class TriggerCustomActionPressingBehaviorHandler implements PressingBehaviorHandler {
    private readonly command;
    private readonly customActionController;
    constructor(command: TriggerCustomActionClickCommand, customActionController: CustomActionController);
    handle(): void;
}

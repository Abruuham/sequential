import { Step } from './definition';
import { DesignerExtension, StepExtension } from './designer-extension';
import { ContainerStepExtensionConfiguration } from './workspace/container-step/container-step-extension-configuration';
import { SwitchStepExtensionConfiguration } from './workspace/switch-step/switch-step-extension-configuration';
import { TaskStepExtensionConfiguration } from './workspace/task-step/task-step-extension-configuration';
import { IconStepExtensionConfiguration } from './workspace/icon-step/icon-step-extension-configuration';
import { DropDownStepExtensionConfiguration } from './workspace/dropdown-step';
export interface StepsDesignerExtensionConfiguration {
    container?: ContainerStepExtensionConfiguration;
    switch?: SwitchStepExtensionConfiguration;
    task?: TaskStepExtensionConfiguration;
    icon?: IconStepExtensionConfiguration;
    dropdown?: DropDownStepExtensionConfiguration;
}
export declare class StepsDesignerExtension implements DesignerExtension {
    readonly steps: StepExtension<Step>[];
    static create(configuration: StepsDesignerExtensionConfiguration): StepsDesignerExtension;
    protected constructor(steps: StepExtension<Step>[]);
}

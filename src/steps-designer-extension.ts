import { Step } from './definition';
import { DesignerExtension, StepExtension } from './designer-extension';
import { ContainerStepExtension } from './workspace/container-step/container-step-extension';
import { ContainerStepExtensionConfiguration } from './workspace/container-step/container-step-extension-configuration';
import { SwitchStepExtensionConfiguration } from './workspace/switch-step/switch-step-extension-configuration';
import { SwitchStepExtension } from './workspace/switch-step/switch-step-extension';
import { TaskStepExtensionConfiguration } from './workspace/task-step/task-step-extension-configuration';
import { TaskStepExtension } from './workspace/task-step/task-step-extension';
import { IconStepExtensionConfiguration } from './workspace/icon-step/icon-step-extension-configuration';
import { IconStepExtension } from './workspace/icon-step/icon-step-extension';
import { DropDownStepExtensionConfiguration } from './workspace/dropdown-step';
import { DropDownStepExtension } from './workspace/dropdown-step/dropdown-step-extension';

export interface StepsDesignerExtensionConfiguration {
	container?: ContainerStepExtensionConfiguration;
	switch?: SwitchStepExtensionConfiguration;
	task?: TaskStepExtensionConfiguration;
	icon?: IconStepExtensionConfiguration;
	dropdown?: DropDownStepExtensionConfiguration;
}

export class StepsDesignerExtension implements DesignerExtension {
	public static create(configuration: StepsDesignerExtensionConfiguration): StepsDesignerExtension {
		const steps: StepExtension<Step>[] = [];
		if (configuration.container) {
			steps.push(ContainerStepExtension.create(configuration.container));
		}
		if (configuration.switch) {
			steps.push(SwitchStepExtension.create(configuration.switch));
		}
		if (configuration.task) {
			steps.push(TaskStepExtension.create(configuration.task));
		}
		if (configuration.icon){
			steps.push(IconStepExtension.create(configuration.icon));
		}
		if (configuration.dropdown) {
			steps.push(DropDownStepExtension.create(configuration.dropdown));
		}
		return new StepsDesignerExtension(steps);
	}

	protected constructor(public readonly steps: StepExtension<Step>[]) {}
}

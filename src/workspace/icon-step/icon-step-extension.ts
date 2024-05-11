import { Step } from '../../definition';
import { StepExtension } from '../../designer-extension';
import { createIconStepComponentViewFactory } from './icon-step-component-view';
import { IconStepExtensionConfiguration } from './icon-step-extension-configuration';

const defaultConfiguration: IconStepExtensionConfiguration = {
	view: {
        size: 52,
        iconSize: 28,
        inputSize: 14,
        outputSize: 10
	}
};

export class IconStepExtension implements StepExtension<Step> {
	public static create(configuration?: IconStepExtensionConfiguration): IconStepExtension {
		return new IconStepExtension(configuration ?? defaultConfiguration);
	}

	public readonly componentType = 'icon';

	private constructor(private readonly configuration: IconStepExtensionConfiguration) {}

	public readonly createComponentView = createIconStepComponentViewFactory(false, this.configuration.view);
}

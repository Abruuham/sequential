import { Step } from '../../definition';
import { StepExtension } from '../../designer-extension';
import { createIconStepComponentViewFactory } from './icon-step-component-view';
import { IconStepExtensionConfiguration } from './icon-step-extension-configuration';

const defaultConfiguration: IconStepExtensionConfiguration = {
	view: {
		paddingLeft: 12,
		paddingRight: 12,
		paddingY: 10,
		textMarginLeft: 12,
		minTextWidth: 70,
		iconSize: 22,
		radius: 5,
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

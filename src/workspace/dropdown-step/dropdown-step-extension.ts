import { Step } from '../../definition';
import { StepExtension } from '../../designer-extension';
import { createDropDownStepComponentViewFactory } from './dropdown-step-component-view';
import { DropDownStepExtensionConfiguration } from './dropdown-step-extension-configuration';

const defaultConfiguration: DropDownStepExtensionConfiguration = {
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

export class DropDownStepExtension implements StepExtension<Step> {
	public static create(configuration?: DropDownStepExtensionConfiguration): DropDownStepExtension {
		return new DropDownStepExtension(configuration ?? defaultConfiguration);
	}

	public readonly componentType = 'dropdown';

	private constructor(private readonly configuration: DropDownStepExtensionConfiguration) {}

	public readonly createComponentView = createDropDownStepComponentViewFactory(false, this.configuration.view);
}

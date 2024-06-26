import { Dom } from '../../core/dom';
import { Step } from '../../definition';
import { StepContext } from '../../designer-extension';
import { createComponentContextStub } from '../../test-tools/stubs';
import { StepComponentViewContextFactory } from '../step-component-view-context-factory';
import { createDropDownStepComponentViewFactory } from './dropdown-step-component-view';

describe('DropDownStepComponentView', () => {
	it('create() creates view', () => {
		const parent = Dom.svg('svg');
		const step: Step = {
			id: '0x',
			componentType: 'dropdown',
			name: 'x',
			properties: {},
			type: 'test',
			items: []
		};
		const stepContext: StepContext<Step> = {
			depth: 0,
			position: 0,
			isInputConnected: true,
			isOutputConnected: false,
			step,
			parentSequence: [step]
		};
		const componentContext = createComponentContextStub();
		const viewContext = StepComponentViewContextFactory.create(stepContext, componentContext);

		const factory = createDropDownStepComponentViewFactory(false, {
			iconSize: 20,
			minTextWidth: 50,
			textMarginLeft: 10,
			paddingLeft: 10,
			paddingRight: 10,
			paddingY: 10,
			radius: 5,
			inputSize: 10,
			outputSize: 10
		});
		factory(parent, stepContext, viewContext);

		expect(parent.children.length).not.toEqual(0);
	});
});

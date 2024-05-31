import { Step } from '../../definition';
import { StepExtension } from '../../designer-extension';
import { DropDownStepExtensionConfiguration } from './dropdown-step-extension-configuration';
export declare class DropDownStepExtension implements StepExtension<Step> {
    private readonly configuration;
    static create(configuration?: DropDownStepExtensionConfiguration): DropDownStepExtension;
    readonly componentType = "dropdown";
    private constructor();
    readonly createComponentView: (parentElement: SVGElement, stepContext: import("../../designer-extension").StepContext<Step>, viewContext: import("../../designer-extension").StepComponentViewContext) => import("..").StepComponentView;
}

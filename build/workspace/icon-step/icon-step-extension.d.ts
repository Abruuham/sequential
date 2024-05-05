import { Step } from '../../definition';
import { StepExtension } from '../../designer-extension';
import { IconStepExtensionConfiguration } from './icon-step-extension-configuration';
export declare class IconStepExtension implements StepExtension<Step> {
    private readonly configuration;
    static create(configuration?: IconStepExtensionConfiguration): IconStepExtension;
    readonly componentType = "task";
    private constructor();
    readonly createComponentView: (parentElement: SVGElement, stepContext: import("../../designer-extension").StepContext<Step>, viewContext: import("../../designer-extension").StepComponentViewContext) => import("..").StepComponentView;
}

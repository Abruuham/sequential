import { Dom } from '../../core';
import { getAbsolutePosition } from '../../core';
import { Vector } from '../../core';
import { Step } from '../../definition';
import { StepComponentViewContext, StepComponentViewFactory, StepContext } from '../../designer-extension';
import { InputView } from '../common-views/input-view';
import { OutputView } from '../common-views/output-view';
import { ClickDetails, StepComponentView } from '../component';
import { IconStepComponentViewConfiguration } from './icon-step-component-view-configuration';


export const createIconStepComponentViewFactory = 
    (isInterrupted: boolean, cfg: IconStepComponentViewConfiguration): StepComponentViewFactory =>
    (parentElement: SVGElement, stepContext: StepContext<Step>, viewContext: StepComponentViewContext): StepComponentView => {
        const { step } = stepContext;
        const g = Dom.svg('g', {
            class: `sqd-step-icon sqd-type-${step.type}`
        });
        parentElement.appendChild(g);

        let iconSize = cfg.size / 2;

        const circle = Dom.svg('circle', {
            class: 'sqd-step-icon-circle',
            cx: iconSize,
            cy: iconSize,
            r: iconSize
        });
        g.appendChild(circle);

        const iconUrl = viewContext.getStepIconUrl();
        if(iconUrl){
            const icon = Dom.svg('image',{
                class: 'sqd-step-icon-image',
                href: iconUrl,
                x: (cfg.size - cfg.iconSize) / 2,
                y: (cfg.size - cfg.iconSize) / 2,
                width: cfg.iconSize,
                height: cfg.iconSize
            } )
            g.appendChild(icon);
        }

        const isInputViewHidden = stepContext.depth === 0 && stepContext.position === 0 && !stepContext.isInputConnected;
        const isOutputViewHidden = isInterrupted;

        const inputView = isInputViewHidden ? null : InputView.createRoundInput(g, iconSize, 0, cfg.inputSize);
		const outputView = isOutputViewHidden ? null : OutputView.create(g, iconSize, cfg.size, cfg.outputSize);

        
        return {
            g: g,
            width: cfg.size,
            height: cfg.size,
            joinX: iconSize,
            sequenceComponents: null,
            placeholders: null,

            hasOutput(): boolean {
                return !!outputView;
            },
            getClientPosition(): Vector {
                return getAbsolutePosition(circle);
            },
            resolveClick(click: ClickDetails): true | null {
                return g.contains(click.element) ? true : null;
            },
            setIsDragging(isDragging: boolean) {
                inputView?.setIsHidden(isDragging);
                outputView?.setIsHidden(isDragging);
            },
            setIsDisabled(isDisabled: boolean) {
				Dom.toggleClass(g, isDisabled, 'sqd-disabled');
			},
			setIsSelected(isSelected: boolean) {
				Dom.toggleClass(circle, isSelected, 'sqd-selected');
			}
        }
    

    }
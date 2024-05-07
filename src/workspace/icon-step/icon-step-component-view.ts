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

        let cx, cy, r;
        cx = cy = r = cfg.iconTaskSize;

        const circle = Dom.svg('circle', {
            class: 'sqd-step-icon-circle',
            cx: cx,
            cy: cy,
            r: r
        });
        g.insertBefore(circle,null);

        const iconUrl = viewContext.getStepIconUrl();
        const icon = iconUrl
            ? Dom.svg('image', {
                href: iconUrl
            })
            : Dom.svg('rect', {
                class: 'sqd-step-icon-empty-icon',
                rx: cfg.radius,
                ry: cfg.radius
            });
        Dom.attrs(icon, {
            x: cfg.paddingLeft,
            y: cfg.paddingY,
            width: cfg.iconSize,
            heigh: cfg.iconSize
        });
        g.appendChild(icon);

        const isInputViewHidden = stepContext.depth === 0 && stepContext.position === 0 && !stepContext.isInputConnected;
        const isOutputViewHidden = isInterrupted;

        const inputView = isInputViewHidden ? null : InputView.createRoundInput(g, cx / 2, 0, cfg.inputSize);
		const outputView = isOutputViewHidden ? null : OutputView.create(g, cx / 2, cy, cfg.outputSize);

        
        return {
            g,
            width: cx,
            height: cy,
            joinX: cx / 2,
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
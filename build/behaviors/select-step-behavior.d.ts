import { Vector } from '../core/vector';
import { DesignerContext } from '../designer-context';
import { StepComponent } from '../workspace/step-component';
import { Behavior } from './behavior';
export declare class SelectStepBehavior implements Behavior {
    private readonly pressedStepComponent;
    private readonly isDragDisabled;
    private readonly state;
    private readonly stateModifier;
    private readonly context;
    static create(pressedStepComponent: StepComponent, forceMove: boolean, context: DesignerContext): SelectStepBehavior;
    private constructor();
    onStart(): void;
    onMove(delta: Vector): Behavior | void;
    onEnd(interrupt: boolean): void;
}

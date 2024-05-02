import { Vector } from '../core/vector';
import { DesignerContext } from '../designer-context';
import { Behavior } from './behavior';
export declare class MoveViewportBehavior implements Behavior {
    private readonly startPosition;
    private readonly resetSelectedStep;
    private readonly state;
    private readonly stateModifier;
    static create(resetSelectedStep: boolean, context: DesignerContext): MoveViewportBehavior;
    private constructor();
    onStart(): void;
    onMove(delta: Vector): void;
    onEnd(): void;
}

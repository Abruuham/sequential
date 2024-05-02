import { DesignerContext } from '../designer-context';
import { ClickCommand } from '../workspace';
import { Behavior } from './behavior';
export declare class ClickBehaviorResolver {
    private readonly context;
    constructor(context: DesignerContext);
    resolve(commandOrNull: ClickCommand | null, element: Element, forceMove: boolean): Behavior;
}

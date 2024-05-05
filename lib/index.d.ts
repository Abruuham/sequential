import { Definition, Step, Sequence, ComponentType, DefinitionWalker, StepOrName } from 'sequential-workflow-model';
export * from 'sequential-workflow-model';

declare class Icons {
    static folderIn: string;
    static folderOut: string;
    static center: string;
    static zoomIn: string;
    static zoomOut: string;
    static undo: string;
    static redo: string;
    static move: string;
    static delete: string;
    static folderUp: string;
    static close: string;
    static options: string;
    static expand: string;
    static alert: string;
    static play: string;
    static stop: string;
    static folder: string;
    static appendPath(parent: SVGElement, pathClassName: string, d: string, size: number): SVGGElement;
    static createSvg(className: string, d: string): SVGElement;
}

declare class ObjectCloner {
    static deepClone<T>(instance: T): T;
}

interface Attributes {
    [name: string]: string | number;
}
declare class Dom {
    static svg<K extends keyof SVGElementTagNameMap>(name: K, attributes?: Attributes): SVGElementTagNameMap[K];
    static translate(element: SVGElement, x: number, y: number): void;
    static attrs(element: Element, attributes: Attributes): void;
    static element<T extends keyof HTMLElementTagNameMap>(name: T, attributes?: Attributes): HTMLElementTagNameMap[T];
    static toggleClass(element: Element, isEnabled: boolean, className: string): void;
}

declare class Vector {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    add(v: Vector): Vector;
    subtract(v: Vector): Vector;
    multiplyByScalar(s: number): Vector;
    divideByScalar(s: number): Vector;
    round(): Vector;
    distance(): number;
}

declare function getAbsolutePosition(element: Element): Vector;

declare class Uid {
    static next(): string;
}

declare class SimpleEvent<T> {
    private readonly listeners;
    subscribe(listener: SimpleEventListener<T>): void;
    unsubscribe(listener: SimpleEventListener<T>): void;
    readonly forward: (value: T) => void;
    count(): number;
    first(): Promise<T>;
}
type SimpleEventListener<T> = (value: T) => void;

declare function race<A, B, C>(timeout: number, a: SimpleEvent<A>, b: SimpleEvent<B>, c?: SimpleEvent<C>): SimpleEvent<[A?, B?, C?]>;

interface Behavior {
    onStart(position: Vector): void;
    onMove(delta: Vector): Behavior | void;
    onEnd(interrupt: boolean, element: Element | null): void;
}

declare class BehaviorController {
    private state?;
    start(startPosition: Vector, behavior: Behavior): void;
    private readonly onMouseMove;
    private readonly onTouchMove;
    private readonly onMouseUp;
    private readonly onTouchEnd;
    private readonly onTouchStart;
    private move;
    private stop;
}

interface DefinitionChangedEvent {
    changeType: DefinitionChangeType;
    stepId: string | null;
}
declare class DesignerState {
    definition: Definition;
    isReadonly: boolean;
    isToolboxCollapsed: boolean;
    isEditorCollapsed: boolean;
    readonly onViewportChanged: SimpleEvent<Viewport>;
    readonly onSelectedStepIdChanged: SimpleEvent<string | null>;
    readonly onFolderPathChanged: SimpleEvent<string[]>;
    readonly onIsReadonlyChanged: SimpleEvent<boolean>;
    readonly onIsDraggingChanged: SimpleEvent<boolean>;
    readonly onIsDragDisabledChanged: SimpleEvent<boolean>;
    readonly onDefinitionChanged: SimpleEvent<DefinitionChangedEvent>;
    readonly onIsToolboxCollapsedChanged: SimpleEvent<boolean>;
    readonly onIsEditorCollapsedChanged: SimpleEvent<boolean>;
    viewport: Viewport;
    selectedStepId: string | null;
    folderPath: string[];
    isDragging: boolean;
    isDragDisabled: boolean;
    constructor(definition: Definition, isReadonly: boolean, isToolboxCollapsed: boolean, isEditorCollapsed: boolean);
    setSelectedStepId(stepId: string | null): void;
    pushStepIdToFolderPath(stepId: string): void;
    setFolderPath(path: string[]): void;
    tryGetLastStepIdFromFolderPath(): string | null;
    setDefinition(definition: Definition): void;
    notifyDefinitionChanged(changeType: DefinitionChangeType, stepId: string | null): void;
    setViewport(viewport: Viewport): void;
    setIsReadonly(isReadonly: boolean): void;
    setIsDragging(isDragging: boolean): void;
    toggleIsDragDisabled(): void;
    setIsToolboxCollapsed(isCollapsed: boolean): void;
    setIsEditorCollapsed(isCollapsed: boolean): void;
}

declare class DefinitionValidator {
    private readonly configuration;
    private readonly state;
    constructor(configuration: ValidatorConfiguration | undefined, state: DesignerState);
    validateStep(step: Step, parentSequence: Sequence): boolean;
    validateRoot(): boolean;
}

declare class IconProvider {
    private readonly configuration;
    constructor(configuration: StepsConfiguration);
    getIconUrl(step: StepDefinition): string | null;
}

type Services = Required<DesignerExtension>;
declare class ServicesResolver {
    static resolve(extensions: DesignerExtension[] | undefined, configuration: DesignerConfiguration): Services;
}

declare class StepExtensionResolver {
    private readonly dict;
    static create(services: Services): StepExtensionResolver;
    private constructor();
    resolve(componentType: ComponentType): StepExtension<Step>;
}

interface Component {
    view: ComponentView;
    findById(stepId: string): StepComponent | null;
    resolveClick(click: ClickDetails): ClickCommand | null;
    getPlaceholders(result: Placeholder[]): void;
    setIsDragging(isDragging: boolean): void;
    updateBadges(result: BadgesResult): void;
}
interface ComponentView {
    g: SVGGElement;
    width: number;
    height: number;
    joinX: number;
}
interface StepComponentView extends ComponentView {
    sequenceComponents: SequenceComponent[] | null;
    placeholders: Placeholder[] | null;
    hasOutput(): boolean;
    /**
     * @param click Details about the click.
     * @returns `true` if selected a step, a click command if clicked a specific action, `null` if not clicked at this view.
     */
    resolveClick(click: ClickDetails): true | ClickCommand | null;
    setIsDragging(isDragging: boolean): void;
    setIsSelected(isSelected: boolean): void;
    setIsDisabled(isDisabled: boolean): void;
    getClientPosition(): Vector;
}
interface SequenceComponent extends Component {
    hasOutput: boolean;
}
interface ClickDetails {
    element: Element;
    position: Vector;
    scale: number;
}
type ClickCommand = SelectStepClickCommand | RerenderStepClickCommand | OpenFolderClickCommand | TriggerCustomActionClickCommand;
interface BaseClickCommand {
    type: ClickCommandType;
}
interface SelectStepClickCommand extends BaseClickCommand {
    type: ClickCommandType.selectStep;
    component: StepComponent;
}
interface RerenderStepClickCommand extends BaseClickCommand {
    type: ClickCommandType.rerenderStep;
    step: Step;
}
interface OpenFolderClickCommand extends BaseClickCommand {
    type: ClickCommandType.openFolder;
    step: Step;
}
interface TriggerCustomActionClickCommand extends BaseClickCommand {
    type: ClickCommandType.triggerCustomAction;
    step: Step | null;
    sequence: Sequence;
    action: CustomAction;
}
declare enum ClickCommandType {
    selectStep = 1,
    rerenderStep = 2,
    openFolder = 3,
    triggerCustomAction = 4
}
interface BadgeView {
    g: SVGGElement;
    width: number;
    height: number;
}
interface Badge {
    view: BadgeView | null;
    update(result: unknown): unknown;
    resolveClick(click: ClickDetails): ClickCommand | null;
}
type BadgesResult = unknown[];
interface Placeholder {
    view: PlaceholderView;
    parentSequence: Sequence;
    index: number;
    getClientRect(): DOMRect;
    setIsHover(isHover: boolean): void;
    setIsVisible(isVisible: boolean): void;
    resolveClick(click: ClickDetails): ClickCommand | null;
}
declare enum PlaceholderDirection {
    none = 0,
    in = 1,
    out = 2
}
interface PlaceholderView {
    g: SVGGElement;
}

declare class StepComponent implements Component {
    readonly view: StepComponentView;
    readonly step: Step;
    readonly parentSequence: Sequence;
    readonly hasOutput: boolean;
    private readonly badges;
    static create(view: StepComponentView, stepContext: StepContext, componentContext: ComponentContext): StepComponent;
    private isDisabled;
    private constructor();
    findById(stepId: string): StepComponent | null;
    resolveClick(click: ClickDetails): ClickCommand | null;
    getPlaceholders(result: Placeholder[]): void;
    setIsDragging(isDragging: boolean): void;
    setIsSelected(isSelected: boolean): void;
    setIsDisabled(isDisabled: boolean): void;
    updateBadges(result: BadgesResult): void;
}

declare class StepComponentFactory {
    private readonly stepExtensionResolver;
    constructor(stepExtensionResolver: StepExtensionResolver);
    create(parentElement: SVGElement, stepContext: StepContext, componentContext: ComponentContext): StepComponent;
}

declare class ComponentContext {
    readonly validator: DefinitionValidator;
    readonly iconProvider: IconProvider;
    readonly placeholderController: PlaceholderController;
    readonly stepComponentFactory: StepComponentFactory;
    readonly services: Services;
    static create(stepsConfiguration: StepsConfiguration, validatorConfiguration: ValidatorConfiguration | undefined, state: DesignerState, stepExtensionResolver: StepExtensionResolver, services: Services): ComponentContext;
    private constructor();
}

declare class CustomActionController {
    private readonly configuration;
    private readonly state;
    private readonly stateModifier;
    constructor(configuration: DesignerConfiguration, state: DesignerState, stateModifier: StateModifier);
    trigger(action: CustomAction, step: Step | null, sequence: Sequence): void;
    private createCustomActionHandlerContext;
    private notifyStepChanged;
}

declare class HistoryController {
    private readonly stack;
    private readonly state;
    private readonly stateModifier;
    private readonly stackSize;
    static create(initialStack: UndoStack | undefined, state: DesignerState, stateModifier: StateModifier, configuration: DesignerConfiguration): HistoryController;
    constructor(stack: UndoStack, state: DesignerState, stateModifier: StateModifier, stackSize: number);
    canUndo(): boolean;
    undo(): void;
    canRedo(): boolean;
    redo(): void;
    dump(): UndoStack;
    replaceDefinition(definition: Definition): void;
    private rememberCurrent;
    private remember;
    private commit;
}

declare class LayoutController {
    private readonly parent;
    constructor(parent: HTMLElement);
    isMobile(): boolean;
}

interface WorkspaceController {
    getPlaceholders(): Placeholder[];
    getComponentByStepId(stepId: string): StepComponent;
    getCanvasPosition(): Vector;
    getCanvasSize(): Vector;
    getRootComponentSize(): Vector;
    updateBadges(): void;
    updateRootComponent(): void;
    updateCanvasSize(): void;
}
declare class WorkspaceControllerWrapper implements WorkspaceController {
    private controller?;
    set(controller: WorkspaceController): void;
    private get;
    getPlaceholders(): Placeholder[];
    getComponentByStepId(stepId: string): StepComponent;
    getCanvasPosition(): Vector;
    getCanvasSize(): Vector;
    getRootComponentSize(): Vector;
    updateBadges(): void;
    updateRootComponent(): void;
    updateCanvasSize(): void;
}

declare class DesignerContext {
    readonly theme: string;
    readonly state: DesignerState;
    readonly configuration: DesignerConfiguration;
    readonly services: Services;
    readonly componentContext: ComponentContext;
    readonly definitionWalker: DefinitionWalker;
    readonly stateModifier: StateModifier;
    readonly layoutController: LayoutController;
    readonly workspaceController: WorkspaceControllerWrapper;
    readonly behaviorController: BehaviorController;
    readonly customActionController: CustomActionController;
    readonly historyController: HistoryController | undefined;
    static create(parent: HTMLElement, startDefinition: Definition, configuration: DesignerConfiguration, services: Services): DesignerContext;
    constructor(theme: string, state: DesignerState, configuration: DesignerConfiguration, services: Services, componentContext: ComponentContext, definitionWalker: DefinitionWalker, stateModifier: StateModifier, layoutController: LayoutController, workspaceController: WorkspaceControllerWrapper, behaviorController: BehaviorController, customActionController: CustomActionController, historyController: HistoryController | undefined);
    setWorkspaceController(controller: WorkspaceController): void;
}

type EditorRendererHandler = (step: Step | null) => void;
declare class EditorRenderer {
    private readonly state;
    private readonly selectedStepIdProvider;
    private readonly definitionWalker;
    private readonly handler;
    private readonly raceEvent;
    static create(state: DesignerState, selectedStepIdProvider: SelectedStepIdProvider, definitionWalker: DefinitionWalker, handler: EditorRendererHandler): EditorRenderer;
    private currentStepId;
    private constructor();
    destroy(): void;
    private render;
    private renderIfStepChanged;
    private readonly raceEventHandler;
}

interface StateModifierDependency {
    update(): void;
}

interface SelectedStepIdProvider {
    onSelectedStepIdChanged: SimpleEvent<string | null>;
    selectedStepId: string | null;
}
declare class EditorApi {
    private readonly state;
    private readonly definitionWalker;
    private readonly stateModifier;
    constructor(state: DesignerState, definitionWalker: DefinitionWalker, stateModifier: StateModifier);
    isCollapsed(): boolean;
    isReadonly(): boolean;
    toggleIsCollapsed(): void;
    subscribeIsCollapsed(listener: SimpleEventListener<boolean>): void;
    getDefinition(): Definition;
    addDefinitionModifierDependency(dependency: StateModifierDependency): void;
    runRenderer(rendererHandler: EditorRendererHandler, customSelectedStepIdProvider: SelectedStepIdProvider | null): EditorRenderer;
    createStepEditorContext(stepId: string): StepEditorContext;
    createRootEditorContext(): RootEditorContext;
}

declare class PathBarApi {
    private readonly state;
    private readonly definitionWalker;
    constructor(state: DesignerState, definitionWalker: DefinitionWalker);
    readonly onStateChanged: SimpleEvent<[(string[] | undefined)?, (DefinitionChangedEvent | undefined)?, unknown?]>;
    setFolderPath(path: string[]): void;
    getFolderPath(): string[];
    getFolderPathStepNames(): string[];
}

declare class ToolboxDataProvider {
    private readonly iconProvider;
    private readonly configuration;
    constructor(iconProvider: IconProvider, configuration: ToolboxConfiguration | false);
    getAllGroups(): ToolboxGroupData[];
    private readonly createItemData;
    applyFilter(allGroups: ToolboxGroupData[], filter: string | undefined): ToolboxGroupData[];
}
interface ToolboxGroupData {
    name: string;
    items: ToolboxItemData[];
}
interface ToolboxItemData {
    iconUrl: string | null;
    label: string;
    lowerCaseLabel: string;
    description: string;
    step: StepDefinition;
}

declare class ToolboxApi {
    private readonly state;
    private readonly designerContext;
    private readonly behaviorController;
    private readonly toolboxDataProvider;
    private readonly uidGenerator;
    constructor(state: DesignerState, designerContext: DesignerContext, behaviorController: BehaviorController, toolboxDataProvider: ToolboxDataProvider, uidGenerator: UidGenerator | undefined);
    isCollapsed(): boolean;
    toggleIsCollapsed(): void;
    subscribeIsCollapsed(listener: SimpleEventListener<boolean>): void;
    getAllGroups(): ToolboxGroupData[];
    applyFilter(allGroups: ToolboxGroupData[], filter: string | undefined): ToolboxGroupData[];
    /**
     * @param position Mouse or touch position.
     * @param step Step definition.
     * @returns If started dragging returns true, otherwise returns false.
     */
    tryDrag(position: Vector, step: StepDefinition): boolean;
    private activateStep;
}

declare class ViewportApi {
    private readonly workspaceController;
    private readonly viewportController;
    constructor(workspaceController: WorkspaceControllerWrapper, viewportController: ViewportController);
    resetViewport(): void;
    zoom(direction: boolean): void;
    moveViewportToStep(stepId: string): void;
}

declare class WorkspaceApi {
    private readonly state;
    private readonly workspaceController;
    constructor(state: DesignerState, workspaceController: WorkspaceControllerWrapper);
    getCanvasPosition(): Vector;
    getCanvasSize(): Vector;
    getRootComponentSize(): Vector;
    getViewport(): Viewport;
    setViewport(viewport: Viewport): void;
    updateRootComponent(): void;
    updateBadges(): void;
    updateCanvasSize(): void;
}

declare class DesignerApi {
    readonly controlBar: ControlBarApi;
    readonly toolbox: ToolboxApi;
    readonly editor: EditorApi;
    readonly workspace: WorkspaceApi;
    readonly viewport: ViewportApi;
    readonly pathBar: PathBarApi;
    readonly definitionWalker: DefinitionWalker;
    static create(context: DesignerContext): DesignerApi;
    private constructor();
}

declare class Badges {
    private readonly g;
    private readonly position;
    private readonly badges;
    static createForStep(stepContext: StepContext, view: StepComponentView, componentContext: ComponentContext): Badges;
    static createForRoot(parentElement: SVGGElement, position: Vector, componentContext: ComponentContext): Badges;
    private constructor();
    update(result: BadgesResult): void;
    resolveClick(click: ClickDetails): ClickCommand | null;
}

interface ValidationErrorBadgeViewConfiguration {
    size: number;
    iconSize: number;
}

interface ValidationErrorBadgeExtensionConfiguration {
    view: ValidationErrorBadgeViewConfiguration;
}

declare class ValidationErrorBadgeExtension implements BadgeExtension {
    private readonly configuration;
    static create(configuration?: ValidationErrorBadgeExtensionConfiguration): ValidationErrorBadgeExtension;
    readonly id = "validationError";
    private constructor();
    createForStep(parentElement: SVGElement, stepContext: StepContext<Step>, componentContext: ComponentContext): Badge;
    createForRoot(parentElement: SVGElement, componentContext: ComponentContext): Badge;
    readonly createStartValue: () => boolean;
}

declare class InputView {
    private readonly root;
    static createRectInput(parent: SVGElement, x: number, y: number, size: number, iconSize: number, iconUrl: string | null): InputView;
    static createRoundInput(parent: SVGElement, x: number, y: number, size: number): InputView;
    private constructor();
    setIsHidden(isHidden: boolean): void;
}

declare class JoinView {
    static createStraightJoin(parent: SVGElement, start: Vector, height: number): void;
    static createJoins(parent: SVGElement, start: Vector, targets: Vector[]): void;
}

interface LabelViewConfiguration {
    minWidth: number;
    height: number;
    paddingX: number;
    radius: number;
}

declare class LabelView {
    readonly g: SVGGElement;
    readonly width: number;
    readonly height: number;
    static create(parent: SVGElement, y: number, cfg: LabelViewConfiguration, text: string, theme: 'primary' | 'secondary'): LabelView;
    constructor(g: SVGGElement, width: number, height: number);
}

declare class OutputView {
    private readonly root;
    static create(parent: SVGElement, x: number, y: number, size: number): OutputView;
    constructor(root: SVGElement);
    setIsHidden(isHidden: boolean): void;
}

declare class RegionView {
    private readonly lines;
    private readonly width;
    private readonly height;
    static create(parent: SVGElement, widths: number[], height: number): RegionView;
    constructor(lines: SVGLineElement[], width: number, height: number);
    getClientPosition(): Vector;
    resolveClick(click: ClickDetails): boolean;
    setIsSelected(isSelected: boolean): void;
}

declare class RectPlaceholderView implements PlaceholderView {
    readonly rect: SVGElement;
    readonly g: SVGGElement;
    static create(parent: SVGElement, width: number, height: number, radius: number, iconSize: number, direction: PlaceholderDirection): RectPlaceholderView;
    private constructor();
    setIsHover(isHover: boolean): void;
    setIsVisible(isVisible: boolean): void;
}

declare class DefaultSequenceComponentView implements ComponentView {
    readonly g: SVGGElement;
    readonly width: number;
    readonly height: number;
    readonly joinX: number;
    readonly placeholders: Placeholder[];
    readonly components: StepComponent[];
    static create(parent: SVGElement, sequenceContext: SequenceContext, componentContext: ComponentContext): DefaultSequenceComponentView;
    private constructor();
    setIsDragging(isDragging: boolean): void;
    hasOutput(): boolean;
}

declare class DefaultSequenceComponent implements SequenceComponent {
    readonly view: DefaultSequenceComponentView;
    readonly hasOutput: boolean;
    static create(parentElement: SVGElement, sequenceContext: SequenceContext, context: ComponentContext): DefaultSequenceComponent;
    private constructor();
    resolveClick(click: ClickDetails): ClickCommand | null;
    findById(stepId: string): StepComponent | null;
    getPlaceholders(result: Placeholder[]): void;
    setIsDragging(isDragging: boolean): void;
    updateBadges(result: BadgesResult): void;
}

interface ContainerStepComponentViewConfiguration {
    paddingTop: number;
    paddingX: number;
    inputSize: number;
    inputIconSize: number;
    label: LabelViewConfiguration;
}

interface ContainerStepExtensionConfiguration {
    view: ContainerStepComponentViewConfiguration;
}

declare const createContainerStepComponentViewFactory: (cfg: ContainerStepComponentViewConfiguration) => StepComponentViewFactory;

interface LineGridConfiguration {
    gridSizeX: number;
    gridSizeY: number;
}

interface SwitchStepComponentViewConfiguration {
    minContainerWidth: number;
    paddingX: number;
    paddingTop: number;
    connectionHeight: number;
    inputSize: number;
    inputIconSize: number;
    nameLabel: LabelViewConfiguration;
    branchNameLabel: LabelViewConfiguration;
}

declare const createSwitchStepComponentViewFactory: (cfg: SwitchStepComponentViewConfiguration) => StepComponentViewFactory;

interface SwitchStepExtensionConfiguration {
    view: SwitchStepComponentViewConfiguration;
}

interface TaskStepComponentViewConfiguration {
    paddingLeft: number;
    paddingRight: number;
    paddingY: number;
    textMarginLeft: number;
    minTextWidth: number;
    iconSize: number;
    radius: number;
    inputSize: number;
    outputSize: number;
}

declare const createTaskStepComponentViewFactory: (isInterrupted: boolean, cfg: TaskStepComponentViewConfiguration) => StepComponentViewFactory;

interface TaskStepExtensionConfiguration {
    view: TaskStepComponentViewConfiguration;
}

interface IconStepComponentViewConfiguration {
    paddingLeft: number;
    paddingRight: number;
    paddingY: number;
    textMarginLeft: number;
    minTextWidth: number;
    iconSize: number;
    radius: number;
    inputSize: number;
    outputSize: number;
}

declare const createIconStepComponentViewFactory: (isInterrupted: boolean, cfg: IconStepComponentViewConfiguration) => StepComponentViewFactory;

interface IconStepExtensionConfiguration {
    view: IconStepComponentViewConfiguration;
}

declare class CenteredViewportCalculator {
    static center(margin: number, canvasSize: Vector, rootComponentSize: Vector): Viewport;
    static focusOnComponent(canvasSize: Vector, viewport: Viewport, componentPosition: Vector, componentSize: Vector): Viewport;
}

declare class ClassicWheelController implements WheelController {
    private readonly api;
    static create(api: WorkspaceApi): ClassicWheelController;
    private constructor();
    onWheel(e: WheelEvent): void;
}

declare class ClassicWheelControllerExtension implements WheelControllerExtension {
    readonly create: typeof ClassicWheelController.create;
}

declare class QuantifiedScaleViewportCalculator {
    static zoom(current: Viewport, direction: boolean): Viewport;
    static zoomByWheel(current: Viewport, e: WheelEvent, canvasPosition: Vector): Viewport | null;
}

declare class DefaultViewportController implements ViewportController {
    private readonly api;
    static create(api: WorkspaceApi): DefaultViewportController;
    private readonly animator;
    private constructor();
    setDefault(): void;
    zoom(direction: boolean): void;
    focusOnComponent(componentPosition: Vector, componentSize: Vector): void;
    animateTo(viewport: Viewport): void;
}

declare class DefaultViewportControllerExtension implements ViewportControllerExtension {
    readonly create: typeof DefaultViewportController.create;
}

interface RectPlaceholderConfiguration {
    gapWidth: number;
    gapHeight: number;
    radius: number;
    iconSize: number;
}

declare class RectPlaceholder implements Placeholder {
    readonly view: RectPlaceholderView;
    readonly parentSequence: Sequence;
    readonly index: number;
    static create(parent: SVGElement, size: Vector, direction: PlaceholderDirection, sequence: Sequence, index: number, configuration: RectPlaceholderConfiguration): RectPlaceholder;
    constructor(view: RectPlaceholderView, parentSequence: Sequence, index: number);
    getClientRect(): DOMRect;
    setIsHover(isHover: boolean): void;
    setIsVisible(isVisible: boolean): void;
    resolveClick(): null;
}

interface DesignerExtension {
    steps?: StepExtension[];
    stepComponentViewWrapper?: StepComponentViewWrapperExtension;
    badges?: BadgeExtension[];
    uiComponents?: UiComponentExtension[];
    draggedComponent?: DraggedComponentExtension;
    wheelController?: WheelControllerExtension;
    viewportController?: ViewportControllerExtension;
    placeholderController?: PlaceholderControllerExtension;
    placeholder?: PlaceholderExtension;
    grid?: GridExtension;
    rootComponent?: RootComponentExtension;
    sequenceComponent?: SequenceComponentExtension;
    contextMenu?: ContextMenuExtension;
    daemons?: DaemonExtension[];
}
interface StepExtension<S extends Step = Step> {
    componentType: ComponentType;
    createComponentView(parentElement: SVGElement, stepContext: StepContext<S>, viewContext: StepComponentViewContext): StepComponentView;
}
type StepComponentViewFactory = StepExtension['createComponentView'];
interface StepComponentViewContext {
    getStepIconUrl(): string | null;
    createSequenceComponent(parentElement: SVGElement, sequence: Sequence): SequenceComponent;
    createPlaceholderForArea(parentElement: SVGElement, size: Vector, direction: PlaceholderDirection, sequence: Sequence, index: number): Placeholder;
}
interface StepContext<S extends Step = Step> {
    parentSequence: Sequence;
    step: S;
    depth: number;
    position: number;
    isInputConnected: boolean;
    isOutputConnected: boolean;
}
interface SequenceContext {
    sequence: Sequence;
    depth: number;
    isInputConnected: boolean;
    isOutputConnected: boolean;
}
interface StepComponentViewWrapperExtension {
    wrap(view: StepComponentView, stepContext: StepContext): StepComponentView;
}
interface BadgeExtension {
    id: string;
    createForStep(parentElement: SVGElement, stepContext: StepContext, componentContext: ComponentContext): Badge;
    createForRoot?: (parentElement: SVGElement, componentContext: ComponentContext) => Badge;
    createStartValue(): unknown;
}
interface WheelControllerExtension {
    create(api: WorkspaceApi): WheelController;
}
interface WheelController {
    onWheel(e: WheelEvent): void;
}
interface UiComponentExtension {
    create(root: HTMLElement, api: DesignerApi): UiComponent;
}
interface UiComponent {
    destroy(): void;
}
interface DraggedComponentExtension {
    create(parentElement: HTMLElement, step: Step, componentContext: ComponentContext): DraggedComponent;
}
interface DraggedComponent {
    width: number;
    height: number;
    destroy(): void;
}
interface GridExtension {
    create(): Grid;
}
interface Grid {
    size: Vector;
    element: SVGElement;
    setScale(scale: number, scaledSize: Vector): void;
}
interface RootComponentExtension {
    create(parentElement: SVGElement, sequence: Sequence, parentPlaceIndicator: SequencePlaceIndicator | null, context: ComponentContext): Component;
}
interface SequencePlaceIndicator {
    sequence: Sequence;
    index: number;
}
interface SequenceComponentExtension {
    create(parentElement: SVGElement, sequenceContext: SequenceContext, componentContext: ComponentContext): SequenceComponent;
}
interface ContextMenuExtension {
    createItemsProvider?: (customActionController: CustomActionController) => ContextMenuItemsProvider;
}
interface ContextMenuItemsProvider {
    getItems(step: Step | null, sequence: Sequence): ContextMenuItem[];
}
interface ContextMenuItem {
    readonly label: string;
    readonly order: number;
    readonly callback?: () => void;
}
interface PlaceholderControllerExtension {
    create(): PlaceholderController;
}
interface PlaceholderController {
    canCreate(sequence: Sequence, index: number): boolean;
}
interface PlaceholderExtension {
    gapSize: Vector;
    createForGap(parentElement: SVGElement, sequence: Sequence, index: number): Placeholder;
    createForArea(parentElement: SVGElement, size: Vector, direction: PlaceholderDirection, sequence: Sequence, index: number): Placeholder;
}
interface ViewportControllerExtension {
    create(api: WorkspaceApi): ViewportController;
}
interface ViewportController {
    setDefault(): void;
    zoom(direction: boolean): void;
    focusOnComponent(componentPosition: Vector, componentSize: Vector): void;
}
interface Viewport {
    readonly position: Vector;
    readonly scale: number;
}
interface DaemonExtension {
    create(api: DesignerApi): Daemon;
}
interface Daemon {
    destroy(): void;
}

interface DesignerConfiguration<TDefinition extends Definition = Definition> {
    /**
     * @description The theme of the designer.
     * @default `light`
     */
    theme?: string;
    /**
     * @description The readonly mode of the designer.
     */
    isReadonly?: boolean;
    /**
     * @description The depth of the undo stack. If not set, undo/redo feature will be disabled.
     */
    undoStackSize?: number;
    /**
     * @description The initial undo stack. If not set, the undo stack will be empty.
     */
    undoStack?: UndoStack;
    /**
     * @description The common configuration of the steps.
     */
    steps: StepsConfiguration;
    /**
     * @description The configuration of the toolbox. If not set, the toolbox will be hidden.
     */
    toolbox: false | ToolboxConfiguration;
    /**
     * @description The configuration of the smart editor. If not set, the smart editor will be hidden.
     */
    editors: false | EditorsConfiguration<TDefinition>;
    /**
     * @description If true, the control bar will be displayed. In the next version, this property will be required.
     */
    controlBar: boolean;
    /**
     * @description If false, the context menu will be disabled. By default, the context menu is enabled.
     */
    contextMenu?: boolean;
    /**
     * @description The configuration of validators.
     */
    validator?: ValidatorConfiguration;
    /**
     * @description The configuration of the keyboard shortcuts. By default, the keyboard shortcuts are enabled (`true`). If `false`, the keyboard shortcuts are disabled.
     */
    keyboard?: boolean | KeyboardConfiguration;
    /**
     * @description The handler that handles custom actions.
     */
    customActionHandler?: CustomActionHandler;
    /**
     * @description The extensions of the designer.
     */
    extensions?: DesignerExtension[];
    /**
     * @description Custom definition walker.
     */
    definitionWalker?: DefinitionWalker;
    /**
     * @description Custom generator of unique identifiers.
     */
    uidGenerator?: UidGenerator;
}
type UidGenerator = () => string;
type CustomActionHandler = (action: CustomAction, step: Step | null, sequence: Sequence, context: CustomActionHandlerContext) => void;
interface CustomAction {
    type: string;
}
interface CustomActionHandlerContext {
    /**
     * @description Notifies the designer that the name of the step has changed.
     * @param stepId The id of the step whose name has changed.
     */
    notifyStepNameChanged(stepId: string): void;
    /**
     * @description Notifies the designer that the properties of the step have changed.
     * @param stepId The id of the step whose properties have changed.
     */
    notifyStepPropertiesChanged(stepId: string): void;
    /**
     * @description Notifies the designer that the step has been inserted.
     * @param stepId The id of the inserted step.
     */
    notifyStepInserted(stepId: string): void;
    /**
     * @description Notifies the designer that the step has been moved.
     * @param stepId The id of the moved step.
     */
    notifyStepMoved(stepId: string): void;
    /**
     * @description Notifies the designer that the step has been deleted.
     * @param stepId The id of the deleted step.
     */
    notifyStepDeleted(stepId: string): void;
}
interface ToolboxConfiguration {
    labelProvider?: StepLabelProvider;
    descriptionProvider?: StepDescriptionProvider;
    isCollapsed?: boolean;
    groups: ToolboxGroupConfiguration[];
}
type StepDefinition = Omit<Step, 'id'>;
type StepLabelProvider = (step: StepDefinition) => string;
type StepDescriptionProvider = (step: StepDefinition) => string;
interface ToolboxGroupConfiguration {
    name: string;
    steps: StepDefinition[];
}
interface StepsConfiguration {
    isSelectable?: (step: Step, parentSequence: Sequence) => boolean;
    canInsertStep?: (step: Step, targetSequence: Sequence, targetIndex: number) => boolean;
    isDraggable?: (step: Step, parentSequence: Sequence) => boolean;
    canMoveStep?: (sourceSequence: Sequence, step: Step, targetSequence: Sequence, targetIndex: number) => boolean;
    isDeletable?: (step: Step, parentSequence: Sequence) => boolean;
    canDeleteStep?: (step: Step, parentSequence: Sequence) => boolean;
    isDuplicable?: (step: Step, parentSequence: Sequence) => boolean;
    /**
     * @description The designer automatically selects the step after it is dropped. If true, the step will not be selected.
     */
    isAutoSelectDisabled?: boolean;
    iconUrlProvider?: StepIconUrlProvider;
}
type StepIconUrlProvider = (componentType: ComponentType, type: string) => string | null;
interface ValidatorConfiguration {
    step?: StepValidator;
    root?: RootValidator;
}
type StepValidator = (step: Step, parentSequence: Sequence, definition: Definition) => boolean;
type RootValidator = (definition: Definition) => boolean;
interface KeyboardConfiguration {
    canHandleKey?: (action: KeyboardAction, event: KeyboardEvent) => boolean;
}
declare enum KeyboardAction {
    delete = "delete"
}
interface EditorsConfiguration<TDefinition extends Definition = Definition> {
    isCollapsed?: boolean;
    stepEditorProvider: StepEditorProvider<TDefinition>;
    rootEditorProvider: RootEditorProvider<TDefinition>;
}
interface StepEditorContext {
    notifyNameChanged(): void;
    notifyPropertiesChanged(): void;
    notifyChildrenChanged(): void;
}
type StepEditorProvider<TDefinition extends Definition = Definition> = (step: Step, context: StepEditorContext, definition: TDefinition, isReadonly: boolean) => HTMLElement;
interface RootEditorContext {
    notifyPropertiesChanged(): void;
}
type RootEditorProvider<TDefinition extends Definition = Definition> = (definition: TDefinition, context: RootEditorContext, isReadonly: boolean) => HTMLElement;
interface UndoStack {
    index: number;
    items: UndoStackItem[];
}
interface UndoStackItem {
    definition: Definition;
    changeType: DefinitionChangeType;
    stepId: string | null;
}
declare enum DefinitionChangeType {
    stepNameChanged = 1,
    stepPropertyChanged = 2,
    stepChildrenChanged = 3,
    stepDeleted = 4,
    stepMoved = 5,
    stepInserted = 6,
    rootPropertyChanged = 7,
    rootReplaced = 8
}

declare class StateModifier {
    private readonly definitionWalker;
    private readonly state;
    private readonly configuration;
    private readonly dependencies;
    static create(definitionWalker: DefinitionWalker, state: DesignerState, configuration: DesignerConfiguration): StateModifier;
    constructor(definitionWalker: DefinitionWalker, state: DesignerState, configuration: DesignerConfiguration, dependencies: StateModifierDependency[]);
    addDependency(dependency: StateModifierDependency): void;
    isSelectable(step: Step, parentSequence: Sequence): boolean;
    trySelectStep(step: Step, parentSequence: Sequence): void;
    trySelectStepById(stepId: string): void;
    isDeletable(stepId: string): boolean;
    tryDelete(stepId: string): boolean;
    tryInsert(step: Step, targetSequence: Sequence, targetIndex: number): boolean;
    isDraggable(step: Step, parentSequence: Sequence): boolean;
    tryMove(sourceSequence: Sequence, step: Step, targetSequence: Sequence, targetIndex: number): boolean;
    isDuplicable(step: Step, parentSequence: Sequence): boolean;
    tryDuplicate(step: Step, parentSequence: Sequence): boolean;
    replaceDefinition(definition: Definition): void;
    updateDependencies(): void;
}

declare class ControlBarApi {
    private readonly state;
    private readonly historyController;
    private readonly stateModifier;
    private readonly viewportApi;
    static create(state: DesignerState, historyController: HistoryController | undefined, stateModifier: StateModifier, viewportApi: ViewportApi): ControlBarApi;
    private constructor();
    readonly onStateChanged: SimpleEvent<unknown>;
    resetViewport(): void;
    zoomIn(): void;
    zoomOut(): void;
    isDragDisabled(): boolean;
    toggleIsDragDisabled(): void;
    isUndoRedoSupported(): boolean;
    tryUndo(): boolean;
    canUndo(): boolean;
    tryRedo(): boolean;
    canRedo(): boolean;
    tryDelete(): boolean;
    canDelete(): boolean;
}

declare class Editor {
    private readonly view;
    private readonly renderer;
    static create(parent: HTMLElement, api: EditorApi, stepEditorClassName: string, stepEditorProvider: StepEditorProvider, rootEditorClassName: string, rootEditorProvider: RootEditorProvider, customSelectedStepIdProvider: SelectedStepIdProvider | null): Editor;
    private constructor();
    destroy(): void;
}

declare class Designer<TDefinition extends Definition = Definition> {
    private readonly view;
    private readonly state;
    private readonly stateModifier;
    private readonly walker;
    private readonly historyController;
    private readonly api;
    /**
     * Creates a designer.
     * @param placeholder Placeholder where the designer will be attached.
     * @param startDefinition Start definition of a flow.
     * @param configuration Designer's configuration.
     * @returns An instance of the designer.
     */
    static create<TDef extends Definition>(placeholder: HTMLElement, startDefinition: TDef, configuration: DesignerConfiguration<TDef>): Designer<TDef>;
    private constructor();
    /**
     * @description Fires when the designer is initialized and ready to use.
     */
    readonly onReady: SimpleEvent<void>;
    /**
     * @description Fires when the definition has changed.
     */
    readonly onDefinitionChanged: SimpleEvent<TDefinition>;
    /**
     * @description Fires when the viewport has changed.
     */
    readonly onViewportChanged: SimpleEvent<Viewport>;
    /**
     * @description Fires when the selected step has changed.
     */
    readonly onSelectedStepIdChanged: SimpleEvent<string | null>;
    /**
     * @description Fires when the toolbox is collapsed or expanded.
     */
    readonly onIsToolboxCollapsedChanged: SimpleEvent<boolean>;
    /**
     * @description Fires when the editor is collapsed or expanded.
     */
    readonly onIsEditorCollapsedChanged: SimpleEvent<boolean>;
    /**
     * @returns the current definition of the workflow.
     */
    getDefinition(): TDefinition;
    /**
     * @returns the validation result of the current definition.
     */
    isValid(): boolean;
    /**
     * @returns the readonly flag.
     */
    isReadonly(): boolean;
    /**
     * @description Changes the readonly flag.
     */
    setIsReadonly(isReadonly: boolean): void;
    /**
     * @returns current selected step id or `null` if nothing is selected.
     */
    getSelectedStepId(): string | null;
    /**
     * @description Selects a step by the id.
     */
    selectStepById(stepId: string): void;
    /**
     * @returns the current viewport.
     */
    getViewport(): Viewport;
    /**
     * @description Sets the viewport.
     * @param viewport Viewport.
     */
    setViewport(viewport: Viewport): void;
    /**
     * @description Unselects the selected step.
     */
    clearSelectedStep(): void;
    /**
     * @description Moves the viewport to the step with the animation.
     */
    moveViewportToStep(stepId: string): void;
    /**
     * @description Rerender the root component and all its children.
     */
    updateRootComponent(): void;
    /**
     * @description Updates all badges.
     */
    updateBadges(): void;
    /**
     * @returns a flag that indicates whether the toolbox is collapsed.
     */
    isToolboxCollapsed(): boolean;
    /**
     * @description Sets a flag that indicates whether the toolbox is collapsed.
     */
    setIsToolboxCollapsed(isCollapsed: boolean): void;
    /**
     * @returns a flag that indicates whether the editor is collapsed.
     */
    isEditorCollapsed(): boolean;
    /**
     * @description Sets a flag that indicates whether the editor is collapsed.
     */
    setIsEditorCollapsed(isCollapsed: boolean): void;
    /**
     * @description Dump the undo stack.
     */
    dumpUndoStack(): UndoStack;
    /**
     * Replaces the current definition with a new one and adds the previous definition to the undo stack.
     * @param definition A new definition.
     */
    replaceDefinition(definition: TDefinition): Promise<void>;
    /**
     * @param needle A step, a sequence or a step id.
     * @returns parent steps and branch names.
     */
    getStepParents(needle: Sequence | Step | string): StepOrName[];
    /**
     * @returns the definition walker.
     */
    getWalker(): DefinitionWalker;
    /**
     * @description Destroys the designer and deletes all nodes from the placeholder.
     */
    destroy(): void;
    private getHistoryController;
}

declare class LineGrid implements Grid {
    readonly size: Vector;
    readonly element: SVGPathElement;
    static create(size: Vector): LineGrid;
    private constructor();
    setScale(_: number, scaledSize: Vector): void;
}

declare class LineGridExtension implements GridExtension {
    private readonly configuration;
    static create(configuration?: LineGridConfiguration): LineGridExtension;
    private constructor();
    create(): LineGrid;
}

declare class LineGridDesignerExtension implements DesignerExtension {
    readonly grid: LineGridExtension;
    static create(configuration?: LineGridConfiguration): DesignerExtension;
    private constructor();
}

interface StepsDesignerExtensionConfiguration {
    container?: ContainerStepExtensionConfiguration;
    switch?: SwitchStepExtensionConfiguration;
    task?: TaskStepExtensionConfiguration;
    icon?: IconStepExtensionConfiguration;
}
declare class StepsDesignerExtension implements DesignerExtension {
    readonly steps: StepExtension<Step>[];
    static create(configuration: StepsDesignerExtensionConfiguration): StepsDesignerExtension;
    protected constructor(steps: StepExtension<Step>[]);
}

export { Attributes, Badge, BadgeExtension, BadgeView, Badges, BadgesResult, BaseClickCommand, CenteredViewportCalculator, ClassicWheelControllerExtension, ClickCommand, ClickCommandType, ClickDetails, Component, ComponentContext, ComponentView, ContainerStepComponentViewConfiguration, ContainerStepExtensionConfiguration, ContextMenuExtension, ContextMenuItem, ContextMenuItemsProvider, ControlBarApi, CustomAction, CustomActionController, CustomActionHandler, CustomActionHandlerContext, Daemon, DaemonExtension, DefaultSequenceComponent, DefaultSequenceComponentView, DefaultViewportController, DefaultViewportControllerExtension, DefinitionChangeType, DefinitionChangedEvent, Designer, DesignerApi, DesignerConfiguration, DesignerContext, DesignerExtension, DesignerState, Dom, DraggedComponent, DraggedComponentExtension, Editor, EditorApi, EditorsConfiguration, Grid, GridExtension, IconStepComponentViewConfiguration, IconStepExtensionConfiguration, Icons, InputView, JoinView, KeyboardAction, KeyboardConfiguration, LabelView, LineGridConfiguration, LineGridDesignerExtension, ObjectCloner, OpenFolderClickCommand, OutputView, PathBarApi, Placeholder, PlaceholderController, PlaceholderControllerExtension, PlaceholderDirection, PlaceholderExtension, PlaceholderView, QuantifiedScaleViewportCalculator, RectPlaceholder, RectPlaceholderConfiguration, RectPlaceholderView, RegionView, RerenderStepClickCommand, RootComponentExtension, RootEditorContext, RootEditorProvider, RootValidator, SelectStepClickCommand, SelectedStepIdProvider, SequenceComponent, SequenceComponentExtension, SequenceContext, SequencePlaceIndicator, Services, ServicesResolver, SimpleEvent, SimpleEventListener, StateModifierDependency, StepComponent, StepComponentView, StepComponentViewContext, StepComponentViewFactory, StepComponentViewWrapperExtension, StepContext, StepDefinition, StepDescriptionProvider, StepEditorContext, StepEditorProvider, StepExtension, StepExtensionResolver, StepIconUrlProvider, StepLabelProvider, StepValidator, StepsConfiguration, StepsDesignerExtension, StepsDesignerExtensionConfiguration, SwitchStepComponentViewConfiguration, SwitchStepExtensionConfiguration, TaskStepComponentViewConfiguration, TaskStepExtensionConfiguration, ToolboxApi, ToolboxConfiguration, ToolboxGroupConfiguration, TriggerCustomActionClickCommand, UiComponent, UiComponentExtension, Uid, UidGenerator, UndoStack, UndoStackItem, ValidationErrorBadgeExtension, ValidationErrorBadgeExtensionConfiguration, ValidationErrorBadgeViewConfiguration, ValidatorConfiguration, Vector, Viewport, ViewportController, ViewportControllerExtension, WheelController, WheelControllerExtension, WorkspaceApi, createContainerStepComponentViewFactory, createIconStepComponentViewFactory, createSwitchStepComponentViewFactory, createTaskStepComponentViewFactory, getAbsolutePosition, race };

import { IconProvider } from '../core/icon-provider';
import { StepDefinition, ToolboxConfiguration } from '../designer-configuration';
export declare class ToolboxDataProvider {
    private readonly iconProvider;
    private readonly configuration;
    constructor(iconProvider: IconProvider, configuration: ToolboxConfiguration | false);
    getAllGroups(): ToolboxGroupData[];
    private readonly createItemData;
    applyFilter(allGroups: ToolboxGroupData[], filter: string | undefined): ToolboxGroupData[];
}
export interface ToolboxGroupData {
    name: string;
    items: ToolboxItemData[];
}
export interface ToolboxItemData {
    iconUrl: string | null;
    label: string;
    lowerCaseLabel: string;
    description: string;
    step: StepDefinition;
}

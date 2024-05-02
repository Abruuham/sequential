export declare class SimpleEvent<T> {
    private readonly listeners;
    subscribe(listener: SimpleEventListener<T>): void;
    unsubscribe(listener: SimpleEventListener<T>): void;
    readonly forward: (value: T) => void;
    count(): number;
    first(): Promise<T>;
}
export type SimpleEventListener<T> = (value: T) => void;

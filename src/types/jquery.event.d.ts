interface JQueryEvent {
    trigger(name: any): void;
}

interface JQueryStatic {
    event: JQueryEvent;
}

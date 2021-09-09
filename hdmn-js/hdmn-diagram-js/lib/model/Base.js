import { isObject } from "@hdmn-diagram-node/min-dash";

class Base {
    constructor(eventBus) {
        this.eventBus = eventBus;
    }

    json() {
        return {
            id: this.id,
            shape: this.shape,
            markup: this.markup,
            attrs: this.attrs,
        }
    }
}

export default Base;

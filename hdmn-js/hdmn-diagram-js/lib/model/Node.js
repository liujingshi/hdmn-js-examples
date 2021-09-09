import { assign, isUndefined } from "@hdmn-diagram-node/min-dash";
import Base from "./Base";

class Node extends Base {
    constructor(eventBus) { 
        super(eventBus)
    }

    json() {
        return assign({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }, super.json());
    }

    register() {
        if (isUndefined(this.eventBus)) {
            return;
        }
        this.eventBus.emit("x6.registerNode", this.shape, this.json());
    }

    create(id, x, y) {
        if (isUndefined(this.eventBus)) {
            return;
        }
        this.id = id;
        this.x = x;
        this.y = y;
        return this.eventBus.emit("x6.addNode", this.json());
    }
}

export default Node;

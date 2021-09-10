import { assign, isUndefined } from "@hdmn-diagram-node/min-dash";
import Base from "./Base";

class Edge extends Base {
    constructor(eventBus) { 
        super(eventBus)
    }

    json() {
        return assign({
            source: this.source,
            target: this.target,
            vertices: this.vertices,
            connector: this.connector,
        }, super.json());
    }

    register() {
        if (isUndefined(this.eventBus)) {
            return;
        }
        this.eventBus.emit("x6.registerEdge", this.shape, this.json());
    }

    create(id, source, target, vertices) {
        if (isUndefined(this.eventBus)) {
            return;
        }
        this.id = id;
        this.source = source;
        this.target = target;
        this.vertices = vertices;
        return this.eventBus.emit("x6.addEdge", this.json());
    }
}

export default Edge;

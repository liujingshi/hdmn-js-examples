import { Graph } from "@hdmn-diagram-node/@antv/x6";
import { assign } from "@hdmn-diagram-node/min-dash";
import X6_DEFAULT_CONFIG from "./X6DefaultConfig"; // X6 的默认配置

/**
 * X6封装 注意 初始化不能直接初始化 需要订阅 x6.init 事件 来初始化
 * @param {Object} config 配置
 * @param {EventBus} eventBus EventBus
 */
function X6(config, eventBus) {
    // 订阅 x6.init 事件
    eventBus.on("x6.init", () => {
        this._init(config, eventBus);
    });
}

X6.$inject = ["config.x6Config", "eventBus"];

/**
 * 初始化X6
 * @param {Object} config 配置
 * @param {EventBus} eventBus EventBus
 */
X6.prototype._init = function (config, eventBus) {
    // 合成 X6 的配置
    const x6Config = assign({}, X6_DEFAULT_CONFIG, config);
    // 创建 X6 的 Graph
    this.graph = new Graph(x6Config);

    /**
     * 这里订阅事件 具体事件在下方
     */
    eventBus.on("x6.registerNode", (event, name, nodeConfig) => {
        this._registerNode(name, nodeConfig);
    });

    eventBus.on("x6.addNode", (event, node) => {
        return this._addNodeToGraph(node);
    });

    eventBus.on("x6.addEdge", (event, edge) => {
        return this._addEdgeToGraph(edge);
    });
};

// 注册 Node
X6.prototype._registerNode = function (name, nodeConfig) {
    Graph.registerNode(name, nodeConfig);
};

// 添加 Node 到 Graph
X6.prototype._addNodeToGraph = function (node) {
    return this.graph.addNode(node);
};

// 添加 Edge 到 Graph
X6.prototype._addEdgeToGraph = function (edge) {
    return this.graph.addEdge(edge);
};

// 删除 Cell 从 Graph
X6.prototype._delCellToGraph = function () {};

// 删除 Node 从 Graph
X6.prototype._delNodeToGraph = function () {};

// 删除 Edge 从 Graph
X6.prototype._delEdgeToGraph = function () {};

export default X6;

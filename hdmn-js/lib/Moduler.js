import { assign } from "@hdmn-node/min-dash";
import { modulerConfig } from "./config/X6DefaultConfig";
import Viewer from "./Viewer";

function Moduler(options) {
    // options 默认值
    options = options || {};

    // 创建 HdmnDiagram 对象
    const hdmnDiagram = new Viewer({
        // 模块
        modules: [].concat(options.modules || []),
        // X6 配置
        x6Config: assign({}, modulerConfig, options.x6Config || {}),
    });

    return hdmnDiagram;
}

export default Moduler;

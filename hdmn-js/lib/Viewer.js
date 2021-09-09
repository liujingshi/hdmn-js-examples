import { HdmnDiagram } from "@hdmn-diagram/lib/hdmn-diagram";
import { assign } from "@hdmn-node/min-dash";
import { viewerConfig } from "./config/X6DefaultConfig";
import CoreModule from "./core";
import CustomCellModule  from "./custom-cell";

function Viewer(options) {
    // options 默认值
    options = options || {};

    // 创建 HdmnDiagram 对象
    const hdmnDiagram = new HdmnDiagram({
        // 模块
        modules: [CoreModule, CustomCellModule].concat(options.modules || []),
        // X6 配置
        x6Config: assign({}, viewerConfig, options.x6Config || {}),
    });

    return hdmnDiagram;
}

export default Viewer;

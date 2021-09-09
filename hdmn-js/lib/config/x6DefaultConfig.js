/**
 * 统一存放X6默认配置
 */

/**
 * Viewer 的默认X6配置
 */
const viewerConfig = {
    // 监听容器大小改变, 并自动更新画布大小
    autoResize: true,
    // 画布可以拖动
    panning: {
        enabled: true,
        // 触发画布拖拽的行为 ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
        eventTypes: ["leftMouseDown"],
    },
    // 网格
    grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
    },
    // 背景
    background: {
        color: "#fffbe6", // 设置画布背景颜色
    },
    // 鼠标滚轮缩放
    mousewheel: {
        enabled: true,
        // 需要按住哪个键 不填就是直接滚轮
        modifiers: [],
    },
    // 节点不可拖动
    interacting: false,
};

export { viewerConfig };

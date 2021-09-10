/**
 * 统一存放X6默认配置
 */

/**
 * Viewer 的默认X6配置
 */
const viewerConfig = {
    // 模式
    mode: "viewer",
    // 监听容器大小改变, 并自动更新画布大小
    autoResize: true,
    // 画布可以拖动
    panning: {
        enabled: true,
        // 触发画布拖拽的行为 ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
        eventTypes: ["rightMouseDown"],
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

/**
 * Moduler 的默认X6配置
 */
const modulerConfig = {
    // 模式
    mode: "moduler",
    // 对齐线
    snapline: {
        enabled: true,
    },
    // 撤销/重做
    history: {
        enabled: true,
        // 是否忽略添加
        ignoreAdd: false,
        // 是否忽略删除
        ignoreRemove: false,
        // 是否忽略属性变化
        ignoreChange: false,
    },
    // 剪切板
    clipboard: {
        enabled: true,
        // 被复制的节点/边同时被保存到 localStorage 中
        useLocalStorage: true,
    },
    // 键盘快捷键
    keyboard: {
        enabled: true,
        // 是否为全局键盘事件
        global: false,
    },
    // 点选/框选
    selecting: {
        enabled: true,
        // 多选
        multiple: true,
        // 框选
        rubberband: true,
        // 框选需要完全包围
        strict: true,
        // 框选时需要同时按键 'alt'、'ctrl'、'meta'、'shift'  |或 &同时
        // modifiers: '',
        // 选择节点是否可以被拖动
        movable: true,
        // 显示节点选择框
        showNodeSelectionBox: true,
        // 显示边选择框
        showEdgeSelectionBox: true,
    },
    // 节点是否可以旋转
    rotating: false,
    // 节点平移选项
    translating: {
        // 节点移动时无法超过画布区域
        restrict: true,
    },
    // 节点缩放和平移选项
    transforming: {
        // 创建新组件的时候是否清除页面上存在的其他组件
        clearAll: true,
        // 点击空白区域的时候是否清除组件
        clearOnBlankMouseDown: true,
    },
    // 嵌套节点
    embedding: {
        enabled: false,
    },
    // 连线选项
    connecting: {
        // 自动吸附
        snap: {
            radius: 30,
        },
        // 是否允许连接到空白位置
        allowBlank: false,
        // 是否允许在相同的起始节点和终止之间创建多条边 false 在起始和终止节点之间只允许创建一条边  'withPort' 在起始和终止节点的相同链接桩之间只允许创建一条边
        allowMulti: true,
        // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
        allowLoop: true,
        // 是否允许边链接到另一个边
        allowEdge: true,
        // 是否允许边链接到链接桩
        allowPort: true,
        // 拖动边时，是否高亮显示所有可用的连接桩或节点
        highlight: true,
    },
    // 节点拖动选项
    interacting: {
        // 节点是否可以被移动
        nodeMovable: true,
        // 边是否可以被移动
        edgeMovable: true,
        // 边的起始/终止箭头是否可以被移动。
        arrowheadMovable: true,
        // 边的路径点是否可以被移动
        vertexMovable: true,
        // 是否可以添加边的路径点
        vertexAddable: true,
        // 边的路径点是否可以被删除
        vertexDeletable: true,
    },
};

export { viewerConfig, modulerConfig };

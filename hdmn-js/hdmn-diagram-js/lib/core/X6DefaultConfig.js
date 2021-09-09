/**
 * X6 默认配置
 */
const X6_DEFAULT_CONFIG = {
    /**
     * 必填
     * 类型: HTMLElement
     * 默认值: document.body
     * 描述: 画布的容器。
     */
    container: document.body,
    /**
     * 非必填
     * 类型: number
     * 默认值: undefined
     * 描述: 画布宽度, 默认使用容器宽度。
     */
    // width: undefined,
    /**
     * 非必填
     * 类型: number
     * 默认值: undefined
     * 描述: 画布高度, 默认使用容器高度。
     */
    // height: undefined,
    /**
     * 非必填
     * 类型: boolean | Element | Document
     * 默认值: false
     * 描述: 是否监听容器大小改变, 并自动更新画布大小。默认监听画布容器, 也可以指定监听的元素, 如 Docuemnt。
     */
    // autoResize: false,
    /**
     * 非必填
     * 类型: object
     * 默认值: { enabled: false, eventTypes: ['leftMouseDown'],}
     * 描述: 画布是否可以拖动
     */
    // panning: {
    //     // 是否开启
    //     enabled: false,
    //     // 触发画布拖拽的行为 ['leftMouseDown', 'rightMouseDown', 'mouseWheel']
    //     eventTypes: ["leftMouseDown"],
    // },
    /**
     * 非必填
     * 类型: boolean | number | object
     * 默认值: false
     * 描述: 网格, 默认使用 10px 的网格, 但不绘制网格背景。
     */
    // grid: false,
    /**
     * 非必填
     * 类型: false | object
     * 默认值: false
     * 描述: 背景, 默认不绘制背景。
     */
    // background: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 对齐线, 默认禁用。
     */
    // snapline: false,
    /**
     * 非必填, 类型: boolean | object
     * 默认值: false
     * 描述: 滚动画布, 默认禁用。
     */
    // scroller: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 小地图, 默认禁用。
     */
    // minimap: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 撤销/重做, 默认禁用。
     */
    // history: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 剪切板, 默认禁用。
     */
    // clipboard: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 键盘快捷键, 默认禁用。
     */
    // keyboard: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 鼠标滚轮缩放, 默认禁用。
     */
    // mousewheel: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 点选/框选, 默认禁用。
     */
    // selecting: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 旋转节点, 默认禁用。
     */
    // rotating: false,
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 缩放节点, 默认禁用。
     */
    // resizing: false,
    /**
     * 非必填
     * 类型: object
     * 默认值: {}
     * 描述: 平移节点。
     */
    // translating: {},
    /**
     * 非必填
     * 类型: object
     * 默认值: {}
     * 描述: 平移和缩放节点的基础选项。
     */
    // transforming: {},
    /**
     * 非必填
     * 类型: boolean | object
     * 默认值: false
     * 描述: 嵌套节点, 默认禁用。
     */
    // embedding: false,
    /**
     * 非必填
     * 类型: object
     * 默认值: {}
     * 描述: 连线选项。
     */
    // connecting: {},
    /**
     * 非必填
     * 类型: object
     * 默认值: {}
     * 描述: 高亮选项。
     */
    // highlighting: {},
    /**
     * 非必填
     * 类型: object | function
     * 默认值: { edgeLabelMovable: false }
     * 描述: 定制节点和边的交互行为。
     */
    // interacting: {
    //     edgeLabelMovable: false,
    // },
    /**
     * 非必填
     * 类型: 'none' | 'approx' | 'exact'
     * 默认值: 'exact'
     * 描述: 节点和边视图的排序方式。
     */
    // sorting: "exact",
    /**
     * 非必填
     * 类型: boolean
     * 默认值: false
     * 描述: 是否是异步渲染的画布。
     */
    // async: false,
    /**
     * 非必填
     * 类型: boolean
     * 默认值: false
     * 描述: 异步渲染的画布是否处于冻结状态。
     */
    // frozen: false,
    /**
     * 非必填
     * 类型: function
     * 默认值: -
     * 描述: 返回指定的视图是否应该渲染到 DOM 中。
     */
    // checkView: () => {},
    /**
     * 非必填
     * 类型: number | 'onleave'
     * 默认值: false
     * 描述: 鼠标移动多少次后才触发连线, 或者设置为 'onleave' 时表示鼠标移出元素时才触发连线。
     */
    // magnetThreshold: false,
    /**
     * 非必填
     * 类型: number
     * 默认值: false,
     * 描述: 触发 'mousemove' 事件之前, 允许鼠标移动的次数。
     */
    // moveThreshold: false,
    /**
     * 非必填
     * 类型: number
     * 默认值: false
     * 描述: 当鼠标移动次数超过指定的数字时, 将不触发鼠标点击事件。
     */
    // clickThreshold: false,
    /**
     * 非必填
     * 类型: boolean
     * 默认值: true
     * 描述: 是否禁用浏览器默认右键菜单。
     */
    // preventDefaultContextMenu: true,
    /**
     * 非必填
     * 类型: boolean
     * 默认值: true
     * 描述: 在画布空白位置响应鼠标事件时, 是否禁用鼠标默认行为。
     */
    // preventDefaultBlankAction: true,
    /**
     * 非必填
     * 类型: function
     * 默认值: () => false
     * 描述: 返回是否应该忽略某个鼠标事件, 返回 true 时忽略指定的鼠标事件。
     */
    // guard: () => false,
    /**
     * 非必填
     * 类型: function
     * 默认值: () => true
     * 描述: 返回是否响应框选事件。
     */
    // allowRubberband: () => true,
    /**
     * 非必填
     * 类型: function
     * 默认值: () => true
     * 描述: 返回是否响应画布平移事件。
     */
    // allowPanning: () => true,
    /**
     * 非必填
     * 类型: function
     * 默认值: () => null
     * 描述: 获取节点/边的视图类。
     */
    // getCellView: () => null,
    /**
     * 非必填
     * 类型: function
     * 默认值: undefined
     * 描述: 创建节点/边的视图, 默认自动根据节点和边的 view 选项创建对应的视图。
     */
    // createCellView: undefined,
    /**
     * 非必填, 类型: function
     * 默认值: undefined
     * 描述: 获取 HTML 节点的 HTML 元素
     * 默认根据节点的 html 选项返回对应的 HTML 元素。
     */
    // getHTMLComponent: undefined,
    /**
     * 非必填
     * 类型: function
     * 默认值: undefined
     * 描述: 当某个链接桩渲染完成时触发的回调。
     */
    // onPortRendered: undefined,
    /**
     * 非必填
     * 类型: function
     * 默认值: undefined
     * 描述: 当边的文本标签渲染完成时触发的回调。
     */
    // onEdgeLabelRendered: undefined,
    /**
     * 非必填
     * 类型: function
     * 默认值: undefined
     * 描述: 当工具项渲染完成时触发的回调。
     */
    // onToolItemCreated: undefined,
    /**
     * 非必填
     * 类型: Model
     * 默认值: undefined
     * 描述: 画布对应的模型
     * 默认创建一个新模型。
     */
    // model: undefined,
};

export default X6_DEFAULT_CONFIG;

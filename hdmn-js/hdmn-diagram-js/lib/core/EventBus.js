import { isArray, isNumber, isUndefined, bind, assign } from "@hdmn-diagram-node/min-dash"; // 这里使用了 bpmn-io 的一些实用的小工具

// 默认优先级 1000
const DEFAULT_PRIORITY = 1000;

// 干嘛用的 因为我们有 once 方法，once方法会对原始的 callback 进行包装（当然，on 方法也可能修改 callback 的 this 变成新的 function），这就会变成一个新的 function，
// 这样如果用户手动调用 off 则无法取消订阅 所以需要一个记录原始 callback 的地方，我们就在 实际注册的callback 中记录 这个属性就定义为 __fn
const FN_REF = "__fn";

/**
 * EventBus 的不简单实现 为什么是不简单实现呢 因为前端代码级的EventBus本身就不难 但不是最简单的实现方式 加入了优先级、阻止事件传播等 所以是不简单实现
 * Map存事件 Key Value 结构 每个事件可以有多个订阅者 按优先级排序 使用链表存储
 * on 订阅事件
 * once 订阅事件（只执行一次，执行完事件就会取消订阅）
 * off 取消订阅事件
 * emit 发布事件
 */
function EventBus() {
    // 事件队列 用于存放事件 其实就是个Map 用Key Value存放事件 Key是事件名称 Value是Listener(s)
    this._eventQueue = {};

    // 订阅销毁的事件 并且是最低优先级 这样本身的销毁会最后执行 别的地方订阅的销毁事件会先执行（除非你设置了和我一样甚至更小的优先级）
    this.on("x6.destroy", this._destroy, this, 1);
}

/**
 * 清空 EventBus
 */
EventBus.prototype._destroy = function () {
    this._eventQueue = {};
};

/**
 * 根据事件名称获取 Listener （链表头）
 * @param {string} event 事件名称
 * @returns {Object} Listener
 */
EventBus.prototype._getListener = function (event) {
    return this._eventQueue[event];
};

/**
 * 设置事件的 Listener
 * @param {string} event 事件名称
 * @param {Object} listener Listener
 */
EventBus.prototype._setListener = function (event, listener) {
    this._eventQueue[event] = listener;
};

/**
 * 创建一个 Listener （链表的单一节点）
 * @param {Function} callback 回调函数
 * @param {number} priority 优先级
 * @param {Object} next Listener Listeners的数据结构是单向链表 所以节点要有next属性
 * @returns
 */
EventBus.prototype._createListener = function (callback, priority, next) {
    return {
        callback: callback,
        priority: priority,
        next: next,
    };
};

/**
 * 入队操作不止是设置Map 主要是根据优先级向Listeners链表中插入节点
 * @param {string} event 事件名称
 * @param {Object} newListener Listener
 */
EventBus.prototype._enqueue = function (event, newListener) {
    // 获取现有 listener （链表头）
    let listener = this._getListener(event);
    // 存放前一个节点
    let prevListener = null;

    // 无事件直接设置就好
    if (!listener) {
        this._setListener(event, newListener);
        return;
    }

    // 遍历链表 懂得都懂 不懂的去看看数据结构
    while (listener) {
        // 对比优先级 当前链表节点的优先级要是 小于 新节点的优先级
        if (listener.priority < newListener.priority) {
            // 把新节点插入到当前节点的前面
            newListener.next = listener;

            // 如果存在前一个节点则连到新节点
            if (prevListener) {
                prevListener.next = newListener;
            } else {
                // 如果没有前一个节点 说明新节点就是第一个节点 也就是新的链表头
                this._setListener(event, newListener);
            }

            return;
        }

        // 记录前一个节点
        prevListener = listener;
        // 向下遍历
        listener = listener.next;
    }

    // 如果程序运行到这里 这说明什么 说明没有比新节点优先级更小的优先级的节点了（最次是相同优先级，相同优先级就得先来后到了，后来的放后面）
    // 所以新的节点放最后面（这个时候 listener 已经是 null 了，所以 prevListener 是最后一个节点）
    prevListener.next = newListener;
};

/**
 * 出队操作 不传 callback 直接设置Map对应key为null即可 传了就是从链表中删除节点的操作
 * @param {string} event 事件名称
 * @param {Function} callback 回调函数
 */
EventBus.prototype._dequeue = function (event, callback) {
    // 获取现有 listener （链表头）
    let listener = this._getListener(event);
    // 存放前一个节点
    let prevListener = null;

    // 如果没传回调函数 则清空所有的 Listener
    if (!callback) {
        this._setListener(event, null);
        return;
    }

    // 遍历链表 懂得都懂 不懂的去看看数据结构
    while (listener) {
        // 如果当前节点就是要移除的节点
        if (listener.callback === callback || listener.callback[FN_REF] === callback) {
            // 如果存在前一个节点
            if (prevListener) {
                // 把前一个节点连接到下一个节点 即移除当前节点
                prevListener.next = listener.next;
            } else {
                // 如果不存在前一个节点 说明当前节点是链表头 移除当前节点 那么下一个节点就是新的链表头
                this._setListener(event, listener.next);
            }
        }

        // 记录前一个节点
        prevListener = listener;
        // 向下遍历
        listener = listener.next;
    }
};

/**
 * 调用一套 Listener
 * @param {Event} event 事件
 * @param {Array} args 参数
 * @param {Object} listener Listener
 * @returns 回调函数的返回值 当然了 如果很多人都订阅了这个事件 那么就得小心了 其中一个人的回调函数 return 之后 就不会调用其它订阅者的回调函数了
 */
EventBus.prototype._invokeListener = function (event, args, listener) {
    // 定义一个返回值
    let returnValue = undefined;

    // 遍历链表 懂得都懂 不懂的去看看数据结构
    while (listener) {
        // 判断是否停止传播
        if (event.cancelPropagation) {
            break;
        }

        // 不是已经被执行过的 once 订阅的事件 才能调用
        if (!listener.callback.__isOnce) {
            try {
                // 调用回调函数
                returnValue = invokeFunction(listener.callback, args);

                // 如果回调函数给出了返回值
                if (!isUndefined(returnValue)) {
                    // 赋值给 event
                    event.returnValue = returnValue;
                    // 停止继续传播
                    event.stopPropagation();
                }

                // 如果返回值真的是false 即 回调函数 return false 阻止默认行为
                if (returnValue === false) {
                    event.preventDefault();
                }
            } catch (error) {
                // 打印错误信息
                console.error("EventBus：调用回调函数错误", error);

                throw error;
            }
        }

        // 向下遍历
        listener = listener.next;
    }

    return returnValue;
};

/**
 * 订阅事件
 * @param {string|Array<string>} events 事件名称
 * @param {Function} callback 回调函数
 * @param {Object} that callback 的 this
 * @param {number} priority 优先级
 */
EventBus.prototype.on = function (events, callback, that, priority) {
    // 判断传过来的事件是不是数组
    events = isArray(events) ? events : [events];

    // 判断优先级是否是一个数字
    if (!isUndefined(priority) && !isNumber(priority)) {
        console.warn("EventBus：优先级必须是一个数字！");
    }

    // 如果未传值优先级 则是默认的优先级
    if (isUndefined(priority)) {
        priority = DEFAULT_PRIORITY;
    }

    // 定义真实的回调函数（当 that 传值了的时候需要对 callback 的 this 进行修改）
    let actualCallback = callback;

    if (that) {
        // 修改 callback 的 this
        actualCallback = bind(callback, that);

        // 记录原始的 callback 确保 off 可以取消订阅
        actualCallback[FN_REF] = callback[FN_REF] || callback;
    }

    // 事件入队
    events.forEach((event) => {
        // 创建 Listener 节点
        const listener = this._createListener(actualCallback, priority, null);
        // 入队
        this._enqueue(event, listener);
    });
};

/**
 * 取消订阅事件
 * @param {string|Array<string>} events 事件名称
 * @param {Function} callback 回调函数
 */
EventBus.prototype.off = function (events, callback) {
    // 判断传过来的事件是不是数组
    events = isArray(events) ? events : [events];

    // 事件出队
    events.forEach((event) => {
        this._dequeue(event, callback);
    });
};

/**
 * 订阅事件（只执行一次，执行完事件就会取消订阅）
 * @param {string} event 事件名称
 * @param {Function} callback 回调函数
 * @param {Object} that callback 的 this
 * @param {number} priority 优先级
 */
EventBus.prototype.once = function (event, callback, that, priority) {
    // 判断优先级是否是一个数字
    if (!isUndefined(priority) && !isNumber(priority)) {
        console.warn("EventBus：优先级必须是一个数字！");
    }

    // 如果未传值优先级 则是默认的优先级
    if (isUndefined(priority)) {
        priority = DEFAULT_PRIORITY;
    }

    // 为了在 function 中使用 this
    const self = this;

    // 对回调函数进行包装（执行完取消订阅）
    // 用 function 定义 不用箭头函数 因为需要使用 arguments
    function wrappedCallback() {
        // 记录一下已经被执行过了 避免重复执行
        wrappedCallback.__isOnce = true;

        // 用指定的 this 执行 callback
        const result = callback.apply(that, arguments);

        // 取消订阅
        self.off(event, wrappedCallback);

        // 返回结果
        return result;
    }

    // 记录原始的 callback 确保 off 可以取消订阅
    wrappedCallback[FN_REF] = callback[FN_REF] || callback;

    // 订阅事件
    this.on(event, wrappedCallback, null, priority);
};

/**
 * 发布事件
 * 所谓发布事件，就是执行队列中对应事件名称的回调函数，直白来说就是执行回调函数
 * 只不过回调函数都在队列中，避免了回调地狱
 * 既然要执行回调函数，那么肯定需要传值，那么传什么值呢
 * 这里我们规定第一个值必须是我们的 Event，之后才是真正的参数
 * @param {string} type 事件的名称
 * @param {..args} arguments 传递的参数，不定参数，代表从这里开始传递参数
 * @returns
 */
EventBus.prototype.emit = function (type) {
    // 创建一个 arguments 的拷贝 这样一来 第一个参数是 事件的名称 然后是传递的参数 接下来我们只需要把第一个参数 换成我们的 Event 即可
    const args = Array.prototype.slice.call(arguments);

    // 获取 Listener
    let listener = this._getListener(type);

    // 如果指定的事件名称不存在就不用向下执行了
    if (!listener) {
        return;
    }

    // 创建事件
    const event = this.createEvent({
        type: type
    });

    // 第一个参数换成我们的 Event
    args[0] = event;

    // 调用一套 Listener 并获取回调函数的返回值
    let returnValue = this._invokeListener(event, args, listener);

    // 如果回调函数没有返回值 但是事件被取消了默认行为 那么返回值应该是 false
    if (isUndefined(returnValue) && event.cancelDefault) {
        returnValue = false;
    }

    return returnValue;
};

/**
 * 创建一个事件
 * @param {Object} data 数据
 * @returns {Event} 创建的 Event 对象
 */
EventBus.prototype.createEvent = function (data) {
    // new 一个 Event
    const event = new Event();
    // 初始化事件
    event.init(data);
    // 返回创建的事件
    return event;
};

/**
 * 事件
 */
function Event() {}

/**
 * 事件 取消传播
 */
Event.prototype.stopPropagation = function () {
    this.cancelPropagation = true;
};

/**
 * 事件 阻止默认行为 当回调函数 return false 的时候阻止默认行为
 */
Event.prototype.preventDefault = function () {
    this.cancelDefault = true;
};

/**
 * 初始化一个事件
 * @param {Object} data 数据
 */
Event.prototype.init = function (data) {
    // 将data中的属性全都放进this，相同的值覆盖
    assign(this, data || {});
};

/**
 * 调用一个函数
 * @param {Function} fn 要调用的函数
 * @param {Object} args 需要传的参数
 * @returns 函数的返回值
 */
const invokeFunction = (fn, args) => {
    return fn.apply(null, args);
};

// 导出 EventBus
export default EventBus;

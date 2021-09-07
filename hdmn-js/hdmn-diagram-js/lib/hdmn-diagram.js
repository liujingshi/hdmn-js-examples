import "@hdmn-diagram/assets/hdmn-diagram.less";
import { Injector } from "didi";
import CoreModule from "./core"; // 导入Core模块 当然我肯定不止一个Core模块

/**
 * 创建 Injector
 * @param {Object} options 
 * @returns {didi.Injector}
 */
const createInjector = (options) => {
    // 为空要有默认值
    options = options || {};

    // 配置模块 存储 options 里的配置 然后就在哪都能访问了
    const ConfigModule = {
        config: ['value', options]
    }

    // 把所有的模块合在一起（CoreModule和自定义的模块）
    const concatModules = [ConfigModule, CoreModule].concat(options.modules || []);

    ///////////////////
    // 接下来需要递归遍历 concatModules 全部加入 modules 把里面所有的 __extend__ 也全部加入 modules 并且调用所有的 __init__
    ///////////////////

    // 用于存放所有的模块
    const modules = [];
    // 用于存放所有的 __init__
    const constructors = [];

    // 判断 modules 是否已经包含该模块
    const hasModule = (module) => {
        return modules.indexOf(module) >= 0;
    };

    // 向 modules 添加模块
    const addModule = (module) => {
        // 判断 是否已经包含该模块 没有就添加并返回true否则返回false
        if (hasModule(module)) {
            return false;
        } else {
            modules.push(module);
            return true;
        }
    };

    // 遍历的操作 为啥单独写个方法 因为要递归
    const visit = (module) => {
        // 开始递归 __extend__
        (module.__extend__ || []).forEach(visit);

        // 如果成功添加则收集他的 __init__
        if (addModule(module)) {
            (module.__init__ || []).forEach((constructor) => {
                constructors.push(constructor);
            });
        }
    };

    // 开始遍历
    concatModules.forEach(visit);

    // 创建 Injector
    const injector = new Injector(modules);

    // 执行全部的 __init__
    constructors.forEach((constructor) => {
        try {
            // 根据其类型判断是使用 get 还是 invoke
            injector[typeof constructor === "string" ? "get" : "invoke"](constructor);
        } catch (e) {
            console.error(
                "执行__init__失败！",
                typeof constructor === "string" ? constructor : constructor.name || constructor.toString().match(/function\s*([^(]*)\(/)[1]
            );
            console.error(e.stack);
            throw e;
        }
    });

    return injector;
};

/**
 * 初始化 hdmn-diagram-js
 * @param {Object} options 参数
 * @param {Array<didi.Module>} [options.modules] 额外的自定义模块
 * @param {didi.Injector} [injector] 手动创建的Injector ※：如果使用自己创建的Injector需要自定义的模块extend我们的CoreModule
 */
const HdmnDiagram = function (options, injector) {
    // 创建Injector
    this.injector = injector = injector || createInjector(options);

    // 我也有get
    this.get = injector.get;

    // 我也有invoke
    this.invoke = injector.invoke;
};

// 导出 别人 import 之后 new
export default HdmnDiagram;

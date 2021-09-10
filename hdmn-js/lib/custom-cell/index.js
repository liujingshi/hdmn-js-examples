import MyCustomNode from "./custom-node/my-custom-node";
import CustomSwitch from "./custom-node/custom-switch";
import MyCustomEdge from "./custom-dege/my-custom-edge";

const customCells = [
    MyCustomNode,
    CustomSwitch,
    MyCustomEdge,
]

export default {
    customCells: ["value", customCells],
    MyCustomNode: ["type", MyCustomNode],
    CustomSwitch: ["type", CustomSwitch],
    MyCustomEdge: ["type", MyCustomEdge],
}

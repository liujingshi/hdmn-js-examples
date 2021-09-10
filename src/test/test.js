import { Viewer } from "@hdmn/lib/hdmn";
import CustomCellMudule from "../custom-cell";

const main = () => {
    const viewer = new Viewer({
        modules: [CustomCellMudule],
        x6Config: {
            container: document.getElementById("hdmn_app"),
        },
    });

    const customSwitchInstance = viewer.get("CustomSwitch");
    const node1 = customSwitchInstance.create("custom-switch-1", 500, 100);
    const node2 = customSwitchInstance.create("custom-switch-2", 500, 500);
    const myCustomEdgeInstance = viewer.get("MyCustomEdge");
    myCustomEdgeInstance.create("my-custom-edge-1", node1, node2);
};

export default {
    main: main,
};

import { Moduler } from "@hdmn/lib/hdmn";
import CustomCellMudule from "../custom-cell";

const main = () => {
    const moduler = new Moduler({
        modules: [CustomCellMudule],
        x6Config: {
            container: document.getElementById("hdmn_app"),
        },
    });

    const customSwitchInstance = moduler.get("CustomSwitch");
    const node1 = customSwitchInstance.create("custom-switch-1", 500, 100);
    const node2 = customSwitchInstance.create("custom-switch-2", 500, 500);
    const myCustomEdgeInstance = moduler.get("MyCustomEdge");
    myCustomEdgeInstance.create("my-custom-edge-1", node1, node2);
};

export default {
    main: main,
};

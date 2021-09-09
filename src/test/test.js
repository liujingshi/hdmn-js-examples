import { Viewer } from "@hdmn/lib/hdmn";
import CustomCellMudule from "../custom-cell";

const main = () => {
    const viewer = new Viewer({
        modules: [CustomCellMudule],
        x6Config: {
            container: document.getElementById("hdmn_app"),
        },
    });

    const myCustomNodeInstance = viewer.get("MyCustomNode");
    myCustomNodeInstance.create("my-custom-node-1", 100, 100);
    const myNodeInstance = viewer.get("MyNode");
    myNodeInstance.create("my-node-1", 500, 500);
};

export default {
    main: main,
};

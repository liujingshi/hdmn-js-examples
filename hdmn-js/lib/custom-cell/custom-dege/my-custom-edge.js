import { Edge } from "@hdmn-diagram/lib/hdmn-diagram";

class MyCustomEdge extends Edge {
    constructor(eventBus) {
        super(eventBus);
        this.shape = "my-custom-edge";
        this.connector = {
            name: "smooth",
        };
        this.attrs = {
            line: {
                stroke: "#1890ff",
                strokeDasharray: 5,
                targetMarker: "classic",
                style: {
                    animation: "ant-line 30s infinite linear",
                },
            },
        };
    }
}

MyCustomEdge.$inject = ["eventBus"];

export default MyCustomEdge;

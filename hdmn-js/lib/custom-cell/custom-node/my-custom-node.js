import { Node } from "@hdmn-diagram/lib/hdmn-diagram";

class MyCustomNode extends Node {
    constructor(eventBus) {
        super(eventBus);
        this.shape = "my-custom-node";
        this.width = 100;
        this.height = 30;
        this.markup = [
            {
                tagName: "text",
                selector: "label",
            },
            {
                tagName: "rect",
                selector: "line",
            },
        ];
        this.attrs = {
            label: {
                refX: -15,
                refY: 4,
                fill: "#D0D0D0",
                fontSize: 14,
                "text-anchor": "end",
            },
            line: {
                width: 100,
                height: 10,
                x: -50,
                y: 20,
                fill: "#b30461",
                stroke: "transparent",
            },
        };
    }
}

MyCustomNode.$inject = [ "eventBus" ];

export default MyCustomNode;

import HdmnDiagram from "@hdmn-diagram/lib/hdmn-diagram";

const hello = (event, a, b, c, d, e) => {
    console.log(event);
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);
    console.log(e);
};

const test = () => {
    const hdmnDiagram = new HdmnDiagram({
        container: document.getElementById("hdmn_app"),
    });
    console.log("配置", hdmnDiagram.get("config"));

    const eventBus = hdmnDiagram.get("eventBus");
    eventBus.on("hdmn.hello", hello);

    eventBus.emit("hdmn.hello", 1, 2, 3, 4, 5);
};

export default {
    test: test,
};

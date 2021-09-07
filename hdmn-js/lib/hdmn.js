
import HdmnDiagram from '@hdmn-diagram/lib/hdmn-diagram';

const test = () => {
    const hdmnDiagram = new HdmnDiagram({
        container: document.getElementById("hdmn_app")
    });
    console.log(hdmnDiagram.get("config"))
}

export default {
    test: test
}

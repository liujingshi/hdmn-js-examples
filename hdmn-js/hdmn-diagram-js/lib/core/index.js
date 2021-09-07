
const Draw = () => {
    return {
        start: () => {
            alert("I draw!");
        }
    }
}

export default {
    __init__: ['draw'],
    draw: ['type', Draw]
}

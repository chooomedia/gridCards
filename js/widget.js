class Widget {
    constructor(parentContainerId) {
        this.domElement = document.createElement("div");

        if (typeof parentContainerId !== "string") {
            return;
        }
        let parentContainer = document.getElementById(parentContainerId);
        if (!parentContainer) {
            return;
        }
        parentContainer.appendChild(this.domElement);
    }

}
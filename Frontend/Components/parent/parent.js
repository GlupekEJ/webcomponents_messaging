//#region IMPORTS
import "../childA/childA.js";
import "../childB/childB.js";
//#endregion IMPORTS

//#region TEMPLATE
let parent_template = document.createElement("template");
parent_template.innerHTML = /*html*/ `
  <style>@import './Components/parent/style.css';</style>
  <div class="parent">
  <h2>Parent</h2>
    <div class="parent-to-child">Parent to Child</div>
    <div class="dungeon">
    <child-a-ɠ></child-a-ɠ>
    <child-b-ɠ></child-b-ɠ>
    </div>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "parent-ɠ",
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot= this.attachShadow({ mode: "open" })
      this._shadowRoot.appendChild(parent_template.content.cloneNode(true));
      this.$parentButton = this._shadowRoot.querySelector(".parent-to-child");

    }

    connectedCallback() {
      const childA = this.shadowRoot.querySelector("child-a-ɠ");
      const childB = this.shadowRoot.querySelector("child-b-ɠ");

      // Parent-to-Child
      setTimeout(() => {
        childA.setMessage("🥸Hello from Parent🥸");
      }, 2000);

      // ChildA-to-ChildB via Parent
      childA.addEventListener("message-from-a", (e) => {
        const msg = e.detail;
        childB.receiveFromA(msg);
      });
       this.$parentButton.addEventListener("click", () => {
        console.log("clicked");
           document.dispatchEvent(
  new CustomEvent("parent-sent", {
    bubbles: true,
    composed: true,
    detail: "😫Welcome from Erik!😒▶️🙈◀️"
  })
);
       })
      
      this.addEventListener("message-from-a", (e) => {
        const msg = e.detail;
        const messageReceived = document.createElement("p");
        messageReceived.textContent = "Parent received from A going to B: " + msg;
        this.shadowRoot.querySelector(".parent").appendChild(messageReceived);
      });

      this.addEventListener("b-input-changed", (e) => {
        document.dispatchEvent(
          new CustomEvent("parent-to-a", {
            bubbles: true,
            composed: true,
            detail: e.detail,
          })
        );
      });
    }
  }
);
//#endregion CLASS

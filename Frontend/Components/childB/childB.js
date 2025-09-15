//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
let childb_template = document.createElement("template");
childb_template.innerHTML = /*html*/ `
  <style>@import './Components/childB/style.css';</style>
  <div class="child-b">
  <h2>Child B</h2>
    <p id="received">Child B</p>
    <p class="fromParent">Give me a message!!</p>
     <input type="text" placeholder="Type something..." />
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "child-b-ɠ",
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot= this.attachShadow({ mode: "open" })
      this._shadowRoot.appendChild(childb_template.content.cloneNode(true));
      this.$fromParent = this._shadowRoot.querySelector(".fromParent");
      this.$received = this._shadowRoot.querySelector("#received");
      this.$input = this._shadowRoot.querySelector("input");
    }
    
    receiveFromA(msg) {
      this.$received.textContent = "Got from A: " + msg;
    }

    connectedCallback() {
         document.addEventListener("parent-sent", (e) => {
            console.log("received from parent",e.detail);
         this.$fromParent.textContent = e.detail;

     })
     // this will fire every time the input changes
     this.$input.addEventListener("input", () => {
      
        this.dispatchEvent(
          new CustomEvent("b-input-changed", {
            bubbles: true,
            composed: true,
            detail: this.$input.value,
          })
        );
      });
    }
  }
);
//#endregion CLASS

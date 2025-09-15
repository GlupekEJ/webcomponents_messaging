//#region IMPORTS
//#endregion IMPORTS

//#region TEMPLATE
let childa_template = document.createElement("template");
childa_template.innerHTML = /*html*/ `
  <style>@import './Components/childA/style.css';</style>
  <div class="child-a">
    <h2>Child A</h2>
    <p id="msg">Child A</p>
    <div id="send">Send to B</div>
     <p>Message from B:</p>
    <span class="message"></span>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "child-a-ɠ",
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot= this.attachShadow({ mode: "open" })
      this._shadowRoot.appendChild(childa_template.content.cloneNode(true));
      this.$msg = this._shadowRoot.querySelector("#msg");
      this.$send = this._shadowRoot.querySelector("#send");
      this.$message = this._shadowRoot.querySelector(".message");
    }

    connectedCallback() {
      this.$send.addEventListener("click", () => {
        const event = new CustomEvent("message-from-a", {
          bubbles: true,
          composed: true,
          detail: "Hi B, from A!",
        });
        this.dispatchEvent(event);
      });

      document.addEventListener("parent-to-a", (e) => {
        this.$message.textContent = e.detail;
      });
    }

    setMessage(msg) {
      this.$msg.textContent = msg;
    }
  }
);
//#endregion CLASS

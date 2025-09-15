//#region IMPORTS

//#region IMPORTS
import "../parent/parent.js";
//#endregion IMPORTS

//#region TEMPLATE
let template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>@import './Components/appComponent/style.css';</style>
  <div>
  <parent-ɠ></parent-ɠ>
  </div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "app-ɠ",
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" }).appendChild(template.content.cloneNode(true));
    }
  }
);
//#endregion CLASS

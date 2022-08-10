export class AdimoComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const style = new CSSStyleSheet();
    const template = document.createElement("template");
    debugger;
    const html = "<div>test</div>"
    template.innerHTML = html;
    if (this.shadowRoot != null) {
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

  }
}
export class AdimoComponent extends HTMLElement {

  constructor() {

    super();
    this.attachShadow({ mode: "open" });
    var script = document.createElement('script')
    script.setAttribute(
      'src',
      'http://127.0.0.1:5500/' + this.id + '-adimo-touchpoint.js',
    );

    const template = document.createElement("template");
    fetch("./" + this.id + "-adimo-touchpoint.html").then((res) =>
      res.text().then((html) => {
        template.innerHTML = html;
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(script);

      })
    );
  }


}

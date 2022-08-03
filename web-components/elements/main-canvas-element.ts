import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ElementProperty } from 'src/web-components/elements/element-properties';
import * as myGlobals from 'src/web-components/elements/global';
import * as fs from "fs";

@customElement('main-canvas-component')
export class MainCanvasComponent extends LitElement {

  elementProperties: ElementProperty[] = [];
  @property({ type: Number })
  count = 0;



  edit(event: Event) {
    const element = (event as CustomEvent<ElementProperty>).detail;
    console.log('Edit element', element);
  }

  static override styles = css`
  :host {
    display: block;
    border: solid 1px gray;
    padding: 16px;
    max-width: 800px;
    min-height:400px;
    min-width:500px;
  }
`;
  // @state is a reactive property. This makes `this.templates`
  // schedule an efficient update when it is assigned to different values.
  // See: https://lit.dev/docs/components/properties/#internal-reactive-state
  @state()
  templates: TemplateResult[] = []

  @state()
  element: ElementProperty = { elementId: this.count++, displayText: "Buy It Now", alignment: "center", elementType: "adimo-label" }



  override render() {
    return html`
         <div id="custom-el-container" style="height:800px;"  @dragover=${(e: DragEvent) => this._allowDrop('dragover', e)} @drop=${(e: DragEvent) => this._onDrop('ondrop', e)} >
        
         ${this.templates}
         </div>

         <br>
         <div>
         <button id="btn_export" part="button" @click="${this.exportComponent}">
        Export
    </button>
          </div>
          <properties-element ._element=${this.element}></properties-element>
      `;
  }

  private _onDrop(eventType: string, ev: DragEvent) {
    console.log('onDROP: ' + eventType);
    ev.preventDefault();
    const id = ev.dataTransfer?.getData('text');
    if (id === "buttonElm") {
      this.appendNewCustomEl2();
    }

    if (id === "labelElm") {
      this.appendNewCustomEl();
    }
  }

  private _allowDrop(eventType: string, ev: DragEvent) {
    ev.preventDefault();
    console.log("allow drop" + eventType + ' : ' + JSON.stringify(ev));
  }


  private _onClick(e: { target: any; } | null) {
    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<HTMLInputElement>("selectItem", { detail: e.target }));
    }

  }

  appendNewCustomEl() {
    const templateToAppend = html`
        <adimo-label>
           some other things added here
        </adimo-label>
      `;
    this.templates = [...this.templates, templateToAppend];

    var newElement = { elementId: this.count++, displayText: "Buy It Now", alignment: "center", elementType: "adimo-label" }
    this.elementProperties.push(newElement);
    console.log(this.elementProperties);

  }

  appendNewCustomEl2() {
    const templateToAppend = html`
    <button id="adimo-button-${ElementStats.btnCount++}" draggable="true" @click=${this._onClick}>Button One</button>`;
    this.templates = [...this.templates, templateToAppend];
    var newElement = { elementId: this.count++, displayText: "New Label", alignment: "center", elementType: "adimo-button" }
    this.elementProperties.push(newElement);
    console.log(this.elementProperties);
  }



  private exportComponent() {
    debugger;
    var temp = this.outerHTML;
    var id = document.getElementById("custom-el-container")?.outerHTML;

    const element = document.getElementsByTagName("main-canvas-component")[0];
    console.log(element.renderRoot.innerHTML);
    var data = { htmlCanvas: element.renderRoot.innerHTML };
    const response = fetch("https://localhost:7004/createTemplate", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });



  }

}

declare global {
  interface HTMLElementTagNameMap {
    'main-canvas-component': MainCanvasComponent;
    'adimo-label': AdimoLabel;
    'adimo-button': AdimoButton;
  }
}


// For the example

@customElement('adimo-label')
class AdimoLabel extends LitElement {



  @property()
  name = 'Label' + ElementStats.labelCount;

  override render() { return html`<label id="adimo-button-${ElementStats.labelCount++}"  draggable="true" onclick="alert('test');">${this.name}</label>`; }

}


@customElement('adimo-button')
class AdimoButton extends LitElement {

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'Button' + ElementStats.btnCount;

  @property({ type: Number })
  count = 1;


  override render() { return html`<button id="adimo-button-${ElementStats.btnCount++}" draggable="true"  @click=${this._onClick}>${this.name}</button>`; }


  private _onClick(e: { target: any; } | null) {
    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<HTMLInputElement>("selectItem", { detail: e.target }));
    }

  }

}

export abstract class ElementStats {
  public static labelCount = 1;
  public static btnCount = 1;
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('button-element')
export class ButtonElement extends LitElement {


  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

  override render() {
    return html`<div id="div1"  @dragover=${(e: DragEvent) => this._allowDrop('dragover', e)}>
       <button  id="buttonElm"  part="button" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart', e)}>
         Button Elements
       </button>
       </div>

       <br>
     `;
  }




  private _onDrag(eventType: string, ev: DragEvent) {
    ev.dataTransfer?.setData("text", (<HTMLDivElement>ev.target).id);
    console.log("start of drag" + eventType + ' : ' + JSON.stringify(ev));
  }
  private _allowDrop(eventType: string, ev: DragEvent) {
    ev.preventDefault();
    console.log("allow drop" + eventType + ' : ' + JSON.stringify(ev));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'button-element': ButtonElement;
  }
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import {LitElement, html} from 'lit';
 import {customElement, property} from 'lit/decorators.js';
 
 /**
  * An example element.
  *
  * @fires count-changed - Indicates when the count changes
  * @slot - This element has a slot
  * @csspart label - The label
  */
 @customElement('label-element')
 export class LabelElement extends LitElement {
  
 
  
   @property()
   display = 'World';
 

 
   override render() {
     return html`
       <button  id="labelElm" @click=${this._onClick} part="label" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart',e)}>
         Label Elements
   </button>
   

       <br>
       <slot></slot>
     `;
   }
 
   private _onClick() {
     this.dispatchEvent(new CustomEvent('count-changed'));
   }
 

  private _onDrag(eventType: string, ev: DragEvent){
    ev.dataTransfer?.setData("text", (<HTMLDivElement>ev.target).id);
      console.log("start of drag" + eventType + ' : '+JSON.stringify(ev));
  }

 }
 
 declare global {
   interface HTMLElementTagNameMap {
     'label-element': LabelElement;
   }
 }
 
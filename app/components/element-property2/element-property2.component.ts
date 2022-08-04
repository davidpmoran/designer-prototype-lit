import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'corp-element-property2',
  templateUrl: './element-property2.component.html',
  styleUrls: ['./element-property2.component.css']
})
export class ElementProperty2Component implements AfterViewInit {
  public currentElement!: HTMLInputElement;

  constructor() {
    let temp: HTMLInputElement = this.currentElement;


  }
  ngAfterViewInit() {
    const inputTag = document.getElementById('buttonElm2') as HTMLInputElement;

    this.currentElement = inputTag;
  }
  ngOnInit() {
    let temp: HTMLInputElement = this.currentElement;


    document.addEventListener("selectItem", (evt) => this.setElement(evt));
  }

  setElement(evt: Event) {
    console.log("Whoop two!");
    let el: HTMLInputElement = <HTMLInputElement>(<CustomEvent>evt).detail;
    console.log('working' + JSON.stringify(el));
    this.currentElement = el;
  }

  applyChanges() {
    const input = document.getElementById('input_BtnCTA') as HTMLInputElement | null;
    const onclick = document.getElementById('input_OnClick') as HTMLInputElement | null;
    const styleInput = document.getElementById('input_CSS') as HTMLInputElement | null;
    const value = input?.value as string;
    const onclickValue = onclick?.value as string;
    const style = styleInput?.value as string;
    this.currentElement.innerText = value;
    debugger;
    var x = onclickValue;

    this.currentElement.onclick = (e: Event) => new Function(x)();
    this.currentElement.setAttribute('style', style);
  }

  exportComponent() {
    const element = document.getElementsByTagName("main-canvas-component")[0];
    debugger;
    const canvasString = element.renderRoot.innerHTML.replace('id="custom-el-container" style="height:800px;"', 'id="custom-el-container"');
    element.renderRoot.children[0].removeAttribute("style");
    debugger;
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

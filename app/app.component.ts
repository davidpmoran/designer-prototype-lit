import { Component } from '@angular/core';
import { ElementProperty } from 'src/web-components/elements/element-properties';
import { ButtonElement } from 'src/web-components/elements/button-element';
import { CanvasElement } from 'src/web-components/elements/canvas-element';
import { LabelElement } from 'src/web-components/elements/label-element';
import { MainCanvasComponent } from 'src/web-components/elements/main-canvas-element';
import { PropertiesElement } from 'src/web-components/elements/properties-element';

import '../web-components/elements/button-element';
import '../web-components/elements/canvas-element';
import '../web-components/elements/label-element';
import '../web-components/elements/main-canvas-element';
import '../web-components/elements/properties-element';


@Component({
  selector: 'corp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  parentItem: HTMLInputElement;

  elementPropertiesAppComponent: ElementProperty[] = [
    {
      elementId: 0,
      displayText: "Buy It Now",
      alignment: "center",
      elementType: "adimo-button"
    },
    {
      elementId: 1,
      displayText: "Buy It Now",
      alignment: "left",
      elementType: "adimo-label"
    },
  ];

  edit(event: Event) {
    const element = (event as CustomEvent<ElementProperty>).detail;
    console.log('Edit element', element);
  }
}

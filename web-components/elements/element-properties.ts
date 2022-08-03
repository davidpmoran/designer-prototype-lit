export class  ElementProperty {

  public elementId: number;
  public displayText: string;   
  public alignment: string; 
  public elementType:string;  
  constructor(elementId: number, displayText: string,alignment: string,elementType:string) {
      this.elementId = elementId;
      this.displayText=displayText;
      this.alignment=alignment;
      this.elementType=elementType;
  }

}

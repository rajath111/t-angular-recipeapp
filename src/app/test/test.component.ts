import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <h1>Hello World</h1>
    // If and else demo
    <h2 *ngIf="showName; then show; else hide;">{{name}}</h2>


    <ng-template #show>
      <h2>The name is {{name}}</h2>
    </ng-template>
    <ng-template #hide>
      <h2>Sorry, You cannot view the name</h2>
    </ng-template>

    // Switch demo
    <div [ngSwitch]="color" [style.color]="color">
      <h1 *ngSwitchCase="'red'">The color is red</h1>
      <h1 *ngSwitchCase="'orange'">The color is orange</h1>
      <h1 *ngSwitchCase="'yellow'">The color is yellow</h1>
      <h1 *ngSwitchDefault>Choose again if you want, Default is blue</h1>
    </div>
    
    // for loop demo
    <div *ngFor="let color1 of colors; index as i; first as f">
      <div [ngStyle] = "{'color' : getColor(i)}">
      {{i+1}} {{color1}} {{f}}
      </div>
    </div>


  `,
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public name = "Rajath";
  public age = 22;
  public showName = false;
  public colors = ["red", "orange", "yellow"];
  public color = "red";


  getColor(i:number): string{
    return this.colors[i];
  }

  constructor() { }

  ngOnInit(): void {
  }

}

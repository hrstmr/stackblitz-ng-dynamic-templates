import {
  Component,
  inject,
  SecurityContext,
  ViewContainerRef,
} from '@angular/core';
import { bootstrapApplication, DomSanitizer } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'leaf-content',
  standalone: true,
  template: `
    This is the leaf content {{name}}
  `,
})
export class LeafContent {
  name = '';
}

@Component({
  selector: 'inner-item',
  standalone: true,
  template: `
    <button (click)="loadContent()">Load content</button>
  `,
})
export class InnerItem {
  constructor(private viewContainer: ViewContainerRef) {}
  loadContent() {
    const leaf  =this.viewContainer.createComponent(LeafContent);
    leaf.
  }
}

@Component({
  selector: 'outer-container',
  imports: [InnerItem],
  standalone: true,
  template: `
    <p>This is the start of the outer container</p>
    <inner-item />
    <p>This is the end of the outer container</p>
  `,
})
export class OuterContainer {}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'main.html',
  imports: [OuterContainer],
})
export class App {
  sananize = inject(DomSanitizer);
  name = 'Angular';

  log() {
    const safe = this.sananize.sanitize(
      SecurityContext.HTML,
      'Template <script>alert("0wned")</script> <b>Syntax</b>'
    );
    console.log(safe);
    console.log('hit');
  }
}

bootstrapApplication(App);

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './templates/components/navbar/navbar.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
<app-navbar></app-navbar>
<main class="container">
<router-outlet></router-outlet>
</main>
`,
    styles: [`.container{max-width:1100px;margin:0 auto;padding:16px;}`]
})
export class AppComponent { }
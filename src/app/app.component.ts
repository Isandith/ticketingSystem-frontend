import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigureComponent } from "./page/configure/configure.component";
import { TicketStatusComponent } from "./page/total-tickets/total-tickets.component";
import { STARTSTOPComponent } from "./page/start-stop/start-stop.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConfigureComponent, TicketStatusComponent, STARTSTOPComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Configure-frontend';
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-start-stop',
  standalone: true,
  imports: [],
  templateUrl: './start-stop.component.html',
  styleUrls: ['./start-stop.component.css']
})
export class STARTSTOPComponent {

  constructor(private Http: HttpClient) {}

  Start() {
    // Call the API to start the process
    this.Http.post<string>("http://localhost:9090/config/start", {}, { responseType: 'text' as 'json' })
      .subscribe(
        data => {
          alert(data);  // The message returned from the server
        },
        error => {
          console.error("Error:", error);
          alert("Please enter inputs or stop the system");  // Display error message
        }
      );
  }

  Stop() {
    // Call the API to stop the process (adjust API endpoint as needed)
    this.Http.post<string>("http://localhost:9090/config/stop", {}, { responseType: 'text' as 'json' })
      .subscribe(
        data => {
          alert(data);  // The message returned from the server
        },
        error => {
          console.error("Error:", error);
          alert("An error occurred: " + error.message);  // Display error message
        }
      );
  }
}

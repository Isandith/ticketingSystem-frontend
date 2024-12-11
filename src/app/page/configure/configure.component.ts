import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { STARTSTOPComponent } from '../start-stop/start-stop.component';

@Component({
  selector: 'app-configure',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, STARTSTOPComponent],
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent {

  public customer = {
    maxTicketCapacity: "",
    totalTicketCapacity: "",
    ticketReleaseRate: "",
    ticketRetrievalRate: ""
  };

  constructor(private Http: HttpClient) {}

  // Load the configuration from the backend
  LoadCustomer() {
    this.Http.get<any>("http://localhost:9090/config/load", { responseType: 'json' })
      .subscribe(
        (data) => {
          // Update customer object with the loaded configuration
          if (data) {
            this.customer.maxTicketCapacity = data.maxTicketCapacity;
            this.customer.totalTicketCapacity = data.totalTicketCapacity;
            this.customer.ticketReleaseRate = data.ticketReleaseRate;
            this.customer.ticketRetrievalRate = data.ticketRetrievalRate;
            alert("Configuration loaded successfully.");
          }
        },
        (error) => {
          console.error("Error:", error);
          alert("An error occurred while loading the configuration: " + error.message);
        }
      );
  }

  addCustomer() {
    // Convert string values to numbers for comparison
    const maxTicketCapacity = Number(this.customer.maxTicketCapacity);
    const totalTicketCapacity = Number(this.customer.totalTicketCapacity);
    const ticketReleaseRate = Number(this.customer.ticketReleaseRate);
    const ticketRetrievalRate = Number(this.customer.ticketRetrievalRate);
  
    // Validate that the inputs are integers
    if (!Number.isInteger(maxTicketCapacity) || !Number.isInteger(totalTicketCapacity) ||
        !Number.isInteger(ticketReleaseRate) || !Number.isInteger(ticketRetrievalRate)) {
      alert('Please enter valid integer values for all fields.');
      return;
    }
  
    // Check if total tickets exceed max tickets
    if (totalTicketCapacity > maxTicketCapacity) {
      alert('Total ticket capacity cannot exceed the maximum ticket capacity.');
      return;
    }
  
    console.log(this.customer);
  
    // Send POST request with 'json' responseType for JSON response
    this.Http.post<string>("http://localhost:9090/config/setEntity", this.customer, { responseType: 'text' as 'json' })
      .subscribe(
        data => {
          alert(data);  // The message is now the plain text returned from Spring Boot
        },
        error => {
          console.error("Error:", error);
          alert("An error occurred: " + error.message);  // Display error message
        }
      );
  }
}

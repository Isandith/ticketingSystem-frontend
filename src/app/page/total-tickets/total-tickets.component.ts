import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Message } from '../../interface/message.dto'; // Ensure the Message interface is correct for your use case

@Component({
  selector: 'app-total-ticket', // Changed selector to match the HTML usage
  standalone: true,
  templateUrl: './total-tickets.component.html', // Ensure the path is correct
  styleUrls: ['./total-tickets.component.css'], // Ensure the path is correct
  imports: [CommonModule]
})
export class TicketStatusComponent implements OnInit, OnDestroy {
  private socketClient: Stomp.Client | null = null;
  public messages: string[] = [];
  private reconnectInterval: any; // To manage reconnection attempts

  ngOnInit() {
    this.connectWebSocket();
    // Set up a reconnection attempt every 5 seconds if not connected
    this.reconnectInterval = setInterval(() => {
      if (!this.socketClient || !this.socketClient.connected) {
        this.connectWebSocket();
      }
    }, 5000); // Retry every 5 seconds
  }

  ngOnDestroy() {
    if (this.socketClient) {
      this.socketClient.disconnect(() => {
        console.log('WebSocket connection closed.');
      });
    }
    // Clear the reconnection interval when the component is destroyed
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
    }
  }

  // Method to handle WebSocket connection
  connectWebSocket() {
    const wsUrl = 'http://localhost:9090/chat'; // Update URL based on your backend configuration
    const ws = new SockJS(wsUrl);
    this.socketClient = Stomp.over(ws);

    // Attempt to connect to the WebSocket server
    this.socketClient.connect({}, 
      () => {
        console.log('WebSocket connected');
        this.subscribeToMessages();
      }, 
      (error) => {
        console.error('Error connecting WebSocket:', error);
      }
    );
  }

  // Subscribe to WebSocket topic and handle incoming messages
  subscribeToMessages() {
    if (this.socketClient) {
      this.socketClient.subscribe('/topic/messages', (message) => {
        console.log('Raw message received:', message.body);
        try {
          const parsedMessage = JSON.parse(message.body);
          let formattedMessage = this.formatMessage(parsedMessage);
          this.messages.push(formattedMessage);
          console.log('Received:', formattedMessage);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
    }
  }

  // Format incoming message based on sender
  formatMessage(parsedMessage: any): string {
    let formattedMessage = '';
    const senderLower = parsedMessage.sender.toLowerCase();

    if (senderLower.includes('vendor')) {
      formattedMessage = `Vendor ${parsedMessage.content}`;
    } else if (senderLower.includes('customer')) {
      formattedMessage = parsedMessage.content;
    } else if (senderLower.includes('system')) {
      formattedMessage = `System: ${parsedMessage.content}`;
    } else {
      formattedMessage = 'No content available';
    }
    return formattedMessage;
  }

  // Send a test message to the WebSocket server
  sendMessage() {
    if (this.socketClient) {
      this.socketClient.send('/app/sendMessage', {}, JSON.stringify({
        sender: 'Client',
        content: 'Hello from Angular!',
      }));
      console.log('Message sent!');
    } else {
      console.error('WebSocket client is not connected.');
    }
  }
}

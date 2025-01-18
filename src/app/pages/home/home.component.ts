import { Component, OnInit, signal } from '@angular/core';
import { WebSocketService } from '../../ws.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
  constructor(private socketService: WebSocketService) {}

  errorOnConnect = signal(false);
  msg = signal('');

  ngOnInit(): void {
    this.socketService.connectSocket();
  }

  onSend() {
    this.socketService.sendMessage('chat', this.msg());
    this.msg.set('');
  }
}

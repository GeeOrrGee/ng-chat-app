import { Component, inject, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { WebSocketService } from '../../core/ws.service';

@Component({
  selector: 'app-home',
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
})
export class HomeComponent implements OnInit {
  private socketService = inject(WebSocketService);
  constructor() {}

  errorOnConnect = signal(false);
  msg = signal('');

  ngOnInit(): void {
    this.socketService.on('chat', (data: any) => {
      console.log(data + ' received');
    });
  }

  onSend() {
    this.socketService.sendMessage('chat', this.msg());
    this.msg.set('');
  }
}

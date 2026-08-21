import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mnpavyyy';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';

  async onSubmit(): Promise<void> {
    this.status = 'sending';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });

      if (response.ok) {
        this.status = 'success';
        this.formData = { name: '', email: '', subject: '', message: '' };
      } else {
        this.status = 'error';
      }
    } catch {
      this.status = 'error';
    }
  }
}

import { Injectable, signal } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class NotificacaoService {
    msg = signal<string | null>(null);
    show(message: string, timeout = 3008) {
        this.msg.set(message);
        setTimeout(() => this.msg.set(null), timeout);
    }
}
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

interface Session {
    token: string;
    user: Pick<Usuario, 'id' | 'nome' | 'email' | 'tipo'>;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private api = 'http://localhost:3008';
    private _session = signal<Session | null>(this.getSessionFromStorage());

    constructor(private http: HttpClient) { }

    login(email: string, senha: string): Observable<boolean> {
        return this.http.get<Usuario[]>(`${this.api}/usuarios?email=${email}&senha=${senha}`).pipe(
            map(users => {
                const user = users[0];
                if (!user) return false;
                const sess: Session = {
                    token: cryptoRandom(),
                    user: { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo }
                };
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.setItem('session', JSON.stringify(sess));
                }
                this._session.set(sess);
                return true;
            })
        );
    }

    logout(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('session');
        }
        this._session.set(null);
    }

    get session() { 
        return this._session();
    }

    isAuthenticated(): boolean {
        return !!this._session(); 
    }

    getUserTipo(): 'cliente' | 'corretor' | null { 
        return this._session()?.user.tipo ?? null; 
    }

    getUserId(): number | null { 
        return this._session()?.user.id ?? null; 
    }

    private getSessionFromStorage(): Session | null {
        if (typeof window !== 'undefined' && window.localStorage) {
            const raw = localStorage.getItem('session');
            return raw ? JSON.parse(raw) as Session : null;
        }
        return null;
    }
}

function cryptoRandom() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
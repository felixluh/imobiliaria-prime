import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  erro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    // inicialização correta do form
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  entrar() {
    if (this.form.invalid) {
      this.erro = 'Preencha os campos corretamente.';
      return;
    }

    const { email, senha } = this.form.value;

    this.auth.login(email!, senha!).subscribe(ok => {
      if (ok) {
        const tipo = this.auth.getUserTipo();
        this.router.navigate([tipo === 'corretor' ? '/dashboard' : '/home']);
      } else {
        this.erro = 'Credenciais inválidas';
      }
    });
  }
}

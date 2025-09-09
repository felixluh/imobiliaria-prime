import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.scss']
})
export class RegistroClienteComponent {
  form: FormGroup;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  registrar() {
    if (this.form.invalid) {
      this.erro = 'Preencha os campos corretamente.';
      return;
    }

    const user = { ...this.form.value, tipo: 'cliente' };

    this.http.post('http://localhost:3008/usuarios', user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => this.erro = 'Erro ao registrar. Tente novamente.'
    });
  }
}

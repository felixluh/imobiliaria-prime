import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ImoveisService } from '../../../core/services/imovel.service';
import { Imovel } from '../../../core/models/imovel.model';
import { CardImovelComponent } from '../../../templates/components/card-imovel/card-imovel.component';

@Component({
  standalone: true,
  imports: [CommonModule, CardImovelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  imoveis: Imovel[] = [];

  constructor(
    private service: ImoveisService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // Esta verificação garante que o código dentro do 'if' só execute no navegador.
    if (isPlatformBrowser(this.platformId)) {
      this.service.listar().subscribe(d => this.imoveis = d);
    }
  }
}
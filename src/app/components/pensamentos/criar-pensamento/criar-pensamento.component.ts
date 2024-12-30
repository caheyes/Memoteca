import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from 'src/app/utils/validators/minusculaValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder //responsavel pela construção do form
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      //quando passar mais de um validator, usar o Validators.compose(), se não somente o [Validators.required]
      conteudo: ['', Validators.compose([
        Validators.required, //requer
        Validators.pattern(/(.|\s)*\S(.|\s)*/), //não perimita q passe somente espaços vazios
      ])],
      autoria: ['',  Validators.compose([
        Validators.required, //requer
        Validators.minLength(3), //tamanho minimo
        minusculoValidator
      ])],
      modelo: ['modelo1'],
      favorito: [false]
    })
  }

  criarPensamento() {
    console.log(this.formulario.get('autoria')?.errors);
    if(this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}

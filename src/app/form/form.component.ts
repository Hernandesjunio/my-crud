import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  @Input() cliente: Cliente;
  @Output('save') saveEvt = new EventEmitter<Cliente>();
  @Output() back = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.min(3)]),
      sexo: new FormControl('', [Validators.required]),
    });
    if (this.cliente) {
      this.form.patchValue(this.cliente);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cliente && this.form) {
      this.form.patchValue(this.cliente);
    }
  }

  save() {
    this.saveEvt.emit({ ...this.form.value, id: this.cliente?.id });
  }
}

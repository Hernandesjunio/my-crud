import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteService } from './cliente.service';
import { Cliente } from './models/cliente.model';
import { State } from './models/state.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-crud';

  get isEditing() {
    return this.state == State.Editing;
  }

  get isAdding() {
    return this.state == State.Adding;
  }

  get isUnchanged() {
    return this.state == State.Unchanged;
  }

  clientes: Observable<Cliente[]>;
  state = State.Unchanged;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clientes = this.clienteService.buscarCliente();
  }

  delete(id: number){
    this.clienteService.excluirCliente(id).subscribe(c=> {
      this.clientes = this.clienteService.buscarCliente();
    })
  }

  save(cliente: Cliente) {

    if (cliente.id) {
      this.clienteService.atualizarCliente(cliente).subscribe((c) => {
        this.clientes = this.clienteService.buscarCliente();
        this.state = State.Unchanged;
      });
    } else {
      this.clienteService.criarCliente(cliente).subscribe((c) => {
        this.clientes = this.clienteService.buscarCliente();
        this.state = State.Unchanged;
      });
    }
  }

  editar() {
    this.state = State.Editing;
  }

  criar() {
    this.state = State.Adding;
  }

  resetState() {
    this.state = State.Unchanged;
  }
}

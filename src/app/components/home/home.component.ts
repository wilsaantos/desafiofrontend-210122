import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Dado } from './../../models/dado';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  formGroup: FormGroup;
  dados: Dado[] = [];

  displayedColumns: string[] = ['nome', 'telefone', 'rmvButton'];
  dataSource: MatTableDataSource<Dado>

  @ViewChild(MatSort) sort: MatSort

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      nome: [null, [Validators.required]],
      telefone: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    })
  }


  onSubmit() {
    this.dados.push(this.formGroup.value)

    this.formGroup.reset()

    this.dataSource = new MatTableDataSource(this.dados)
    this.dataSource.sort = this.sort
  }

  clearData() {
    this.formGroup.reset()
  }


  filterData(event: any) {
    this.dataSource.filter = event.target.value;
  }

  removePerson(element: Dado) {
    const index = this.dados.indexOf(element);

    if (index != -1) {
      this.dados.splice(index, 1)
      this.dataSource = new MatTableDataSource(this.dados)
      this.dataSource.sort = this.sort
    } else return;
  }
}

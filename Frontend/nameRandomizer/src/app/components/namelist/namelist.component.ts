import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NameService } from '../../services/name.service';
import { Name } from '../../models/name.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-namelist',
  standalone: false,
  templateUrl: './namelist.component.html',
  styleUrl: './namelist.component.sass'
})
export class NamelistComponent implements OnInit{
  public names$ = new Observable<Name[]>
  form!: FormGroup

  constructor (private nameService: NameService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.nameService.init()
    this.names$ = this.nameService.names$

    this.form = this.fb.group({
      name: ["", Validators.required]
    })
  }

  submit(): void {
    if (this.form.valid) {
      const name = this.form.value
      this.nameService.addName(name)
      this.form.reset()
    }
  }

  delete(id: string) {
    this.nameService.deleteName(id)
  }
}

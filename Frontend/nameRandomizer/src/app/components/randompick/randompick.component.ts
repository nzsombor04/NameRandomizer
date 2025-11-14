import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Name } from '../../models/name.model';
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-randompick',
  standalone: false,
  templateUrl: './randompick.component.html',
  styleUrl: './randompick.component.sass'
})
export class RandompickComponent implements OnInit {
  public name$ = new Observable<Name>
  isNotNull: boolean = false

  constructor(private nameService: NameService) { }

  ngOnInit(): void {
    this.name$ = this.nameService.name$
  }

  getRandomName() {
    this.nameService.getRandomName()
    this.isNotNull = true
  }
}

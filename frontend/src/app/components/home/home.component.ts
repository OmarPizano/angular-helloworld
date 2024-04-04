import { Component, OnInit } from '@angular/core';
import { NamesService } from '../../services/names.service';
import { Name } from '../../models/name';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  title: string = 'Home Page';
  nameList: Name[] = [];
  apiVersion: string = '';

  // temporalmente incluimos el cliente http ya que ningun servicio consulta
  // la ruta para obtener la versión
  constructor(private nameService: NamesService, private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.nameService.getNames().subscribe(
      (names) => {
        this.nameList = names;
      }
    );
    // TODO: poner esta petición en un servicio
    this.httpClient.get<{api_version: string}>(environment.apiURL).subscribe(
      (version) => {
        this.apiVersion = version.api_version;
      }
    )
  }

}

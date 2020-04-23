import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meme } from 'src/app/store/root.reducer';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  server: string = 'http://' + environment.server.ip + ":" + environment.server.port;
  constructor(private http: HttpClient) { }

  getFolder(name: string) {
    debugger;
    return this.http.get<Meme[]>(this.server + `/folder/${name}/`);
  }
  getRoot() {
    return this.http.get<string[]>(this.server + '/root')
  }
}

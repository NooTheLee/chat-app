import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ResponseDto {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  login(username: string, password: string): Observable<ResponseDto> {
    return this.post<ResponseDto>('Auth/login', { username, password });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
//
import { BaseService } from '../base/base.service';
import { ToastService } from '@/shared';

interface ResponseDto {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  constructor(http: HttpClient, router: Router, toast: ToastService) {
    super(http, router, toast);
  }

  login(username: string, password: string): Observable<ResponseDto> {
    return this.post<ResponseDto>('Auth/login', { username, password });
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastService } from '../../../shared/toast/toast.service';
import { Router } from '@angular/router';

type ResponseDto = string | undefined;

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends BaseService {
  constructor(http: HttpClient, router: Router, toast: ToastService) {
    super(http, router, toast);
  }

  register(registeDto: RegisterDto): Observable<ResponseDto> {
    return this.post<ResponseDto>('Auth/register', registeDto);
  }
}

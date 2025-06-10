import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  protected createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  protected get<T>(endpoint: string) {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.createHeaders(),
    });
  }

  protected post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, {
      headers: this.createHeaders(),
    });
  }

  // PUT, DELETE similar to POST
}

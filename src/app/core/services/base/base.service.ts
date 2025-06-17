import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@/shared';
import { Router } from '@angular/router';

export class BaseService {
  protected apiUrl = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    private router: Router,
    private toast: ToastService,
  ) {}

  protected createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  protected handleError(error: HttpErrorResponse): Observable<never> {
    console.log('HTTP Error:', error);

    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      //
    } else {
      // Server-side error
      errorMessage = error.error.message;
    }

    if (error.status === 401) {
      this.logOut();
    }
    this.toast.show(errorMessage, 'error');
    return throwError(() => new Error(errorMessage));
  }

  protected get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.createHeaders(),
      withCredentials: true
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  protected post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, {
      headers: this.createHeaders(),
      withCredentials: true
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  protected put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, {
      headers: this.createHeaders(),
      withCredentials: true
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  protected delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.createHeaders(),
      withCredentials: true
    }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  logOut = () => {
    // Clear all local storage data
    localStorage.clear();
    sessionStorage.clear(); // Also clear session storage if needed
    this.router.navigate(['/login']);
  }
}

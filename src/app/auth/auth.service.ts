import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'

export interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(myEmail: string, myPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwvGErhT98yQzPvglquAqeAmm7qK7l0vE',
        { email: myEmail, password: myPassword, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError))
  }

  login(myEmail: string, myPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwvGErhT98yQzPvglquAqeAmm7qK7l0vE',
        { email: myEmail, password: myPassword, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError))
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!'
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage)
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email exists already'
        break
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'The email does not exist'
        break
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is not valid'
        break
    }
    return throwError(errorMessage)
  }
}

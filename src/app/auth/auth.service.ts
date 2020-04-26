import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject } from 'rxjs'
import { User } from './user.model'
import { RouterLink, Router } from '@angular/router'

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
  user = new BehaviorSubject<User>(null)

  constructor(private http: HttpClient, private router: Router) {}

  signUp(myEmail: string, myPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwvGErhT98yQzPvglquAqeAmm7qK7l0vE',
        { email: myEmail, password: myPassword, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthntication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      )
  }

  login(myEmail: string, myPassword: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwvGErhT98yQzPvglquAqeAmm7qK7l0vE',
        { email: myEmail, password: myPassword, returnSecureToken: true }
      )
      .pipe(catchError(this.handleError))
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
  }

  private handleAuthntication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(+new Date().getTime + +expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate)
    this.user.next(user)
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

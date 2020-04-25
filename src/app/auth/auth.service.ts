import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

interface AuthResponseData {
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(myEmail: string, myPassword: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwvGErhT98yQzPvglquAqeAmm7qK7l0vE',
      { email: myEmail, password: myPassword, returnSecureToken: true }
    )
  }
}
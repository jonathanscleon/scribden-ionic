import { store } from '../root/store';

class AuthServiceController {
  login(email: string, password: string): Promise<any> {
    return store.db.signIn({
      email,
      password,
      default: true // api calls will use this user's permissions
    }).toPromise(); // returns token
  }

  register(email: string, password: string): Promise<any> {
    return store.db.signUp({
      email,
      password
    }).toPromise(); // returns user
  }

  logout(): Promise<any> {
    return store.db.resetDefault().toPromise(); // revoke current auth
  }

  forgotPassword(email: string): void {
    store.db.requestResetPassword(email);
  }

  resetPassword(resetToken: string, newPassword: string): void {
    store.db.resetPassword(resetToken, newPassword);
  }

  changePassword(email: string, oldPassword: string, newPassword: string): void {
    store.db.changePassword(email, oldPassword, newPassword);
  }
}

export const AuthService = new AuthServiceController();

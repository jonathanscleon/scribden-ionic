import { store } from '../root/store';

class AuthServiceController {
  login(email: string, password: string): Promise<any> {
    return store.ums.signIn({
      email,
      password,
      default: true // api calls will use this user's permissions
    }).toPromise(); // returns token
  }

  register(email: string, password: string): Promise<any> {
    return store.ums.signUp({
      email,
      password
    }).toPromise(); // returns user
  }

  logout(): Promise<any> {
    return store.ums.resetDefault().toPromise(); // revoke current auth
  }

  forgotPassword(email: string): void {
    store.ums.requestResetPassword(email);
  }

  resetPassword(resetToken: string, newPassword: string): void {
    store.ums.resetPassword(resetToken, newPassword);
  }

  changePassword(email: string, oldPassword: string, newPassword: string): void {
    store.ums.changePassword(email, oldPassword, newPassword);
  }
}

export const AuthService = new AuthServiceController();

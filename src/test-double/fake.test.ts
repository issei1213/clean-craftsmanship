interface Authenticator {
    authenticate(username: string, password: string): boolean;
}

class AuthenticatorFake implements Authenticator {
    public authenticate(username: string, password: string): boolean {
        return username === 'user' && password === 'good password';
    }
}

test('badPasswordAttempt_loginFails', () => {
    const authenticator: Authenticator = new AuthenticatorFake();
    const dialog: Dialog = new LoginDialog(authenticator);
    dialog.show();
    const success: boolean = dialog.submit('user', 'bad password');
    expect(success).toBeFalsy();
});

test('goodPasswordAttempt_loginSucceeds', () => {
    const authenticator: Authenticator = new AuthenticatorFake();
    const dialog: Dialog = new LoginDialog(authenticator);
    dialog.show();
    const success: boolean = dialog.submit('user', 'good password');
    expect(success).toBeTruthy();
});

interface Authenticator {
    authenticate(username: string, password: string): boolean;
}

class AuthenticatorSpy implements Authenticator {
    private count: number = 0;
    private result: boolean = false;
    private lastUsername: string = '';
    private lastPassword: string = '';
    public authenticate(username: string, password: string): boolean {
        this.count++;
        this.lastUsername = username;
        this.lastPassword = password;

        return this.result;
    }

    public setResult(result: boolean): void {
        this.result = result;
    }

    public getCount(): number {
        return this.count;
    }

    public getLastUsername(): string {
        return this.lastUsername;
    }

    public getLastPassword(): string {
        return this.lastPassword;
    }
}

test('loginDialog_correctlyIyInvokesAuthenticator', () => {
    const spy: AuthenticatorSpy = new AuthenticatorSpy();
    const dialog: Dialog = new LoginDialog(spy);
    spy.setResult(true);
    dialog.show();
    const success: boolean = dialog.submit('user', 'pw');
    expect(success).toBeTruthy();
    expect(spy.getCount()).toBe(1);
    expect(spy.getLastUsername()).toBe('user');
    expect(spy.getLastPassword()).toBe('pw');
});

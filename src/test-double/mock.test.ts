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

class AuthenticatorMock extends AuthenticatorSpy {
    private expectedUsername: string = '';
    private expectedPassword: string = '';
    private expectedCount: number = 0;

    constructor(username: string, password: string, count: number) {
        super();
        this.expectedUsername = username;
        this.expectedPassword = password;
        this.expectedCount = count;
    }

    public validate(): boolean {
        return (
            this.getCount() === this.expectedCount &&
            this.getLastUsername() === this.expectedUsername &&
            this.getLastPassword() === this.expectedPassword
        );
    }
}

test('loginDialogCallToAuthenticator_validated', () => {
    const mock: AuthenticatorMock = new AuthenticatorMock('Bob', 'xyxxy', 1);
    const dialog: Dialog = new LoginDialog(mock);
    mock.setResult(true);
    dialog.show();
    const success: boolean = dialog.submit('Bob', 'xyzzy');
    expect(success).toBeTruthy();
    expect(mock.validate()).toBeTruthy();
});

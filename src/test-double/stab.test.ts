interface Authenticator {
    authenticate(username: string, password: string): boolean;
}

class RejectingAuthenticator implements Authenticator {
    authenticate(username: string, password: string): boolean {
        return false;
    }
}

class PromiscuousAuthenticator implements Authenticator {
    authenticate(username: string, password: string): boolean {
        return true;
    }
}

test('whenAuthorizerRejects_loginFails', () => {
    const authticator: Authenticator = new RejectingAuthenticator();
    const dialog: Dialog = new Dialog(authticator);
    dialog.show();

    const suncess: boolean = dialog.submit('baduser', 'badpassword');
    expect(suncess).toBeFalsy();
});

test('whenAuthorizerAccepts_loginSucceeds', () => {
    const authticator: Authenticator = new PromiscuousAuthenticator();
    const dialog: Dialog = new Dialog(authticator);
    dialog.show();

    const suncess: boolean = dialog.submit('gooduser', 'goodpassword');
    expect(suncess).toBeTruthy();
});

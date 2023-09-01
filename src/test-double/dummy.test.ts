interface Authenticator {
    authenticate(username: string, password: string): boolean;
}

class AuthenticatorDummy implements Authenticator {
    authenticate(username: string, password: string): boolean {
        return null;
    }
}

test('whenClosed_loginIsCanceled', () => {
    const authticator: Authenticator = new AuthenticatorDummy();
    const dialog: Dialog = new Dialog(authticator);
    dialog.show();

    const suncess: boolean = dialog.sendEvent(Event.CLOSE);
    expect(suncess).toBeTruthy();
});

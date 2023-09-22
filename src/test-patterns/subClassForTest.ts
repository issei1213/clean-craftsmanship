class XRay {
    // このメソッドのテストしたいが、turnOn()と依存している
    public align(): void {
        this.turnOn();
        //...
    }
    public turnOn(): void {
        //
    }
}

// オーバーライドしてturnOn()をなにも処理をしないようにする
class SafeXray extends XRay {
    public turnOn(): void {
        //...
    }
}

test('align', () => {
    const xray: XRay = new SafeXray();
    xray.align();
    expect(true).toBeTruthy();
});

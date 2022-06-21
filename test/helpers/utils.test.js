const { comparePass, encryptedPass } = require('../../src/helpers/utils');

describe('Encrypt password validation', () => {
    test('password hashed compare', async() => {
        let password = 'test';
        let hashed = await encryptedPass(password);
        expect(await comparePass(password, hashed)).toBe(true);
    });

    test('error password hashed compare', async() => {
        let password = 'test';
        expect(await comparePass(password, password)).toBe(false);
    });
})
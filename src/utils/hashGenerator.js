import { createHash } from 'crypto';

/**
 * isso aqui serve pra refazer a senha que ta dentro da .env
 * em "secret", caso necessário.
 */

function hashGenerator() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let resultado = '';

    for ( var i = 0; i < 42; i++ ) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return createHash('sha256').update(resultado).digest('hex');
}

export { hashGenerator }
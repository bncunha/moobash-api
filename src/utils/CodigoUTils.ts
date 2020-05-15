export class CodigoUtils {
    static gerarCodigo(valor: string, numeroCaracteres = 3, sufix: string = '') {
        return valor.substr(0, numeroCaracteres).toUpperCase() + sufix;
    }

    static async gerarCodigoUnico(texto: string, funcaoVerificadora: any) {
        let codigo = CodigoUtils.gerarCodigo(texto);
        let codigoUnco = false;
        let i = 0;
        while(!codigoUnco) {
            if (await funcaoVerificadora(codigo)) {
                i++;
                codigo = CodigoUtils.gerarCodigo(texto, 3, String(i));
            } else {
                codigoUnco = true;
            }
        }
        return codigo;
    }
}
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

    static gerarCodigoAleatorio(numeroCaracteres: number = 3) {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      
        for (let i = 0; i < numeroCaracteres; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }      
        return text;
    }
}
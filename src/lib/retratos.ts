import type { Encuadre, Niveles } from '../data/content';

/*
  El tono al que se llevan todos los retratos del equipo, sobre 255. Es el del
  retrato de Eduardo y Priscila, que llega ya editado en blanco y negro desde
  la sesión y es la referencia: pared clara pero no quemada y negros apenas
  levantados, sin llegar al negro puro.

  Cambiar estos números cambia el tono de la cuadrícula entera, y también el
  de los retratos de `soy-nuevo`, que heredan los mismos niveles.
*/
const NEGRO = 16;
const FONDO = 220;
/*
  Hasta dónde puede subir lo más claro de la foto. En casi todas la pared es
  lo más claro y esto no entra en juego; en la de Nicole, con la pared en gris
  medio y la blusa clara, llevar la pared a 220 quemaba la blusa, así que su
  pared se queda algo más oscura que la del resto.
*/
const TECHO = 245;

/**
 * El `brightness()` y el `contrast()` que llevan una foto al tono común.
 *
 * Es una recta: el negro de la foto va a `NEGRO` y su pared a `FONDO`. Con
 * dos filtros de CSS no se puede hacer más que eso —una curva pediría un
 * filtro SVG por foto—, pero basta, porque lo que cambiaba de una foto a
 * otra era la exposición, no la curva.
 *
 * Las cuentas: `contrast(c)` hace `c·(v − 128) + 128` y `brightness(k)` hace
 * `k·v`, así que juntos dan `c·k·v + 128·(1 − c)`. La pendiente es `c·k` y lo
 * que se suma, `128·(1 − c)`.
 */
function tono(n: Niveles) {
  const pendiente = Math.min(
    (FONDO - NEGRO) / (n.fondo - n.negro),
    (TECHO - NEGRO) / (n.blanco - n.negro)
  );
  const contraste = 1 - (NEGRO - pendiente * n.negro) / 128;

  return { brillo: pendiente / contraste, contraste };
}

/**
 * Las variables CSS de un retrato: su encuadre y, si trae `niveles`, su tono.
 * Van en el `style` de cada `<Image>` porque son valores por foto; el CSS de
 * la página decide qué hace con ellas.
 */
export function estiloRetrato(e?: Encuadre, n?: Niveles) {
  const { brillo, contraste } = n ? tono(n) : { brillo: 1, contraste: 1 };

  return [
    `--zoom:${e?.zoom ?? 1}`,
    `--x:${e?.x ?? '50%'}`,
    `--y:${e?.y ?? '50%'}`,
    `--brillo:${brillo.toFixed(3)}`,
    `--contraste:${contraste.toFixed(3)}`,
  ].join(';');
}

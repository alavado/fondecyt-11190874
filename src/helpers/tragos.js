import imagenLataCerveza from '../assets/images/tragos/lata_cerveza.png'
import imagenShopPequeñoCerveza from '../assets/images/tragos/shop_pequeño_cerveza.png'
import imagenShopGrandeCerveza from '../assets/images/tragos/shop_grande_cerveza.png'
import imagenBotellaCerveza from '../assets/images/tragos/botella_cerveza.png'
import imagenCopaVino from '../assets/images/tragos/copa_vino.png'
import imagenVasoVino from '../assets/images/tragos/vaso_vino.png'
import imagenBotellaVino from '../assets/images/tragos/botella_vino.png'
import imagenCajaVino from '../assets/images/tragos/caja_vino.png'
import imagenCortoLicor from '../assets/images/tragos/corto_licor.png'
import imagenCombinadoSimple from '../assets/images/tragos/combinado_simple.png'
import imagenCombinadoFuerte from '../assets/images/tragos/combinado_fuerte.png'
import imagenBotellaLicor from '../assets/images/tragos/botella_licor.png'

export const tragos = [
  {
    categoria: 'Cerveza',
    nombre: 'Lata de cerveza',
    ml: 350,
    alcohol: 13.8,
    tragos: 1,
    imagen: imagenLataCerveza
  },
  {
    categoria: 'Cerveza',
    nombre: 'Shop pequeño',
    ml: 500,
    alcohol: 19.8,
    tragos: 1.5,
    imagen: imagenShopPequeñoCerveza
  },
  {
    categoria: 'Cerveza',
    nombre: 'Shop grande',
    ml: 1000,
    alcohol: 39.5,
    tragos: 3,
    imagen: imagenShopGrandeCerveza
  },
  {
    categoria: 'Cerveza',
    nombre: 'Botella de cerveza',
    ml: 1000,
    alcohol: 39.5,
    tragos: 3,
    imagen: imagenBotellaCerveza
  },
  {
    categoria: 'Vino',
    nombre: 'Copa de vino',
    ml: 140,
    alcohol: 15.5,
    tragos: 1,
    imagen: imagenCopaVino
  },
  {
    categoria: 'Vino',
    nombre: 'Vaso de vino, caña',
    ml: 280,
    alcohol: 31,
    tragos: 2,
    imagen: imagenVasoVino
  },
  {
    categoria: 'Vino',
    nombre: 'Botella de vino',
    ml: 750,
    alcohol: 83,
    tragos: 6,
    imagen: imagenBotellaVino
  },
  {
    categoria: 'Vino',
    nombre: 'Caja de vino, Tetrapack',
    ml: 1000,
    alcohol: 111,
    tragos: 8,
    imagen: imagenCajaVino
  },
  {
    categoria: 'Licor',
    nombre: 'Corto de licor',
    ml: 40,
    alcohol: 12.6,
    tragos: 1,
    imagen: imagenCortoLicor
  },
  {
    categoria: 'Licor',
    nombre: 'Combinado simple',
    ml: 40,
    alcohol: 12.6,
    tragos: 1,
    imagen: imagenCombinadoSimple
  },
  {
    categoria: 'Licor',
    nombre: 'Combinado fuerte, cabezón',
    ml: 80,
    alcohol: 25.3,
    tragos: 2,
    imagen: imagenCombinadoFuerte
  },
  {
    categoria: 'Licor',
    nombre: 'Botella de licor',
    ml: 750,
    alcohol: 237,
    tragos: 17,
    imagen: imagenBotellaLicor
  },
]
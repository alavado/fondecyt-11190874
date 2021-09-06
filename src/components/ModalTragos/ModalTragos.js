import Icon from '@iconify/react'
import { createPortal } from 'react-dom'
import { tragos } from '../../helpers/tragos'
import iconoCerrar from '@iconify-icons/mdi/close'
import './ModalTragos.css'

const ModalTragos = ({ ocultar }) => {
  return createPortal(
    <div
      className="ModalTragos"
      onClick={ocultar}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ModalTragos__contenedor"
      >
        <button
          onClick={ocultar}
          className="ModalTragos__boton_cerrar"
        >
          <Icon icon={iconoCerrar} />
        </button>
        <h2 className="ModalTragos__titulo">Tabla de tragos estándar</h2>
        <div className="ModalTragos__tabla">
          <div />
          <div className="ModalTragos__tipo_trago">
            CERVEZA (5 grados)
          </div>
          <div className="ModalTragos__tipo_trago">
            VINO (5 grados)
          </div>
          <div className="ModalTragos__tipo_trago">
            LICOR (40 grados)
          </div>
          <div className="ModalTragos__fila_trago ModalTragos__fila_trago--encabezados">
            <div></div>
            <div>Cantidad</div>
            <div>Miligramos</div>
            <div>Gramos de alcohol</div>
            <div>Cantidad de tragos</div>
          </div>
          {tragos.map(t => (
            <div className="ModalTragos__fila_trago">
              <div><img className="ModalTragos__imagen_trago" src={t.imagen} /></div>
              <div>{t.nombre}</div>
              <div>{t.ml.toLocaleString('de-DE')}</div>
              <div>{t.alcohol.toLocaleString('de-DE')}</div>
              <div className="ModalTragos__tragos">{t.tragos} TRAGO{t.tragos !== 1 ? 'S' : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  , document.getElementById('modal-tragos'))
}

export default ModalTragos
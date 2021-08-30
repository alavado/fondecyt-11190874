import classNames from 'classnames'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { tlfb } from '../../../../helpers/api'
import './Intoxicacion.css'

const Intoxicacion = ({ jwtSU, idDirecto }) => {

  const { jwt } = useSelector(state => state.login)
  const { id } = useParams()
  const { isLoading, data } = useQuery('tlfb', tlfb(jwtSU || jwt, idDirecto || id))

  if (isLoading) {
    return 'Cargando...'
  }

  if (!data?.data?.data?.attributes) {
    return 'Paciente no tiene datos'
  }

  const {
    bac_max,
    bac_media,
    gdd
  } = data.data.data.attributes

  return (
    <div className="Intoxicacion">
      <div className="Intoxicacion__contenedor_cifra">
        <p>Su alcoholemia promedio en un día de consumo es</p>
        <p className="Intoxicacion__cifra">{Number(bac_media).toLocaleString('de-DE')} mg%</p>
      </div>
      <div className="Intoxicacion__contenedor_cifra">
        <p>Su alcoholemia máxima alcanzada en el periodo es</p>
        <p className="Intoxicacion__cifra">{Number(bac_max).toLocaleString('de-DE')} mg%</p>
      </div>
      <h2 className="Intoxicacion__subtitulo_tabla">Comportamientos esperados en una persona sin tolerancia</h2>
      <table className="Intoxicacion__tabla">
        <thead>
          <tr>
            <th>BAC</th>
            <th>Efecto típico</th>
            <th>Efecto en la conducción</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media < 35 })}>
            <td>20%</td>
            <td>
              <ul>
                <li>Alguna pérdida del juicio</li>
                <li>Relajación</li>
                <li>Calor corporal leve</li>
                <li>Estado de ánimo alterado</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Disminución de las funciones visuales (seguimiento rápido de un movimiento objetivo)</li>
                <li>Disminución de la capacidad de realizar dos tareas al mismo tiempo (atención dividida)</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 35 && bac_media < 65 })}>
            <td>50%</td>
            <td>
              <ul>
                <li>Comportamiento exagerado</li>
                <li>Puede tener pérdida de control de pequeños músculos (por ejemplo,enfocar los ojos)</li>
                <li>Juicio deteriorado</li>
                <li>Generalmente se siente bien</li>
                <li>Bajo el estado de alerta</li>
                <li>Desinhibición</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Coordinación reducida</li>
                <li>Capacidad reducida para seguir objetos en movimiento</li>
                <li>Dificultad para manejar el volante</li>
                <li>Respuesta reducida a situaciones de manejo de emergencia</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 65 && bac_media < 90 })}>
            <td>80%</td>
            <td>
              <ul>
                <li>La coordinación muscular se vuelve pobre (ej. equilibrio, habla, visión, tiempo de reacción)</li>
                <li>Relajación</li>
                <li>Es más difícil detectar el peligro</li>
                <li>El juicio, autocontrol, razonamiento y memoria están dañados</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Desconcentración</li>
                <li>Pérdida de memoria a corto plazo</li>
                <li>Falla el control de velocidad</li>
                <li>Reducida capacidad de procesamiento de información (por ejemplo, detección de señal, búsqueda visual)</li>
                <li>Percepción deteriorada</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 90 && bac_media < 125 })}>
            <td>100%</td>
            <td>
              <ul>
                <li>Claro deterioro del tiempo de reacción</li>
                <li>Habla traposa, coordinación pobre y pensamiento enlentecido</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Capacidad reducida para mantener la posición en la pista y frenar apropiadamente</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 125 && bac_media < 175 })}>
            <td>150%</td>
            <td>
              <ul>
                <li>Mucho menor control muscular que lo normal</li>
                <li>Náuseas y vómitos</li>
                <li>Gran pérdida de equilibrio</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Deterioro sustancial en el control del vehículo, atención a la tarea de conducción, y a la información visual y auditiva</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 175 && bac_media < 250 })}>
            <td>200%</td>
            <td>
              <ul>
                <li>Analgesia a estímulos dolorosos</li>
                <li>Amnesia de las situaciones vividas durante la intoxicación</li>
                <li>Vértigo</li>
                <li>Pérdida de la capacidad de comprensión del lenguaje</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>Pérdida de los reflejos</li>
              </ul>
            </td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 250 && bac_media < 350 })}>
            <td>300%</td>
            <td>
              <ul>
                <li>Depresión del sistema nervioso central (estupor)</li>
                <li>Pérdida transitoria de consciencia</li>
                <li>Aspiración pulmonar (riesgo de neumonía)</li>
              </ul>
            </td>
            <td></td>
          </tr>
          <tr className={classNames({ 'Intoxicacion__cifra_fila--destacada': bac_media >= 350 })}>
            <td>&gt; 400%</td>
            <td>
              <ul>
                <li>Coma</li>
                <li>Falla respiratoria</li>
                <li>Alto riesgo de muerte</li>
              </ul>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Intoxicacion
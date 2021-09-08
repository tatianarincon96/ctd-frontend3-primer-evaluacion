import { Component } from "react";

class Historial extends Component {
  render() {
    const { seleccionPrevia, historial } = this.props;

    return (
      <div className="recordatorio">
        <h3>Selección anterior: {seleccionPrevia}</h3>
        <h4>Historial de opciones elegidas: </h4>
        <ul>
          {historial.length > 0
            ? historial.map((seleccion, index) => (
                <li key={index + "-" + seleccion}>{seleccion}</li>
              ))
            : ""}
        </ul>
      </div>
    );
  }
}

export default Historial;

import { Component } from 'react';
import data from './components/data.json';
import Opciones from './components/Opciones';
import Historial from './components/Historial';
import Swal from 'sweetalert2';

class App extends Component {
  state = {
    aventuras: [],
    aventuraActual: {},
    contador: 0,
    seleccionPrevia: "",
    historial: []
  }

  componentWillMount() {
    this.setState({
      aventuras: data,
      aventuraActual: data[0]
    });
  }


  handleSelected = (id) => {
    switch (this.state.aventuraActual.id) {
      case "1":
      case "2b":
      case "3b":
      case "4b":
        const valor = id === "A" ? 1 : 2;
        this.state.historial.push(id);
        this.setState({ contador: this.state.contador + valor, seleccionPrevia: id });
        break;
      case "2a":
      case "3a":
      case "4a":
        const valor2 = id === "A" ? 2 : 3;
        this.state.historial.push(id);
        this.setState({ contador: this.state.contador + valor2, seleccionPrevia: id });
        break;
      default:
        Swal.fire({
          title: '¿Te gustaría volver a empezar?',
          showDenyButton: true,
          confirmButtonText: 'Sip!',
          denyButtonText: `Nop, gracias`,
        }).then((result) => {
          if (result.isConfirmed) {
            this.setState({ contador: 0, seleccionPrevia: "", historial: [] })
          } else if (result.isDenied) {
            Swal.fire({ title: 'Fin.', imageUrl: 'https://lh3.googleusercontent.com/proxy/6erpHCkfLkft7d6lXXCaWkSgSTcVs5Xrixz1-F_vfLY6B3C9vEpvJCxpdd6ZXWBDDlGLwAwmg0N-WwjyTdz_XX5uHYs', imageHeight: 300, imageWidth: 400 })
          }
        });
        break;
    }
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.contador !== this.state.contador) {
      this.setState({ aventuraActual: this.state.aventuras[this.state.contador] })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="layout">
          <h1 className="historia">{this.state.aventuraActual.historia}</h1>
          <Opciones
            opcionA={this.state.aventuraActual.opciones.a}
            opcionB={this.state.aventuraActual.opciones.b}
            onChange={this.handleSelected}
          />
          <Historial seleccionPrevia={this.state.seleccionPrevia} historial={this.state.historial} />
        </div>
      </div>
    );
  }
}

export default App;

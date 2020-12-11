import React, { Component } from 'react';
import './car.css';

class CarList extends Component{
  state = {
    newCar: '',
    cars: []
  }

  componentDidMount(){
    const cars = localStorage.getItem('cars');

    if(cars){
      this.setState({ cars: JSON.parse(cars)});
    }
  }

  componentDidUpdate(_, prevState){
    if(prevState.cars !== this.state.cars){
      localStorage.setItem('cars', JSON.stringify(this.state.cars));
    }
  }

  handleInputChange = e => {
    this.setState({ newCar: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      cars: [...this.state.cars, this.state.newCar],
      newCar: '',
    })
  }

  handleDelete = e =>{
    this.setState({ cars: this.state.cars.filter(c => c !== e)})
  }

  render(){
    return(
      <>
      <nav>
       <div class="item">
        <input type="checkbox" id="check1"/>
        <label for="check1">Carros</label>
        <ul>
            {this.state.cars.map(car => 
            <li key={car}><a>{car}</a>
            <button onClick={() => this.handleDelete(car)}>excluir</button>
            </li>
            )}
        </ul> 
       </div>
    </nav>

    <form onSubmit={this.handleSubmit}>
    <input type="text" onChange={this.handleInputChange}/>
    <button type="submit">Enviar</button>
    </form>

    </>
    )
  }

}

export default CarList;


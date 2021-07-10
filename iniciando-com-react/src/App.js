import logo from './logo.svg';
import React from 'react';

/*
class App extends React.Component
{
    state = {
        nome : ''
    }

    // fazer bind da funcao
    // constructor()
    // {
    //     super()
    //     this.modificarNome = this.modificarNome.bind(this)
    // }

    // modificarNome(event){
    //     this.setState({
    //         nome: event.target.value
    //     })
    // }


    modificarNome = (event) => {
        this.setState({
            nome: event.target.value
        })
    }

    criaComboBox = () =>
    {
        const opcoes = ["Fulano", "Ciclano"];
        const comboBoxOpcoes = opcoes.map( opcao => <option key={opcao}>{opcao}</option> )

        return(
            <select>
                {comboBoxOpcoes}
            </select>
        )
    }

    componentDidMount() {
        console.log("Executou o componentDidMount")
    }

    render() {
        console.log("Executou o render")
        const MeuComboBox = () => this.criaComboBox()

        return(
            <>
                <input type="text" value={this.state.nome} onChange={this.modificarNome}/>
                <h1>Hello {this.state.nome}, NomeProps { this.props.nomeProps } </h1>
                <MeuComboBox/>
            </>
        )
    }
}
*/

function App(props)
{

    const modificarNome = (event) =>
    {
        console.log(event.target.value)
    }

    const criaComboBox = () =>
    {
        const opcoes = ["Fulano", "Ciclano"];
        const comboBoxOpcoes = opcoes.map( opcao => <option key={opcao}>{opcao}</option> )

        return(
            <select>
                {comboBoxOpcoes}
            </select>
        )
    }

    console.log("Executou o render")
    const MeuComboBox = () => criaComboBox()

    return(
        <>
            <input type="text" className="texto-centralizado" value={props.nomeProps} onChange={modificarNome}/>
            <h1>Hello  { props.nomeProps } </h1>
            <MeuComboBox/>
        </>
    )

}


export default App;


import React from 'react';
import Card from '../../components/card';
import ProdutoService from "../../app/produtoService";
import { withRouter } from 'react-router-dom';


const estadoIniciao = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
    sucesso: false,
    errors: [],
    atualizando: false
};

class CadastroProduto extends React.Component
{
    state = estadoIniciao;

    constructor() {
        super();
        this.service = new ProdutoService();
    }

    onChange = (event) =>
    {
        const valor = event.target.value;
        const nomeDoCampo = event.target.name;
        this.setState({ [nomeDoCampo]:valor })
    }

    onSubmit = (event) =>
    {
        event.preventDefault();
        const produto = {
            nome: this.state.nome,
            sku: this.state.sku,
            descricao: this.state.descricao,
            preco: this.state.preco,
            fornecedor: this.state.fornecedor
        }

        try {
            this.service.salvar(produto)
            this.limpaCampos()
            this.setState({ sucesso: true })
        }catch (erro) {
            const errors = erro.errors
            this.setState({ errors: errors })
        }

    }

    limpaCampos = () =>
    {
        this.setState(estadoIniciao)
    }

    componentDidMount() {
        const sku = this.props.match.params.sku

        if(sku)
        {
            const resultado = this.service.obterProdutos().filter( produto => produto.sku === sku );

            if(resultado.length === 1)
            {
                const produtoEncontrado = resultado[0];
                this.setState({ ...produtoEncontrado, atualizando: true });
            }
        }

    }


    render() {
        return(
            <Card header={this.state.atualizando ? 'Atualização de Produto' : 'Cadastro de Produto'}>
                <form id="frmProduto" onSubmit={this.onSubmit}>

                    { this.state.sucesso &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Cadastrado com sucesso!</strong>
                    </div>
                    }

                    { this.state.errors.length > 0 &&

                    this.state.errors.map( msg => {
                        return(
                            <div className="alert alert-dismissible alert-danger">
                                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                                <strong>ERRO!</strong>{msg}
                            </div>
                        )
                    })
                    }

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome: *</label>
                                <input name="nome" type="text" className="form-control" value={this.state.nome} onChange={this.onChange}/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>SKU: *</label>
                                <input name="sku" type="text" className="form-control" value={this.state.sku} onChange={this.onChange}  disabled={this.state.atualizando}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea name="descricao" className="form-control" value={this.state.descricao} onChange={this.onChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço: *</label>
                                <input name="preco" type="text" className="form-control" value={this.state.preco} onChange={this.onChange}/>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Fornecedor: *</label>
                                <input name="fornecedor" type="text" className="form-control" value={this.state.fornecedor} onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success">
                                { this.state.atualizando ? 'Atualizar' : 'Salvar' }
                            </button>
                        </div>

                        <div className="col-md-1">
                            <button onClick={this.limpaCampos} type="button" className="btn btn-primary">Limpar</button>
                        </div>
                    </div>

                </form>
            </Card>
        )
    }
}

export default withRouter(CadastroProduto);
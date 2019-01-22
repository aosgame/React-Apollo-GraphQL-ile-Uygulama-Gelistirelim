import React,{Component} from 'react';
import {graphql,compose} from 'react-apollo';


//queries
import {yazarlarGetirQuery,kitapEkleMutation, kitaplarGetirQuery} from '../queries/queries';

class KitapEkle extends Component{
    constructor(props){
        super(props)
        this.state={
            isim:'',
            tur:'',
            yazarId:''
        }
    }
    
    yazarlarGoster(){
        
        var veri=this.props.yazarlarGetirQuery;
        if(veri.loading){
            return (<option disabled>Yazarlar Yükleniyor</option>)
        }
        else{
            return veri.yazarlar.map(yazar=>{
                return (
                    <option key={yazar.id} value={yazar.id}>{yazar.isim}</option>
                )
            });
        }
    }
    formGonder(e){
        e.preventDefault();
        //console.log(this.state);
        this.props.kitapEkleMutation({
            variables:{
                isim:this.state.isim,
                tur:this.state.tur,
                yazarId:this.state.yazarId
            },
            refetchQueries:[{query:kitaplarGetirQuery}]
        });
        
    }
    render(){
        return(
            <form id="add-book" onSubmit={this.formGonder.bind(this)}>
                <div className="field">
                    <label>Kitap Adı:</label>
                    <input type="text" onChange={(e)=>this.setState({isim:e.target.value})}/>
                </div>
                <div className="field">
                    <label>Tür:</label>
                    <input type="text" onChange={(e)=>this.setState({tur:e.target.value})} />
                </div>
                <div className="field">
                    <label>Yazar Adı:</label>
                    <select onChange={(e)=>this.setState({yazarId:e.target.value})}>
                        <option>Yazar Seç</option>
                        {this.yazarlarGoster()}
                    </select>
                </div>
                <button>Ekle</button>
            </form>
        )
    }
}

export default compose(
    graphql(yazarlarGetirQuery,{name:"yazarlarGetirQuery"}),
    graphql(kitapEkleMutation,{name:"kitapEkleMutation"})
)(KitapEkle);
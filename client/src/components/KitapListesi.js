import React,{Component} from 'react';
import {graphql} from 'react-apollo';
import KitapDetay from './KitapDetay';

//queries
import {kitaplarGetirQuery} from '../queries/queries';



class KitapListesi extends Component{
    constructor(props){
        super(props);
        this.state={
            secilmis:null
        }

    }
    kitaplarGoster(){
        var veri=this.props.data;
        if(veri.loading){
            return (<div>Kitaplar Yükleniyor</div>)
        }else{
            return veri.kitaplar.map(kitap=>{
                return(
                    <li key={kitap.id} onClick={(e)=>{this.setState({secilmis:kitap.id})}}>{kitap.isim}</li>
                )
            });
        }
    }
    render(){
        // console.log(this.props);
        
        return(
            <div>
                <ul id="book-list">
                    {this.kitaplarGoster()}
                </ul>
                <KitapDetay kitapId={this.state.secilmis} />
            </div>
        )
    }
}

export default graphql(kitaplarGetirQuery) (KitapListesi);
import React,{Component} from 'react';
import {graphql} from 'react-apollo';

import {kitapGetirQuery} from '../queries/queries';

class KitapDetay extends Component{
    kitayDetaylarGoster(){
        const {kitap}=this.props.data;
        if(kitap){
            return(
                <div>
                    <h2>{kitap.isim} Kitabının Detayları</h2>
                    <p><b>Türü:</b> {kitap.tur}</p>
                    <p><b>Yazarı:</b> {kitap.yazar.isim}</p>
                    <p>Yazarın diğer kitapları</p>
                    <ul className="other-books">
                        {
                            kitap.yazar.kitaplar.map(k=>{
                                return <li key={k.id}>{k.isim}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }else{
            return(
                <div>Detaylar için kitap seçiniz</div>
            )
        }
    }
    render(){
        //console.log(this.props.kitapId); 
        return(
            <div id="book-details">
                {this.kitayDetaylarGoster()}
            </div>
        )
    }
}

export default graphql(kitapGetirQuery,{
    options:(props)=>{
        return {
            variables:{
                id:props.kitapId
            }
        }
    }
}) (KitapDetay);
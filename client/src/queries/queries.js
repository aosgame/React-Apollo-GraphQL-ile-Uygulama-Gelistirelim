import {gql} from 'apollo-boost';

const kitaplarGetirQuery=gql`

    {
        kitaplar{
            isim
            tur
            id
        }
    }

`

const yazarlarGetirQuery=gql`

    {
        yazarlar{
            isim
            id
        }
    }

`

const kitapEkleMutation=gql`

    mutation($isim:String!,$tur:String!,$yazarId:ID!){
        kitapEkle(isim:$isim,tur:$tur,yazarId:$yazarId){
            isim
            id
        }
    }
`

const kitapGetirQuery=gql`

query($id:ID){
    kitap(id:$id){
        id
        isim
        tur
        yazar{
            id
            isim
            yas
            kitaplar{
                isim
                id
            }
        }
    }
}


`

export {kitaplarGetirQuery,yazarlarGetirQuery,kitapEkleMutation,kitapGetirQuery};
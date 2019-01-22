const graphql=require('graphql');
const _=require('lodash');
const Kitap=require('../models/kitap');
const Yazar=require('../models/yazar');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
}=graphql;


const KitapTip=new GraphQLObjectType({
    name:'Kitap',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        tur:{type:GraphQLString},
        yazar:{
            type:YazarTip,
            resolve(parent,args){
                //console.log(parent);
                //return _.find(yazarlar,{id:parent.yazarId})
                return Yazar.findById(parent.yazarId)
            }
        }
    })
});

const YazarTip=new GraphQLObjectType({
    name:'Yazar',
    fields:()=>({
        id:{type:GraphQLID},
        isim:{type:GraphQLString},
        yas:{type:GraphQLInt},
        kitaplar:{
            type:new GraphQLList(KitapTip),
            resolve(parent,args){
                //return _.filter(kitaplar,{yazarId:parent.id})
                return Kitap.find({yazarId:parent.id})
            }
        }
    })
})

const RootQuery=new GraphQLObjectType({
    name:'RootQueryTip',
    fields:{
        kitap:{
            type:KitapTip,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //db den gelen veri
                //return _.find(kitaplar,{id:args.id});
                return Kitap.findById(args.id)
            }
        },
        yazar:{
            type:YazarTip,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(yazarlar,{id:args.id})
                return Yazar.findById(args.id)
            }
        },
        kitaplar:{
            type:new GraphQLList(KitapTip),
            resolve(parent,args){
                //return kitaplar
                return Kitap.find({})
            }
        },
        yazarlar:{
            type:new GraphQLList(YazarTip),
            resolve(parent,args){
                //return yazarlar
                return Yazar.find({})
            }
        }
    }
});

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        yazarEkle:{
            type:YazarTip,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                yas:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let yazar=new Yazar({
                    isim:args.isim,
                    yas:args.yas
                });

               return yazar.save();
            }
        },
        kitapEkle:{
            type:KitapTip,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                tur:{type:new GraphQLNonNull(GraphQLString)},
                yazarId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let kitap=new Kitap({
                    isim:args.isim,
                    tur:args.tur,
                    yazarId:args.yazarId
                });

                return kitap.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})
const express=require('express');
const app=express();
const graphqlHTTP=require('express-graphql');
const schema=require('./schema/schema');
const mongoose=require('mongoose');
const cors=require('cors');

app.use(cors());

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}));

mongoose.connect('mongodb://aosgames:aosgames1@ds161224.mlab.com:61224/udemy-gql-app');

mongoose.connection.once('open',()=>{
    console.log('mLab baglantı başarılı');
    
})


app.listen(4000,()=>{

    console.log('4000 nolu port dinleniyor.');
    

});
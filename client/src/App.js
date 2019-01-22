import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


//componentler
import KitapListesi from './components/KitapListesi';
import KitapEkle from './components/KitapEkle';

const client=new ApolloClient({
    uri:'http://localhost:4000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Okunacak Kitaplar Listesi</h1>
          <KitapListesi />
          <KitapEkle />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

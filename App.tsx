import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import PokemonCard from './PokemonCard';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [searchResult, setSearchResult] = useState(<></>);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const capitalizeFirstChar = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const listPokemons = async (isSearching: boolean) => {
    let urlToFetch = !isSearching || !inputValue ? `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}` : `https://pokeapi.co/api/v2/pokemon/${inputValue}`;

    try {
      await fetch(urlToFetch)
        .then(Response => Response.json())
        .then((data) => {
          console.log(data);
          
          let retrievedPokemons = [];

          if (!isSearching) {
            data.results.forEach((pokemon: String) => {
              retrievedPokemons.push(pokemon);
            });
          } else {
            retrievedPokemons.push(data);
          }

          setPokemons(retrievedPokemons);
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listPokemons(false);
  }, [offset]);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        <Image source={{ uri: Image.resolveAssetSource(require('./assets/Pokemon_Logo.jpg')).uri }} style={styles.logo} />
        <TextInput style={styles.input} placeholder='Pesquise um Pokemón' onChangeText={(value) => setInputValue(value)} />
        <TouchableOpacity style={styles.searchBtn} onPress={() => listPokemons(true)}><Text style={styles.btnTxt}>Buscar</Text></TouchableOpacity>

        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemonName={pokemon.name} capitalizeFirstChar={capitalizeFirstChar} />
        ))}

      </ScrollView>
      <TouchableOpacity style={[styles.btn, { left: 10 }]} onPress={() => {
        if (offset >= 10) {
          setOffset(offset - 10);
        }
      }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, { right: 10 }]} onPress={() => {
        if (offset <= 1290) {
          setOffset(offset + 10);
        }
      }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{'>'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
    gap: 20
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10
  },
  img: {
    height: 150,
    width: 150
  },
  input: {
    borderBottomWidth: 3,
    borderColor: '#3d69b2'
  },
  btn: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: 'crimson',
    paddingInline: 15,
    paddingBlock: 5,
    borderRadius: 10
  },
  searchBtn: {
    backgroundColor: '#fecd04',
    padding: 10,
    borderRadius: 10
  },
  btnTxt: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  txt: {
    fontWeight: 'bold'
  },
  logo: {
    alignSelf: 'center',
    width: 240,
    height: 88
  }
});
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, Easing, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [pokemons, setPokemons] = useState([]);
  const [name, setName] = useState('');
  const [searchResult, setSearchResult] = useState(<></>);
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [sprite, setSprite] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const capitalizeFirstChar = (string: String) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const listPokemons = async () => {
    try {
      await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)
      .then(Response => Response.json())
      .then((data) => {
        let pokemons = [];

        data.results.forEach((pokemon: String) => {
          pokemons.push(pokemon);
        });

        setPokemons(pokemons);
      });
    } catch (error) {
      alert('Erro ao carregar pokemons :c');
    }
  }

  useEffect(() => {
    listPokemons();
  }, [offset])

  const searchPokemon = async () => {
    if (inputValue) {
      try {
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}/`)
        .then(Response => Response.json())
        .then((data) => {
          setName(capitalizeFirstChar(data.name));
          setType(capitalizeFirstChar(data.types[0].type.name));
          setHeight(data.height + ' dm');
          setWeight(data.weight + ' unidade desconhecida');
          setSprite(data.sprites.front_default);
        })
        .catch(() => {
          Alert.alert('Oops!', 'Pokemón não encontrado :/');
        });
      } catch (error) {
        Alert.alert('Erro!', 'Erro na pesquisa :c');
      }
    } else {
      Alert.alert('Calma lá', 'Insira um pokemón primeiro');
    }
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="auto" />
        <Image src='https://imguscdn.gamespress.com/cdn/files/PokemonAmerica/2019/07/09125735-7b00e266-d991-41da-9267-843e49ce62a7/Pokemon_Logo.jpg?w=240&mode=max&otf=y&quality=90&format=jpg&bgcolor=white&sky=943c262a0f612e64318817262f0963f21d043f231ba7bf27dea206304c70e2c7' style={styles.logo}/>
        <TextInput style={styles.input} placeholder='Pesquise um Pokemón' onChangeText={(value) => setInputValue(value)} />
        <TouchableOpacity style={styles.searchBtn} onPress={searchPokemon}><Text style={styles.btnTxt}>Buscar</Text></TouchableOpacity>
        <View style={styles.wrapper}>
          {
            name ? 
            <>
              <View>
                <Text><Text style={styles.txt}>Nome: </Text>{name}</Text>
                <Text><Text style={styles.txt}>Tipo: </Text>{type}</Text>
                <Text><Text style={styles.txt}>Altura: </Text>{height}</Text>
                <Text><Text style={styles.txt}>Peso: </Text>{weight}</Text>
              </View>
              <Image src={sprite} style={styles.img} />        
            </>
            :
            <Text style={styles.txt}>Pesquise um pokemón para ver suas informações aqui</Text>
          }
        </View>

        {pokemons.map((pokemon, index) => (
          <View key={index} style={styles.box}>
              <Text style={styles.txt} key={'txt' + index}>{capitalizeFirstChar(pokemon.name)}</Text>
              <Image key={'img' + index} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1}.png`} style={styles.img} />        
          </View>
        ))}

      </ScrollView>
      <TouchableOpacity style={[styles.btn, {left: 10}]} onPress={() => {
        if (offset >= 10) {
          setOffset(offset - 10);
        }
      }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>{'<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, {right: 10}]} onPress={() => {
        if (offset <= 1290) {
          setOffset(offset + 10);
        }
      }}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>{'>'}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
    gap: 10
  },
  wrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 10
  },
  box: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    paddingInline: 20,
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
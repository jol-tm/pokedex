import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "./firebaseConfig";
import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";

export default function PokemonCard({ pokemonName, capitalizeFirstChar }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState(pokemonName);
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [isFavorited, setFavorited] = useState(false);

  const getFavorites = async () => {
    const docRef = doc(db, 'users', String('JSrDAJpU26XUr1to8yGt'));
    return (await getDoc(docRef)).data().favoritedPokemons;
  }

  const updateFavorite = async () => {
    const favoritedPokemons = getFavorites();

    try {
      const docRef = doc(db, 'users', String('JSrDAJpU26XUr1to8yGt'));
      const favoritedPokemons = (await getDoc(docRef)).data().favoritedPokemons;
      
      if (isFavorited === false) {
        const updatedFavorites = [...favoritedPokemons, name];
        
        await updateDoc(docRef, {
          'favoritedPokemons': updatedFavorites
        });
      } else {
        const updatedFavorites = favoritedPokemons.filter((favoritedPokemon: string) => favoritedPokemon !== name);
        
        await updateDoc(docRef, {
          'favoritedPokemons': updatedFavorites
        })

      }

      setFavorited(!isFavorited);
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    const getPokemonData = async () => {
      try {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
          .then(Response => Response.json())
          .then((data) => {
            setId(data.id);
            setName(capitalizeFirstChar(data.name));
            setType(capitalizeFirstChar(data.types[0].type.name));
            setHeight(String(data.height / 10).replace('.', ',') + ' m');
            setWeight(String(data.weight / 10).replace('.', ',') + ' kg');
          })
      } catch (error) {
        console.log(error);
      }
    }
    getPokemonData();
  }, [pokemonName]);

  return (
    <View style={styles.box}>
      <View>
        <Text><Text style={styles.txt}>Nome: </Text>{name}</Text>
        <Text><Text style={styles.txt}>Tipo: </Text>{type}</Text>
        <Text><Text style={styles.txt}>Altura: </Text>{height}</Text>
        <Text><Text style={styles.txt}>Peso: </Text>{weight}</Text>
      </View>
      <Image source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png` }} style={styles.img} />
      <TouchableOpacity onPress={() => updateFavorite()}>
        <Image source={{
          uri: isFavorited ? Image.resolveAssetSource(require('./assets/heart_favorited.png')).uri : Image.resolveAssetSource(require('./assets/heart.png')).uri
        }} style={styles.favoriteIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightgreen',
    paddingInline: 10,
    borderRadius: 10,
    padding: 10
  },
  img: {
    height: 100,
    width: 100,
    margin: -40
  },
  txt: {
    fontWeight: 'bold'
  },
  favoriteIcon: {
    width: 24,
    height: 24
  }
})

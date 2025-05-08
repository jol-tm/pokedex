import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function PokemonCard({ pokemonName, capitalizeFirstChar }) {
  const [id, setId] = useState(0);
  const [name, setName] = useState(pokemonName);
  const [type, setType] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

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
      <Image source={{ uri: Image.resolveAssetSource(require('./assets/heart_plus.png')).uri }} style={styles.favoriteIcon} />
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
    height: 150,
    width: 150,
    margin: -40
  },
  txt: {
    fontWeight: 'bold'
  },
  favoriteIcon: {
    width: 32,
    height: 32
  }
})
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState} from 'react'
import Tts from 'react-native-tts';

export default function App() {
  const [newWord, setNewWord] = useState("");
  const [checkedWord, setCheckedWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [example, setExample] = useState("");

  const searchWord = (enteredWord: any) => {
    setNewWord(enteredWord);
  }

  const getInfo = () => {
    var url = 'http://api.dictionaryapi.dev/api/v2/entries/en/' + newWord

    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        var word = response[0].word
        setCheckedWord(word);

        var def = response[0].meanings[0].definitions[0].definition
        setDefinition(def);

        var example = response[0].meanings[0].definitions[0].example
        setExample(example);
      })
  }

  const speak = () => {
    Tts.speak(checkedWord)
  }

  const clear = () => {
    setNewWord("")
    setCheckedWord("")
    setDefinition("")
    setExample("")
  }


  return (
    <View style={styles.container}>
      <ImageBackground 
        style={{flex: 1}}
        resizeMode='cover'
        source={require("./assets/background.png")}
      >

        <View style={{flex: 0.2}}>
          <Image 
          style={styles.imageDesign}
            source={require("./assets/book1.png")}
          />
        </View>

        <View style={{flex: 0.8}}>
          <View style={{justifyContent: "center", alignItems: "center"}}>
            <TextInput
            style={styles.inputBox}
            placeholder='Search a word'
            placeholderTextColor={"rgba(0,0,0,0.7)"}
            textAlign='center'
            clearButtonMode='always'
            multiline={true}
            onChangeText={searchWord}
            value={newWord}
            ></TextInput>

          <View style={{
            flexDirection: "row",
            justifyContent: 'space-between',
            width: "70%",
            marginTop: 20,
            marginBottom: 20
            }}>
            <TouchableOpacity style={styles.buttonDesign}
              onPress={() => {
                getInfo()
              }}
            >
              <Text style={styles.textDesign}>Go !</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonDesign}
              onPress={() => {
                clear()
              }}
            >
              <Text style={styles.textDesign}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor: "transparent"}}
            onPress={() => {
              speak()
            }}
            >
              <Image
              style={styles.speakerButton}
                source={require("./assets/speaker.png")}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.textDesign}>Entered Word: {checkedWord}</Text>
            <Text style={styles.textDesign}>Definition: {definition}</Text>
            <Text style={styles.textDesign}>Example: {example}</Text>
          </View>

          </View>
        </View>
      </ImageBackground>

      <StatusBar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  imageDesign: {
    width: "50%",
    height: "130%",
    marginLeft: 90,
    marginTop: 40
  },
  inputBox: {
    width: "80%",
    height: 50,
    borderWidth: 5,
    borderColor: 'rgba(80, 235, 235, 1)',
    marginTop: 100,
    fontSize: 25
  },
  speakerButton: {
    width: 60,
    height: 50,
  },
  buttonDesign: {
    backgroundColor: "rgba(80, 235, 236, 0.3)",
    width: "30%",
    height: 60,
    borderColor: "#000",
    borderRadius: 20,
  },
  textDesign: {
    fontSize: 25,
    alignSelf: "center",
    padding: 10,
  }
})
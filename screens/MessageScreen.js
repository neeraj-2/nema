import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
//import dialogflow_v2 package
import {Dialogflow_V2} from 'react-native-dialogflow';

//import dialoflowconfig from env.js
import {dialogflowConfig} from '../env.js';

const botavatar = require ('../assets/avatar.jpg');

const BOT = {
  _id: 2,
  name: 'Mr. Bot',
  avatar: botavatar,
};

export default class App extends Component {
  componentDidMount () {
    Dialogflow_V2.setConfiguration (
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }

  onSend (messages = []) {
    this.setState (previousState => ({
      messages: GiftedChat.append (previousState.messages, messages),
    }));
    let message = messages[0].text;

    Dialogflow_V2.requestQuery (
      message,
      result => this.handleGoogleResponse (result),
      error => console.log (error)
    );
  }

  handleGoogleResponse (result) {
    console.log ('result', result);
    let text = result.queryResult.fulfillmentText;
    this.sendBotResponse (text);
  }

  sendBotResponse (text) {
    let msg;

    if (text.includes ('#life')) {
      msg = {
        _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date (),
        user: BOT,
        image: 'https://cdn.britannica.com/69/155469-131-14083F59/airplane-flight.jpg',
      };
    }
    else if(text.includes('magic')){
      msg = {
        _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date (),
        user: BOT,
        image: 'https://www.w3schools.com/w3css/img_lights.jpg',
      };
    }else if(text.includes('show u the same')){
      msg = {
        _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date (),
        user: BOT,
        isOptions: true,
        data:[
          {
            title: 'Streamer',
            image: 'https://travel.mqcdn.com/mapquest/travel/wp-content/uploads/2020/06/GettyImages-636982952-e1592703310661.jpg',
          },
          {
            title: 'View',
            //grab some image from google
            image: 'https://www.w3schools.com/w3css/img_lights.jpg',
            
          }

        ]
      };

    }
    else if (text.includes ('joined')) {
      msg = {
        _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date (),
        user: BOT,
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Yeah',
              value: 'Yeah',
              bColor: '#00BFFF',
              bgColor: '#00BFFF',
            },
            {
              title: 'Nah',
              value: 'Nope',
              bColor: '#00BFFF',
              bgColor: '#00BFFF',
            },
          ],
        },
      };
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text: text,
        createdAt: new Date (),
        user: BOT,
      };
    }
    this.setState (previousState => ({
      messages: GiftedChat.append (previousState.messages, [msg]),
    }));
  }

  onQuickReply (quickReply) {
    console.log (quickReply);
    this.setState (previousState => ({
      messages: GiftedChat.append (previousState.messages, quickReply),
    }));
    let message = quickReply[0].value;
    console.log ('ye hai reply', message);
    Dialogflow_V2.requestQuery (
      message,
      result => this.handleGoogleResponse (result),
      error => console.log (error)
    );
  }

  renderBubble =(props) =>{
    
    if(props.currentMessage.isOptions){
      return(
       <ScrollView style={{backgroundColor:'white'}}
        horizontal={true}
       >
         {props.currentMessage.data.map((item)=>{
            return(
              <Card key={item.title}>
                  <Card.Image 
                    style={{width:220,height:110}}
                    resizeMode='cover'
                  source={{uri: item.image}}></Card.Image>
                  <Card.Divider/>
                  <Card.Title>
                    {item.title}
                  </Card.Title>
                  <Card.Divider/>
                  <Button
                    title="Choose"
                    style={{height: 35}}
                    onPress={()=>{
                      this.sendBotResponse(item.title)
                    }}
                  />
                  </Card>
            )

         })}
       </ScrollView>
      )
    }
    else
    {
      return(
        <Bubble {...props} />
      )
    }
  }


  state = {
    messages: [
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date (),
      },
    ],
    id: 1,
    name: '',
  };
  render () {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={message => this.onSend (message)}
          user={{
            _id: this.state.id,
          }}
          onQuickReply={quickReply => this.onQuickReply (quickReply)}
          renderBubble={this.renderBubble}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    backgroundColor: '#00bfff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  chatBox: {
    width: '100%',
    height: '80%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBoxText: {
    fontSize: 20,
    color: '#000',
  },
  chatBoxTextBot: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser2: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser3: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser4: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser5: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser6: {
    fontSize: 20,
    color: '#00bfff',
  },
  chatBoxTextUser7: {
    fontSize: 20,
    color: '#00bfff',
  },
});

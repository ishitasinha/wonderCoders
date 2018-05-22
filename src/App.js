import React, { Component } from 'react';
import './css/main.css';
import Header from './components/header.js';
import BotMessage from './components/botMessage';
import UserMessage from './components/userMessage';
import environment from './const/env';
import {ApiAiClient} from './../node_modules/api-ai-javascript/es6/ApiAiClient';

let token = environment.dialogFlow.reactBot,
    client = new ApiAiClient({accessToken: token}),
    recognition = new window.webkitSpeechRecognition();
let messageList = [];
let priceOnion = 10, priceTomato = 11, priceLemon = 12, priceCabbage = 13;
let numOnion = 0, numTomato = 0, numLemon = 0, numCabbage = 0;
let totalPrice = 0;
let botMsg = {};
let cartItems = [];

class App extends Component {

    constructor() {
        super();
        this.state = {
            Output: messageList,
            cart: cartItems
        }

        recognition.start();
        recognition.continuous = true;
        recognition.interimResults = false;
        console.log(messageList);
    }

    botListener(){
        recognition.onresult = (event) => {
            recognition.stop();

            let userMsg = event.results[0][0]["transcript"];
            messageList.push(<div style={{backgroundColor:'lightblue'}}>{"USER: " + userMsg + "\n"}</div>);
            console.log("USER: " + userMsg);

            client.textRequest(userMsg).then(res => {

                botMsg = res.result.fulfillment.speech;

                //checking item
                if(botMsg.match(/one kg of onion/i) || botMsg.match(/one kg of lemon/i) || botMsg.match(/one kg of cabbage/i) || botMsg.match(/one kg of tomato/i))
                {
                    if(botMsg.match("onion"))
                    {    numOnion = 1;
                        cartItems.push(<div>{"Item: Onions Quantity: 1 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("lemon"))
                    {
                        numLemon = 1;
                        cartItems.push(<div>{"Item: Lemons Quantity: 1 kg Price: Rs." +priceLemon + "\n"}</div>);
                    }
                    else if(botMsg.match("cabbage")) {
                        numCabbage = 1;
                        cartItems.push(<div>{"Item: Cabbage Quantity: 1 kg Price: Rs." +priceCabbage +"\n"}</div>);
                    }
                    else if(botMsg.match("tomato")) {
                        numTomato = 1;
                        cartItems.push(<div>{"Item: Tomatoes Quantity: 1 kg Price: Rs." +priceTomato +"\n"}</div>);
                    }
                }
                else if(botMsg.match(/two kg of onion/i) || botMsg.match(/two kg of lemon/i) || botMsg.match(/two kg of cabbage/i) || botMsg.match(/two kg of tomato/i))
                {
                    if(botMsg.match("onion"))
                    {    numOnion = 2;
                        cartItems.push(<div>{"Item: Onions Quantity: 2 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("lemon")) {
                        numLemon = 2;
                        cartItems.push(<div>{"Item: Onions Quantity: 2 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("cabbage"))
                    {   numCabbage = 2;
                        cartItems.push(<div>{"Item: Onions Quantity: 2 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("tomato"))
                    {  numTomato = 2;
                        cartItems.push(<div>{"Item: Onions Quantity: 2 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                }
                else if(botMsg.match(/three kg of onion/i) || botMsg.match(/three kg of lemon/i) || botMsg.match(/three kg of cabbage/i) || botMsg.match(/three kg of tomato/i))
                {
                    if(botMsg.match("onion")) {
                        numOnion = 3;
                        cartItems.push(<div>{"Item: Onions Quantity: 3 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("lemon")) {
                        numLemon = 3;
                        cartItems.push(<div>{"Item: Onions Quantity: 3 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("cabbage")) {
                        numCabbage = 3;
                        cartItems.push(<div>{"Item: Onions Quantity: 3 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                    else if(botMsg.match("tomato")) {
                        numTomato = 3;
                        cartItems.push(<div>{"Item: Onions Quantity: 3 kg Price: Rs." +priceOnion + "\n"}</div>);
                    }
                }
                else if(botMsg.match(/do you want to checkout/i)){
                    if(totalPrice === 0)
                        botMsg = "Apologies, I tried my best but we don't have that yet, do you want to order anything else?";
                    else
                        botMsg = "Apologies, I tried my best but we don't have that yet, do you want to checkout?";
                }

                if(botMsg.match(/billed/i))
                    botMsg += "Your total is worth " + totalPrice + " rupees! I'll ask one of my human friends to fetch your items!";
                totalPrice = numOnion*priceOnion + numTomato*priceTomato + numCabbage*priceCabbage + numLemon*priceLemon;
                console.log(totalPrice);

                console.log("BOT: " + botMsg);

                let sentence = new SpeechSynthesisUtterance(botMsg);

                let wallme = window.speechSynthesis;
                wallme.speak(sentence);

                setTimeout(1000);
                recognition.start();

                messageList.push(<div style={{backgroundColor:'lightblue'}}>{"WALLMI: " + botMsg + "\n"}</div>)
                //_setState();
            });
            this.setState({
                output: messageList,
                cart: cartItems
            });
            console.log("state" + this.state.output);
        };

    }
    componentWillMount(){
        this.botListener(this.setState.bind(this));
    }
    componentWillUpdate() {
        this.botListener(this.setState.bind(this));
    }
  render() {
    return (
      <div className="place-holder">
          <div className="header"><i clasNames="fab fa-odnoklassniki"></i>{"  WallMi - Your personal shopping assistant"}</div>
          <div className="page-body">
              <div className="page-body__cartContainer">
                  <div className="cartHeader"><i className="fas fa-shopping-cart"></i> YOUR E-CART</div>
                  <div className="total">{"The total Price is: " + totalPrice + " Rupees"}</div>
                  <UserMessage message={this.state.cart}/>
              </div>
              <div className="page-body__messageContainer">
                  <div className="containerHeader"><i class="fas fa-comments"></i> CONVERSATION</div>
                  <BotMessage message={this.state.output}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;

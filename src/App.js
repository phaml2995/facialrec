import React, {Component} from 'react';
import Navigation from './components/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition';
import Rank from './components/Rank';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'dd1072f9c45a43539be2bf80fbb73880'
});


const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 200
      }
    }
  },

  move:{
    enable:true,
    speed: 6
  }

    
}

class App extends Component {
  constructor(){
    super();
    this.state ={
      input: '',
      imageURL: '',
      box : {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onRouteChange =(route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    } 
      this.setState({route: route});
    
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
 }

  render(){
    const {isSignedIn,box,imageURL,route} = this.state;
    return (
      <div className="App">
         <Particles className = 'particles'
          params= {particlesOptions}
             />
        <Navigation isSignedIn = {isSignedIn} onRouteChange = {this.onRouteChange} />
        {route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
            <FaceRecognition box = {box} imageURL = {imageURL}/>
          </div>
        : (
            route === 'signin'
            ? <SignIn  onRouteChange = {this.onRouteChange} />
            : <Register onRouteChange = {this.onRouteChange} />
          )
        
        
      }
      </div>
    );
  }
}
export default App;

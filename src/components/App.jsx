
import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { AppContainer } from "./App.styled";

export class App extends Component {

  state = {
  
    searchValue: "",
    
  }
  

  onSubmit = value=> {
      
      this.setState({ searchValue: value })
  };
  

  render() {
      
      return (<AppContainer>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery searchTerm={this.state.searchValue}/>
      </AppContainer>
      );
    }
  
  };

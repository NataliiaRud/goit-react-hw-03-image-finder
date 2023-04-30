
import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";

export class App extends Component {

  state = {
  
    searchValue: "",
    
  }
  

  onSubmit = value=> {
      
      this.setState({ searchValue: value })
  };
  
  // async componentDidUpdate(prevProps, prevState) {
  //   const { value, page } = this.state;
  //   if (prevState.searchValue !== this.state.value || prevState.page !== this.state.page) {
  //     this.setState({ status: 'pending' });
  //     try {
  //       const test = await getImages(value, page);
  //       console.log(test.hits);
  //       this.setState({ images: test.hits, status: 'resolved' })
  //     }
  //     catch (error) {
  //       this.setState({
  //         status: 'rejected',
  //       });
  //     }
  //   }
  // }
  render() {
      
      return (<div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery searchTerm={this.state.searchValue}/>
      </div>
      );
    }
  
  };

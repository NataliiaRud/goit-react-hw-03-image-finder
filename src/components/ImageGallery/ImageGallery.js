import { Component } from 'react';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryWrapper } from './ImageGallery.styled';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    loading: false,
    status: 'idle',
    itemModal: { img: '', tags: '' },
    error: null,
    totalPages: 0,
    isModalShown: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchTerm !== this.props.searchTerm ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          status: 'pending',
          loading: true,
          page:
            prevProps.searchTerm !== this.props.searchTerm
              ? 1
              : this.state.page,
        });
        const res = await getImages(this.props.searchTerm, this.state.page);
        if (res.data.totalHits === 0) {
          return this.setState({
            images: [],
            status: 'rejected',
          });
        }

        this.setState({
          images:
            prevProps.searchTerm === this.props.searchTerm
              ? [...prevState.images, ...res.data.hits]
              : [...res.data.hits],
          status: 'resolved',
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        {this.state.loading && <Loader />}
        <GalleryWrapper>
          {[...this.state.images].map(item => (
            <ImageGalleryItem item={item} key={item.id} />
          ))}
        </GalleryWrapper>
      </>
    );
  }
}

// {
//   [...this.state.images].map(image => (
//     <ImageGalleryItem
//       key={image.id}
//       imageData={image}
//       onImgClick={this.onModalShow}
//     ></ImageGalleryItem>
//   ));
// }

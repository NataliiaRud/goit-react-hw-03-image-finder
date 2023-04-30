import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryWrapper } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

const ERROR_MSG = 'Something went wrong';

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
            prevProps.searchTerm === this.props.searchTerm &&
            this.state.page > 1
              ? [...prevState.images, ...res.data.hits]
              : [...res.data.hits],
          status: 'resolved',
          totalPages: Math.floor(res.data.totalHits / 12),
        });
      } catch (error) {
        this.setState({ error: ERROR_MSG });
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  onModalDisplay = itemModal => {
    this.setState({ itemModal, isModalShown: true });
  };

  onModalClose = () => {
    this.setState({ isModalShown: false });
  };

  render() {
    return (
      <>
        {this.state.status === 'rejected' && (
          <span>Bad search request! Try again.</span>
        )}
        {this.state.loading && <Loader />}
        {this.state.error && <div>{this.state.error}</div>}
        <GalleryWrapper>
          {[...this.state.images].map(item => (
            <ImageGalleryItem
              onImageClick={this.onModalDisplay}
              item={item}
              key={item.id}
            />
          ))}
        </GalleryWrapper>
        {this.state.images.length > 0 &&
          this.state.status !== 'pending' &&
          this.state.page <= this.state.totalPages && (
            <Button onClick={this.loadMore}>Load More</Button>
          )}
        {this.state.isModalShown && (
          <Modal
            modalData={this.state.itemModal}
            onModalClose={this.onModalClose}
          />
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};

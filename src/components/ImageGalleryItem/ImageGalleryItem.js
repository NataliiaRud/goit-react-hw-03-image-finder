import PropTypes from 'prop-types';
import { GalleryCard, GalleryCardImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item, onImageClick }) => {
  const { largeImageURL, tags } = item;
  return (
    <GalleryCard
      onClick={e => {
        e.preventDefault();
        onImageClick({ largeImageURL, tags });
      }}
    >
      <GalleryCardImage src={item.webformatURL} alt={item.tags} />
    </GalleryCard>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
  onImageClick: PropTypes.func.isRequired,
};

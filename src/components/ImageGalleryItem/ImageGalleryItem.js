import PropTypes from 'prop-types';
import { GalleryCard, GalleryCardImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  return (
    <GalleryCard>
      <GalleryCardImage src={item.webformatURL} alt={item.tags} />
    </GalleryCard>
  );
};

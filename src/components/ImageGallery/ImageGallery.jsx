import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGallerySt } from './ImageGallery.styled';

function ImageGallery({ findingImg }) {
  return (
    <ImageGallerySt>
      {findingImg.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ImageGallerySt>
  );
}

export default ImageGallery;

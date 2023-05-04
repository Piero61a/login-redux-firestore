import { ImageList, ImageListItem } from '@mui/material';
import { itemData } from '../../constants';

const ImageGallery = () => {
  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={250}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;

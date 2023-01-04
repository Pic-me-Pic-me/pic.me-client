import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Point } from 'react-easy-crop/types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { votingImageState } from '../../recoil/maker/atom';

interface ImageCropProps {
  firstCrop: boolean;
}
const ImageCrop = (props: ImageCropProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [image, setImage] = useState('');
  const imageUrl = useRecoilValue(votingImageState);
  const [zoom, setZoom] = useState(1);

  const { firstCrop } = props;

  useEffect(() => {
    handleChangeImage();
  }, [firstCrop]);

  const handleChangeImage = () => {
    if (firstCrop === true) {
      setImage(imageUrl.firstImageUrl);
    } else {
      setImage(imageUrl.secondImageUrl);
    }
  };
  return (
    <StImageCropWrapper>
      <StImageCropContainer>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={3 / 4}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          objectFit="horizontal-cover"
        />
      </StImageCropContainer>
    </StImageCropWrapper>
  );
};

export default ImageCrop;

const StImageCropWrapper = styled.section`
  position: relative;

  width: 100%;
  height: 100%;
`;
const StImageCropContainer = styled.div`
  .reactEasyCrop_Container {
    position: absolute;
    top: 3.2rem;
  }
`;

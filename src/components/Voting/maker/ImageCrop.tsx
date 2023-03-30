import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { votingImageState } from '../../../recoil/maker/atom';
import CoachMark from './CoachMark';

interface ImageCropProps {
  isCrop: boolean[];
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

const ImageCrop = (props: ImageCropProps) => {
  const { isCrop, handleCropComplete, setRotation, rotation } = props;

  const [isOpenPop, setIsOpenPop] = useState(true);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [image, setImage] = useState('');
  const [zoom, setZoom] = useState(1);
  const imageUrl = useRecoilValue(votingImageState);

  useEffect(() => {
    handleChangeImage();
  }, [isCrop]);

  useEffect(() => {
    setTimeout(() => setIsOpenPop(false), 2000);
  }, []);

  const handleChangeImage = () => {
    if (imageUrl.imageUrl) {
      isCrop[0] ? setImage(imageUrl.imageUrl[0]) : setImage(imageUrl.imageUrl[1]);
    }
  };

  return (
    <>
      {isOpenPop && <CoachMark />}
      <StImageCropWrapper>
        <StImageCropContainer>
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={3 / 4}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={handleCropComplete}
            objectFit="horizontal-cover"
          />
        </StImageCropContainer>
      </StImageCropWrapper>
    </>
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

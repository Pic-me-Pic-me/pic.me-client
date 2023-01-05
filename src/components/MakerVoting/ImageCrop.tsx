import { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { votingImageState } from '../../recoil/maker/atom';
import GuidePopUp from './GuidePopUp';

interface ImageCropProps {
  firstCrop: boolean;
  rotation: number;
  setRotation: React.Dispatch<React.SetStateAction<number>>;
  handleCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
}

const ImageCrop = (props: ImageCropProps) => {
  const { firstCrop, handleCropComplete, setRotation, rotation } = props;

  const [isOpenPop, setIsOpenPop] = useState(true);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [image, setImage] = useState('');
  const imageUrl = useRecoilValue(votingImageState);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    handleChangeImage();
  }, [firstCrop]);
  useEffect(() => {
    setTimeout(() => setIsOpenPop(false), 2000);
  }, []);

  const handleChangeImage = () => {
    if (firstCrop === true) {
      setImage(imageUrl.firstImageUrl);
    } else {
      setImage(imageUrl.secondImageUrl);
    }
  };

  return (
    <>
      {isOpenPop && <GuidePopUp />}
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

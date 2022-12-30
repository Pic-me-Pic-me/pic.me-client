import React from 'react';

import { IcPickmeSticker } from '../asset/icon';
import { FaceSticker } from '../asset/image';
import { Header } from '../components/Home';

const Home = () => (
  <div>
    <IcPickmeSticker />
    <Header></Header>
    <img src={FaceSticker} alt="picme_face_sticker" />
  </div>
);

export default Home;

'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SlideInMenu from '../SlideInMenu';
// import BackgroundArtifactsWrapper from '../ArtifactsWrapper';
// import Overlay from '../Overlay';
// import CustomModal from '../CustomModal';
// import { resetSubscriptionSuccessState } from '@/app/rtk-base/slices/newsletterSlice';
import MarketOverview from '../../MarketOverview';
import TransactionsTray from '../TransactionsTray';
import Overlay from '../Overlay';
import TokenSelectionPopUp from '../../SelectTokenPopUp';
import ExplorePopUp from '../../ExplorePopUp';
// import { Toaster } from 'react-hot-toast';

function MainAppLayout__Plain({ children }: ChildProp) {
  return (
    <>
      {/* <Toaster /> */}
      <SlideInMenu />
      <Overlay />
      <TransactionsTray />
      <TokenSelectionPopUp />
      <ExplorePopUp />
      {/* <CustomModal /> */}
      {/* <Overlay /> */}
      <main className='main-app-layout bg-white font-light min-h-screen md:px-[5%] lg:px-[10%] md:mx-auto text-[14px]'>
        <div>
          <Navbar />
          <MarketOverview />
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}

export default MainAppLayout__Plain;

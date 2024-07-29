
import React from 'react';

import BarChart from './components/BarChart';
import BubbleChart from './components/bubbleChart';
const MainComponent = () => {
  return (
    <div className='flex w-screen  px-6 mt-4  pt-3  '>
      <div className=' w-[50%] '>
      <BarChart/>
      </div>
      <div className=' w-[50%] '>
      <BubbleChart/>
      </div>
    </div>
  );
};

export default MainComponent;

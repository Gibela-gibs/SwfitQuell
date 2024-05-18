import React, { useState } from 'react'
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem'
const CarListOptions = ({distance}) => {
    const [activeIndex, setActiveIndex]=useState();
    const [selectedCar, setSelectedCar]=useState();
  return (
    <div className='mt-5 p-5 overflow-auto h-[300px]'>
      <h2 className='text-[22px] font-bold'>Recommened</h2>
      {CarListData.map((item, index)=> (

            <div className={`cursor-pointer p-2 px-4 rounded-md border-black ${activeIndex==index ? 'border-[3px]' :null}`}
            onClick={()=>{setActiveIndex(index);
            setSelectedCar(item)}}>
                <CarListItem car={item} distance={distance}/>
            </div>

      ))}

    {selectedCar?.name?  <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl
      w-full md:w-[30%] border-[1px] items-center rounded-lg'>
        <h2>Make Payment For</h2>
        <button className='p-3 bg-black text-white rounded-lg
        text-center'>Request {selectedCar.name}</button>
      </div>:null} 
    </div>
  )
}

export default CarListOptions

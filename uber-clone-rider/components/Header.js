import React from 'react';
import Image from 'next/image';
import { UserButton } from "@clerk/nextjs";

const Header = () => {
    const headerMenu = [
        {
            id: 1,
            name: 'Ride',
            icon: '/taxi.png' // Adjusted path to start with a slash '/'
        },
        {
            id: 2,
            name: 'Package',
            icon: '/box.png' // Adjusted path to start with a slash '/'
        }
    ];

    return (
        <div className='p-5 pb-3 pl-10 border-b-[4px] border-gray-200 flex
         items-center justify-between'>
          <div className='flex gap-24 items-center'>
          <Image src='/Uberlogo.png' width={70} height={70} alt='Uber logo' priority />

            <div className='flex items-center gap-6'>
                    
            
                {headerMenu.map((item) => (
                    <div key={item.id} className='flex items-center gap-2'>
                        <Image src={item.icon} width={17} height={17} />
                        <h2 className='text-[14px] font-medium'>{item.name}</h2>
                    </div>
                ))}
            </div>
            </div>
            <UserButton/>
        </div>
    );
}

export default Header;

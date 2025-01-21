import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';
import { BiSupport } from 'react-icons/bi';

const Features = () => {
    return (
        <section className='max-padd-container mt-12'>
            {/* Container */}
            <div className='flex flex-wrap gap-8 justify-around rounded-2xl'>
                {/* Money-back Guarantee Feature */}
                <div className='flex items-center gap-x-4 p-6 bg-white'>
                    <RiMoneyDollarCircleLine className='text-4xl text-indigo-600' />
                    <div>
                        <h4 className='text-lg font-semibold text-gray-800'>MONEY-BACK GUARANTEE</h4>
                        <p className='text-sm text-gray-500'>100% refund guarantee if you're not satisfied.</p>
                    </div>
                </div>

                {/* Free Shipping & Return Feature */}
                <div className='flex items-center gap-x-4 p-6 bg-white'>
                    <TbTruckDelivery className='text-4xl text-green-600' />
                    <div>
                        <h4 className='text-lg font-semibold text-gray-800'>FREE SHIPPING & RETURN</h4>
                        <p className='text-sm text-gray-500'>Free shipping on all orders over ৳1200</p>
                    </div>
                </div>

                {/* 24/7 Customer Support Feature */}
                <div className='flex items-center gap-x-4 p-6 bg-white'>
                    <BiSupport className='text-4xl text-yellow-600' />
                    <div>
                        <h4 className='text-lg font-semibold text-gray-800'>24/7 CUSTOMER SUPPORT</h4>
                        <p className='text-sm text-gray-500'>Customer support available 24/7</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;

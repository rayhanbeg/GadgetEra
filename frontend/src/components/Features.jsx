import {RiMoneyDollarCircleLine} from 'react-icons/ri'
import {TbTruckDelivery} from 'react-icons/tb'
import {BiSupport} from 'react-icons/bi'

const Features = () => {
    return (
        <section className='max-padd-container mt-12'>
            {/* Container */}
            <div className='max-padd-container flexBetween flex-wrap gap-8 rounded-2xl'>
                <div className='flexCenter gap-x-3'>
                <RiMoneyDollarCircleLine className='text-3xl'/>
                <div className=''>
                    <h4 className='medium-15'>MONEY-BACK GUARANTEE</h4>
                    <p>100% refund guarantee if you're not satisfied.</p>
                </div>

                </div>
                <div className='flexCenter gap-x-3'>
                <TbTruckDelivery className='text-3xl'/>
                <div className=''>
                    <h4 className='medium-15'>FREE SHIPING & RETURN</h4>
                    <p>Free shipping on all orders over $50</p>
                </div>

                </div>
                <div className='flexCenter gap-x-3'>
                <BiSupport className='text-3xl'/>
                <div className=''>
                    <h4 className='medium-15'>24/7 CUSTOMER SUPPORT</h4>
                    <p>Customer support available 24/7</p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
"use client"
import TotalEarning from '../components/home/TotalEarning'
import TotalOrders from '../components/home/TotalOrders'
import RecentOrders from '../components/home/RecentOrders.jsx'
import { Package, LayoutList, ShoppingBag } from 'lucide-react'
import StatCard from '../components/common/StatCards.jsx'


const page = () => {
  return (
    <div className='flex flex-col gap-5'>
      {/* ----------------------- Row One ----------------------- */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <StatCard
          title="Total Product Items"
          value="3,521"
          unit='(items)'
          icon={<Package size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="In Stock Product"
          value="1,311"
          unit='(items)'
          icon={<LayoutList size={32} strokeWidth={1.2} />}
          variant="accent"
        />
        <StatCard
          title="Out Of Stock Product"
          value="43"
          unit='(items)'
          icon={<ShoppingBag size={32} strokeWidth={1.2} />}
          variant="rose"
        />
      </section>

      {/* ----------------------- Row Two ----------------------- */}
      <section className='flex items-start gap-3.75'>
        <TotalEarning earning={"6,206.72"} charges={"10,000"} />
        <TotalOrders orders={106} />
      </section>

      {/* ----------------------- Row Three ----------------------- */}
      <RecentOrders />
    </div>
  )
}

export default page
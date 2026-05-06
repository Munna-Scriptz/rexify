import { FiChevronRight } from 'react-icons/fi';
import { OrderData } from '../../DashboardData/DDData';
import OrderCard from '../cards/OrderCard';
import EmptyRecentOrder from '../emptyState/EmptyRecentOrder';
import Link from 'next/link';

const RecentOrders = () => {
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this order? This action cannot be undone.");
        if (confirmDelete) {
            setSearchData(prev => prev.filter(order => order.id !== id));
        }
    };

    return (
        <section className="bg-white w-full p-8 rounded-3xl font-primary mt-6 border border-border shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
            <div className="flex items-center justify-between mb-10">
                <div className='space-y-1'>
                    <h2 className="text-2xl font-black text-text-primary font-space tracking-tight">Recent Orders</h2>
                    <p className='text-text-muted text-sm'>Manage and track your latest customer orders</p>
                </div>

                <Link href={'/orders'} className="group text-accent hover:bg-accent/5 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-2">
                    View full history
                    <FiChevronRight className="group-hover:translate-x-1 duration-300" />
                </Link>
            </div>
            
            {/* Footer Section */}
            {OrderData.length > 0 ?
                <div className={`grid gap-8 grid-cols-1 xl:grid-cols-2`}>
                    {OrderData.map((item) => (
                        <OrderCard
                            key={item.id}
                            item={item}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
                :
                <EmptyRecentOrder setSearchData={setSearchData} OrderData={OrderData} />
            }
        </section>
    );
};

export default RecentOrders;

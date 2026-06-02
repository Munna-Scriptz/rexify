import React from 'react';
import { ShoppingBag, Clock, ChevronRight, RefreshCw } from 'lucide-react';
import { apiClient } from '@/app/lib/apiClient';

const statusConfig = {
  pending: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', dot: 'bg-amber-500' },
  confirmed: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500' },
  processing: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', dot: 'bg-purple-500' },
  shipped: { text: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', dot: 'bg-indigo-500' },
  delivered: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500' },
  cancelled: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', dot: 'bg-red-500' },
};

const page = async () => {

  const orders = await apiClient.get('/checkout/user')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-[#0f172a] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center border border-accent/20">
            <ShoppingBag size={20} className="text-accent" />
          </div>
          Purchase History
        </h2>
        <span className="text-sm font-medium text-[#64748b]">
          {orders?.data?.length} Orders
        </span>
      </div>

      {/* Orders Grid - 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {orders?.data?.map((order) => {
          const s = statusConfig[order.status] || statusConfig.pending;
          return (
            <div
              key={order._id || order.orderId}
              className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] overflow-hidden hover:shadow-[0_8px_25px_#155dfc15] transition-all duration-300 group"
            >
              {/* Top Accent Bar */}
              <div className="h-1 w-full bg-linear-to-r from-accent via-[#4d8bff] to-accent/30" />

              <div className="p-4 md:p-5">
                {/* Order ID & Date */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono font-bold text-[#0f172a] text-sm">
                      #{order.orderId}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] mt-1">
                      <Clock size={13} />
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${s.bg} ${s.text} ${s.border}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                    {order.status}
                  </span>
                </div>

                {/* Product Preview */}
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-3 mb-5">
                    <div className="w-16 h-16 bg-[#f8fafc] border border-[#e8edf5] rounded-xl overflow-hidden flex items-center justify-center p-1 group-hover:border-accent/20 transition-colors">
                      <img
                        src={item?.product?.variants[0]?.thumbnail}
                        alt={item?.product?.variants[0]?.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 text-sm">
                      <p className="font-medium text-[#0f172a] line-clamp-2">
                        {item?.product?.title || "Order Items"}
                      </p>
                        <p className="text-xs text-[#64748b] mt-1">
                          {item.quantity} items
                        </p>
                    </div>
                  </div>
                ))}

                {/* Bottom Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9]">
                  <div>
                    <p className="text-xs text-[#94a3b8]">Total</p>
                    <p className="text-xl font-bold text-[#0f172a]">
                      ৳{order.totalPrice}
                    </p>
                  </div>

                  <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent border border-accent/20 bg-white px-4 py-2.5 rounded-xl hover:bg-accent hover:text-white hover:border-accent transition-all duration-200">
                    Details
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {orders?.data?.length > 0 && (
        <div className="flex justify-center pt-6">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] hover:text-accent bg-white border border-[#e8edf5] px-6 py-3 rounded-2xl hover:border-accent/30 transition-all">
            <RefreshCw size={16} />
            Load More Orders
          </button>
        </div>
      )}

      {orders?.data?.length === 0 && (
        <div className="text-center py-16 text-[#94a3b8]">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default page;
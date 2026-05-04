import React, { useState } from 'react'
import { FiArrowUpCircle, FiBell, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { AiOutlineSwap } from 'react-icons/ai';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Header = ({ pageName }) => {
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)

  // Sample notifications data
  const notifications = [
    { id: 1, message: 'New order received', time: '5 minutes ago' },
    { id: 2, message: 'Product out of stock', time: '1 hour ago' },
    { id: 3, message: 'New customer registered', time: '3 hours ago' },
    { id: 4, message: 'Payment verified', time: '1 day ago' },
  ];

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signout`, {
        method: 'POST',
        credentials: 'include'
      })

      const data = await res.json();
      if (!res.ok) {
        setLoading(false)
        toast.error(data.message, { theme: "dark", transition: Bounce, });
        return
      }
      setLoading(false)
      toast.success(data.message, {
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        setLoading(false)
      }, 1500)

    } catch (error) {
      setLoading(false)
      toast.error("Somethind went wrong!", { theme: "light", transition: Bounce, });
    }
  }



  return (
    <>
      <ToastContainer />
      <header id='header' className='bg-white w-full py-4 duration-300 z-20 border-b border-border'>
        <div className='flex items-center justify-between px-[22px]'>
          {/* ----------- Location ----------- */}
          <p className="text-text-primary font-bold text-[20px] font-space tracking-tight">
            {pageName[1]
              ? pageName[1].charAt(0).toUpperCase() + pageName[1].slice(1)
              : "Dashboard"}
          </p>

          {/* ----------- Head buttons ----------- */}
          <div className='flex items-center gap-4'>

            {/* SUPPORT */}
            <button className='flex items-center gap-3 bg-accent hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all cursor-pointer uppercase shadow-lg shadow-accent/20'>
              SUPPORT
              <FiArrowUpCircle className='text-base' />
            </button>

            {/* Exchange Rate Badge */}
            <div className='flex items-center gap-2 bg-surface px-4 py-2 rounded-xl text-sm font-semibold border border-border/50'>
              <span className='text-text-secondary'>1 USDT</span>
              <HiOutlineSwitchHorizontal className='text-text-muted' />
              <span className='text-accent'>125.95 BDT</span>
            </div>

            {/* Notification Bell with Badge */}
            <div className='relative'>
              <button
                onClick={() => setNotificationModalOpen(!notificationModalOpen)}
                className='bg-accent/10 hover:bg-accent/20 p-2.5 rounded-xl text-accent transition-all cursor-pointer'
              >
                <FiBell className='text-lg' />
              </button>
              <span className='absolute -top-1 -right-1 bg-error text-white text-[10px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-black border-2 border-white'>
                2
              </span>
            </div>

            {/* Profile Initial */}
            <button
              onClick={() => setProfileModalOpen(!profileModalOpen)}
              className='flex items-center gap-2 cursor-pointer hover:bg-surface px-2 py-1 rounded-lg transition-all'
            >
              <img src={"/assets/pfp.png"} alt="profile" />
              <p>Munna</p>
              <FiChevronDown className='text-text-muted' />
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className='fixed inset-0 z-40 animate-fade-up' onClick={() => setProfileModalOpen(false)}>
          <div className='absolute top-20 right-6 bg-white rounded-2xl shadow-2xl border border-border w-48 overflow-hidden' onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className='bg-accent/10 px-4 py-2 border-b border-border'>
              <p className='font-semibold text-text-primary'>Munna</p>
              <p className='text-xs text-text-muted'>Admin User</p>
            </div>

            {/* Modal Options */}
            <div className='py-2'>
              {/* Swap Account */}
              <button
                onClick={() => {
                  setProfileModalOpen(false);
                }}
                className='w-full px-4 cursor-pointer py-3 flex items-center gap-3 hover:bg-surface transition-all text-text-primary font-medium text-sm'
              >
                <AiOutlineSwap className='text-base text-accent' />
                <span>Swap Account</span>
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  handleSignout()
                  setProfileModalOpen(false);
                }}
                className='w-full px-4 py-3 cursor-pointer flex items-center gap-3 hover:bg-error/10 transition-all text-error font-medium text-sm border-t border-border'
              >
                <FiLogOut className='text-base' />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notificationModalOpen && (
        <div className='fixed inset-0 z-40 animate-fade-up' onClick={() => setNotificationModalOpen(false)}>
          <div className='absolute top-20 right-24 bg-white rounded-2xl shadow-2xl border border-border w-80 overflow-hidden max-h-96 flex flex-col' onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className='bg-accent/10 px-4 py-3 border-b border-border'>
              <p className='font-semibold text-text-primary'>Notifications</p>
            </div>

            {/* Notifications List */}
            <div className='overflow-y-auto flex-1'>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className='px-4 py-3 border-b border-border hover:bg-surface transition-all cursor-pointer'
                  >
                    <p className='text-sm font-medium text-text-primary'>{notification.message}</p>
                    <p className='text-xs text-text-muted mt-1'>{notification.time}</p>
                  </div>
                ))
              ) : (
                <div className='px-4 py-8 text-center text-text-muted'>
                  <p className='text-sm'>No notifications yet</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className='border-t border-border px-4 py-3 bg-surface'>
              <button className='w-full text-accent font-semibold text-sm hover:text-blue-700 transition-all'>
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
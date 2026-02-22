import React from 'react'
import { Bell } from 'lucide-react';

const NotificationTab = () => {
  return (
    <div className="animate-slide-in-from-bottom-3 duration-500">
      <div className="bg-white rounded-2xl p-10 border border-border shadow-sm">
        <h2 className="text-xl font-bold text-text-primary mb-6 font-space flex items-center gap-3">
          <Bell size={22} className="text-accent" />
          Communication Preferences
        </h2>
        <p className="text-text-secondary text-sm mb-10 pb-6 border-b border-border">Control the frequency and channel of our updates.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            { label: 'Newsletter & Promos', desc: 'New arrivals and exclusive offers' },
            { label: 'Order Notifications', desc: 'Updates on your shipping status' },
            { label: 'Security Alerts', desc: 'Important account login alerts' },
            { label: 'Flash Sale Entry', desc: 'Early access to limited drops' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div>
                <h5 className="font-bold text-text-primary text-sm">{item.label}</h5>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
              <button className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors p-1 ${idx < 2 ? 'bg-accent' : 'bg-muted'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm shadow-black/20 transition-transform ${idx < 2 ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationTab
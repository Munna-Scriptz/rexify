import { AlertCircle, X, Trash2, Loader2 } from 'lucide-react';

const VerifyDelete = ({ isOpen, onClose, onConfirm, itemName = "this item", title = "Verify Destruction", loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-6">
      {/* High-End Glass Backdrop */}
      <div 
        className="absolute inset-0 bg-brand/95 animate-fade-in"
        onClick={!loading ? onClose : undefined}
      />
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md bg-white rounded-4xl shadow-2xl overflow-hidden animate-fade-up border border-border">
        {/* Subtle Warning Pattern/Header */}
        <div className="h-2 bg-linear-to-r from-rose-500 via-rose-400 to-rose-500" />
        
        <div className="p-8 flex flex-col items-center text-center">
            {/* Pulsing Warning Icon */}
            <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 relative">
                <div className={`absolute inset-0 rounded-full bg-rose-500/10 ${!loading && 'animate-ping'}`} />
                <div className="relative w-14 h-14 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
                    {loading ? <Loader2 size={32} className="animate-spin" /> : <AlertCircle size={32} />}
                </div>
            </div>

            <h2 className="text-2xl font-bold font-space text-brand mb-2">
                {loading ? "Processing..." : title}
            </h2>
            
            <p className="text-text-muted text-sm font-medium leading-relaxed px-4">
                {loading ? (
                    "Please wait while we securely remove your data from the system."
                ) : (
                    <>
                        You are about to permanently remove <span className="text-brand font-bold underline decoration-rose-500/30">"{itemName}"</span>.<br/>
                        <span className="text-rose-500 font-bold uppercase tracking-widest text-[10px] block mt-4">Critical Warning:</span>
                        This action cannot be undone and will erase all associated data.
                    </>
                )}
            </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-0 border-t border-border">
            <button 
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-6 font-bold font-space text-sm text-text-muted hover:bg-surface transition-all cursor-pointer border-r border-border disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cancel Process
            </button>
            <button 
                onClick={onConfirm}
                disabled={loading}
                className="flex-1 py-6 font-bold font-space text-sm text-rose-600 hover:bg-rose-50 transition-all cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                ) : (
                    <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
                )}
                {loading ? "Deleting..." : "Confirm Delete"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyDelete;
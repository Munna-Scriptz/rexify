
const ProfileSL = () => {
    return (
        <div className="space-y-5">
            {/* ── Hero Profile Card Skeleton ── */}
            <div className="relative rounded-2xl overflow-hidden border border-accent/10 bg-white shadow-[0_2px_24px_#155dfc0d] p-8">
                {/* Background blobs (optional for skeleton) */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gray-100 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-100 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Avatar Skeleton */}
                    <div className="relative shrink-0">
                        <div className="w-32 h-32 rounded-2xl bg-gray-200 animate-pulse" />
                    </div>

                    {/* Info Skeleton */}
                    <div className="flex-1 w-full text-center sm:text-left space-y-4">
                        {/* Name */}
                        <div className="flex items-center justify-center sm:justify-start gap-3">
                            <div className="h-8 w-52 bg-gray-200 rounded-xl animate-pulse" />
                            <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                        </div>

                        {/* Email */}
                        <div className="h-5 w-64 bg-gray-200 rounded-lg mx-auto sm:mx-0 animate-pulse" />

                        {/* Badges */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                            <div className="h-7 w-36 bg-gray-200 rounded-full animate-pulse" />
                            <div className="h-7 w-28 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Details Grid Skeleton ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Personal Details Skeleton */}
                <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] p-7">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center py-3">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Account Overview Skeleton */}
                <div className="bg-white rounded-2xl border border-[#e8edf5] shadow-[0_2px_16px_#155dfc08] p-7">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-[#f8fafc] rounded-xl p-4 space-y-3">
                                <div className="h-9 w-16 bg-gray-200 rounded-xl mx-auto animate-pulse" />
                                <div className="h-3.5 w-20 bg-gray-200 rounded mx-auto animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfileSL;
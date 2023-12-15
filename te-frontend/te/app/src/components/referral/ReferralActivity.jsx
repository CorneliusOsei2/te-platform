

const ReferralActivity = ({ referrals }) => {

    return (
        <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
            <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <h2 className="text-base font-semibold leading-7 text-sky-600">Activity</h2>
            </header>
            <ul className="divide-y divide-white/5">
                {referrals.map((referral, index) => (
                    <li key={index} className="px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-x-3">
                            <img src={referral.company.image} alt="" className="h-6 w-6 flex-none rounded-full bg-gray-800" />
                            <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">{referral.role}</h3>
                            <time dateTime={referral.date} className="flex-none text-xs text-gray-600">
                                {referral.date}
                            </time>
                        </div>
                        <p className="mt-3 truncate text-sm text-gray-500">
                            Status <span className="text-gray-400">{referral.status}</span>
                        </p>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ReferralActivity;
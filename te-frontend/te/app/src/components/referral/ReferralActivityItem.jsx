
let statusColors = {
    "Completed": "green",
    "In review": "yellow",
    "Cancelled": "red"
}


const ReferralActivityItem = ({ status, referral, index }) => {
    return (
        <li key={index} className="py-4 ">
            <div className="flex gap-x-1">
                <div
                    className={`text-${statusColors[status]}-400 align-middle bg-${statusColors[status]}-400/10 flex rounded-full p-1`}>
                    <div className="h-1.5 w-1.5 mt-1 rounded-full bg-current" />
                </div>
                <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.company.name}{":  "}</h3>
                <h3 className="truncate text-sm font-semibold leading-6 text-slate-700 ">{referral.job_title ?? "Software Engineer"},</h3>
                <h3 className="truncate  text-sm font-semibold leading-6 text-black">{referral.role}</h3>
                <time dateTime={referral.date} className="text-xs text-gray-600">
                    {referral.date}
                </time>
            </div>
        </li>
    )
}

export default ReferralActivityItem;
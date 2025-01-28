import { useSelector } from "react-redux";

function AppliedJobs() {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div className="overflow-x-auto shadow-xl mt-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Company</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {allAppliedJobs.length <= 0 ? (
            <span>You not applied not yet</span>
          ) : (
            allAppliedJobs.map((item) => {
              return (
                <tr key={item._id}>
                  <td className="py-2 px-4 border-b">{item?.job?.title}</td>
                  <td className="py-2 px-4 border-b text-green-500">
                    <span className={`${item.status === 'rejected' ? 'bg-red-600 text-white py-1 px-2' : item.status === 'pending' ? 'bg-gray-500 text-white py-1 px-2' : 'bg-green-500 text-white py-1 px-2'}` }>{item?.status.toUpperCase()}</span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {item?.createdAt.split("T")[0]}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppliedJobs;

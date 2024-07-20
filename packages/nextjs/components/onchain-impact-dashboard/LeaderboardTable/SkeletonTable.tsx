const SkeletonTable = () =>
  [...Array(5)].map(i => (
    <tr key={i} className="animate-pulse">
      <td>
        <div className="flex items-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-md bg-slate-300 h-6 w-6"></div>
            <div className="flex items-center space-y-6">
              <div className="h-2 w-28 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </td>
      <td>
        <div className="h-2 w-14 bg-slate-300 rounded"></div>
      </td>
      <td>
        <div className="h-2 w-7 bg-slate-300 rounded"></div>
      </td>
      <td>
        <div className="h-2 w-7 bg-slate-300 rounded"></div>
      </td>
      <td>
        <div className="h-2 w-7 bg-slate-300 rounded"></div>
      </td>
      <td>
        <div className="h-2 w-7 bg-slate-300 rounded"></div>
      </td>
    </tr>
  ));

export default SkeletonTable;

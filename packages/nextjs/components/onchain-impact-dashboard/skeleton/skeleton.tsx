export const Skeleton = ({ height = "h-8" }: { height?: string }) => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className={`${height} w-full bg-slate-100 rounded`}></div>
    </div>
  );
};

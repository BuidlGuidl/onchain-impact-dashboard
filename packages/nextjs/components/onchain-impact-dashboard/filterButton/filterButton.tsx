interface IFilterButton {
  filter: string;
  value: string;
  label: string;
  onClick: (val: string) => void;
}
export const FilterButton = ({ filter, label, onClick, value }: IFilterButton) => {
  return (
    <button
      className={`p-2  xs:pl-4 xs:pr-4 ${filter == value ? "bg-base-100 rounded-lg shadow" : ""}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

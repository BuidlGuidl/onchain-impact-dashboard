interface IFilterButton {
  filter: string;
  value: string;
  label: string;
  onClick: (val: string) => void;
}
export const FilterButton = ({ filter, label, onClick, value }: IFilterButton) => {
  return (
    <button
      className={`p-2 pl-4 pr-4 ${filter == value ? "bg-customGray rounded-lg shadow" : ""}`}
      onClick={() => onClick(value)}
    >
      {label}
    </button>
  );
};

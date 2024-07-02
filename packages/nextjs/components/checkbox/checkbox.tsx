interface ICheckboxItem {
  name: string;
  onChange: (arg: boolean) => void;
  value: boolean;
}
export const CheckboxItem = ({ value, name, onChange }: ICheckboxItem) => {
  return (
    <div className="border border-gray-300 bg-base-200 rounded-lg p-4  mb-4">
      <label className="flex justify-center gap-4" htmlFor={name}>
        <div className="">
          <input
            id={name}
            type="checkbox"
            checked={value}
            onChange={e => onChange(e.target.checked)}
            className=" w-[18px] h-[18px]  accent-blue-600"
          />
        </div>
        <div>
          <h3 className="">{name}</h3>
          <span className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </span>
        </div>
      </label>
    </div>
  );
};

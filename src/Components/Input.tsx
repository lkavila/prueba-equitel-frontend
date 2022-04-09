
interface InputProps {
  name: string;
  type?: string;
  list?: string;
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  autoComplete?: string;
  placeholder?: string;
  defaultValue?: any;
  className?: string;
}

const CustomInput = ({ name, type, list, value, defaultValue, autoComplete, placeholder, className, onChange, onClick }: InputProps) => {
  return (
    <input
      id={name}
      name={name}
      type={type}
      list={list}
      value={value}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      className={`relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none ${className}`}
      placeholder={placeholder}
      onChange={onChange}
      onClick={onClick}
    />
  )
}

export default CustomInput;
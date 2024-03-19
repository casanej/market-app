import { ButtonProps } from './index.type';

export const Button = ({ children, fullWidth, ...rest }: ButtonProps) => {

  return <button
    {...rest}
    className={`
      bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out
      ${fullWidth ? 'w-full' : 'w-max min-w-48'}
    `}
  >
    {children}
  </button>;
};

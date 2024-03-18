import { ButtonProps } from './index.type';

export const Button = ({ children, fullWidth, ...rest }: ButtonProps) => {

  return <button
    {...rest}
    className={`
      bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out min-w-60
      ${fullWidth ? 'w-full' : 'w-fit'}
    `}
  >
    {children}
  </button>;
};

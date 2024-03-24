type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'placeholder'>;

export interface TextfieldProps extends HTMLInputProps {
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

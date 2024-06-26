import { UseFormRegister } from "react-hook-form";

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'placeholder'>;

export type TextfieldProps = TextfieldPropsRaw | TextfieldPropsForm;

interface TextFieldsPropsBase extends HTMLInputProps {
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

interface TextfieldPropsRaw extends TextFieldsPropsBase {
  name?: undefined;
  register?: undefined;
}

interface TextfieldPropsForm extends TextFieldsPropsBase {
  name: string;
  register: UseFormRegister<any>;
}

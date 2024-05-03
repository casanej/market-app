import { UseFormRegister } from "react-hook-form";

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'placeholder'>;

export type TextfieldProps = TextfieldPropsRaw | TextfieldPropsForm;

interface TextFieldsPropsBase {
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

interface TextfieldPropsRaw extends TextFieldsPropsBase, HTMLInputProps {
  name?: string;
  register: undefined;
}

interface TextfieldPropsForm extends TextFieldsPropsBase, HTMLInputProps {
  name: string;
  register: UseFormRegister<any>;
  label?: string;
}

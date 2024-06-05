import { ButtonProps } from "../../atoms/button/index.type";
import { TextfieldProps } from "../../atoms/textfield/index.type";

type FormElement = Omit<HTMLFormElement, 'contentEditable'>;

export interface FormBuilderProps extends Partial<FormElement> {
  isPending?: boolean;
  submitButtonLabel?: string;
  template: FormBuildTemplate[];
}

type FormBuildTemplate = FormBuildTemplateInputText | FormBuildTemplateSubmitButton;

interface FormBuildTemplateInputText {
  type: 'input-text';
  templateProps: TextfieldProps;
}

interface FormBuildTemplateSubmitButton {
  type: 'submit-button';
  templateProps: ButtonProps;
}
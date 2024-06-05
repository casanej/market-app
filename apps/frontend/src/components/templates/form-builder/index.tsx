import { useMemo } from "react";
import { FormBuilderProps } from "./index.type";
import { Button, Textfield } from "../../atoms";

export const FormBuilder = ({ isPending, submitButtonLabel, template, ...rest }: FormBuilderProps) => {

  const renderTemplate = useMemo(() => {
    return template.map((templateItem) => {
      switch (templateItem.type) {
        case 'input-text':
          return <Textfield key={templateItem.templateProps.name} {...templateItem.templateProps} />;
        case 'submit-button':
          return <Button {...templateItem.templateProps} type='submit' />;
        default:
          return null;
      }
    });
  }, [template]);

  return <div className="container">
    <form
      {...rest}
    >
      {renderTemplate}
      <Button type='submit' disabled={isPending} >{submitButtonLabel ?? 'Register'}</Button>
    </form>
  </div>;
};

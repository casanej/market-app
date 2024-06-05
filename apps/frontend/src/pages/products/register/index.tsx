import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MAPProductRequestDto } from "market-app-bff-models";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { ProductRegisterFormFields, schemaResolverFormProductRegister } from "./index.type";
import { FormBuilder } from "../../../components/templates";
import { marketAppBackend } from "../../../services";

export const ProductRegisterPage = () => {

  const { mutate: mutationDoRegisterProduct, isPending: isPendingDoRegisterProduct } = useMutation({
    mutationFn: (payload: MAPProductRequestDto) => marketAppBackend.doRegisterProduct(payload),
    onSuccess: () => {
      toast.success('Product registered success');
    },
    onError: (error: any) => {
      toast.error(error.message, { position: 'top-center', toastId: 'login-error' });
    },
  });

  const { register, handleSubmit, setValue, getValues, formState: { errors }, } = useForm<ProductRegisterFormFields>({ resolver: schemaResolverFormProductRegister });

  const { brand, content, contentType, showName } = getValues();

  useEffect(() => {
    let productShowName = '';

    if (brand) productShowName += brand;
    if (content) productShowName += ` - ${content}`;
    if (contentType) productShowName += ` ${contentType}`;

    setValue('showName', productShowName);

  }, [brand, content, contentType]);

  console.log('VALUES', brand, showName)

  const onSubmit = (data: ProductRegisterFormFields) => {
    console.log(data);
    mutationDoRegisterProduct({
      brand: data.brand,
      code: data.code,
      content: +data.content,
      contentType: data.contentType,
      image: data.image,
      name: data.name,
      showName: data.showName,
    })
  };

  return <div className="pt-2">
    <FormBuilder
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
      isPending={isPendingDoRegisterProduct}
      template={[
        {
          type: 'input-text',
          templateProps: {
            label: 'Code',
            name: 'code',
            register,
            errorMessage: errors.code?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Brand',
            name: 'brand',
            register,
            errorMessage: errors.brand?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Name',
            name: 'name',
            register,
            errorMessage: errors.name?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Content',
            name: 'content',
            register,
            errorMessage: errors.content?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Content type',
            name: 'contentType',
            register,
            errorMessage: errors.contentType?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Image',
            name: 'image',
            register,
            errorMessage: errors.image?.message as string,
          }
        },
        {
          type: 'input-text',
          templateProps: {
            label: 'Show name',
            name: 'showName',
            register,
            errorMessage: errors.showName?.message as string,
            value: showName,
          }
        },
      ]}
    />
  </div>;
};
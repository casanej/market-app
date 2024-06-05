import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { LoginFormFields, schemaResolverFormLogin } from './index.type';
import { Button, Textfield } from "../../components/atoms";
import { marketAppBackend } from '../../services';

export const LoginPage = () => {
  const navigate = useNavigate();

  const { mutate: mutationDoLogin, isPending: isPendingDoLogin } = useMutation({
    mutationFn: ({ email, currentPassword }: LoginFormFields) => marketAppBackend.doLogin(email, currentPassword),
    onSuccess: () => {
      toast.success('Login success');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message, { position: 'top-center', toastId: 'login-error' });
    },
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormFields>({ resolver: schemaResolverFormLogin });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    const { email, currentPassword } = data;
    mutationDoLogin({ email, currentPassword });
  };

  return <div className="mx-0 my-auto container h-[100svh]">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-4 w-full max-w-md mx-auto p-4'
    >
      <h1>Login</h1>
      <p></p>
      <div>
        <Textfield name='email' label="Email" inputMode="email" type="email" errorMessage={errors.email?.message} register={register} required disabled={isPendingDoLogin} />
      </div>
      <div>
        <Textfield name='currentPassword' label="Password" type="password" errorMessage={errors.currentPassword?.message} register={register} required disabled={isPendingDoLogin} />
      </div>
      <div>
        <Button fullWidth type="submit">Login</Button>
      </div>
    </form>
  </div>;
};

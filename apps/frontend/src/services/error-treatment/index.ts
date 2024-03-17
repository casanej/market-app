import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type FunctionTuple = () => void

interface CustomMessageObject {
  [key: string | number]: [string, FunctionTuple?]
}

interface CustomMessage {
  customMessage?: CustomMessageObject
}

export const exceptionTreatment = (error: any, customMessage?: CustomMessageObject, showMessage = true) => {
  const customError = {
    ...error,
    customMessage
  };

  const message = exceptionTreatmentFilter(customError);

  if (showMessage) toast.error(message, {
    toastId: 'app-exception-treatment',
  });
};

const exceptionTreatmentFilter = (error: any): string => {
  if (error.name === 'AxiosError') return exceptionTreatmentAxios(error);

  return error.message;
};

const exceptionTreatmentAxios = (error: AxiosError & CustomMessage) => {

  if (error.request.status === 400) {
    if (error.customMessage) {
      const customError = error.customMessage[400];

      if (customError[1]) customError[1]();

      return customError[0];
    }

    // eslint-disable-next-line no-extra-parens
    const serverError = (error.response?.data as any).message;

    if (serverError) {
      if (Array.isArray(serverError)) return serverError.join('; ');

      return serverError;
    }

    return 'Requisição inválida';
  }
  if (error.request.status === 401) return 'Não autorizado';
  if (error.request.status === 403) return 'Acesso negado';
  if (error.request.status === 404) return 'Não foi possível encontrar o recurso solicitado';

  return error.message || 'Aconteceu um erro inesperado. Tente novamente em instantes, se o erro persistir, entre em contato com o suporte.';
};
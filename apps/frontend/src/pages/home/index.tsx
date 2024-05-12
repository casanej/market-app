import { FC } from 'react';

interface HomePageProps { }

export const HomePage: FC<HomePageProps> = () => {

  return <div className='container'>
    <a href='/monthly-list'>
      <h1>Lista Mensal</h1>
    </a>

    <a href='/product'>
      <h1>Produtos</h1>
    </a>

    <a href='/login'>
      <h1>Login</h1>
    </a>
  </div>;
};

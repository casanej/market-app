import { FC } from 'react';
import * as S from './index.style';

interface HomePageProps { }

export const HomePage: FC<HomePageProps> = () => {

  return <S.HomePage>
    <a href='/monthly-list'>
      <h1>Monthly List</h1>
    </a>

    <a href='/login'>
      <h1>Login</h1>
    </a>
  </S.HomePage>;
};

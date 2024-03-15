import { FC } from 'react';
import * as S from './index.style';

interface HomePageProps { }

export const HomePage: FC<HomePageProps> = () => {

  return <S.HomePage>
    <a href='/monthly-list'>Monthly List</a>
  </S.HomePage>;
};

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetListProps } from './id/index.type';
import { marketAppBackend } from '../../services';

export const MonthlyListPage = () => {
  const [page, pageSize]: [number, number] = [1, 10];
  const { mutate: mutationGetLists, isPending: isPendingGettingList, isError: isErrorGettingList, data: listData } = useMutation({
    mutationFn: ({ page, pageSize }: GetListProps) => marketAppBackend.getLists(page, pageSize),
    onError: (error) => {
      console.error('[GET LISTS ERROR]', error)
    },
  });

  useEffect(() => {
    mutationGetLists({ page, pageSize });
  }, []);

  if (isPendingGettingList) {
    return <div>Loading...</div>;
  }

  if (isErrorGettingList && !isPendingGettingList) {
    return <div>Error getting list</div>;
  }

  return <div>
    {listData?.items?.map((list) => (
      <div key={list.code}>
        <Link to={`/monthly-list/${list.code}`}>{list.name}</Link>
      </div>
    ))}
  </div>;
};
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { marketAppBackend } from '../../services';

export const MonthlyListPage = () => {
  const { mutate: mutationGetLists, isPending: isPendingGettingList, isError: isErrorGettingList, data: getListsData } = useMutation({
    mutationFn: () => marketAppBackend.getLists(),
    onError: (error) => {
      console.error('[GET LISTS ERROR]', error)
    },
  });

  useEffect(() => {
    mutationGetLists();
  }, []);

  if (isPendingGettingList) {
    return <div>Loading...</div>;
  }

  if (isErrorGettingList && !isPendingGettingList) {
    return <div>Error getting list</div>;
  }

  return <div>
    {getListsData?.map((list) => (
      <div key={list.id}>
        <Link to={`/monthly-list/${list.id}`}>{list.name}</Link>
      </div>
    ))}
  </div>;
};
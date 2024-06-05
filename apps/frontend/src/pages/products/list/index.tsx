import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { MAPProductResponseDto, ResponsePaginatedListsDto } from "market-app-bff-models";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductListFilterParams } from "./index.type";
import { marketAppBackend } from "../../../services";
import { Pagination } from "../../../components/molecules";

export const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [productList, setProductList] = useState<ResponsePaginatedListsDto<MAPProductResponseDto>>();

  console.log('[TESTE]', searchParams.get('page'))

  const page = +(searchParams.get('page') ?? '1');
  const pageSize = +(searchParams.get('pageSize') ?? '10');

  const { mutate: mutationGetProductList, isPending: isPendingProductList } = useMutation({
    mutationFn: ({ page, pageSize }: ProductListFilterParams) => marketAppBackend.getLists(page, pageSize),
    onSuccess: (data) => {
      setProductList(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    console.log('page', page, pageSize);
    mutationGetProductList({ page, pageSize });
  }, [page, pageSize]);

  if (isPendingProductList) return <div>Loading...</div>;

  return <div className="container">
    <h1>Product List</h1>
    <div>Total Items: {productList?.totalItems}</div>
    <div>Total Pages: {productList?.totalPages}</div>
    {
      productList?.items.map((product) => {
        return <div key={product.code} className="border border-gray-500 border-solid p-2">
          <div>[{product.code}] {product.showName}</div>
          <div>{product.content}</div>
        </div>;
      })
    }
    <Pagination
      current={page}
      onPageChange={(page) => setSearchParams({ page: `${page}` })}
      maxPages={productList?.totalPages ?? 0}
    />
  </div>;
};

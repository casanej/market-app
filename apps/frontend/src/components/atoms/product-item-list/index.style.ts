import styled from "styled-components";

export const ProductItemList = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;

  border: 1px solid #ccc;
  border-radius: 5px;

  > div {
    &:nth-child(1) {

      display: flex;
      flex-direction: row;
      align-items: flex-end;
      gap: 10px;

      h1 {
        font-weight: bold;
        font-size: 1.2rem;
      }

      label {
        font-size: 0.8rem;
      }
    }
  }
`;
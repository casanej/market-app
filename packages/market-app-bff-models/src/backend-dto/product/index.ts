export interface MAPProductResponseDto {
  brand: string;
  code: string;
  content: number;
  contentType: string;
  image?: string;
  name: string;
  showName: string;
}

export interface MAPProductRequestDto extends MAPProductResponseDto {

}
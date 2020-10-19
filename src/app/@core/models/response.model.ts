export interface PaginateModel<T> {
  items: Array<T>;
  links: { first: String; previous: String; next: String; last: String };
  meta: {
    currentPage: number;
    itemCount: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export class UserUpdateDto {
  username: string;
  lastName: string;
  firstName: string;
}

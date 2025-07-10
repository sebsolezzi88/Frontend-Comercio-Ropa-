export interface AlertMessage{
    color?: string;
    message?: string;
}
export interface RegisterApiResponse{
    status: 'success' | 'error';
    message: string;
}
export interface ApiResponse extends RegisterApiResponse{}

export interface LoginApiResponse{
    status: 'success' | 'error';
    message?: string;
    token: string;
    username: string;
}

export interface Category {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
​}

//Para la respuesta de la categoria
export interface RegisterApiCategoryResponse extends RegisterApiResponse {
    category: Category;
}
//Para obtener todas las categorias
export interface GetApiCategoriesResponse extends RegisterApiResponse {
    categories: Category[];
}





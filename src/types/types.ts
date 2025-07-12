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

export interface GetApiProductsResponse extends RegisterApiResponse{
    products:Product[];
}

export interface ProductData {
    
    name: string;
    description: string;
    urlImage: string;
    categoryId: number | null;
   
​}
export interface Product extends ProductData{
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UpdateApiProductResponse extends ApiResponse{
    product: Product;
}

//-------ProductVariant
export interface ProductVariant {

    id?: number;
    productId: number;
    size: string;
    stock: number;
    price: number;
}
export interface AddApiProductVariantResponse extends ApiResponse{
    productVariant: ProductVariant;
}
export interface GetApiProductVariantsResponse extends ApiResponse{
    variants:ProductVariant[];
}





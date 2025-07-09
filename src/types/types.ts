export interface AlertMessage{
    color?: string;
    message?: string;
}
export interface RegisterApiResponse{
    status: 'success' | 'error';
    message: string;
}
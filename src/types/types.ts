export interface AlertMessage{
    color?: string;
    message?: string;
}
export interface RegisterApiResponse{
    status: 'success' | 'error';
    message: string;
}

export interface LoginApiResponse{
    status: 'success' | 'error';
    message?: string;
    token: string;
    username: string;
}
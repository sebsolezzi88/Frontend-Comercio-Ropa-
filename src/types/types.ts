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
    token: string;
    username: string;
}
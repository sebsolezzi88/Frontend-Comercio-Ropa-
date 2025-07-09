import type { RegisterData } from "../api/auth";

export const fieldsRegisterDataEmpty = (object:RegisterData): boolean => {
        const values = Object.values(object);
        return values.some(value => typeof value === 'string' && value.trim() === '');
}
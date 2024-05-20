import { useState } from "react";

export interface UseFetchingResult {
    fetching: () => Promise<void>;
    isLoading: boolean;
    error: string;
}

export const useFetching = (callback: () => Promise<void>): UseFetchingResult => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback();
        } catch (e: any) {  // Используем `any`, так как тип ошибки может быть любым
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { fetching, isLoading, error };
};

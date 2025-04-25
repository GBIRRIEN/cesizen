'use client';

import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export async function checkUserSession(): Promise<boolean> {
    const { data, error } = await supabase.auth.getUser();
    return !!data.user && !error;
}

export async function updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    return error;
}

export function showErrorToast(message: string, description?: string) {
    toast.error(message, description ? { description } : undefined);
}

export function showSuccessToast(message: string) {
    toast.success(message);
}

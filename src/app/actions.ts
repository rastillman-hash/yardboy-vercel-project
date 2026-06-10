'use server';

import { revalidatePath } from 'next/cache';
import { sql, initializeDatabase } from '@/lib/db';

export async function getSubscriberCount(): Promise<number> {
  await initializeDatabase();
  const result = await sql`SELECT COUNT(*)::int AS count FROM email_subscribers`;
  return result[0].count;
}

export async function subscribeEmail(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = (formData.get('email') as string)?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  try {
    await initializeDatabase();
    await sql`
      INSERT INTO email_subscribers (email)
      VALUES (${email})
    `;
    revalidatePath('/');
    return { success: true };
  } catch (err: unknown) {
    const pgErr = err as { code?: string };
    if (pgErr?.code === '23505') {
      return { error: "You're already on the list! We'll be in touch." };
    }
    console.error('Subscribe error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

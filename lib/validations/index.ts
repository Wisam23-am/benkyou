import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(6, 'Kata sandi harus terdiri dari minimal 6 karakter'),
});

export const registerSchema = z
  .object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(6, 'Kata sandi harus terdiri dari minimal 6 karakter'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Kata sandi tidak sama',
    path: ['confirmPassword'],
  });

// SRS Schemas
export const submitSrsAnswerSchema = z.object({
  rating: z.enum(['lupa', 'sulit', 'bisa', 'mudah'] as const),
  responseTimeMs: z.number().int().nonnegative(),
});

// Quiz Schemas
export const submitQuizAnswerSchema = z.object({
  questionId: z.string().uuid(),
  selectedOptionId: z.string().uuid(),
  responseTimeMs: z.number().int().nonnegative(),
});

export const createQuizSessionSchema = z.object({
  level: z.enum(['N5']),
});

export const completeQuizSessionSchema = z.object({
  sessionId: z.string().uuid(),
});

// Types generated from schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type SubmitSrsAnswerInput = z.infer<typeof submitSrsAnswerSchema>;
export type SubmitQuizAnswerInput = z.infer<typeof submitQuizAnswerSchema>;

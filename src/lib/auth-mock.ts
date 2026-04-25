export type UserRole = 'buyer' | 'si_partner' | 'manufacturer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
}

// In a real app, this would come from Supabase Auth session
export const mockUser: User | null = {
  id: 'user-123',
  email: 'test@example.com',
  role: 'buyer',
  name: '홍길동',
  avatarUrl: 'https://picsum.photos/seed/user1/200/200'
};

export const getSession = () => {
  // Simulate fetching session
  return mockUser;
};
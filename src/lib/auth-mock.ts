export type UserRole = 'buyer' | 'si_partner' | 'manufacturer' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatarUrl?: string;
}

// 초기 접속 시 로그인되지 않은 상태를 시뮬레이션하기 위해 null로 설정합니다.
// 실제 테스트를 위해 데이터를 넣으려면 이 부분을 수정하세요.
export const mockUser: User | null = null;

export const getSession = () => {
  // 세션을 가져오는 시뮬레이션
  return mockUser;
};

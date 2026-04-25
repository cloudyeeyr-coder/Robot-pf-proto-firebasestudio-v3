
import { z } from 'zod';

export const buyerSignupSchema = z.object({
  company_name: z.string().min(1, '회사명을 입력해주세요').max(255),
  biz_registration_no: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{5}$/, '올바른 사업자등록번호 형식(XXX-XX-XXXXX)을 입력해주세요'),
  region: z.string().min(1, '지역을 선택해주세요'),
  segment: z.enum(['Q1', 'Q2', 'Q3', 'Q4'], { message: '산업 세그먼트를 선택해주세요' }),
  contact_name: z.string().min(1, '담당자 이름을 입력해주세요').max(100),
  contact_email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  contact_phone: z
    .string()
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요'),
});

export type BuyerSignupValues = z.infer<typeof buyerSignupSchema>;

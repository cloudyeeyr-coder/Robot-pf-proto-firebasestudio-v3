
import { z } from 'zod';

export const siPartnerSignupSchema = z.object({
  company_name: z.string().min(1, '회사명을 입력해주세요').max(255),
  biz_registration_no: z
    .string()
    .regex(/^\d{3}-\d{2}-\d{5}$/, '올바른 사업자등록번호 형식을 입력해주세요'),
  region: z.string().min(1, '지역을 선택해주세요'),
  contact_name: z.string().min(1, '담당자 이름을 입력해주세요').max(100),
  contact_email: z.string().email('올바른 이메일 형식을 입력해주세요'),
  contact_phone: z
    .string()
    .regex(/^01[016789]-\d{3,4}-\d{4}$/, '올바른 휴대폰 번호를 입력해주세요'),
  completed_projects: z.coerce.number().int().min(0, '0 이상의 숫자를 입력해주세요'),
  failed_projects: z.coerce.number().int().min(0, '0 이상의 숫자를 입력해주세요'),
  capability_tags: z
    .array(z.string())
    .min(1, '최소 1개의 역량 태그를 선택해주세요')
    .max(10, '역량 태그는 최대 10개까지 선택할 수 있습니다'),
});

export type SiPartnerSignupValues = z.infer<typeof siPartnerSignupSchema>;

# [2026] 노션 템플릿 공유 사이트 NOITON 📝

NOITON은 복잡한 노션 템플릿을 자유롭게 업로드하고, 체계적인 카테고리 기반 탐색을 통해 자신에게 꼭 맞는 템플릿를 찾을 수 있도록 돕는 공유 플랫폼입니다.
단순한 파일 공유를 넘어, 사용자 간의 영감을 주고받으며 생산성을 극대화할 수 있는 커뮤니티 공간을 지향합니다. 🚀

<img width="1920" height="1080" alt="noiton2" src="https://github.com/user-attachments/assets/a9bd206d-3a00-4b83-9e68-ac9eba6362f2" />


---

## 개요

  * **프로젝트 이름:** NOITON (노이톤)
  * **프로젝트 지속기간:** 2026.01 - 2026.03
  * **개발 엔진 및 언어:** `Next.js`, `TypeScript`
  * **디자인 및 협업:** `Figma`, `Notion 워크스페이스`
  * **멤버:** [`@eeheueklf`](https://github.com/eeheueklf)


---

## 핵심기능

| 인기 템플릿 | 카테고리별 템플릿 | 최신/인기 필터링 | 템플릿 검색 |
| :---: | :---: | :---: | :---: |
|<img height="500" alt="image" src="https://github.com/user-attachments/assets/0e258c94-582b-4e40-a1db-534a5d5972a6" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/3d0d6b0f-aedf-43cb-9221-b0c3c4e535bf" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/63bb2117-8d7d-4d05-a199-a680f0ba52f1" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/422fc04d-c8fe-4d32-a72e-8043236889dd" /> |

## 개인 설정

| 프로필 | 찜한 템플릿 | 업로드한 템플릿 | 템플릿 업로드 |
| :---: | :---: | :---: | :---: |
|<img height="500" alt="image" src="https://github.com/user-attachments/assets/dec1c9d9-2597-4dc1-87d5-0f75d49e07bc" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/7751c2e5-f1b7-4b4f-ba9e-bd0d4f5e2151" /> | <img  height="500" alt="image" src="https://github.com/user-attachments/assets/3590914d-2313-440c-8e6f-a0798fe5dc08" /> | <img height="500" alt="image" src="https://github.com/user-attachments/assets/9412f96a-13db-41d3-99e0-dff1e046de22" /> |

---

## detail
- **초기 로딩 속도 개선**: 렌더링 우선순위 조정 및 이미지 포맷 최적화로 LCP를 75% 단축(9.8s → 2.4s) 하여 사용자 이탈 방지
- **서버 컴포넌트 아키텍처**: Next.js App Router 기반 설계로 JS 번들 크기를 최소화하고 하이드레이션 부하를 억제하여 런타임 성능 확보
- **낙관적 업데이트 적용**: React Query를 활용하여 '좋아요' 상태를 관리, 서버 응답 전 UI를 즉각 업데이트하고 캐싱을 통해 불필요한 재요청 방지
- **중앙 집중식 인증 관리**: Redux Toolkit(RTK)으로 분산된 인증 상태를 통합, 컴포넌트 간 데이터 의존성을 해소하고 유지보수성 향상
- **URL 기반 상태 동기화**: 페이지 상태를 URL 경로와 동기화하여 새로고침 시에도 유지되는 필터링 구조와 공유 가능한 상세 경로 설계
- 📂 **카테고리 내비게이션 시스템** : URL Path와 동기화된 동적 경로 시스템을 통해 사용자가 복잡한 카테고리 속에서도 길을 잃지 않고 직관적으로 이동할 수 있는 환경을 구축했습니다.

---

## skills

**Frontend**
- Framework: `Next.js (App Router)`, `React 19`
- Language: `TypeScript`
- Styling: `Tailwind CSS`
- State Management: `Redux Toolkit`, `React Query`

**Backend & Storage**
- BaaS: `Supabase` (Auth, Database, Storage)

**Tool**
-Design `Figma`
- Version Control: `GitHub`
- Deploy: `Vercel`



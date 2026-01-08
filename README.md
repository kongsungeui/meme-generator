# ImgFlip Meme Generator

ImgFlip API를 사용하여 밈(Meme)을 생성하는 웹 애플리케이션입니다. Next.js와 TypeScript로 구축되었습니다.

## 기능

- **밈 템플릿 선택**: ImgFlip API에서 제공하는 인기 밈 템플릿 20개를 화면에 표시
- **텍스트 추가**: 선택한 밈에 상단 및 하단 텍스트 추가
- **밈 생성**: ImgFlip API를 통해 커스텀 밈 이미지 생성
- **다운로드**: 생성된 밈 이미지 다운로드
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 환경 지원

## 사용 방법

1. **ImgFlip 계정 필요**: 밈을 생성하려면 [ImgFlip](https://imgflip.com/) 계정이 필요합니다.

2. **로컬 개발 환경 실행**:
   ```bash
   # 의존성 설치
   npm install

   # 개발 서버 실행
   npm run dev
   ```

3. **밈 생성 과정**:
   - 20개의 밈 템플릿 중 원하는 것을 선택
   - 상단 텍스트와 하단 텍스트 입력
   - ImgFlip 계정 정보 입력 (username, password)
   - "밈 생성하기" 버튼 클릭
   - 생성된 밈 확인 및 다운로드

## 프로젝트 구조

```
meme-generator/
├── app/
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지
│   └── globals.css      # 글로벌 스타일
├── components/
│   ├── MemeGrid.tsx     # 밈 템플릿 그리드
│   ├── MemeEditor.tsx   # 밈 편집기
│   └── MemeResult.tsx   # 생성된 밈 결과
├── public/              # 정적 파일
├── .github/
│   └── workflows/
│       └── deploy.yml   # Cloudflare Pages 배포 설정
└── README.md
```

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **API**: ImgFlip API
- **배포**: Cloudflare Pages

## API 정보

- **get_memes**: `https://api.imgflip.com/get_memes` - 밈 템플릿 목록 조회
- **caption_image**: `https://api.imgflip.com/caption_image` - 밈 생성

## 빌드 및 배포

### 로컬 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드된 파일은 'out' 디렉토리에 생성됩니다
```

### Cloudflare Pages 자동 배포

이 프로젝트는 Cloudflare Pages를 통해 자동 배포됩니다.

#### 설정 방법

1. **Cloudflare 계정 준비**
   - [Cloudflare](https://cloudflare.com/)에서 계정 생성
   - Cloudflare Pages에서 프로젝트 생성

2. **GitHub Secrets 설정**
   - 저장소 Settings > Secrets and variables > Actions에서 다음 시크릿 추가:
     - `CLOUDFLARE_API_TOKEN`: Cloudflare API 토큰 (Pages 배포 권한 필요)
     - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 계정 ID

3. **API 토큰 생성**
   - Cloudflare 대시보드 > My Profile > API Tokens
   - "Create Token" > "Edit Cloudflare Workers" 템플릿 사용 또는 커스텀 토큰 생성
   - Account > Cloudflare Pages: Edit 권한 필요

4. **배포 확인**
   - main 브랜치에 푸시하면 자동으로 Next.js 빌드 후 Cloudflare Pages에 배포됩니다
   - 배포 URL: `https://meme-generator.pages.dev` (프로젝트명에 따라 다름)

## 주의사항

- ImgFlip 계정 정보는 브라우저에 저장되지 않습니다
- 네트워크 연결이 필요합니다
- CORS 정책으로 인해 로컬 파일로 실행 시 일부 기능이 제한될 수 있습니다

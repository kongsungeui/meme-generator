# ImgFlip Meme Generator

ImgFlip API를 사용하여 밈(Meme)을 생성하는 웹 애플리케이션입니다.

## 기능

- **밈 템플릿 선택**: ImgFlip API에서 제공하는 인기 밈 템플릿 20개를 화면에 표시
- **텍스트 추가**: 선택한 밈에 상단 및 하단 텍스트 추가
- **밈 생성**: ImgFlip API를 통해 커스텀 밈 이미지 생성
- **다운로드**: 생성된 밈 이미지 다운로드

## 사용 방법

1. **ImgFlip 계정 필요**: 밈을 생성하려면 [ImgFlip](https://imgflip.com/) 계정이 필요합니다.

2. **웹 브라우저에서 실행**:
   ```bash
   # index.html 파일을 브라우저에서 열기
   open index.html
   ```

3. **밈 생성 과정**:
   - 20개의 밈 템플릿 중 원하는 것을 선택
   - 상단 텍스트와 하단 텍스트 입력
   - ImgFlip 계정 정보 입력 (username, password)
   - "밈 생성하기" 버튼 클릭
   - 생성된 밈 확인 및 다운로드

## 파일 구조

```
meme_generator/
├── index.html      # 메인 HTML 페이지
├── script.js       # ImgFlip API 연동 JavaScript
├── style.css       # 스타일시트
└── README.md       # 프로젝트 설명
```

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript
- ImgFlip API

## API 정보

- **get_memes**: `https://api.imgflip.com/get_memes` - 밈 템플릿 목록 조회
- **caption_image**: `https://api.imgflip.com/caption_image` - 밈 생성

## 주의사항

- ImgFlip 계정 정보는 브라우저에 저장되지 않습니다
- 네트워크 연결이 필요합니다
- CORS 정책으로 인해 로컬 파일로 실행 시 일부 기능이 제한될 수 있습니다

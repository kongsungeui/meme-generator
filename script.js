// ImgFlip API 엔드포인트
const GET_MEMES_URL = 'https://api.imgflip.com/get_memes';
const CAPTION_IMAGE_URL = 'https://api.imgflip.com/caption_image';

// 전역 변수
let memesData = [];
let selectedMeme = null;

// DOM 요소
const memeGrid = document.getElementById('meme-grid');
const loading = document.getElementById('loading');
const editSection = document.getElementById('edit-section');
const resultSection = document.getElementById('result-section');
const memeListSection = document.getElementById('meme-list-section');

// 페이지 로드 시 밈 템플릿 가져오기
window.addEventListener('DOMContentLoaded', () => {
    fetchMemes();
    setupEventListeners();
});

// 이벤트 리스너 설정
function setupEventListeners() {
    document.getElementById('generate-btn').addEventListener('click', generateMeme);
    document.getElementById('back-btn').addEventListener('click', backToList);
    document.getElementById('new-meme-btn').addEventListener('click', backToList);
    document.getElementById('download-btn').addEventListener('click', downloadMeme);
}

// 밈 템플릿 가져오기
async function fetchMemes() {
    try {
        loading.style.display = 'block';
        const response = await fetch(GET_MEMES_URL);
        const data = await response.json();

        if (data.success) {
            // 처음 20개만 가져오기
            memesData = data.data.memes.slice(0, 20);
            displayMemes();
        } else {
            alert('밈 데이터를 가져오는데 실패했습니다.');
        }
    } catch (error) {
        console.error('Error fetching memes:', error);
        alert('네트워크 오류가 발생했습니다.');
    } finally {
        loading.style.display = 'none';
    }
}

// 밈 목록 화면에 표시
function displayMemes() {
    memeGrid.innerHTML = '';

    memesData.forEach(meme => {
        const memeCard = document.createElement('div');
        memeCard.className = 'meme-card';
        memeCard.innerHTML = `
            <img src="${meme.url}" alt="${meme.name}">
            <p>${meme.name}</p>
        `;
        memeCard.addEventListener('click', () => selectMeme(meme));
        memeGrid.appendChild(memeCard);
    });
}

// 밈 선택
function selectMeme(meme) {
    selectedMeme = meme;
    document.getElementById('selected-meme-img').src = meme.url;
    document.getElementById('selected-meme-name').textContent = meme.name;

    // 섹션 전환
    memeListSection.style.display = 'none';
    editSection.style.display = 'block';
    resultSection.style.display = 'none';
}

// 밈 생성
async function generateMeme() {
    const text0 = document.getElementById('text0').value;
    const text1 = document.getElementById('text1').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('ImgFlip 계정 정보를 입력해주세요.');
        return;
    }

    if (!text0 && !text1) {
        alert('최소 하나의 텍스트를 입력해주세요.');
        return;
    }

    try {
        document.getElementById('generating').style.display = 'block';
        document.getElementById('generate-btn').disabled = true;

        // FormData 생성
        const formData = new FormData();
        formData.append('template_id', selectedMeme.id);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('text0', text0);
        formData.append('text1', text1);

        const response = await fetch(CAPTION_IMAGE_URL, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            showResult(data.data.url);
        } else {
            alert('밈 생성 실패: ' + data.error_message);
        }
    } catch (error) {
        console.error('Error generating meme:', error);
        alert('밈 생성 중 오류가 발생했습니다.');
    } finally {
        document.getElementById('generating').style.display = 'none';
        document.getElementById('generate-btn').disabled = false;
    }
}

// 결과 표시
function showResult(imageUrl) {
    document.getElementById('result-img').src = imageUrl;

    // 섹션 전환
    editSection.style.display = 'none';
    resultSection.style.display = 'block';
}

// 목록으로 돌아가기
function backToList() {
    memeListSection.style.display = 'block';
    editSection.style.display = 'none';
    resultSection.style.display = 'none';

    // 입력 필드 초기화
    document.getElementById('text0').value = '';
    document.getElementById('text1').value = '';

    selectedMeme = null;
}

// 밈 다운로드
function downloadMeme() {
    const imgUrl = document.getElementById('result-img').src;
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'meme.jpg';
    link.target = '_blank';
    link.click();
}

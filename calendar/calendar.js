// HTML 요소들을 변수에 저장
const currentMonthElement = document.getElementById('current-month'); // 현재 월을 표시할 HTML 요소
const calendarBody = document.getElementById('calendar-body'); // 달력의 본문을 담을 HTML 요소
const prevMonthButton = document.getElementById('prev-month'); // 이전 달 버튼
const nextMonthButton = document.getElementById('next-month'); // 다음 달 버튼

// 현재 날짜 객체 생성
const now = new Date(); // 현재 날짜와 시간을 나타내는 Date 객체 생성

// 오늘 날짜를 표시하는 함수
function todaysdate() {
    const today = {
        todayyear: now.getFullYear(), // 현재 연도
        todaydate: now.getDate(), // 오늘 날짜 (일)
        todayyear: now.toLocaleDateString('ko-KO', { year: 'numeric' }), // 현재 연도 (한글 형식)
        todaymonth: now.toLocaleDateString('ko-KO', { month: 'short' }), // 현재 월 (한글 형식)
        todaydate: now.toLocaleDateString('ko-KO', { day: 'numeric' }), // 오늘 날짜 (일) (한글 형식)
        todayofweek: now.toLocaleDateString('ko-KO', { weekday: 'short' }) // 오늘 요일 (한글 형식)
    };

    // today 객체의 값을 HTML 요소에 적용
    for (let key in today) {
        document.getElementById(key).textContent = today[key]; // HTML 요소에 today 객체의 값 설정
    }
}
todaysdate(); // todaysdate 함수 호출하여 오늘 날짜를 표시

// 배경 이미지 전환 버튼 설정
document.addEventListener('DOMContentLoaded', () => { // DOMContentLoaded 이벤트가 발생하면 실행
    const backImage = document.getElementById('my_bg'); // 배경 이미지를 표시할 HTML 요소
    const prevBgButton = document.getElementById('prev-bg'); // 이전 배경 이미지 버튼
    const nextBgButton = document.getElementById('next-bg'); // 다음 배경 이미지 버튼

    // 배경 이미지 목록
    const images = [
        'ilia-bronskiy-yA76eJrAFVg-unsplash.jpg', 
        'car-8647797_1920.jpg', 
        'houses-8618837_1920.jpg', 
        'full-moon-460314_1920.jpg'
    ];
    
    let currentimg = 0; // 현재 배경 이미지 인덱스
    
    // 현재 배경 이미지를 업데이트하는 함수
    function currentBkImage() {
        const imgurl = `./background/${images[currentimg]}`; // 현재 배경 이미지의 URL 생성
        backImage.style.backgroundImage = `url(${imgurl})`; // 배경 이미지 설정
    }

    // 다음 배경 이미지로 전환하는 함수
    function jumpToNextImg() {
        currentimg = (currentimg + 1) % images.length; // 인덱스를 증가시키고, 마지막 이미지에서 처음으로 돌아감
        currentBkImage(); // 배경 이미지 업데이트
    }

    // 이전 배경 이미지로 전환하는 함수
    function jumpToBackImg() {
        currentimg = (currentimg - 1 + images.length) % images.length; // 인덱스를 감소시키고, 처음 이미지에서 마지막으로 돌아감
        currentBkImage(); // 배경 이미지 업데이트
    }

    currentBkImage(); // 초기 배경 이미지 설정

    // 버튼 클릭 시 함수 연결
    prevBgButton.addEventListener('click', jumpToNextImg); // 이전 배경 이미지 버튼 클릭 시 다음 이미지로 전환
    nextBgButton.addEventListener('click', jumpToBackImg); // 다음 배경 이미지 버튼 클릭 시 이전 이미지로 전환
})

// 현재 날짜 객체 저장
let currentDate = new Date(); // 현재 날짜와 시간을 나타내는 Date 객체 생성

// 달력을 렌더링하는 함수
function renderCalendar() {
    // 월의 첫날과 마지막 날 구하기
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // 현재 월의 첫날
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0); // 현재 월의 마지막 날
    const firstDayIndex = firstDay.getDay(); // 첫날의 요일 인덱스
    const lastDate = lastDay.getDate(); // 마지막 날의 날짜

    // 월과 연도 표시
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    currentMonthElement.textContent = `${currentDate.getFullYear()}년 ${monthNames[currentDate.getMonth()]}`; // 현재 연도와 월을 HTML 요소에 표시

    // 달력 초기화
    calendarBody.innerHTML = ''; // 달력 본문 내용 초기화

    // 날짜 추가
    let date = 1; // 날짜 초기화
    for (let i = 0; i < 6; i++) { // 최대 6주 표시
        const row = document.createElement('tr'); // 새로운 행 생성
        let rowisempty = true; // 행이 비어 있는지 여부 초기화

        for (let j = 0; j < 7; j++) { // 주당 7일 표시
            const cell = document.createElement('td'); // 새로운 셀 생성
            if (i === 0 && j < firstDayIndex) { // 첫 주의 공백 채우기
                cell.textContent = ''; // 공백 셀 추가
            } else if (date > lastDate) { // 마지막 날짜 이후 공백 채우기
                cell.textContent = ''; // 공백 셀 추가
            } else {
                cell.textContent = date; // 날짜 셀 추가
                date++; // 날짜 증가
                rowisempty = false; // 행이 비어 있지 않음
            }
            row.appendChild(cell); // 셀을 행에 추가
        }
        if (rowisempty) { // 행이 비어 있으면 반복 중지
            break;
        }
        calendarBody.appendChild(row); // 행을 달력 본체에 추가
    }
}
renderCalendar(); // renderCalendar 함수 호출하여 달력 렌더링

// 이전 달 버튼 클릭 이벤트 리스너
prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1); // 현재 달을 이전 달로 설정
    renderCalendar(); // 달력을 다시 렌더링
});

// 다음 달 버튼 클릭 이벤트 리스너
nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // 현재 달을 다음 달로 설정
    renderCalendar(); // 달력을 다시 렌더링
});

// 할 일 목록에 항목을 추가하는 함수
function addlist(text, checked = false) {
    const todolist = document.querySelector('#list');  // 할 일 목록 HTML 요소
    const newlistitem = document.createElement('li');  // 새로운 리스트 항목 생성
    newlistitem.classList.add('list-item');  // 리스트 항목에 클래스 추가
    
    const checkBox = document.createElement('input');  // 체크박스 생성
    checkBox.setAttribute('type', 'checkbox');  // 체크박스 타입 설정
    checkBox.classList.add('ckbox');  // 체크박스에 클래스 추가
    checkBox.checked = checked;  // 체크 여부 설정

    const span = document.createElement('span');  // 텍스트를 표시할 span 생성
    span.appendChild(document.createTextNode(text));  // 텍스트 노드 추가

    // 체크된 상태에 따라 텍스트 스타일 설정
    if (checked) {
        span.style.textDecorationLine = 'line-through';  // 체크된 항목에 취소선 추가
    } else {
        span.style.textDecorationLine = 'none';  // 체크되지 않은 항목에 취소선 없음
    }
   
    // 체크박스의 change 이벤트 리스너 추가
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            span.style.textDecorationLine = 'line-through';  // 체크 시 취소선 추가
        } else {
            span.style.textDecorationLine = 'none';  // 체크 해제 시 취소선 없음
        }
        saveList();  // 변경 사항 저장
    });

    const deleteButton = document.createElement('button');  // 삭제 버튼 생성
    deleteButton.textContent = '삭제';  // 삭제 버튼의 텍스트 설정
    deleteButton.classList.add('delete-button');  // 삭제 버튼에 클래스 추가
    deleteButton.addEventListener('click', () => {  // 삭제 버튼 클릭 이벤트 리스너 추가
        todolist.removeChild(newlistitem);  // 리스트 항목 삭제
        saveList();  // 변경 사항 저장
    });

    newlistitem.appendChild(checkBox);  // 체크박스를 리스트 항목에 추가
    newlistitem.appendChild(span);  // 텍스트를 리스트 항목에 추가
    newlistitem.appendChild(deleteButton);  // 삭제 버튼을 리스트 항목에 추가
    
    todolist.appendChild(newlistitem);  // 리스트에 항목 추가
}

// 할 일 목록을 로컬 스토리지에 저장하는 함수
function saveList() {
    const todolist = document.querySelector('#list');  // 할 일 목록 HTML 요소
    const items = Array.from(todolist.children).map(item => {  // 리스트 항목을 배열로 변환
        const checkbox = item.querySelector('.ckbox');  // 체크박스 요소 선택
        const span = item.querySelector('span');  // 텍스트 요소 선택
        return {
            text: span.textContent,  // 항목 텍스트
            checked: checkbox.checked  // 체크 여부
        };
    });
    localStorage.setItem('todoList', JSON.stringify(items));  // 로컬 스토리지에 저장
}

// 로컬 스토리지에서 할 일 목록을 로드하고 표시하는 함수
function showList() {
    const savedList = localStorage.getItem('todoList');  // 로컬 스토리지에서 목록 가져오기
    if (savedList) {
        const items = JSON.parse(savedList);  // JSON 문자열을 객체로 변환
        items.forEach(item => addlist(item.text, item.checked));  // 항목 추가
    }
}

// '추가' 버튼 클릭 이벤트 리스너
const addButton = document.querySelector('#add-button');  // '추가' 버튼 요소 선택
addButton.addEventListener('click', () => {
    const userinput = document.querySelector('#input');  // 입력 필드 요소 선택
    const text = userinput.value.trim();  // 입력값에서 공백 제거

    // 입력값이 비어있지 않으면 리스트에 추가
    if (text !== '') {
        addlist(text);  // 입력값을 리스트에 추가
        userinput.value = '';  // 입력 필드 초기화
        userinput.focus();  // 입력 필드에 포커스 설정
    }  
    saveList();  // 리스트 저장
});

showList();  // 저장된 할 일 목록을 표시




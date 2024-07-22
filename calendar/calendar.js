// HTML 요소들을 변수에 저장
const currentMonthElement = document.getElementById('current-month');
const calendarBody = document.getElementById('calendar-body');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

// 현재 날짜 객체 생성
const now = new Date();

// 오늘 날짜를 표시하는 함수
function todaysdate() {
    const today = {
        todayyear: now.getFullYear(),
        todaydate: now.getDate(),
        todayyear: now.toLocaleDateString('ko-KO', { year: 'numeric' }),
        todaymonth: now.toLocaleDateString('ko-KO', { month: 'short' }),
        todaydate: now.toLocaleDateString('ko-KO', { day: 'numeric' }),
        todayofweek: now.toLocaleDateString('ko-KO', { weekday: 'short' })
    };

    // today 객체의 값을 HTML 요소에 적용
    for (let key in today) {
        document.getElementById(key).textContent = today[key];
    }
}
todaysdate(); // todaysdate 함수 호출하여 오늘 날짜 표시


//버튼 작업중//
const prevBg = document.getElementById('prev-bg');
const nextBg = document.getElementById('next-bg');










// 현재 날짜 객체 저장
let currentDate = new Date();

// 달력을 렌더링하는 함수
function renderCalendar() {
    // 월의 첫날과 마지막 날 구하기
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const firstDayIndex = firstDay.getDay();
    const lastDate = lastDay.getDate();

    // 월과 연도 표시
    const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    currentMonthElement.textContent = `${currentDate.getFullYear()}년 ${monthNames[currentDate.getMonth()]} `;

    // 달력 초기화
    calendarBody.innerHTML = '';

    // 날짜 추가
    let date = 1;
    for (let i = 0; i < 6; i++) { // 최대 6주 표시
        const row = document.createElement('tr');
        let rowisempty = true;

        for (let j = 0; j < 7; j++) { // 주당 7일 표시
            const cell = document.createElement('td');
            if (i === 0 && j < firstDayIndex) { // 첫 주의 공백 채우기
                cell.textContent = '';
            } else if (date > lastDate) { // 마지막 날짜 이후 공백 채우기
                cell.textContent = '';
            } else {
                cell.textContent = date; // 날짜 채우기
                date++;
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
    renderCalendar(); // 달력을 다시 구성
});

// 다음 달 버튼 클릭 이벤트 리스너
nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1); // 현재 달을 다음 달로 설정
    renderCalendar(); // 달력을 다시 구성
});

// '추가' 버튼 클릭 이벤트 리스너
const addButton = document.querySelector('#add-button');
addButton.addEventListener('click', () => {
    const userinput = document.querySelector('#input');
    const text = userinput.value.trim(); // 입력값에서 공백 제거

    if(text !== '') {
       addlist(text); // 입력값이 비어있지 않으면 리스트에 추가
       userinput.value = ''; // 입력 필드 초기화
       userinput.focus(); // 입력 필드에 포커스 설정
    } 
});

// 할 일 목록에 항목을 추가하는 함수
function addlist(text) {
    const todolist = document.querySelector('#list');
    const newlistitem = document.createElement('li'); // 새로운 리스트 항목 생성
    newlistitem.classList.add('list-item'); // 클래스 추가
    
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type','checkbox');
    checkBox.classList.add('ckbox'); // 추가

    
   



    

    const span = document.createElement('span');
    span.appendChild(document.createTextNode(text));


    // 체크박스의 change 이벤트 리스너 추가
    checkBox.addEventListener('change', () => {
        if (checkBox.checked) {
            span.style.textDecorationLine = 'line-through'
        } else {
            span.style.textDecorationLine = 'none'  
        }
    });

    const deleteButton = document.createElement('button'); // 삭제 버튼 생성 
    deleteButton.textContent = '삭제'; // 삭제 버튼 텍스트 설정 
    deleteButton.classList.add('delete-button'); // 삭제 버튼에 클래스 추가 
    deleteButton.addEventListener('click', () => { // 삭제 버튼 클릭 이벤트 리스너 추가
        todolist.removeChild(newlistitem); // 리스트 항목 삭제 
    });

    newlistitem.appendChild(checkBox); // 체크박스를 리스트 항목에 추가
    newlistitem.appendChild(span);
    newlistitem.appendChild(deleteButton); // 삭제 버튼을 리스트 항목에 추가 
    
    todolist.appendChild(newlistitem); // 리스트에 항목 추가
}
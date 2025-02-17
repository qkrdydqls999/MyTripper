function loadComponent(id, file) {
  fetch('../_common/' + file) // 경로 수정
    .then((response) => response.text())
    .then((data) => (document.getElementById(id).innerHTML = data))
    .then(() => {
      // header 로드 후 실행되는 콜백 함수 추가
      updateHeaderBasedOnLoginStatus(); // 헤더 업데이트 함수 호출
    });
}

function loadMetaTags(file) {
  fetch('../_common/' + file) // 경로 수정
    .then((response) => response.text())
    .then((data) => {
      document.head.innerHTML += data;
    });
}

function updateHeaderBasedOnLoginStatus() {
  document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('token');
    const signinItem = document.getElementById('signin-item');
    const registerItem = document.getElementById('register-item');
    const logoutItem = document.getElementById('logout-item');
    const myPageItem = document.getElementById('mypage-item');

    if (signinItem && registerItem && logoutItem && myPageItem){
        if (token) {
            signinItem.style.display = 'none';
            registerItem.style.display = 'none';
            logoutItem.style.display = 'block';
            myPageItem.style.display = 'block';
        } else {
            signinItem.style.display = 'block';
            registerItem.style.display = 'block';
            logoutItem.style.display = 'none';
            myPageItem.style.display = 'none';
        }
    } else {
        console.error("header element is missing");
    }
  });
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  updateHeaderBasedOnLoginStatus();
  alert('로그아웃 되었습니다.');
  window.location.href = '/index.html'; // 절대 경로 사용
}
  // (선택 사항) 서버에 로그아웃 요청을 보낼 수도 있습니다.
  // fetch("http://localhost:3000/logout", { method: "POST" });


// 헤더와 푸터 로드
loadComponent('header', 'header.html');
loadComponent('footer', 'footer.html');
loadMetaTags('meta-tags.html');
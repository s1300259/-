document.getElementById('add-book-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // 本のタイトルと画像の情報を取得
    const title = document.getElementById('book-title').value;
    const fileInput = document.getElementById('book-cover');
    const file = fileInput.files[0];
    const reader = new FileReader();

    // 画像ファイルの読み込みが完了したら、本棚に追加
    reader.onload = function(e) {
        const bookshelf = document.getElementById('bookshelf');

        // 本の要素を作成
        const book = document.createElement('div');
        book.classList.add('book');

        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = title;
        img.classList.add('book-cover');

        const bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = title;

        // 本の要素に画像とタイトルを追加
        book.appendChild(img);
        book.appendChild(bookTitle);

        // 本棚に本を追加
        bookshelf.appendChild(book);

        // フォームをリセット
        document.getElementById('add-book-form').reset();

        // 本をクリックしたときにポップアップを開くイベントを追加
        book.addEventListener('click', function() {
            openPopup(title, e.target.result);
        });
    };

    // 画像ファイルをData URLとして読み込む
    if (file) {
        reader.readAsDataURL(file);
    }
});

// ポップアップを開く関数
function openPopup(title, coverSrc) {
    const popup = document.getElementById('book-popup');
    const popupTitle = document.getElementById('popup-book-title');
    const popupCover = document.getElementById('popup-book-cover');
    const savedComment = document.getElementById('saved-comment');
    const commentInput = document.getElementById('book-comment');

    popupTitle.textContent = title;
    popupCover.src = coverSrc;

    // 以前のコメントがあれば表示
    savedComment.textContent = localStorage.getItem(title + '-comment') || '';

    // ポップアップを表示
    popup.style.display = 'block';

    // 保存ボタンを押した時の処理
    document.getElementById('save-comment').onclick = function() {
        const comment = commentInput.value;
        savedComment.textContent = comment;

        // コメントをローカルストレージに保存
        localStorage.setItem(title + '-comment', comment);

        // フィールドをリセット
        commentInput.value = '';
    };
}

// ポップアップを閉じる
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('book-popup').style.display = 'none';
});

// ポップアップの外側をクリックした場合に閉じる
window.addEventListener('click', function(event) {
    const popup = document.getElementById('book-popup');
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});

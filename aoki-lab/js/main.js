// main.js - Aoki Labサイト用のJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // モーダルウィンドウの制御
    const modal = document.getElementById('requestModal');
    const thumbnails = document.querySelectorAll('.work-thumbnail');
    const closeModal = document.querySelector('.close-modal');
    
    if (modal && thumbnails.length > 0 && closeModal) {
        // サムネイルクリック時にモーダルを表示
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                modal.style.display = 'block';
                
                // どの作品が選択されたかを特定
                const workTitle = this.querySelector('h3').textContent;
                
                // 隠しフィールドがあればそこに作品名をセット
                const workTitleField = document.getElementById('workTitle');
                if (workTitleField) {
                    workTitleField.value = workTitle;
                }
            });
        });
        
        // 閉じるボタンでモーダルを非表示
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // モーダル外クリックでも閉じられるように
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // カテゴリータブの制御
    const tabButtons = document.querySelectorAll('.tab-button');
    const workItems = document.querySelectorAll('.work-item');
    
    if (tabButtons.length > 0 && workItems.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // アクティブなタブを切り替え
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 選択されたカテゴリー
                const selectedCategory = this.getAttribute('data-category');
                
                // 作品の表示/非表示を切り替え
                workItems.forEach(item => {
                    if (selectedCategory === 'all') {
                        item.style.display = 'block';
                    } else {
                        const categories = item.getAttribute('data-categories').split(' ');
                        if (categories.includes(selectedCategory)) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // 作品スライダーの制御
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.querySelector('.slider-control.prev');
    const nextButton = document.querySelector('.slider-control.next');
    
    if (sliderContainer && prevButton && nextButton) {
        let currentPosition = 0;
        const itemWidth = document.querySelector('.work-item').offsetWidth;
        const itemCount = document.querySelectorAll('.work-item').length;
        
        // ウィンドウサイズに応じてスライド数を調整
        function getItemsPerSlide() {
            if (window.innerWidth > 1024) {
                return 3;
            } else if (window.innerWidth > 768) {
                return 2;
            } else {
                return 1;
            }
        }
        
        // スライダーを更新する関数
        function updateSlider() {
            if (currentPosition > 0) {
                prevButton.style.display = 'flex';
            } else {
                prevButton.style.display = 'none';
            }
            
            const itemsPerSlide = getItemsPerSlide();
            const maxPosition = Math.max(0, itemCount - itemsPerSlide);
            
            if (currentPosition < maxPosition) {
                nextButton.style.display = 'flex';
            } else {
                nextButton.style.display = 'none';
            }
            
            sliderContainer.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
        }
        
        // 前へボタン
        prevButton.addEventListener('click', function() {
            currentPosition = Math.max(0, currentPosition - 1);
            updateSlider();
        });
        
        // 次へボタン
        nextButton.addEventListener('click', function() {
            const itemsPerSlide = getItemsPerSlide();
            const maxPosition = Math.max(0, itemCount - itemsPerSlide);
            currentPosition = Math.min(maxPosition, currentPosition + 1);
            updateSlider();
        });
        
        // 初期化
        updateSlider();
        
        // ウィンドウリサイズ時にスライダーを更新
        window.addEventListener('resize', function() {
            updateSlider();
        });
    }
    
    // フォーム送信処理
    const requestForm = document.getElementById('requestForm');
    
    if (requestForm) {
        requestForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // フォームデータの取得
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value || '未入力',
                source: document.getElementById('source').value || '未入力',
                privacy: document.getElementById('privacy').checked,
                // 作品タイトルはhiddenフィールドから取得
                workTitle: document.getElementById('workTitle')?.value || '未指定'
            };
            
            // LocalStorageに保存（一時的な実装）
            // 実際の実装ではサーバーにPOSTする
            saveRequestToLocalStorage(formData);
            
            // データ収集後、直接作品ページへリダイレクト
            alert('情報を受け付けました。作品をご覧いただけます。');
            
            // モーダルを閉じる
            document.getElementById('requestModal').style.display = 'none';
            
            // フォームリセット
            requestForm.reset();
            
            // 作品ページへリダイレクト（実際の実装では対象の作品ページURLを設定）
            // 例: window.location.href = 'portfolio-category.html?work=' + encodeURIComponent(formData.workTitle);
        });
    }
    
    // LocalStorageへの保存関数
    function saveRequestToLocalStorage(data) {
        // 既存のリクエストを取得
        let requests = JSON.parse(localStorage.getItem('viewRequests') || '[]');
        
        // 新しいリクエストを追加
        requests.push({
            ...data,
            requestDate: new Date().toISOString(),
            status: 'pending' // 初期ステータス
        });
        
        // LocalStorageに保存
        localStorage.setItem('viewRequests', JSON.stringify(requests));
    }
});
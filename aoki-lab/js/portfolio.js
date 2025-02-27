// portfolio.js - ポートフォリオページ用のJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // スクロールによるフェードイン効果
    const fadeItems = document.querySelectorAll('.fade-item');
    
    // Intersection Observer の設定
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 要素が画面内に入ったらvisibleクラスを追加
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示されたら監視を解除（オプション）
                // fadeObserver.unobserve(entry.target);
            } else {
                // スクロールで上に戻った時に再度フェードインさせる場合はこの行を有効化
                // entry.target.classList.remove('visible');
            }
        });
    }, {
        // オプション設定
        root: null, // ビューポートをルートとして使用
        rootMargin: '0px', // マージンなし
        threshold: 0.1 // 10%が見えたらコールバックを実行
    });
    
    // 各フェードアイテムを監視対象に追加
    fadeItems.forEach(item => {
        fadeObserver.observe(item);
    });
    // 作品データ（実際の実装ではAPI/JSONから取得するか、WordPress CMSから取得）
    const portfolioData = {
        'commercial-01': {
            title: 'アサヒビールCM',
            vimeoId: '123456789', // 実際のVimeo IDに置き換え
            year: '2023',
            client: 'アサヒビール株式会社',
            production: 'クリエイティブエージェンシー'
        },
        'commercial-02': {
            title: 'TOYOTA CM',
            vimeoId: '234567890', // 実際のVimeo IDに置き換え
            year: '2022',
            client: 'トヨタ自動車株式会社',
            production: 'プロダクションカンパニー'
        },
        'mv-01': {
            title: 'ONE OK ROCK MV',
            vimeoId: '345678901', // 実際のVimeo IDに置き換え
            year: '2023',
            client: 'ONE OK ROCK',
            production: 'レコード会社'
        },
        'mv-02': {
            title: 'RADWIMPS MV',
            vimeoId: '456789012', // 実際のVimeo IDに置き換え
            year: '2022',
            client: 'RADWIMPS',
            production: 'レコード会社'
        },
        'web-01': {
            title: 'Apple Japan WEB CM',
            vimeoId: '567890123', // 実際のVimeo IDに置き換え
            year: '2023',
            client: 'Apple Japan',
            production: 'デジタルエージェンシー'
        },
        'other-01': {
            title: 'Short Film "Twilight"',
            vimeoId: '678901234', // 実際のVimeo IDに置き換え
            year: '2021',
            client: 'Self Production',
            production: 'Aoki Lab.'
        }
    };

    // フィルタータブの機能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.grid-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブクラスの切り替え
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 選択したカテゴリー
            const selectedFilter = this.getAttribute('data-filter');
            
            // フィルタリング処理
            portfolioItems.forEach(item => {
                if (selectedFilter === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    if (item.classList.contains(selectedFilter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });

    // ビデオモーダルの処理
    const portfolioModal = document.getElementById('portfolioModal');
    const viewButtons = document.querySelectorAll('.view-work-btn');
    const closeModal = portfolioModal.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalTitle');
    const videoPlayer = document.getElementById('videoPlayer');
    const modalYear = document.getElementById('modalYear');
    const modalClient = document.getElementById('modalClient');
    const modalProduction = document.getElementById('modalProduction');
    
    // 作品ビューボタンクリック時
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // バブリング防止
            
            const workId = this.getAttribute('data-work-id');
            const workData = portfolioData[workId];
            
            if (workData) {
                // モーダルデータを設定
                modalTitle.textContent = workData.title;
                modalYear.textContent = workData.year;
                modalClient.textContent = workData.client;
                modalProduction.textContent = workData.production;
                
                // Vimeoプレーヤーを生成
                videoPlayer.innerHTML = `<iframe src="https://player.vimeo.com/video/${workData.vimeoId}?autoplay=0&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                
                // モーダルを表示
                portfolioModal.style.display = 'block';
                
                // スクロール禁止
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // モーダルを閉じる
    closeModal.addEventListener('click', function() {
        portfolioModal.style.display = 'none';
        
        // Vimeoプレーヤーをクリア（メモリ解放のため）
        videoPlayer.innerHTML = '';
        
        // スクロール許可
        document.body.style.overflow = '';
    });
    
    // モーダル外クリックでも閉じる
    window.addEventListener('click', function(event) {
        if (event.target === portfolioModal) {
            portfolioModal.style.display = 'none';
            videoPlayer.innerHTML = '';
            document.body.style.overflow = '';
        }
    });

    // アクセスリクエストモーダル
    const accessRequestModal = document.getElementById('accessRequestModal');
    const accessForm = document.getElementById('accessRequestForm');
    const accessCloseModal = accessRequestModal.querySelector('.close-modal');
    
    // 初回訪問チェック
    function checkFirstVisit() {
        const hasVisited = localStorage.getItem('visited');
        if (!hasVisited) {
            // 初回訪問の場合、モーダルを表示
            accessRequestModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // フォーム送信時の処理
    if (accessForm) {
        accessForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // フォームデータの収集
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value || '未入力',
                source: document.getElementById('source').value || '未入力',
                privacy: document.getElementById('privacy').checked,
                timestamp: new Date().toISOString()
            };
            
            // ローカルストレージに訪問フラグを保存
            localStorage.setItem('visited', 'true');
            
            // 訪問者情報を保存（実際の実装ではAPIでサーバーに送信）
            saveVisitorInfo(formData);
            
            // モーダルを閉じる
            accessRequestModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // アニメーション効果でポートフォリオを表示
            const gridItems = document.querySelectorAll('.grid-item');
            gridItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 100);
            });
        });
    }
    
    // 閉じるボタンの処理
    if (accessCloseModal) {
        accessCloseModal.addEventListener('click', function() {
            // 閉じるボタンでもアクセス許可（通常はフォーム送信が望ましいが、UXの観点から）
            localStorage.setItem('visited', 'true');
            accessRequestModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    
    // 訪問者情報を保存（LocalStorageを使用した仮実装）
    function saveVisitorInfo(data) {
        let visitors = JSON.parse(localStorage.getItem('portfolioVisitors') || '[]');
        visitors.push(data);
        localStorage.setItem('portfolioVisitors', JSON.stringify(visitors));
        
        // 実際の実装では以下のようにAPIを呼び出す
        // fetch('/api/save-visitor', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    }
    
    // 初回訪問チェックを実行
    checkFirstVisit();
    
    // 画像の遅延読み込み
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src') || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Intersection Observerがサポートされていない場合の代替処理
        lazyImages.forEach(img => {
            img.src = img.getAttribute('data-src') || img.src;
        });
    }
});

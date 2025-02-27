// contact.js - Aoki Lab コンタクトフォーム用のJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // コンタクトフォーム送信処理
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // フォームバリデーション
            if (!validateForm()) {
                return;
            }
            
            // フォームデータの取得
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value || '未入力',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                privacy: document.getElementById('privacy').checked
            };
            
            // フォーム送信をシミュレート
            // 実際の実装では、サーバーにPOSTリクエストを送信
            sendFormData(formData);
        });
    }
    
    // フォームバリデーション関数
    function validateForm() {
        // 必須フィールドの確認
        const requiredFields = ['name', 'email', 'subject', 'message'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            const value = input.value.trim();
            
            if (!value) {
                markInvalid(input, '入力してください');
                isValid = false;
            } else {
                markValid(input);
            }
        });
        
        // メールアドレスの形式確認
        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        
        if (emailValue && !isValidEmail(emailValue)) {
            markInvalid(emailInput, '有効なメールアドレスを入力してください');
            isValid = false;
        }
        
        // プライバシーポリシーの同意確認
        const privacyCheckbox = document.getElementById('privacy');
        if (!privacyCheckbox.checked) {
            alert('プライバシーポリシーに同意してください');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 入力フィールドの無効マークを設定
    function markInvalid(input, message) {
        input.classList.add('invalid');
        
        // エラーメッセージの表示
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        
        errorElement.textContent = message;
    }
    
    // 入力フィールドの有効マークを設定
    function markValid(input) {
        input.classList.remove('invalid');
        
        // エラーメッセージの削除
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    // メールアドレスバリデーション
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // フォームデータ送信関数（シミュレーション）
    function sendFormData(data) {
        // 送信中の表示
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = '送信中...';
        submitButton.disabled = true;
        
        // 実際の実装ではここでサーバーにデータを送信
        // 今回はシミュレーションのため、setTimeout で成功を模倣
        setTimeout(function() {
            // 送信成功
            alert('お問い合わせを受け付けました。ありがとうございます。');
            
            // フォームリセット
            contactForm.reset();
            
            // ボタンを元に戻す
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
        
        // フォームデータをコンソールに出力（デバッグ用）
        console.log('送信データ:', data);
    }
    
    // 入力フィールド変更時の処理
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                if (this.value.trim()) {
                    markValid(this);
                }
            }
        });
    });
});

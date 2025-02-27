// main.jsに追加する機材タブ切り替え機能

document.addEventListener('DOMContentLoaded', function() {
    // 既存のmain.jsの内容はそのままに、以下を追加
    
    // 機材タブの制御
    const equipmentTabs = document.querySelectorAll('.equipment-tab');
    const equipmentLists = document.querySelectorAll('.equipment-list');
    
    if (equipmentTabs.length > 0 && equipmentLists.length > 0) {
        equipmentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // アクティブタブの切り替え
                equipmentTabs.forEach(t => t.
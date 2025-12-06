import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 🚀 CORS 문제 해결을 위한 프록시 설정
  server: {
    proxy: {
      // 당신의 앱에서 '/api'로 시작하는 모든 요청을 가로챕니다.
      '/api': {
        // 원래 접속하려던 서버 주소 (hub.weirdhost.xyz)를 target으로 지정합니다.
        target: 'https://hub.weirdhost.xyz', 
        
        // CORS를 우회하기 위해 요청 헤더의 Origin을 대상 서버에 맞게 변경합니다.
        changeOrigin: true, 
        
        // 요청 경로를 재작성하여, '/api' 부분을 제거하고 대상 서버로 보냅니다.
        // 예: /api/client/servers/... -> /client/servers/...
        rewrite: (path) => path.replace(/^\/api/, ''), 
        
        // HTTPS 대상 서버의 SSL 인증서 검증을 무시합니다. (개발 시 유용)
        secure: false,
      },
    },
  },
})

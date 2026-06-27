# Deploy lên Vercel

Trang đã có sẵn `vercel.json` — chỉ cần kết nối repo là Vercel tự động deploy mỗi lần push.

## Cách kết nối (1 lần)

1. Push code này lên GitHub (hoặc GitLab/Bitbucket).
2. Vào https://vercel.com/new → **Import Project** → chọn repo.
3. Vercel tự nhận diện cấu hình từ `vercel.json`:
   - Install: `bun install`
   - Build: `bun run build`
   - Output: `.output/public`
4. Bấm **Deploy**. Xong.

Mỗi commit lên `main` sẽ auto-deploy production; PR sẽ có preview URL riêng — không cần thao tác thêm.

## Custom domain

Vercel Dashboard → Project → **Settings → Domains** → thêm domain của bạn (ví dụ `transcriber-kun.app`) và trỏ DNS theo hướng dẫn.

# راهنمای تنظیم Google OAuth 2.0

این راهنما به شما کمک می‌کند تا Google OAuth 2.0 را برای پروژه خود تنظیم کنید.

## مراحل تنظیم

### 1. ایجاد پروژه جدید در Google Cloud Console

1. به [Google Cloud Console](https://console.cloud.google.com/) بروید
2. اگر حساب Google ندارید، یک حساب ایجاد کنید
3. در بالای صفحه، روی **Select a project** کلیک کنید
4. روی **New Project** کلیک کنید
5. نام پروژه را وارد کنید (مثلاً: `Crypto-Dashboard`)
6. روی **Create** کلیک کنید
7. منتظر بمانید تا پروژه ایجاد شود (چند ثانیه طول می‌کشد)

### 2. فعال‌سازی Google+ API

1. در منوی سمت چپ، به **APIs & Services > Library** بروید
2. در جستجو، `Google+ API` یا `Google Identity` را جستجو کنید
3. روی **Google+ API** کلیک کنید
4. روی **Enable** کلیک کنید

**نکته:** در واقع برای OAuth 2.0 نیازی به Google+ API نیست، اما می‌توانید از **Google Identity** استفاده کنید.

### 3. ایجاد OAuth 2.0 Credentials

1. به **APIs & Services > Credentials** بروید
2. در بالای صفحه، روی **+ CREATE CREDENTIALS** کلیک کنید
3. **OAuth client ID** را انتخاب کنید

### 4. تنظیم OAuth Consent Screen (اولین بار)

اگر اولین بار است که OAuth استفاده می‌کنید:

1. روی **Configure Consent Screen** کلیک کنید
2. **External** را انتخاب کنید (برای تست) و روی **Create** کلیک کنید
3. اطلاعات زیر را وارد کنید:
   - **App name**: نام اپلیکیشن شما (مثلاً: Crypto Dashboard)
   - **User support email**: ایمیل شما
   - **Developer contact information**: ایمیل شما
4. روی **Save and Continue** کلیک کنید
5. در **Scopes**، روی **Save and Continue** کلیک کنید (نیازی به تغییر نیست)
6. در **Test users**، می‌توانید ایمیل‌های تست اضافه کنید (اختیاری)
7. روی **Save and Continue** کلیک کنید
8. روی **Back to Dashboard** کلیک کنید

### 5. ایجاد OAuth Client ID

1. دوباره به **APIs & Services > Credentials** بروید
2. روی **+ CREATE CREDENTIALS > OAuth client ID** کلیک کنید
3. **Application type** را **Web application** انتخاب کنید
4. **Name** را وارد کنید (مثلاً: Crypto Dashboard Web Client)
5. در بخش **Authorized redirect URIs**، این URL را اضافه کنید:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. روی **Create** کلیک کنید
7. یک پنجره باز می‌شود که **Client ID** و **Client Secret** را نشان می‌دهد
8. این دو مقدار را کپی کنید (بعداً نیاز دارید)

### 6. تنظیم فایل .env

1. در ریشه پروژه، فایل `.env` را باز کنید (یا ایجاد کنید)
2. این متغیرها را اضافه کنید:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-client-id-from-google
GOOGLE_CLIENT_SECRET=your-client-secret-from-google
```

**نکات مهم:**
- `NEXTAUTH_SECRET`: یک رشته تصادفی و امن است. می‌توانید از این دستور استفاده کنید:
  ```bash
  openssl rand -base64 32
  ```
  یا از [این سایت](https://generate-secret.vercel.app/32) استفاده کنید

- `GOOGLE_CLIENT_ID`: Client ID که از Google Console کپی کردید
- `GOOGLE_CLIENT_SECRET`: Client Secret که از Google Console کپی کردید

### 7. برای Production

وقتی پروژه را deploy می‌کنید:

1. به Google Cloud Console بروید
2. به **APIs & Services > Credentials** بروید
3. OAuth Client ID خود را باز کنید
4. در **Authorized redirect URIs**، URL production خود را اضافه کنید:
   ```
   https://yourdomain.com/api/auth/callback/google
   ```
5. در `.env` یا environment variables سرور، `NEXTAUTH_URL` را به URL production تغییر دهید

## تست

1. سرور را restart کنید:
   ```bash
   npm run dev
   ```

2. به صفحه register بروید
3. روی دکمه **Continue with Google** کلیک کنید
4. باید به صفحه Google redirect شوید
5. بعد از لاگین، به صفحه اصلی برگردید

## عیب‌یابی

### خطای "OAuthCallback"
- مطمئن شوید که `NEXTAUTH_URL` در `.env` درست تنظیم شده است
- مطمئن شوید که Redirect URI در Google Console دقیقاً این است:
  ```
  http://localhost:3000/api/auth/callback/google
  ```
- مطمئن شوید که Client ID و Secret درست کپی شده‌اند

### خطای "redirect_uri_mismatch"
- Redirect URI در Google Console باید دقیقاً با URL در کد شما یکسان باشد
- مطمئن شوید که از `http://` (نه `https://`) برای localhost استفاده می‌کنید

### خطای "invalid_client"
- Client ID یا Secret اشتباه است
- دوباره از Google Console کپی کنید

## منابع

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)










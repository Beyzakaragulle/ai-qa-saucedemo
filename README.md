# AI QA Agent — SauceDemo E2E Test Suite

AI destekli QA agent olarak Claude'un yazdığı, çalıştırdığı ve analiz ettiği Playwright tabanlı end-to-end test suite. Hedef: [saucedemo.com](https://www.saucedemo.com)

---

## Test Kapsamı

| Sayfa | Kategori | Kullanıcı Tipleri |
|---|---|---|
| Login | Happy path, Negative, Edge case | standard, locked, problem, performance |
| Products | *(yakında)* | — |
| Cart | *(yakında)* | — |
| Checkout | *(yakında)* | — |

---

## Kurulum

```bash
npm install
npx playwright install chromium
```

## Testleri Çalıştırma

```bash
# Headless — CI modu
npm test

# Headed + yavaş — görsel takip için
npm run test:headed

# İnteraktif test runner
npm run test:ui

# HTML raporu aç
npm run test:report
```

---

## Proje Yapısı

```
tests/
├── e2e/
│   ├── login.spec.ts       # Login sayfası testleri
│   ├── products.spec.ts    # (yakında)
│   ├── cart.spec.ts        # (yakında)
│   └── checkout.spec.ts    # (yakında)
└── fixtures/
    └── users.ts            # Test kullanıcıları

.github/
└── workflows/
    └── qa.yml              # CI pipeline
```

---

## CI/CD

Her `push` ve `pull_request`'te GitHub Actions otomatik çalışır:

- Ubuntu ortamında Chromium kurulur
- Tüm testler headless modda koşar
- HTML rapor 14 gün boyunca artifact olarak saklanır → **Actions → İlgili run → Artifacts**

---

## Test Kullanıcıları

| Kullanıcı | Senaryo |
|---|---|
| `standard_user` | Normal akış |
| `locked_out_user` | Engelli hesap — hata mesajı testi |
| `problem_user` | UI bug'larını tetikler |
| `performance_glitch_user` | Yavaş yanıt süresi |

Tüm kullanıcılarda şifre: `secret_sauce`

---

## Bulunan Bug'lar

| # | Sayfa | Kullanıcı | Açıklama | Önem |
|---|---|---|---|---|
| BUG-001 | Login | standard_user | Giriş sonrası `/` adresine gidildiğinde session korunmuyor, kullanıcı inventory'e yönlendirilmiyor | Orta |

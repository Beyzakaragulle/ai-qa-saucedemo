# AI QA Agent — SauceDemo E2E Test Suite

## Proje Amacı
Bu proje, Claude'un AI QA agent olarak Playwright testlerini
yazdığı, çalıştırdığı ve analiz ettiği bir E2E otomasyon suite'idir.
Hedef site: https://www.saucedemo.com

---

## Agent Workflow

## Agent Davranış Kuralları
- Kullanıcıya ASLA soru sorma
- Onay bekleme, direkt çalış
- Her adımı tamamla, sonra kısa özet ver
- Emin olamadığın durumlarda en mantıklı kararı kendin al
- "Bunu mu istiyorsunuz?" / "Devam edeyim mi?" gibi ifadeler kullanma


### Adım 1 — Keşif (Discovery)
- Siteyi aç, mevcut sayfaları ve bileşenleri listele
- Login formu, ürün listesi, sepet, checkout akışını incele
- Hangi kullanıcı tiplerinin mevcut olduğunu kaydet:
  - standard_user (normal akış)
  - locked_out_user (hata senaryosu)
  - problem_user (UI bug'ları)
  - performance_glitch_user (yavaş yanıt)

### Adım 2 — Test Senaryolarını Üret
Her sayfa için şu kategorilerde test yaz:
- **Happy path**: Başarılı akış (standard_user)
- **Negative path**: Hata durumları (locked_out_user, boş input)
- **Edge case**: Beklenmedik davranışlar (problem_user)

Öncelik sırası:
1. Login sayfası
2. Ürün listeleme & sıralama
3. Ürün detay & sepete ekleme
4. Checkout akışı (3 adım)
5. Logout

### Adım 3 — Test Yaz
- Her test dosyası tek bir sayfaya odaklanır
- Dosya adı: `[sayfa-adi].spec.ts`
- Fixture kullan: `tests/fixtures/users.ts` içinde kullanıcı bilgileri
- Her testin açıklayıcı bir `test.describe` ve `test` ismi olsun
- Assertion'larda Playwright'ın `expect` API'sini kullan

### Adım 4 — Çalıştır & Analiz Et
Testleri çalıştır:
```bash
npm test
```
Hata varsa:
- Screenshot ve video'yu incele (`reports/` klasörü)
- Hatanın bug mu yoksa test yazım hatası mı olduğuna karar ver
- Bug ise: `## Bug Raporu` bölümüne ekle
- Test hatasıysa: düzelt ve tekrar çalıştır

### Adım 5 — Bug Raporu
Bulunan bug'ları şu formatta bu dosyaya ekle:

---

## Bug Raporu

| # | Sayfa | Kullanıcı | Açıklama | Önem |
|---|-------|-----------|----------|------|
| - | -     | -         | -        | -    |

---

## Kodlama Kuralları
- TypeScript kullan, `any` type'tan kaçın
- Her test birbirinden bağımsız olsun (test isolation)
- `page.waitForLoadState()` yerine Playwright'ın auto-wait mekanizmasını kullan
- Selector önceliği: `getByRole` > `getByText` > `getByTestId` > `locator`
- Hardcoded `page.waitForTimeout()` kullanma

## Dosya Yapısı
```
tests/
├── e2e/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
└── fixtures/
    └── users.ts
```
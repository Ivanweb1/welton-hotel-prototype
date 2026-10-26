# Welton Hotel — Ч/Б прототип сайта

Схематичный чёрно-белый прототип сайта отеля «Велтон Клаб Отель и Апартаменты» по структуре v2.

- `index.html` — главная страница
- `styles.css` — стили прототипа

## Что важно знать

- Прототип чёрно-белый и схематичный: на месте фото и видео — серые заглушки, тексты — рыба.
- Страница закрыта от индексации: `robots.txt` + мета-тег `noindex`.

## Локальный запуск

```bash
python -m http.server 4412
```

## Материалы

- `brand/` — брендбук «Вэлтон» (PDF) и логотипы в 4 цветах (SVG + PNG)
- `assets/photos/` — фото со старого сайта weltonhotel.ru (уменьшенные копии, временно для дизайна)

Фирменные цвета: Porcelain `#F1EBDD`, Deep Teal `#276065`, Ink `#1B1C1B`, акценты Apricot `#D27D5A`, Champagne `#FFEFCA`, Powder `#EFD6CF`.
Шрифты: Onest 700/500 (основной), Philosopher Bold (акцентный, только слоганы).

## Дизайн главной

- `design/index.html` — главная в фирменном стиле (стили `design/style.css`, скрипт `design/script.js`)
- Смотреть: `python -m http.server 4412` → http://localhost:4412/design/

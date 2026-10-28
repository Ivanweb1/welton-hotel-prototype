# Фото для главной: промпты для генерации

Генерируем **на основе реальных фото со старого сайта** (image-to-image / reference), а не с нуля.
Задача: сохранить настоящий интерьер отеля (планировку, мебель, материалы, окна) и поменять только свет, цвет и качество.
Атмосфера: лёгкость, уют, тепло.

Исходники лежат в `assets/photos/`. Прямые ссылки — в таблице ниже.
Готовые файлы складывайте в `assets/photos/gen/` под именами из колонки «Сохранить как» (JPG, качество 85–90).

## Общая часть промпта (добавлять в конец каждого)

```
Keep the exact same room layout, furniture, materials, windows and camera angle as the reference photo — this is a real hotel, do not invent or remove objects. Only improve light, color and quality. Soft natural daylight from the window, warm and airy atmosphere, light cream and warm beige tones, gentle soft shadows, no harsh contrast, slightly lifted shadows, clean and tidy, editorial hotel photography, shot on a full-frame camera, 35mm lens, high resolution, sharp details, realistic, no people unless present in the reference, no text, no watermark.
```

Негативный промпт (если генератор поддерживает):

```
dark, gloomy, cold blue tones, harsh flash, oversaturated, HDR look, cartoon, CGI, distorted furniture, extra objects, warped lines, text, watermark, people added
```

## Слоты на странице

| # | Где на главной | Исходник | Формат | Сохранить как |
|---|---|---|---|---|
| 1 | Первый экран, фон | [room-main.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/room-main.webp) | 16:9, 2560×1440 | `hero.jpg` |
| 2 | Номера — «Смарт» | [room-bed.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/room-bed.webp) | 4:3, 1600×1200 | `room-smart.jpg` |
| 3 | Номера — «Апартаменты» и блок «Апартаменты для длительного проживания» | [room-tray.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/room-tray.jpg) | 4:3, 1600×1200 | `room-apartments.jpg` |
| 4 | Номера — «Семейный полулюкс» | [room-main.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/room-main.webp) | 4:3, 1600×1200 | `room-family.jpg` |
| 5 | Номера — «Люкс с террасой» | нужен реальный снимок террасы; пока [breakfast-in-bed.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/breakfast-in-bed.jpg) | 4:3, 1600×1200 | `room-suite.jpg` |
| 6 | «Детям» и спецпредложение «Всей семьёй» | [bathroom-kid.png](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/bathroom-kid.png) | 4:5, 1200×1500 | `kids.jpg` |
| 7 | «С питомцем» | исходника нет — на базе [room-bed.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/room-bed.webp) | 4:5, 1200×1500 | `pets.jpg` |
| 8 | Спецпредложение «Спортивный пакет» | [stadium.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/stadium.jpg) | 1:1, 1400×1400 | `sport.jpg` |
| 9 | Бассейн, сауна и тренажёрный зал — галерея на всю ширину (3 кадра) | см. раздел «Галерея спа» ниже | 21:9, 2560×1100 | `pool.jpg`, `spa-sauna.jpg`, `spa-gym.jpg` |
| 10 | Ресторан — большое фото | [dinner.png](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/dinner.png) | 4:5, 1200×1500 | `restaurant.jpg` |
| 11 | Ресторан — малое фото | [breakfast-in-bed.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/breakfast-in-bed.jpg) | 3:4, 1200×1600 | `breakfast.jpg` |
| 12 | Мероприятия — «Деловые» | [conference.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/conference.webp) | 5:4, 1500×1200 | `event-business.jpg` |
| 13 | Мероприятия — «Свадебные» | [terrace-breakfast.webp](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/terrace-breakfast.webp) | 5:4, 1500×1200 | `event-wedding.jpg` |
| 14 | Мероприятия — «Частные» | [lobby.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/lobby.jpg) | 5:4, 1500×1200 | `event-private.jpg` |

## Промпты

**1. hero.jpg — первый экран**
```
Wide interior photo of a hotel room with a wooden slatted partition, wall-mounted TV, wooden desk with an emerald velvet chair and a tall green plant, bed visible on the left, large window with sheer curtains on the right. Bright morning daylight flooding through the window, warm cream and honey wood tones, calm and welcoming. Leave calm, uncluttered space on the left third of the frame for text overlay.
```

**2. room-smart.jpg — «Смарт»**
```
Compact cozy hotel room, neatly made double bed with white linen and folded white bathrobes, wooden headboard panel, small plant on the side. Soft warm daylight, light beige walls, fresh and airy feeling.
```

**3. room-apartments.jpg — «Апартаменты»**
```
Close-up of a hotel bed with white linen and a grey quilted throw, a wooden breakfast tray with an open magazine, a glass of orange juice and a pear, warm wall lamp glowing above, wooden headboard. Lazy slow morning mood, soft golden daylight, warm and homey.
```

**4. room-family.jpg — «Семейный полулюкс»**
```
Spacious hotel suite: living zone with a wooden desk and emerald velvet chair, wooden slatted partition, sleeping area visible behind it, large window with soft curtains. Bright natural daylight, warm cream tones, feeling of space for the whole family. Slightly different crop from a straight-on view, focus on the living area.
```

**5. room-suite.jpg — «Люкс с террасой»**
> Лучше заменить реальным фото террасы люкса. Если его нет — генерировать из исходника 5 так, чтобы не придумывать террасу:
```
Hotel suite bed with a grey quilted bedspread and a dark round tray with syrniki, sour cream and berries, soft window light, crisp white linen. Warm, slow weekend morning, light and airy.
```

**6. kids.jpg — «Детям»**
```
A small child in striped pajamas kneeling on a chair at a bathroom sink in a hotel bathroom with light marble walls, wood accents, warm vertical mirror lights. Warm, tender family mood, soft bright light, cozy and safe.
```

**7. pets.jpg — «С питомцем»**
> Исходника нет, поэтому берём номер из исходника 2 и добавляем питомца. Это единственный слот, где добавляем объект.
```
The same hotel room as in the reference: neatly made double bed with white linen and wooden headboard. A friendly golden retriever lies calmly on a soft pet bed on the floor next to the bed, a small bowl nearby. Soft warm daylight, cozy and welcoming, natural and realistic, the dog looks relaxed and happy.
```

**8. sport.jpg — «Спортивный пакет»**
```
Football stadium with a green pitch under the open roof, evening match atmosphere, warm stadium lights, deep blue sky at golden hour. Festive, energetic but warm color grading, no visible logos or brand names.
```

**9. Галерея спа** — промпты в разделе «Галерея спа» ниже.

**10. restaurant.jpg — ресторан, большое**
```
Elegant dinner table in a restaurant: white plates, crystal glasses, a silver candelabra with lit white candles, a couple's hands resting on the table, people cropped out of the frame. Warm candlelight, romantic and cozy evening, soft bokeh background.
```

**11. breakfast.jpg — ресторан, малое**
```
Top view of a dark round tray with golden syrniki, sour cream, jam and fresh strawberries on a grey quilted hotel bedspread. Bright soft morning light, appetizing, warm tones.
```

**12. event-business.jpg — «Деловые»**
```
Hotel conference room set for a business meeting: long table with dark chairs, a large screen on a stand, air conditioning in the ceiling, clean light walls. Bright even daylight, neutral warm tones, professional yet welcoming.
```

**13. event-wedding.jpg — «Свадебные»**
```
Hotel terrace with a table set for a celebration: white tablecloth, bouquet of pink and white roses, fruit, pastries and glasses of juice, green plants, city buildings in the background. Bright festive daylight, warm and joyful.
```

**14. event-private.jpg — «Частные»**
```
Hotel lobby corner: brass luggage cart with coats, potted green plant, dark wall with a geometric wood relief, patterned stone floor. Warm welcoming light, soft glow, stylish and cozy.
```

## После генерации

Залейте файлы в Releases (как референс) или сразу в `assets/photos/gen/` — я подключу их на страницу.

---

# Обложки видео для блока «Мы в соцсетях»

5 вертикальных обложек **9:16, 1080×1920**. Генерируем в стиле уже готовых фото сайта: берите как референс файлы из `assets/photos/gen/` (указаны ниже) — тот же свет, тёплые кремовые тона, мягкие тени.
Сохраняйте в `assets/photos/gen/` под именами из таблицы. На странице поверх обложки уже стоит кнопка «плей».

Темы взяты из согласованного текста блока: «Клевер на пенке капучино, новое блюдо «Берёзок», вечер у рояля и итоги «Счастливого листа»» + утро в бассейне.

| # | Тема | Референс | Сохранить как |
|---|---|---|---|
| 1 | Клевер на пенке капучино | [breakfast.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/breakfast.jpg) | `reel-cappuccino.jpg` |
| 2 | Новое блюдо «Берёзок» | [restaurant.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/restaurant.jpg) | `reel-dish.jpg` |
| 3 | Вечер у рояля в лобби | [event-private.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/event-private.jpg) | `reel-piano.jpg` |
| 4 | Итоги «Счастливого листа» | [event-private.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/event-private.jpg) | `reel-clover.jpg` |
| 5 | Утро в бассейне | [pool.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/pool.jpg) | `reel-pool.jpg` |

Общая часть (добавлять в конец каждого промпта):
```
Vertical 9:16 frame for a social media video cover. Same visual style as the reference photo: soft natural light, warm cream and honey-wood tones, gentle shadows, light and cozy atmosphere, editorial hotel photography, realistic, high detail. Keep the central area calm and uncluttered (a round play button will be placed in the center). No text, no logos, no watermark.
```

**1. reel-cappuccino.jpg**
```
Close-up top-down view of a cappuccino in a white ceramic cup on a light wooden table in a hotel restaurant, latte art in the shape of a four-leaf clover on the milk foam, a small saucer with a teaspoon, a croissant slightly out of focus nearby, morning daylight from a window.
```

**2. reel-dish.jpg**
```
An elegant plated signature dish on a white plate in a cozy hotel restaurant, warm candlelight, crystal glass and silver cutlery around, shallow depth of field, the dish in the lower third of the frame, appetizing and refined.
```

**3. reel-piano.jpg**
```
A vintage black grand piano in a warm hotel lobby in the evening, soft golden lamp light, a potted green plant, dark wall with a geometric wooden relief like in the reference, an open lid and sheet music, intimate musical evening mood, no people or only hands on the keys.
```

**4. reel-clover.jpg**
```
A hand holding a small cream-colored card with an embossed four-leaf clover at a hotel reception desk, warm lobby light, a small bouquet and a brass bell nearby, festive but calm mood of a prize draw.
```

**5. reel-pool.jpg**
```
Indoor hotel swimming pool in the early morning, calm turquoise water with soft reflections, chrome handrails in the foreground, wooden wall panels and a seascape mural, a folded white towel on a lounger, fresh and serene atmosphere.
```


## Галерея спа: бассейн, сауна, тренажёрный зал

Блок «Бассейн, сауна и тренажёрный зал» — слайдер на всю ширину экрана, слева поверх фото лежит светлая плашка с текстом.

**Формат:** 21:9, 2560×1100, JPG 85–90. Все три кадра в одном формате, чтобы слайды не прыгали.

**Композиция (важно для всех трёх):**
- левые ~45% кадра закрыты плашкой с текстом — там спокойный фон без важных деталей (стена, панели, мягкий свет);
- главный объект (вода с поручнями, полок с ведром, тренажёры) — в правой половине, примерно 55–85% ширины;
- на телефоне кадр обрезается почти до квадрата со сдвигом вправо — объект должен читаться и в узком кропе;
- нижние ~10% справа — без мелких деталей (там точки слайдера);
- камера на уровне глаз, ровные вертикали, широкий угол 24–28 мм.

Добавлять в конец каждого промпта:

```
Ultra-wide 21:9 cinematic composition. Main subject placed in the right half of the frame; the left 45% is calm, uncluttered background (plain wall or soft wood panels, gentle light) reserved for a text card overlay. Eye-level camera, straight verticals, 24mm lens. Keep the exact same room, materials and equipment as the reference photo — this is a real hotel spa, do not invent or remove objects. Warm, soft, premium and light atmosphere, cream and honey wood tones, gentle shadows, no harsh contrast, editorial hotel photography, high resolution, realistic, no people, no text, no watermark, no logos.
```

Негативный промпт:

```
dark, gloomy, cold blue cast, neon, harsh flash, HDR look, oversaturated orange, cluttered left side, subject in the center or on the left, tilted verticals, fisheye distortion, extra equipment, people, text, watermark, logos
```

| Кадр | Референс | Сохранить как |
|---|---|---|
| Бассейн | [gen/pool.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/pool.jpg) (исходник spa-pool.webp слишком маленький, 446×144) | `pool.jpg` |
| Сауна | [gen/spa-sauna.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/spa-sauna.jpg) | `spa-sauna.jpg` |
| Тренажёрный зал | [gen/spa-gym.jpg](https://ivanweb1.github.io/welton-hotel-prototype/assets/photos/gen/spa-gym.jpg) | `spa-gym.jpg` |

**pool.jpg — бассейн**
```
Indoor hotel swimming pool seen from the side along its length: calm turquoise water with soft reflections, chrome handrails and the pool edge in the right half of the frame, wooden wall panels and soft ceiling spotlights. On the left — a calm stretch of light wall and panels without details. Early morning, fresh and serene, inviting water.
```

**spa-sauna.jpg — сауна**
```
Finnish sauna in a hotel spa: open glass door to the sauna cabin with light wooden benches, a wooden bucket with a ladle and a rolled white towel, warm LED strip light along the benches, placed in the right half of the frame. On the left — the spa corridor wall with dark wood panels and soft warm glow, calm and empty. Cozy, warm, relaxing evening mood, soft golden light, not too orange.
```

**spa-gym.jpg — тренажёрный зал**
```
Hotel fitness room: treadmills and an elliptical trainer in a row, dumbbell rack and a stack of rolled white towels, mirror wall, placed in the right half of the frame. On the left — calm light wall and floor, no equipment. Bright soft daylight-like ceiling light, clean, airy and premium, warm beige tones.
```

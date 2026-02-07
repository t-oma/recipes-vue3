import { mapDishDTO } from "./helpers";
import type { DishDTO } from "./dto";

export const dishesDTO = [
  {
    id: "123abc456def",
    image: {
      alt: "Чахохбілі",
      src: "/images/chakhokhbili.png",
    },
    title: "Чахохбілі",
    description:
      "Классическое грузинское блюдо: тушёная курица с томатами, луком и специями. Высокий белок для мышц, тёплое согревающее блюдо для осени.",
    macronutrients: { protein: 48, fat: 20, carbs: 22 },
    ingredients: [
      {
        title: "Курячі стегна без шкіри",
        amount: 600,
        units: "g",
      },
      {
        title: "Цибуля ріпчаста",
        amount: 300,
        units: "g",
      },
      {
        title:
          "Помідори стиглі (або томати у власному соку)",
        amount: 500,
        units: "g",
      },
      {
        title: "Перець солодкий",
        amount: 200,
        units: "g",
      },
      {
        title: "Часник",
        amount: 4,
        units: "зубчики",
      },
      {
        title: "Кінза свіжа",
        amount: 20,
        units: "g",
      },
      {
        title: "Петрушка свіжа",
        amount: 20,
        units: "g",
      },
      {
        title: "Олія оливкова",
        amount: 200,
        units: "g",
      },
      {
        title: "Сіль, перець, хмелі-сунелі",
      },
    ],
    steps: [
      {
        durationSec: 10 * 60,
        description:
          "Подготовьте продукты: снимите кожу с бёдер, обсушите, нарежьте лук полукольцами, перец соломкой, помидоры кубиком.",
      },
      {
        durationSec: 8 * 60,
        description:
          "Обжарьте бёдра до лёгкой румяности на сухой сковороде.",
      },
      {
        durationSec: 5 * 60,
        description: "Добавьте лук, тушите до мягкости.",
      },
      {
        durationSec: 2 * 60,
        description:
          "Вмешайте помидоры, перец, чеснок и специи.",
      },
      {
        durationSec: 20 * 60,
        description: "Тушите под крышкой до мягкости",
      },
      {
        durationSec: 7 * 60,
        description:
          "Откройте крышку и выпарите до нужной густоты.",
      },
      {
        durationSec: 3 * 60,
        description: "Вмешайте зелень и дайте настояться. ",
      },
    ],
  },
] satisfies DishDTO[];

export const dishes = dishesDTO.map(mapDishDTO);

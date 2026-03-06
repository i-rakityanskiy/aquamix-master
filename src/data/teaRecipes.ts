import { TeaRecipe } from '../types';

export const TEA_RECIPES: Record<string, TeaRecipe> = {
  "Black": {
    "tea_type": "Black Tea",
    "examples": "English Breakfast, Earl Grey, Assam, Ceylon",
    "water_temp": "100",
    "grams_per_100ml_min": 1.0,
    "grams_per_100ml_max": 1.2,
    "teaspoons_per_cup": "1",
    "steeping_time": "3–5 min",
    "serving_tip": "If you like it with milk, steep for the full 5 minutes so the flavor isn't 'drowned out'."
  },
  "Green": {
    "tea_type": "Green Tea",
    "examples": "Sencha, Jasmine Green, Dragon Well, Gunpowder",
    "water_temp": "75-85",
    "grams_per_100ml_min": 0.8,
    "grams_per_100ml_max": 1.0,
    "teaspoons_per_cup": "1",
    "steeping_time": "2-4 min",
    "serving_tip": "Avoid boiling water as it scorches the delicate leaves, making the tea bitter."
  },
  "Oolong": {
    "tea_type": "Oolong Tea",
    "examples": "Tie Guan Yin, Da Hong Pao, Milk Oolong",
    "water_temp": "85-95",
    "grams_per_100ml_min": 1.2,
    "grams_per_100ml_max": 1.4,
    "teaspoons_per_cup": "1–1.5",
    "steeping_time": "3–5 min",
    "serving_tip": "Oolong leaves can be steeped multiple times; each infusion reveals new flavor notes."
  },
  "White": {
    "tea_type": "White Tea",
    "examples": "Silver Needle, White Peony",
    "water_temp": "70-80",
    "grams_per_100ml_min": 1.2,
    "grams_per_100ml_max": 1.4,
    "teaspoons_per_cup": "1.5–2",
    "steeping_time": "4–6 min",
    "serving_tip": "White tea is the least processed and has a very subtle, naturally sweet profile."
  },
  "Herbal": {
    "tea_type": "Herbal Infusion",
    "examples": "Chamomile, Peppermint, Rooibos, Hibiscus",
    "water_temp": "95-100",
    "grams_per_100ml_min": 1.2,
    "grams_per_100ml_max": 1.8,
    "teaspoons_per_cup": "1.5–2",
    "steeping_time": "5–10 min",
    "serving_tip": "Most herbals are caffeine-free and benefit from a long steep to extract full benefits."
  },
  "Cascara": {
    "tea_type": "Cascara (Coffee Cherry)",
    "examples": "Dried skins of coffee cherries",
    "water_temp": "90-95",
    "grams_per_100ml_min": 4.0,
    "grams_per_100ml_max": 5.0,
    "teaspoons_per_cup": "3-4",
    "steeping_time": "4–7 min",
    "serving_tip": "Tastes like hibiscus and red currant. Unlike tea, it stays sweet even with long steeps!"
  }
};

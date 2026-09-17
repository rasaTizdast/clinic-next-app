import { Service } from "@/lib/types";

export const services: Service[] = [
  // ─── فیلر و بوتاکس — صورت ───
  {
    id: "1",
    slug: "botox-face",
    title: "بوتاکس صورت",
    description:
      "با تزریق دقیق در عضلات هدف، خطوط اخم و چروک پیشانی و دور چشم تا چند ماه کاهش می‌یابد و صورت ظاهری آرام‌تر و جوان‌تر پیدا می‌کند.",
    price: 1800000,
    category: "filler-botox",
    subcategory: "صورت",
    featured: true,
  },
  {
    id: "2",
    slug: "botox-migraine",
    title: "بوتاکس میگرن",
    description:
      "تزریق در نقاط مشخص سر و گردن، سیگنال‌های دردی را تعدیل می‌کند؛ در نتیجه دفعات و شدت حملات میگرن کمتر می‌شود.",
    price: 1850000,
    category: "filler-botox",
    subcategory: "صورت",
  },
  {
    id: "3",
    slug: "botox-gummy-smile",
    title: "بوتاکس لبخند لثه",
    description:
      "با کنترل حرکت عضلات بالابر لب، هنگام خنده نمایش لثه کاهش می‌یابد و لبخند متعادل‌تر و دلپذیرتر دیده می‌شود.",
    price: 1500000,
    category: "filler-botox",
    subcategory: "صورت",
  },
  {
    id: "4",
    slug: "lip-filler",
    title: "فیلر لب",
    description:
      "حجم و فرم لب‌ها با تزریق مواد سازگار با بدن اصلاح می‌شود؛ میزان حجم‌دهی متناسب با آناتومی و سلیقه شما تعیین می‌شود.",
    price: 3900000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "صورت",
    featured: true,
  },
  {
    id: "5",
    slug: "face-contour-filler",
    title: "فیلر گونه، چانه، زاویه",
    description:
      "کنتور و تناسب اجزای صورت با حجم‌دهی نقطه‌ای بازسازی می‌شود؛ از برجسته‌کردن گونه تا مشخص‌کردن زاویه فک، بر اساس نیاز شما.",
    price: 3500000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "صورت",
  },
  {
    id: "6",
    slug: "face-mesotherapy",
    title: "مزوتراپی صورت و جوانسازی",
    description:
      "ترکیبات ویتامینی و مغذی مستقیماً به لایه‌های میانی پوست می‌رسد تا شادابی، طراوت و کیفیت کلی پوست افزایش یابد.",
    price: 1200000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "صورت",
  },

  // ─── فیلر و بوتاکس — مو ───
  {
    id: "7",
    slug: "hair-filler",
    title: "فیلر مو",
    description:
      "مواد تقویتی و حجیم‌ساز در نواحی کم‌پشت تزریق می‌شود تا تراکم ظاهری مو بیشتر شده و نواحی خالی کمتر دیده شوند.",
    price: 5500000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "مو",
  },
  {
    id: "8",
    slug: "hair-mesotherapy",
    title: "مزوتراپی مو",
    description:
      "کوکتل ویتامین و مواد معدنی مستقیماً به ریشه مو می‌رسد؛ ریزش کم می‌شود، تارهای ضعیف قوی‌تر شده و رشد مو بهبود می‌یابد.",
    price: 2800000,
    category: "filler-botox",
    subcategory: "مو",
  },

  // ─── فیلر و بوتاکس — بدن ───
  {
    id: "9",
    slug: "underarm-botox",
    title: "بوتاکس زیر بغل",
    description:
      "فعالیت غدد عرق این ناحیه برای چند ماه کاهش می‌یابد و مشکل تعریق زیاد، رطوبت و بوی نامطبوع را برطرف می‌کند.",
    price: 2950000,
    category: "filler-botox",
    subcategory: "بدن",
  },
  {
    id: "10",
    slug: "body-filler",
    title: "فیلر بادی",
    description:
      "اصلاح فرم و افزایش حجم در نواحی مختلف بدن؛ میزان تزریق بر اساس آناتومی و خواسته شما مشخص می‌شود.",
    price: 3900000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "بدن",
  },

  // ─── فیلر و بوتاکس — سایر ───
  {
    id: "11",
    slug: "mole-removal",
    title: "خالبرداری",
    description:
      "خال‌های برجسته و مسطح پس از بررسی پزشک به‌صورت امن برداشته می‌شوند؛ جای زخم حداقلی دارد و دوره مراقبت کوتاهی است.",
    price: 500000,
    fromPrice: true,
    category: "filler-botox",
    subcategory: "سایر",
  },

  // ─── لیزر بانوان — سایر (پکیج‌ها) ───
  {
    id: "24",
    slug: "w-full-body-laser",
    title: "فول بادی",
    description:
      "همه نواحی اصلی بدن در یک جلسه واحد پوشش داده می‌شود؛ کامل‌ترین و مقرون‌به‌صرفه‌ترین انتخاب لیزر.",
    price: 990000,
    category: "laser-women",
    subcategory: "سایر",
    featured: true,
  },
  {
    id: "25",
    slug: "w-practical-laser",
    title: "کاربردی",
    description:
      "ترکیبی هوشمندانه از پرتقاضاترین نواحی برای کسانی که همه نواحی بدن را نمی‌خواهند.",
    price: 890000,
    category: "laser-women",
    subcategory: "سایر",
  },

  // ─── لیزر بانوان — پا ───
  {
    id: "12",
    slug: "w-full-leg-laser",
    title: "پا کامل",
    description:
      "تمام سطح پا از بالای ران تا مچ در یک جلسه پوشش داده می‌شود؛ با جلسات منظم رویش مو کمتر و نازک‌تر می‌شود.",
    price: 450000,
    category: "laser-women",
    subcategory: "پا",
  },
  {
    id: "13",
    slug: "w-thigh-laser",
    title: "ران",
    description:
      "لیزر موهای زائد ناحیه ران؛ پوستی صاف‌تر بدون نیاز به اصلاح مکرر نتیجه جلسات پیوسته است.",
    price: 350000,
    category: "laser-women",
    subcategory: "پا",
  },
  {
    id: "14",
    slug: "w-calf-laser",
    title: "ساق پا",
    description:
      "لیزر موهای زائد ناحیه ساق پا؛ مناسب برای پوست نرم و صاف بدون خطر بریدگی و تحریک ناشی اصلاح.",
    price: 300000,
    category: "laser-women",
    subcategory: "پا",
  },

  // ─── لیزر بانوان — تنه ───
  {
    id: "15",
    slug: "w-full-abdomen-laser",
    title: "شکم کامل",
    description:
      "تمام ناحیه شکم لیزر می‌شود؛ انتخاب رایج برای پوستی یکدست و آماده تابستان.",
    price: 550000,
    category: "laser-women",
    subcategory: "تنه",
  },
  {
    id: "16",
    slug: "w-full-back-laser",
    title: "کمر کامل",
    description:
      "تمام ناحیه کمر از شانه تا پایین کمر پوشش داده می‌شود تا پوست این ناحیه کاملاً صاف بماند.",
    price: 550000,
    category: "laser-women",
    subcategory: "تنه",
  },
  {
    id: "17",
    slug: "w-lower-back-laser",
    title: "گودی کمر",
    description:
      "لیزر نقطه‌ای گودی کمر برای تمیزی بیشتر این ناحیه حساس هنگام پوشیدن لباس‌های کمرباز.",
    price: 200000,
    category: "laser-women",
    subcategory: "تنه",
  },
  {
    id: "18",
    slug: "w-naval-line-laser",
    title: "خط ناف",
    description:
      "خط میانی ناف که اغلب پرپشت است، لیزر می‌شود تا ناحیه شکم یکدست‌تر دیده شود.",
    price: 200000,
    category: "laser-women",
    subcategory: "تنه",
  },
  {
    id: "19",
    slug: "w-buttocks-laser",
    title: "روی باسن",
    description:
      "لیزر سطح رویی باسن با تنظیمات مناسب پوست این ناحیه؛ تمیزی و لطافت طولانی‌مدت.",
    price: 400000,
    category: "laser-women",
    subcategory: "تنه",
  },
  {
    id: "20",
    slug: "w-underarm-laser",
    title: "زیربغل",
    description:
      "محبوب‌ترین ناحیه لیزر؛ علاوه بر حذف مو، تیرگی سطحی زیربغل نیز طی جلسات بهتر می‌شود.",
    price: 255000,
    category: "laser-women",
    subcategory: "تنه",
  },

  // ─── لیزر بانوان — دست ───
  {
    id: "21",
    slug: "w-full-arm-laser",
    title: "دست کامل",
    description:
      "از شانه تا مچ یکجا لیزر می‌شود؛ اقتصادی‌تر از رزرو جداگانه بازو و ساعد.",
    price: 450000,
    category: "laser-women",
    subcategory: "دست",
  },
  {
    id: "22",
    slug: "w-forearm-laser",
    title: "ساق دست",
    description:
      "لیزر ناحیه ساعد از آرنج تا مچ برای پوستی صاف در نواحی نمایان دست.",
    price: 300000,
    category: "laser-women",
    subcategory: "دست",
  },
  {
    id: "23",
    slug: "w-upper-arm-laser",
    title: "بازو",
    description:
      "لیزر ناحیه بازو از شانه تا آرنج؛ مناسب برای استفاده راحت با لباس آستین‌کوتاه.",
    price: 300000,
    category: "laser-women",
    subcategory: "دست",
  },

  // ─── لیزر بانوان — سایر ───
  {
    id: "26",
    slug: "w-bikini-laser",
    title: "بیکینی",
    description:
      "لیزر ناحیه بیکینی با رعایت کامل بهداشت و حریم خصوصی؛ تمیزی دائمی بدون تحریک پوست.",
    price: 250000,
    category: "laser-women",
    subcategory: "سایر",
  },
  {
    id: "27",
    slug: "w-face-laser",
    title: "صورت",
    description:
      "نواحی صورت مانند لب بالا، چانه و خط فک با تنظیمات ملایم مناسب پوست حساس صورت لیزر می‌شود.",
    price: 250000,
    category: "laser-women",
    subcategory: "سایر",
  },
  {
    id: "28",
    slug: "w-eyebrow-tattoo-removal",
    title: "لیزر تتو ابرو",
    description:
      "جوهر تتوی ابرو به‌تدریج شکسته و محو می‌شود؛ معمولاً چند جلسه با فاصله زمانی مشخص لازم است.",
    price: 1950000,
    category: "laser-women",
    subcategory: "سایر",
  },
  {
    id: "29",
    slug: "w-body-tattoo-removal",
    title: "لیزر تتو بدن",
    description:
      "بر اساس عمق، رنگ و قدمت جوهر، تتوهای بدن طی جلسات متوالی کم‌رنگ و محو می‌شوند.",
    price: 500000,
    fromPrice: true,
    category: "laser-women",
    subcategory: "سایر",
  },

  // ─── لیزر آقایان — سایر (پکیج‌ها) ───
  {
    id: "47",
    slug: "m-full-body-laser",
    title: "فول بادی",
    description:
      "پوشش همه نواحی اصلی بدن آقایان در یک جلسه واحد؛ کامل‌ترین و اقتصادی‌ترین انتخاب.",
    price: 1990000,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "48",
    slug: "m-practical-laser",
    title: "کاربردی",
    description:
      "ترکیبی از پرتقاضاترین نواحی برای آقایانی که به دنبال تمیزکاری عمومی هستند.",
    price: 890000,
    category: "laser-men",
    subcategory: "سایر",
  },

  // ─── لیزر آقایان — پایین تنه ───
  {
    id: "30",
    slug: "m-full-leg-laser",
    title: "پا کامل",
    description:
      "تمام سطح پا از ران تا مچ با تنظیمات متناسب با پوست آقایان لیزر می‌شود.",
    price: 700000,
    category: "laser-men",
    subcategory: "پایین تنه",
  },
  {
    id: "31",
    slug: "m-buttocks-laser",
    title: "باسن",
    description:
      "لیزر ناحیه باسن برای بهداشت بهتر، تعریق کمتر و پوستی صاف‌تر در این ناحیه.",
    price: 450000,
    category: "laser-men",
    subcategory: "پایین تنه",
  },
  {
    id: "32",
    slug: "m-calf-laser",
    title: "ساق پا",
    description:
      "لیزر ناحیه ساق پا؛ حذف موها بدون خارش و تحریک ناشی از اصلاح مکرر.",
    price: 300000,
    category: "laser-men",
    subcategory: "پایین تنه",
  },
  {
    id: "33",
    slug: "m-bikini-laser",
    title: "بیکینی آقایان",
    description:
      "لیزر ناحیه بیکینی با تنظیمات اختصاصی پوست آقایان؛ بهبود بهداشت و کاهش تعریق ناحیه.",
    price: 450000,
    category: "laser-men",
    subcategory: "پایین تنه",
  },
  {
    id: "34",
    slug: "m-bikini-thigh-laser",
    title: "بیکینی – خط ران",
    description:
      "پوشش ناحیه بیکینی همراه با خط داخلی ران؛ محدوده وسیع‌تر با پوشش کامل و یکدست.",
    price: 550000,
    category: "laser-men",
    subcategory: "پایین تنه",
  },

  // ─── لیزر آقایان — بالاتنه ───
  {
    id: "35",
    slug: "m-full-abdomen-laser",
    title: "شکم کامل",
    description:
      "لیزر تمام ناحیه شکم برای پوستی صاف؛ خطوط مویی پراکنده نیز حذف می‌شوند.",
    price: 450000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "36",
    slug: "m-full-back-laser",
    title: "کمر کامل",
    description:
      "تمام ناحیه کمر پوشش داده می‌شود؛ نواحی پشت که دسترسی به آن‌ها سخت است یکجا حل می‌شود.",
    price: 550000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "37",
    slug: "m-lower-back-laser",
    title: "گودی کمر",
    description:
      "لیزر نقطه‌ای گودی کمر برای تمیزی این ناحیه در لباس‌ها و ورزش.",
    price: 200000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "38",
    slug: "m-naval-line-laser",
    title: "خط ناف",
    description:
      "حذف خط مویی وسط شکم برای یکدست‌تر شدن ظاهر ناحیه بالای شکم.",
    price: 200000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "39",
    slug: "m-buttocks-top-laser",
    title: "روی باسن",
    description:
      "لیزر سطح رویی باسن با تنظیمات مناسب؛ تمیزی و بهداشت بیشتر این ناحیه.",
    price: 400000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "40",
    slug: "m-underarm-laser",
    title: "زیربغل",
    description:
      "حذف موهای زیربغل همراه با کاهش تعریق و بهبود بوی نامطبوع این ناحیه.",
    price: 300000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "41",
    slug: "m-chest-laser",
    title: "سینه",
    description:
      "لیزر ناحیه سینه برای پوستی صاف‌تر؛ انتخاب رایج ورزشکاران و علاقه‌مندان به ظاهر تمیز.",
    price: 450000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "42",
    slug: "m-chest-abdomen-laser",
    title: "سینه و شکم",
    description:
      "هر دو ناحیه سینه و شکم یکجا لیزر می‌شود؛ اقتصادی‌تر از رزرو دو ناحیه جداگانه.",
    price: 750000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },
  {
    id: "43",
    slug: "m-full-back-rear-laser",
    title: "پشت کامل",
    description:
      "تمام ناحیه پشت از شانه‌ها تا کمر پوشش داده می‌شود؛ کامل‌ترین گزینه برای پشت بدون مو.",
    price: 650000,
    category: "laser-men",
    subcategory: "بالاتنه",
  },

  // ─── لیزر آقایان — دست ───
  {
    id: "44",
    slug: "m-full-arm-laser",
    title: "دست کامل",
    description:
      "از شانه تا مچ یکجا لیزر می‌شود؛ پوشش کامل دست‌ها با هزینه کمتر نسبت به رزرو تفکیکی.",
    price: 550000,
    category: "laser-men",
    subcategory: "دست",
  },
  {
    id: "45",
    slug: "m-forearm-laser",
    title: "ساق دست",
    description:
      "لیزر ناحیه ساعد از آرنج تا مچ؛ مناسب برای نواحی نمایان در لباس روزمره.",
    price: 300000,
    category: "laser-men",
    subcategory: "دست",
  },
  {
    id: "46",
    slug: "m-upper-arm-laser",
    title: "بازو",
    description:
      "لیزر ناحیه بازو از شانه تا آرنج برای ظاهری تمیزتر در لباس‌های آستین‌کوتاه.",
    price: 300000,
    category: "laser-men",
    subcategory: "دست",
  },

  // ─── لیزر آقایان — سایر ───
  {
    id: "49",
    slug: "m-bikini-basic-laser",
    title: "بیکینی",
    description:
      "لیزر ناحیه بیکینی با رعایت کامل حریم خصوصی و بهداشت؛ کاهش تعریق و تحریک پوست.",
    price: 250000,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "50",
    slug: "m-face-laser",
    title: "صورت",
    description:
      "لیزر نواحی صورت مانند خط ریش گونه و گردن برای اصلاح تمیزتر و پوست صاف‌تر.",
    price: 350000,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "51",
    slug: "m-eyebrow-tattoo-removal",
    title: "لیزر تتو ابرو",
    description:
      "حذف تدریجی جوهر تتوی ابرو طی چند جلسه فاصله‌دار؛ ایمن برای پوست اطراف چشم.",
    price: 1950000,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "52",
    slug: "m-body-tattoo-removal",
    title: "لیزر تتو بدن",
    description:
      "محو تدریجی تتوهای بدن بر اساس عمق و رنگ جوهر؛ تعداد جلسات پس از مشاوره مشخص می‌شود.",
    price: 500000,
    fromPrice: true,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "53",
    slug: "m-neck-laser",
    title: "گردن",
    description:
      "لیزر ناحیه جلوی گردن برای تمیزی بیشتر و اصلاح راحت‌تر این ناحیه حساس.",
    price: 250000,
    category: "laser-men",
    subcategory: "سایر",
  },
  {
    id: "54",
    slug: "m-back-neck-laser",
    title: "پشت گردن",
    description:
      "لیزر ناحیه پشت گردن و خط مو؛ حذف موهایی که در مدل‌های کوتاه مو نمایان هستند.",
    price: 200000,
    category: "laser-men",
    subcategory: "سایر",
  },

  // ─── فیشیال ───
  {
    id: "55",
    slug: "skin-cleansing",
    title: "پاکسازی ابرسانی",
    description:
      "پاکسازی عمیق منافذ، خارج‌کردن جوش‌های سرسیاه و آبرسانی پوست در یک جلسه کامل مراقبتی.",
    price: 1500000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "56",
    slug: "plagen-therapy",
    title: "پلاژن تراپی",
    description:
      "با تحریک تولید کلاژن، سفتی و کشش پوست بهبود می‌یابد و افتادگی ملایم اصلاح می‌شود.",
    price: 2000000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "57",
    slug: "carboxy-face-therapy",
    title: "کربوکسی تراپی صورت",
    description:
      "با افزایش خونرسانی و اکسیژن‌رسانی، رنگ پوست روشن‌تر شده و چاله‌ها و جای جوش بهتر می‌شوند.",
    price: 2500000,
    category: "facial",
    subcategory: "فیشیال",
    featured: true,
  },
  {
    id: "58",
    slug: "carboxy-eye-therapy",
    title: "کربوکسی تراپی دور چشم",
    description:
      "گردش خون ناحیه حساس زیر چشم بهبود می‌یابد تا تیرگی و گودی کم‌رنگ‌تر دیده شود.",
    price: 1100000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "59",
    slug: "mesonidling-face",
    title: "مزونیدلینگ صورت",
    description:
      "میکروسوزن‌های بسیار ریز فرآیند ترمیم طبیعی و ساخت کلاژن پوست را فعال می‌کنند؛ مؤثر برای جای جوش و منافذ باز.",
    price: 3000000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "60",
    slug: "mesonidling-eyes",
    title: "مزونیدلینگ دور چشم",
    description:
      "نسخه ملایم‌تر مخصوص پوست نازک دور چشم؛ خطوط ریز و شروع افتادگی را بهبود می‌دهد.",
    price: 1900000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "61",
    slug: "peptide-therapy",
    title: "پیتاید تراپی",
    description:
      "پپتیدها پیام‌رسان ترمیم پوست‌اند؛ تغذیه عمقی، کاهش خطوط ریز و شادابی بیشتر حاصل می‌شود.",
    price: 2000000,
    category: "facial",
    subcategory: "فیشیال",
  },
  {
    id: "62",
    slug: "acid-therapy",
    title: "اسید تراپی",
    description:
      "لایه سطحی پوست به‌صورت کنترل‌شده نوسازی می‌شود تا جای جوش، لک و کدری کاهش یابد و پوست روشن‌تر شود.",
    price: 2000000,
    category: "facial",
    subcategory: "فیشیال",
  },
];

export function getServices(): Service[] {
  return services;
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured);
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((s) => s.category === category);
}

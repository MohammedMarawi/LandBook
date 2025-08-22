require('dotenv').config();
const mongoose = require('mongoose');
const Land = require('../models/landsModel');
const BookingHistory = require('../models/booking/BookingHistory');
const User = require('../models/usersModel'); // تأكد من المسار الصحيح
const Review = require('../models/reviewsModel'); // أو المسار الصحيح
const { getSeasonFromDate } = require('../utils/dateUtils');

// دوال مساعدة
function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomEvaluationData() {
  const crops = [
    "Wheat", "Barley", "Corn", "Rice", "Olive", "Potato", "Tomato", 
    "Banana", "Strawberry", "Apple", "Grapes", "Orange", "Cotton", "Sunflower"
  ];

  const problems = [
    "No problems",
    "Drought issues",
    "Pest infestation",
    "Weed growth",
    "Soil erosion",
    "Water shortage",
    "Low soil fertility",
    "Flood damage",
    "Fungal disease",
    "Nutrient deficiency",
    "Extreme heat stress",
    "Cold wave impact"
  ];

  return {
    crop: randomItem(crops),
    production: Math.floor(Math.random() * 5000) + 200,
    problems: randomItem(problems)
  };
}

async function seedLandHistories() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const lands = await Land.find();
    const users = await User.find();
    if (users.length === 0) {
      throw new Error("❌ لا يوجد مستخدمين في قاعدة البيانات! يجب إنشاء مستخدمين أولاً.");
    }

    for (const land of lands) {
      const numBookings = Math.floor(Math.random() * 4) + 1; // 1-4 سجلات لكل أرض

      for (let i = 0; i < numBookings; i++) {
        const evaluation = getRandomEvaluationData();

        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - (i + 1));
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 6);

        // اختيار مستخدم عشوائي لكل سجل
        const chosenUser = randomItem(users);

        await BookingHistory.create({
          land: land._id,
          user: chosenUser._id,
          investorEmail: chosenUser.email,
          crop: evaluation.crop,
          production: evaluation.production,
          problems: evaluation.problems,
          startDate,
          endDate,
          season: getSeasonFromDate(startDate)
        });
      }
    }

    console.log("✅ تم إنشاء سجلات تاريخية لكل الأراضي وكلها مرتبطة بمستخدمين");
    process.exit();
  } catch (err) {
    console.error("❌ خطأ أثناء إنشاء السجلات:", err);
    process.exit(1);
  }
}

seedLandHistories();

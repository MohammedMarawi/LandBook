
function formatDateTimeInDamascus(date) {
  const optionsDate = { timeZone: 'Asia/Damascus', year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { timeZone: 'Asia/Damascus', hour: '2-digit', minute: '2-digit', hour12: false };

  const localDate = date.toLocaleDateString('en-US', optionsDate);
  const localTime = date.toLocaleTimeString('en-US', optionsTime);

  return `${localDate} at ${localTime}`;
}
  

function getSeasonFromDate(date) {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let seasonName;
  if (month >= 1 && month <= 3) seasonName = 'Spring';
  else if (month >= 4 && month <= 6) seasonName = 'Summer';
  else if (month >= 7 && month <= 9) seasonName = 'Autumn';
  else seasonName = 'Winter';

  return `${seasonName} ${year}`;
}


module.exports = { 
  formatDateTimeInDamascus ,
  getSeasonFromDate
};
  
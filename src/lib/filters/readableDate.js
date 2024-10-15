export default function (postdate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let day = postdate.getDate();
  let month = months[postdate.getMonth()];
  let year = postdate.getFullYear();

  return month + "_" + day + "/" + year;
}


// export default function (date, lang = 'en') {
//   const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Intl.DateTimeFormat(lang, options).format(dateObj);
// }

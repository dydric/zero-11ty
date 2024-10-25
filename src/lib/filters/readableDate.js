export default function (postdate) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const date = new Date(postdate);

  if (isNaN(date)) {
    return "Invalid date";
  }

  let day = date.getDate();
  let month = months[date.getMonth()];
  let year = date.getFullYear();

  return month + " " + day + ", " + year;
}


// export default function (date, lang = 'en') {
//   const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
//   const options = { year: 'numeric', month: 'long', day: 'numeric' };
//   return new Intl.DateTimeFormat(lang, options).format(dateObj);
// }

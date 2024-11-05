

const timeConvert = (dateString:string) => {
const datetime = new Date(dateString);
const year = datetime.getFullYear();
const month = ('0' + (datetime.getMonth() + 1)).slice(-2);
const day = ('0' + datetime.getDate()).slice(-2);
const hour = ('0'+datetime.getHours()).slice(-2);
const minute = ('0'+datetime.getMinutes()).slice(-2);
 return `${year}-${month}-${day} | ${hour}:${minute}`;
}
export default timeConvert;
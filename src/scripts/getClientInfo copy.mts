import axios from 'axios';

const getClientInfo = async () => {
    try{
    const response = await axios.get('https://ipinfo.io/json');
    const resData = response.data as { ip: string, loc: string };
    const data = {
        ip: resData.ip,
        loc: resData.loc.split(',').map(Number),
    };
    console.log('Client Info:', data);
    return data;
    }catch(e){
    console.error('사용자 정보 획득 에러', e);
    return null;
    }
};

//기능 체크
// getClientInfo().then(clientInfo => {
//     console.log('Returned Client Info:', clientInfo);
// }).catch(error => {
//     console.error('Error:', error);
// });

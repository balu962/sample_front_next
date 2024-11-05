import axios from 'axios';

type ClientInfo = {
    ip: string;
    loc: number[];
}
type ResType = {
    ip: string;
    loc: string;
}


export const getClientInfo = async () => {
    try {
        const response = await axios.get<ResType>('https://ipinfo.io/json');
        const resData = response.data;
        const data: ClientInfo = {
            ip: resData.ip,
            loc: resData.loc.split(',').map(Number),
        };
        sessionStorage.setItem('clientInfo', JSON.stringify(data));
        if (!localStorage.getItem('userRole')) {
                localStorage.setItem('userRole', 'guest');
            }
        } catch (e) {
        console.error('사용자 정보 획득 에러', e);
    }
};


//기능 체크
// getClientInfo().then(clientInfo => {
//     console.log('Returned Client Info:', clientInfo);
// }).catch(error => {
//     console.error('Error:', error);
// });

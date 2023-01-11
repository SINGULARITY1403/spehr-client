import SPEHR from '../services/spehr';

const cachedHospitals = {};


export const getHospital = address => new Promise((resolve, reject) => {
    if(!address)
        return reject("Invalid address");

    if(cachedHospitals[address])
        return resolve(cachedHospitals[address]);

    SPEHR.methods
        .getDoctorInfo(address).call()
        .then(hospitalInfo => {
            resolve(hospitalInfo);
        }).catch(err => {
            console.log(`Some error fetching hospital info for address ${address} \n`, err);
            reject(new Error(`Couldn't fetch hospital infor for address ${address}`));
        });
})
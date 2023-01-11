import web3 from './web3';
import spehrABI from '../contracts/SPEHRABI.json';
import {
    spehrAddress,
    contractDeploymentTxLink
} from '../contracts/deploymentDetails'

const SPEHRContract = new web3.eth.Contract(spehrABI, spehrAddress);

console.log("SPEHR contract address: ", spehrAddress);
console.log("SPEHR contract deployment: ", contractDeploymentTxLink);
console.log("SPEHR ABI: \n", spehrABI);
console.log("SPEHR contract: \n", SPEHRContract);


window.SPEHRContract = SPEHRContract;
export default SPEHRContract;
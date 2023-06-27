export default function driverauthheader(){
    const driverStr = localStorage.getItem("driver");
    let driver = null;
    if(driverStr){
        driver = JSON.parse(driverStr);
    }
    if(driver && driver.accessToken){
        return {'x-access-token': driver.accessToken};

    } else {
        return {'x-access-token':null};
    }
}
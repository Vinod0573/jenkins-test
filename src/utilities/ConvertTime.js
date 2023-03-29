
function ConvertTimeSaarthi(originalDate){
    let mmm = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let date = originalDate.getDate();
    let month = originalDate.getMonth();
    let year = originalDate.getFullYear();
    console.log(date);
    
    let yearyy = year.toString().substring(2,4);
    let hour = originalDate.getHours();
    let minute = originalDate.getMinutes();
    let todayDate = new Date();
    //console.log(`${date} jai ${month} jai ${year} jai ${hour} ${typeof(hour)} jai ${minute} jai `)
    if( date < 10 ){
        date = "0" + date;
    }
    if( minute < 10 ){
        minute = "0" + minute;
    }
    let myDate ;

    if( hour < 12){
        myDate = date + " " + mmm[month] + " " + yearyy + " " + hour + ":" + minute + " " + 'AM';
    }
    else{
        hour = hour - 12;
        if(hour === 0){
            hour = 12;
        }
        myDate = date + " " + mmm[month] + " " + yearyy + " " + hour + ":" + minute + " " + 'PM';
    }
    //console.log(myDate.toString().substring(12,20));
    return myDate;
}

export function toIndiantime(originalDate){
    var d = originalDate;
        d.setHours(d.getHours() + 5);
        d.setMinutes(d.getMinutes() + 30);
        var mns = d.getMinutes();
    if( mns >= 60){
        d.setHours(d.getHours() + 1);
        d.setMinutes(d.getMinutes() - 60);
    }
    //ConvertTimeSaarthi(d);
    var timeindia = ConvertTimeSaarthi(d);
    return timeindia;
}

export const toRealTimeConvert = (date) =>{
    console.log(date);
    const convertedDate = ConvertTimeSaarthi(date);
    return convertedDate;
}

export const toConvertCalendarDate = (date) =>{
   const requireformat = date.toString().substring(7, 10) + " " + date.toString().substring(3, 7) + " " + " " +date.toString().substring(13, 15);
   return requireformat;
}
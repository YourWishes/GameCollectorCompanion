export default {
    vibrate() {
        if(navigator && navigator.vibrate) navigator.vibrate(50);
        console.log("BZZT");
    }
};
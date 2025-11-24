Java.perform(() => {
    const TimerHelper = Java.use("com.utloop.sshdnstunnel.timer.TimerHelper");
    const TimeContainer = Java.use("com.utloop.sshdnstunnel.timer.TimerService$TimeContainer");
    const TimerTask = Java.use("java.util.TimerTask");
    const Handler = Java.use("android.os.Handler");

    
    TimerHelper.updateTimeText.implementation = function () {
        console.log("⏸️ updateTimeText() blocked");
    };

    TimerHelper.startUpdateTimer.implementation = function () {
        console.log("🚫 startUpdateTimer() skipped");
    };

    
    TimeContainer.getTime.implementation = function () {
        const infiniteTime = 999 * 3600 * 1000;
        console.log("⏱ getTime() returns infinite time");
        return infiniteTime;
    };

    TimeContainer.start.implementation = function () {
        console.log("⏸️ TimeContainer.start() blocked");
    };

    TimeContainer.add.implementation = function () {
        console.log("⏸️ TimeContainer.add() blocked");
    };

    if (TimeContainer.tick) {
        TimeContainer.tick.implementation = function () {
            console.log("⏸️ TimeContainer.tick() blocked");
        };
    }

    
    TimerTask.run.implementation = function () {
        console.log("⏸️ TimerTask.run() blocked");
    };

   
    Handler.post.overload("java.lang.Runnable").implementation = function (r) {
        console.log("⏸️ Handler.post() blocked");
        return false;
    };

    Handler.postDelayed.overload("java.lang.Runnable", "long").implementation = function (r, delay) {
        console.log("⏸️ Handler.postDelayed() blocked");
        return false;
    };

    
    try {
        const AdActivity = Java.use("com.google.android.gms.ads.AdActivity");

        AdActivity.onCreate.overload("android.os.Bundle").implementation = function (bundle) {
            console.log("🎭 AdActivity.onCreate() blocked");
            this.finish();  
        };

        AdActivity.onResume.implementation = function () {
            console.log("🎭 AdActivity.onResume() blocked");
            this.finish();  
        };
    } catch (e) {
        console.log("⚠️ AdActivity not found or already stripped");
    }

    console.log("✅ All time background counters, updates, and ads blocked successfully.");
});

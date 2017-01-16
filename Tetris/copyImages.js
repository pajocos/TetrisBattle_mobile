/**
 * Created by paulo on 16-Jan-17.
 */

var filestocopy = [{
    "res/icon2.png": "platforms/android/res/mipmap-hdpi/icon.png"
}, {
    "res/icon1.png": "platforms/android/res/mipmap-ldpi/icon.png"
}, {
    "res/icon1.png": "platforms/android/res/mipmap-mdpi/icon.png"
}, {
    "res/icon3.png": "platforms/android/res/mipmap-xhdpi/icon.png"
}, {
    "res/screen.png": "platforms/android/res/drawable-port-hdpi/screen.png"
}, {
    "res/screen.png": "platforms/android/res/drawable-port-ldpi/screen.png"
}, {
    "res/screen.png": "platforms/android/res/drawable-port-mdpi/screen.png"
}, {
    "res/screen.png": "platforms/android/res/drawable-port-xhdpi/screen.png"
}];


var fs = require('fs');
var path = require('path');

filestocopy.forEach(function (obj) {
    Object.keys(obj).forEach(function (srcfile) {
        var destfile = obj[srcfile];
        console.log("copying " + srcfile + " to " + destfile);
        var destdir = path.dirname(destfile);
        if (fs.existsSync(destdir) && fs.existsSync(srcfile)) {
            fs.createReadStream(srcfile).pipe(
                fs.createWriteStream(destfile));
        }
    });
});
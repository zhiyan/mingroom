#!/usr/bin/env node

/**
 * Install all plugins listed in package.json
 * https://raw.githubusercontent.com/diegonetto/generator-ionic/master/templates/hooks/after_platform_add/install_plugins.js
 */
var exec = require('child_process').exec;
var path = require('path');
var sys = require('sys');

var packageJSON = null;

try {
  packageJSON = require('../../package.json');
} catch(ex) {
  console.log('\nThere was an error fetching your package.json file.')
  console.log('\nPlease ensure a valid package.json is in the root of this project\n')
  return;
}

var cmd = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
// var script = path.resolve(__dirname, '../../node_modules/cordova/bin', cmd);

packageJSON.cordovaPlugins = packageJSON.cordovaPlugins || [];
packageJSON.cordovaPlugins.forEach(function (plugin) {
  exec('cordova plugin add ' + plugin, function (error, stdout, stderr) {
    sys.puts(stdout);
  });
});



// splash & icons
var fs = require('fs');
// var path = require('path');
var rootdir = process.argv[2];

var androidRes = [
	{
    "icons/icon-96.png":"drawable/icon.png"
	},
	{
    "icons/icon-72.png":"drawable-hdpi/icon.png"
	},
	{
    "icons/icon-36.png":"drawable-ldpi/icon.png"
	},
	{
    "icons/icon-48.png":"drawable-mdpi/icon.png"
	},
	{
    "icons/icon-96.png":"drawable-xhdpi/icon.png"
	},
	{
    "splash/800x480.png":"drawable-land-hdpi/screen.png"
	},
	{
    "splash/320x200.png":"drawable-land-ldpi/screen.png"
	},
	{
    "splash/480x320.png":"drawable-land-mdpi/screen.png"
	},
	{
    "splash/1280x720.png":"drawable-land-xhdpi/screen.png"
	},
	{
    "splash/480x800.png":"drawable-port-hdpi/screen.png"
	},
	{
    "splash/200x320.png":"drawable-port-ldpi/screen.png"
	},
	{
    "splash/640x960@0.5x.png":"drawable-port-mdpi/screen.png"
	},
	{
    "splash/720x1280.png":"drawable-port-xhdpi/screen.png"
	}
];

var iosRes = [
	{
		"640x1136.png":"Default-568h@2x~iphone.png"
	},
	{
		"1024x768@2x.png":"Default-Landscape@2x~ipad.png"
	},
	{
		"1024x768.png":"Default-Landscape~ipad.png"
	},
	{
		"768x1024@2x.png":"Default-Portrait@2x~ipad.png"
	},
	{
		"768x1024@1x.png":"Default-Portrait~ipad.png"
	},
	{
		"640x960.png":"Default@2x~iphone.png"
	},
	{
		"640x960@0.5x.png":"Default~iphone.png"
	},
	{
		"750x1334.png":"Default-667h.png"
	},
	{
		"1242x2208.png":"Default-736h.png"
	},
	{
		"2208x1242.png":"Default-landscape-736h.png"
	}
];

if( process.env.CORDOVA_PLATFORMS === "ios" ){
	//splash
	iosRes.forEach(function(obj) {
			Object.keys(obj).forEach(function(key) {
					var val = obj[key];
					var srcfile = path.join(rootdir, "res/splash", key);
					var destfile = path.join(rootdir, "platforms/ios/明室/Resources/splash", val);
					var destdir = path.dirname(destfile);
					if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
							fs.createReadStream(srcfile).pipe(
								fs.createWriteStream(destfile));
					}
			});
	});
	// icons
	fs.readdir( path.join(rootdir, "res/icons"), function( err, paths ){
			paths.forEach(function( filename ){
				var srcfile = path.join(rootdir, "res/icons", filename);
				var destfile = path.join(rootdir, "platforms/ios/明室/Resources/icons", filename);
				var destdir = path.dirname(destfile);
				if (fs.existsSync(srcfile) && fs.existsSync(destdir) && path.extname(filename) === ".png" ) {
						fs.createReadStream(srcfile).pipe(
							fs.createWriteStream(destfile));
				}
			})
	});
}else if( process.env.CORDOVA_PLATFORMS === "android" ){
// android
	androidRes.forEach(function(obj) {
			Object.keys(obj).forEach(function(key) {
					var val = obj[key];
					var srcfile = path.join(rootdir, "res", key);
					var destfile = path.join(rootdir, "platforms/android/res", val);
					var destdir = path.dirname(destfile);
					if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
							fs.createReadStream(srcfile).pipe(
								fs.createWriteStream(destfile));
					}
			});
	});
}

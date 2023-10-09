const { exec } = require('child_process');

const termux = {
  // Battery status
  getBatteryStatus: (callback) => execCommand('termux-battery-status', callback),

  // Screen brightness
  setBrightness: (level, callback) => execCommand(`termux-brightness ${level}`, callback),

  // Call log
  getCallLog: (callback) => execCommand('termux-call-log', callback),

  // Camera info
  getCameraInfo: (callback) => execCommand('termux-camera-info', callback),

  // Take photo
  takePhoto: (cameraId, filePath, callback) => execCommand(`termux-camera-photo -c ${cameraId} ${filePath}`, callback),

  // Clipboard
  getClipboard: (callback) => execCommand('termux-clipboard-get', callback),
  setClipboard: (text, callback) => execCommand(`termux-clipboard-set "${text}"`, callback),

  // Contacts
  getContactList: (callback) => execCommand('termux-contact-list', callback),

  // Dialogs
  showDialog: (type, title, hint, callback) => execCommand(`termux-dialog ${type} --title "${title}" --hint "${hint}"`, callback),

  // Downloads
  download: (url, desc, title, callback) => execCommand(`termux-download "${url}" -d "${desc}" -t "${title}"`, callback),

  // Fingerprint
  fingerprint: (callback) => execCommand('termux-fingerprint', callback),

  // Infrared
  getInfraredFrequencies: (callback) => execCommand('termux-infrared-frequencies', callback),
  infraredTransmit: (pattern, carrier, callback) => execCommand(`termux-infrared-transmit -p ${pattern} -c ${carrier}`, callback),

  // Job Scheduler
  scheduleJob: (script, period, callback) => execCommand(`termux-job-scheduler ${script} --period ${period}`, callback),

  // Location
  getLocation: (provider, request, callback) => execCommand(`termux-location -p ${provider} -r ${request}`, callback),

  // Media player
  mediaPlayer: (action, filePath, callback) => execCommand(`termux-media-player ${action} ${filePath}`, callback),

  // Media Scan
  mediaScan: (filePath, callback) => execCommand(`termux-media-scan ${filePath}`, callback),

  // Microphone Record
  microphoneRecord: (filePath, limit, callback) => execCommand(`termux-microphone-record -f ${filePath} -l ${limit}`, callback),

  // Notifications
  sendNotification: (id, title, content, callback) => execCommand(`termux-notification --id ${id} --title "${title}" --content "${content}"`, callback),
  removeNotification: (id, callback) => execCommand(`termux-notification-remove ${id}`, callback),

  // Sensors
  getSensorInfo: (sensor, num, delay, callback) => execCommand(`termux-sensor -s ${sensor} -c ${num} -d ${delay}`, callback),

  // Sharing
  share: (filePath, title, callback) => execCommand(`termux-share -t "${title}" ${filePath}`, callback),

  // SMS
  listSMS: (limit, offset, callback) => execCommand(`termux-sms-list -l ${limit} -o ${offset}`, callback),
  sendSMS: (number, message, callback) => execCommand(`termux-sms-send -n ${number} "${message}"`, callback),

  // Storage
  storageGet: (filePath, callback) => execCommand(`termux-storage-get ${filePath}`, callback),

  // Telephony
  makeCall: (number, callback) => execCommand(`termux-telephony-call ${number}`, callback),
  getCellInfo: (callback) => execCommand('termux-telephony-cellinfo', callback),
  getTelephonyInfo: (callback) => execCommand('termux-telephony-deviceinfo', callback),

  // Toast
  showToast: (message, duration, position, callback) => execCommand(`termux-toast "${message}" -d ${duration} -g ${position}`, callback),

  // Torch
  toggleTorch: (state, callback) => execCommand(`termux-torch ${state}`, callback),

  // Text-to-Speech
  listTTSEngines: (callback) => execCommand('termux-tts-engines', callback),
  speak: (text, engine, pitch, rate, callback) => execCommand(`termux-tts-speak "${text}" -e ${engine} -p ${pitch} -r ${rate}`, callback),

  // USB
  listUSB: (callback) => execCommand('termux-usb -l', callback),

  // Vibration
  vibrate: (duration, force, callback) => execCommand(`termux-vibrate -d ${duration} -f ${force}`, callback),

  // Volume
  setVolume: (stream, level, callback) => execCommand(`termux-volume ${stream} ${level}`, callback),

  // Wallpaper
  setWallpaper: (filePath, scale, callback) => execCommand(`termux-wallpaper -f ${filePath} -s ${scale}`, callback),

  // WiFi
  getWiFiConnectionInfo: (callback) => execCommand('termux-wifi-connectioninfo', callback),
  toggleWiFi: (state, callback) => execCommand(`termux-wifi-enable ${state}`, callback),
  getWiFiScanInfo: (callback) => execCommand('termux-wifi-scaninfo', callback)
};

function execCommand(command, callback) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      callback(error, null);
      return;
    }
    try {
      callback(null, JSON.parse(stdout));
    } catch (e) {
      callback(null, stdout.trim());
    }
  });
}

module.exports = termux;

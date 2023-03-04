import { BrowserWindow } from "electron";

export default function disableCors(win: BrowserWindow) {
   win.webContents.session.webRequest.onBeforeSendHeaders(
  (details, callback) => {
    callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
  },
);

win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
  callback({
    responseHeaders: {
      'Access-Control-Allow-Origin': ['*'],
      // We use this to bypass headers
      'Access-Control-Allow-Headers': ['*'],
      ...details.responseHeaders,
    },
  });
});
}
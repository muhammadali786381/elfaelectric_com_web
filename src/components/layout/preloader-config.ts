// Seconds, shared by the brand reveal, preview and safety timeout.
const label = "ELFA ELECTRIC";
const textEnterAt = 0.05;
const textEnterDuration = 0.35;
const letterStagger = 0.04;
// Start drawing immediately when the final letter finishes its entrance.
const lineStart = textEnterAt + (Array.from(label).length - 1) * letterStagger + textEnterDuration;
const lineDuration = 0.4;
const textFadeAt = lineStart + lineDuration + 0.1;
const textFadeDuration = 0.12;
const panelStart = textFadeAt + textFadeDuration;
const panelDuration = 0.9;

export const PRELOADER = {
  label,
  textEnterAt,
  textEnterDuration,
  letterStagger,
  lineStart,
  lineDuration,
  textFadeAt,
  textFadeDuration,
  // Fade at full width as the reveal starts; do not retract the line.
  lineExitAt: panelStart,
  lineExitDuration: 0.16,
  panelStart,
  panelDuration,
  reducedHold: 0.55,
  reducedFade: 0.2,
  fallbackMs: 4000,
  sessionKey: "elfa-preloader-seen",
  entranceEasing: [0.23, 1, 0.32, 1],
  panelEasing: [0.76, 0, 0.24, 1],
} as const;

export const PRELOADER_BOOT_STYLE_ID = "elfa-preloader-visibility";

// CSSOM changes leave the server-rendered DOM intact, avoiding hydration
// mismatches while suppressing repeat-visit flashes before React starts.
export const PRELOADER_BOOTSTRAP = `(function(){
  var skip=false;
  var navigation=performance.getEntriesByType("navigation")[0];
  var reload=navigation&&navigation.type==="reload";
  try{skip=!reload&&sessionStorage.getItem(${JSON.stringify(PRELOADER.sessionKey)})==="1";}catch(e){}
  window.__elfaPreloader={skip:skip,deadline:Date.now()+${PRELOADER.fallbackMs}};
  if(skip){
    var style=document.getElementById(${JSON.stringify(PRELOADER_BOOT_STYLE_ID)});
    if(style&&style.sheet)style.sheet.insertRule('[data-loader-session]{display:none!important}',0);
  }
})();`;

declare global {
  interface Window {
    __elfaPreloader?: { skip: boolean; deadline: number };
  }
}

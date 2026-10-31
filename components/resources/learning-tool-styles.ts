// Shared website tokens and typography, applied within each tool's isolated DOM.
export const learningToolStyles = `
:host { display:block; font-family:var(--font-inter),Arial,sans-serif; color:#0f172a; }
.tool-document,.tool-body {
  --bg:#fff!important; --card:#fff!important; --paper:#fff!important; --ink:#0f172a!important;
  --body:#475569!important; --muted:#475569!important; --line:#e2e8f0!important; --soft:#f8fafc!important;
  --blue:#2456eb!important; --blue-deep:#1b43d8!important; --blue-pale:#eff5ff!important; --blue-s:#eff5ff!important;
  --accent:#2456eb!important; --accent-s:#eff5ff!important; --green:#047857!important; --green-s:#ecfdf5!important;
  --green-pale:#ecfdf5!important; --red:#b91c1c!important; --red-s:#fef2f2!important; --red-pale:#fef2f2!important;
  --amber:#92400e!important; --amber-pale:#fffbeb!important; --orange:#92400e!important; --orange-s:#fffbeb!important;
  --on-accent:#fff!important; --radius:4px!important; --maxw:100%!important;
  --display:var(--font-jakarta),var(--font-inter),Arial,sans-serif!important;
  --text:var(--font-inter),Arial,sans-serif!important;
  color-scheme:light!important; font-family:var(--text)!important; background:#fff!important;
  color:var(--ink)!important; min-height:0!important; height:auto!important; margin:0!important; padding:0!important;
}
*,*::before,*::after { box-sizing:border-box; }
[hidden] { display:none!important; }
.wrap { width:100%!important; max-width:none!important; padding:0!important; margin:0!important; }
.sitenav,.sitefooter,.logo-l,.logo-d,.themebtn,.theme-toggle,#themeBtn,#theme-toggle { display:none!important; }
header { background:white!important; border:0!important; border-bottom:1px solid #e2e8f0!important; border-radius:0!important; margin:0 0 24px!important; padding:0 0 18px!important; }
h1,h2,h3,h4 { font-family:var(--display)!important; color:#0f172a; letter-spacing:-.025em; }
button,input,select,textarea { font-family:var(--text)!important; font-size:inherit; }
button { min-height:44px; cursor:pointer; }
button:disabled { cursor:not-allowed; }
button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,a:focus-visible { outline:3px solid #2456eb!important; outline-offset:3px!important; }
input:not([type=checkbox]):not([type=radio]):not([type=range]),select,textarea { border-radius:8px!important; border-color:#cbd5e1!important; background:#fff!important; color:#0f172a!important; }
.card,.panel,.setup,.topic,.topic-card,.customcard,.quick15,.qcard,.setup-card,.bank-card,.sheet,.result-card { border-radius:4px!important; box-shadow:none!important; border-color:#e2e8f0!important; }
.btn,.start-btn,.next-btn,.primary,.back,.minibtn,.exam-pill,.fchip { border-radius:999px!important; }
.opt,.mode-opt { border-radius:8px!important; }
.opt[aria-pressed=true],.mode-opt[aria-pressed=true],.fchip[aria-pressed=true] { border-color:#2456eb!important; background:#eff5ff!important; color:#162254!important; }
.setup-head { background:transparent!important; }
.setup-head h2 { font-size:1.75rem; margin:0 0 12px; }
.lead { color:#475569!important; }
@media(min-width:800px){ .tool-body > .wrap { max-width:880px!important; margin:0 auto!important; } }
@media(max-width:640px){ h1,h2 { overflow-wrap:anywhere; } button { touch-action:manipulation; } .tool-body { overflow-wrap:break-word; } }
@media print { :host { display:block!important; } .tool-document,.tool-body { background:#fff!important; } }
`;

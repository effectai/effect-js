(function(){"use strict";const e=window.matchMedia("(prefers-color-scheme: dark)"),t=localStorage.getItem("vocs.theme");(t||(e.matches?"dark":"light"))==="dark"&&document.documentElement.classList.add("dark"),t||e.addEventListener("change",({matches:d})=>{d?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")})})();

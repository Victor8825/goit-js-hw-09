!function(){var t=document.body,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),r=null;e.addEventListener("click",(function(){r=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),n.removeAttribute("disabled"),e.setAttribute("disabled","true")})),n.addEventListener("click",(function(){clearInterval(r),e.removeAttribute("disabled"),n.setAttribute("disabled","true")}))}();
//# sourceMappingURL=01-color-switcher.07b0fade.js.map

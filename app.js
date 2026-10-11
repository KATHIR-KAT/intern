(() => {
const $=id=>document.getElementById(id);
document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".tab").forEach(b=>b.classList.toggle("selected",b===btn));
 const mac=btn.dataset.os==="mac";
 if(!$("os-title"))return;
 $("os-title").textContent=mac?" macOS Setup":"▣ Windows Setup";
 $("os-intro").textContent=mac?"Follow these steps to run the dashboard and configure the built-in macOS SOCKS proxy.":"Use PowerShell to check PHP, enter your project folder, and run the local dashboard and proxy in separate terminals.";
 $("network-title").textContent=mac?"macOS Network Settings":"Windows Proxy Settings";
 $("network-steps").innerHTML=mac
 ?"<li>Open <strong>System Settings → Network</strong>.</li><li>Select your active connection, such as Wi-Fi, then click <strong>Details…</strong>.</li><li>Open <strong>Proxies</strong> and enable <strong>SOCKS Proxy</strong>.</li><li>Enter server <code>127.0.0.1</code> and port <code>1080</code>.</li><li>Click <strong>OK → Apply</strong>.</li>"
 :"<li>Open <strong>Settings → Network & Internet → Proxy</strong>.</li><li>Use a compatible app or SOCKS client to configure the proxy.</li><li>Set the SOCKS host to <code>127.0.0.1</code> and port to <code>1080</code>.</li><li>Save and test with the curl command below.</li>";
}));
if(!$("logs"))return;
let running=true,autoScroll=true,active=1,totalBytes=20326,clientNo=691;
const logBox=$("logs"),pad=n=>String(n).padStart(2,"0");
const timestamp=()=>{const d=new Date();return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`};
const addLog=text=>{const line=document.createElement("div");line.className="log-line";line.textContent=`[${timestamp()}] ${text}`;logBox.appendChild(line);while(logBox.children.length>160)logBox.removeChild(logBox.firstChild);if(autoScroll)logBox.scrollTop=logBox.scrollHeight};
const render=()=>{$("active-count").textContent=active;$("data-count").textContent=totalBytes<1024?`${totalBytes} Bytes`:`${(totalBytes/1024).toFixed(2)} KB`;$("connection-pill").textContent=`${active} active`;$("status-text").textContent=running?"Running":"Stopped";$("status-dot").style.background=running?"var(--green)":"var(--red)";$("status-text").style.color=running?"var(--green)":"var(--red)";$("toggle-server").textContent=running?"■ Stop Proxy Server":"▶ Start Proxy Server";$("toggle-server").classList.toggle("danger",running);$("toggle-server").classList.toggle("primary",!running);$("pid-count").textContent=running?"DEMO":"—";$("connection-rows").innerHTML=active?`<tr><td>#${clientNo}</td><td>127.0.0.1 : 49753</td><td>3.225.83.162:443</td><td>${timestamp().split(" ")[1]}</td><td>↑ 623 Bytes / ↓ ${(totalBytes/1024).toFixed(2)} KB<br>${(totalBytes/1024+.61).toFixed(2)} KB total</td></tr>`:'<tr><td class="empty" colspan="5">No active connections</td></tr>'};
addLog("Demo dashboard initialized. No real proxy process is connected.");addLog("Waiting for simulated client activity...");render();
$("toggle-server").addEventListener("click",()=>{running=!running;addLog(running?"Demo server status changed to Running.":"Demo server status changed to Stopped.");active=0;render()});
$("clear-logs").addEventListener("click",()=>logBox.innerHTML="");
$("auto-scroll").addEventListener("click",()=>{autoScroll=!autoScroll;$("auto-scroll").textContent=`Auto-Scroll: ${autoScroll?"ON":"OFF"}`});
setInterval(()=>{if(!running)return;const id=++clientNo;if(Math.random()>.45){active=1;totalBytes+=Math.floor(80+Math.random()*900);addLog(`Client #${id} Incoming connection from 127.0.0.1:${49700+Math.floor(Math.random()*900)}`);addLog(`Client #${id} Connecting to remote host: 3.225.83.162:443`);addLog(`Client #${id} Tunnel established (demo)`)}else{addLog(`Client #${id} Client connection closed.`);active=0}render()},5000);
})();
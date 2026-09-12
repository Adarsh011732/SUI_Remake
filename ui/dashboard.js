/* ══════════════════════════════════════════════════════════════════════
   FLUIDBLCX UNIVERSAL DASHBOARD SCRIPT
   Provides live candlestick telemetry, wallet state, and table filtering
   ══════════════════════════════════════════════════════════════════════ */

// ─── Candlestick Telemetry Engine (Right Sidebar) ───
let telemetryCandles = [];
let telemetryPrice = 0.725;
let telemetryPercent = -3.36;
let activeTimeframe = '1D';

const timeframePresets = {
  '15M': { basePrice: 0.724, deltaPattern: [0.721, 0.722, 0.725, 0.723, 0.726, 0.724, 0.725], high: 0.728, low: 0.719 },
  '1H':  { basePrice: 0.730, deltaPattern: [0.735, 0.732, 0.728, 0.731, 0.727, 0.725], high: 0.742, low: 0.720 },
  '4H':  { basePrice: 0.742, deltaPattern: [0.760, 0.752, 0.745, 0.738, 0.730, 0.725], high: 0.768, low: 0.715 },
  '1D':  { basePrice: 0.758, deltaPattern: [0.756, 0.752, 0.748, 0.742, 0.738, 0.744, 0.741, 0.735, 0.731, 0.736, 0.732, 0.728, 0.735, 0.742, 0.738, 0.749, 0.718, 0.712, 0.730, 0.748, 0.762, 0.755, 0.742, 0.734, 0.728, 0.725], high: 0.782, low: 0.698 },
  '1W':  { basePrice: 0.680, deltaPattern: [0.650, 0.670, 0.690, 0.710, 0.740, 0.780, 0.750, 0.725], high: 0.810, low: 0.640 }
};

function initTelemetryCandlesticks(tf = '1D') {
  const canvas = document.getElementById('telemetryCandleCanvas');
  if (!canvas) return;

  activeTimeframe = tf;
  const preset = timeframePresets[tf] || timeframePresets['1D'];
  telemetryCandles = [];
  
  const pattern = preset.deltaPattern;
  pattern.forEach((close, i) => {
    const open = i === 0 ? preset.basePrice : pattern[i - 1];
    const high = Math.max(open, close) + (Math.random() * 0.005 + 0.002);
    const low = Math.min(open, close) - (Math.random() * 0.006 + 0.002);
    telemetryCandles.push({ open, close, high, low });
  });

  renderTelemetryChart();
}

function setCandleTimeframe(btn, tf) {
  document.querySelectorAll('.timeframe-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  initTelemetryCandlesticks(tf);
}

function renderTelemetryChart() {
  const canvas = document.getElementById('telemetryCandleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  let minP = Infinity, maxP = -Infinity;
  telemetryCandles.forEach(c => {
    if (c.low < minP) minP = c.low;
    if (c.high > maxP) maxP = c.high;
  });
  const pad = (maxP - minP) * 0.1 || 0.005;
  minP -= pad;
  maxP += pad;

  // Left Y axis price labels
  const steps = 5;
  ctx.fillStyle = '#475569';
  ctx.font = '500 8.5px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';

  const chartLeft = 42;
  const chartBottom = h - 22;

  for (let i = 0; i <= steps; i++) {
    const val = minP + (maxP - minP) * (i / steps);
    const y = chartBottom - (i / steps) * (chartBottom - 10);
    ctx.fillText(val.toFixed(3), 2, y + 3);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    ctx.beginPath();
    ctx.moveTo(chartLeft, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Time axis labels along bottom
  const timeLabels = ['18p', '0a', '6a', '12p', '18p', '0a', '6a'];
  ctx.fillStyle = '#475569';
  ctx.textAlign = 'center';
  const timeStep = (w - chartLeft - 10) / (timeLabels.length - 1);
  timeLabels.forEach((lbl, idx) => {
    const tx = chartLeft + idx * timeStep;
    ctx.fillText(lbl, tx, h - 5);
  });

  // Render Candlesticks
  const numCandles = telemetryCandles.length;
  const candleGap = 3;
  const candleW = Math.max(3, (w - chartLeft - 10 - (numCandles * candleGap)) / numCandles);

  telemetryCandles.forEach((c, idx) => {
    const cx = chartLeft + idx * (candleW + candleGap);
    const isUp = c.close >= c.open;
    const color = isUp ? '#00ff88' : '#f43f5e';

    const topY = chartBottom - ((Math.max(c.open, c.close) - minP) / (maxP - minP)) * (chartBottom - 10);
    const btmY = chartBottom - ((Math.min(c.open, c.close) - minP) / (maxP - minP)) * (chartBottom - 10);
    const highY = chartBottom - ((c.high - minP) / (maxP - minP)) * (chartBottom - 10);
    const lowY = chartBottom - ((c.low - minP) / (maxP - minP)) * (chartBottom - 10);

    // Wick
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cx + candleW / 2, highY);
    ctx.lineTo(cx + candleW / 2, lowY);
    ctx.stroke();

    // Body
    ctx.fillStyle = color;
    ctx.fillRect(cx, topY, candleW, Math.max(2, btmY - topY));
  });
}

// ─── System Telemetry Jitter Engine ───
function initSystemTelemetryEngine() {
  const gasEl = document.getElementById('telemetryGasLoad');
  const gasBar = document.getElementById('telemetryGasBar');
  if (!gasEl) return;

  setInterval(() => {
    const baseGas = 1980;
    const jitter = Math.floor((Math.random() - 0.5) * 24);
    const curGas = baseGas + jitter;
    gasEl.textContent = `${curGas.toLocaleString()} MIST`;
    if (gasBar) {
      const pct = Math.min(100, Math.max(15, ((curGas - 1900) / 200) * 100));
      gasBar.style.width = pct + '%';
    }
  }, 3200);

  // Candlestick subtle live jitter
  setInterval(() => {
    if (telemetryCandles.length === 0) return;
    const last = telemetryCandles[telemetryCandles.length - 1];
    const delta = (Math.random() - 0.51) * 0.002;
    last.close = +(last.close + delta).toFixed(3);
    last.high = Math.max(last.high, last.close);
    last.low = Math.min(last.low, last.close);
    telemetryPrice = last.close;

    const priceEl = document.getElementById('telemetrySpotPrice');
    if (priceEl) priceEl.textContent = `$${telemetryPrice.toFixed(3)}`;

    renderTelemetryChart();
  }, 2400);
}

// ─── Wallet Session Management ───
function initWalletState() {
  const statusDot = document.getElementById('walletStatusDot');
  const statusText = document.getElementById('walletStatusText');
  const connectBtn = document.getElementById('connectWalletBtn');

  try {
    const raw = localStorage.getItem('fluidblcx_wallet') || localStorage.getItem('userSession');
    if (raw) {
      const data = typeof raw === 'string' && raw.startsWith('{') ? JSON.parse(raw) : { address: raw };
      const addr = data.address || data.wallet || '0x7a8b...3f21';
      if (statusDot) statusDot.classList.add('connected');
      if (statusText) statusText.textContent = addr.length > 12 ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : addr;
      if (connectBtn) connectBtn.innerHTML = `<span>Disconnect</span>`;
      return;
    }
  } catch (e) {}

  if (statusText) statusText.textContent = 'Not Connected';
  if (statusDot) statusDot.classList.remove('connected');
  if (connectBtn) connectBtn.innerHTML = `<span>Connect Wallet</span>`;
}

function handleConnectWalletClick() {
  const raw = localStorage.getItem('fluidblcx_wallet');
  if (raw) {
    localStorage.removeItem('fluidblcx_wallet');
    localStorage.removeItem('userSession');
    initWalletState();
    showToast('Wallet session severed');
  } else {
    localStorage.setItem('fluidblcx_wallet', JSON.stringify({
      type: 'sui',
      name: 'Sui Wallet',
      address: '0x7a8b9c1d2e3f4a5b6c7d8e9f0123456789abcdef3f21',
      timestamp: Date.now()
    }));
    initWalletState();
    showToast('Connected: 0x7a8b...3f21 via Mysticeti L1');
  }
}

// ─── Category Tab Filtering ───
function filterCategory(btn, category, tableBodyId) {
  const parent = btn.parentElement;
  if (parent) {
    parent.querySelectorAll('.filter-tab-pill').forEach(p => p.classList.remove('active'));
  }
  btn.classList.add('active');

  const tbody = document.getElementById(tableBodyId);
  if (!tbody) return;

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    if (category === 'all') {
      row.style.display = '';
    } else {
      const rowCat = row.getAttribute('data-category');
      row.style.display = (rowCat === category || !rowCat) ? '' : 'none';
    }
  });
}

// ─── Table Filter Engine ───
function filterTableRows(inputId, tableBodyId) {
  const input = document.getElementById(inputId);
  const tbody = document.getElementById(tableBodyId);
  if (!input || !tbody) return;

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// ─── Toast Notifications ───
function showToast(msg) {
  let toast = document.getElementById('dashToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'dashToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color: #00ff88;">✓</span> <span>${msg}</span>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// ─── Modals ───
function openSendModal(token = 'SUI') {
  const sel = document.getElementById('sendAssetSelect');
  if (sel) sel.value = token;
  const m = document.getElementById('sendModal');
  if (m) m.classList.add('active');
}

function closeSendModal() {
  const m = document.getElementById('sendModal');
  if (m) m.classList.remove('active');
}

function openReceiveModal() {
  const m = document.getElementById('receiveModal');
  if (m) m.classList.add('active');
}

function closeReceiveModal() {
  const m = document.getElementById('receiveModal');
  if (m) m.classList.remove('active');
}

function dispatchSendTransfer() {
  const asset = document.getElementById('sendAssetSelect')?.value || 'SUI';
  const amt = document.getElementById('sendAmountInput')?.value || '10';
  const recipient = document.getElementById('sendRecipientInput')?.value || '0x...';
  closeSendModal();
  showToast(`Dispatched ${amt} ${asset} PTB transfer to ${recipient.slice(0, 8)}...`);
}

function copyAddress(addr) {
  navigator.clipboard.writeText(addr || '0x7a8b9c1d2e3f4a5b6c7d8e9f0123456789abcdef3f21');
  showToast('Public Sovereign Address copied to clipboard');
}

// ─── Initialization on DOM Ready ───
window.addEventListener('DOMContentLoaded', () => {
  initTelemetryCandlesticks();
  initSystemTelemetryEngine();
  initWalletState();

  const connectBtn = document.getElementById('connectWalletBtn');
  if (connectBtn) {
    connectBtn.addEventListener('click', handleConnectWalletClick);
  }

  // Filter bindings if elements exist
  filterTableRows('portfolioSearchInput', 'portfolioTableBody');
  filterTableRows('marketSearchInput', 'marketTableBody');

  window.addEventListener('resize', () => {
    renderTelemetryChart();
  });
});

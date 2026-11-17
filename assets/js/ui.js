/* Small UI helpers shared by every view. */
(function (HSE) {
  'use strict';
  var ui = HSE.ui = {};

  ui.esc = function (value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };
  ui.attr = ui.esc;

  ui.initials = function (name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2).map(function (w) {
      return w.charAt(0).toUpperCase();
    }).join('');
  };

  ui.date = function (iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };
  ui.dateTime = function (iso) {
    if (!iso) return '—';
    var d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ', ' +
      d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };
  ui.relative = function (iso) {
    if (!iso) return '';
    var diff = Date.now() - new Date(iso).getTime();
    var mins = Math.round(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return mins + ' min ago';
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs + (hrs === 1 ? ' hour ago' : ' hours ago');
    var days = Math.round(hrs / 24);
    if (days < 30) return days + (days === 1 ? ' day ago' : ' days ago');
    return ui.date(iso);
  };

  ui.streamAccent = function (streamId) {
    return { science: '#0e7c66', commerce: '#b26a00', humanities: '#6b4ea8' }[streamId] || '#0e7c66';
  };
  ui.streamPill = function (streamId) {
    var cls = { science: '', commerce: 'gold', humanities: 'purple' }[streamId] || 'grey';
    var name = { science: 'Science', commerce: 'Commerce', humanities: 'Humanities' }[streamId] || streamId;
    return '<span class="pill ' + cls + '">' + ui.esc(name) + '</span>';
  };

  ui.ring = function (pct, colour, size) {
    size = size || 64;
    var r = (size / 2) - 5;
    var c = 2 * Math.PI * r;
    var off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + pct + '% complete">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="#e7ece7" stroke-width="6"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + (colour || '#0e7c66') + '" stroke-width="6" ' +
      'stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' +
      '<text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="' + (size / 4.2).toFixed(1) + '" fill="#11211c">' + pct + '%</text></svg>';
  };

  ui.toast = function (message, kind) {
    var host = document.querySelector('.toast-host');
    if (!host) {
      host = document.createElement('div');
      host.className = 'toast-host';
      host.setAttribute('aria-live', 'polite');
      document.body.appendChild(host);
    }
    var el = document.createElement('div');
    el.className = 'toast' + (kind === 'error' ? ' error' : '');
    el.textContent = message;
    host.appendChild(el);
    setTimeout(function () { el.remove(); }, 3600);
  };

  ui.modal = function (opts) {
    var backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-label="' + ui.attr(opts.title || 'Dialog') + '">' +
      '<header><h3>' + ui.esc(opts.title || '') + '</h3>' +
      (opts.subtitle ? '<div class="small muted">' + ui.esc(opts.subtitle) + '</div>' : '') + '</header>' +
      '<div class="body">' + (opts.body || '') + '</div>' +
      '<footer>' +
      '<button class="btn ghost" data-close>Cancel</button>' +
      '<button class="btn primary" data-confirm>' + ui.esc(opts.confirm || 'Save') + '</button>' +
      '</footer></div>';
    document.body.appendChild(backdrop);
    function close() { backdrop.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    backdrop.querySelector('[data-close]').addEventListener('click', close);
    backdrop.addEventListener('mousedown', function (e) { if (e.target === backdrop) close(); });
    backdrop.querySelector('[data-confirm]').addEventListener('click', function () {
      var body = backdrop.querySelector('.body');
      var result = opts.onConfirm ? opts.onConfirm(body) : true;
      if (result !== false) close();
    });
    return { close: close, root: backdrop };
  };

  ui.confirm = function (title, message, onYes, confirmLabel) {
    ui.modal({
      title: title, body: '<p>' + ui.esc(message) + '</p>',
      confirm: confirmLabel || 'Confirm',
      onConfirm: function () { onYes(); }
    });
  };

  /* Validated numeric read of an input, clamped to a range. */
  ui.number = function (input, min, max, fallback) {
    var v = parseFloat(input && input.value);
    if (isNaN(v)) v = fallback;
    return Math.max(min, Math.min(max, v));
  };

  ui.emptyState = function (title, text, actionHtml) {
    return '<div class="empty"><b>' + ui.esc(title) + '</b>' +
      (text ? '<div class="small" style="margin-top:.35rem">' + ui.esc(text) + '</div>' : '') +
      (actionHtml ? '<div style="margin-top:.8rem">' + actionHtml + '</div>' : '') + '</div>';
  };

  ui.qs = function (name) {
    var m = new RegExp('[?&]' + name + '=([^&#]*)').exec(window.location.hash);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : '';
  };
})(window.HSE = window.HSE || {});

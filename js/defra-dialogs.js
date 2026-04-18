(function () {
    if (window.DefraDialogs) {
        return;
    }

    var state = {
        mounted: false,
        currentResolve: null,
        currentType: 'alert'
    };

    function injectStyles() {
        if (document.getElementById('defra-dialog-styles')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'defra-dialog-styles';
        style.textContent = ''
            + '.pm-delete-modal{position:fixed;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;z-index:2000;visibility:hidden;opacity:0;transition:opacity .2s ease,visibility .2s ease;}'
            + '.pm-delete-modal.pm-delete-modal-show{visibility:visible;opacity:1;}'
            + '.pm-delete-modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.5);}'
            + '.pm-delete-modal-content{position:relative;background:#fff;border:1px solid #b1b4b6;border-radius:0;box-shadow:0 0 15px rgba(0,0,0,.2);width:90%;max-width:420px;z-index:1;}'
            + '.pm-delete-modal-header{padding:15px 20px;border-bottom:1px solid #d8dde1;background:#fff;}'
            + '.pm-delete-modal-title{margin:0;font-size:19px;font-weight:700;line-height:1.315789474;color:#0b0c0c;}'
            + '.pm-delete-modal-body{padding:20px;}'
            + '.pm-delete-modal-body p{margin:0 0 15px;font-size:16px;line-height:1.5;color:#0b0c0c;white-space:pre-wrap;}'
            + '.pm-delete-modal-footer{display:flex;gap:10px;justify-content:space-between;align-items:center;padding:15px 20px;border-top:1px solid #d8dde1;background:#f9f8f7;}'
            + '.pm-delete-modal-footer .govuk-button{margin:0;padding:8px 15px;font-size:16px;}'
            + '.pm-delete-modal-footer .govuk-button--secondary{flex-shrink:0;}'
            + '.pm-delete-modal-footer .govuk-button:not(.govuk-button--secondary){margin-left:auto;}'
            + '.pm-delete-modal-footer .govuk-button--warning{background-color:#d4351c;border-color:#d4351c;color:#fff;}'
            + '.defra-dialog-input{width:100%;min-height:40px;padding:8px 10px;border:1px solid #0b0c0c;font-size:16px;box-sizing:border-box;}'
            + '.defra-dialog-hidden{display:none !important;}'
            + 'body.defra-dialog-open{overflow:hidden;}';

        document.head.appendChild(style);
    }

    function ensureMounted() {
        if (state.mounted) {
            return;
        }

        injectStyles();

        var wrapper = document.createElement('div');
        wrapper.className = 'pm-delete-modal';
        wrapper.id = 'defraDialogModal';
        wrapper.setAttribute('role', 'dialog');
        wrapper.setAttribute('aria-labelledby', 'defraDialogTitle');
        wrapper.setAttribute('aria-hidden', 'true');
        wrapper.innerHTML = ''
            + '<div class="pm-delete-modal-backdrop" id="defraDialogBackdrop"></div>'
            + '<div class="pm-delete-modal-content">'
            + '<div class="pm-delete-modal-header">'
            + '<h2 id="defraDialogTitle" class="pm-delete-modal-title">Message</h2>'
            + '</div>'
            + '<div class="pm-delete-modal-body">'
            + '<p id="defraDialogMessage"></p>'
            + '<input id="defraDialogInput" class="defra-dialog-input defra-dialog-hidden" type="text" />'
            + '</div>'
            + '<div class="pm-delete-modal-footer">'
            + '<button type="button" id="defraDialogCancelBtn" class="govuk-button govuk-button--secondary defra-dialog-hidden">Cancel</button>'
            + '<button type="button" id="defraDialogConfirmBtn" class="govuk-button">OK</button>'
            + '</div>'
            + '</div>';

        document.body.appendChild(wrapper);

        wrapper.querySelector('#defraDialogBackdrop').addEventListener('click', function () {
            if (state.currentType === 'alert') {
                closeDialog(true);
            }
        });

        wrapper.querySelector('#defraDialogConfirmBtn').addEventListener('click', function () {
            if (state.currentType === 'prompt') {
                closeDialog(wrapper.querySelector('#defraDialogInput').value);
                return;
            }
            closeDialog(true);
        });

        wrapper.querySelector('#defraDialogCancelBtn').addEventListener('click', function () {
            if (state.currentType === 'prompt') {
                closeDialog(null);
                return;
            }
            closeDialog(false);
        });

        document.addEventListener('keydown', function (event) {
            if (wrapper.getAttribute('aria-hidden') === 'true') {
                return;
            }

            if (event.key === 'Escape') {
                if (state.currentType === 'alert') {
                    closeDialog(true);
                } else if (state.currentType === 'prompt') {
                    closeDialog(null);
                } else {
                    closeDialog(false);
                }
            }
        });

        state.mounted = true;
    }

    function openDialog(type, title, message, options) {
        ensureMounted();

        var modal = document.getElementById('defraDialogModal');
        var titleEl = document.getElementById('defraDialogTitle');
        var messageEl = document.getElementById('defraDialogMessage');
        var inputEl = document.getElementById('defraDialogInput');
        var cancelBtn = document.getElementById('defraDialogCancelBtn');
        var confirmBtn = document.getElementById('defraDialogConfirmBtn');

        state.currentType = type;
        titleEl.textContent = title || 'Message';
        messageEl.textContent = message == null ? '' : String(message);
        inputEl.classList.add('defra-dialog-hidden');
        cancelBtn.classList.add('defra-dialog-hidden');
        confirmBtn.textContent = options && options.confirmText ? options.confirmText : 'OK';
        confirmBtn.classList.remove('govuk-button--warning');

        if (type === 'alert') {
            cancelBtn.classList.remove('defra-dialog-hidden');
            cancelBtn.textContent = options && options.cancelText ? options.cancelText : 'Cancel';
        }

        if (type === 'confirm') {
            cancelBtn.classList.remove('defra-dialog-hidden');
            confirmBtn.textContent = options && options.confirmText ? options.confirmText : 'Confirm';
            cancelBtn.textContent = options && options.cancelText ? options.cancelText : 'Cancel';
            if (!options || options.kind !== 'info') {
                confirmBtn.classList.add('govuk-button--warning');
            }
        }

        if (type === 'prompt') {
            inputEl.classList.remove('defra-dialog-hidden');
            inputEl.value = options && Object.prototype.hasOwnProperty.call(options, 'defaultValue') ? options.defaultValue : '';
            cancelBtn.classList.remove('defra-dialog-hidden');
            cancelBtn.textContent = options && options.cancelText ? options.cancelText : 'Cancel';
            confirmBtn.textContent = options && options.confirmText ? options.confirmText : 'OK';
            setTimeout(function () { inputEl.focus(); inputEl.select(); }, 0);
        }

        modal.classList.add('pm-delete-modal-show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('defra-dialog-open');

        if (type !== 'prompt') {
            setTimeout(function () { confirmBtn.focus(); }, 0);
        }

        return new Promise(function (resolve) {
            state.currentResolve = resolve;
        });
    }

    function closeDialog(result) {
        var modal = document.getElementById('defraDialogModal');
        if (!modal) {
            return;
        }

        modal.classList.remove('pm-delete-modal-show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('defra-dialog-open');

        if (state.currentResolve) {
            var resolve = state.currentResolve;
            state.currentResolve = null;
            resolve(result);
        }
    }

    window.DefraDialogs = {
        alert: function (message, options) {
            return openDialog('alert', options && options.title ? options.title : 'Message', message, options || {});
        },
        confirm: function (message, callback, options) {
            return openDialog('confirm', options && options.title ? options.title : 'Confirm', message, options || {}).then(function (result) {
                var confirmed = Boolean(result);
                if (typeof callback === 'function') {
                    callback(confirmed);
                }
                return confirmed;
            });
        },
        prompt: function (message, defaultValue, callback, options) {
            var dialogOptions = options || {};
            dialogOptions.defaultValue = defaultValue;
            return openDialog('prompt', dialogOptions.title || 'Input Required', message, dialogOptions).then(function (value) {
                if (typeof callback === 'function') {
                    callback(value);
                }
                return value;
            });
        }
    };

    window.showDefraAlert = function (message, options) {
        return window.DefraDialogs.alert(message, options);
    };

    window.showDefraConfirm = function (message, callback, options) {
        return window.DefraDialogs.confirm(message, callback, options);
    };

    window.showDefraPrompt = function (message, defaultValue, callback, options) {
        return window.DefraDialogs.prompt(message, defaultValue, callback, options);
    };

    window.alert = function (message) {
        window.DefraDialogs.alert(message);
    };
}());
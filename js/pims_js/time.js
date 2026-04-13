"use strict";

/* =====================================================
   Time Tab – Working Hours & Working Days
   PIMS Report Admin Maintenance
   ===================================================== */

// ── Saved state (acts as the persisted values) ───────
var timeState = {
  workingHours: 7.2,
  workingDays: 220.5,
};

// ── Validation helpers ────────────────────────────────
function timeSetFieldError(groupId, errorId, inputId, message) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  var errText = document.getElementById(inputId + "ErrorText");
  if (group) group.classList.add("govuk-form-group--error");
  if (err) err.style.display = "";
  if (input) input.classList.add("govuk-input--error");
  if (errText && message) errText.textContent = message;
}

function timeClearFieldError(groupId, errorId, inputId) {
  var group = document.getElementById(groupId);
  var err = document.getElementById(errorId);
  var input = document.getElementById(inputId);
  if (group) group.classList.remove("govuk-form-group--error");
  if (err) err.style.display = "none";
  if (input) input.classList.remove("govuk-input--error");
}

function timeShowDbError(message) {
  var banner = document.getElementById("timeDbError");
  var text = document.getElementById("timeDbErrorText");
  if (banner) {
    banner.style.display = "";
    banner.focus();
  }
  if (text) text.textContent = message || "";
}

function timeHideDbError() {
  var banner = document.getElementById("timeDbError");
  if (banner) banner.style.display = "none";
}

// ── Initialise tab with saved values ─────────────────
function initTimeTab() {
  var hoursInput = document.getElementById("timeWorkingHours");
  var daysInput = document.getElementById("timeWorkingDays");
  if (hoursInput) hoursInput.value = timeState.workingHours;
  if (daysInput) daysInput.value = timeState.workingDays;
  timeClearFieldError(
    "timeWorkingHoursGroup",
    "timeWorkingHoursError",
    "timeWorkingHours",
  );
  timeClearFieldError(
    "timeWorkingDaysGroup",
    "timeWorkingDaysError",
    "timeWorkingDays",
  );
  timeHideDbError();
}

// ── Save ──────────────────────────────────────────────
function saveTimeSettings() {
  timeHideDbError();
  var hasError = false;

  // ── Working Hours in a Day (required, > 0, <= 24) ──
  var hoursInput = document.getElementById("timeWorkingHours");
  var hoursRaw = hoursInput ? hoursInput.value.trim() : "";
  var hoursNum = parseFloat(hoursRaw);

  if (!hoursRaw) {
    timeSetFieldError(
      "timeWorkingHoursGroup",
      "timeWorkingHoursError",
      "timeWorkingHours",
      "Working Hours in a Day is required",
    );
    hasError = true;
  } else if (isNaN(hoursNum) || hoursNum <= 0 || hoursNum > 24) {
    timeSetFieldError(
      "timeWorkingHoursGroup",
      "timeWorkingHoursError",
      "timeWorkingHours",
      "Enter a valid number greater than 0 and no more than 24",
    );
    hasError = true;
  } else {
    timeClearFieldError(
      "timeWorkingHoursGroup",
      "timeWorkingHoursError",
      "timeWorkingHours",
    );
  }

  // ── Working Days in a Year (required, > 0, <= 366) ──
  var daysInput = document.getElementById("timeWorkingDays");
  var daysRaw = daysInput ? daysInput.value.trim() : "";
  var daysNum = parseFloat(daysRaw);

  if (!daysRaw) {
    timeSetFieldError(
      "timeWorkingDaysGroup",
      "timeWorkingDaysError",
      "timeWorkingDays",
      "Working Days in a Year is required",
    );
    hasError = true;
  } else if (isNaN(daysNum) || daysNum <= 0 || daysNum > 366) {
    timeSetFieldError(
      "timeWorkingDaysGroup",
      "timeWorkingDaysError",
      "timeWorkingDays",
      "Enter a valid number greater than 0 and no more than 366",
    );
    hasError = true;
  } else {
    timeClearFieldError(
      "timeWorkingDaysGroup",
      "timeWorkingDaysError",
      "timeWorkingDays",
    );
  }

  if (hasError) {
    var firstErr = document.querySelector("#tab-time .govuk-input--error");
    if (firstErr) firstErr.focus();
    return;
  }

  // Persist to state
  timeState.workingHours = hoursNum;
  timeState.workingDays = daysNum;
  // API call would go here for a real back-end
}

// ── Cancel ────────────────────────────────────────────
function cancelTimeSettings() {
  // Reset fields to last saved state and clear all validation
  initTimeTab();
}

// ── Bootstrap ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  initTimeTab();

  var saveBtn = document.getElementById("btnSaveTime");
  if (saveBtn) saveBtn.addEventListener("click", saveTimeSettings);

  var cancelBtn = document.getElementById("btnCancelTime");
  if (cancelBtn) cancelBtn.addEventListener("click", cancelTimeSettings);

  // Re-init when tab is activated
  var tabLink = document.getElementById("tab-time-link");
  if (tabLink) {
    tabLink.addEventListener("click", function () {
      initTimeTab();
    });
  }
});

(function () {
  var rid = 0;

  /* ---------------- list rows: add / remove ---------------- */
  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".btn-add");
    if (addBtn) {
      var block = addBtn.closest(".list-block");
      var tpl = block ? block.querySelector(":scope > template") : null;
      if (!tpl) return;
      rid += 1;
      var html = tpl.innerHTML.split("__I__").join(String(rid));
      var rows = block.querySelector(":scope > .rows");
      rows.insertAdjacentHTML("beforeend", html);
      var first = rows.lastElementChild.querySelector("input, textarea");
      if (first) first.focus();
      return;
    }

    var removeBtn = e.target.closest(".btn-remove");
    if (removeBtn) {
      var row = removeBtn.closest(".row");
      if (row) row.remove();
    }
  });

  /* ---------------- image fields: preview ---------------- */
  var imgCatalog = null;
  var catalogCbs = [];
  var activeInput = null;
  var modal = null;
  var currentFolder = "*";

  function csrf() {
    var el = document.querySelector('form input[name="csrf"]');
    return el ? el.value : "";
  }

  function loadCatalog(cb) {
    if (imgCatalog) {
      cb(imgCatalog);
      return;
    }
    catalogCbs.push(cb);
    if (catalogCbs.length > 1) return;
    fetch("media.php?action=list-json", { credentials: "same-origin" })
      .then(function (r) { return r.json(); })
      .catch(function () { return { folders: [], images: [] }; })
      .then(function (d) {
        imgCatalog = d;
        var q = catalogCbs;
        catalogCbs = [];
        q.forEach(function (f) { f(d); });
        document.querySelectorAll(".img-fld").forEach(function (w) {
          var inp = w.querySelector(".img-path");
          if (inp && inp.value.trim()) updatePreview(inp);
        });
      });
  }

  function stagedThumb(path) {
    if (!imgCatalog) return null;
    for (var i = 0; i < imgCatalog.images.length; i++) {
      var x = imgCatalog.images[i];
      if (x.path === path && x.staged) return x.thumb;
    }
    return null;
  }

  function updatePreview(input) {
    var wrap = input.closest(".img-fld");
    if (!wrap) return;
    var box = wrap.querySelector(".img-preview");
    var hint = wrap.querySelector(".img-hint");
    var clearBtn = wrap.querySelector(".img-clear");
    var val = input.value.trim();
    var img = box.querySelector("img");

    if (!val) {
      box.classList.add("empty");
      if (img) img.remove();
      hint.textContent = "";
      wrap.classList.remove("img-missing");
      if (clearBtn) clearBtn.classList.add("hidden");
      return;
    }
    if (clearBtn) clearBtn.classList.remove("hidden");
    if (!img) {
      img = document.createElement("img");
      box.appendChild(img);
    }
    box.classList.remove("empty");

    var staged = stagedThumb(val);
    var src = staged || val;
    img.onload = function () {
      wrap.classList.remove("img-missing");
      hint.textContent = staged ? "Staged — goes live with your next Deploy." : "";
    };
    img.onerror = function () {
      wrap.classList.add("img-missing");
      hint.textContent = "Image not found on the site (upload it or check the path).";
    };
    if (img.getAttribute("src") !== src) img.src = src;
  }

  document.addEventListener("input", function (e) {
    if (e.target.classList && e.target.classList.contains("img-path")) {
      updatePreview(e.target);
    }
  });

  if (document.querySelector(".img-fld")) loadCatalog(function () {});

  /* ---------------- picker modal ---------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function ensureModal() {
    if (modal) return;
    modal = el("div", "picker-overlay");

    var panel = el("div", "picker");
    var head = el("div", "picker-head");
    head.appendChild(el("strong", null, "Choose an image"));
    var close = el("button", "picker-close", "×");
    close.type = "button";
    head.appendChild(close);
    panel.appendChild(head);

    var tabs = el("div", "picker-tabs");
    var tabBrowse = el("button", "picker-tab active", "Browse");
    tabBrowse.type = "button";
    tabBrowse.dataset.tab = "browse";
    var tabUpload = el("button", "picker-tab", "Upload");
    tabUpload.type = "button";
    tabUpload.dataset.tab = "upload";
    tabs.appendChild(tabBrowse);
    tabs.appendChild(tabUpload);
    panel.appendChild(tabs);

    var body = el("div", "picker-body");

    var browse = el("div", "picker-browse");
    browse.appendChild(el("div", "folder-chips"));
    browse.appendChild(el("div", "picker-grid"));
    body.appendChild(browse);

    var upload = el("div", "picker-upload hidden");
    var form = document.createElement("form");
    form.enctype = "multipart/form-data";
    var folderRow = el("label", "fld");
    folderRow.appendChild(el("span", "fld-label", "Folder"));
    var folderSel = document.createElement("select");
    folderSel.name = "folder";
    folderRow.appendChild(folderSel);
    var fileRow = el("label", "fld");
    fileRow.appendChild(el("span", "fld-label", "File (max 5 MB)"));
    var fileIn = document.createElement("input");
    fileIn.type = "file";
    fileIn.name = "file";
    fileIn.accept = ".jpg,.jpeg,.png,.webp,.avif,.svg";
    fileRow.appendChild(fileIn);
    var status = el("div", "hint");
    var submit = el("button", "btn primary", "Upload & use");
    submit.type = "submit";
    form.appendChild(folderRow);
    form.appendChild(fileRow);
    form.appendChild(submit);
    form.appendChild(status);
    upload.appendChild(form);
    body.appendChild(upload);

    panel.appendChild(body);
    modal.appendChild(panel);
    document.body.appendChild(modal);

    close.addEventListener("click", closePicker);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closePicker();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.style.display === "flex") closePicker();
    });

    tabs.addEventListener("click", function (e) {
      var t = e.target.closest(".picker-tab");
      if (t) setTab(t.dataset.tab);
    });

    browse.addEventListener("click", function (e) {
      var chip = e.target.closest(".folder-chip");
      if (chip) {
        currentFolder = chip.dataset.folder;
        renderGrid();
        return;
      }
      var cell = e.target.closest(".picker-cell");
      if (cell && activeInput) {
        activeInput.value = cell.dataset.path;
        updatePreview(activeInput);
        closePicker();
      }
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var file = fileIn.files && fileIn.files[0];
      if (!file) {
        status.textContent = "Choose a file first.";
        return;
      }
      var fd = new FormData();
      fd.append("file", file);
      fd.append("csrf", csrf());
      fd.append("action", "upload");
      fd.append("format", "json");
      fd.append("folder", folderSel.value);
      status.textContent = "Uploading…";
      fetch("media.php", { method: "POST", body: fd, credentials: "same-origin" })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (!d.ok) {
            status.textContent = d.error || "Upload failed.";
            return;
          }
          if (imgCatalog) {
            imgCatalog.images.push({ path: d.path, folder: d.folder, staged: true, thumb: d.thumb });
          }
          if (activeInput) {
            activeInput.value = d.path;
            updatePreview(activeInput);
          }
          closePicker();
        })
        .catch(function () {
          status.textContent = "Upload failed (network error).";
        });
    });
  }

  function setTab(name) {
    modal.querySelectorAll(".picker-tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === name);
    });
    modal.querySelector(".picker-browse").classList.toggle("hidden", name !== "browse");
    modal.querySelector(".picker-upload").classList.toggle("hidden", name !== "upload");
    if (name === "browse") renderGrid();
  }

  function renderGrid() {
    loadCatalog(function (cat) {
      var chips = modal.querySelector(".folder-chips");
      var grid = modal.querySelector(".picker-grid");
      chips.textContent = "";
      grid.textContent = "";

      var folders = ["*"].concat(cat.folders || []);
      folders.forEach(function (f) {
        var c = el("button", "folder-chip" + (currentFolder === f ? " active" : ""), f === "*" ? "All" : f);
        c.type = "button";
        c.dataset.folder = f;
        chips.appendChild(c);
      });

      var sel = modal.querySelector(".picker-upload select");
      if (sel && !sel.options.length) {
        (cat.folders || []).forEach(function (f) {
          var o = document.createElement("option");
          o.value = f;
          o.textContent = f;
          sel.appendChild(o);
        });
      }

      var list = (cat.images || []).filter(function (x) {
        return currentFolder === "*" || x.folder === currentFolder;
      });
      if (!list.length) {
        grid.appendChild(el("p", "muted", "No images in this folder yet."));
        return;
      }
      list.forEach(function (x) {
        var cell = el("button", "picker-cell");
        cell.type = "button";
        cell.dataset.path = x.path;
        cell.title = x.path;
        var im = document.createElement("img");
        im.loading = "lazy";
        im.src = x.thumb;
        im.alt = x.path;
        cell.appendChild(im);
        if (x.staged) cell.appendChild(el("span", "chip", "staged"));
        grid.appendChild(cell);
      });
    });
  }

  function openPicker(tab) {
    ensureModal();
    modal.style.display = "flex";
    setTab(tab);
  }

  function closePicker() {
    if (modal) modal.style.display = "none";
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".img-browse, .img-upload, .img-clear");
    if (!btn) return;
    var wrap = btn.closest(".img-fld");
    if (!wrap) return;
    var input = wrap.querySelector(".img-path");
    if (!input) return;

    if (btn.classList.contains("img-clear")) {
      input.value = "";
      updatePreview(input);
      input.focus();
      return;
    }
    activeInput = input;
    openPicker(btn.classList.contains("img-upload") ? "upload" : "browse");
  });
})();

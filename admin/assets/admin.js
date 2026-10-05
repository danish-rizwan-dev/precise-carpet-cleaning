(function () {
  var rid = 0;

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
})();

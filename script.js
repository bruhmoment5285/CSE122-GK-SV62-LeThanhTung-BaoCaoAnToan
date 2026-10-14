const toast = document.getElementById("toast");
let toastTimer;

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle("error", isError);
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.page !== "Báo cáo an toàn") {
      return;
    }
    showToast("Bạn đang ở trang Báo cáo an toàn.");
  });
});

document.getElementById("notifications").addEventListener("click", () => {
  showToast("Bạn không có thông báo mới.");
});

document.getElementById("newReport").addEventListener("click", () => {
  document.getElementById("reportName").value = "";
  document.getElementById("managerNote").value = "";
  document.getElementById("previewTitle").textContent = "Tạo báo cáo mới";
  document.getElementById("reportName").focus();
  showToast("Đã mở biểu mẫu báo cáo mới.");
});

// Tìm báo cáo theo mã, kỳ hoặc trạng thái.
const searchInput = document.getElementById("searchInput");
const rows = [...document.querySelectorAll("#reportsTable tbody tr")];
const emptyState = document.getElementById("emptyState");

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;
  rows.forEach((row) => {
    const searchableText = (row.innerText + " " + row.dataset.search).toLowerCase();
    const matched = searchableText.includes(keyword);
    row.hidden = !matched;
    if (matched) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
});

document.getElementById("periodFilter").addEventListener("change", (event) => {
  showToast("Đã chọn kỳ lọc: " + event.target.options[event.target.selectedIndex].text);
});
document.getElementById("siteFilter").addEventListener("change", (event) => {
  showToast("Đã đổi bộ lọc công trường.");
});

// Nút xem/sửa lấy tên báo cáo từ dòng được chọn.
document.querySelectorAll(".view-report").forEach((button) => {
  button.addEventListener("click", () => {
    const row = button.closest("tr");
    const reportCode = row.cells[0].innerText.split("·")[0].trim();
    document.getElementById("previewTitle").textContent = "Xem trước · " + reportCode;
    showToast("Đã mở báo cáo " + reportCode + ".");
  });
});

// Lưu bản nháp: kiểm tra tiêu đề trước khi báo thành công.
document.getElementById("reportForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("reportName").value.trim();
  if (!title) {
    showToast("Thất bại: vui lòng nhập tiêu đề báo cáo.", true);
    document.getElementById("reportName").focus();
    return;
  }
  showToast("Lưu bản nháp thành công!");
});

document.getElementById("publishBtn").addEventListener("click", () => {
  const title = document.getElementById("reportName").value.trim();
  if (!title) {
    showToast("Không thể phát hành: hãy nhập tiêu đề báo cáo.", true);
    return;
  }
  const confirmed = confirm("Bạn có chắc muốn phát hành báo cáo này?");
  if (confirmed) {
    showToast("Phát hành báo cáo thành công!");
  } else {
    showToast("Đã hủy phát hành báo cáo.");
  }
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const title = document.getElementById("reportName").value.trim();
  if (!title) {
    showToast("Không thể xuất: tiêu đề báo cáo đang trống.", true);
    return;
  }
  showToast("Đã chuẩn bị yêu cầu xuất PDF / CSV.");
});

document.getElementById("archiveBtn").addEventListener("click", () => {
  if (confirm("Bạn có chắc muốn lưu trữ báo cáo này?")) {
    showToast("Lưu trữ báo cáo thành công!");
  } else {
    showToast("Đã hủy thao tác lưu trữ.");
  }
});

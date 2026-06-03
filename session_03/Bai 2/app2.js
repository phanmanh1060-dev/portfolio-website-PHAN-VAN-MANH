// ==========================================
// 1. LẤY CÁC PHẦN TỬ DOM CƠ BẢN & PHỤ TRỢ
// ==========================================
const vungDanhSachCv = document.getElementById('vung-danh-sach-cv');
const lblTong = document.getElementById('tong-cv');
const lblXong = document.getElementById('cv-xong');
const lblChuaXong = document.getElementById('cv-chua-xong');

const btnThemCv = document.getElementById('nut-them-cv');
const btnHuyTask = document.getElementById('nut-huy-task');
const popupTask = document.getElementById('popup-task');
const formTask = document.getElementById('form-task');
const lblAlertBox = document.getElementById('alert-box');

const txtTaskIndex = document.getElementById('task-index');
const txtTieuDe = document.getElementById('inp-tieude');
const txtMoTa = document.getElementById('inp-mota');
const txtHan = document.getElementById('inp-han');
const txtUuTien = document.getElementById('inp-uutiendoc');

// ==========================================
// 2. KHỞI TẠO DỮ LIỆU TỪ LOCALSTORAGE
// ==========================================
let danhSachTask = JSON.parse(localStorage.getItem('data_congviec')) || [];

// Hàm lưu dữ liệu xuống bộ nhớ máy
function saveTasks() {
    localStorage.setItem('data_congviec', JSON.stringify(danhSachTask));
}

// Cập nhật hàm thống kê chạy thực tế
function updateTaskSummary() {
    let tong = danhSachTask.length;
    let xong = 0;
    for(let i = 0; i < danhSachTask.length; i++) {
        if(danhSachTask[i].trangThai === true) {
            xong++;
        }
    }
    lblTong.innerText = tong;
    lblXong.innerText = xong;
    lblChuaXong.innerText = tong - xong;
}

// ==========================================
// 3. HÀM RENDER ĐÃ SỬA HẾT LỖI CÚ PHÁP
// ==========================================
function renderTasks() {
    vungDanhSachCv.innerHTML = ""; // Xóa sạch giao diện cũ

    // Nếu mảng chưa có dữ liệu, hiển thị trạng thái rỗng
    if (danhSachTask.length === 0) {
        vungDanhSachCv.innerHTML = `<p style="color:gray; text-align:center;">Danh sách công việc trống.</p>`;
        return;
    }

    // Duyệt mảng để tạo các thẻ div card công việc
    danhSachTask.forEach(function(task, index) {
        const card = document.createElement('div');
        card.className = "card-cong-viec";

        let classGachNgang = task.trangThai ? "da-hoan-thanh" : "";
        let trangThaiChecked = task.trangThai ? "checked" : "";

        card.innerHTML = `
            <h4 class="${classGachNgang}">
                <input type="checkbox" ${trangThaiChecked} onchange="doiTrangThai(${index})">
                ${task.tieuDe} [Mức: ${task.uuTien}]
            </h4>
            <p>Mô tả: ${task.moTa}</p>
            <p>Hạn chót: <strong>${task.hanChot}</strong></p>
            <button onclick="suaTask(${index})">Sửa</button>
            <button onclick="xoaTask(${index})">Xóa</button>
        `;
        vungDanhSachCv.appendChild(card);
    });
}

// KHỞI CHẠY LẦN ĐẦU KHI MỞ TRANG
renderTasks();
updateTaskSummary();

// ==========================================
// 4. CÁC HÀM XỬ LÝ SỰ KIỆN (EVENT LISTENERS)
// ==========================================

// Bấm nút thêm để mở popup
btnThemCv.addEventListener('click', function() {
    formTask.reset();
    txtTaskIndex.value = ""; // Để trống = Chế độ THÊM MỚI
    document.getElementById('form-title').innerText = "Tạo công việc mới";
    popupTask.classList.remove('hidden');
});

// Bấm nút đóng để ẩn popup
btnHuyTask.addEventListener('click', function() {
    popupTask.classList.add('hidden');
});

// Bắt sự kiện submit form để xử lý cả Thêm và Sửa
formTask.addEventListener('submit', function(e) {
    e.preventDefault();

    if (txtTaskIndex.value === "") {
        // [LUỒNG B] XỬ LÝ THÊM MỚI
        const taskMoi = {
            tieuDe: txtTieuDe.value.trim(),
            moTa: txtMoTa.value.trim(),
            hanChot: txtHan.value,
            uuTien: txtUuTien.value,
            trangThai: false // Mặc định tạo mới là chưa hoàn thành
        };
        danhSachTask.push(taskMoi);
        lblAlertBox.innerText = "Thêm công việc thành công!";
    } else {
        // [LUỒNG C] XỬ LÝ CẬP NHẬT (SỬA)
        const viTriSua = txtTaskIndex.value;
        const taskCapNhat = {
            tieuDe: txtTieuDe.value.trim(),
            moTa: txtMoTa.value.trim(),
            hanChot: txtHan.value,
            uuTien: txtUuTien.value,
            trangThai: danhSachTask[viTriSua].trangThai // Giữ nguyên trạng thái cũ
        };
        danhSachTask[viTriSua] = taskCapNhat;
        lblAlertBox.innerText = "Cập nhật công việc thành công!";
    }

    // Đồng bộ lại tất cả và đóng form
    saveTasks();
    renderTasks();
    updateTaskSummary();

    setTimeout(function() { lblAlertBox.innerText = ""; }, 2000);
    popupTask.classList.add('hidden');
});

// Bấm nút sửa của một công việc bất kỳ (Gắn vào window để gọi từ onclick HTML)
window.suaTask = function(index) {
    const taskCu = danhSachTask[index];

    // Đưa dữ liệu cũ lên form
    txtTaskIndex.value = index; 
    txtTieuDe.value = taskCu.tieuDe;
    txtMoTa.value = taskCu.moTa;
    txtHan.value = taskCu.hanChot;
    txtUuTien.value = taskCu.uuTien;

    // Đổi tiêu đề form sang trạng thái cập nhật
    document.getElementById('form-title').innerText = "Chỉnh sửa công việc";
    popupTask.classList.remove('hidden'); 
}

// Bấm nút xóa công việc
window.xoaTask = function(index) {
    const xacNhan = confirm("Bạn có thực sự muốn xóa bỏ công việc này không?");
    
    if (xacNhan === true) {
        danhSachTask.splice(index, 1); // Xóa đúng 1 phần tử tại vị trí index

        saveTasks();
        renderTasks();
        updateTaskSummary();

        lblAlertBox.innerText = "Đã xóa công việc!";
        setTimeout(function() { lblAlertBox.innerText = ""; }, 2000);
    }
}

// Bấm checkbox để đổi trạng thái hoàn thành
window.doiTrangThai = function(index) {
    // Đảo ngược trạng thái hiện tại (true thành false, false thành true)
    danhSachTask[index].trangThai = !danhSachTask[index].trangThai;

    saveTasks();
    renderTasks();
    updateTaskSummary();
}
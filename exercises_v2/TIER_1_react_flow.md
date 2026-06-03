# Cấp 1 — Hiểu hoạt động của React
## Bài 1.1 — Component render lần đầu (8 phút)
**Thử nghiệm**
1. Mở bảng điều khiển (F12)
<img width="1879" height="882" alt="Screenshot 2026-06-01 141111" src="https://github.com/user-attachments/assets/5941779d-39b4-4d4e-a27a-5cbcace82ee3" />
2. Làm mới trang
<img width="1860" height="897" alt="Screenshot 2026-06-01 141220" src="https://github.com/user-attachments/assets/696e5387-c7c8-4d6a-a5d0-1e03c2a88551" />
3. Khi nhìn vào tab Console, sẽ thấy dòng chữ ```1️⃣ Component được gọi!``` xuất hiện **2 LẦN** liên tiếp chứ không phải **1 lần!** Tại sao lại xuất hiện 2 lần? Có phải code bị lỗi không?

- Không hề lỗi! Đó là do trong file src/main.jsx của bạn đang bật chế độ <StrictMode> (Chế độ nghiêm ngặt của React). Chế độ này cố tình kích hoạt hàm của bạn 2 lần ở môi trường phát triển (Development) để giúp bạn kiểm tra xem code có bị rò rỉ dữ liệu hay không. Khi bạn đóng gói dự án để chạy thật, nó sẽ chỉ chạy đúng 1 lần duy nhất.

**Câu hỏi**
1. Tại sao thành phần chỉ render 1 lần?
- Bởi vì toàn bộ giao diện bên trong hàm LifecycleDemo đều là dữ liệu tĩnh (chữ viết chết, không thay đổi). Sau khi React thực hiện xong bước Mount (lắp ghép đống HTML này vào trình duyệt lần đầu tiên), nó thấy không có bất kỳ yếu tố hay dữ liệu nào thay đổi, nên nó sẽ "đứng im" để tiết kiệm hiệu năng cho máy tính.
2. Khi nào nó sẽ hiển thị lại?
- React chỉ chấp nhận mất công vẽ lại giao diện (Re-render) khi và chỉ khi rơi vào các trường hợp sau:
  + Trạng thái bên trong nó thay đổi (State thay đổi): Đây là lúc ta dùng đến useState (sẽ học ở Tier 4). Ví dụ: Khi bạn bấm nút tăng số lượng hàng trong giỏ, số thay đổi ➡️ giao diện phải vẽ lại số mới.
  + Dữ liệu từ bên ngoài truyền vào thay đổi (Props thay đổi): (Sẽ học ở các Tier sau).
  + Component cha của nó bị Re-render: Khi component cha (ở đây là App) bị ép phải vẽ lại giao diện, thì tất cả các con nằm bên trong nó (như LifecycleDemo) cũng sẽ bị gọi lại theo dây chuyền.

## Bài 1.2 — Biến "bình thường" vs useState (12 phút)
**Thử nghiệm**
1. Chạy BadCounter→ nút được nhấn → thấy gì?
<img width="1860" height="897" alt="Screenshot 2026-06-01 141220" src="https://github.com/user-attachments/assets/a7792430-853d-4c43-b991-71d8b68a13c8" />

- **Hiện tượng trên màn hình:** Số 0 đứng im bất động, bấm mỏi tay không đổi.
- **Hiện tượng trong Console (F12):** Log vẫn chạy đều đặn: 1, 2, 3, 4, 5...
- **Bản chất:** Biến count thực chất có tăng, nhưng nó chỉ tăng thầm lặng trong bộ nhớ máy tính. React không hề hay biết biến này bị thay đổi, nên nó không kích hoạt lệnh vẽ lại giao diện (Re-render). Trình duyệt vẫn giữ nguyên HTML cũ của lần render đầu tiên.

2. Chạy GoodCounter→ nút được nhấn → thấy gì?
<img width="1860" height="897" alt="Screenshot 2026-06-01 141220" src="https://github.com/user-attachments/assets/5bb3ddea-c4c9-49f7-b8de-4f4f8f9905e7" />


- **Hiện tượng trên màn hình:** Bấm một phát số nhảy lên 1, bấm phát nữa lên 2 cực mượt.
- **Hiện tượng trong Console (F12):** Cứ mỗi lần bạn bấm nút, dòng chữ ```🔄 [HÀM GOODCOUNTER ĐANG ĐƯỢC GỌI LẠI...]``` lại xuất hiện thêm một lần!
- **Bản chất:** Khi bạn gọi hàm quyền lực ```setCount()```, React sẽ lập tức thực hiện 2 việc:
  + Ghi đè giá trị mới vào biến count.
  + Ép component GoodCounter phải chạy lại từ đầu (Re-render) để nạp giá trị mới vào thẻ ```<p>```

3. Mở Console → tìm thấy nhật ký "render"几次?
- Không tìm thấy nhật ký 'render' nào cả (0 lần)!
- Bởi vì trong đoạn code mẫu GoodCounter ban đầu, người biên soạn bài tập chưa hề viết dòng lệnh ```console.log()``` nào ở trong thân hàm để thông báo mỗi khi component re-render. Lệnh ```console.log("Count:", count);``` duy nhất lại nằm bó hẹp bên trong hàm handleClick của bản BadCounter mất rồi!

## Bài 1.3 — Luồng hoạt động (Flow) (5 phút)
- Câu hỏi 1: Tình huống bấm liên tục
Nếu bạn đang ở Bước 4 (Màn hình hiện 🎉 Bước 4: Hoàn thành!), bạn cố tình bấm nút Bước tiếp theo → thêm một lần nữa.
Biến step sẽ tăng lên bằng mấy?
Giao diện ở hộp màu xám lúc này sẽ hiển thị dòng chữ gì?
Hàm FlowDemo có bị re-render không (nhìn dòng log 🔄 Component render! có tăng thêm không)?
- Câu hỏi 2: Tình huống "Click Đơ" (Rất quan trọng)
Nếu bạn đang ở Bước 1 (vừa tải lại trang), bạn bấm nút Quay lại đầu (nút này chạy lệnh ```setStep(1)```).
Hãy nhìn vào Console F12 xem dòng chữ 🔄 Component render! có bị chạy lại không?
Tại sao? 

**Đáp án**
- Đáp án câu 1: Biến step tăng lên thành 5. Hộp màu xám sẽ trống trơn (không hiện gì cả) vì không có điều kiện nào cho step === 5. Hàm vẫn re-render đều đặn vì giá trị thay đổi từ 4 lên 5.
- Đáp án câu 2: Dòng ```🔄 Component render!``` KHÔNG hề chạy lại! React cực kỳ thông minh, trước khi ra lệnh re-render, nó sẽ so sánh giá trị mới và giá trị cũ. Nếu bạn đặt setStep(1) khi đang ở bước 1 (Dữ liệu không hề thay đổi), React sẽ triệt tiêu lệnh re-render để tiết kiệm hiệu năng cho máy tính. Người ta gọi cơ chế này là Bailout (Hủy bỏ render thừa).

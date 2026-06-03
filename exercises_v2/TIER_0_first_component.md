# Cấp 0 — Thành phần đầu tiên (Làm quen với cú pháp React)
## Bài 0.1 — Chạy React đầu tiên (5 phút)
1. Tệp .jsx khác tệp nào .js?
- Tệp .js: Chỉ hiểu cú pháp JavaScript thuần túy. Nếu bạn viết code HTML (như ```<h1>...</h1>```) vào giữa file .js, trình biên dịch sẽ báo lỗi cú pháp ngay lập tức.
- Tệp .jsx: Là tệp JavaScript mở rộng. Bản chất nó cho phép bạn trộn lẫn HTML vào trong JavaScript một cách hợp lệ. Trình đóng gói (Vite) sẽ tự động biến các thẻ HTML đó thành code JS thực sự ở "hậu trường".

2. Tại sao phải export default App?
- Trong một dự án React, chúng ta chia giao diện thành hàng trăm file nhỏ (Components) cho dễ quản lý.
- Lệnh export default App giống như việc bạn thông báo: "File này có hàm App là sản phẩm chính, ai muốn dùng thì cứ vào đây mà lấy". Nhờ dòng này, file src/main.jsx mới có thể gọi lệnh import App from './App' để đưa giao diện của bạn lên màn hình trình duyệt.

3. Thử xóa export default→ chuyện gì xảy ra?
- **Hiện tượng:** Dự án sẽ sập ngay lập tức (Bị lỗi màn hình trắng hoặc Terminal báo lỗi: "The requested module '/src/App.jsx' does not provide an export named 'default'").
- **Lý do:** File main.jsx (cổng vào chính của ứng dụng) đi tìm hàm App để render nhưng tìm không thấy vì bạn đã "giấu" nó đi (không export).

## Bài 0.2 — JSX là HTML "xịn hơn" (10 phút)
**3 quy tắc vàng chuyển đổi từ HTML sang JSX:**
1. ```class``` chuyển thành ```className``` (vì từ khóa class đã bị trùng với Class trong JavaScript).
2. ```for``` chuyển thành ```htmlFor``` (vì từ khóa for đã bị trùng với vòng lặp for trong JavaScript).
3. Bắt buộc phải đóng thẻ đối với các thẻ đơn không có thẻ đóng (như ```<img>``` thành ```<img />```, ```<input>``` thành ```<input />```, ```<br>``` thành ```<br />```).
### Bài tập: Viết lại HTML thành JSX
**Bài 1:** Viết thành phầnUserProfile
```
function UserProfile() {
    return (
        <div className="profile"> {/* 1. Sửa class -> className */}
            <h1>Hồ sơ cá nhân</h1>
            
            {/* 2. Bắt buộc thêm dấu gạch chéo / để đóng thẻ img */}
            <img src="photo.jpg" alt="Ảnh đại diện" /> 
            
            <table>
                <tbody> {/* Mẹo nhỏ: Trong React nên có thẻ tbody bọc các tr trong table */}
                    <tr>
                        <td>Họ tên:</td>
                        <td>Nguyễn Thị Như Ý</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>nhuynguyen301126@gmail.com</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );<img width="1863" height="951" alt="Screenshot 2026-06-01 140134" src="https://github.com/user-attachments/assets/91f9c3b7-ff02-4ba9-8972-266c308bc6fd" />

}
export default UserProfile;
```
**Chạy**
<img width="1863" height="951" alt="Screenshot 2026-06-01 140134" src="https://github.com/user-attachments/assets/51cf7d1a-2460-4b5e-ad5a-0bceb3a8f465" />

**Bài 2:** Viết thành phầnProductInfo
```
function ProductInfo() {
    return (
        <div className="product"> {/* 1. Sửa class -> className */}
            <h2>iPhone 15</h2>
            <p className="price">25.000.000đ</p> {/* 2. Sửa class -> className */}
            
            <ul>
                <li>Màn hình: 6.1 inch</li>
                <li>Camera: 48MP</li>
                <li>Pin: 3349 mAh</li>
            </ul>
            
            <button>Mua ngay</button>
        </div>
    );
}

export default ProductInfo;
```
**Chạy**
<img width="1913" height="1005" alt="Screenshot 2026-06-01 140034" src="https://github.com/user-attachments/assets/4eed9adf-bad0-4864-8f9f-00427a7708c1" />


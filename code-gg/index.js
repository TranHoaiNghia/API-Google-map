// Initialize and add the map
let map;
let currentInfoWindow = null;  // Biến toàn cục để lưu infoWindow hiện tại

async function initMap() {
  // The location of Uluru
  const centerPosition = { lat: 10.9572459, lng: 106.844582 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 15,
    center: centerPosition,
    mapId: "4504f8b37365c3d0",
  });

// Hàm kiểm tra độ tương phản giữa hai màu và trả về màu đậm (đen) hoặc sáng (trắng)
function getContrastingColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000; // Độ sáng theo chuẩn YIQ
  return brightness > 150 ? "#000000" : "#FFFFFF"; // Đen nếu sáng, trắng nếu tối
}

const locations = [
  { lat: 10.951901949734763, lng: 106.822795904921, icon: "fa-car", title: 'CÔNG VIÊN BIÊN HÙNG', address: 'Công viên BIÊN HÙNG, Biên Hòa, Đường 30/4', glyphColor: getContrastingColor("#FFCCCC"), backgroundColor: "#FFCCCC", borderColor: "#FF6666" },
  { lat: 10.946278948617428, lng: 106.81889694326861, icon: "fa-hippo", title: 'NHÀ THỜ BIÊN HÒA', address: 'Nhà thờ Biên Hòa, Đường Phạm Văn Thuận', glyphColor: getContrastingColor("#CCFFCC"), backgroundColor: "#CCFFCC", borderColor: "#66FF66" },
  { lat: 10.946294034896788, lng: 106.81439250909067, icon: "fa-truck-fast", title: 'CHỢ BIÊN HÒA', address: 'Chợ Biên Hòa, Đường Nguyễn Văn Trị', glyphColor: getContrastingColor("#CCCCFF"), backgroundColor: "#CCCCFF", borderColor: "#6666FF" },
  { lat: 10.957913982918043, lng: 106.86333609428446, icon: "fa-gift", title: 'TRƯỜNG THPT CHUYÊN LƯƠNG THẾ VINH', address: 'Trường THPT Chuyên Lương Thế Vinh, Đường Nguyễn Du', glyphColor: getContrastingColor("#FFE5CC"), backgroundColor: "#FFE5CC", borderColor: "#FFB266" },
  { lat: 10.961558923991536, lng: 106.79343134792606, icon: "fa-headphones", title: 'KHU DU LỊCH BỬU LONG', address: 'Khu Du Lịch Bửu Long, Khu phố 4, Phường Bửu Long', glyphColor: getContrastingColor("#E5CCFF"), backgroundColor: "#E5CCFF", borderColor: "#B266FF" },
  { lat: 10.957654822758942, lng: 106.84332668712804, icon: "fa-bicycle", title: 'VINCOM PLAZA BIÊN HÒA', address: 'Vincom Plaza, Đường Võ Thị Sáu', glyphColor: getContrastingColor("#CCFFCC"), backgroundColor: "#CCFFCC", borderColor: "#66FF66" },
  { lat: 10.959016487565998, lng: 106.82867543015341, icon: "fa-tree", title: 'QUẢNG TRƯỜNG TỈNH ĐỒNG NAI', address: 'Quảng Trường Biên Hòa, Đường Nguyễn Ái Quốc', glyphColor: getContrastingColor("#FFCCE5"), backgroundColor: "#FFCCE5", borderColor: "#FF99CC" },
  { lat: 10.958680020503676, lng: 106.86266756621544, icon: "fa-handshake", title: 'ĐẠI HỌC ĐỒNG NAI', address: 'Đại học Đồng Nai, Đường Nguyễn Ái Quốc', glyphColor: getContrastingColor("#CCCCFF"), backgroundColor: "#CCCCFF", borderColor: "#6666FF" },
  { lat: 10.952696694896726, lng: 106.86795949234015, icon: "fa-earth-americas", title: 'BỆNH VIỆN ĐA KHOA ĐỒNG NAI', address: 'Bệnh viện Đồng Nai, Đường Phạm Văn Thuận', glyphColor: getContrastingColor("#FFCCCC"), backgroundColor: "#FFCCCC", borderColor: "#FF6666" },
  { lat: 10.905825258213738, lng: 106.85099169505033, icon: "fa-fish", title: 'SIÊU THỊ BIG C ĐỒNG NAI', address: 'Siêu Thị Big C, Đường Phạm Văn Thuận', glyphColor: getContrastingColor("#CCE5FF"), backgroundColor: "#CCE5FF", borderColor: "#99CCFF" },
  { lat: 10.966998768286473, lng: 106.85547035972988, icon: "fa-landmark", title: 'GO TÂN HIỆP', address: 'Go Tân Hiệp, Đường Phạm Văn Thuận', glyphColor: getContrastingColor("#CCFFCC"), backgroundColor: "#CCFFCC", borderColor: "#66FF66" },
  { lat: 10.959374255296915, lng: 106.835366062288955, icon: "fa-hand-holding-heart", title: 'CGV BIÊN HÒA', address: 'Rạp Chiếu Phim CGV, Đường Võ Thị Sáu', glyphColor: getContrastingColor("#FFF5CC"), backgroundColor: "#FFF5CC", borderColor: "#FFEB99" },
  { lat: 10.949852392470289, lng: 106.8076742540497, icon: "fa-database", title: 'CÔNG VIÊN NGUYỄN VĂN TRỊ', address: 'Công viên Nguyễn Văn Trị, Đường 30/4', glyphColor: getContrastingColor("#FFE5CC"), backgroundColor: "#FFE5CC", borderColor: "#FFCC99" },
  { lat: 10.9552894939834, lng: 106.86379261882605, icon: "fa-bug", title: 'ĐÀI PHÁT THANH TRUYỀN HÌNH ĐỒNG NAI', address: 'Đài Phát Thanh Truyền Hình Đồng Nai, Đường Nguyễn Ái Quốc', glyphColor: getContrastingColor("#FFE5CC"), backgroundColor: "#FFE5CC", borderColor: "#FFB266" },
  { lat: 10.953921640955635, lng: 106.8484397008039, icon: "fa-palette", title: 'NHÀ THỜ GIÁO XỨ TÂN MAI', address: 'Nhà Thờ Giáo Xứ Tân Mai, Đường Nguyễn Ái Quốc', glyphColor: getContrastingColor("#E5CCFF"), backgroundColor: "#E5CCFF", borderColor: "#B266FF" },
  { lat: 10.947131558493773, lng: 106.82514965649538, icon: "fa-cart-plus", title: 'BETA CINEMAS BIÊN HOÀ', address: 'Beta Cinemas Biên Hòa, Đ. Võ Thị Sáu', glyphColor: getContrastingColor("#FFE5CC"), backgroundColor: "#FFE5CC", borderColor: "#FFB266" },
  { lat: 10.963397591277472, lng: 106.84317366538123, icon: "fa-rocket", title: 'CÔNG VIÊN DƯƠNG TỬ GIANG', address: 'Công Viên Dương Tử Giang, XR7V+965, Tân Tiến', glyphColor: getContrastingColor("#CCFFFF"), backgroundColor: "#CCFFFF", borderColor: "#66CCCC" },
  { lat: 10.978570758820105, lng: 106.84828822376925, icon: "fa-brain", title: 'CÂY XĂNG 26', address: 'Cây Xăng 26, 50 Đ. Đồng Khởi, Trảng Dài', glyphColor: getContrastingColor("#FFCCCC"), backgroundColor: "#FFCCCC", borderColor: "#FF6666" },
  { lat: 10.938428012209371, lng: 106.869172525942, icon: "fa-desktop", title: 'CÔNG VIÊN TAM HIỆP', address: 'Công Viên Tam Hiệp, 35 Đ. Bùi Văn Hòa, Long Bình', glyphColor: getContrastingColor("#E5E5E5"), backgroundColor: "#E5E5E5", borderColor: "#CCCCCC" },
  { lat: 10.957201851101503, lng: 106.81398542245282, icon: "fa-crown", title: 'MM MEGA MARKET BIÊN HOÀ', address: 'MM Mega Market Biên Hòa, 1806 Nguyễn Ái Quốc', glyphColor: getContrastingColor("#FFF5CC"), backgroundColor: "#FFF5CC", borderColor: "#FFEB99" }
];

  locations.forEach(location => {

    // Change the glyph color.
    const pinGlyph = new PinElement({
      glyphColor: "white",
    });

    const icon = document.createElement("div");

    icon.innerHTML = `<i class="fa-solid ${location.icon}"></i>`;

    const faPin = new PinElement({
      glyph: icon,
      glyphColor: `${location.glyphColor}`,
      background: `${location.backgroundColor}`,
      borderColor: `${location.borderColor}`,
      scale: 1.3
    });

    const marker = new AdvancedMarkerElement({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title,
      content: faPin.element
    });

    // Tùy chọn: Thêm cửa sổ thông tin cho mỗi marker
    const infoWindow = new google.maps.InfoWindow({
      content: `<div class="container">
      <h3 style="color: #d70018; font-size: 12px">${location.title}</h3>
      <p style="color: #00081C; font-size: 12px">${location.address}</p>
      <a href="./code-gg/page_sdt.html" style="color: rgb(13, 110, 253); text-decoration: none; font-size: 11px; position: relative; top: -1px" target="_blank">
          <i class="fa-solid fa-phone-volume"></i>
          0707.715.503
      </a>

      <span> - </span>

      <a href="https://zalo.me/0707715503" style="text-decoration: none" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="11" viewBox="0 0 31 11" fill="none">
                <path
                    d="M15.8625 3.2266V2.6416H17.5462V10.8602H16.5838C16.3932 10.8605 16.2103 10.7823 16.0751 10.6427C15.94 10.5031 15.8635 10.3134 15.8625 10.1153V10.1166C15.1597 10.6517 14.311 10.9395 13.44 10.9382C12.3517 10.9382 11.308 10.4888 10.5382 9.6887C9.76844 8.88863 9.33566 7.80341 9.335 6.6716C9.33566 5.53979 9.76844 4.45457 10.5382 3.6545C11.308 2.85443 12.3517 2.405 13.44 2.405C14.3106 2.40398 15.1588 2.69179 15.8613 3.2266H15.8625V3.2266ZM8.89875 0V0.2665C8.89875 0.7631 8.835 1.1687 8.52375 1.6445L8.48625 1.6887C8.38255 1.80964 8.28169 1.93318 8.18375 2.0592L2.78 9.113H8.89875V10.1114C8.89875 10.2098 8.88009 10.3073 8.84382 10.3983C8.80756 10.4892 8.75442 10.5718 8.68742 10.6413C8.62043 10.7109 8.54091 10.766 8.45342 10.8036C8.36592 10.8411 8.27216 10.8604 8.1775 10.8602H0.25V10.3896C0.25 9.8137 0.3875 9.5563 0.5625 9.2885L6.32125 1.872H0.49V0H8.9H8.89875ZM19.5875 10.8602C19.4284 10.8602 19.2758 10.7945 19.1632 10.6774C19.0507 10.5604 18.9875 10.4017 18.9875 10.2362V0H20.7887V10.8602H19.5875V10.8602ZM26.1163 2.353C26.6589 2.35283 27.1963 2.46383 27.6978 2.67965C28.1992 2.89548 28.6549 3.21191 29.0387 3.61088C29.4226 4.00984 29.7271 4.48353 29.935 5.0049C30.1428 5.52627 30.2498 6.0851 30.25 6.6495C30.2502 7.21389 30.1434 7.7728 29.9359 8.2943C29.7284 8.81579 29.4241 9.28967 29.0405 9.68888C28.6569 10.0881 28.2014 10.4048 27.7001 10.621C27.1988 10.8371 26.6614 10.9484 26.1187 10.9486C25.0227 10.9489 23.9715 10.4965 23.1963 9.69072C22.421 8.88497 21.9853 7.79195 21.985 6.6521C21.9847 5.51225 22.4197 4.41895 23.1945 3.61271C23.9693 2.80648 25.0202 2.35335 26.1163 2.353V2.353ZM13.4413 9.1819C13.7629 9.18951 14.0828 9.13019 14.3822 9.00743C14.6815 8.88466 14.9542 8.70092 15.1843 8.46701C15.4144 8.23309 15.5972 7.95371 15.7221 7.64528C15.8469 7.33685 15.9112 7.00559 15.9112 6.67095C15.9112 6.33631 15.8469 6.00505 15.7221 5.69662C15.5972 5.38819 15.4144 5.10881 15.1843 4.87489C14.9542 4.64098 14.6815 4.45724 14.3822 4.33447C14.0828 4.21171 13.7629 4.15239 13.4413 4.16C12.8104 4.17493 12.2103 4.44603 11.7692 4.9153C11.3281 5.38456 11.0812 6.01473 11.0812 6.67095C11.0812 7.32717 11.3281 7.95733 11.7692 8.4266C12.2103 8.89587 12.8104 9.16697 13.4413 9.1819V9.1819ZM26.1163 9.178C26.7611 9.178 27.3795 8.9116 27.8354 8.43742C28.2914 7.96323 28.5475 7.3201 28.5475 6.6495C28.5475 5.9789 28.2914 5.33577 27.8354 4.86158C27.3795 4.38739 26.7611 4.121 26.1163 4.121C25.4714 4.121 24.853 4.38739 24.3971 4.86158C23.9411 5.33577 23.685 5.9789 23.685 6.6495C23.685 7.3201 23.9411 7.96323 24.3971 8.43742C24.853 8.9116 25.4714 9.178 26.1163 9.178V9.178Z"
                    fill="#2288FF"></path>
            </svg>
        </a>

      <span> - </span>

      <a href="https://maps.google.com/?q=${location.title}"
          style="color: rgb(13, 110, 253); text-decoration: none; font-size: 11px; position: relative; top: -1px" target="_blank">
          <i class="fa-solid fa-location-dot"></i>
          Xem đường đi
      </a>
  </div>`
    });

    // Mở cửa sổ thông tin khi click vào marker
    marker.addListener('click', function () {
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }

      infoWindow.open(map, marker);

      // Lưu infoWindow hiện tại vào biến để đóng khi cần
      currentInfoWindow = infoWindow;

      map.setZoom(16);  // Đặt mức zoom, bạn có thể điều chỉnh mức này
      map.panTo(marker.position);  // Đặt trung tâm bản đồ là vị trí của marker
    });
  });
}

initMap();
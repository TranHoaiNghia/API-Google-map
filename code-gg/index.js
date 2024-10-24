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

  const locations = [
    { lat: 10.951901949734763, lng: 106.822795904921, avatar: "https://media.istockphoto.com/id/887353892/vi/vec-to/ng%C6%B0%E1%BB%9Di-%C4%91%C3%A0n-%C3%B4ng-m%E1%BA%B7t-c%C6%B0%E1%BB%9Di-phim-ho%E1%BA%A1t-h%C3%ACnh.jpg?s=1024x1024&w=is&k=20&c=S0msZoJF4vRq-N0gdoO3wPiBlWcR7bpN0EtIZXp0d9U=", title: 'CÔNG VIÊN BIÊN HÙNG', address: 'Công viên BIÊN HÙNG, Biên Hòa, Đường 30/4' },
    { lat: 10.946278948617428, lng: 106.81889694326861, avatar: "https://png.pngtree.com/element_our/20190603/ourlarge/pngtree-happy-smiley-man-illustration-image_1432872.jpg", title: 'NHÀ THỜ BIÊN HÒA', address: 'Nhà thờ Biên Hòa, Đường Phạm Văn Thuận' },
    { lat: 10.946294034896788, lng: 106.81439250909067, avatar: "https://png.pngtree.com/png-vector/20190115/ourlarge/pngtree-cartoon-avatar-smiley-face-lovely-png-image_338649.jpg", title: 'CHỢ BIÊN HÒA', address: 'Chợ Biên Hòa, Đường Nguyễn Văn Trị' },
    { lat: 10.957913982918043, lng: 106.86333609428446, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnhopVCxYjJ1rfYjSJpRFkSd78ei1PQcx2dg&s", title: 'TRƯỜNG THPT CHUYÊN LƯƠNG THẾ VINH', address: 'Trường THPT Chuyên Lương Thế Vinh, Đường Nguyễn Du' },
    { lat: 10.961558923991536, lng: 106.79343134792606, avatar: "https://img.lovepik.com/png/20231013/Cute-little-round-face-cartoon-waiter-red-hand-painted_185971_wh860.png", title: 'KHU DU LỊCH BỬU LONG', address: 'Khu Du Lịch Bửu Long, Khu phố 4, Phường Bửu Long' },
    { lat: 10.957654822758942, lng: 106.84332668712804, avatar: "https://img.lovepik.com/free-png/20211206/lovepik-cartoon-avatar-png-image_401349915_wh1200.png", title: 'VINCOM PLAZA BIÊN HÒA', address: 'Vincom Plaza, Đường Võ Thị Sáu' },
    { lat: 10.959016487565998, lng: 106.82867543015341, avatar: "https://png.pngtree.com/png-vector/20230522/ourlarge/pngtree-cartoon-girl-face-illustration-vector-png-image_7087983.png", title: 'QUẢNG TRƯỜNG TỈNH ĐỒNG NAI', address: 'Quảng Trường Biên Hòa, Đường Nguyễn Ái Quốc' },
    { lat: 10.958680020503676, lng: 106.86266756621544, avatar: "https://e1.pngegg.com/pngimages/114/506/png-clipart-visage-expression-faciale-joue-tete-arabe-dessin-anime-gens-ligne-sourire-doigt-content.png", title: 'ĐẠI HỌC ĐỒNG NAI', address: 'Đại học Đồng Nai, Đường Nguyễn Ái Quốc' },
    { lat: 10.952696694896726, lng: 106.86795949234015, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScmeefQLLVFKEZX_yyKSqXezHfgNbw1U07t23T7odmqPq_vXAkJgzx8YH02Tyt-oLdOQ4&usqp=CAU", title: 'BỆNH VIỆN ĐA KHOA ĐỒNG NAI', address: 'Bệnh viện Đồng Nai, Đường Phạm Văn Thuận' },
    { lat: 10.905825258213738, lng: 106.85099169505033, avatar: "https://img.lovepik.com/png/20231112/arab-clipart-small-cartoon-warrior-with-a-scarf-on-his_569107_wh860.png", title: 'SIÊU THỊ BIG C ĐỒNG NAI', address: 'Siêu Thị Big C, Đường Phạm Văn Thuận' },
    { lat: 10.966998768286473, lng: 106.85547035972988, avatar: "https://img.lovepik.com/png/20231112/arab-clipart-the-character-wears-a-robe-and-wearing-a_568931_wh860.png", title: 'GO TÂN HIỆP', address: 'Go Tân Hiệp, Đường Phạm Văn Thuận' },
    { lat: 10.959374255296915, lng: 106.835366062288955, avatar: "https://img.lovepik.com/png/20231117/cartoon-thief-wearing-a-mask-and-carrying-a-pizza-vector_614040_wh860.png", title: 'CGV BIÊN HÒA', address: 'Rạp Chiếu Phim CGV, Đường Võ Thị Sáu' },
    { lat: 10.949852392470289, lng: 106.8076742540497, avatar: "https://img.lovepik.com/png/20231117/cartoon-thief-wearing-a-mask-and-carrying-a-pizza-vector_614040_wh860.png", title: 'CÔNG VIÊN NGUYỄN VĂN TRỊ', address: 'Công viên Nguyễn Văn Trị, Đường 30/4' },
    { lat: 10.9552894939834, lng: 106.86379261882605, avatar: "https://img.lovepik.com/png/20231120/the-icon-of-the-arabic-man-with-his-beard-vector_649616_wh860.png", title: 'ĐÀI PHÁT THANH TRUYỀN HÌNH ĐỒNG NAI', address: 'Đài Phát Thanh Truyền Hình Đồng Nai, Đường Nguyễn Ái Quốc' },
    { lat: 10.953921640955635, lng: 106.8484397008039, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMjpO1GRMwecA3nTm5gxHMsFfMwdyMdElY-9h-4Zj-GM7znHpx602sTaPY38KVEnlMDEY&usqp=CAU", title: 'NHÀ THỜ GIÁO XỨ TÂN MAI', address: 'Nhà Thờ Giáo Xứ Tân Mai, Đường Nguyễn Ái Quốc' },
    { lat: 10.947131558493773, lng: 106.82514965649538, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMjpO1GRMwecA3nTm5gxHMsFfMwdyMdElY-9h-4Zj-GM7znHpx602sTaPY38KVEnlMDEY&usqp=CAU", title: 'BETA CINEMAS BIÊN HOÀ', address: 'Beta Cinemas Biên Hòa, Đ. Võ Thị Sáu' },
    { lat: 10.963397591277472, lng: 106.84317366538123, avatar: "https://png.pngtree.com/png-clipart/20230914/original/pngtree-ronald-reagan-vector-png-image_12157074.png", title: 'CÔNG VIÊN DƯƠNG TỬ GIANG', address: 'Công Viên Dương Tử Giang, XR7V+965, Tân Tiến' },
    { lat: 10.978570758820105, lng: 106.84828822376925, avatar: "https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440426_wh1200.png", title: 'CÂY XĂNG 26', address: 'Cây Xăng 26, 50 Đ. Đồng Khởi, Trảng Dài' },
    { lat: 10.938428012209371, lng: 106.869172525942, avatar: "https://media.istockphoto.com/id/844144810/vector/portrait-man-bearded-hair-style-mustache.jpg?s=612x612&w=is&k=20&c=I9wEARQCmDOlKK_5cEM_TzTDAFs72jDFsmU_QoCpUVo=", title: 'CÔNG VIÊN TAM HIỆP', address: 'Công Viên Tam Hiệp, 35 Đ. Bùi Văn Hòa, Long Bình' },
    { lat: 10.957201851101503, lng: 106.81398542245282, avatar: "https://media.istockphoto.com/id/878942344/vector/man-face-cartoon.jpg?s=612x612&w=is&k=20&c=1PE6pKB4gxiXKIKbuMiRyJ7IqeHVJpbGTd7LeE4ZHcs=", title: 'MM MEGA MARKET BIÊN HOÀ', address: 'MM Mega Market Biên Hòa, 1806 Nguyễn Ái Quốc' }
  ];


  locations.forEach(location => {

    // Change the glyph color.
    const pinGlyph = new PinElement({
      glyphColor: "white",
    });

    const beachFlagImg = document.createElement('img');
    beachFlagImg.src = `${location.avatar}`;
    beachFlagImg.style.width = '50px';  // Thiết lập chiều rộng
    beachFlagImg.style.height = '50px'; // Thiết lập chiều cao
    beachFlagImg.style.objectFit = 'cover'; // Đảm bảo hình ảnh không bị méo



    const marker = new AdvancedMarkerElement({
      position: { lat: location.lat, lng: location.lng },
      map: map,
      title: location.title,
      content: beachFlagImg
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
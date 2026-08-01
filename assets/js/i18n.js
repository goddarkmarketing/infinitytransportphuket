/**
 * Thai / English UI strings. Toggle via header; preference in localStorage.
 */
(function () {
  const STORAGE_KEY = "infinity:lang";

  const STRINGS = {
    "nav.lang_group": { th: "เลือกภาษา", en: "Choose language" },
    "nav.menu": { th: "เมนู", en: "Menu" },
    "nav.menu_aria": { th: "เปิดหรือปิดเมนูนำทาง", en: "Open or close the main menu" },
    "nav.home": { th: "หน้าแรก", en: "Home" },
    "nav.services": { th: "บริการ", en: "Services" },
    "nav.services_all": { th: "บริการทั้งหมด", en: "All services" },
    "nav.phuket_van": { th: "รถตู้ภูเก็ต", en: "Phuket Van" },
    "nav.services_submenu": { th: "เปิดเมนูย่อยบริการ", en: "Open services submenu" },
    "nav.fleet": { th: "รถทั้งหมด", en: "Fleet" },
    "nav.pricing": { th: "ราคา", en: "Pricing" },
    "nav.about": { th: "เกี่ยวกับเรา", en: "About" },
    "nav.reviews": { th: "รีวิว", en: "Reviews" },
    "nav.contact": { th: "ติดต่อ", en: "Contact" },
    "nav.articles": { th: "บทความ", en: "Articles" },
    "nav.cta": { th: "จองรถทันที", en: "Book now" },

    "meta.title.index": {
      th: "รถตู้ภูเก็ต พร้อมคนขับ รับส่งสนามบินและนำเที่ยว | Infinity Transport",
      en: "Phuket Van with Driver | Airport & Tour | Infinity Transport",
    },
    "meta.title.about": { th: "เกี่ยวกับเรา | Infinity Transport Phuket", en: "About us | Infinity Transport Phuket" },
    "meta.title.contact": {
      th: "จองรถตู้พร้อมคนขับภูเก็ต | ติดต่อ Infinity Transport Phuket",
      en: "Book van with driver Phuket | Contact Infinity Transport",
    },
    "meta.title.services": {
      th: "รถรับส่งภูเก็ต | รถตู้นำเที่ยวภูเก็ต | บริการรถตู้ภูเก็ต",
      en: "Phuket Transfer | Tour Van Phuket | Van Services",
    },
    "meta.title.fleet": {
      th: "รถตู้ภูเก็ต | รถตู้พร้อมคนขับภูเก็ต | Infinity Transport",
      en: "Van in Phuket | Van with Driver | Infinity Transport",
    },
    "meta.title.pricing": {
      th: "ราคารถตู้ภูเก็ต | รับส่งสนามบิน | Infinity Transport Phuket",
      en: "Phuket van rates | Airport transfer | Infinity Transport",
    },
    "meta.title.reviews": { th: "รีวิวลูกค้า | Infinity Transport Phuket", en: "Customer reviews | Infinity Transport Phuket" },
    "meta.title.articles": {
      th: "บทความรถตู้พร้อมคนขับภูเก็ต | Infinity Transport Phuket",
      en: "Van with driver guides | Infinity Transport Phuket",
    },

    "footer.tagline": {
      th: "Infinity Transport & Travel Phuket ให้บริการรถตู้ภูเก็ตพร้อมคนขับ สำหรับรับส่งสนามบินภูเก็ต รถตู้นำเที่ยวภูเก็ต รถตู้เหมาคัน เดินทางธุรกิจ และเดินทางต่างจังหวัด รองรับทั้งลูกค้าส่วนตัว ครอบครัว บริษัท และหมู่คณะ",
      en: "Infinity Transport & Travel Phuket provides Phuket van service with driver for airport transfers, private tours, full-day charter, business travel, and intercity trips for individuals, families, companies, and groups.",
    },
    "footer.menu_heading": { th: "เมนูหลัก", en: "Main menu" },
    "footer.services_heading": { th: "บริการยอดนิยม", en: "Popular services" },
    "footer.contact_heading": { th: "ติดต่อเรา", en: "Contact us" },
    "footer.pop_airport": { th: "รับส่งสนามบินภูเก็ต", en: "Phuket airport transfers" },
    "footer.pop_island": { th: "เที่ยวรอบเกาะส่วนตัว", en: "Private island tours" },
    "footer.pop_business": { th: "เดินทางธุรกิจและ VIP", en: "Business & VIP travel" },
    "footer.pop_fleet": { th: "รถหรูและรถตู้หมู่คณะ", en: "Luxury & group vans" },
    "footer.pop_pricing": { th: "แพ็กเกจและราคา", en: "Packages & rates" },
    "footer.book247": { th: "รับจองทุกวัน 24 ชั่วโมง", en: "Bookings accepted 24/7" },
    "footer.maps": { th: "ดูบน Google Maps", en: "View on Google Maps" },
    "footer.cta_strong": { th: "พร้อมออกเดินทางแล้วหรือยัง?", en: "Ready to travel?" },
    "footer.cta_p": {
      th: "ทีมงานพร้อมเสนอราคา จัดคิวรถ และตอบคำถามทุกเส้นทางในภูเก็ต",
      en: "We quote, schedule vehicles, and answer route questions across Phuket.",
    },
    "footer.quote": { th: "จองรถ / ขอใบเสนอราคา", en: "Book / request a quote" },
    "footer.fleet_btn": { th: "ดูรถทั้งหมด", en: "View full fleet" },
    "footer.reserved": { th: "สงวนลิขสิทธิ์", en: "All rights reserved" },
    "footer.privacy": { th: "นโยบายความเป็นส่วนตัว", en: "Privacy policy" },
    "footer.terms": { th: "เงื่อนไขการให้บริการ", en: "Terms of service" },
    "footer.top": { th: "กลับขึ้นบน", en: "Back to top" },
    "footer.top_aria": { th: "กลับไปด้านบนของหน้า", en: "Back to top of page" },
    "footer.legal_aria": { th: "เอกสารทางกฎหมาย", en: "Legal" },

    "float.contact.group": { th: "ช่องทางติดต่อด่วน", en: "Quick contact" },
    "float.contact.toggle": { th: "เปิดตัวเลือกติดต่อ", en: "Open contact options" },
    "float.contact.line": { th: "แชท LINE", en: "Chat on LINE" },
    "float.contact.wa": { th: "ส่งข้อความทาง WhatsApp", en: "Message on WhatsApp" },
    "float.contact.phone": { th: "โทรหาเรา", en: "Call us" },
    "float.contact.fb": { th: "Facebook", en: "Facebook" },
    "float.contact.mail": { th: "ส่งอีเมล", en: "Send email" },

    "booking.title": { th: "เลือกช่องทางการจอง", en: "Choose how to book" },
    "booking.you_chose": { th: "คุณเลือก:", en: "You chose:" },
    "booking.line_sub": { th: "แชทกับทีมได้ทันที", en: "Chat with our team instantly" },
    "booking.phone_title": { th: "โทรศัพท์", en: "Phone" },
    "booking.phone_sub": { th: "คุยกับเจ้าหน้าที่โดยตรง", en: "Speak directly with staff" },
    "booking.wa_sub": { th: "ส่งข้อความภาษาไทยหรืออังกฤษ", en: "Message in Thai or English" },
    "booking.close_aria": { th: "ปิดหน้าต่างจอง", en: "Close booking dialog" },

    "car.filter_group_aria": { th: "ค้นหารุ่นรถ", en: "Search vehicle models" },
    "car.filter_all": { th: "ทั้งหมด", en: "All" },
    "car.search_label": { th: "ค้นหารุ่น", en: "Search model" },
    "car.search_ph": { th: "เช่น Alphard, Sprinter…", en: "e.g. Alphard, Sprinter…" },
    "car.search_btn": { th: "ค้นหา", en: "Search" },
    "car.empty": { th: "ไม่พบรุ่นที่ตรงกับตัวกรองหรือคำค้น", en: "No models match your filters or search." },
    "car.pick_model": { th: "เลือกรุ่นรถ", en: "Choose a model" },
    "car.section_eyebrow": { th: "เลือกรถตู้", en: "Choose a van" },
    "car.section_h2": { th: "รถตู้ภูเก็ตที่พร้อมให้บริการ", en: "Phuket vans ready for your trip" },
    "car.section_lead": {
      th: "เรามีรถตู้หลายรูปแบบสำหรับการเดินทางในภูเก็ต รองรับทั้งการเดินทางแบบส่วนตัว ครอบครัว บริษัท และหมู่คณะ สามารถเลือกประเภทรถให้เหมาะกับจำนวนผู้โดยสารและสัมภาระได้",
      en: "Several van types for travel in Phuket — private, family, corporate, and group trips. Choose a vehicle that fits passengers and luggage.",
    },
    "car.you_picked": { th: "รถที่คุณเลือก:", en: "Your selection:" },
    "car.book_this": { th: "จองรถรุ่นนี้", en: "Book this model" },
    "car.fleet_details": { th: "ดูรายละเอียดรถทั้งหมด", en: "Full fleet details" },
    "car.prev_aria": { th: "ก่อนหน้า", en: "Previous" },
    "car.next_aria": { th: "ถัดไป", en: "Next" },
    "car.mini_book": { th: "จองรุ่นนี้", en: "Book this model" },

    "car.suv.small": { th: "เหมาะกับคู่รักและครอบครัวเล็ก", en: "Ideal for couples and small families." },
    "car.allnew.small": { th: "เหมาะกับครอบครัวและกลุ่มเพื่อน", en: "Great for families and friends." },
    "car.alphard.small": { th: "เหมาะกับงาน VIP และผู้บริหาร", en: "VIP and executive travel." },
    "car.mb.small": { th: "เหมาะกับการรับแขกสำคัญ", en: "Perfect for distinguished guests." },
    "car.sprinter.small": { th: "เหมาะกับหมู่คณะและกรุ๊ปทัวร์", en: "Groups and tour parties." },

    "reviews.alt_photo": { th: "รีวิวจากลูกค้า ภาพที่ {n}", en: "Customer review image {n}" },
    "reviews.alt_fail": { th: "โหลดรูป {name} ไม่สำเร็จ", en: "Failed to load image {name}" },
    "reviews.dot_go": { th: "ไปที่ตำแหน่งสไลด์ {n}", en: "Go to slide position {n}" },

    "index.hero.eyebrow": { th: "บริการรถตู้ภูเก็ตพร้อมคนขับ", en: "Phuket van service with driver" },
    "index.hero.h1": {
      th: "รถตู้ภูเก็ต พร้อมคนขับ เดินทางสะดวกทุกเส้นทาง",
      en: "Phuket van with driver — comfortable travel on every route",
    },
    "index.hero.p": {
      th: "บริการรถตู้ภูเก็ตสำหรับรับส่งสนามบิน นำเที่ยว เหมาคัน เดินทางธุรกิจ และเดินทางต่างจังหวัด พร้อมคนขับมืออาชีพ รถสะอาด ดูแลตลอดการเดินทาง ให้บริการทั้งแบบส่วนตัว ครอบครัว และหมู่คณะ",
      en: "Phuket van service for airport transfers, tours, full-day charter, business trips, and intercity travel — professional drivers, clean vehicles, private, family, and group options.",
    },
    "index.hero.book": { th: "จองรถตู้ภูเก็ต", en: "Book a Phuket van" },
    "index.hero.fleet": { th: "ดูรถทั้งหมด", en: "View fleet" },

    "index.pop.eyebrow": { th: "บริการยอดนิยม", en: "Popular services" },
    "index.pop.h2": { th: "บริการรถตู้ภูเก็ตยอดนิยม", en: "Popular Phuket van services" },
    "index.pop.lead": {
      th: "เลือกบริการรถตู้ภูเก็ตให้เหมาะกับการเดินทาง ไม่ว่าจะเป็นรับส่งสนามบิน เที่ยวรอบเกาะ เดินทางธุรกิจ หรือเหมาคันพร้อมคนขับ",
      en: "Choose a Phuket van service that fits your trip — airport, island tours, business travel, or full-day charter with driver.",
    },
    "index.pop.airport.h": { th: "รถตู้รับส่งสนามบินภูเก็ต", en: "Phuket airport van transfer" },
    "index.pop.airport.p": {
      th: "บริการรับส่งระหว่างสนามบินภูเก็ต โรงแรม บ้านพัก ท่าเรือ และสถานที่ต่าง ๆ พร้อมรองรับผู้โดยสารและสัมภาระ",
      en: "Transfers between Phuket Airport, hotels, villas, piers, and other points — passengers and luggage supported.",
    },
    "index.pop.daily.h": { th: "รถตู้นำเที่ยวภูเก็ต", en: "Phuket tour van" },
    "index.pop.daily.p": {
      th: "เที่ยวภูเก็ตแบบส่วนตัว พร้อมคนขับชำนาญเส้นทาง สามารถวางแผนจุดแวะและเวลาเดินทางได้ตามต้องการ",
      en: "Private Phuket sightseeing with drivers who know the routes — plan stops and timing your way.",
    },
    "index.pop.vip.h": { th: "รถตู้ VIP ภูเก็ต", en: "VIP van Phuket" },
    "index.pop.vip.p": {
      th: "บริการรถตู้สำหรับผู้บริหาร ลูกค้า VIP ครอบครัว และผู้ที่ต้องการความสะดวกสบายในการเดินทาง",
      en: "Van service for executives, VIP guests, families, and travellers who want extra comfort.",
    },
    "index.pop.group.h": { th: "รถตู้เหมาคันพร้อมคนขับ", en: "Full-day van charter with driver" },
    "index.pop.group.p": {
      th: "เหมาะสำหรับกลุ่มเพื่อน บริษัท กรุ๊ปทัวร์ งานอีเวนต์ และการเดินทางหลายจุดภายในวันเดียว",
      en: "Ideal for friends, companies, tour groups, events, and multi-stop days.",
    },

    "index.fleet.eyebrow": { th: "Fleet Snapshot", en: "Fleet snapshot" },
    "index.fleet.h2": { th: "ประเภทรถที่พร้อมให้บริการ", en: "Vehicle types available" },
    "index.fleet.th_model": { th: "รุ่น / ประเภทรถ", en: "Model / type" },
    "index.fleet.th_seats": { th: "จำนวนที่นั่ง", en: "Seats" },
    "index.fleet.per_trip": { th: "ต่อเที่ยว", en: "per trip" },
    "index.fleet.hours4": { th: "6 ชั่วโมง", en: "6 hours" },
    "index.fleet.hours10": { th: "10 ชั่วโมง", en: "10 hours" },
    "index.price.eyebrow": { th: "ราคาบริการ", en: "Service rates" },
    "index.price.h2": { th: "ราคาบริการรถตู้ภูเก็ต", en: "Phuket van service rates" },
    "index.price.lead": {
      th: "ค่าบริการขึ้นอยู่กับเส้นทาง ระยะเวลา ประเภทรถ จำนวนผู้โดยสาร และจำนวนจุดแวะ กรุณาแจ้งรายละเอียดการเดินทางเพื่อรับราคาที่เหมาะสม",
      en: "Rates depend on route, duration, vehicle type, passenger count, and stops. Share your trip details for a suitable quote.",
    },
    "index.price.note": {
      th: "ราคาดังกล่าวอาจเปลี่ยนแปลงตามวันเดินทาง เส้นทาง และเงื่อนไขการให้บริการ",
      en: "Listed rates may change by travel date, route, and service conditions.",
    },
    "index.price.th_pkg": { th: "แพ็กเกจ / บริการ", en: "Package / service" },
    "index.price.th_from": { th: "ราคาเริ่มต้น", en: "From" },
    "index.price.th_unit": { th: "ระยะเวลา / หน่วย", en: "Duration / unit" },
    "index.split.btn_models": { th: "ดูรถตู้พร้อมคนขับ", en: "View vans with driver" },
    "index.split.btn_packages": { th: "ดูแพ็กเกจทั้งหมด", en: "All packages" },

    "index.album.eyebrow": { th: "เกี่ยวกับเรา", en: "About us" },
    "index.album.h2": {
      th: "ทำไมลูกค้าจึงเลือกใช้บริการรถตู้ภูเก็ตกับ Infinity Transport",
      en: "Why guests choose Infinity Transport for Phuket van service",
    },
    "index.album.lead": {
      th: "Infinity Transport & Travel Phuket ให้บริการรถตู้ภูเก็ตพร้อมคนขับ สำหรับนักท่องเที่ยว ครอบครัว บริษัท และหมู่คณะ โดยให้ความสำคัญกับความปลอดภัย ความสะอาด ความตรงต่อเวลา และการบริการที่เป็นมืออาชีพ ลูกค้าสามารถใช้บริการรถตู้รับส่งสนามบินภูเก็ต รถตู้นำเที่ยวภูเก็ต รถตู้เหมาคัน เดินทางธุรกิจ และเดินทางแบบส่วนตัวได้ตามแผนที่ต้องการ ทีมงานช่วยวางแผนเส้นทางทั้งในเกาะภูเก็ตและพื้นที่ใกล้เคียง เช่น พังงา เขาหลัก และกระบี่ รวมถึงแจ้งรายละเอียดก่อนออกเดินทางเพื่อให้การเดินทางราบรื่น หากต้องการเช่ารถตู้ภูเก็ตพร้อมคนขับ หรือสอบถามบริการรถตู้ VIP ภูเก็ต สามารถแจ้งวันเดินทาง จุดรับส่ง จำนวนผู้โดยสาร และสัมภาระ เพื่อให้ทีมงานแนะนำประเภทรถที่เหมาะสมและเสนอราคาตามเงื่อนไขจริงได้",
      en: "Infinity Transport & Travel Phuket offers Phuket van service with driver for travellers, families, companies, and groups — with focus on safety, cleanliness, punctuality, and professional care. Use airport transfers, tour vans, full-day charter, business travel, and private trips. We help plan routes in Phuket and nearby areas such as Phang Nga, Khao Lak, and Krabi, and confirm details before departure. Share date, pickup points, passengers, and luggage for a suitable vehicle and quote.",
    },
    "index.album.point1": {
      th: "คนขับชำนาญเส้นทางภูเก็ตและสนามบิน",
      en: "Drivers who know Phuket and airport routes",
    },
    "index.album.point2": {
      th: "รถสะอาดและตรวจเช็กก่อนใช้งาน",
      en: "Clean vehicles checked before each trip",
    },
    "index.album.point3": {
      th: "แจ้งรายละเอียดก่อนเดินทาง และรองรับหลายรูปแบบการเดินทาง",
      en: "Trip details confirmed in advance — multiple travel styles supported",
    },
    "index.album.grid_aria": { th: "อัลบั้มภาพรถและบริการ", en: "Gallery of vehicles and service" },
    "index.album.prev_aria": { th: "เลื่อนอัลบั้มไปภาพก่อนหน้า", en: "Previous gallery slide" },
    "index.album.next_aria": { th: "เลื่อนอัลบั้มไปภาพถัดไป", en: "Next gallery slide" },

    "index.trust.eyebrow": { th: "จุดเด่นบริการ", en: "Service highlights" },
    "index.trust.h2": { th: "บริการรถตู้ภูเก็ตที่ใส่ใจทุกการเดินทาง", en: "Phuket van service that looks after every trip" },
    "index.trust.a.h": { th: "ปลอดภัยและตรงต่อเวลา", en: "Safe and on time" },
    "index.trust.a.p": {
      th: "คนขับชำนาญเส้นทางภูเก็ต วางแผนเวลาให้เหมาะกับไฟลท์และจุดหมาย",
      en: "Drivers who know Phuket routes and plan timing around flights and destinations.",
    },
    "index.trust.b.h": { th: "รถสะอาด เหมาะกับผู้โดยสาร", en: "Clean vehicles for every guest" },
    "index.trust.b.p": {
      th: "ตรวจเช็กรถก่อนใช้งาน รองรับทั้งครอบครัว บริษัท และหมู่คณะ",
      en: "Vehicles checked before use — suitable for families, companies, and groups.",
    },
    "index.trust.c.h": { th: "ติดต่อสะดวกในพื้นที่ภูเก็ต", en: "Easy contact in Phuket" },
    "index.trust.c.p": {
      th: "สอบถามและยืนยันรายละเอียดก่อนเดินทางได้ผ่าน LINE โทรศัพท์ หรือหน้าติดต่อ",
      en: "Ask questions and confirm details via LINE, phone, or the contact page before you travel.",
    },

    "index.rev.eyebrow": { th: "รีวิวจากลูกค้า", en: "Guest reviews" },
    "index.rev.h2": { th: "รีวิวจากผู้ใช้บริการรถตู้ภูเก็ต", en: "Reviews from Phuket van guests" },
    "index.rev.lead": {
      th: "ความคิดเห็นจากลูกค้าที่ใช้บริการรับส่งสนามบิน รถตู้นำเที่ยวภูเก็ต และรถตู้พร้อมคนขับ",
      en: "Feedback from guests who used airport transfers, Phuket tour vans, and vans with driver.",
    },
    "index.rev.prev": { th: "รีวิวก่อนหน้า", en: "Previous reviews" },
    "index.rev.next": { th: "รีวิวถัดไป", en: "Next reviews" },
    "index.greviews.grade": { th: "ยอดเยี่ยม", en: "Excellent" },
    "index.greviews.stars_aria": { th: "คะแนน 5 จาก 5", en: "Rating 5 out of 5" },
    "index.greviews.count": { th: "อ้างอิงจาก Google", en: "Based on Google reviews" },
    "index.greviews.badge": { th: "รีวิวจาก Google", en: "Google reviews" },
    "index.greviews.maps_cta": { th: "ดูรีวิวทั้งหมดบน Google Maps", en: "See all reviews on Google Maps" },
    "index.greviews.posted_on": { th: "รีวิวบน Google", en: "Posted on Google" },
    "index.greviews.view_on": { th: "ดูบน Google", en: "View on Google" },
    "index.rev.photos_label": { th: "ภาพรีวิวจากลูกค้า", en: "Customer review photos" },
    "index.greviews.prev": { th: "รีวิวก่อนหน้า", en: "Previous review" },
    "index.greviews.next": { th: "รีวิวถัดไป", en: "Next review" },

    "index.faq.eyebrow": { th: "คำถามที่พบบ่อย", en: "FAQ" },
    "index.faq.h2": { th: "คำถามที่พบบ่อยเกี่ยวกับรถตู้ภูเก็ต", en: "Frequently asked questions about Phuket vans" },
    "index.faq.a.h": { th: "รถตู้ภูเก็ตรองรับผู้โดยสารได้กี่คน", en: "How many passengers can a Phuket van take?" },
    "index.faq.a.p": {
      th: "จำนวนผู้โดยสารขึ้นอยู่กับรุ่นรถและจำนวนสัมภาระ กรุณาแจ้งจำนวนผู้โดยสารและกระเป๋า เพื่อให้ทีมงานแนะนำรถที่เหมาะสม",
      en: "Capacity depends on the model and luggage. Share passenger and bag counts so we can recommend a suitable vehicle.",
    },
    "index.faq.b.h": { th: "มีบริการรถตู้รับส่งสนามบินภูเก็ตหรือไม่", en: "Do you offer Phuket airport van transfers?" },
    "index.faq.b.p": {
      th: "มีบริการรับส่งระหว่างสนามบินภูเก็ต โรงแรม บ้านพัก ท่าเรือ และสถานที่ต่าง ๆ ทั้งภายในภูเก็ตและจังหวัดใกล้เคียง",
      en: "Yes — transfers between Phuket Airport, hotels, villas, piers, and other points in Phuket and nearby provinces.",
    },
    "index.faq.c.h": { th: "สามารถจองรถตู้นำเที่ยวภูเก็ตแบบเต็มวันได้หรือไม่", en: "Can I book a full-day Phuket tour van?" },
    "index.faq.c.p": {
      th: "สามารถจองได้ทั้งแบบเที่ยวเดียว ครึ่งวัน เต็มวัน และหลายวัน โดยสามารถแจ้งสถานที่ที่ต้องการเดินทางให้ทีมงานช่วยวางแผนเส้นทางได้",
      en: "Yes — one-way, half-day, full-day, and multi-day options. Share places you want to visit and we can help plan the route.",
    },
    "index.faq.d.h": { th: "รถตู้ภูเก็ตสามารถเดินทางไปพังงาหรือกระบี่ได้หรือไม่", en: "Can Phuket vans go to Phang Nga or Krabi?" },
    "index.faq.d.p": {
      th: "สามารถเดินทางจากภูเก็ตไปพังงา เขาหลัก กระบี่ และพื้นที่ใกล้เคียงได้ โดยค่าบริการขึ้นอยู่กับเส้นทางและระยะเวลาใช้งาน",
      en: "Yes — from Phuket to Phang Nga, Khao Lak, Krabi, and nearby areas. Rates depend on route and duration.",
    },
    "index.faq.e.h": { th: "ราคาบริการรถตู้ภูเก็ตคิดอย่างไร", en: "How are Phuket van rates calculated?" },
    "index.faq.e.p": {
      th: "ราคาขึ้นอยู่กับเส้นทาง ระยะเวลา ประเภทรถ จำนวนผู้โดยสาร และจำนวนจุดแวะ ทีมงานจะแจ้งรายละเอียดก่อนยืนยันการจอง",
      en: "Rates depend on route, duration, vehicle type, passengers, and stops. We confirm details before you book.",
    },
    "index.faq.f.h": { th: "ควรจองรถตู้ล่วงหน้ากี่วัน", en: "How many days ahead should I book?" },
    "index.faq.f.p": {
      th: "แนะนำให้จองล่วงหน้า โดยเฉพาะช่วงวันหยุดหรือฤดูกาลท่องเที่ยว เพื่อให้มีรถตรงตามประเภทและเวลาที่ต้องการ",
      en: "Booking ahead is recommended — especially on holidays or peak season — so the right vehicle is available on time.",
    },

    "index.strip.h2": { th: "กำลังมองหารถตู้ภูเก็ตพร้อมคนขับอยู่ใช่ไหม", en: "Looking for a Phuket van with driver?" },
    "index.strip.p": {
      th: "แจ้งวันเดินทาง จุดรับส่ง จำนวนผู้โดยสาร และแผนการเดินทาง ทีมงานจะตรวจสอบรถว่างและเสนอราคาที่เหมาะสมให้คุณ",
      en: "Share your date, pickup points, passenger count, and plan — we check availability and send a suitable quote.",
    },
    "index.strip.line": { th: "จองผ่าน LINE", en: "Book via LINE" },
    "index.strip.phone": { th: "โทรสอบถาม", en: "Call us" },
    "index.strip.fleet": { th: "ดูรถทั้งหมด", en: "View fleet" },
    "index.strip.contact": { th: "ติดต่อและจองรถ", en: "Contact & book" },
    "index.strip.services": { th: "ดูบริการทั้งหมด", en: "All services" },

    "about.h2": { th: "เดินทางดี เริ่มจากความไว้ใจ", en: "Great trips start with trust" },
    "about.p": {
      th: "Infinity Transport & Travel Phuket ให้บริการรถพร้อมคนขับโดยเน้น 3 เรื่องสำคัญ: ความตรงเวลา ความสุภาพ และความปลอดภัย เพื่อให้ทุกทริปของคุณเป็นมืออาชีพตั้งแต่ต้นจนจบ",
      en: "Infinity Transport & Travel Phuket focuses on punctuality, courtesy, and safety so every trip feels professional end to end.",
    },
    "about.std.eyebrow": { th: "Our Standard", en: "Our standard" },
    "about.std.h2": { th: "มาตรฐานที่ยึดถือทุกวัน", en: "Standards we live by" },
    "about.std.a.h": { th: "Safety First", en: "Safety first" },
    "about.std.a.p": { th: "รถทุกคันผ่านการดูแลสภาพพร้อมใช้งาน และวางแผนเส้นทางล่วงหน้าเพื่อความปลอดภัย", en: "Maintained vehicles and planned routes for safety." },
    "about.std.b.h": { th: "Service Mind", en: "Service mindset" },
    "about.std.b.p": { th: "ทีมขับรถและแอดมินตอบไว ให้ข้อมูลชัดเจน และดูแลลูกค้าอย่างเป็นกันเองตลอดทริป", en: "Drivers and admins respond fast with clear, friendly care." },
    "about.std.c.h": { th: "Premium Experience", en: "Premium experience" },
    "about.std.c.p": { th: "ออกแบบประสบการณ์เดินทางให้เรียบหรู สบาย และเหมาะกับโอกาสสำคัญของคุณ", en: "Comfortable, refined travel for your important moments." },
    "about.hero.eyebrow": { th: "เกี่ยวกับเรา", en: "About us" },
    "about.hero.img_alt": {
      th: "ผู้โดยสารหญิงพักผ่อนอ่านหนังสือในห้องรับรองระดับพรีเมียม พร้อมกระเป๋าเดินทาง — บรรยากาศเดินทางหรูและมั่นใจ",
      en: "A guest reading in a premium lounge with luggage — luxury, confident travel",
    },
    "about.cta.contact": { th: "ติดต่อจองรถ", en: "Contact to book" },
    "about.cta.fleet": { th: "ดูรถและราคา", en: "Fleet & pricing" },
    "about.trust.group": { th: "จุดเด่นที่มองเห็นได้", en: "What sets us apart" },
    "about.pillars.intro": {
      th: "เราปรับมาตรฐานการบริการให้สอดคล้องกับงานจริงในภูเก็ต — รับส่ง ทัวร์ และงานหรูหรา",
      en: "We tune our standards to real Phuket work — transfers, tours, and premium itineraries.",
    },
    "about.trust.1": { th: "ทีมคนขับท้องถิ่นภูเก็ต", en: "Local Phuket chauffeurs" },
    "about.trust.2": { th: "คุยราคาและเส้นทางชัดเจนก่อนออกเดินทาง", en: "Clear quotes and routing before you travel" },
    "about.trust.3": { th: "รองรับสนามบิน · ทัวร์ · ธุรกิจ · รถหรู", en: "Airport, tours, business & luxury" },
    "about.trust.4": { th: "ติดต่อง่าย — LINE · WhatsApp · โทร", en: "Easy reach — LINE, WhatsApp & phone" },
    "about.bottom.h2": { th: "พร้อมให้คำแนะก่อนจอง", en: "We are here to advise before you book" },
    "about.bottom.p": {
      th: "อ่านรีวิวจากลูกค้า หรือแชทขอเส้นทางและแพ็กเกจที่เหมาะกับคุณ",
      en: "Read client reviews, or message us for routes and packages that fit your trip.",
    },
    "about.bottom.reviews": { th: "อ่านรีวิว", en: "Read reviews" },
    "about.bottom.contact": { th: "ส่งข้อความหาทีมงาน", en: "Message our team" },

    "services.eyebrow": { th: "Our Services", en: "Our services" },
    "services.h2": { th: "บริการออกแบบให้เหมาะทุกการเดินทาง", en: "Services tailored to every journey" },
    "services.lead": {
      th: "รับส่งสนามบิน เหมาเที่ยว งานธุรกิจ และรถหรู — ปรับแพ็กเกจให้ตรงกับแผนของคุณในภูเก็ต",
      en: "Airport, charters, business, and luxury — packages matched to your Phuket plans.",
    },
    "services.c1.h": { th: "รับส่งสนามบินภูเก็ต", en: "Phuket airport transfer" },
    "services.c1.p": { th: "มีบริการรับรอบเช้าและดึก พร้อมป้ายชื่อผู้โดยสารและช่วยขนสัมภาระ", en: "Early/late pickups, name sign, luggage help." },
    "services.c2.h": { th: "เที่ยวรอบเกาะแบบส่วนตัว", en: "Private island tour" },
    "services.c2.p": { th: "วางแผนเส้นทางยืดหยุ่น แวะจุดชมวิว คาเฟ่ และชายหาดตามที่คุณต้องการ", en: "Flexible stops — viewpoints, cafés, beaches." },
    "services.c3.h": { th: "เดินทางธุรกิจ", en: "Business travel" },
    "services.c3.p": { th: "เหมาะสำหรับประชุม รับแขก VIP หรือเดินทางหลายจุดในวันเดียวอย่างมืออาชีพ", en: "Meetings, VIP guests, multi-stop days." },
    "services.c4.h": { th: "บริการรายชั่วโมง", en: "Hourly hire" },
    "services.c4.p": { th: "จองตามระยะเวลาที่ต้องการ เหมาะกับงานอีเวนต์และภารกิจเร่งด่วน", en: "By the hour for events and urgent runs." },
    "services.c5.h": { th: "รถตู้สำหรับหมู่คณะ", en: "Group vans" },
    "services.c5.p": { th: "รองรับทริปครอบครัวหรือทีมงาน พร้อมพื้นที่สัมภาระและความสะดวกสบาย", en: "Family or team trips with luggage space." },
    "services.c6.h": { th: "รถหรูสำหรับโอกาสพิเศษ", en: "Luxury for special occasions" },
    "services.c6.p": { th: "เพิ่มภาพลักษณ์และความพรีเมียมสำหรับงานสำคัญ งานแต่ง และรับลูกค้าคนสำคัญ", en: "Weddings, milestones, and VIP arrivals." },
    "services.strip.h2": { th: "เลือกบริการไม่ถูก?", en: "Not sure which service?" },
    "services.strip.p": { th: "บอกแผนการเดินทางของคุณ แล้วเราช่วยจัดแพ็กเกจที่เหมาะที่สุดให้ทันที", en: "Tell us your plan — we’ll suggest the best package." },
    "services.strip.btn": { th: "คุยกับทีมงาน", en: "Talk to the team" },

    "fleet.h2": { th: "เลือกรถให้เหมาะผู้โดยสารและทริป", en: "Match vehicles to guests and trips" },
    "fleet.p1": { th: "รองรับ 3-4 ที่นั่ง เหมาะกับคู่รักหรือผู้เดินทางแบบส่วนตัวที่ต้องการความคล่องตัว", en: "3–4 seats — couples or agile private travel." },
    "fleet.p2": { th: "รองรับ 8-9 ที่นั่ง เหมาะกับครอบครัวใหญ่หรือกลุ่มเพื่อนพร้อมสัมภาระ", en: "8–9 seats — large families or friends with luggage." },
    "fleet.p3": { th: "รองรับ 4 ที่นั่ง พร้อมความเงียบและความสบายระดับผู้บริหาร", en: "4 seats — quiet executive comfort." },
    "fleet.p4": { th: "รองรับ 2 ที่นั่ง เหมาะกับงานทางการและรับแขกสำคัญ", en: "2 seats — formal and VIP reception." },
    "fleet.p5": { th: "รองรับ 10-16 ที่นั่ง เหมาะกับกรุ๊ปทัวร์ งานสัมมนา และเดินทางเป็นทีม", en: "10–16 seats — tours, seminars, teams." },
    "fleet.p6": { th: "หากต้องการรถเฉพาะรุ่นหรือตารางวิ่งพิเศษ ทีมงานสามารถจัดให้ตามความต้องการ", en: "Need a specific model or schedule? We’ll arrange it." },
    "fleet.strip.h2": { th: "ขอคำแนะนำขนาดรถ?", en: "Need sizing advice?" },
    "fleet.strip.p": { th: "แจ้งจำนวนผู้โดยสารและแผนเดินทาง ทีมงานจะช่วยเลือกคันที่เหมาะที่สุด", en: "Share passenger count and plans — we’ll recommend." },
    "fleet.strip.btn": { th: "ขอคำแนะนำทันที", en: "Get advice now" },

    "pricing.h2": { th: "ราคาโปร่งใส ปรับตามเส้นทางและเวลา", en: "Transparent rates by route and time" },
    "pricing.from": { th: "เริ่มต้น", en: "From" },
    "pricing.baht": { th: " บาท", en: " THB" },
    "pricing.per_trip": { th: "เที่ยว", en: "trip" },
    "pricing.hours": { th: " ชั่วโมง", en: " hours" },
    "pricing.note1": { th: "รวมคนขับและค่าน้ำมันในเขตภูเก็ต", en: "Includes driver and fuel within Phuket." },
    "pricing.note2": { th: "เหมาะกับทริปครึ่งวันและประชุมหลายจุด", en: "Half-day trips and multi-stop meetings." },
    "pricing.note3": { th: "เหมาะกับเที่ยวรอบเกาะหรือใช้งานทั้งวัน", en: "Full-day island touring." },
    "pricing.pkg.eyebrow": { th: "สิ่งที่รวมในแพ็กเกจ", en: "What’s included" },
    "pricing.pkg.h2": { th: "ครบในแพ็กเกจเดียว", en: "All in one package" },
    "pricing.pkg.p": {
      th: "ราคาทุกแพ็กเกจรวมค่าใช้รถ คนขับมืออาชีพ และการวางแผนเส้นทางเบื้องต้น ยกเว้นค่าทางด่วนหรือค่าเข้าอุทยานที่เกิดขึ้นหน้างาน",
      en: "Rates include vehicle, professional driver, and basic routing. Tolls or park fees on the day are extra.",
    },
    "pricing.corp.h": { th: "สำหรับงานองค์กร / กลุ่มใหญ่", en: "Corporate / large groups" },
    "pricing.corp.p": {
      th: "สามารถขอใบเสนอราคาแบบโปรเจกต์ได้ พร้อมแยกค่าใช้จ่ายชัดเจน เหมาะกับบริษัททัวร์ อีเวนต์ และงานประชุมหลายวัน",
      en: "Project quotes with clear line items for tour firms, events, and multi-day meetings.",
    },
    "pricing.corp.btn": { th: "ขอใบเสนอราคา", en: "Request a quote" },

    "contact.form.eyebrow": { th: "Booking Form", en: "Booking form" },
    "contact.form.h2": { th: "แจ้งรายละเอียด เราติดต่อกลับทันที", en: "Send details — we’ll reply quickly" },
    "contact.form.name": { th: "ชื่อผู้จอง", en: "Booker name" },
    "contact.form.name_ph": { th: "ชื่อ-นามสกุล", en: "Full name" },
    "contact.form.phone": { th: "เบอร์ติดต่อ", en: "Phone" },
    "contact.form.date": { th: "วันที่ใช้งาน", en: "Service date" },
    "contact.form.car": { th: "ประเภทรถ", en: "Vehicle type" },
    "contact.form.detail": { th: "รายละเอียดเส้นทาง", en: "Route details" },
    "contact.form.detail_ph": {
      th: "จุดรับ จุดส่ง เวลา จำนวนผู้โดยสาร และความต้องการเพิ่มเติม",
      en: "Pickup, drop-off, time, passengers, special requests",
    },
    "contact.form.submit": { th: "ส่งคำขอจองรถ", en: "Send booking request" },
    "contact.form.sending": { th: "กำลังส่งข้อมูล...", en: "Sending..." },
    "contact.form.success": {
      th: "ส่งคำขอเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด",
      en: "Request sent. Our team will contact you shortly.",
    },
    "contact.form.error": {
      th: "ส่งไม่สำเร็จ กรุณาลองอีกครั้ง หรือติดต่อทาง LINE / โทรศัพท์",
      en: "Could not send. Please try again or contact us via LINE / phone.",
    },
    "contact.form.error_setup": {
      th: "ระบบส่งอีเมลยังไม่พร้อม กรุณาติดต่อทาง LINE / โทรศัพท์ หรือแจ้งทีมดูแลเว็บ",
      en: "Email delivery is not configured yet. Please contact us via LINE / phone.",
    },
    "contact.direct.eyebrow": { th: "Direct Contact", en: "Direct contact" },
    "contact.direct.h2": { th: "ติดต่อด่วน", en: "Quick contact" },
    "contact.phone_label": { th: "โทรศัพท์", en: "Phone" },
    "contact.email_label": { th: "อีเมล", en: "Email" },

    "legal.line_handle": { th: "LINE Official", en: "LINE Official" },

    "index.booking.eyebrow": { th: "ขั้นตอนการจอง", en: "Booking steps" },
    "index.booking.h2": { th: "จองรถตู้ภูเก็ตง่าย ๆ เพียงไม่กี่ขั้นตอน", en: "Book a Phuket van in a few simple steps" },
    "index.booking.lead": {
      th: "จากสอบถามจนถึงวันเดินทาง — ทำตามลำดับนี้ ทีมงานช่วยดูแลรายละเอียดให้",
      en: "From enquiry to travel day — follow these steps; our team handles the details.",
    },
    "index.booking.s1t": { th: "ติดต่อสอบถาม", en: "Get in touch" },
    "index.booking.s1p": { th: "แจ้งวัน เวลา และเส้นทางที่ต้องการเดินทาง", en: "Share your date, time, and route." },
    "index.booking.s2t": { th: "แจ้งรายละเอียด", en: "Share details" },
    "index.booking.s2p": { th: "ระบุจำนวนผู้โดยสาร จำนวนสัมภาระ และจุดรับส่ง", en: "Confirm passengers, luggage, and pickup/drop-off points." },
    "index.booking.s3t": { th: "รับใบเสนอราคา", en: "Receive a quote" },
    "index.booking.s3p": { th: "ทีมงานตรวจสอบรถและแจ้งรายละเอียดค่าบริการ", en: "We check vehicle availability and share service details." },
    "index.booking.s4t": { th: "ยืนยันการจอง", en: "Confirm booking" },
    "index.booking.s4p": { th: "ยืนยันวันเดินทางและรอรับบริการตามเวลานัดหมาย", en: "Confirm your travel date and meet us at the arranged time." },

    "index.greviews.footnote": {
      th: "รีวิวดึงจาก Google Business Profile อัปเดตอัตโนมัติ",
      en: "Reviews loaded from Google Business Profile and updated automatically.",
    },
    "index.greviews.readmore": { th: "อ่านเพิ่มเติม", en: "Read more" },
    "index.greviews.verified_title": { th: "รีวิวที่ยืนยันแล้ว", en: "Verified review" },
    "index.greviews.verified_aria": { th: "ยืนยันแล้ว", en: "Verified" },

    "index.img.airport": { th: "รถตู้รับส่งสนามบินภูเก็ต พร้อมคนขับดูแลสัมภาระ", en: "Phuket airport van transfer with driver luggage assistance" },
    "index.img.daily": { th: "รถตู้นำเที่ยวภูเก็ตแบบส่วนตัวพร้อมคนขับ", en: "Private Phuket tour van with driver" },
    "index.img.vip": { th: "รถตู้ VIP ภูเก็ตสำหรับผู้บริหารและแขกคนสำคัญ", en: "VIP van Phuket for executives and guests" },
    "index.img.group": { th: "รถตู้เหมาคันพร้อมคนขับสำหรับกลุ่มและหมู่คณะ", en: "Full-day van charter with driver for groups" },

    "meta.title.reviews": { th: "รีวิวจากลูกค้า | Infinity Transport Phuket", en: "Customer reviews | Infinity Transport Phuket" },
    "reviews.intro.eyebrow": { th: "Reviews", en: "Reviews" },
    "reviews.intro.h2": { th: "รีวิวจริงจากผู้โดยสาร", en: "Real passenger reviews" },
    "reviews.intro.p": {
      th: "ทุกความประทับใจมีความหมายกับเรา ทีม Infinity Transport Phuket ภูมิใจนำเสนอเสียงสะท้อนจากลูกค้าที่เลือกใช้บริการรถพร้อมคนขับในภูเก็ต — ตั้งแต่รับส่งสนามบิน เหมาเที่ยวรายวัน ไปจนถึงรถหรูและหมู่คณะ",
      en: "Every impression matters. Here is feedback from guests who chose our Phuket chauffeur service — airport, daily charter, luxury, and groups.",
    },
    "reviews.stats_aria": { th: "สรุปความน่าเชื่อถือ", en: "Trust summary" },
    "reviews.stats_l1": { th: "คะแนนเฉลี่ยจากรีวิวออนไลน์", en: "Average score from online reviews" },
    "reviews.stats_l2": { th: "รับจองและประสานงานทุกวัน", en: "Bookings and coordination every day" },
    "reviews.stats_l3": { th: "เน้นตรงเวลาและความสุภาพ", en: "Punctuality and courtesy first" },
    "reviews.photo.eyebrow": { th: "Photo reviews", en: "Photo reviews" },
    "reviews.photo.h2": { th: "ภาพรีวิวจากทริปลูกค้า", en: "Photo reviews from guest trips" },
    "reviews.photo.p": {
      th: "รวมภาพรีวิวจากผู้โดยสารที่แชร์ประสบการณ์กับเรา (บางภาพอาจมาจากโซเชียลและแคมเปญของลูกค้า)",
      en: "Photos shared by passengers (some may come from social posts and guest campaigns).",
    },
    "reviews.alt_photo_brand": { th: "รีวิวจากลูกค้า Infinity Transport Phuket ภาพที่ {n}", en: "Infinity Transport Phuket guest review photo {n}" },
    "reviews.google.eyebrow": { th: "Google", en: "Google" },
    "reviews.google.h2": { th: "รีวิวเพิ่มเติมบน Google", en: "More reviews on Google" },
    "reviews.google.p": {
      th: "อ่านบทวิจารณ์ล่าสุดและคะแนนจาก Google Business Profile ของเราได้โดยตรงจากลิงก์ด้านล่าง",
      en: "Read the latest reviews and ratings from our Google Business Profile via the link below.",
    },
    "reviews.google.btn": { th: "เปิด Google Maps / รีวิว", en: "Open Google Maps / reviews" },
    "reviews.testimonials.eyebrow": { th: "Testimonials", en: "Testimonials" },
    "reviews.testimonials.h2": { th: "ข้อความรีวิวจากลูกค้า", en: "Written testimonials" },
    "reviews.testimonials.p": {
      th: "ดึงจาก Google Business Profile อัปเดตอัตโนมัติ",
      en: "Loaded from Google Business Profile and updated automatically.",
    },

    "line.prefill": { th: "สนใจจองรถรุ่น", en: "I would like to book" },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "th";
  }

  function t(key, vars) {
    const row = STRINGS[key];
    if (!row) return null;
    let s = row[getLang()] ?? row.th;
    if (vars && typeof s === "string") {
      Object.keys(vars).forEach((k) => {
        s = s.split(`{${k}}`).join(String(vars[k]));
      });
    }
    return s;
  }

  function applyAriaFromDict() {
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      const val = key ? t(key) : null;
      if (val) el.setAttribute("aria-label", val);
    });
  }

  function applyPlaceholders() {
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const val = key ? t(key) : null;
      if (val && ("placeholder" in el)) el.placeholder = val;
    });
  }

  function applyAlts() {
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (!key || el.tagName !== "IMG") return;
      const vn = el.getAttribute("data-i18n-var-n");
      const val = vn ? t(key, { n: vn }) : t(key);
      if (val) el.alt = val;
    });
  }

  function applyTitles() {
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      const val = key ? t(key) : null;
      if (val) el.title = val;
    });
  }

  function applyTextNodes() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(key);
      if (val == null) return;
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        const phKey = el.getAttribute("data-i18n-placeholder");
        const ph = phKey ? t(phKey) : null;
        if (ph) el.placeholder = ph;
        return;
      }
      if (val.includes("\n")) {
        el.innerHTML = val.split("\n").join("<br>");
      } else {
        el.textContent = val;
      }
    });
  }

  function applyPageTitle() {
    const key = document.body && document.body.getAttribute("data-i18n-page-title");
    const val = key ? t(key) : null;
    if (val) document.title = val;
  }

  function applyDocumentLang() {
    const lang = getLang();
    document.documentElement.lang = lang === "en" ? "en" : "th-TH";
    document.documentElement.setAttribute("data-lang", lang);
  }

  function syncLangButtons() {
    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      const l = btn.getAttribute("data-lang-set");
      const on = l === getLang();
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function apply() {
    applyDocumentLang();
    applyTextNodes();
    applyPlaceholders();
    applyAlts();
    applyTitles();
    applyAriaFromDict();
    applyPageTitle();
    syncLangButtons();
    window.dispatchEvent(new CustomEvent("site:langchange", { detail: { lang: getLang() } }));
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang === "en" ? "en" : "th");
    apply();
  }

  window.SITE_I18N = { getLang, setLang, t, apply, STRINGS };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-lang-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setLang(btn.getAttribute("data-lang-set") || "th");
      });
    });
    apply();
  });
})();

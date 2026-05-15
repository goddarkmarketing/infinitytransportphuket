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
    "nav.fleet": { th: "รถทั้งหมด", en: "Fleet" },
    "nav.pricing": { th: "ราคา", en: "Pricing" },
    "nav.about": { th: "เกี่ยวกับเรา", en: "About" },
    "nav.reviews": { th: "รีวิว", en: "Reviews" },
    "nav.contact": { th: "ติดต่อ", en: "Contact" },
    "nav.articles": { th: "บทความ", en: "Articles" },
    "nav.cta": { th: "จองรถทันที", en: "Book now" },

    "meta.title.index": { th: "Infinity Transport Phuket | รถพร้อมคนขับภูเก็ต", en: "Infinity Transport Phuket | Chauffeur service" },
    "meta.title.about": { th: "เกี่ยวกับเรา | Infinity Transport Phuket", en: "About us | Infinity Transport Phuket" },
    "meta.title.contact": { th: "ติดต่อและจองรถ | Infinity Transport Phuket", en: "Contact & booking | Infinity Transport Phuket" },
    "meta.title.services": { th: "บริการของเรา | Infinity Transport Phuket", en: "Our services | Infinity Transport Phuket" },
    "meta.title.fleet": { th: "รถทั้งหมด | Infinity Transport Phuket", en: "Fleet | Infinity Transport Phuket" },
    "meta.title.pricing": { th: "ราคาและแพ็กเกจ | Infinity Transport Phuket", en: "Rates & packages | Infinity Transport Phuket" },
    "meta.title.reviews": { th: "รีวิวลูกค้า | Infinity Transport Phuket", en: "Customer reviews | Infinity Transport Phuket" },
    "meta.title.articles": { th: "บทความท่องเที่ยว | Infinity Transport Phuket", en: "Travel articles | Infinity Transport Phuket" },

    "footer.tagline": {
      th: "รถพร้อมคนขับภูเก็ต เน้นตรงเวลา ปลอดภัย และบริการมืออาชีพ ตลอด 24 ชั่วโมง",
      en: "Chauffeur service in Phuket — punctual, safe, professional support 24/7.",
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
    "car.section_eyebrow": { th: "เลือกรถในหน้าแรก", en: "Choose on the home page" },
    "car.section_h2": { th: "เลือกประเภทรถที่ต้องการ แล้วไปจองต่อได้ทันที", en: "Pick a vehicle type, then continue to booking." },
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

    "index.hero.eyebrow": { th: "Phuket Premium Transport", en: "Phuket Premium Transport" },
    "index.hero.h1": { th: "รถพร้อมคนขับในภูเก็ต\nตรงเวลา สุภาพ และพร้อมดูแล 24/7", en: "Chauffeur service in Phuket\nPunctual, courteous care 24/7" },
    "index.hero.p": {
      th: "เหมาะสำหรับรับส่งสนามบิน ทริปท่องเที่ยว งานธุรกิจ และงานสำคัญ พร้อมรถหลากหลายประเภท ตั้งแต่ SUV จนถึงรถตู้หมู่คณะ",
      en: "Airport runs, tours, business, and special occasions — from SUVs to large vans.",
    },
    "index.hero.book": { th: "จองรถตอนนี้", en: "Book now" },
    "index.hero.fleet": { th: "ดูรถทั้งหมด", en: "View fleet" },

    "index.pop.eyebrow": { th: "บริการยอดนิยม", en: "Popular services" },
    "index.pop.h2": { th: "บริการหลักที่ลูกค้าใช้งานบ่อยที่สุด", en: "Services our guests use most" },
    "index.pop.airport.h": { th: "รับส่งสนามบิน", en: "Airport transfer" },
    "index.pop.airport.p": { th: "บริการตรงเวลา พร้อมป้ายชื่อผู้โดยสารและช่วยดูแลสัมภาระ", en: "On time, name sign, and luggage help." },
    "index.pop.daily.h": { th: "เหมาเที่ยวรายวัน", en: "Daily charter" },
    "index.pop.daily.p": { th: "วางแผนเส้นทางยืดหยุ่น เที่ยวครบตามเวลาที่คุณต้องการ", en: "Flexible routing within your schedule." },
    "index.pop.vip.h": { th: "รถ VIP", en: "VIP vehicles" },
    "index.pop.vip.p": { th: "เหมาะกับรับแขกคนสำคัญ งานธุรกิจ และโอกาสพิเศษ", en: "VIP guests, business, and special events." },
    "index.pop.group.h": { th: "รถหมู่คณะ", en: "Group transport" },
    "index.pop.group.p": { th: "รองรับทริปครอบครัว ทีมงาน และกรุ๊ปทัวร์อย่างสะดวกสบาย", en: "Comfortable for families, teams, and tours." },

    "index.fleet.eyebrow": { th: "Fleet Snapshot", en: "Fleet snapshot" },
    "index.fleet.h2": { th: "ประเภทรถที่พร้อมให้บริการ", en: "Vehicle types available" },
    "index.fleet.th_model": { th: "รุ่น / ประเภทรถ", en: "Model / type" },
    "index.fleet.th_seats": { th: "จำนวนที่นั่ง", en: "Seats" },
    "index.fleet.per_trip": { th: "ต่อเที่ยว", en: "per trip" },
    "index.fleet.hours4": { th: "6 ชั่วโมง", en: "6 hours" },
    "index.fleet.hours10": { th: "10 ชั่วโมง", en: "10 hours" },
    "index.price.eyebrow": { th: "ราคาเริ่มต้น", en: "Starting rates" },
    "index.price.h2": { th: "เริ่มต้นชัดเจน ตัดสินใจง่าย", en: "Clear starting prices" },
    "index.price.th_pkg": { th: "แพ็กเกจ / บริการ", en: "Package / service" },
    "index.price.th_from": { th: "ราคาเริ่มต้น", en: "From" },
    "index.price.th_unit": { th: "ระยะเวลา / หน่วย", en: "Duration / unit" },
    "index.split.btn_models": { th: "ดูรายละเอียดรถแต่ละรุ่น", en: "Model details" },
    "index.split.btn_packages": { th: "ดูแพ็กเกจทั้งหมด", en: "All packages" },

    "index.album.eyebrow": { th: "ทำไมต้องเรา", en: "Why us" },
    "index.album.h2": {
      th: "ทำไมต้องเช่ารถตู้พร้อมคนขับกับ Infinity Transport Phuket",
      en: "Why book a chauffeured van with Infinity Transport Phuket",
    },
    "index.album.lead": {
      th: "รถตู้และรถหรูพร้อมคนขับมืออาชีพในภูเก็ต เน้นความปลอดภัย ตรงเวลา และบริการที่เป็นกันเองตลอดเส้นทาง",
      en: "Premium vans and chauffeured cars in Phuket — safe, on time, and genuinely welcoming from pickup to drop-off.",
    },
    "index.album.point1": {
      th: "คนขับมืออาชีพ สุภาพ ชำนาญเส้นทางในภูเก็ตและสนามบิน",
      en: "Professional, courteous drivers who know Phuket and airport routes inside out.",
    },
    "index.album.point2": {
      th: "รถสะอาด ปรับอากาศเย็นสบาย นั่งสบายทั้งครอบครัวและหมู่คณะ",
      en: "Clean, air-conditioned vehicles — comfortable for families and groups.",
    },
    "index.album.point3": {
      th: "ราคาและแพ็กเกจชัดเจน จองง่าย ติดต่อได้ตลอด 24 ชั่วโมง",
      en: "Clear rates and packages, easy booking, and 24/7 contact when you need us.",
    },
    "index.album.grid_aria": { th: "อัลบั้มภาพรถและบริการ", en: "Gallery of vehicles and service" },
    "index.album.prev_aria": { th: "เลื่อนอัลบั้มไปภาพก่อนหน้า", en: "Previous gallery slide" },
    "index.album.next_aria": { th: "เลื่อนอัลบั้มไปภาพถัดไป", en: "Next gallery slide" },

    "index.trust.eyebrow": { th: "ความน่าเชื่อถือ", en: "Trust" },
    "index.trust.h2": { th: "ลูกค้าไว้วางใจเพราะเราใส่ใจทุกรายละเอียด", en: "Trusted because we mind every detail" },
    "index.trust.a.h": { th: "รีวิวดีต่อเนื่อง", en: "Consistently strong reviews" },
    "index.trust.a.p": { th: "ลูกค้าส่วนใหญ่ชื่นชมเรื่องตรงเวลา ความสุภาพ และรถสะอาด", en: "Guests praise punctuality, courtesy, and clean cars." },
    "index.trust.b.h": { th: "ดูแลงานจริงทุกวัน", en: "Hands-on every day" },
    "index.trust.b.p": { th: "รองรับทั้งนักท่องเที่ยวและลูกค้าองค์กรในภูเก็ตอย่างต่อเนื่อง", en: "Leisure and corporate clients across Phuket." },
    "index.trust.c.h": { th: "ทีมงานตอบไว", en: "Quick responses" },
    "index.trust.c.p": { th: "มีแอดมินคอยประสานงานให้ตั้งแต่ก่อนเดินทางจนจบทริป", en: "Coordinators from pre-trip through drop-off." },

    "index.rev.eyebrow": { th: "รีวิวจากลูกค้า", en: "Guest reviews" },
    "index.rev.h2": { th: "ประสบการณ์จริงที่เลือก Infinity Transport Phuket", en: "Real experiences with Infinity Transport Phuket" },
    "index.rev.prev": { th: "รีวิวก่อนหน้า", en: "Previous reviews" },
    "index.rev.next": { th: "รีวิวถัดไป", en: "Next reviews" },
    "index.greviews.grade": { th: "ยอดเยี่ยม", en: "Excellent" },
    "index.greviews.stars_aria": { th: "คะแนน 5 จาก 5", en: "Rating 5 out of 5" },
    "index.greviews.count": { th: "อ้างอิงจาก 24 บทวิจารณ์", en: "Based on 24 reviews" },
    "index.greviews.prev": { th: "รีวิวก่อนหน้า", en: "Previous review" },
    "index.greviews.next": { th: "รีวิวถัดไป", en: "Next review" },

    "index.faq.eyebrow": { th: "คำถามที่พบบ่อย", en: "FAQ" },
    "index.faq.h2": { th: "FAQ ก่อนจองรถ", en: "FAQ before you book" },
    "index.faq.a.h": { th: "จองล่วงหน้ากี่วันดี?", en: "How far ahead should I book?" },
    "index.faq.a.p": { th: "แนะนำอย่างน้อย 1-3 วัน โดยเฉพาะช่วงไฮซีซันเพื่อให้ได้รุ่นรถตามต้องการ", en: "At least 1–3 days ahead, more in peak season." },
    "index.faq.b.h": { th: "รับงานนอกภูเก็ตไหม?", en: "Do you leave Phuket?" },
    "index.faq.b.p": { th: "รับงานนอกพื้นที่ได้ กรุณาแจ้งปลายทางเพื่อประเมินราคาและเวลาเดินทาง", en: "Yes — share destinations for timing and pricing." },
    "index.faq.c.h": { th: "ชำระเงินแบบไหนได้บ้าง?", en: "How can I pay?" },
    "index.faq.c.p": { th: "รองรับโอนธนาคารและช่องทางที่ตกลงกับทีมงานก่อนเริ่มงาน", en: "Bank transfer and agreed methods before service." },

    "index.strip.h2": { th: "พร้อมจองรถแล้วใช่ไหม?", en: "Ready to book?" },
    "index.strip.p": { th: "ติดต่อผ่าน LINE, WhatsApp หรือโทรหาเราได้ทันที", en: "Reach us on LINE, WhatsApp, or phone." },
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
    "index.booking.h2": { th: "จองง่ายใน 4 ขั้นตอน", en: "Book in 4 easy steps" },
    "index.booking.lead": {
      th: "จากเลือกรถจนถึงวันออกเดินทาง — ทำตามลำดับนี้ ทีมงานดูแลให้ครบในที่เดียว",
      en: "From choosing a car to departure day — follow these steps; one team handles it all.",
    },
    "index.booking.s1t": { th: "เลือกรถ", en: "Choose a vehicle" },
    "index.booking.s1p": { th: "เลือกรุ่นให้เหมาะกับจำนวนผู้โดยสารและสัมภาระ", en: "Pick a model for your passengers and luggage." },
    "index.booking.s2t": { th: "แจ้งรายละเอียด", en: "Share details" },
    "index.booking.s2p": { th: "ส่งวัน เวลา จุดรับ-ส่ง และแผนการเดินทาง", en: "Send date, time, pickup/drop-off, and itinerary." },
    "index.booking.s3t": { th: "ยืนยันราคา", en: "Confirm pricing" },
    "index.booking.s3p": { th: "ทีมงานสรุปรายการและราคาให้ชัดเจนก่อนยืนยัน", en: "We confirm scope and price before you commit." },
    "index.booking.s4t": { th: "ออกเดินทาง", en: "Travel day" },
    "index.booking.s4p": { th: "รถและคนขับพร้อมให้บริการตรงเวลาแบบมืออาชีพ", en: "Vehicle and driver arrive on time, professionally." },

    "index.greviews.footnote": {
      th: "ข้อมูลตัวอย่างสำหรับแสดงผล — เชื่อมบัญชี Google Business / API ได้ในขั้นตอนถัดไป",
      en: "Sample display — connect Google Business / API in a later step.",
    },
    "index.greviews.readmore": { th: "อ่านเพิ่มเติม", en: "Read more" },
    "index.greviews.verified_title": { th: "รีวิวที่ยืนยันแล้ว", en: "Verified review" },
    "index.greviews.verified_aria": { th: "ยืนยันแล้ว", en: "Verified" },

    "index.img.airport": { th: "รับส่งสนามบิน พร้อมคนขับถือป้ายชื่อและช่วยดูแลสัมภาระ", en: "Airport transfer with sign service and luggage help." },
    "index.img.daily": { th: "เหมาเที่ยวรายวัน รถหรูพร้อมคนขับ วางแผนเส้นทางท่องเที่ยว", en: "Daily charter with driver and flexible sightseeing." },
    "index.img.vip": { th: "รถ VIP พร้อมคนขับมืออาชีพ รับแขกคนสำคัญและงานธุรกิจ", en: "VIP chauffeur service for guests and business." },
    "index.img.group": { th: "รถหมู่คณะ รถตู้รับกลุ่มทัวร์และครอบครัว พร้อมคนขับ", en: "Group van for tours and families with driver." },

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
      th: "ตัวอย่างข้อความจากผู้โดยสาร (บางส่วนแสดงเป็นภาษาอังกฤษตามรีวิวจริง)",
      en: "Sample guest quotes (some appear in English as in the original reviews).",
    },

    "line.prefill": { th: "สนใจจองรถรุ่น", en: "I would like to book" },
  };

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "th";
  }

  function t(key, vars) {
    const row = STRINGS[key];
    let s = row ? row[getLang()] ?? row.th : key;
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
      if (key) el.setAttribute("aria-label", t(key));
    });
  }

  function applyPlaceholders() {
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (key && ("placeholder" in el)) el.placeholder = t(key);
    });
  }

  function applyAlts() {
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (!key || el.tagName !== "IMG") return;
      const vn = el.getAttribute("data-i18n-var-n");
      el.alt = vn ? t(key, { n: vn }) : t(key);
    });
  }

  function applyTitles() {
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      const key = el.getAttribute("data-i18n-title");
      if (key) el.title = t(key);
    });
  }

  function applyTextNodes() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = t(key);
      if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") {
        if (el.hasAttribute("data-i18n-placeholder")) el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
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
    if (key) document.title = t(key);
  }

  function applyDocumentLang() {
    const lang = getLang();
    document.documentElement.lang = lang === "en" ? "en" : "th";
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

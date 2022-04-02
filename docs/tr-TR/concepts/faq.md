
# SSS

  - [1. Lütfen kısaca IBAX'i tanımlayın?](#soru-1)
  - [2. IBax Bitcoin, Ethereum veya diğer blok zincirleri için geçerli mi?](#soru-2)
  - [3. IBax ile akıllı sözleşmeleri yürütmek için yerleşik mekanizmalara sahip diğer herkese açık blok zinciri platformları arasındaki temel farklar nelerdir?](#soru-3)
  - [4. Kendi kripto paran var mı?](#soru-4)
  - [5. Honor node nedir ve onu kim koruyabilir?](#soru-5)
  - [6. Platform ekosistemi nedir?](#soru-6)
  - [7. Kimler ekosistem oluşturabilir?](#soru-7)
  - [8. Kullanıcılar nasıl ekosistemin üyesi olurlar?](#soru-8)
  - [9. Bir kullanıcı birden fazla ekosistem oluşturabilir mi?](#soru-9)
  - [10. Platform uygulaması nedir?](#soru-10)
  - [11. Uygulamayı oluşturmak için hangi programlama dili kullanılıyor?](#soru-11)
  - [12. Uygulama oluşturmak ve kullanıcılarla etkileşim kurmak için hangi yazılımlar kullanılıyor?](#soru-12)
  - [13. Platform sözleşmeleri verilere erişmek için üçüncü taraf API'leri kullanabilir mi?](#soru-13)
  - [14. Blok zincirinde saklanan sözleşme değiştirilebilir mi?](#soru-14)
  - [15. Akıllı yasa nedir?](#soru-15)
  - [16. Sözleşme diğer sözleşmeleri çağırabilir ve yürütebilir mi?](#soru-16)
  - [17. Uygulama bir ana sözleşmeyle mi çalışıyor?](#soru-17)
  - [18. Uygulama farklı diller için yerelleştirilebilir mi?](#soru-18)
  - [19. Şablon dili kullanmadan sayfa oluşturabilir miyim?](#soru-19)
  - [20. Sayfalar blok zincirinde mi saklanıyor?](#soru-20)
  - [21. Sözleşme işlemleri için ne tür veritabanları kullanılabilir?](#soru-21)
  - [22. Veritabanı tablosundaki verilere erişim nasıl yönetilir?](#soru-22)
  - [23. Bir ekosistemdeki bir uygulama, başka bir ekosistemdeki diğer uygulamalarla veri alışverişinde bulunabilir mi?](#soru-23)
  - [24. Yeni bir ekosistemdeki tüm uygulamalar sıfırdan mı yazılmalı?](#soru-24)
  - [25. Başvuruların çalışması için herhangi bir ücret var mı?](#soru-25)
  - [26. Uygulamaların çalışmasını kim ödüyor?](#soru-26)
  - [27. Ekosistemdeki uygulamalar güvenlik açıklarından kaynaklanan saldırılardan nasıl korunur?](#soru-27)
  - [28. Gelecekteki planlarda hangi yeni özellikler uygulanacak?](#soru-28)
  - [29. Çalışabilirliği nasıl kanıtlanır?](#soru-29)

### <span id = "soru-1">1. Lütfen kısaca IBAX'i tanımlayın?</span>

  * Verilere, arayüzlere ve akıllı sözleşmelere erişim haklarını yönetmek için çok seviyeli bir izin sistemine sahip entegre bir uygulama geliştirme ortamına dayalı dijital bir ekosistem oluşturmayı amaçlayan bir blok zinciri platformudur.

### <span id = "soru-2">2. IBax, Bitcoin, Ethereum veya diğer blok zincirleri için geçerli mi?</span>

  * Uygulanamaz. IBax, kendi orijinal blok zinciri temelinde inşa edilmiştir.

### <span id = "soru-3">3. IBax ile akıllı sözleşmeleri yürütmek için yerleşik mekanizmalara sahip diğer herkese açık blok zinciri platformları arasındaki temel farklar nelerdir?</span>

  * IBax, yukarıda bahsedilen blok zincirlerinde bulunamayan benzersiz özelliklere sahiptir:
    * tek bir istemci yazılımında entegre bir uygulama geliştirme ortamına sahiptir;
      * Sayfa tasarımı için özel şablon dili Logicor ve Needle sözleşme dili birbiriyle koordinelidir;
      * üyelere, rollere ve sözleşmelere izin verilebileceği verilere, arayüzlere ve akıllı sözleşmelere erişim haklarını yönetmek için çok seviyeli bir izin sistemine sahiptir;
      * kullanıcıların onlarla etkileşime girmesi için blok zinciri uygulamaları ve özerk yazılım ortamları oluşturmak için kullanılan ekosistem;
      * Hukuk sistemi, akıllı yasalarda (adanmış akıllı sözleşmeler) yazılmış bir kurallar dizisidir, platform kullanıcıları arasındaki ilişkiyi düzenler ve problem çözme için protokol parametrelerini değiştirme sürecini tanımlar.

### <span id = "soru-4">4. Kendi kripto para biriminiz var mı?</span>

  * Evet, IBax kendi belirteci IBXC'yi kullanır.

### <span id = "soru-5">5. Honor node nedir ve onu kim koruyabilir?</span>

  * Honor node, işlemleri doğrulama ve yeni bloklar oluşturma yetkisine sahip ağ düğümüdür.
  * Yeterli işlem gücüne ve hata toleransına sahip herhangi bir ağ düğümü, bir Honor node olabilir. IBax, bir Yetki Kanıtı (PoA) konsensüs mekanizması kullanır. Düğümler, ekosistem oylamasına dayalı doğrulama düğümleri haline gelebilir, ancak yalnızca platformun belirteç sahibi tarafından normal operasyonel yeteneklere sahip olduğu kanıtlanmış ekosistemler bu tür oylamaya katılabilir. Bu yetkilendirme algoritmasını kullanarak, ana düğüm, ağ operasyonunu sürdürmek onların çıkarına olduğu için büyük ekosistemler tarafından çalıştırılır.

### <span id = "soru-6">6. Platform ekosistemi nedir?</span>

  * Bir ekosistem aslında blok zinciri uygulamaları ve bu uygulamalardaki kullanıcıların işlemlerini oluşturmak için kullanılan özerk bir yazılım ortamıdır.

### <span id = "soru-7">7. Kimler ekosistem oluşturabilir?</span>

  * Platformun tüm kullanıcıları yeni ekosistemler oluşturabilir.

### <span id = "soru-8">8. Kullanıcılar nasıl ekosistemin üyesi olurlar?</span>

  * Kullanıcılar, mevcut herhangi bir ekosistemin üyesi olarak kaydedilebilir. Ekosistem stratejisi, yeni ekosistemin temel kamu bilgilerini özel bir ekosistem kataloğunda yayınlayan farklı üye kabul prosedürlerini tanımlar.

### <span id = "soru-9">9. Bir kullanıcı birden fazla ekosistem oluşturabilir mi?</span>

  * Evet, her kullanıcı istediği sayıda ekosistem oluşturabilir ve birden fazla ekosistemin üyesi olabilir.

### <span id = "soru-10">10. Platform uygulaması nedir?</span>

  * Bir uygulama, bir işlevi veya hizmeti uygulayan eksiksiz bir yazılım ürünüdür. Uygulama veritabanı tabloları, sözleşmeler ve sayfalardan oluşmaktadır.
### <span id = "soru-11">11. Uygulamayı oluşturmak için hangi programlama dili kullanılıyor?</span>
  * Sözleşme, platform ekibi tarafından geliştirilen Needle dilinde yazılmıştır, Daha fazla bilgi için bakınız: [Akıllı Sözleşme](../topics/script.md).

  * Sayfa, sayfa şablon dili olan Logicor dilinde yazılmıştır. Daha fazla bilgi için bkz.: [Şablon Dili](../topics/templates2.md).

### <span id = "soru-12">12. Uygulama oluşturmak ve kullanıcılarla etkileşim kurmak için hangi yazılımlar kullanılır?</span>

  * Uygulama programı Weaver'da yazılır ve yürütülür, başka bir yazılıma gerek yoktur.

### <span id = "soru-13">13. Platform sözleşmeleri, verilere erişmek için üçüncü taraf API'leri kullanabilir mi?</span>

  * Hayır, sözleşme yalnızca blok zincirinde depolanan verilere doğrudan erişebilir. [CLB](about-the-platform.md#virtual-private-ecosystem) harici veri kaynaklarını işlemek için kullanılır.

### <span id = "soru-14">14. Blok zincirinde saklanan sözleşme değiştirilebilir mi?</span>

  * Evet, sözleşme değiştirilebilir. Sözleşmeyi değiştirme izni, değiştirmeyi reddetme veya sözleşmelerde veya üyeler tarafından değişiklik yapma izni verebilen veya akıllı yasada karmaşık bir dizi koşul yapılandırabilen yaratıcısı tarafından belirlenir.
  * Weaver, sözleşmelerin tüm sürümlerine erişim sağlar.

### <span id = "soru-15">15. Akıllı yasa nedir?</span>

  * Akıllı hukuk, geleneksel sözleşmelerin işleyişini kontrol etmek ve kısıtlamak, böylece ekosistem üyelerinin faaliyetlerini kontrol etmek ve kısıtlamak için tasarlanmış bir sözleşmedir.
  * Bir dizi akıllı yasa, bir ekosistemin yasal sistemi olarak kabul edilebilir.

### <span id = "soru-16">16. Sözleşme, diğer sözleşmeleri çağırabilir ve yürütebilir mi?</span>

  * Evet, sözleşme doğrudan adresleme yoluyla diğer sözleşmeleri arayabilir ve bunun için parametreler sağlayabilir veya sözleşmeyi bağlantı adıyla çağırabilir. Daha fazla bilgi için bkz.: [Akıllı Sözleşme](../topics/script.md).

### <span id = "soru-17">17. Uygulama bir ana sözleşmeyle mi çalışıyor?</span>

  * Hayır, sözleşme, belirli işlevleri yerine getiren özerk bir program modülüdür. Her sözleşme, belirtilen verileri alacak, ardından bu verilerin doğruluğunu kontrol edecek ve veritabanına işlem olarak kaydedilen bazı işlemleri gerçekleştirecek şekilde yapılandırılır.

### <span id = "soru-18">18. Uygulama farklı diller için yerelleştirilebilir mi?</span>

  * Evet, Weaver'ın yerleşik bir yerelleştirme destek mekanizması vardır ve herhangi bir dilde sayfa oluşturabilir.

### <span id = "soru-19">19. Şablon dili kullanmadan sayfa oluşturabilir miyim?</span>

  * Evet, [RESTful API](../reference/api2.md) v2 platformu kullanılarak yapılabilir.

### <span id = "soru-20">20. Sayfalar blok zincirinde mi saklanıyor?</span>

  * Evet, sayfalar ve sözleşmeler blok zincirinde saklanır, bu da sahte olmalarını önler.

### <span id = "soru-21">21. Sözleşmeli işlemler için ne tür veritabanları kullanılabilir?</span>

  * Şu anda PostgreSQL kullanılmaktadır.

### <span id = "soru-22">22. Veritabanı tablosundaki verilere erişim nasıl yönetilir?</span>

  * Ekosistem üyeleri, roller veya belirtilen sözleşme yapılandırmaları için yeni alanlar, yeni girişler ekleyebilir veya sütunlardaki verilerin izinlerini değiştirebilirsiniz. Belirli işlemler gerçekleştirilerek oluşturulan sözleşmeler hariç.

### <span id = "soru-23">23. Bir ekosistemdeki bir uygulama, başka bir ekosistemdeki diğer uygulamalarla veri alışverişinde bulunabilir mi?</span>

  * Evet, veri alışverişi tüm ekosistemler için geçerli olan global veri tabloları aracılığıyla organize edilebilir.

### <span id = "soru-24">24. Yeni bir ekosistemdeki tüm uygulamalar sıfırdan mı yazılmalı?</span>

  * Hayır, her yeni ekosistemin kullanıma hazır bazı uygulamaları vardır:
      * Ekosistem üyelerini ve rollerini yönetmek için bir mekanizma;
      * Diğer belirteçleri yayınlamak ve yapılandırmak;
      * Bir oylama sistemi;
      * Bir bildirim sistemi;
      * Ekosistem üyeleri arasında bir haberci.

 Bu uygulamalar, herhangi bir ekosistemin özel ihtiyaçlarını karşılayacak şekilde düzenlenebilir ve yapılandırılabilir.

### <span id = "soru-25">25. Başvuruların çalışması için herhangi bir ücret var mı?</span>

  * Evet, honor node kaynaklarının kullanımı platformda ödeme yapılmasını gerektirir.

### <span id = "soru-26">26. Uygulamaların çalışması için kim ödeme yapar?</span>

 İlgili hesap adresleri için şu anda uygulamaların çalışması için ödeme yapmanın 4 yolu vardır:
  * Sözleşmeli arayanlar için, kullanıcı sözleşmeyi aradığında ücret varsayılan olarak kullanıcının hesabından ödenecektir;
  * Sözleşme bağlayıcı taraflar için ücret, sözleşmeyi oluşturan tarafından belirtilen bağlayıcı hesaptan ödenecektir;
  * Ekosistem oluşturucular için, bir ekosistem içindeki tüm uygulamaların ücreti sırasıyla ekosistem oluşturucu tarafından ödenecektir;

  * Özel ekosistem cüzdanı. Her ekosistemin özel bir hesabı vardır. Ekosistem yaratıcısı tarafından etkinleştirilirse, ekosistem içindeki tüm uygulamaların ücreti bu hesaptan ödenecektir.

 Ödeme önceliği sırası: Özel ekosistem cüzdanı> Ekosistem oluşturucu> Sözleşme bağlayıcı taraf> Sözleşme arayan.

### <span id = "soru-27">27. Ekosistemdeki uygulamaları güvenlik açıklarından kaynaklanan saldırılardan nasıl koruruz?</span>

  * Platform ekibi, özellikle uygulamanın herhangi bir kullanıcı tarafından yazılabileceği düşünüldüğünde, uygulama kodundaki hataları tamamen önlemenin bir yolu olmadığını da bilir. Bu nedenle, güvenlik açıklarından yararlanmanın sonuçlarını ortadan kaldıracak bir mekanizma kurmaya karar verdik. Hukuk sistemi, uygulamanın saldırı işlemini durdurabilir ve orijinal durumuna geri yüklemek için bazı işlemleri kullanabilir. Hukuk sistemi, bu tür sözleşmelerin akdedilmesine ilişkin izinleri ve bu izinlerin verilmesine ilişkin oylama prosedürlerini öngörmektedir.

### <span id = "soru-28">28. Gelecekteki planlarda hangi yeni özellikler uygulanacak?</span>

  * Görsel akıllı sözleşme tasarımcısı;


  * Hibrit veritabanları desteği (SQL ve NoSQL);

  * Farklı ekosistemlerden işlemlerin paralel çoklu iş parçacıklı işlenmesi;

  * İstemci üzerinde kaynak yoğun hesaplamalar yapın;

  * Ekosistem barındırma ve bilgi işlem güç değişimi;

  * Alt düğümler, sunucuda yalnızca bazı blokları depolar;

  * Platformdaki verilerin işleyişini birleştirmek için anlamsal referanslar (ontoloji) kullanılır.

### <span id = "soru-29">29. Çalışabilirliği nasıl kanıtlanır?</span>

  * IBax Ağı'nda bir dizi kavram kanıtı projeleri ve vakaları uygulanmıştır: sosyalleştirilmiş bir vergi tahsilatı ve elektronik fatura oluşturma ve dolaşım sistemi, tıbbi cihaz ve alet denetimi, sahteciliği önleme ve izleme sistemi, finansman ve denetim sistemi, oylama/anket sistemi, işletme kaydı, ticaret finansmanı araçları, varlık kaydı sözleşmesi yönetim sistemi vb.

# SSS {#faq}

  - [1. Lütfen kısaca IBAX'i tanımlayın?](#question-1)
  - [2. IBax Bitcoin, Ethereum veya diğer blok zincirleri için geçerli mi?](#question-2)
  - [3. IBax ile akıllı sözleşmeleri yürütmek için yerleşik mekanizmalara sahip diğer herkese açık blok zinciri platformları arasındaki temel farklar nelerdir?](#question-3)
  - [4. Kendi kripto paran var mı?](#question-4)
  - [5. Honor node nedir ve onu kim koruyabilir?](#question-5)
  - [6. Platform ekosistemi nedir?](#question-6)
  - [7. Kimler ekosistem oluşturabilir?](#question-7)
  - [8. Kullanıcılar nasıl ekosistemin üyesi olurlar?](#question-8)
  - [9. Bir kullanıcı birden fazla ekosistem oluşturabilir mi?](#question-9)
  - [10. Platform uygulaması nedir?](#question-10)
  - [11. Uygulamayı oluşturmak için hangi programlama dili kullanılıyor?](#question-11)
  - [12. Uygulama oluşturmak ve kullanıcılarla etkileşim kurmak için hangi yazılımlar kullanılıyor?](#question-12)
  - [13. Platform sözleşmeleri verilere erişmek için üçüncü taraf API'leri kullanabilir mi?](#question-13)
  - [14. Blok zincirinde saklanan sözleşme değiştirilebilir mi?](#question-14)
  - [15. Akıllı yasa nedir?](#question-15)
  - [16. Sözleşme diğer sözleşmeleri çağırabilir ve yürütebilir mi?](#question-16)
  - [17. Uygulama bir ana sözleşmeyle mi çalışıyor?](#question-17)
  - [18. Uygulama farklı diller için yerelleştirilebilir mi?](#question-18)
  - [19. Şablon dili kullanmadan sayfa oluşturabilir miyim?](#question-19)
  - [20. Sayfalar blok zincirinde mi saklanıyor?](#question-20)
  - [21. Sözleşme işlemleri için ne tür veritabanları kullanılabilir?](#question-21)
  - [22. Veritabanı tablosundaki verilere erişim nasıl yönetilir?](#question-22)
  - [23. Bir ekosistemdeki bir uygulama, başka bir ekosistemdeki diğer uygulamalarla veri alışverişinde bulunabilir mi?](#question-23)
  - [24. Yeni bir ekosistemdeki tüm uygulamalar sıfırdan mı yazılmalı?](#question-24)
  - [25. Başvuruların çalışması için herhangi bir ücret var mı?](#question-25)
  - [26. Uygulamaların çalışmasını kim ödüyor?](#question-26)
  - [27. Ekosistemdeki uygulamalar güvenlik açıklarından kaynaklanan saldırılardan nasıl korunur?](#question-27)
  - [28. Gelecekteki planlarda hangi yeni özellikler uygulanacak?](#question-28)
  - [29. Çalışabilirliği nasıl kanıtlanır?](#question-29)

## 1. Lütfen kısaca IBAX'i tanımlayın? {#question-1}

  * Verilere, arayüzlere ve akıllı sözleşmelere erişim haklarını yönetmek için çok seviyeli bir izin sistemine sahip entegre bir uygulama geliştirme ortamına dayalı dijital bir ekosistem oluşturmayı amaçlayan bir blok zinciri platformudur.

## 2. IBax, Bitcoin, Ethereum veya diğer blok zincirleri için geçerli mi? {#question-2}

  * Uygulanamaz. IBax, kendi orijinal blok zinciri temelinde inşa edilmiştir.

## 3. IBax ile akıllı sözleşmeleri yürütmek için yerleşik mekanizmalara sahip diğer herkese açık blok zinciri platformları arasındaki temel farklar nelerdir? {#question-3}

  * IBax, yukarıda bahsedilen blok zincirlerinde bulunamayan benzersiz özelliklere sahiptir:
    * tek bir istemci yazılımında entegre bir uygulama geliştirme ortamına sahiptir;
      * Sayfa tasarımı için özel şablon dili Logicor ve Needle sözleşme dili birbiriyle koordinelidir;
      * üyelere, rollere ve sözleşmelere izin verilebileceği verilere, arayüzlere ve akıllı sözleşmelere erişim haklarını yönetmek için çok seviyeli bir izin sistemine sahiptir;
      * kullanıcıların onlarla etkileşime girmesi için blok zinciri uygulamaları ve özerk yazılım ortamları oluşturmak için kullanılan ekosistem;
      * Hukuk sistemi, akıllı yasalarda (adanmış akıllı sözleşmeler) yazılmış bir kurallar dizisidir, platform kullanıcıları arasındaki ilişkiyi düzenler ve problem çözme için protokol parametrelerini değiştirme sürecini tanımlar.

## 4. Kendi kripto para biriminiz var mı? {#question-4}

  * Evet, IBax kendi belirteci IBXC'yi kullanır.

## 5. Honor node nedir ve onu kim koruyabilir? {#question-5}

  * Honor node, işlemleri doğrulama ve yeni bloklar oluşturma yetkisine sahip ağ düğümüdür.
  * Yeterli işlem gücüne ve hata toleransına sahip herhangi bir ağ düğümü, bir Honor node olabilir. IBax, bir Yetki Kanıtı (PoA) konsensüs mekanizması kullanır. Düğümler, ekosistem oylamasına dayalı doğrulama düğümleri haline gelebilir, ancak yalnızca platformun belirteç sahibi tarafından normal operasyonel yeteneklere sahip olduğu kanıtlanmış ekosistemler bu tür oylamaya katılabilir. Bu yetkilendirme algoritmasını kullanarak, ana düğüm, ağ operasyonunu sürdürmek onların çıkarına olduğu için büyük ekosistemler tarafından çalıştırılır.

## 6. Platform ekosistemi nedir? {#question-6}

  * Bir ekosistem aslında blok zinciri uygulamaları ve bu uygulamalardaki kullanıcıların işlemlerini oluşturmak için kullanılan özerk bir yazılım ortamıdır.

## 7. Kimler ekosistem oluşturabilir? {#question-7}

  * Platformun tüm kullanıcıları yeni ekosistemler oluşturabilir.

## 8. Kullanıcılar nasıl ekosistemin üyesi olurlar? {#question-8}

  * Kullanıcılar, mevcut herhangi bir ekosistemin üyesi olarak kaydedilebilir. Ekosistem stratejisi, yeni ekosistemin temel kamu bilgilerini özel bir ekosistem kataloğunda yayınlayan farklı üye kabul prosedürlerini tanımlar.

## 9. Bir kullanıcı birden fazla ekosistem oluşturabilir mi? {#question-9}

  * Evet, her kullanıcı istediği sayıda ekosistem oluşturabilir ve birden fazla ekosistemin üyesi olabilir.

## 10. Platform uygulaması nedir? {#question-10}

  * Bir uygulama, bir işlevi veya hizmeti uygulayan eksiksiz bir yazılım ürünüdür. Uygulama veritabanı tabloları, sözleşmeler ve sayfalardan oluşmaktadır.
## 11. Uygulamayı oluşturmak için hangi programlama dili kullanılıyor? {#question-11}
  * Sözleşme, platform ekibi tarafından geliştirilen Needle dilinde yazılmıştır, Daha fazla bilgi için bakınız: [Akıllı Sözleşme](../topics/script.md).

  * Sayfa, sayfa şablon dili olan Logicor dilinde yazılmıştır. Daha fazla bilgi için bkz.: [Şablon Dili](../topics/templates2.md).

## 12. Uygulama oluşturmak ve kullanıcılarla etkileşim kurmak için hangi yazılımlar kullanılır? {#question-12}

  * Uygulama programı Weaver'da yazılır ve yürütülür, başka bir yazılıma gerek yoktur.

## 13. Platform sözleşmeleri, verilere erişmek için üçüncü taraf API'leri kullanabilir mi? {#question-13}

  * Hayır, sözleşme yalnızca blok zincirinde depolanan verilere doğrudan erişebilir. [CLB](about-the-platform.md#virtual-private-ecosystem) harici veri kaynaklarını işlemek için kullanılır.

## 14. Blok zincirinde saklanan sözleşme değiştirilebilir mi? {#question-14}

  * Evet, sözleşme değiştirilebilir. Sözleşmeyi değiştirme izni, değiştirmeyi reddetme veya sözleşmelerde veya üyeler tarafından değişiklik yapma izni verebilen veya akıllı yasada karmaşık bir dizi koşul yapılandırabilen yaratıcısı tarafından belirlenir.
  * Weaver, sözleşmelerin tüm sürümlerine erişim sağlar.

## 15. Akıllı yasa nedir? {#question-15}

  * Akıllı hukuk, geleneksel sözleşmelerin işleyişini kontrol etmek ve kısıtlamak, böylece ekosistem üyelerinin faaliyetlerini kontrol etmek ve kısıtlamak için tasarlanmış bir sözleşmedir.
  * Bir dizi akıllı yasa, bir ekosistemin yasal sistemi olarak kabul edilebilir.

## 16. Sözleşme, diğer sözleşmeleri çağırabilir ve yürütebilir mi? {#question-16}

  * Evet, sözleşme doğrudan adresleme yoluyla diğer sözleşmeleri arayabilir ve bunun için parametreler sağlayabilir veya sözleşmeyi bağlantı adıyla çağırabilir. Daha fazla bilgi için bkz.: [Akıllı Sözleşme](../topics/script.md).

## 17. Uygulama bir ana sözleşmeyle mi çalışıyor? {#question-17}

  * Hayır, sözleşme, belirli işlevleri yerine getiren özerk bir program modülüdür. Her sözleşme, belirtilen verileri alacak, ardından bu verilerin doğruluğunu kontrol edecek ve veritabanına işlem olarak kaydedilen bazı işlemleri gerçekleştirecek şekilde yapılandırılır.

## 18. Uygulama farklı diller için yerelleştirilebilir mi? {#question-18}

  * Evet, Weaver'ın yerleşik bir yerelleştirme destek mekanizması vardır ve herhangi bir dilde sayfa oluşturabilir.

## 19. Şablon dili kullanmadan sayfa oluşturabilir miyim? {#question-19}

  * Evet, [RESTful API](../reference/api2.md) v2 platformu kullanılarak yapılabilir.

## 20. Sayfalar blok zincirinde mi saklanıyor? {#question-20}

  * Evet, sayfalar ve sözleşmeler blok zincirinde saklanır, bu da sahte olmalarını önler.

## 21. Sözleşmeli işlemler için ne tür veritabanları kullanılabilir? {#question-21}

  * Şu anda PostgreSQL kullanılmaktadır.

## 22. Veritabanı tablosundaki verilere erişim nasıl yönetilir? {#question-22}

  * Ekosistem üyeleri, roller veya belirtilen sözleşme yapılandırmaları için yeni alanlar, yeni girişler ekleyebilir veya sütunlardaki verilerin izinlerini değiştirebilirsiniz. Belirli işlemler gerçekleştirilerek oluşturulan sözleşmeler hariç.

## 23. Bir ekosistemdeki bir uygulama, başka bir ekosistemdeki diğer uygulamalarla veri alışverişinde bulunabilir mi? {#question-23}

  * Evet, veri alışverişi tüm ekosistemler için geçerli olan global veri tabloları aracılığıyla organize edilebilir.

## 24. Yeni bir ekosistemdeki tüm uygulamalar sıfırdan mı yazılmalı? {#question-24}

  * Hayır, her yeni ekosistemin kullanıma hazır bazı uygulamaları vardır:
      * Ekosistem üyelerini ve rollerini yönetmek için bir mekanizma;
      * Diğer belirteçleri yayınlamak ve yapılandırmak;
      * Bir oylama sistemi;
      * Bir bildirim sistemi;
      * Ekosistem üyeleri arasında bir haberci.

 Bu uygulamalar, herhangi bir ekosistemin özel ihtiyaçlarını karşılayacak şekilde düzenlenebilir ve yapılandırılabilir.

## 25. Başvuruların çalışması için herhangi bir ücret var mı? {#question-25}

  * Evet, honor node kaynaklarının kullanımı platformda ödeme yapılmasını gerektirir.

## 26. Uygulamaların çalışması için kim ödeme yapar? {#question-26}

 İlgili hesap adresleri için şu anda uygulamaların çalışması için ödeme yapmanın 4 yolu vardır:
  * Sözleşmeli arayanlar için, kullanıcı sözleşmeyi aradığında ücret varsayılan olarak kullanıcının hesabından ödenecektir;
  * Sözleşme bağlayıcı taraflar için ücret, sözleşmeyi oluşturan tarafından belirtilen bağlayıcı hesaptan ödenecektir;
  * Ekosistem oluşturucular için, bir ekosistem içindeki tüm uygulamaların ücreti sırasıyla ekosistem oluşturucu tarafından ödenecektir;

  * Özel ekosistem cüzdanı. Her ekosistemin özel bir hesabı vardır. Ekosistem yaratıcısı tarafından etkinleştirilirse, ekosistem içindeki tüm uygulamaların ücreti bu hesaptan ödenecektir.

 Ödeme önceliği sırası: Özel ekosistem cüzdanı> Ekosistem oluşturucu> Sözleşme bağlayıcı taraf> Sözleşme arayan.

## 27. Ekosistemdeki uygulamaları güvenlik açıklarından kaynaklanan saldırılardan nasıl koruruz? {#question-27}

  * Platform ekibi, özellikle uygulamanın herhangi bir kullanıcı tarafından yazılabileceği düşünüldüğünde, uygulama kodundaki hataları tamamen önlemenin bir yolu olmadığını da bilir. Bu nedenle, güvenlik açıklarından yararlanmanın sonuçlarını ortadan kaldıracak bir mekanizma kurmaya karar verdik. Hukuk sistemi, uygulamanın saldırı işlemini durdurabilir ve orijinal durumuna geri yüklemek için bazı işlemleri kullanabilir. Hukuk sistemi, bu tür sözleşmelerin akdedilmesine ilişkin izinleri ve bu izinlerin verilmesine ilişkin oylama prosedürlerini öngörmektedir.

## 28. Gelecekteki planlarda hangi yeni özellikler uygulanacak? {#question-28}

  * Görsel akıllı sözleşme tasarımcısı;


  * Hibrit veritabanları desteği (SQL ve NoSQL);

  * Farklı ekosistemlerden işlemlerin paralel çoklu iş parçacıklı işlenmesi;

  * İstemci üzerinde kaynak yoğun hesaplamalar yapın;

  * Ekosistem barındırma ve bilgi işlem güç değişimi;

  * Alt düğümler, sunucuda yalnızca bazı blokları depolar;

  * Platformdaki verilerin işleyişini birleştirmek için anlamsal referanslar (ontoloji) kullanılır.

## 29. Çalışabilirliği nasıl kanıtlanır? {#question-29}

  * IBax Ağı'nda bir dizi kavram kanıtı projeleri ve vakaları uygulanmıştır: sosyalleştirilmiş bir vergi tahsilatı ve elektronik fatura oluşturma ve dolaşım sistemi, tıbbi cihaz ve alet denetimi, sahteciliği önleme ve izleme sistemi, finansman ve denetim sistemi, oylama/anket sistemi, işletme kaydı, ticaret finansmanı araçları, varlık kaydı sözleşmesi yönetim sistemi vb.
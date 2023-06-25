# The IBAX Network {#the-ibax-network}

Bu bölümde size IBAX'ın nasıl kullanılacağını anlatacağız.

- [The IBAX Network](#the-ibax-network)
  - [Uygulama geliştiricileri](#application-developers)
  - [ECOLIB üyeleri](#ecolib-members)
  - [ECOLIB uygulamalar ve platform uygulamaları](#ecolib-applications-and-platform-applications)
  - [Temel model](#underlying-model)
  - [Uygulama](#implementation)






IBAX'teki uygulamaların geliştirilmesi, kullanımı veya yönetimi ile ilgileniyorsanız, bunu hiç anlamanız gerekmeyebilir.

IBAX'te blok zinciri ve blok zinciri ağı, ECOLIB üyelerinden, yöneticilerinden ve uygulama geliştiricilerinden gizlenmiştir. IBAX, tüm kullanıcı grupları için blok zincirinin **küresel durumuna** kurcalanmaya karşı korumalı ve dağıtılmış erişim sağlayan [RESTful API](../reference/api2.md) sunar.

## Uygulama geliştiricileri {#application-developers}

Teknik terimlerle, **küresel durum**, IBAX'ın veri tabanı aracılığıyla uygulanan bir dizi veridir. Uygulama geliştiricilerin bakış açısından, bir uygulama tabloları sorgulayarak, ekleyerek ve güncelleyerek veritabanı ile etkileşime girer.

IBAX'te işlemler, çeşitli sözleşmeler uygulanarak blok zincirine yazılır. Bu işlemler, küresel durumu (veritabanı) buna göre güncelleyecek olan blok zinciri ağ düğümleri tarafından uygulanan sözleşme kodlarını arayacaktır.

Uygulama geliştiricileri için sözleşme, uygulandığında verilerin veritabanına yazılacağı bir işlevdir. Sayfalar komut dosyaları gibidir ve sayfa kodu bir dizi sayfa [şablon](../topics/templates2.md) işlevidir, bu işlevlerden bazıları sayfa öğelerini görüntülerken, diğer veriler veritabanından gelir. Uygulama geliştiricilerin işlemlerin, blok oluşturma ve konsensüs algoritmalarının ne olduğunu anlamalarına gerek yok, sadece kullanın.

## ECOLIB üyeleri {#ecolib-members}

Geliştiriciler tarafından yazılan uygulamalar, [ECOLIB](thesaurus.md#ecolib) adlı bir ortamda çalışır. Bir uygulama genellikle belirli bir amaca hizmet eder ve diğer birkaç uygulamayla birlikte çeşitli görevleri tamamlar.

Bir kullanıcı, içindeki uygulamalara erişmek istiyorsa bir ECOLIB'ye üye olmalıdır ve aynı anda birden fazla farklı ECOLIB'ye üye olabilir.

ECOLIB üyeleri, ortak bir web uygulamasındaki formları doldurmak, düğmelere tıklamak ve sayfalarda gezinmek gibi, uygulama sayfalarından veri tabanını görüntüleyebilir ve değiştirebilir.

## ECOLIB uygulamaları ve platform uygulamaları {#ecolib-applications-and-platform-applications}

Başvurular **ECOLIB uygulamaları** ve **platform uygulamaları** olarak ayrılabilir.

ECOLIB uygulamaları

Bir ECOLIB uygulaması, bir ECOLIB'nin belirli benzersiz işlevlerini veya iş süreçlerini uygular, ancak yalnızca o ECOLIB'de mevcuttur.
Platform uygulamaları

Tüm ECOLIB'ler için bir platform uygulaması geçerlidir. Herhangi bir uygulama bir platform uygulaması olarak geliştirilebilir. IBAX geliştiricileri, oylama, bildirim ve ECOLIB üye rol yönetimi gibi ECOLIB yönetişimi için temel işlevleri destekleyen platform uygulamaları sağlayacaktır.

## Temel model {#underlying-model}

katmanların tanımı

IBAX birkaç katmandan oluşur:

* Kullanıcı etkileşimi katmanı

    ECOLIB üyeleri, sayfalar ve sayfa öğeleri aracılığıyla uygulama ile etkileşime girer.

* Uygulama katmanı

    Uygulama geliştiricileri, sözleşme kodları ve sayfa kodları aracılığıyla küresel durumla (veri tabloları) etkileşime girer.

* Küresel durum katmanı

    Dağıtılmış deftere (blockchain) yazılan işlemlere dayalı olarak küresel durumu (veritabanı) güncelleyin ve senkronize edin
* Blok zinciri katmanı

    Dağıtılmış defteri yeni bloklarla güncelleyin. Yeni bloklarda kaydedilen işlemler (işlemler) global durumda gerçekleştirilmelidir.

* Düğüm ağ katmanı

    Düğüm ağında işlemleri dağıtan, doğrulayan ve yeni bloklar oluşturan IBAX Ağı protokolünü uyguladı. Benzer şekilde, yeni bloklar düğüm ağı tarafından dağıtılır ve doğrulanır.

    Tüm düğümlerin dağıtılmış defteri senkronize tutulur. Bir düğümde çakışmalar varsa, düğüm hangi blok zincirlerinin geçerli kabul edildiğini belirleyecek ve geçersiz blok zincirleri buna göre geri alınacaktır.

* İşlem katmanı

    İşlemler, blokların ve blok zinciri protokollerinin oluşturulmasının temelidir ve işlemlerin kendisi, kullanıcı etkileşimi katmanında gerçekleştirilen işlemlerin sonuçlarıdır. İşlemler Weaver tarafından oluşturulur.

    Bir kullanıcı veya geliştirici, bir sayfadaki bir düğmeyi tıklamak veya kod düzenleyiciden bir sözleşme uygulamak gibi bir işlem gerçekleştirdiğinde, Weaver bu işlemi bir işleme dönüştürecek ve kendisine bağlı ağ düğümüne gönderecektir.

Bu nedenle, işlem akışı aşağıdaki gibidir:

  * Bir kullanıcı sayfasındaki bir kullanıcı işlemi, bir işleme dönüşecektir;
  * İşlem bir blokta bulunur;

  * Blok, blok zincirine dahildir;

  * İşlem değişikliği, blok zincirinin küresel durumunun değişmesine neden olacak ve bu işlem veritabanına uygulanacaktır;

  * Herhangi bir veritabanı değişikliği uygulamaya yansıtılacaktır.

## Uygulama {#implementation}

IBAX'in iki ana bileşeni vardır, yani sunucu [go-ibax](https://github.com/IBAX-io/go-ibax) ve Weaver [Kaynak kodu](https://github.com/IBAX-io/weaver ).

dokumacı:
  * Kullanıcı sayfalarının sağlanması;
  * Uygulama geliştirme için IDE sağlanması;
  * Kullanıcı hesaplarının açık anahtarlarının saklanması ve yetkilendirme yapılması;
  * Uygulama sayfalarından veri tabanı verilerini talep etme ve uygulama sayfalarını kullanıcılara gösterme;
  * İşlemleri [REST API'leri](../reference/api2.md) üzerinden sunucuya gönderme;

      Kullanıcı işlemlerine karşı otomatik olarak işlemler oluşturmak için, uygulama geliştiricileri IDE'den bir sözleşme uyguladığında Weaver bu işlemleri işlemlere dönüştürecektir.

sunucu:
  * Düğümün global durumunu (veritabanı) tutmak;
  * Blok zinciri protokolünün uygulanması;
  * IBAX [Sanal Makinede](../topics/vm.md) sözleşme kodlarının uygulanması;
  * [Şablon Motorunda](../topics/templates2.md) sayfa kodlarının uygulanması;
  * [RESTful API](../reference/api2.md) uygulaması.
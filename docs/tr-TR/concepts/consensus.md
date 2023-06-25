
# Decentralized Proof-of-Authority Consensus {#decentralized-proof-of-authority-consensus}

* Merkezi Olmayan Yetki Kanıtı fikir birliği nedir

* DPoA konsensüsünün avantajları

* DPoA konsensüsü ve ortak saldırı araçları

* IBAX'te DPoA konsensüsünün uygulanması

Bu bölümde, Merkezi Olmayan Yetki Kanıtı fikir birliğini ve bunun IBAX'teki uygulamasını açıklayacağız.


 - [Decentralized Proof-of-Authority Consensus nedir?](#what-is-decentralized-proof-of-authority-consensus)
  - [DPoA fikir birliğinin avantajları](#advantages-of-dpoa-consensus)
  - [DPoA fikir birliği ve ortak saldırı araçları](#dpoa-consensus-and-common-means-of-attack)
    - [DoS](#dos)
    - [51 yüzde saldırı](#percent-attack-51)
  - [IBAX'te DPoA konsensüsünün uygulanması](#implementation-of-dpoa-consensus-in-ibax)
    - [Honor node](#honor-node)
    - [Leader node](#leader-node)
    - [Yeni blokların oluşturulması](#generation-of-new-blocks)
    - [Forks](#forks)

## Decentralized Proof-of-Authority Consensus nedir? {#what-is-decentralized-proof-of-authority-consensus}

Ticari uygulama senaryolarını ve gerçek dünya ortamlarını göz önünde bulunduran IBAX Ağı, yeni bir fikir birliği mekanizması olan DPoA (Merkezi Olmayan Yetki Kanıtı) oluşturmuştur.

Ademi merkeziyetçilik her zaman kesin inancımız olmuştur. Yalnızca IBAX'in altyapı ağ ortamını ifade etmez. Bunun yerine, IBAX Ağı'nda oluşturulan her ecoLib'de ademi merkeziyetçiliğin kök salmasına izin vereceğiz ve her birinde yüksek derecede öz yönetim elde etmek için teknik çözümler kullanacağız. Yüksek oranda dağıtılmış öz-yönetim amacıyla, genel mimaride ve teknik uygulamada birçok değişiklik yaptık. Ancak pratikte merkezi yönetim anlayışından kaçamayız. Merkezileşme ve ademi merkeziyetçilik arasında bir denge bulmak için DPoA konsensüs mekanizmasına ek olarak belirli ödül ve teşvik programları da oluşturduk.

IBAX Ağı, dağıtımı, zayıf merkezileştirmeyi ve bir sertifika yetkilisini birleştiren yeni bir fikir birliği mekanizması yarattı. Biz buna DPoA (Merkezi Olmayan Yetki Kanıtı) diyoruz. Tüm IBAX Ağı için sürekliliği sağlamak için, fikir birliği yalnızca IBAX Kamu Ağı'nı değil, aynı zamanda her kullanıcı ve kullanıcı grubu tarafından oluşturulan ecoLib'leri de kapsar. Bu, gerçekten kendi kendini yöneten, merkezi olmayan, adil, şeffaf ve dolandırıcılığa karşı dayanıklı bir Merkezi Olmayan Otonom Organizasyon (DAO) yaratır.

DPoA, ağ saldırılarına karşı bir önleme mekanizmasına sahiptir ve ağı koruyan ve yeni IBXC paraları basan Darphane Düğümlerinin oluşturulmasına izin verir. IBAXCoin sahipleri, IBXC likidite bakiyelerinin bir kısmını Mint & Stake Emission Rewards için Mint Nodes'ta stake edebilirler. Darphane ve staking, saldırıların maliyetini ve zorluğunu artırmaya ve IBXC madeni paralarının toplam değerini orantılı olarak artırmaya hizmet eder. Bu mekanizma ile herhangi bir saldırının olasılığı ve zararı sonsuz derecede sıfıra yakındır.

## DPoA fikir birliğinin avantajları {#advantages-of-dpoa-consensus}

İş Kanıtı (PoW) veya Hisse Kanıtı (PoS) konsensüsü ile karşılaştırıldığında, DPoA konsensüsü aşağıdaki avantajlara sahiptir:

* Yüksek performanslı donanıma ihtiyaç duymaz. PoW konsensüsüyle karşılaştırıldığında, DPoA konsensüsünü uygulayan düğümler, karmaşık matematiksel mantık görevlerini çözmek için hesaplama kaynakları harcamaz;

* Yeni bloklar oluşturmak için zaman aralığı tahmin edilebilir, ancak PoW ve PoS fikir birliği için bu farklıdır;

* Yüksek işlem oranı. Bloklar, işlem doğrulama hızını artıran yetkili ağ düğümleri tarafından belirli bir zaman aralığında bir sırayla oluşturulur.

* Düğümlerin %51'inin güvenliği ihlal edilmediği sürece, güvenliği ihlal edilmiş ve kötü niyetli düğümlere karşı tolerans. IBAX, düğümleri yasaklayan ve blok oluşturma haklarını iptal eden bir mekanizma uygular.

## DPoA fikir birliği ve ortak saldırı araçları {#dpoa-consensus-and-common-means-of-attack}

### DoS {#dos}

Saldırgan, ağdaki hedeflenen bir düğüme büyük miktarda işlem ve blok göndererek, çalışmasını kesintiye uğratmaya ve hizmetlerini kullanılamaz hale getirmeye çalışabilir.

DPoA mekanizmasını DoS saldırılarına karşı savunmak mümkündür:

* Ağ düğümleri önceden doğrulanmış olduğundan, blok oluşturma hakları yalnızca DoS saldırılarına dayanabilen düğümlere verilebilir.

* Bir onur düğümü belirli bir süre için kullanılamıyorsa, onur düğümleri listesinden çıkarılabilir.

### yüzde 51 saldırı {#percent-attack-51}

DPoA fikir birliği senaryosuna göre, %51 saldırısı, bir saldırganın ağ düğümlerinin %51'inin kontrolünü ele geçirmesini gerektirir. Ancak, bir saldırganın ağ hesaplama gücünün %51'ini elde etmesi gereken PoW fikir birliği senaryosu farklıdır. İzin verilen bir blok zinciri ağındaki düğümler üzerinde kontrolü elde etmek, hesaplama gücünü elde etmekten çok daha zordur.

Örneğin, PoW konsensüsünü uygulayan bir ağda, bir saldırgan, kontrollü ağ segmentinin hesaplama gücünü (performansını) artırabilir ve böylece kontrollü düğümlerin yüzdesini artırabilir. Bu, DPoA konsensüsü için bir anlam ifade etmiyor, çünkü düğümün hesaplama gücünün blok zinciri ağ kararları üzerinde hiçbir etkisi yok.

## IBAX'te DPoA konsensüsünün uygulanması {#implementation-of-dpoa-consensus-in-ibax}

### Honor node {#honor-node}

IBAX'te yalnızca honor nodeları, blok zinciri ağını ve dağıtılmış defteri tutan yeni bloklar oluşturabilir.

Onur düğümlerinin listesi, blok zinciri kayıt defterinde tutulur. Düğümlerin sırası, düğümlerin yeni bloklar oluşturma sırasını belirler.

### Leader node {#leader-node}

Aşağıdaki formül, mevcut **leadernode**, yani mevcut zamanda yeni bir blok oluşturması gereken bir düğümü belirler.

```
lider = ((zaman - ilk) / adım) % düğüm
```

> lider

Mevcut lider düğümü.

> zaman

Geçerli saat (UNIX).

> ilk

İlk blok oluşturma süresi (UNIX).

> adım

Blok oluşturma aralığındaki saniye sayısı.

> düğümler

Toplam honor node sayısı.

### Yeni blokların oluşturulması {#generation-of-new-blocks}

Yeni bloklar, geçerli zaman aralığının bir [leader node](#leader-node) tarafından oluşturulur. Her zaman aralığında lider rolü, onur düğümleri listesinden bir sonraki onur düğümüne iletilir.

![avatar](/block-generation.png)

a) Yeni blokların çocukları için

Yeni bir blok oluşturmak için ana yetiştirme durumumuz:

1. Düğümün işindeki tüm yeni işlemler toplar;

2. İşlemleri tek tek. Geçersiz veya yürütülemez sahipleri reddedilir;

3. [blok oluşturma sınırlarının](../reference/platform-parameters.md#configure-the-generation-of-blocks) uyumlu olup olmadığını kontrol eder;

4. Geçerli işlemlere sahip bir blok oluşturur ve bunu ECDSA algoritması aracılığıyla honor node özel anahtarıyla imzalar;

5. Bu bloğu diğer onur düğümlerine gönderir.

b) Yeni blokların doğrulanması

Diğer onur düğümlerinde yeni blokları doğrulama adımları:

1.Yeni bir blok alın ve şunları doğrulayın:

    – yeni bloğun geçerli bir aralığın leader node tarafından oluşturulup oluşturulmadığı;

    – geçerli bir aralığın leader node tarafından oluşturulan başka blok olup olmadığı;

    – yeni bloğun uygun şekilde imzalanıp imzalanmadığı.

2. Bloktan işlemleri tek tek gerçekleştirin. İşlemlerin başarılı bir şekilde ve [blok oluşturma sınırları](../reference/platform-parameters.md#configure-the-generasyon-of-blocks) dahilinde yürütülüp yürütülmediğini kontrol edin.

3. Önceki adıma bağlı olarak bloğu ekleyin veya reddedin:

    – Blok doğrulama başarılıysa, yeni bloğu mevcut düğümün blok zincirine ekleyin;

    – Blok doğrulama başarısız olursa, bloğu reddedin ve bir **hatalı blok** işlemi gönderin;

    – Bu geçersiz bloğu oluşturan onur düğümü hatalı bloklar oluşturmaya devam ederse, yasaklanabilir veya honor nodeları listesinden çıkarılabilir.

### Forks {#forks}

Bir **fork**, blok zincirinin geri kalanından bağımsız olarak oluşturulmuş bir veya daha fazla blok içeren alternatif bir blok zinciri sürümüdür.

Çatallar genellikle ağın bir kısmı senkronize olmadığında meydana gelir. Muhtemelen çatallanmalara neden olan faktörler, yüksek ağ gecikmesi, kasıtlı veya kasıtsız zaman sınırı ihlali, düğümlerde zaman senkronizasyonu bozulmasıdır. Ağ düğümlerinin önemli bir coğrafi dağılımı varsa, blok oluşturma aralığı artırılmalıdır.

Çatallar, en uzun blok zinciri kuralı izlenerek çözülür. İki blok zinciri sürümü algılandığında, onur düğümleri daha kısa olanı geri alır ve daha uzun olanı kabul eder.

![avatar](/block-fork-resolution.png)
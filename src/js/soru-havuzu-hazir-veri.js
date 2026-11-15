/* ============================================================
   SORU HAVUZU HAZIR VERISI (gercek sinav evraklari - kullanicinin
   kendi hazirladigi, Word belgesi olarak paylastigi 9/10/11/12. sinif
   sinav sorulari + cevap anahtarlari)
   ------------------------------------------------------------
   Bu dosya, Sinav Havuzu > Soru Havuzu'nu bir kerelik doldurmak icin
   model.js icindeki normalizeState()'teki soruHavuzuHazirYuklendi
   migrasyonu tarafindan okunur. Her kayit dersAdi + sinifGrade ile
   kullanicinin GERCEK S.courses/S.classes listesine eslestirilir
   (sabit id degil, isim+sinif eslesmesi) - bu yuzden kullanicinin
   ders/sinif listesi demo veriden farkli olsa da dogru calisir.
   Eslesen ders bulunamazsa o dersin sorulari sessizce atlanir;
   migrasyon tek seferliktir, tekrar calismaz.
   ============================================================ */
const SORU_HAVUZU_HAZIR_VERI = [
  {
    "dersAdi": "İmalat Yöntemleri",
    "sinifGrade": 10,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Kare kesitli bir parça ile silindirik (yuvarlak) bir parça torna tezgâhına bağlanacak. Her biri için hangi ayna türü kullanılır?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kare kesitli parça için mengeneli (dört ayaklı) ayna kullanılır. Silindirik parça için üniversal (üç ayaklı) ayna kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir deliğin iç çapını ölçmek için kumpasın hangi kısmı kullanılır? Bir dış çapı çok hassas (binde bir mm) ölçmek gerekiyorsa kumpas mı mikrometre mi tercih edilir? Neden?",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Deliğin iç çapını ölçmek için kumpasın iç çap çeneleri kullanılır. Çok hassas ölçüm gerektiğinde mikrometre tercih edilir çünkü mikrometre kumpasa göre çok daha ince (binde bir mm) farkları ölçebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "M12 vida açılacak, adımı P = 1,75 mm'dir. Diş yüksekliği formülü h3 = 0,61343 × P olduğuna göre bu vidanın diş yüksekliğini hesaplayınız.",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "h3 = 0,61343 × 1,75 ≈ 1,07 mm. Bu vidanın diş yüksekliği yaklaşık 1,07 mm'dir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir cıvata-somun bağlantısında hangi vida türü (üçgen/kare/trapez) tercih edilir? Bir kriko mekanizmasında kuvvet iletmek için hangisi tercih edilir?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Cıvata-somun bağlantısında üçgen vida tercih edilir çünkü sıkma işlemini iyi yapar. Kriko mekanizmasında kuvvet iletmek için kare veya trapez vida tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Normal adımı 1 mm olan bir vida, 4 ağızlı olarak açılacaktır. Ph (çok ağızlı vida adımı) kaç mm olur? Bu hesabı nasıl yaptığınızı gösteriniz.",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Ph = 1 × 4 = 4 mm olur. Çok ağızlı vidada mil bir tur döndüğünde birden fazla diş birden ilerlediği için ilerleme miktarı adımın ağız sayısı katı kadar olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Vida açarken kullanılan kalemin ucundaki açıya ne denir? Metrik vidalarda bu açı kaç derecedir?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Bu açıya uç açısı denir, metrik vidalarda 60°'dir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze tezgâhında delme yaparken hangi kesici takım kullanılır? Bu kesici tezgâh miline hangi aparatlarla bağlanır?",
        "puan": 15,
        "konu": "Freze – Delme",
        "cevapAnahtari": "Freze tezgâhında delme için matkap kullanılır. Matkap, tezgâh miline mandren veya pens gibi bağlama aparatlarıyla bağlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mil üzerine takılacak kasnağın milin üzerinde dönmesini (kaymasını) önlemek için hangi işlem yapılır? Bu işlem yapılmazsa ne olur?",
        "puan": 10,
        "konu": "Freze – Kama Kanalı",
        "cevapAnahtari": "Kama kanalı açma işlemi yapılır. Bu işlem, mil ile üzerine takılan parçanın (kasnak, dişli vb.) birlikte dönmesini sağlar. Kama kanalı açılmazsa kasnak milin üzerinde boşta döner ve güç/hareket iletilemez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçaya önce küçük çapta, sonra daha büyük çapta matkapla delik açılırsa (aynı delikte farklı çaplar oluşturulursa) bu işleme ne denir?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Bu işleme kademeli delik delme denir. Aynı delikte farklı çaplarda kademeler oluşturulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mili torna aynasına bağladıktan sonra komparatörle salgısını (merkezden kaçıklığını) kontrol ediyoruz. Salgı çok fazla çıkarsa iş parçasında ne gibi bir sorun yaşanır?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Salgı, parçanın döndüğünde merkezden ne kadar kaçık olduğunu gösterir. Salgı fazla olursa parça dengesiz döner, titreşim yapar ve işlenen yüzeyde ölçü hatası oluşur."
      },
      {
        "tur": "klasik",
        "soruMetni": "M8 vida açılacak, adımı P = 1,25 mm'dir. Diş yüksekliği formülü h3 = 0,61343 × P olduğuna göre bu vidanın diş yüksekliğini hesaplayınız.",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "h3 = 0,61343 × 1,25 ≈ 0,77 mm. Bu vidanın diş yüksekliği yaklaşık 0,77 mm'dir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tesviye mengenesinin sıkma milinde hangi vida türü kullanılır (üçgen mi, kare/trapez mi)? Neden?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Kare veya trapez vida kullanılır çünkü bu vida türleri hareket/kuvvet iletiminde daha az sürtünmeyle ve dayanıklı çalışır; mengene milinde tekrarlı sıkma-gevşetme hareketi için uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Normal adımı 2 mm olan bir vida, 3 ağızlı olarak açılacaktır. Ph (çok ağızlı vida adımı) kaç mm olur? Tek ağızlı ile çok ağızlı vida arasındaki temel fark nedir?",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Ph = 2 × 3 = 6 mm olur. Tek ağızlı vidada mil bir tur döndüğünde vida bir adım kadar ilerler; çok ağızlı vidada ise aynı turda birden fazla diş birden açıldığı için ilerleme daha hızlı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Vida kalemi altındaki boşluk açısı neden gereklidir? Bu açı olmasaydı ne olurdu?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Boşluk açısı, kalemin diş yüzeyine sürtünmesini önler. Bu açı olmasaydı kalem parçaya sürtünür, yüzey kalitesi bozulur ve kalem ısınıp körelirdi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düz bir plaka üzerine açılan kama kanalı ile bir mil (şaft) üzerine açılan kama kanalı arasında işleniş açısından ne fark vardır?",
        "puan": 15,
        "konu": "Freze – Kama Kanalı",
        "cevapAnahtari": "Düzlemsel parçalarda kama kanalı düz bir yüzeye açılır. Millerde ise kama kanalı silindirik (yuvarlak) bir yüzeye, parça uygun şekilde bağlanıp konumlandırılarak açılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tezgâh tablasında parçayı istenilen noktada sabitlemek için \"T\" kanalı kullanılır. Eğer tablada T kanalı olmasaydı, parçaları bağlamak neden zorlaşırdı?",
        "puan": 15,
        "konu": "Freze – Kama Kanalı",
        "cevapAnahtari": "T kanalı, T başlı cıvataların kanal içinde kayıp istenilen noktada sabitlenmesini sağlar. T kanalı olmasaydı parçaları tablaya farklı noktalarda esnek şekilde bağlamak zorlaşırdı; sabit vida delikleri kullanmak gerekirdi ki bu da bağlama noktalarını sınırlardı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın hem dış çapını hem de bir deliğin derinliğini tek bir aletle ölçmek istiyoruz. Hangi ölçü aleti bu iki ölçümü de yapabilir? Bu aletin hangi kısmı derinlik, hangi kısmı dış çap ölçer?",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kumpas bu iki ölçümü de yapabilir. Derinlik, kumpasın derinlik kılıcı (çubuğu) ile ölçülür; dış çap ise kumpasın dış çap çeneleri ile ölçülür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Komparatörün ibresi saat yönünde hareket ederse bu pozitif mi negatif mi bir okumadır? Bu bilgi neyi anlamamıza yardımcı olur?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Saat yönünde hareket pozitif bir okumadır. Bu bilgi, ölçülen parçanın referans (sıfır) ölçüden ne kadar ve hangi yönde saptığını anlamamıza yardımcı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "M10 vida açılacak, adımı P = 1,5 mm'dir. Diş yüksekliği formülü h3 = 0,61343 × P olduğuna göre bu vidanın diş yüksekliğini hesaplayınız.",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "h3 = 0,61343 × 1,5 ≈ 0,92 mm. Bu vidanın diş yüksekliği yaklaşık 0,92 mm'dir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir somunun gevşememesi ve sıkı tutması istenen bir bağlantıda hangi vida türü tercih edilir? Neden?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Üçgen vida tercih edilir çünkü diğer vida türlerine göre sürtünmesi yüksektir ve bu sayede kendiliğinden gevşemeye karşı daha dirençlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Normal adımı 1,5 mm olan bir vida 2 ağızlı olarak açılacaktır. Ph kaç mm olur? Bu vidayı 2 ağızlı yapmanın pratikte ne gibi bir yararı olabilir?",
        "puan": 15,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Ph = 1,5 × 2 = 3 mm olur. Çok ağızlı vida, aynı devirde daha fazla ilerleme sağladığı için hızlı sıkılıp gevşetilmesi gereken bağlantılarda kullanışlıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Metrik vida açarken kalem ucu açısı yanlış (örneğin 55°) bilenirse ne olur?",
        "puan": 10,
        "konu": "Torna – Vida Açma",
        "cevapAnahtari": "Vida dişleri standart ölçüde ve doğru formda çıkmaz; üretilen vida, standart bir somunla tam uyumlu olmaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze tezgâhında delme yapılacak bir iş parçası tablaya nasıl bağlanır? Parça iyi bağlanmazsa ne olur?",
        "puan": 10,
        "konu": "Freze – Delme",
        "cevapAnahtari": "İş parçası mengeneye veya kelepçelerle tablaya sabitlenir. Parça iyi bağlanmazsa işlem sırasında yerinden oynayabilir, bu da hatalı deliğe veya kazaya yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İki mil arasında güç aktarmak için hangi makine elemanı kullanılır? Bu elemanın üzerindeki \"modül\" değeri neyi ifade eder?",
        "puan": 10,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Dişli çark kullanılır. Modül, dişlinin diş büyüklüğünü belirleyen bir değerdir; modül büyüdükçe diş boyutu da büyür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir dişli çark açılacak, diş sayısı ve modülü bellidir. Freze çakısı seçerken hangi iki bilgiye bakılır?",
        "puan": 10,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Modül çakısı seçilirken hem dişlinin modülüne hem de diş sayısına bakılır; çakı bu iki değere göre seçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sert bir malzemeyi taşlarken zımpara taşının sertliği nasıl olmalıdır (yumuşak mı sert mi)? Neden?",
        "puan": 15,
        "konu": "Taşlama",
        "cevapAnahtari": "Sert malzeme taşlanırken daha yumuşak bir zımpara taşı tercih edilir; çünkü yumuşak taş, körelen taneleri kolayca dökerek kendini yeniler ve keskin kalır. Sert bir taş seçilirse taş körelir ve malzemeyi yakabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Taşlama sırasında parçaya sürekli sıvı püskürtülür. Bu sıvının amacı nedir? Kullanılmazsa ne olur?",
        "puan": 15,
        "konu": "Taşlama",
        "cevapAnahtari": "Soğutma sıvısı, taşlama sırasında oluşan ısıyı azaltır ve talaşların yüzeyden temizlenmesine yardımcı olur. Kullanılmazsa parça aşırı ısınabilir, yüzey kalitesi bozulabilir ve zımpara taşı çabuk körelebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elektrik ark kaynağı yaparken akım hangi eleman üzerinden parçaya geçer? Devrenin tamamlanması için parçaya hangi kablo bağlanır?",
        "puan": 10,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Akım elektrot üzerinden parçaya geçer. Devrenin tamamlanması için parçaya toprak (şase) kablosu bağlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalın bir elektrotla kaynak yaparken amper ayarı düşük tutulursa ne olur?",
        "puan": 15,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Amper düşük olursa ark düzgün oluşmaz, elektrot malzemeye yapışabilir ve kaynak dikişi yetersiz nüfuziyetle (sığ) oluşur. Bunun nedeni, düşük akımın yeterli ısı ve erime sağlayamamasıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Oksijen ve asetilen tüpleri taşınırken veya depolanırken neden birbirinden ayrı ve dik tutulur?",
        "puan": 15,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Oksijen yanmayı hızlandırıcı, asetilen ise yanıcı bir gazdır; bir arada tutulmaları risk oluşturur. Tüpler dik tutulur çünkü yatık tüplerde gaz içindeki aseton sıvısı gaz çıkışına karışabilir, bu da tehlikeli olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Oksi gaz kaynağında alev normalden daha az oksijenli (karbonlaştırıcı) ayarlanırsa dikişte ne gibi bir sorun olur?",
        "puan": 10,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Dikişte gözeneklenme ve is/kurum birikmesi görülebilir; kaynak metalinde karbon oranı artarak sertleşme ve gevreklik oluşabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir dişli çarkta eşit aralıklı dişler açmak için freze tezgâhında hangi düzenek/işlem kullanılır? Bu işlem yapılmazsa dişler nasıl çıkar?",
        "puan": 15,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Divizör (bölme aygıtı) kullanılır. Divizör, parçayı her seferinde eşit açıyla döndürerek dişlerin eşit aralıklarla açılmasını sağlar. Bu işlem doğru yapılmazsa dişler eşit aralıklı olmaz, dişli düzensiz çalışır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dönme hareketini doğrusal harekete çevirmek için hangi dişli çeşidi kullanılır? Düz dişliden farkı nedir?",
        "puan": 10,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Kremayer dişli kullanılır. Düz dişli dairesel bir çark üzerinde dişlere sahipken, kremayer düz bir çubuk üzerine açılmış dişlerden oluşur; dişliyle eşleşerek dönme hareketini doğrusal harekete çevirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Uzun ve ince bir mili silindirik taşlarken iki punta arasına bağlamanın avantajı nedir?",
        "puan": 10,
        "konu": "Taşlama",
        "cevapAnahtari": "İki punta arasına bağlama, parçanın tüm boyunca merkezini sabit tutar; bu sayede parça eşit çapta ve düzgün taşlanabilir, ayrıca titreşim azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Zımpara taşı tezgâha bağlanmadan önce dengelenir (balans ayarı yapılır). Bu işlem yapılmazsa taşlama sırasında ne olur?",
        "puan": 10,
        "konu": "Taşlama",
        "cevapAnahtari": "Taş dengelenmezse çalışırken titreşim yapar; bu titreşim hem yüzey kalitesini bozar hem de tezgâha ve taşa zarar verebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kaynak yapılacak metal yüzeyinde pas, yağ veya boya varsa bu, kaynak kalitesini nasıl etkiler?",
        "puan": 10,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Kirli yüzeyde kaynak dikişi düzgün oluşmaz, dikişte gözeneklenme (boşluk) ve yapışma zayıflığı görülebilir. Bu yüzden kaynak öncesi yüzey temizlenmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elektrik ark kaynağında elektrot parçaya değdirilip hafifçe çekildiğinde ortaya çıkan parlak ışık ve ısı kaynağına ne denir? Bu ısı neyi eritir?",
        "puan": 15,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Bu ışık ve ısıya elektrik arkı denir. Ark, elektrik akımının elektrot ile parça arasında sıçraması sonucu oluşur. Bu ısı hem elektrodu hem de parçanın yüzeyini eriterek kaynak banyosunu oluşturur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Oksi gaz kaynağında alev çok fazla oksijenli (oksitleyici) ayarlanırsa kaynak dikişinde ne gibi bir sorun olur?",
        "puan": 15,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Alev fazla oksijenli olursa dikiş sert ve gevrek olabilir, malzeme yüzeyinde oksitlenme (yanma) görülebilir. Bunun nedeni, fazla oksijenin malzeme ile kimyasal tepkimeye girmesidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Oksi gaz kaynağında hangi durumlarda ek tel kullanmaya (telli dikiş) ihtiyaç duyulur? Ek tel kullanılmadığında (telsiz dikişte) dikiş nereden oluşur?",
        "puan": 15,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Parçalar arasında boşluk varsa veya ek malzemeye ihtiyaç duyulan kalın kesitli parçalarda telli dikiş kullanılır; ek tel eritilerek boşluk doldurulur. Telsiz dikişte ise sadece birleştirilecek parçaların kendi malzemesi eritilerek dikiş oluşturulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir dişli çarkın diş sayısı arttıkça, aynı modülde çarkın çapı nasıl değişir?",
        "puan": 10,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Diş sayısı arttıkça çarkın çapı büyür, çünkü daha fazla diş aynı modülde daha geniş bir çevre üzerine sığdırılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir dişli çarkta 40 diş açılacak. Divizör bu 40 dişi eşit aralıklarla açabilmek için ne yapar, kısaca açıklayınız.",
        "puan": 15,
        "konu": "Freze – Dişli Açma",
        "cevapAnahtari": "Divizör, parçayı her diş açma işleminden sonra tam olarak hesaplanan açı kadar döndürür. Bu sayede her diş, bir öncekiyle eşit aralıkta açılmış olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Taşlama işleminde soğutma sıvısı kullanılmazsa parça üzerinde renk değişimi (yanma izi) görülebilir. Bu neyin işaretidir?",
        "puan": 15,
        "konu": "Taşlama",
        "cevapAnahtari": "Bu, parçanın aşırı ısındığının işaretidir. Aşırı ısınma, malzemenin yüzey özelliklerini (sertlik gibi) olumsuz etkileyebilir. Bunu önlemek için taşlama sırasında soğutma sıvısı kullanılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dengelenmemiş (balansı bozuk) bir zımpara taşı ile taşlanan bir parçanın yüzeyinde ne gibi bir iz beklenir?",
        "puan": 10,
        "konu": "Taşlama",
        "cevapAnahtari": "Yüzeyde düzensiz, dalgalı izler veya çizgiler oluşabilir; bu, taşın titreşimli çalışmasından kaynaklanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elektrik ark kaynağında elektrotun ucu parçaya çok yaklaştırılıp bastırılırsa (yapışırsa) ne olur, bunu önlemek için ne yapılmalıdır?",
        "puan": 10,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Elektrot parçaya yapışabilir ve kısa devre oluşabilir. Bunu önlemek için elektrot ile parça arasında uygun bir mesafe (ark boyu) korunmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kaynak arkının çok uzun tutulması (elektrodun parçadan çok uzak tutulması) dikişte ne gibi sorunlara yol açar?",
        "puan": 15,
        "konu": "Elektrik Ark Kaynağı",
        "cevapAnahtari": "Ark çok uzun tutulursa ısı dağılır, dikiş düzensiz ve sıçramalı olur, ayrıca malzemeye işleme derinliği (nüfuziyet) yetersiz kalabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Asetilen tüpü kullanılırken yüksek basınçta neden çalıştırılmaz? Basınç nasıl kontrol edilir?",
        "puan": 10,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Asetilen yüksek basınçta kararsız hale gelip kendiliğinden patlayabilir; bu yüzden düşük basınçta kullanılır. Basınç, manometre (regülatör) ile kontrol edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Oksi gaz kaynağında telli dikiş çekme ile telsiz dikiş çekme arasındaki temel fark nedir?",
        "puan": 15,
        "konu": "Oksi Gaz Kaynağı",
        "cevapAnahtari": "Telli dikişte ilave bir kaynak teli eritilerek dikişe malzeme eklenir; telsiz dikişte ise sadece birleştirilecek parçaların kendi malzemesi eritilerek dikiş oluşturulur, ek tel kullanılmaz."
      }
    ]
  },
  {
    "dersAdi": "Ölçme ve Kontrol",
    "sinifGrade": 10,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir deliğin iç çapını mı, yoksa bir parçanın dış çapını mı ölçeceğinize göre kumpasın hangi çenelerini kullanırsınız?",
        "puan": 10,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "İç çap ölçümü için kumpasın iç çap çeneleri, dış çap ölçümü için dış çap çeneleri kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kumpası kullanmadan önce çenelerin hassasiyetini kontrol etmek neden önemlidir? Kontrol nasıl basitçe yapılabilir?",
        "puan": 15,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "Çeneler aşınmış veya hizasız olabilir; bu durumda yapılan ölçüm hatalı çıkar. Çeneler tam kapatılıp aralarında ışık sızıntısı olup olmadığına bakılarak basit bir kontrol yapılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "0-25 mm ile 25-50 mm aralığını ölçen iki farklı mikrometre varsa, 30 mm'lik bir parça için hangisini seçersiniz?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "25-50 mm mikrometre seçilir çünkü 30 mm bu aralığa girer; 0-25 mm mikrometre bu ölçüyü alamaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometrenin örsleri (ölçüm yüzeyleri) kirliyse ölçüm sonucunu nasıl etkiler? Bu hatayı önlemek için ne yapılmalıdır?",
        "puan": 15,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Kirli örsler arasına giren toz/talaş, gerçek ölçüden daha büyük bir değer okunmasına neden olur. Bu hatayı önlemek için ölçüm öncesi örsler temiz bir bezle silinmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometrenin doğru ölçüp ölçmediği nasıl kontrol edilir?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Bilinen standart ölçüdeki bir kontrol mastarı mikrometreyle ölçülür; sonuç mastarın değerine eşitse mikrometre doğru ölçüyor demektir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Verniyerli açıölçerle bir açı ölçerken hangi iki skaladan okuma yapılır?",
        "puan": 15,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Ana skaladan tam derece değeri, verniyer skalasından dakika (açının ondalık kısmı) değeri okunur; ikisi toplanarak açı bulunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sinüs çubuğu ile açı ölçme mantığı nedir?",
        "puan": 10,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Sinüs çubuğunun bir ucu belli yükseklikte bir mastarla kaldırılır, oluşan açı trigonometrik sinüs oranıyla hesaplanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey profilometresi bir yüzeyin pürüzlülüğünü nasıl ölçer? Bu ölçümün sonucu hangi birimle ifade edilir?",
        "puan": 15,
        "konu": "Yüzey Pürüzlülüğü",
        "cevapAnahtari": "Profilometrenin ucu yüzey üzerinde gezdirilir, yüzeydeki iniş çıkışlar elektronik olarak algılanıp sayısal bir pürüzlülük değerine dönüştürülür. Sonuç genellikle Ra (mikron) birimiyle ifade edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kanalın derinliğini ölçerken kumpasın hangi kısmını kullanırsınız? Kumpası kanala nasıl yerleştirirsiniz?",
        "puan": 10,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "Kumpasın derinlik kılıcı (çubuğu) kullanılır. Kumpasın gövdesi kanalın ağzına dayanacak, derinlik kılıcı ise kanalın dibine değecek şekilde yerleştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kumpasın ana skalası ile verniyer skalasından okunan değerler nasıl birleştirilerek sonuç bulunur?",
        "puan": 15,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "Ana skaladan tam milimetre değeri okunur, verniyer skalasında ana skala ile çakışan çizgi ondalık kısmı verir; ikisi toplanarak sonuç bulunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometreyi bir milin çapını ölçerken mile nasıl konumlandırırsınız?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Mikrometrenin örsleri milin eksenine dik, çapın en geniş noktasından geçecek şekilde konumlandırılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometrede ölçüm alındıktan sonra tespit mandalı neden kullanılır?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Tespit mandalı, ölçüm sırasında elde edilen değerin mil hareket etmeden sabit kalmasını sağlar; böylece parça mikrometreden çıkarılıp değer rahatça okunabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometrede kılavuz (gövde) skalası ile tambur skalasından okunan değerler nasıl birleştirilir?",
        "puan": 15,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Kılavuz skalasından tam ve yarım milimetreler okunur, tambur skalasından yüzde birlik (0,01 mm) kısım okunur; ikisi toplanarak sonuç bulunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Verniyerli açıölçerle 42 derece 30 dakikalık bir açı okundu. Bu okumayı nasıl yaptığınızı (hangi skaladan ne okunduğunu) açıklayınız.",
        "puan": 15,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Ana skaladan tam derece (42°) okunur, verniyer skalasından dakika kısmı (30') okunur; ikisi birleştirilerek 42°30' sonucu elde edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Silindirik makaralar ve bilyeler yardımıyla koniklik açısı nasıl ölçülür?",
        "puan": 10,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Konik yüzeyin iki farklı noktasına makaralar/bilyeler yerleştirilip aralarındaki yükseklik farkı ölçülür, bu farktan trigonometrik olarak açı hesaplanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey pürüzlülük mastarlarıyla karşılaştırmalı ölçüm nasıl yapılır? Bu yöntem neden hassas bir ölçüm sayılmaz?",
        "puan": 15,
        "konu": "Yüzey Pürüzlülüğü",
        "cevapAnahtari": "Farklı pürüzlülük derecelerindeki referans yüzeyler elle veya gözle karşılaştırılarak, ölçülecek yüzeyin hangi mastara yakın olduğu tespit edilir. Bu yöntem kişiden kişiye değişebilen öznel bir karşılaştırma olduğu için hassas/sayısal bir ölçüm sayılmaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir milin dış çapını mı yoksa bir kanalın derinliğini mi ölçeceğinize göre kumpasın hangi kısmını kullanırsınız? Bu iki ölçüm için kumpasın farklı kısımlarının olması ne sağlar?",
        "puan": 15,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "Dış çap için dış çap çeneleri, derinlik için derinlik kılıcı (çubuğu) kullanılır. Kumpasın farklı kısımlara sahip olması, tek bir aletle birden fazla türde ölçüm yapılabilmesini sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir deliğin iç çapını ölçerken kumpası deliğe nasıl yerleştirirsiniz? Yanlış yerleştirme ölçüyü nasıl etkiler?",
        "puan": 15,
        "konu": "Kumpasla Ölçüm",
        "cevapAnahtari": "Kumpasın iç çap çeneleri deliğin içine, çapın en geniş noktasından geçecek şekilde yerleştirilir. Yanlış (eğik) yerleştirilirse gerçek çaptan farklı, hatalı bir değer okunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "5 mm'lik bir teli ölçmek için 0-25 mm mikrometre mi yoksa 25-50 mm mikrometre mi kullanılır?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "0-25 mm mikrometre kullanılır çünkü 5 mm bu aralığa girer."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometreyi konik bir parçanın çapını ölçerken nasıl konumlandırırsınız? Konik yüzeyde ölçüm yaparken nelere dikkat edilir?",
        "puan": 15,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Mikrometre, ölçüm yapılacak noktada parçanın eksenine dik olacak şekilde konumlandırılır. Konik yüzeyde ölçüm noktasının tam olarak belirtilen konumda olmasına dikkat edilmelidir, aksi hâlde farklı bir çap okunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mikrometrede tambur skalası bir tam tur döndüğünde mil ne kadar ilerler, bu bilgi neden önemlidir?",
        "puan": 10,
        "konu": "Mikrometre Ölçüm",
        "cevapAnahtari": "Tambur bir tam tur döndüğünde mil genellikle 0,5 mm ilerler; bu bilgi, okunan tambur değerinin doğru yorumlanması için önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Verniyerli açıölçerde ana skala ile verniyer skalası arasındaki ilişki nedir, neden iki skala kullanılır?",
        "puan": 10,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Ana skala kaba (derece) ölçümü, verniyer skalası ise hassas (dakika) ölçümü sağlar; iki skala birlikte daha hassas bir sonuç verir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Optik açı ölçüm cihazının verniyerli açıölçerden farkı nedir? Hangi tür işlerde bu ekstra hassasiyete ihtiyaç duyulur?",
        "puan": 15,
        "konu": "Açı Ölçme",
        "cevapAnahtari": "Optik açı ölçüm cihazı, ışık/optik sistemle çok daha hassas (saniye mertebesinde) ölçüm yapar; verniyerli açıölçer ise dakika hassasiyetindedir. Hassas kalibrasyon gerektiren ölçüm aletlerinin üretiminde bu ekstra hassasiyete ihtiyaç duyulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Profilometre ile ölçüm sonucu neden objektif/güvenilir kabul edilir?",
        "puan": 10,
        "konu": "Yüzey Pürüzlülüğü",
        "cevapAnahtari": "Ölçüm, elektronik bir cihazla sayısal olarak yapıldığı için kişiden kişiye değişmez, göz kararına dayanmaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kumpasla ölçülen bir vidanın diş açısı 60° ise bu vida metrik mi whitworth mü? Diğer tür kaç derecedir?",
        "puan": 10,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "60° diş açısı metrik vidayı gösterir. Whitworth vidanın diş açısı 55°'dir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir vidanın diş üstü çapını ölçmek için hangi ölçü aletleri kullanılabilir? Bu aletlerden hangisi daha hassastır?",
        "puan": 15,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "Diş üstü çapı kumpas veya mikrometre ile ölçülebilir. Mikrometre daha hassastır çünkü daha ince ölçüm farklarını algılayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir dişli çarkın modülünü tahmin ederken nelere bakılır?",
        "puan": 10,
        "konu": "Dişli Çarkları Ölçme",
        "cevapAnahtari": "Dişlerin büyüklüğüne ve diş sayısına bakılarak yaklaşık bir modül değeri tahmin edilir; bu tahmin daha sonra ölçümle doğrulanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mastar seçerken ölçülecek profile göre nasıl karar verilir?",
        "puan": 10,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Ölçülecek parçanın şekline ve ölçü aralığına uygun mastar seçilir; örneğin düz bir yüzey için düzlük mastarı seçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Blok mastarlar neden birleştirilerek kullanılır?",
        "puan": 10,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Tek bir mastar her ölçüyü karşılamayabilir; farklı kalınlıktaki blok mastarlar bir araya getirilerek istenen toplam ölçü elde edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resmine bakarak bir milin dairesellik (yuvarlaklık) hatasını kontrol etmek istiyorsunuz. Okulumuzda mastar olmadığı için hangi aleti kullanabilirsiniz?",
        "puan": 15,
        "konu": "Şekil Tolerans Kontrolü",
        "cevapAnahtari": "Komparatör kullanılabilir. Mil, komparatörle döndürülerek farklı noktalardaki sapmalar ölçülür; bu sapmaların farkı dairesellik hatasını gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resminde bir milin çapı \"20 ±0,1 mm\" olarak toleranslandırılmış. Okulumuzda mastar olmadığı için bu kontrolü hangi aletle yaparsınız?",
        "puan": 15,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Kumpas veya mikrometre ile milin gerçek çapı ölçülür; ölçülen değer 19,9 mm ile 20,1 mm arasındaysa parça toleransa uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Boyut tolerans kontrolü öncesi iş parçasının hazırlanmasında nelere dikkat edilir?",
        "puan": 15,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Ölçüm yapılacak yüzeydeki kir, talaş veya çapak temizlenir; ölçüm birden fazla noktadan tekrarlanarak doğrulanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Vidanın diş dibi çapını ölçerken neden mikrometre tercih edilir, kumpas neden yetersiz kalabilir?",
        "puan": 15,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "Diş dibi dar ve derin bir oyuk olduğu için kumpasın çeneleri buraya tam giremeyebilir; mikrometre daha hassas ve uygun ölçüm sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Vida tarağı bir vidanın adımını nasıl ölçer?",
        "puan": 15,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "Vida tarağındaki farklı adım şablonları sırayla vida dişlerine tam oturana kadar denenir; tam oturan şablonun üzerinde yazan değer vidanın adımını verir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Modül kumpasının ağzı nasıl ayarlanır?",
        "puan": 10,
        "konu": "Dişli Çarkları Ölçme",
        "cevapAnahtari": "Modül kumpasının ağzı, tahmin edilen modül değerine göre skalasından ayarlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mastarlar iş parçasına yerleştirilirken nelere dikkat edilir?",
        "puan": 10,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Mastar, ölçülecek yüzeye tam ve düz temas edecek şekilde yerleştirilir; eğik veya gevşek temas hatalı sonuca yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mastarın hangi ölçü aralığını karşıladığını nasıl anlarsınız?",
        "puan": 10,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Mastarın üzerinde yazan ölçü değerine bakılarak hangi aralığı karşıladığı anlaşılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Şekil tolerans kontrolü öncesi iş parçasının hazırlanmasında nelere dikkat edilir?",
        "puan": 10,
        "konu": "Şekil Tolerans Kontrolü",
        "cevapAnahtari": "Parçanın ölçüm yapılacak yüzeyi temizlenir ve kontrol için sabit, sağlam bir şekilde bağlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resminde bir deliğin çapı \"15 +0,05/-0 mm\" olarak toleranslandırılmış. Bu deliği hangi aletle kontrol edersiniz? Ölçülen değer 15,03 mm çıkarsa parça toleransa uygun mudur?",
        "puan": 15,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Kumpas veya mikrometre ile kontrol edilir. Ölçülen değer (15,03 mm) tolerans aralığının (15,00-15,05 mm) içinde olduğu için parça uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Boyut tolerans kontrolü öncesi iş parçasının hazırlanmasında nelere dikkat edilir? Bu hazırlık atlanırsa ölçüm sonucu nasıl etkilenir?",
        "puan": 15,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Ölçüm yapılacak yüzeydeki kir, talaş veya çapak temizlenir; ölçüm birden fazla noktadan tekrarlanarak doğrulanır. Bu hazırlık atlanırsa kirlilik nedeniyle gerçek ölçüden farklı, hatalı bir değer okunabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir vidanın diş açısı 55° ölçülmüştür. Bu vida metrik mi whitworth mü? Diş açısının doğru ölçülmesi neden önemlidir?",
        "puan": 15,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "55° diş açısı whitworth vidayı gösterir. Diş açısının doğru ölçülmesi, vidanın doğru somunla eşleşip eşleşmeyeceğini belirlediği için önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Diş dibi çapı ile diş üstü çapı arasındaki farkı nasıl yorumlarsınız?",
        "puan": 10,
        "konu": "Vidaları Ölçme",
        "cevapAnahtari": "Bu fark, vidanın diş yüksekliğinin iki katına karşılık gelir; diş derinliğini gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Modül kumpasıyla dişli üzerinde ölçüm nasıl yapılır?",
        "puan": 15,
        "konu": "Dişli Çarkları Ölçme",
        "cevapAnahtari": "Ayarlanan modül kumpası dişin üzerine yerleştirilir; kumpasın ağzı diş yüzeyine tam oturuyorsa tahmin edilen modül doğrulanmış olur, oturmuyorsa ayar değiştirilerek tekrar denenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Blok mastarlar birleştirilirken temas yüzeylerinin temiz olması neden önemlidir?",
        "puan": 10,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Kirli yüzeyler blokların tam yapışmasını engeller, bu da toplam ölçüde hataya yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mastarla kontrol sonucunda parça mastara tam oturuyorsa bu ne anlama gelir? Oturmuyorsa ne yapılır?",
        "puan": 15,
        "konu": "Mastarlar ve Optik Kontrol",
        "cevapAnahtari": "Parça mastara tam oturuyorsa ölçü/şekil istenen değere uygundur demektir. Oturmuyorsa parça toleransa uymuyor demektir ve farklı bir mastar denenerek veya başka bir ölçüm yöntemiyle durum netleştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Şekil tolerans kontrolü yapıldıktan sonra sonucun kaydedilmesi neden önemlidir?",
        "puan": 10,
        "konu": "Şekil Tolerans Kontrolü",
        "cevapAnahtari": "Kayıt, parçanın kalite kontrolden geçtiğinin belgesi olur ve ileride karşılaşılabilecek sorunlarda geriye dönük inceleme yapılmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın boyut toleransını kontrol ederken tek bir noktadan ölçüm yapmak neden yeterli olmayabilir?",
        "puan": 10,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Parçanın farklı noktalarında ölçü farklılık gösterebilir (oval/konik hata gibi); tek noktadan ölçüm bu hataları gözden kaçırabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Boyut tolerans kontrolünde ölçülen değer tolerans sınırının dışında çıkarsa ne yapılmalıdır? Bu durumun kaydedilmesi neden önemlidir?",
        "puan": 15,
        "konu": "Boyut Tolerans Kontrolü",
        "cevapAnahtari": "Parça ret edilir veya yeniden işlenip işlenemeyeceği değerlendirilir. Bu durumun kaydedilmesi, üretim sürecindeki hataların takip edilip düzeltilmesi için önemlidir."
      }
    ]
  },
  {
    "dersAdi": "Kalıplama Tekniği",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "İnbus ve havşa başlı cıvatalar arasındaki fark nedir, kalıpta hangi durumda hangisi tercih edilir?",
        "puan": 10,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "İnbus cıvatanın başı silindirik ve altıgen yuvalıdır, yüzeyden dışarı taşabilir; havşa başlı cıvata ise başı gömük kalacak şekilde konik yuvaya oturur. Yüzeyin düz kalması gereken yerlerde havşa başlı tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Setskur ve bilyalı setskurların kalıptaki görevi nedir?",
        "puan": 10,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "İki parçayı, dışarıdan görünmeyecek şekilde birbirine sabitlemek için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kolonlar burçlarla birlikte nasıl çalışır?",
        "puan": 15,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "Kolonlar burçların içinden geçerek kalıbın üst ve alt yarısının her zaman aynı hizada kapanmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "İtici pimlerin görevi nedir?",
        "puan": 10,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "Kalıp açıldıktan sonra kalıplanan parçayı kalıptan dışarı iter."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp yaylarının görevi nedir?",
        "puan": 15,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "İtici sistemi, parça çıkarıldıktan sonra tekrar geri (başlangıç konumuna) getirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Üst bağlama plakasının kalıptaki görevi nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Girişi",
        "cevapAnahtari": "Kalıbın üst yarısını enjeksiyon makinesinin hareketli tablasına bağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dişi plakanın kalıptaki görevi nedir?",
        "puan": 10,
        "konu": "Kalıp Parçaları Proje Uygulaması Girişi",
        "cevapAnahtari": "Üretilecek parçanın dış yüzey şeklini oluşturan boşluğu barındırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp tasarımında standart elemanlar (cıvata, burç, kolon gibi) kullanmanın avantajı nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Girişi",
        "cevapAnahtari": "Standart elemanlar kolayca temin edilebilir, maliyeti düşürür ve farklı kalıplarda tekrar kullanılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Burçların kalıptaki görevi nedir?",
        "puan": 10,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "Kılavuz pimlerin sürtünmesini azaltıp aşınmayı önleyerek kalıbın hassas kapanmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yolluk memesinin görevi nedir?",
        "puan": 10,
        "konu": "Sökülebilen Birleştirme Elemanları",
        "cevapAnahtari": "Erimiş malzemeyi enjeksiyon makinesinden kalıp içine yönlendirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sıyırıcı plakanın görevi nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Girişi",
        "cevapAnahtari": "İtici pimlerle birlikte çalışarak parçanın kalıptan düzgünce ayrılmasına yardımcı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kalıp parçası tasarlarken katalogdan doğru ölçüyü seçmek neden önemlidir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Girişi",
        "cevapAnahtari": "Yanlış ölçü seçimi parçanın diğer elemanlarla uyumsuz olmasına, kalıbın çalışmamasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Takozların kalıptaki görevi nedir?",
        "puan": 10,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "İtici sisteme hareket edebileceği bir boşluk sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "İtici destek plakasının görevi nedir?",
        "puan": 10,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "İtici plakayı arkadan destekleyerek sağlamlığını artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp kilit parçasının görevi nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "Kalıbın iki yarısının her zaman aynı hassas konumda kapanmasını garanti eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Patlatılmış montaj resmi ile normal montaj resmi arasındaki fark nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "Patlatılmış montaj resminde parçalar birbirinden ayrılmış şekilde gösterilir ve montaj sırası anlaşılır; normal montaj resminde parçalar birleşmiş hâldedir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Islah çeliğinin özelliği nedir, hangi kalıp parçalarında tercih edilir?",
        "puan": 10,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Isıl işlemle sertlik ve tokluk dengesi kazandırılmış çeliktir; yüksek mukavemet gereken plakalarda tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sementasyon çeliğinin özelliği nedir?",
        "puan": 15,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Yüzeyi sertleştirilip iç kısmı tok bırakılabilen bir çeliktir; aşınmaya maruz kalan pimlerde tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sıcak iş takım çelikleri hangi tür kalıplarda kullanılır?",
        "puan": 10,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Yüksek sıcaklıkta çalışan (örn. dövme, basınçlı döküm) kalıplarda kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bakır alaşımlarının kalıpta kullanım amacı nedir?",
        "puan": 15,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Yüksek ısı iletkenliği sayesinde ısının hızlı dağıtılması gereken bölgelerde (soğutma kanalları çevresi) kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Alt bağlama plakasının görevi nedir?",
        "puan": 10,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "Kalıbın alt yarısını enjeksiyon makinesinin sabit tablasına bağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Silindirik milin kalıptaki görevi nedir?",
        "puan": 15,
        "konu": "Kalıp Parçaları Proje Uygulaması Devamı",
        "cevapAnahtari": "Kalıp parçaları arasında hizalama veya hareket iletimi sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Soğuk iş takım çelikleri hangi tür kalıplarda kullanılır?",
        "puan": 10,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Oda sıcaklığında çalışan (örn. sac kesme, plastik enjeksiyon) kalıplarda kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Plastik kalıp çeliklerinden özellikle hangi özellik beklenir?",
        "puan": 15,
        "konu": "Kalıp Malzemeleri",
        "cevapAnahtari": "Yüksek yüzey parlatılabilirliği ve korozyon direnci beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kompozit malzeme kavramı nedir?",
        "puan": 10,
        "konu": "Kompozit Malzemeler",
        "cevapAnahtari": "İki farklı malzemenin (örn. plastik ve fiber) bir araya getirilerek her ikisinin de üstün özelliklerini taşıyan yeni bir malzeme oluşturulmasıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp parlatmada malzeme seçimi ve sertleştirmenin parlatma kalitesine etkisi nedir?",
        "puan": 10,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Sert bir yüzey, parlatma sırasında şeklini daha iyi korur ve daha uzun süre parlak kalır; yumuşak/sertleştirilmemiş yüzeyler kolayca çizilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elektrikli ve pnömatik eğeler arasındaki fark nedir, hangi işte tercih edilir?",
        "puan": 15,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Elektrikli eğeler elektrik motoruyla, pnömatik eğeler basınçlı havayla çalışır; basınçlı hava hattı bulunan atölyelerde pnömatik eğe tercih edilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Zımpara ile yüzey işlerken tane büyüklüğü sırası nasıl olmalıdır?",
        "puan": 10,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Kaba taneden başlanıp giderek ince taneye geçilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Gaztaşının kullanım amacı nedir?",
        "puan": 15,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Zımpara ile parlatma arasındaki ara yüzey işleme aşamasında kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elmas pasta ile ön parlatmada hangi renkteki (kaba taneli) pastalar kullanılır?",
        "puan": 10,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Vişne, kahverengi ve kırmızı renkli kaba taneli elmas pastalar kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elmas pasta ile son parlatmada hangi renkteki (ince taneli) pastalar kullanılır?",
        "puan": 15,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Portakal, sarı ve beyaz renkli ince taneli elmas pastalar kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp yüzey işleme sürecinin genel akışı nasıldır?",
        "puan": 15,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Kaba işlemeden (eğe/zımpara) başlanıp giderek daha ince işlemlere (gaztaşı, elmas pasta ile ön ve son parlatma) geçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kompozit malzemelere bir örnek verip avantajını açıklayınız.",
        "puan": 15,
        "konu": "Kompozit Malzemeler",
        "cevapAnahtari": "Karbon fiber örnek verilebilir; hem hafif hem yüksek mukavemetlidir, bu özelliği tek başına ne plastik ne metal sağlayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Spiral taşların kullanım amacı nedir?",
        "puan": 10,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Yüzeydeki kaba pürüzleri ve izleri gidermek için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Parlatma işlemine başlamadan önce yüzeyin temiz olması neden önemlidir?",
        "puan": 15,
        "konu": "Kalıp Yüzey İşleme ve Parlatma",
        "cevapAnahtari": "Yüzeyde kalan kir/talaş parçacıkları parlatma sırasında yeni çizikler oluşturabilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Sıfır noktasını yanlış belirleseydin ne olurdu?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Parçanın yanlış konumda/ölçüde işleneceğinin, hatta çarpışma riski oluşabileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Kaba ve ince tornalama arasındaki ayar farkını nasıl belirledin?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Kaba tornalamada yüksek talaş derinliği/ilerleme, ince tornalamada düşük değerlerin kullanıldığının belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Prizmatik parçada hangi kesme yöntemini ve takımı seçtin, neden?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Parçanın geometrisine uygun yöntem/takım seçiminin gerekçeyle belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Ölçtüğün parça teknik resimdeki ölçüye uymasaydı ne yapardın?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Hata giderilebilecek düzeydeyse tekrar işlenip düzeltileceğinin, değilse parçanın yeniden üretileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu parçaları üretirken hangi güvenlik önlemlerine dikkat ettin?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "KKD kullanımı, tezgah kapağının kapalı olması gibi somut bir örnek verilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Simülasyon/kontrol adımını neden önemli buldun?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Gerçek tezgahta çalıştırmadan önce hataların (çarpışma, yanlış hareket) görülmesini sağladığının belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu kalıp parçasının hangi malzemeden yapılması gerektiğini düşünürdün?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Parçanın görevine uygun bir çelik/alaşım türünün gerekçeyle belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu parçayı bir sonraki sefer üretsen neyi değiştirirdin?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Gördüğü bir eksikliğin veya geliştirme fikrinin somut şekilde belirtilmesi beklenir."
      }
    ]
  },
  {
    "dersAdi": "Sosyal Medya",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir arkadaşınız \"her şeyi internetten alıyorum, dükkâna gitmeye gerek yok\" diyor. Bu yaklaşımın bir dezavantajı olabilir mi? Bir avantajını da yazınız.",
        "puan": 10,
        "konu": "E-Ticaret",
        "cevapAnahtari": "Dezavantajı, ürünü elle inceleyememe ve kargo süresi bekleme gibi durumlardır. Avantajı ise 7/24 erişim ve geniş ürün yelpazesidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir üreticinin bir mağazaya toptan satış yapması ile bir bireyin ikinci el eşyasını başka bir bireye satması aynı e-ticaret türü müdür?",
        "puan": 10,
        "konu": "E-Ticaret Türleri",
        "cevapAnahtari": "Hayır; ilki B2B (işletmeden işletmeye), ikincisi C2C (bireyden bireye) e-ticaret türüdür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir online mağaza açmayı düşünen biri sırasıyla hangi pazarlama aşamalarından geçmelidir?",
        "puan": 15,
        "konu": "E-Ticarette Pazarlama",
        "cevapAnahtari": "Önce hedef kitle belirlenir, ardından tanıtım/reklam yapılır, satış gerçekleştirilir ve son olarak satış sonrası hizmet (destek, iade) sunulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sınırlı bütçesi olan küçük bir işletme ürününü tanıtmak için hangi dijital aracı tercih edebilir, neden?",
        "puan": 10,
        "konu": "E-Ticarette Pazarlama",
        "cevapAnahtari": "Sosyal medya reklamları düşük maliyetle geniş kitleye ulaşabildiği için tercih edilebilir; hedef kitleye göre özelleştirilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir ürünü pazarlamadan önce 'hedef kitleyi belirlemek' neden önemlidir?",
        "puan": 15,
        "konu": "E-Ticarette Pazarlama",
        "cevapAnahtari": "Doğru hedef kitleye yönelmek, pazarlama bütçesinin verimli kullanılmasını ve daha yüksek satış dönüşümü sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir e-ticaret sitesine kredi kartı bilgisi girerken adres çubuğunda neyi kontrol etmeliyiz, neden?",
        "puan": 15,
        "konu": "Alt Yapı ve Güvenlik",
        "cevapAnahtari": "https ve kilit simgesinin olup olmadığı kontrol edilmelidir; bu, sitenin SSL sertifikası ile şifreli bağlantı kullandığını gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir web sitesi için 'domain' ve 'hosting' kavramları ne anlama gelir?",
        "puan": 10,
        "konu": "Alt Yapı ve Güvenlik",
        "cevapAnahtari": "Domain, sitenin internet adresidir (örn. www.site.com); hosting ise site dosyalarının barındırıldığı sunucu hizmetidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Online aldığınız bir ürünü hiç kullanmadan iade etmek istiyorsunuz. Bu hakkınız var mıdır, hangi süre içinde?",
        "puan": 15,
        "konu": "Hukuki Düzenlemeler",
        "cevapAnahtari": "Evet, cayma hakkı kapsamında genellikle ürünü teslim aldıktan sonra belirli bir süre içinde (Türkiye'de 14 gün) hiçbir gerekçe göstermeden iade edebilirsiniz."
      },
      {
        "tur": "klasik",
        "soruMetni": "E-ticaretin son yıllarda hızla büyümesinin başlıca nedenlerinden biri nedir?",
        "puan": 15,
        "konu": "E-Ticaret",
        "cevapAnahtari": "İnternet ve akıllı telefon kullanımının yaygınlaşması, tüketicilerin online alışverişe daha kolay erişebilmesini sağlamıştır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir bireyin bir mağazadan doğrudan online alışveriş yapması hangi e-ticaret türüne girer?",
        "puan": 10,
        "konu": "E-Ticaret Türleri",
        "cevapAnahtari": "B2C (işletmeden tüketiciye) e-ticaret türüne girer."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir web sitesinin arama motorlarında üst sıralarda çıkması için hangi yöntem kullanılır?",
        "puan": 15,
        "konu": "E-Ticarette Pazarlama",
        "cevapAnahtari": "SEO (arama motoru optimizasyonu) yöntemi kullanılır; bu, doğru anahtar kelimeler ve kaliteli içerikle sitenin görünürlüğünü artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sosyal medya reklamının geleneksel (TV/gazete) reklamdan farkı nedir?",
        "puan": 10,
        "konu": "E-Ticarette Pazarlama",
        "cevapAnahtari": "Sosyal medya reklamı hedef kitleye göre özelleştirilebilir ve genellikle daha düşük maliyetlidir; geleneksel reklam ise daha geniş ama daha az hedefe yönelik kitleye ulaşır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Teknik bilgisi olmayan bir girişimci sıfırdan yazılım yazmadan nasıl bir e-ticaret sitesi kurabilir?",
        "puan": 15,
        "konu": "Alt Yapı ve Güvenlik",
        "cevapAnahtari": "Hazır e-ticaret yazılım paketlerini kullanarak, hosting ve domain alıp bu hazır sistemi kendi ürünlerine göre özelleştirebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir e-ticaret sitesinde güvenli ödeme sisteminin bulunması neden önemlidir?",
        "puan": 10,
        "konu": "Alt Yapı ve Güvenlik",
        "cevapAnahtari": "Müşteri kart bilgilerinin güvenle işlenmesini sağlar, dolandırıcılık riskini azaltır ve müşteri güvenini artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "E-ticaret sitelerinin 'mesafeli satış sözleşmesi' göstermesi neden yasal bir zorunluluktur?",
        "puan": 15,
        "konu": "Hukuki Düzenlemeler",
        "cevapAnahtari": "Tüketiciyi bilgilendirmek ve haklarını (iade, cayma gibi) güvence altına almak için yasal olarak zorunludur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sosyal medyada bir arkadaşınızın izni olmadan fotoğrafını paylaşmak etik midir? Neden?",
        "puan": 10,
        "konu": "Etik ve Bilişim Etiği",
        "cevapAnahtari": "Etik değildir; çünkü kişinin kendi görüntüsü üzerinde hakkı vardır (kişilik hakları) ve izinsiz paylaşım bu hakkı ihlal eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "İnternetten bulduğunuz bir fotoğrafı kaynak göstermeden kendi projenizde kullanmak bilişim etiği açısından doğru mudur?",
        "puan": 10,
        "konu": "Etik ve Bilişim Etiği",
        "cevapAnahtari": "Değildir; bu, telif hakkı ihlali sayılır. Kullanılan içeriğin kaynağı belirtilmeli veya izin alınmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sosyal medyada bir arkadaşınızın telefon numarasını veya adresini onun izni olmadan paylaşmak neden risklidir?",
        "puan": 15,
        "konu": "Etik ve Bilişim Etiği",
        "cevapAnahtari": "Bu, kişinin gizlilik hakkını ihlal eder ve kötü niyetli kişiler tarafından kötüye kullanılma riski taşır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir sosyal medya hesabınızın ele geçirilmesini önlemek için ne gibi önlemler alırsınız?",
        "puan": 10,
        "konu": "Bilgi Güvenliği ve KVKK",
        "cevapAnahtari": "Güçlü ve benzersiz bir şifre kullanılır; mümkünse iki adımlı doğrulama (2FA) aktif edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir arkadaşınıza sosyal medyada sürekli aşağılayıcı mesajlar gönderilmesi ne olarak adlandırılır?",
        "puan": 15,
        "konu": "Siber Zorbalıktan Korunma",
        "cevapAnahtari": "Siber zorbalık olarak adlandırılır; bu, taciz veya itibar zedeleme türü bir siber zorbalık örneğidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Siber zorbalığa maruz kalan biri ne yapmalıdır?",
        "puan": 15,
        "konu": "Siber Zorbalıktan Korunma",
        "cevapAnahtari": "Zorbalık yapan kişiyi engellemeli, kanıtları (ekran görüntüsü) saklamalı ve durumu güvendiği bir yetişkine veya platforma şikayet etmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir markanın sosyal medyada tutarsız bir imaj sergilemesi (bazen resmi, bazen şakacı) neden sorun olabilir?",
        "puan": 10,
        "konu": "Dijital Marka Yönetimi",
        "cevapAnahtari": "Tutarsız imaj, müşterilerin markaya olan güvenini ve algısını zayıflatabilir; dijital marka yönetiminde tutarlılık önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Görsel ağırlıklı bir ürünü tanıtmak isteyen bir marka hangi sosyal medya aracını tercih etmelidir, neden?",
        "puan": 15,
        "konu": "Sosyal Medya Araçları",
        "cevapAnahtari": "Görsel odaklı bir platform (fotoğraf/video paylaşım) tercih edilmelidir; çünkü bu platformlar ürünün görsel özelliklerini öne çıkarmaya uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sosyal medyada gördüğünüz bir haberi paylaşmadan önce hangi kontrolü yapmalısınız?",
        "puan": 10,
        "konu": "Etik ve Bilişim Etiği",
        "cevapAnahtari": "Haberin kaynağının güvenilir olup olmadığı kontrol edilmelidir; farklı kaynaklardan doğrulanmalı ve tarihinin güncel olup olmadığına bakılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir başkasının fikrini veya projesini kendi çalışmanızmış gibi sunmak (intihal) neden etik bir ihlaldir?",
        "puan": 10,
        "konu": "Etik ve Bilişim Etiği",
        "cevapAnahtari": "Bu, gerçek emek sahibinin hakkını gasp etmek anlamına gelir ve dürüstlük ilkesini ihlal eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Güçlü bir şifrenin sahip olması gereken özellikler nelerdir?",
        "puan": 15,
        "konu": "Bilgi Güvenliği ve KVKK",
        "cevapAnahtari": "Yeterince uzun olmalı, büyük/küçük harf, rakam ve özel karakter içermeli, tahmin edilmesi kolay bilgiler (doğum tarihi gibi) içermemelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sosyal medyada birine yapılan zorbalığa tanık olursanız ne yapmalısınız?",
        "puan": 15,
        "konu": "Siber Zorbalıktan Korunma",
        "cevapAnahtari": "Durumu görmezden gelmek yerine mağdur kişiye destek olunmalı, gerekiyorsa platforma bildirilmeli veya güvenilir bir yetişkine haber verilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir markanın müşterileriyle güven ilişkisi kurması, uzun vadede markaya ne kazandırır?",
        "puan": 10,
        "konu": "Dijital Marka Yönetimi",
        "cevapAnahtari": "Müşteri sadakati kazandırır; sadık müşteriler markayı tekrar tercih eder ve başkalarına da önerir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Profesyonel iş bağlantıları kurmak isteyen bir marka hangi tür sosyal medya platformunu tercih edebilir?",
        "puan": 15,
        "konu": "Sosyal Medya Araçları",
        "cevapAnahtari": "Profesyonel ağ platformlarını (iş odaklı sosyal medya) tercih edebilir; bu platformlar iş dünyasıyla bağlantı kurmaya uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Siber zorbalığın mağdur üzerindeki etkisi neden ciddiye alınmalıdır?",
        "puan": 15,
        "konu": "Siber Zorbalıktan Korunma",
        "cevapAnahtari": "Siber zorbalık, kaygı, özgüven kaybı gibi ciddi psikolojik etkiler yaratabilir; bu yüzden erken müdahale önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İyi bir sosyal medya içerik planı hangi unsurları içermelidir?",
        "puan": 10,
        "konu": "Sosyal Medya İçerik Planı",
        "cevapAnahtari": "İçerik takvimi (ne zaman paylaşılacağı), tema (hangi konularda paylaşım yapılacağı) ve paylaşım sıklığı gibi unsurları içermelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Rastgele paylaşım yapan bir hesap ile planlı bir içerik takvimi olan hesap arasındaki fark ne olabilir?",
        "puan": 15,
        "konu": "Sosyal Medya İçerik Planı",
        "cevapAnahtari": "Planlı hesap daha tutarlı ve düzenli bir imaj sunar, takipçi ilgisini sürekli canlı tutabilirken rastgele paylaşım düzensiz ve etkisiz kalabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir paylaşımın sadece beğeni sayısına bakarak başarılı olduğunu söylemek yeterli midir?",
        "puan": 15,
        "konu": "Sosyal Medya Analiz ve Raporlama",
        "cevapAnahtari": "Yeterli değildir; erişim (kaç kişiye ulaştığı), etkileşim (yorum, paylaşım) ve dönüşüm oranı (satışa/hedefe dönüşüm) gibi ölçütler de değerlendirilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir sosyal medya raporunda etkileşim oranının düştüğünü görüyorsunuz. Buna göre ne öneride bulunursunuz?",
        "puan": 10,
        "konu": "Sosyal Medya Analiz ve Raporlama",
        "cevapAnahtari": "İçerik türünün veya paylaşım saatinin gözden geçirilmesi, hedef kitleyle daha etkileşimli içerikler üretilmesi önerilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kriz iletişimi neden önemlidir?",
        "puan": 10,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "Bir markanın olumsuz bir durumla karşılaştığında doğru ve hızlı iletişim kurması, itibarının zarar görmesini önler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir marka kriz anında sessiz kalırsa ne olabilir?",
        "puan": 15,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "Sessizlik, markanın sorumluluk almadığı veya durumu önemsemediği algısı yaratabilir; bu da güvensizliği artırıp krizi büyütebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ürününüzün hatalı çıktığı ve sosyal medyada şikayetlerin arttığı bir durumda nasıl bir iletişim planı izlersiniz?",
        "puan": 15,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "Öncelikle durum kabul edilip şeffaf bir açıklama yapılır, ardından çözüm süreci (iade/değişim) duyurulur ve mağdur müşterilerle birebir iletişime geçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kriz iletişiminde markaların en sık yaptığı hata nedir?",
        "puan": 10,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "En sık yapılan hatalardan biri geç yanıt vermek veya sorunu inkar etmektir; bu, güven kaybını derinleştirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir gönderiyi paylaşırken saatin seçilmesi neden önemlidir?",
        "puan": 10,
        "konu": "Sosyal Medya İçerik Planı",
        "cevapAnahtari": "Hedef kitlenin en aktif olduğu saatte paylaşım yapmak, gönderinin daha fazla görüntülenme ve etkileşim almasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir paylaşımın 'kalitesini' hangi metrik daha iyi gösterir: beğeni sayısı mı, yorum/paylaşım oranı mı?",
        "puan": 15,
        "konu": "Sosyal Medya Analiz ve Raporlama",
        "cevapAnahtari": "Yorum/paylaşım oranı genellikle daha iyi gösterir; çünkü bu, izleyicinin içerikle gerçekten etkileşime geçtiğini gösterir, beğeni ise daha pasif bir tepkidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kriz durumunda markanın özür dilemesi neden önemlidir?",
        "puan": 10,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "Özür, markanın sorumluluk aldığını gösterir ve müşterilerin öfkesini/güvensizliğini azaltmaya yardımcı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kriz atlatıldıktan sonra markanın müşteri güvenini yeniden kazanması için ne yapılabilir?",
        "puan": 15,
        "konu": "Kriz İletişimi",
        "cevapAnahtari": "Şeffaf iletişime devam edilmeli, alınan önlemler paylaşılmalı ve söz verilen çözümler gerçekten uygulanmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İçerik temasının tutarlı olması bir hesaba ne kazandırır?",
        "puan": 15,
        "konu": "Sosyal Medya İçerik Planı",
        "cevapAnahtari": "Takipçilerin hesabı ne için takip ettiğini net anlamasını sağlar ve marka kimliğini güçlendirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüksek takipçi sayısına sahip bir hesabın düşük etkileşimi olması ne anlama gelebilir?",
        "puan": 10,
        "konu": "Sosyal Medya Analiz ve Raporlama",
        "cevapAnahtari": "Takipçilerin gerçek/aktif olmayabileceğini veya içeriğin hedef kitleyle örtüşmediğini gösterebilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu veriyi toplarken hangi yöntemi (anket, gözlem) seçtin, neden?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Konuya uygun bir veri toplama yönteminin gerekçeyle seçildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Ham veriyi düzenlerken karşılaştığın bir sorun oldu mu, nasıl çözdün?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Eksik/hatalı veri gibi bir sorunun fark edilip nasıl düzeltildiğinin somut belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu grafik türünü neden seçtin, başka bir tür de olabilir miydi?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Veri türüne (sayısal/kategorik) göre grafik seçiminin gerekçeyle belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Oluşturduğun grafik veriyi doğru yansıtıyor mu, nasıl kontrol ettin?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Grafikteki değerlerin ham veriyle karşılaştırılarak kontrol edildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu süreçte bilişim etiği açısından dikkat ettiğin bir nokta var mı (veri kaynağı, gizlilik)?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Veri toplarken kişisel bilgilerin gizliliğine veya kaynağın doğruluğuna dikkat edildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Farklı bir veri seti ile aynı grafik türünü kullanır mıydın?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Grafik seçiminin veri türüne bağlı olduğunun, her veri için aynı türün uygun olmayabileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Veri toplama formunu tasarlarken soruları nasıl anlaşılır hâle getirdin?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Açık, net ve tek bir konuyu soran ifadeler kullanıldığının belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bu grafiği bir markanın sosyal medya raporunda kullansaydın ne işine yarardı?",
        "puan": 10,
        "konu": "Uygulama Sınavı - Teknik Soru (Sözlü)",
        "cevapAnahtari": "Performans verilerini görselleştirerek karar almayı kolaylaştıracağının belirtilmesi beklenir."
      }
    ]
  },
  {
    "dersAdi": "Malzeme Bilgisi",
    "sinifGrade": 10,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Malzemeler iletkenlik özelliğine göre nasıl sınıflandırılır? Bakır hangi sınıfa girer?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Malzemeler iletken, yarı iletken ve yalıtkan olarak sınıflandırılır. Bakır iyi bir iletken olduğu için iletken malzemeler sınıfına girer."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir atomun çekirdeği ile elektronları arasındaki bağa ne denir? Bu bağ malzemenin hangi özelliğini belirler?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Bu bağa atomlar arası bağ denir. Bu bağın türü ve gücü, malzemenin sertlik, iletkenlik gibi temel özelliklerini belirler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Demirin allotropisi ne demektir? Bu özelliğin ısıl işlemle ilişkisi nedir?",
        "puan": 15,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Allotropi, aynı elementin farklı sıcaklıklarda farklı kristal yapılarda bulunabilmesidir. Demir de sıcaklığa göre farklı kristal yapılara geçer; bu özellik sayesinde ısıl işlemle çeliğin iç yapısı değiştirilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ham demir yüksek fırında hangi hammaddelerden elde edilir? Bu hammaddelerden biri (kok kömürü) olmasaydı işlem neden gerçekleşemezdi?",
        "puan": 10,
        "konu": "Demir Üretimi",
        "cevapAnahtari": "Ham demir; demir cevheri, kok kömürü ve kireç taşının yüksek fırında birlikte eritilmesiyle elde edilir. Kok kömürü olmasaydı, demir cevherini eritecek yüksek ısı ve demiri oksijenden ayıracak kimyasal tepkime sağlanamazdı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Haddeleme yapılmadan doğrudan dökülen bir çelik parça neden kullanıma hazır sayılmaz? Haddeleme bu durumu nasıl değiştirir?",
        "puan": 10,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Dökülen çelik ilk hâlinde düzensiz ve kaba bir yapıya sahiptir, doğrudan kullanılamaz. Haddeleme, çeliği silindirler arasından geçirerek istenen kalınlık ve düzgün şekle getirir; böylece kullanılabilir hâle gelir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çeliklere krom eklenmesi hangi özelliği artırır? TSE standardı ne işe yarar?",
        "puan": 15,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Krom eklenmesi çeliğin korozyon direncini (paslanmazlığını) artırır. TSE standardı, malzemenin belirli kalite ve güvenlik şartlarını karşıladığını garanti eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sertleştirilmiş ama çok gevrek çıkan bir çelik parça neden tavlanır?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Sertleştirme (su verme) işlemi çeliği aşırı gevrek bırakabilir. Tavlama, çeliği yeniden ısıtıp yavaş soğutarak iç gerilmeleri giderir ve malzemeyi yumuşatarak gevrekliği azaltır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çeliği sertleştirmek için hangi işlem uygulanır? Bu işlemin temel mantığı nedir?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Çelik belirli bir sıcaklığa ısıtılıp hızlıca soğutularak (su veya yağda) sertleştirilir. Hızlı soğutma, çeliğin iç yapısını sertlik kazandıran bir forma dönüştürür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çelik bir alaşım mıdır? Çeliğe karbon eklenmesi malzemenin özelliklerini neden değiştirir?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Evet, çelik bir alaşımdır. Karbon eklenmesi, demirin iç yapısına yerleşerek atomlar arası düzeni değiştirir; bu nedenle karbon oranı arttıkça çeliğin sertliği ve mukavemeti de değişir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makine parçasında hem sertlik hem şekillendirilebilirlik isteniyorsa hangi karbon sınıfı tercih edilir, neden?",
        "puan": 10,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Çelikler karbon oranına göre düşük karbonlu, orta karbonlu ve yüksek karbonlu çelik olarak sınıflandırılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dökme demir ile çelik arasındaki temel fark nedir?",
        "puan": 15,
        "konu": "Demir Üretimi",
        "cevapAnahtari": "Dökme demir, çelikten daha yüksek karbon oranına sahiptir; bu yüzden daha serttir ama daha gevrektir (kırılgandır). Çelik ise karbon oranı daha düşük olduğundan daha dayanıklı ve şekillendirilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey sertleştirme ile tüm parçayı sertleştirme arasında ne fark vardır? Hangi parçalarda yüzey sertleştirme tercih edilir?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Yüzey sertleştirmede sadece parçanın dış yüzeyi sertleştirilirken iç kısmı yumuşak/tok kalır. Sürekli aşınmaya maruz kalan ama darbelere karşı da dayanıklı olması gereken parçalarda (örneğin dişliler) tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Rockwell sertlik ölçme yönteminde sertlik nasıl belirlenir?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Belirli bir uç (elmas koni veya bilye) parçaya belirli bir kuvvetle batırılır; batma derinliğine göre bir sertlik değeri okunur. Batma derinliği azaldıkça sertlik artar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yarı iletken malzemelere bir örnek veriniz. Yarı iletkenler günlük hayatta hangi cihazlarda kullanılır?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Silisyum ve germanyum yarı iletken malzemelere örnektir. Yarı iletkenler bilgisayar, telefon gibi elektronik cihazların işlemci ve devre elemanlarında kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kristal yapı nedir? Malzemenin kristal yapısı neyi etkiler?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Kristal yapı, atomların düzenli ve tekrar eden bir düzende dizilmesidir. Malzemenin kristal yapısı; sertlik, mukavemet ve şekillendirilebilirlik gibi özelliklerini etkiler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Faz dönüşümü nedir? Bir örnekle açıklayınız.",
        "puan": 15,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Faz dönüşümü, bir malzemenin sıcaklık veya basınç değişimiyle bir iç yapıdan başka bir iç yapıya geçmesidir. Örneğin suyun buza dönüşmesi veya çeliğin ısıtılıp soğutulmasıyla iç yapısının değişmesi bir faz dönüşümüdür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Demir cevheri saf hâlde neden doğrudan kullanılamaz? Yüksek fırında bu cevherden demir elde etmek için hangi maddeler kullanılır?",
        "puan": 10,
        "konu": "Demir Üretimi",
        "cevapAnahtari": "Demir cevheri, içinde demir oksit ve çeşitli safsızlıklar (toprak, taş vb.) barındıran bir kayaçtır; bu hâliyle doğrudan kullanılamaz. Yüksek fırında bu cevherden demiri ayırmak için kok kömürü ve kireç taşı kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çelik üretiminde kullanılan ham maddeler nelerdir? Bu maddelerden biri eksik olsa çelik üretimi neden yapılamaz?",
        "puan": 10,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Çelik üretiminde ham demir (veya hurda demir), kok kömürü ve çeşitli katkı elementleri kullanılır. Ham demir/hurda olmadan üretilecek çelik için temel demir kaynağı bulunmaz, üretim yapılamaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Manganez elementi çeliğe hangi özelliği kazandırır? Bu özellik hangi tür parçalarda tercih edilir?",
        "puan": 15,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Manganez, çeliğin mukavemetini ve aşınma direncini artırır. Bu özellik, sürekli aşınmaya maruz kalan raylar ve dişliler gibi parçalarda tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Önceki işlemlerden dolayı iç yapısı düzensizleşmiş bir çelik parçaya hangi ısıl işlem uygulanır? Bu işlem parçayı nasıl düzeltir?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Bu durumda normalizasyon (normalleştirme) tavlaması uygulanır. Parça yeniden ısıtılıp havada soğutularak iç yapı düzgün ve homojen tane yapısına kavuşturulur; böylece iç gerilmeler giderilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Su verme (sertleştirme) sonrası çelik neden gevrek olabilir? Bu sorunu gidermek için hangi işlem yapılır?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Su verme sırasında çelik çok hızlı soğutulduğu için iç yapısında yüksek gerilmeler oluşur; bu da malzemeyi gevrekleştirir. Bu sorunu gidermek için temperleme (menevişleme) işlemi yapılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Demir alaşımlarına iki örnek veriniz. Saf demir yerine neden alaşımları tercih edilir?",
        "puan": 10,
        "konu": "Malzeme Bilimi",
        "cevapAnahtari": "Çelik ve dökme demir, demir alaşımlarına örnektir. Saf demir yumuşak ve dayanıksız olduğu için, karbon gibi elementler eklenerek sertlik ve mukavemet kazandırılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüksek karbonlu çeliğin düşük karbonlu çeliğe göre farkı nedir?",
        "puan": 15,
        "konu": "Çelik Üretimi",
        "cevapAnahtari": "Yüksek karbonlu çelik daha sert ve daha az şekillendirilebilirken, düşük karbonlu çelik daha yumuşak ve daha kolay şekillendirilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düşük karbonlu bir parçanın sadece yüzeyinin sert olması isteniyorsa hangi yöntem uygulanır? Bu yöntem nasıl çalışır?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Bu durumda sementasyon (karbonlama) yöntemi uygulanır. Parça, karbon açısından zengin bir ortamda ısıtılarak yüzeyine karbon nüfuz ettirilir; ısıl işlemle sadece bu karbonlanmış yüzey sertleştirilir, iç kısım tok kalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Brinell sertlik ölçme yönteminde hangi uç kullanılır ve sertlik nasıl belirlenir?",
        "puan": 15,
        "konu": "Isıl İşlemler",
        "cevapAnahtari": "Brinell yönteminde sert bir çelik bilye kullanılır. Bilye parçaya belirli bir kuvvetle bastırılır; oluşan izin çapı ölçülerek sertlik değeri hesaplanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Korozyon nedir? Bir korozyon çeşidine örnek veriniz. Korozyon metal parçaların ömrünü nasıl etkiler?",
        "puan": 15,
        "konu": "Korozyon",
        "cevapAnahtari": "Korozyon, metallerin çevresel etkenlerle (nem, oksijen vb.) kimyasal veya elektrokimyasal olarak aşınmasıdır (paslanma). Örneğin demirin havada nemle temas ederek paslanması yaygın bir korozyon çeşididir. Korozyon, parçanın malzeme kaybına uğrayarak zamanla zayıflamasına ve kullanım ömrünün kısalmasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Demir olmayan metaller ağır ve hafif metaller olarak ikiye ayrılır. Alüminyum hangi gruba girer?",
        "puan": 10,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Alüminyum hafif metaller grubuna girer çünkü yoğunluğu düşüktür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Doğada kendiliğinden bulunmayan, kimyasal işlemle üretilen bir plastik hangi sınıfa girer? Doğal ve yapay plastik ayrımını kısaca açıklayınız.",
        "puan": 10,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Böyle bir plastik yapay plastik sınıfına girer. Doğal plastikler doğada hazır bulunan organik maddelerden elde edilirken, yapay plastikler kimyasal işlemlerle petrol türevlerinden üretilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çekme deneyi ile bir malzemenin hangi özelliği ölçülür? Bu deney malzemeyi tahrip eder mi?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Çekme deneyi ile malzemenin mukavemeti (dayanımı) ve kopma noktası ölçülür. Bu deney malzemeyi tahrip eder çünkü parça kopana kadar çekilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Üretim hattında çok sayıda parça hızlıca kontrol edilecekse hangi muayene yöntemi tercih edilir? Bu yöntemin avantajı nedir?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Gözle muayene tercih edilir. Bu yöntem hızlı ve ucuzdur; özel bir cihaz gerektirmeden parçaya zarar vermeden yüzeydeki çatlak, çizik gibi hataları anında tespit etmeye yarar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Röntgen ışınları ile kontrol yöntemi parçanın hangi tür hatalarını tespit etmede kullanılır?",
        "puan": 15,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Röntgen ışınları, parçanın iç yapısındaki gözenek, çatlak veya boşluk gibi gözle görülemeyen iç hataları tespit etmek için kullanılır. Işınlar malzeme içinden geçerken hatalı bölgelerde farklı yoğunluk gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Toz metalürjisinde metal tozları nasıl elde edilir? Bu yöntemin dökümle üretime göre bir avantajı nedir?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Metal tozları; atomizasyon (eritilmiş metalin püskürtülerek hızla soğutulması) veya mekanik öğütme gibi yöntemlerle elde edilir. Bu yöntem, karmaşık şekilli parçaların ek işleme gerek kalmadan doğrudan üretilebilmesini sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Toz hâlindeki bir metal doğrudan kullanılamayacağına göre önce şekil kazandırmak gerekir. Presleme işlemi bunu nasıl sağlar?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Presleme işlemi uygulanır: metal tozu bir kalıba doldurulur ve yüksek basınçla sıkıştırılarak istenen şekle getirilir. Bu aşamada parça henüz tam mukavemetini kazanmamıştır; mukavemet sinterleme ile sonradan kazandırılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Korozyona karşı bir metali korumak için hangi yöntemler kullanılabilir? İki yöntem yazınız.",
        "puan": 15,
        "konu": "Korozyon",
        "cevapAnahtari": "Metal yüzeyi boyanabilir, galvanizleme (çinko kaplama) yapılabilir veya paslanmaz çelik gibi korozyona dayanıklı malzeme tercih edilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kompozit malzeme nedir? Bir örnek veriniz.",
        "puan": 15,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Kompozit malzeme, farklı özelliklere sahip iki veya daha fazla malzemenin birleştirilmesiyle elde edilen, bileşenlerinden daha üstün özellikli yeni bir malzemedir. Örneğin cam elyaf takviyeli plastik (fiberglass) bir kompozit malzemedir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kıvılcım deneyi ile bir çeliğin karbon oranı hakkında nasıl fikir edinilir?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Çelik taşlama taşına tutulduğunda çıkan kıvılcımların rengi, şekli ve sayısı incelenir; karbon oranı arttıkça kıvılcımlar daha yıldızımsı ve bol çıkar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sinterleme işlemi neden yapılır?",
        "puan": 10,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Sinterleme, preslenmiş toz parçanın erime sıcaklığının altında bir sıcaklıkta fırınlanarak tozların birbirine kaynaşmasını ve parçanın mukavemet kazanmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir metal yüzeyinin boyanması korozyonu nasıl önler?",
        "puan": 10,
        "konu": "Korozyon",
        "cevapAnahtari": "Boya, metal yüzeyi ile hava/nem arasında bir bariyer oluşturarak oksijen ve nemin metale temasını engeller, böylece paslanmayı önler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bakır ağır metaller grubuna girer. Ağır metallerin genel kullanım alanlarına bir örnek veriniz. Hafif metallerin tercih edildiği bir kullanım alanı da yazınız.",
        "puan": 15,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Bakır, elektrik kablolarında iletkenlik özelliğinden dolayı kullanılır. Hafif metaller ise (örneğin alüminyum) uçak ve otomotiv sanayinde ağırlığı azaltmak için tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yapay plastiklerin doğal plastiklere göre bir avantajı nedir?",
        "puan": 10,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Yapay plastikler, istenen özelliklere (dayanıklılık, esneklik vb.) göre kimyasal olarak tasarlanabildiği için daha geniş bir kullanım alanına sahiptir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çekme deneyinde bir malzeme koptuğunda hangi bilgiye ulaşılmış olur?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Malzemenin kopma anındaki mukavemeti (çekme dayanımı) belirlenmiş olur; bu değer malzemenin ne kadar yük taşıyabileceğini gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ultrasonik muayene yöntemi bir parçanın iç yapısını nasıl kontrol eder?",
        "puan": 15,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Ultrasonik muayenede parçaya ses dalgaları gönderilir. Dalgalar parça içinde bir hataya (çatlak, boşluk) çarptığında yansıyarak geri döner; bu yansımalar incelenerek iç hatalar tespit edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kıvılcım deneyi ile bir çeliğin karbon oranı hakkında nasıl fikir edinilir? Bu yöntem neden hızlı ve pratik bir yöntem sayılır?",
        "puan": 15,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Çelik taşlama taşına tutulduğunda çıkan kıvılcımların rengi, şekli ve sayısı incelenir; karbon oranı arttıkça kıvılcımlar daha yıldızımsı ve bol çıkar. Bu yöntem özel bir cihaz gerektirmediği ve saniyeler içinde sonuç verdiği için hızlı ve pratiktir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Eritilmiş bir metalden toz elde etmek isteniyorsa hangi yöntem kullanılır? Atomizasyon yöntemi bunu nasıl sağlar?",
        "puan": 10,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Atomizasyon yöntemi kullanılır: eritilmiş metal, basınçlı bir gaz veya su ile püskürtülerek küçük damlacıklara ayrılır; bu damlacıklar hızla soğuyarak katılaşır ve toz hâline gelir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sinterleme işlemi neden erime sıcaklığının altında yapılır? Bu işlem yapılmazsa preslenmiş parçaya ne olur?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Sinterleme, tozların erimeden birbirine kaynaşıp bağ oluşturması için erime sıcaklığının altında yapılır. Bu işlem yapılmazsa preslenmiş parça yeterli mukavemeti kazanamaz ve dağılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Nemli ve sıcak bir ortamda bekletilen bir demir parça, kuru ve serin bir ortamdakine göre neden daha hızlı paslanır? Korozyon hızını etkileyen faktörlerden ikisini yazınız.",
        "puan": 10,
        "konu": "Korozyon",
        "cevapAnahtari": "Nem oranı ve sıcaklık, korozyon hızını etkileyen önemli faktörlerdendir; nem ve sıcaklık arttıkça korozyon hızlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sadece saf bakırla yapılamayan ama daha sert bir malzeme gerektiğinde hangi alaşım tercih edilir? Bakır ve pirinç arasındaki ilişki nedir?",
        "puan": 10,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Pirinç, bakır ile çinkonun alaşımından oluşan bir demir dışı malzemedir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Termoplastik ve termoset plastikler arasındaki fark nedir?",
        "puan": 15,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Termoplastikler ısıtıldığında yumuşayıp tekrar şekillendirilebilirken, termoset plastikler bir kere şekillendirildikten sonra ısıtılsa bile tekrar şekil değiştirmez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Beton gibi basınca dayanıklı ama çekmeye karşı zayıf bir malzemenin dayanımı hangi deneyle test edilir? Bu deney hangi tür malzemelerde daha çok kullanılır?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Basma deneyi, beton, döküm gibi basınca dayanıklı ama çekmeye karşı zayıf malzemelerin test edilmesinde daha çok kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Gözle görülemeyecek kadar ince bir yüzey çatlağı tespit edilmek isteniyorsa hangi yöntem kullanılır? Bu yöntem nasıl çalışır?",
        "puan": 10,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Penetran sıvı yöntemi, malzeme yüzeyindeki gözle görülmesi zor ince çatlakları tespit etmek için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Alüminyum bir parçada manyetik kontrol yöntemi neden işe yaramaz? Bu yöntem hangi tür malzemelerde kullanılabilir?",
        "puan": 15,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Alüminyum manyetiklenebilen bir malzeme olmadığı için bu yöntemle kontrol edilemez. Manyetik kontrol yöntemi, sadece manyetiklenebilen (demir esaslı) malzemelerde kullanılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Metali eritmeden toz hâline getirmek isteniyorsa hangi yöntem kullanılır? Bu yöntem nasıl çalışır?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Katı metal parçalar, değirmen benzeri bir düzenekte çarpıştırılıp öğütülerek toz hâline getirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sürekli kesitli (çubuk, boru gibi) bir parça toz metalürjisiyle üretilecekse hangi yöntem tercih edilir? Bu yöntem nasıl çalışır?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Metal tozu bir kalıptan yüksek basınçla itilerek sürekli kesitli (çubuk, boru gibi) parçalar üretilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kompozit malzemelerde takviye malzemesi ne işe yarar?",
        "puan": 10,
        "konu": "Demir Dışı Malzemeler",
        "cevapAnahtari": "Takviye malzemesi (örneğin cam elyaf), ana malzemeye mukavemet ve dayanıklılık kazandırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Burulma deneyi ile bir malzemenin hangi özelliği ölçülür?",
        "puan": 15,
        "konu": "Malzeme Muayene Yöntemleri",
        "cevapAnahtari": "Burulma deneyi ile malzemenin burulma (tork) kuvvetlerine karşı dayanımı ölçülür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sıvı faz sinterlemesi katı faz sinterlemesinden nasıl farklıdır?",
        "puan": 15,
        "konu": "Toz Metalürjisi",
        "cevapAnahtari": "Sıvı faz sinterlemesinde karışımdaki bazı bileşenler kısmen erirken, katı faz sinterlemesinde hiçbir bileşen erimeden katı hâlde kalarak birbirine kaynaşır."
      }
    ]
  },
  {
    "dersAdi": "Bakım Onarım Meslek Resmi",
    "sinifGrade": 10,
    "sorular": [
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir M10 vidanın diş resmini çiziniz.",
        "puan": 10,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "M10 vida: nominal çap 10 mm, diş adımı 1,5 mm. Diş dibi/diş üstü çapları standart gösterim kurallarına (kalın/ince çizgi) uygun çizilmelidir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir M12 altıgen başlı cıvatanın tam resmini çiziniz.",
        "puan": 10,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "M12 altıgen başlı cıvata: anahtar ağzı ölçüsü ve gövde çapı standart tablodan alınarak baş, gövde ve diş kısmı standart oranlarda çizilmelidir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir cıvata ve somunu kullanarak basit bir vidalı birleştirme resmi çiziniz.",
        "puan": 15,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "Cıvata ve somun standart ölçülerine uygun, birbirine göre doğru eksende ve dişli bölgede örtüşecek şekilde çizilmelidir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir M8 silindir başlı (inbus) cıvatanın resmini çiziniz.",
        "puan": 10,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "M8 inbus cıvata: silindirik baş çapı ve iç altıgen anahtar ağzı ölçüsü standart tablodan alınarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir M6 somunun resmini çiziniz.",
        "puan": 15,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "M6 somun: anahtar ağzı ve yükseklik standart tablodan alınarak standart gösterim kurallarına uygun çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir düz rondela resmi çiziniz.",
        "puan": 15,
        "konu": "Rondela Çizimi",
        "cevapAnahtari": "Düz rondela iki eş merkezli daire (iç çap, dış çap) ve kalınlık ölçüsüyle standart tablodan alınarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir yaylı rondela resmi çiziniz.",
        "puan": 10,
        "konu": "Rondela Çizimi",
        "cevapAnahtari": "Yaylı rondelanın kesik/yaylı profili standart gösterim kuralına göre yandan görünüşte belirtilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir cıvata-somun-rondela birleşimini gösteren bir resim çiziniz.",
        "puan": 15,
        "konu": "Rondela Çizimi",
        "cevapAnahtari": "Rondela, cıvata başı ile bağlanan parça arasına, doğru iç çapla yerleştirilerek çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir M10 somunun tam resmini (iç diş gösterimiyle) çiziniz.",
        "puan": 15,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "M10 somun: anahtar ağzı ve yükseklik standart tablodan alınır; iç diş kesit görünüşte standart gösterim kuralına göre çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "İki parçayı M10 cıvata-somun ile birleştiren bir vidalı birleştirme resmini kesit görünüşle çiziniz.",
        "puan": 15,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "Kesitte her parça farklı yönde/aralıkta taranır; cıvata ve somun kesit alınmadan (tam görünüşte) gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir cıvatanın resmini 2:1 ölçekte çizip ölçeği resim üzerinde belirtiniz.",
        "puan": 15,
        "konu": "Vida, Cıvata ve Somun Resmi Çizimi",
        "cevapAnahtari": "Gerçek ölçüler 2 katına çıkarılarak çizilir; kullanılan ölçek (2:1) resim üzerinde veya bilgi alanında açıkça belirtilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir dişli rondela resmi çiziniz.",
        "puan": 15,
        "konu": "Rondela Çizimi",
        "cevapAnahtari": "Dişli rondelanın kenarındaki dişler standart gösterim kuralına göre kısmi/sembolik olarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir emniyet sacı resmi çiziniz.",
        "puan": 10,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Emniyet sacı, mil ucundaki somunu sabitleyecek şekilde standart tablodan alınan ölçülerle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir ayar bileziği resmi çiziniz.",
        "puan": 10,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Ayar bileziği, iç çapı mil çapına uygun olacak şekilde standart tablodan alınan ölçülerle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir gupilya resmi çiziniz.",
        "puan": 15,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Gupilya, çatallı ucu standart gösterim kuralına uygun şekilde, tablo ölçülerine göre çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir dış emniyet segmanı resmi çiziniz.",
        "puan": 10,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Dış segman, mil üzerindeki kanala oturacak şekilde standart tablodan alınan ölçülerle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir mil tespit plakası resmi çiziniz.",
        "puan": 15,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Mil tespit plakası, mil ucuna cıvatayla sabitlenecek delik konumlarıyla standart tablodan alınan ölçülerle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir perno resmi çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Girişi",
        "cevapAnahtari": "Perno, her iki ucu dişli olacak şekilde standart tablodan alınan çap ve boy ölçüleriyle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir silindirik pim resmi çiziniz.",
        "puan": 10,
        "konu": "Birleştirme Resimleri Çizimi Girişi",
        "cevapAnahtari": "Silindirik pim, standart tablodan alınan çap ve boy ölçüleriyle düz gövdeli olarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir konik pim resmi çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Girişi",
        "cevapAnahtari": "Konik pim, standart koniklik oranı (1:50) ve uç/dip çapları tablodan alınarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir iç emniyet segmanı resmi çiziniz.",
        "puan": 10,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "İç segman, bir deliğin iç kanalına oturacak şekilde standart tablodan alınan ölçülerle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir mil üzerinde emniyet segmanı ile sabitlenmiş bir parçanın birleştirme resmini çiziniz.",
        "puan": 15,
        "konu": "Emniyetli Bağlama Elemanları Çizimi Devamı",
        "cevapAnahtari": "Segman, milin üzerindeki kanala oturarak parçanın eksenel hareketini sınırlayacak şekilde gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Perno ile birleştirilmiş iki parçanın resmini çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Girişi",
        "cevapAnahtari": "Perno iki parçayı deliklerinden geçerek birleştirir, her iki ucuna somun takılarak sıkıştırma gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Pimle hizalanmış iki parçanın resmini çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Girişi",
        "cevapAnahtari": "Pim, iki parçanın hizalanan deliklerinden geçerek parçaları doğru konumda sabitler."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart tablodan ölçülerini bularak bir düz kamanın resmini çiziniz.",
        "puan": 10,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Düz kama, mil çapına uygun genişlik/yükseklik ölçüleriyle standart tablodan alınarak dikdörtgen kesitli çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir mil üzerindeki kama kanalı ile kamanın birleştirme resmini, aralarında bırakılan boşluğu göstererek çiziniz.",
        "puan": 10,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Kanal ile kama arasında standart tabloda belirtilen küçük montaj boşluğu, ölçülendirmede açıkça gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart gösterim kuralına uygun olarak bir basınç yayının resmini çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Yay, standart basitleştirilmiş çizgilerle gösterilir; gerçek sarım sayısı ve tel çapı not olarak belirtilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "İki sac parçayı birleştiren bir perçinli birleştirme resmi çiziniz.",
        "puan": 10,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Perçin standart tablodan alınan gövde çapı ve boyla çizilir; iki sac arasında kalıcı birleşim olarak gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart kaynak sembollerini kullanarak bir köşe kaynağı birleştirme resmi çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Köşe kaynağı standart kaynak sembolüyle, kılavuz çizgi ve kaynak boyu bilgisiyle birlikte gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Standart ölçülere göre bir kasnağın (göbek, kol, çember, oluk dahil) resmini çiziniz.",
        "puan": 10,
        "konu": "Makine Elemanları Resmi Çizimi",
        "cevapAnahtari": "Kasnak, göbek deliği, kol yapısı ve kayış oluğu standart tablodan alınan ölçülerle görünüş ve kesitte gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir mil ile kayma dirençli yatağın (burçlu yatak) birleştirme resmini çiziniz.",
        "puan": 15,
        "konu": "Makine Elemanları Resmi Çizimi",
        "cevapAnahtari": "Kayma dirençli yatak, içindeki burçla birlikte, milin döneceği boşluk standart toleransla gösterilerek çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir mil ile yuvarlanma dirençli yatağın (rulman) birleştirme resmini çiziniz.",
        "puan": 15,
        "konu": "Makine Elemanları Resmi Çizimi",
        "cevapAnahtari": "Rulman, iç/dış bilezik ve bilyeler standart gösterim kuralına uygun kesitte, mil üzerine oturmuş şekilde çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "İki parçayı bir pim ile hizalayan basit bir birleştirme resmi çiziniz.",
        "puan": 15,
        "konu": "Birleştirme Resimleri Çizimi Devamı",
        "cevapAnahtari": "Pim, standart tablodan alınan çap ve boyla, iki parçanın hizalanan deliklerinden geçecek şekilde çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir kasnağın oluk kesitini (V kesit) detaylı olarak çiziniz.",
        "puan": 15,
        "konu": "Makine Elemanları Resmi Çizimi",
        "cevapAnahtari": "Oluk kesiti, standart V-kayış profiline uygun açı ve derinlik ölçüleriyle detay olarak çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Verilen mil devri ve yük bilgisine uygun bir yatak seçip resmini çiziniz.",
        "puan": 15,
        "konu": "Makine Elemanları Resmi Çizimi",
        "cevapAnahtari": "Yüksek devir/düşük yük için yuvarlanma dirençli, düşük devir/yüksek yük için kayma dirençli yatak seçilerek çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Verilen 3 parçayı (mil, kama, kasnak) kullanarak işlem sırasına göre parçaların birleştirme resmini çiziniz.",
        "puan": 10,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Önce mil, ardından kama, son olarak kasnak sırayla monte edilmiş şekilde gösterilir; komple resme ölçü/tolerans verilmez."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Verilen bir mil-yatak grubunun grup montaj resmini çiziniz.",
        "puan": 10,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Mil, yatağın içine doğru toleransla oturmuş şekilde, grup montaj resmi kurallarına uygun çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Vidalı birleştirmeyi içeren bir komple resmi kesit görünüşle çiziniz.",
        "puan": 15,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Kesitte her parça farklı yönde taranır; cıvata/somun kesilmeden tam görünüşte gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Basit bir düzeneğin (2-3 parçalı) patlatılmış (exploded) montaj resmini çiziniz.",
        "puan": 10,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Parçalar montaj sırasına göre bir eksen üzerinde ayrık gösterilir; birleşme yönleri kesikli eksen çizgileriyle belirtilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir kasnak-mil-kama grubunun komple resmini uygun ölçekte çiziniz.",
        "puan": 15,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Kasnak, mil ve kama standart ölçülerine uygun, kağıda sığacak bir ölçekte bir arada gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Bir rulman-mil-yatak grubunun montaj resmini çiziniz.",
        "puan": 10,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Rulman, mil üzerine ve yatak yuvasına doğru toleransla oturmuş şekilde kesitte gösterilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Komple resim üzerinde parça numaralarını (poz numarası) ve parça listesini oluşturunuz.",
        "puan": 15,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Her parçaya kılavuz çizgiyle bir poz numarası verilir; parça listesinde poz no, parça adı ve adedi sıralanır."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Çok parçalı bir düzeneğin görünüşlerini (ön, üst, yan) komple resim olarak çiziniz.",
        "puan": 15,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Ön, üst ve yan görünüşler standart izdüşüm kurallarına göre birbiriyle hizalı çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Perçinli birleştirmeyi içeren bir komple resim çiziniz.",
        "puan": 10,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Perçinli birleştirme, sac parçalar arasında kalıcı bağlantı olarak standart gösterimle çizilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Kaynaklı birleştirmeyi içeren bir komple resim çiziniz.",
        "puan": 15,
        "konu": "Komple Resimler",
        "cevapAnahtari": "Kaynaklı birleştirme, standart kaynak sembolüyle ve kılavuz çizgiyle komple resme dahil edilir."
      }
    ]
  },
  {
    "dersAdi": "Mekanik Bakım Onarım",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Yeni alınan bir tezgahı kurmadan önce kullanma kılavuzunu okumadan doğrudan çalıştırırsak ne gibi bir risk ortaya çıkar?",
        "puan": 10,
        "konu": "Makine Yerleşim Planı",
        "cevapAnahtari": "Makinenin çalışma şartları, güvenlik uyarıları ve bakım gereksinimleri bilinmeden çalıştırılırsa hem makineye zarar verilebilir hem de iş kazası riski oluşur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinenin yerleşim planı (kroki) çizilirken nelere dikkat edilir?",
        "puan": 10,
        "konu": "Makine Yerleşim Planı",
        "cevapAnahtari": "Makinenin çalışma alanı, çevresindeki diğer makinelerle mesafesi, giriş-çıkış yolları ve güvenlik bölgeleri dikkate alınarak kroki çizilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinenin basınçlı hava tesisatı hazırlanırken hangi hususlara dikkat edilir?",
        "puan": 15,
        "konu": "Makine Yerleşim Planı",
        "cevapAnahtari": "Hava hattının çapı makinenin ihtiyacına uygun seçilir, kaçak olmaması için bağlantılar sıkıca yapılır ve hat üzerinde gerekli filtre/regülatör bulunmasına dikkat edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yeni gelen bir makinenin nakliye emniyetleri çıkarılmadan çalıştırılırsa ne olur?",
        "puan": 10,
        "konu": "Makine Kurma İşlemleri",
        "cevapAnahtari": "Nakliye sırasında hareketli parçaları sabit tutan emniyet elemanları çıkarılmadan çalıştırılırsa makinenin hareketli kısımları zorlanır ve ciddi hasar oluşabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makineyi yerine yerleştirdikten sonra elektrik bağlantısını yapmadan önce ne kontrol edilmelidir?",
        "puan": 10,
        "konu": "Makine Kurma İşlemleri",
        "cevapAnahtari": "Makinenin voltaj/akım gereksinimi ile mevcut elektrik hattının uygunluğu kontrol edilir; ayrıca topraklama bağlantısının sağlam olduğundan emin olunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makineye yanlış tipte yağlama yağı konulursa ne gibi bir sorun ortaya çıkar?",
        "puan": 15,
        "konu": "Makine Kurma İşlemleri",
        "cevapAnahtari": "Yanlış yağ, hareketli parçalar arasında yeterli yağlama sağlayamayabilir; bu da aşırı sürtünme, ısınma ve parçaların erken aşınmasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinede günlük, haftalık ve aylık bakım takvimi neden ayrı ayrı belirlenir?",
        "puan": 15,
        "konu": "Makinelerin Düzenli Bakımı",
        "cevapAnahtari": "Farklı parçaların/bakım işlemlerinin aşınma ve kontrol gereksinimi farklı sürelerde ortaya çıkar; örneğin günlük temizlik gerekirken yağ değişimi aylık olabilir. Ayrı takvim, hiçbir bakımın atlanmamasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölye yerleşim ve tesisat planlarını okumak neden önemlidir? Bu planlar olmadan bakım yapılırsa ne gibi bir risk oluşur?",
        "puan": 15,
        "konu": "Makinelerin Düzenli Bakımı",
        "cevapAnahtari": "Bu planlar, elektrik/hava hatlarının nereden geçtiğini gösterir; bakım sırasında bu hatlara zarar vermemek ve doğru noktadan müdahale etmek için önemlidir. Planlar olmadan yapılan bakımda gizli bir hatta zarar verilme riski vardır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinenin yerleşim planı çizilirken güvenlik bölgeleri neden ayrılır? Bir örnek veriniz.",
        "puan": 15,
        "konu": "Makine Yerleşim Planı",
        "cevapAnahtari": "Güvenlik bölgeleri, çalışan makinenin hareketli kısımlarına veya olası tehlikeli alanlarına insanların yaklaşmasını önlemek için ayrılır. Örneğin bir pres makinesinin önüne çizilen sarı-siyah şerit bir güvenlik bölgesi örneğidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yeni kurulan bir makine sabitlenmeden çalıştırılırsa ne olabilir?",
        "puan": 15,
        "konu": "Makine Kurma İşlemleri",
        "cevapAnahtari": "Makine çalışırken titreşim yapabilir, yerinden oynayabilir; bu hem hassasiyeti bozar hem de güvenlik riski oluşturur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makine bir süre çalıştıktan sonra vidaların gevşeyip gevşemediği neden kontrol edilir?",
        "puan": 15,
        "konu": "Makine Kurma İşlemleri",
        "cevapAnahtari": "Çalışma sırasındaki titreşimler vidaları zamanla gevşetebilir; gevşeyen vidalar makinenin hassasiyetini bozar ve güvenlik riski oluşturur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinenin karter sızdırmazlık elemanı (keçe) eskiyip yağ sızdırmaya başlarsa ne yapılır?",
        "puan": 10,
        "konu": "Makinelerin Düzenli Bakımı",
        "cevapAnahtari": "Eskiyen sızdırmazlık elemanı (keçe) sökülüp yerine standart ölçülerde yeni bir keçe takılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Katalogdan seçilen bir parça makineye monte edilmeden önce neye dikkat edilir?",
        "puan": 15,
        "konu": "Makinelerin Düzenli Bakımı",
        "cevapAnahtari": "Parçanın ölçü ve özelliklerinin makineye tam uyup uymadığı kontrol edilir; uymayan bir parça takılırsa arıza veya hasara yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Basınçlı hava tesisatında filtre/regülatör bulunmaması ne gibi bir soruna yol açabilir?",
        "puan": 10,
        "konu": "Makine Yerleşim Planı",
        "cevapAnahtari": "Filtre olmadan hava hattına giren nem/kirlilik makinenin pnömatik parçalarına zarar verebilir; regülatör olmadan ise basınç dengesiz olur ve ekipman hasar görebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sızdırmazlık elemanı seçerken standart çizelgeden ölçü almanın önemi nedir?",
        "puan": 15,
        "konu": "Makinelerin Düzenli Bakımı",
        "cevapAnahtari": "Yanlış ölçüde bir sızdırmazlık elemanı kullanılırsa tam sızdırmazlık sağlanamaz ve yağ/sıvı kaçağı devam eder; bu da makinenin yağ kaybetmesine ve arızaya yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir rulmanın aşırı ısındığı fark edildi. Bu durumda önce hangi kontrol yapılır?",
        "puan": 10,
        "konu": "Sistem Kontrolleri",
        "cevapAnahtari": "Öncelikle rulmanın yeterli yağlanıp yağlanmadığı kontrol edilir; yetersiz yağlama aşırı ısınmanın en yaygın nedenidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kavrama sistemi kaymaya (tam güç aktaramamaya) başlarsa bu neyin işareti olabilir?",
        "puan": 15,
        "konu": "Sistem Kontrolleri",
        "cevapAnahtari": "Kavrama balatalarının aşındığının veya yağlandığının işareti olabilir; bu durumda balatalar kontrol edilip gerekirse değiştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "20 ton yük kaldıracak bir tel halat seçerken sadece yükün ağırlığına bakmak yeterli midir? Neden?",
        "puan": 10,
        "konu": "Kaldırma ve Taşıma Araçları",
        "cevapAnahtari": "Yeterli değildir; halatın güvenlik faktörü (emniyet katsayısı) de hesaba katılmalıdır, çünkü halat sadece nominal yükü değil ani yüklenme ve aşınma payını da karşılayabilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik krikonun çalışma mantığı nedir?",
        "puan": 15,
        "konu": "Kaldırma ve Taşıma Araçları",
        "cevapAnahtari": "Hidrolik kriko, küçük bir pistona uygulanan kuvvetin sıvı basıncıyla büyük bir pistona aktarılması prensibiyle çalışır; bu sayede küçük bir kuvvetle büyük bir yük kaldırılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makineden anormal bir ses geliyor. Bu, arıza tespitinde hangi duyu organı ile yapılan bir kontrole örnektir?",
        "puan": 10,
        "konu": "Arıza Tespiti",
        "cevapAnahtari": "Kulak (işitme) ile yapılan kontrole örnektir; anormal sesler genellikle bir parçanın aşındığı veya gevşediği anlamına gelir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Arızalı bir parçayı tamir öncesi temizlemek neden önemlidir?",
        "puan": 10,
        "konu": "Arızalı Makinenin Onarımı",
        "cevapAnahtari": "Kir ve yağ birikintisi, arızanın gerçek kaynağının görülmesini engelleyebilir; temiz bir yüzeyde arıza çok daha net tespit edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçayı sökerken söküm sırasına dikkat etmek neden önemlidir?",
        "puan": 15,
        "konu": "Arızalı Makinenin Onarımı",
        "cevapAnahtari": "Yanlış sırayla söküm bazı parçalara zarar verebilir; ayrıca parçaların yerlerinin karışmasına ve montajda hata yapılmasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Arızalı bir parçayı tamir etmek mi yoksa değiştirmek mi tercih edilir? Bu karar neye göre verilir?",
        "puan": 15,
        "konu": "Arızalı Makinenin Onarımı",
        "cevapAnahtari": "Karar, parçanın hasar derecesine ve tamir maliyetinin yeni parça maliyetine oranına göre verilir; hafif hasarlarda tamir, ağır hasarlarda değişim tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kayış gerginliği kontrol edilirken neye dikkat edilir? Çok gevşek bir kayış ne gibi soruna yol açar?",
        "puan": 10,
        "konu": "Sistem Kontrolleri",
        "cevapAnahtari": "Kayışa orta noktasından bastırıldığında belirli bir sapma miktarını geçmemesi gerekir. Çok gevşek bir kayış kasnak üzerinde kayarak güç aktaramaz ve zamanla aşınır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makine yağlama sisteminde yanlış viskozitede yağ kullanılırsa ne olur?",
        "puan": 15,
        "konu": "Sistem Kontrolleri",
        "cevapAnahtari": "Çok ince yağ yeterli yağlama filmi oluşturamaz, çok kalın yağ ise hareketli parçalara zor ulaşır; her iki durumda da aşınma ve sürtünme artar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir vinçle yük kaldırılırken hangi güvenlik tedbirlerine dikkat edilir?",
        "puan": 10,
        "konu": "Kaldırma ve Taşıma Araçları",
        "cevapAnahtari": "Vincin kapasitesi aşılmamalı, yük altında kimse bulunmamalı ve yük dengeli bağlanmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Forklift ile yük taşırken yükün ağırlık merkezi neden önemlidir?",
        "puan": 15,
        "konu": "Kaldırma ve Taşıma Araçları",
        "cevapAnahtari": "Ağırlık merkezi forkların ucuna çok yakınsa forklift dengesini kaybedip devrilebilir; bu yüzden yük forklife mümkün olduğunca yakın taşınmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir makinenin çalışma sistemini iyi tanımak, arıza sebebini bulmada neden önemlidir?",
        "puan": 10,
        "konu": "Arıza Tespiti",
        "cevapAnahtari": "Makinenin normal çalışma şartlarını bilen bir kişi, hangi parçanın hangi işlevi gördüğünü anlayarak anormalliğin kaynağını daha hızlı ve doğru tespit edebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tamir sonrası makine testi yapılmadan makineyi kullanıma sokmanın riski nedir?",
        "puan": 15,
        "konu": "Arızalı Makinenin Onarımı",
        "cevapAnahtari": "Tamirin tam başarılı olup olmadığı bilinmeden makine kullanılırsa, gizli kalmış bir sorun üretim sırasında büyük bir arızaya veya kazaya yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yağ değişimi yapılırken eski yağ neden tamamen boşaltılmalıdır?",
        "puan": 15,
        "konu": "Sistem Kontrolleri",
        "cevapAnahtari": "Eski yağda birikmiş kir ve metal parçacıkları yeni yağa karışırsa yeni yağın koruma performansı düşer; bu yüzden eski yağ tamamen boşaltılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elevatörler hangi tür yüklerin taşınmasında tercih edilir?",
        "puan": 15,
        "konu": "Kaldırma ve Taşıma Araçları",
        "cevapAnahtari": "Elevatörler, malzemeleri farklı katlar/seviyeler arasında dikey olarak sürekli ve düzenli taşımak için tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Arıza tespitinde makinedeki ses, titreşim ve ısı değişimleri neden not edilir?",
        "puan": 10,
        "konu": "Arıza Tespiti",
        "cevapAnahtari": "Bu belirtiler arızanın yerini ve nedenini anlamaya yardımcı olur. Not edilen bilgiler, arıza tekrar ettiğinde karşılaştırma yapmayı ve doğru onarımı kolaylaştırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Onarılan veya yenisiyle değiştirilen parça takılmadan önce neden ölçü ve uyum kontrolü yapılır?",
        "puan": 15,
        "konu": "Arızalı Makinenin Onarımı",
        "cevapAnahtari": "Parçanın ölçüsü veya yuvaya uyumu yanlışsa montajda sıkışma, boşluk ve erken arıza oluşur. Kontrol, aynı işin tekrar yapılmasını önler."
      }
    ]
  },
  {
    "dersAdi": "Otomatik Kontrol Sistemleri",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik sistemlerin pnömatik sistemlere göre üstün yönü nedir? Bir zayıf yönünü de yazınız.",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Hidrolik sistemler çok daha yüksek kuvvet/basınç üretebilir (üstün yön). Zayıf yönü ise sıvı kaçağı riski ve daha yüksek maliyettir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre şemasında bir silindirin sembolü nasıl gösterilir, kısaca tarif ediniz.",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Silindir, içinde bir piston bulunan dikdörtgen bir kutu ve pistondan çıkan bir kol ile gösterilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre elemanlarının montajı neden önemlidir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Doğru monte edilmeyen elemanlar sızıntı yapabilir veya sistemin verimli çalışmasını engelleyebilir; bu yüzden montaj dikkatle yapılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre elemanlarını monte ederken güvenli tesisat yapmak için nelere dikkat edilir?",
        "puan": 15,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Bağlantılar sızdırmaz şekilde sıkılmalı, hortum/borular basınca uygun seçilmeli ve hareketli parçalara temas etmeyecek şekilde döşenmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik boru montajında borunun bükülmesi gerekiyorsa nelere dikkat edilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Boru, iç çapını daraltmayacak ve çatlatmayacak şekilde, uygun bükme aleti ile yavaşça bükülür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik sistemde yanlış akışkan (yağ) seçilirse ne olur?",
        "puan": 15,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Yanlış viskozitede akışkan, sistemde yetersiz yağlama veya aşırı dirence yol açar; ayrıca soğutma yetersiz kalırsa sistem aşırı ısınabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir hidrolik sistem için bakım planı ve tamirat dosyası neden hazırlanır?",
        "puan": 15,
        "konu": "Hidrolik Devrelerde Bakım Planı",
        "cevapAnahtari": "Bakım planı, düzenli kontrollerin aksatılmadan yapılmasını sağlar; tamirat dosyası ise geçmiş arızaların ve yapılan işlemlerin kaydını tutarak ileride referans olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Arızalı bir tesisatı sökmeden önce arıza arama çizelgesi hazırlamanın önemi nedir?",
        "puan": 15,
        "konu": "Hidrolik Devrelerde Bakım Planı",
        "cevapAnahtari": "Arıza arama çizelgesi, sökme işlemine başlamadan önce olası arıza noktalarını sistematik olarak incelemeyi sağlar; bu da gereksiz sökme işlemlerini önler ve zaman kazandırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre şemasında bir pompanın sembolü ile bir silindirin sembolü nasıl ayırt edilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Pompa sembolü genellikle içinde ok bulunan bir daire ile gösterilirken, silindir dikdörtgen gövde ve çıkan bir pistondan oluşan bir sembolle gösterilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Devre elemanları montajı yapılırken önce ne hazırlanmalıdır?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Montaj öncesi hangi elemanların kullanılacağı belirlenir ve bu elemanların çalışır/sağlam durumda olduğu kontrol edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik hortum montajı yapılırken nelere dikkat edilir?",
        "puan": 15,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Hortumun basınç değerine uygun olması, bağlantı noktalarının sızdırmaz sıkılması ve hortumun keskin kenarlara sürtünmeyecek şekilde döşenmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik sistemde soğutma yetersiz kalırsa ne olur?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Sistem aşırı ısınabilir; bu da akışkanın özelliklerini bozarak yetersiz yağlamaya ve elemanların erken aşınmasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yağlama ve soğutma sisteminin hidrolik devrede önemi nedir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Yağlama, hareketli parçalar arasındaki sürtünmeyi azaltır; soğutma ise sistemin aşırı ısınmasını önleyerek akışkanın özelliklerini korur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik arıza aramada kullanılan alet ve göstergelerin bakımı neden önemlidir?",
        "puan": 15,
        "konu": "Hidrolik Devrelerde Bakım Planı",
        "cevapAnahtari": "Bakımı yapılmamış alet/gösterge yanlış ölçüm/gösterge değeri verebilir; bu da arızanın yanlış teşhis edilmesine yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik sistemler neden ağır sanayi makinelerinde (pres, iş makinesi vb.) tercih edilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Çünkü hidrolik sistemler çok yüksek kuvvet/basınç üretebildiği için ağır yükleri kaldırma/şekillendirme gibi işlerde etkilidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre şemasında bir valfin sembolü genel olarak nasıl gösterilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Valf, içinde ok işaretleri bulunan kare/dikdörtgen kutucuklarla, akış yönünü gösterecek şekilde sembolize edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Montajı yanlış yapılmış bir hidrolik devre elemanı hangi sorunlara yol açabilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Sızıntıya, sistemin verimsiz çalışmasına veya elemanın erken arızalanmasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik tesisatta hortumlar hareketli parçalara neden temas ettirilmemelidir?",
        "puan": 15,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Sürekli sürtünme hortumun aşınıp patlamasına, bu da yüksek basınçlı yağ sızıntısına ve kazaya yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik boru seçerken sistemin çalışma basıncına göre neye dikkat edilir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Borunun dayanabileceği basınç değeri, sistemin çalışma basıncından yüksek olmalıdır; aksi hâlde boru basınca dayanamayıp patlayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik akışkanın (yağın) düzenli değiştirilmemesi sisteme nasıl zarar verir?",
        "puan": 15,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Zamanla kirlenen ve özelliğini kaybeden yağ, yeterli yağlama ve soğutma sağlayamaz; bu da parçaların aşınmasını hızlandırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tamirat dosyasında hangi bilgiler yer alır?",
        "puan": 15,
        "konu": "Hidrolik Devrelerde Bakım Planı",
        "cevapAnahtari": "Yapılan bakım/onarım tarihleri, değiştirilen parçalar ve tespit edilen arızalar gibi bilgiler yer alır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Arızalı bir tesisat sökülürken sıraya dikkat edilmezse ne olur?",
        "puan": 15,
        "konu": "Hidrolik Devrelerde Bakım Planı",
        "cevapAnahtari": "Yanlış sırayla söküm parçalara zarar verebilir veya montaj sırasında karışıklığa yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hidrolik devre şemasında bir pompa ile bir valf sembolü arasındaki temel fark nedir?",
        "puan": 10,
        "konu": "Hidrolik Devre Elemanları",
        "cevapAnahtari": "Pompa, sisteme akışkanı basınçla gönderen kaynak elemanken; valf, bu akışın yönünü veya miktarını kontrol eden elemandır. Sembollerinde pompa genelde dairesel, valf ise kare/dikdörtgen gösterilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir hidrolik valfte arıza ararken ilk kontrol edilecek şeylerden biri nedir?",
        "puan": 10,
        "konu": "Hidrolik Bakım ve Onarım",
        "cevapAnahtari": "Valfin içindeki kir/pislik birikimi ve valf yayının durumu ilk kontrol edilecek noktalardandır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir hidrolik silindirde sızıntı varsa bu hangi parçanın arızalı olabileceğini gösterir?",
        "puan": 10,
        "konu": "Hidrolik Bakım ve Onarım",
        "cevapAnahtari": "Piston contası (sızdırmazlık elemanı) aşınmış veya hasar görmüş olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir hidrolik pompa yeterli basınç üretemiyorsa bu neyin işareti olabilir?",
        "puan": 15,
        "konu": "Hidrolik Bakım ve Onarım",
        "cevapAnahtari": "Pompanın iç aşınması, emiş hattında hava kaçağı veya akışkan seviyesinin düşük olması gibi nedenlerin işareti olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik sistemlerin hidrolik sistemlere göre üstün yönü nedir?",
        "puan": 15,
        "konu": "Pnömatik Devre Elemanları",
        "cevapAnahtari": "Pnömatik sistemler hava kullandığı için sıvı kaçağı riski taşımaz ve daha hafif/temizdir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik devre şemasında bir silindirin sembolü ile hidrolik silindirin sembolü arasında genel olarak ne fark vardır?",
        "puan": 10,
        "konu": "Pnömatik Devre Elemanları",
        "cevapAnahtari": "Sembollerin temel şekli benzer olsa da pnömatik şemalarda akışkan olarak hava kullanıldığı belirtilir; bazı gösterimlerde farklı tarama şekliyle ayırt edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik tüp/boru montajında sızdırmazlık neden önemlidir?",
        "puan": 15,
        "konu": "Pnömatik Devre Elemanları",
        "cevapAnahtari": "Sızıntı olursa sistem basıncı düşer ve silindir/valfler tam güçle çalışamaz; bu da sistemin verimini düşürür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik sistem bakım planı hazırlarken nelere dikkat edilir?",
        "puan": 15,
        "konu": "Pnömatik Devrelerde Bakım Planı",
        "cevapAnahtari": "Kompresörün ve hat üzerindeki filtre/yağlayıcıların düzenli kontrol sıklığı belirlenir, bakım kayıtları tutulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik sistemlerde arıza ararken tesisat sökme usullerine dikkat etmek neden önemlidir?",
        "puan": 10,
        "konu": "Pnömatik Devrelerde Bakım Planı",
        "cevapAnahtari": "Yanlış sökme, hortum/boru bağlantılarına zarar verebilir veya basınçlı havanın kontrolsüz boşalmasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pnömatik-hidrolik sistem kurulumunda basınç yükselticisinin görevi nedir?",
        "puan": 15,
        "konu": "Pnömatik Devre Elemanları",
        "cevapAnahtari": "Basınç yükseltici, düşük basınçlı hava girişini daha yüksek bir basınca çevirerek daha güçlü bir çıkış sağlar."
      }
    ]
  },
  {
    "dersAdi": "Mekanizmalar",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir iş parçasını cıvata ile bağlarken nelere dikkat edilir?",
        "puan": 10,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Cıvatanın boyu ve çapı iş parçasına uygun seçilir; ayrıca cıvatanın gövdeye tam oturup oturmadığı kontrol edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Saplama nedir, cıvatadan farkı nedir?",
        "puan": 15,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Saplama, iki ucu da dişli olan bir bağlantı elemanıdır; bir ucu parçaya sabit vidalanır, diğer ucuna somun takılır. Cıvatadan farkı, başının olmamasıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mil üzerindeki deliğe pim yerleştirirken delik çapı ile pim çapı arasında nasıl bir ilişki olmalıdır?",
        "puan": 15,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Pim çapı, deliğe hafif geçmeli/sıkı geçmeli oturacak şekilde delik çapına uygun seçilmelidir; çok gevşek olursa pim yerinden çıkabilir, çok sıkı olursa yerleştirilemez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mil üzerine kama kanalı açıldıktan sonra kamayı yerleştirirken nelere dikkat edilir? Segmanın görevi nedir?",
        "puan": 10,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Kama, kanala tam oturacak ölçüde seçilmeli ve boşluk bırakmadan yerleştirilmelidir. Segman ise bir parçanın milin üzerinde eksenel yönde kaymasını önleyen bir emniyet elemanıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Perçinli birleştirme ile kaynaklı birleştirme arasındaki temel fark nedir?",
        "puan": 10,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Perçinde parçalar delinip perçinle mekanik olarak birleştirilir ve malzeme erimez; kaynakta ise parçalar ısıyla eritilerek birleştirilir. İkisi de kalıcı (sökülemeyen) birleştirmedir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mil ile muylu arasındaki fark nedir?",
        "puan": 10,
        "konu": "Mil, Muylu ve Yataklar",
        "cevapAnahtari": "Mil, güç/hareket ileten dönen bir elemandır; muylu ise milin yatak içinde dönen, yatakla temas eden özel kısmıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sabit kavrama ile hareketli (kumandalı) kavrama arasındaki fark nedir?",
        "puan": 15,
        "konu": "Kavrama Elemanları",
        "cevapAnahtari": "Sabit kavrama iki mili sürekli ve ayrılamaz şekilde birbirine bağlarken, hareketli kavrama istenildiğinde devreye girip çıkarak güç aktarımını kesip bağlayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kavrama seçerken kullanım yerine uygunluğu nasıl kontrol edilir?",
        "puan": 15,
        "konu": "Kavrama Elemanları",
        "cevapAnahtari": "Aktarılacak güç/hız değerleri ve millerin hizalanma durumu dikkate alınarak uygun kavrama tipi seçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Cıvata-somun bağlantısında rondela neden kullanılır?",
        "puan": 15,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Rondela, somunun baskısını geniş bir yüzeye yayarak parçanın ezilmesini önler. Yaylı rondela ayrıca titreşimle somunun gevşemesini engeller."
      },
      {
        "tur": "klasik",
        "soruMetni": "Silindirik pim ile konik pim arasındaki fark nedir?",
        "puan": 10,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Silindirik pim, deliğe sıkı geçmeli oturarak parçaları hizalar ve sabitler. Konik pim ise koniklik sayesinde yerine vurularak sıkışır ve gerektiğinde sökülüp tekrar takılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kaymalı yatak ile yuvarlanmalı yatak arasındaki fark nedir?",
        "puan": 15,
        "konu": "Mil, Muylu ve Yataklar",
        "cevapAnahtari": "Kaymalı yatakta mil, yatak yüzeyinde kayarak döner; yuvarlanmalı yatakta ise bilye/makaralar sayesinde sürtünme yuvarlanmaya dönüştürülür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Esnek kavramalar neden kullanılır?",
        "puan": 10,
        "konu": "Kavrama Elemanları",
        "cevapAnahtari": "Esnek kavramalar iki mil arasındaki küçük eksen kaçıklıklarını ve titreşimi karşılar. Böylece mil ve yatakların zorlanması azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kaymalı kavrama aşırı yük altında nasıl bir koruma sağlar?",
        "puan": 15,
        "konu": "Kavrama Elemanları",
        "cevapAnahtari": "Yük belirli bir değeri aşınca kavrama kayarak hareketi keser. Böylece motor ve makine parçaları kırılmaktan korunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir cıvata aşırı veya yetersiz sıkılırsa ne olur?",
        "puan": 10,
        "konu": "Basit Mekanizmalar",
        "cevapAnahtari": "Aşırı sıkılan cıvata kopabilir veya dişi bozulabilir. Yetersiz sıkılan cıvata ise titreşimle gevşeyip parçanın yerinden oynamasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mil-yatak montajında sıra neden önemlidir?",
        "puan": 10,
        "konu": "Mil, Muylu ve Yataklar",
        "cevapAnahtari": "Yanlış sırayla montaj, yatağın veya milin zarar görmesine ya da düzgün oturmamasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kam nedir, hangi tür hareketleri elde etmek için kullanılır?",
        "puan": 10,
        "konu": "Kam, Kasnak ve Kayışlar",
        "cevapAnahtari": "Kam, dönme hareketini düzenli veya düzensiz doğrusal harekete çeviren bir makine elemanıdır; örneğin motorlardaki supap açma-kapama mekanizmasında kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kasnak-kayış sisteminde büyük kasnaktan küçük kasnağa hareket aktarılırsa hız nasıl değişir?",
        "puan": 15,
        "konu": "Kam, Kasnak ve Kayışlar",
        "cevapAnahtari": "Küçük kasnak daha hızlı döner; büyük kasnaktan küçük kasnağa geçildiğinde hız artar, tork (döndürme momenti) azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düz dişli ile başka dişli çeşitleri arasındaki temel fark nedir? Bir örnek veriniz.",
        "puan": 10,
        "konu": "Düz Dişli Çark Hesaplamaları",
        "cevapAnahtari": "Düz dişlilerin dişleri mile paralel düz bir şekildedir; helis dişlilerde ise dişler açılı/eğiktir, bu da daha sessiz çalışmayı sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Standart çizelgeden dişli çark ölçüsü bulmanın önemi nedir?",
        "puan": 15,
        "konu": "Düz Dişli Çark Hesaplamaları",
        "cevapAnahtari": "Standart ölçüler kullanılmazsa birbirine kavraması gereken iki dişli tam oturmaz veya düzgün çalışmaz; standart çizelge, doğru modül ve diş sayısı uyumunu garanti eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mekanizmanın krokisini çizmek neden önemlidir?",
        "puan": 10,
        "konu": "Basit Mekanizmaları Sökme-Takma",
        "cevapAnahtari": "Kroki, mekanizmanın parçalarının birbirine göre konumunu ve çalışma ilkesini görsel olarak kaydeder; sökme-takma sırasında referans olarak kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sökülebilir birleştirme ile sökülemeyen birleştirme arasındaki fark nedir? Birer örnek veriniz.",
        "puan": 15,
        "konu": "Basit Mekanizmaları Sökme-Takma",
        "cevapAnahtari": "Sökülebilir birleştirmeler (vida, cıvata gibi) parçaya zarar vermeden tekrar sökülüp takılabilir; sökülemeyen birleştirmeler (kaynak, perçin gibi) sökülmek istendiğinde parçaya zarar verir veya imkansızdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yağlamanın makine parçaları için önemi nedir?",
        "puan": 10,
        "konu": "Yağlama Sistemi ve Arızaları",
        "cevapAnahtari": "Yağlama, hareketli parçalar arasındaki sürtünmeyi ve aşınmayı azaltır, ayrıca ısınmayı önler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir yağlama pompası yeterli yağ basıncı sağlamıyorsa ilk kontrol edilecek şeylerden biri nedir?",
        "puan": 15,
        "konu": "Yağlama Sistemi ve Arızaları",
        "cevapAnahtari": "Yağ seviyesinin yeterli olup olmadığı ve filtrede tıkanıklık olup olmadığı ilk kontrol edilecek noktalardandır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kasnak-kayış sisteminde kayış gevşek veya aşırı gergin olursa ne olur?",
        "puan": 15,
        "konu": "Kam, Kasnak ve Kayışlar",
        "cevapAnahtari": "Gevşek kayış kasnakta kayar, hareketi tam aktaramaz ve çabuk aşınır. Aşırı gergin kayış ise mil ve yatakları zorlar, ömrünü kısaltır."
      },
      {
        "tur": "klasik",
        "soruMetni": "V kayışın düz kayışa göre bir avantajı nedir?",
        "puan": 10,
        "konu": "Kam, Kasnak ve Kayışlar",
        "cevapAnahtari": "V kayış kasnaktaki oluğa oturduğu için daha az kayar ve daha fazla güç aktarır. Bu yüzden daha küçük kasnaklarda ve kısa mesafelerde tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dişli çarklarda modül neyi ifade eder, birbirine geçen dişlilerin modülü neden aynı olmalıdır?",
        "puan": 15,
        "konu": "Düz Dişli Çark Hesaplamaları",
        "cevapAnahtari": "Modül, dişli çarkın diş büyüklüğünü gösteren değerdir (bölüm dairesi çapının diş sayısına oranı). Dişlilerin birbirine düzgün geçebilmesi için modüllerinin aynı olması gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Küçük dişli büyük dişliyi döndürürse hız ve tork nasıl değişir?",
        "puan": 10,
        "konu": "Düz Dişli Çark Hesaplamaları",
        "cevapAnahtari": "Hareket küçük dişliden büyük dişliye aktarılırsa hız azalır, tork artar. Büyükten küçüğe aktarılırsa hız artar, tork azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mekanizma sökülürken parçaların sırayla ve düzenli şekilde bir yere dizilmesi neden önemlidir?",
        "puan": 15,
        "konu": "Basit Mekanizmaları Sökme-Takma",
        "cevapAnahtari": "Parçalar sırayla dizilirse montajda doğru yerine takılır, karışma ve kayıp olmaz. Böylece mekanizma aynı çalışma düzeniyle yeniden kurulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sökülen parçalar yeniden takılmadan önce neden temizlenip kontrol edilir?",
        "puan": 10,
        "konu": "Basit Mekanizmaları Sökme-Takma",
        "cevapAnahtari": "Kir, çapak veya aşınma montajda sıkışmaya ve erken arızaya yol açar. Aşınmış veya hasarlı parça fark edilirse değiştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yağlama yağı seçerken viskozite (akışkanlık) neden dikkate alınır?",
        "puan": 15,
        "konu": "Yağlama Sistemi ve Arızaları",
        "cevapAnahtari": "Yağ çok akışkan olursa yük altında koruyucu film oluşturamaz, çok koyu olursa hareketi zorlaştırır ve ısınmaya yol açar. Bu yüzden makinenin hız ve yüküne uygun viskozitede yağ seçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makinelerde yağ seviyesi neden düzenli olarak kontrol edilir?",
        "puan": 10,
        "konu": "Yağlama Sistemi ve Arızaları",
        "cevapAnahtari": "Yağ azalırsa parçalar yeterince yağlanamaz, sürtünme ve ısınma artar. Seviye kontrolüyle erken uyarı alınır ve büyük arızalar önlenir."
      }
    ]
  },
  {
    "dersAdi": "Temel Elektrik Bilgisi",
    "sinifGrade": 11,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir iletkeni keserken hangi alet kullanılır, nelere dikkat edilir?",
        "puan": 10,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "Kablo makası (pense) kullanılır; kesim sırasında istenen ölçüde ve düzgün bir kesit elde edilmesine dikkat edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İletken üzerindeki yalıtkanı soyarken en sık yapılan hata nedir, bu hata neye yol açar?",
        "puan": 15,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "En sık yapılan hata, soyma sırasında iç telin de kesilmesidir. Bu durum iletkenin zayıflamasına, kopmaya veya bağlantının sağlam olmamasına yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "İletkenleri bükerken kablo çeşidine göre nelere dikkat edilir?",
        "puan": 10,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "Tek telli kablolar kırılmadan, çok telli kablolar ise telleri dağılmadan düzgün bir şekilde bükülmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İletken kesme/soyma/bükme işlemleri sırasında hangi İSG tedbiri alınır?",
        "puan": 10,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "İşlem yapılmadan önce iletkenin enerjili olmadığından emin olunur ve uygun koruyucu eldiven kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tek telli iletkenlerle tekli düz ek nasıl yapılır?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Soyulan iki iletken ucu birbirine sarılarak (burularak) sıkıca birleştirilir, sonra izole edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çok telli iletkenlerle ek yapmak tek telliye göre neden farklıdır?",
        "puan": 15,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Çok telli iletkende her bir tel dağılabileceği için ek yaparken tellerin düzgün bir arada tutulup burulmasına daha fazla dikkat edilmesi gerekir; aksi hâlde bazı teller bağlantıya dahil olmayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çiftli düz ek ile tekli düz ek arasındaki fark nedir? Ek yerinin yalıtılması neden önemlidir?",
        "puan": 15,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Tekli düz ek, bir damarlı (tek) iletkenlerin uç uca eklenmesidir; çiftli düz ek ise tek damarlı iki iletkenden oluşan ikili kordon veya kabloların eklenmesidir ve burada iki ek yerinin birbirine temas etmemesine dikkat edilir. Ek yerinin yalıtılması kısa devre ve elektrik çarpması riskini önlemek için önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Klemens ile bağlantı yaparken kablo ucu nasıl hazırlanır?",
        "puan": 15,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Kablonun ucu yeterli uzunlukta soyulur ve klemensin vida ile sıkıştıracağı boşluğa düzgünce yerleştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yalıtkan soyarken soyma aletinin iletken kalınlığına uygun seçilmesi neden önemlidir?",
        "puan": 10,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "Alet iletkene uygun olmazsa yalıtkan tam soyulamaz ya da alet tele zarar verir. Zarar gören telin kesiti azalır, bağlantı ısınır ve tel kolay kopar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tek telli iletkenlerle yapılan ekte sarımların sıkı ve yeterli sayıda yapılması neden önemlidir?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Sıkı ve yeterli sarım, iki iletken arasındaki temas yüzeyini artırır ve ek yerinin direncini düşük tutar. Gevşek sarım ek yerinin ısınmasına ve zamanla kopmasına neden olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Klemens bağlantısı gevşek kalırsa ne gibi sonuçlar doğabilir?",
        "puan": 15,
        "konu": "İletkenleri Ekleme ve Bağlama - I",
        "cevapAnahtari": "Gevşek bağlantıda temas direnci artar, klemens ve kablo ısınır, kıvılcım (ark) oluşabilir. Bu durum yalıtkanın erimesine ve yangın riskine yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yalıtkanın gereğinden fazla veya çok az soyulması hangi sorunlara yol açar?",
        "puan": 15,
        "konu": "İletkenleri Bağlantıya Hazırlama",
        "cevapAnahtari": "Fazla soyulursa çıplak iletken dışarıda kalır; kısa devre ve elektrik çarpması riski doğar. Az soyulursa temas yüzeyi yetersiz kalır, bağlantı gevşek olur ve ısınır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İletkeni terminale pabuç (yüksük) ile bağlarken pabuç neden kullanılır?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - II",
        "cevapAnahtari": "Pabuç, çok telli iletkenin uçlarının dağılmadan sağlam ve düzgün bir temas yüzeyi oluşturarak terminale bağlanmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "İletkeni terminale jak (soket) ile bağlamanın pabuca göre bir avantajı nedir?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - II",
        "cevapAnahtari": "Jak bağlantısı, gerektiğinde bağlantının hızlıca takılıp çıkarılmasına imkan tanır; pabuç ise daha kalıcı bir bağlantı sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Topraklama neden önemlidir? Topraklama olmadan bir arıza durumunda ne olabilir?",
        "puan": 15,
        "konu": "İletkenleri Ekleme ve Bağlama - II",
        "cevapAnahtari": "Topraklama, cihaz gövdesinde oluşabilecek kaçak elektriği güvenli bir şekilde toprağa aktararak elektrik çarpmasını önler. Topraklama olmadan gövdeye kaçak akım olması durumunda dokunan kişi elektrik çarpmasına maruz kalabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Basit bir elektrik devresi kurarken hangi elemanlara ihtiyaç duyulur?",
        "puan": 10,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Bir enerji kaynağı (pil/priz), iletken kablolar ve bir alıcı (ampul, motor vb.) gibi temel elemanlara ihtiyaç duyulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Açık devre ile kapalı devre arasındaki fark nedir?",
        "puan": 10,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Kapalı devrede akım tam bir yol izleyerek devresini tamamlar ve alıcı çalışır; açık devrede ise yol bir noktada kesiktir, akım geçemez ve alıcı çalışmaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kısa devre neden tehlikelidir?",
        "puan": 15,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Kısa devrede akım, alıcıdan geçmeden çok düşük dirençli bir yoldan aşırı yüksek şiddette akar; bu da aşırı ısınmaya, yangına veya sigortaların atmasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir prizde faz ile nötr ucunu ayırt etmek için hangi alet kullanılır, nasıl ölçüm yapılır?",
        "puan": 15,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Faz kalemi (fazmetre) kullanılır; prizin deliklerine dokundurulduğunda kalemin ışığı yanan uç fazdır. Multimetre ile de her uç ile toprak hattı arasındaki gerilim ölçülür; yaklaşık 230 V okunan uç faz, sıfıra yakın okunan uç nötrdür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tek fazlı bir motorun devir yönünü değiştirmek için genel olarak ne yapılır?",
        "puan": 15,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Motorun sargı bağlantılarından ikisinin (genellikle yardımcı sargı uçlarının) yeri değiştirilerek devir yönü ters çevrilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Topraklı fişe kablo bağlarken faz, nötr ve toprak iletkenlerinin doğru uçlara bağlanması neden önemlidir?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - II",
        "cevapAnahtari": "Faz, nötr ve toprak (sarı-yeşil) iletkenler fişte kendi uçlarına bağlanmalıdır. Yanlış bağlantıda cihaz gövdesi gerilimli kalabilir ve dokunan kişiyi elektrik çarpabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir elektrik devresinde sigortanın görevi nedir?",
        "puan": 10,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Sigorta, devreden aşırı akım geçtiğinde eriyerek devreyi açar. Böylece kablolar ve cihazlar aşırı ısınmaktan ve yangından korunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kurulan bir devreye enerji vermeden önce hangi kontroller yapılır?",
        "puan": 10,
        "konu": "Elektrik Devresi Kurma ve Faz Kontrolü",
        "cevapAnahtari": "Bağlantıların doğru ve sıkı olduğu, çıplak iletkenin açıkta kalmadığı ve yalıtımın sağlam olduğu kontrol edilir. Kontroller bittikten sonra enerji verilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pabuç iletkene yeterince sıkıştırılmazsa ne gibi sorunlar çıkar?",
        "puan": 10,
        "konu": "İletkenleri Ekleme ve Bağlama - II",
        "cevapAnahtari": "Pabuç yeterince sıkılmazsa temas zayıf kalır, bağlantı ısınır ve iletken pabuçtan çıkabilir. Bu yüzden pabuç uygun pense (krimp) ile sıkıca bastırılmalıdır."
      }
    ]
  },
  {
    "dersAdi": "Mesleki Gelişim Atölyesi",
    "sinifGrade": 9,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir esnafın müşterisine sattığı ürünün gerçek durumunu saklaması hangi ahilik ilkesine aykırıdır? Bu ilkenin kısaca ne anlama geldiğini açıklayınız.",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Bu davranış dürüstlük ilkesine aykırıdır. Dürüstlük, kişinin sözünde durması ve karşısındakine gerçeği saklamadan doğru bilgi vermesidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ahiliğin toplum düzenindeki yerini ve iş hayatına katkısını bir örnekle açıklayınız.",
        "puan": 15,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Ahilik, esnaf ve zanaatkârlar arasında dayanışmayı ve güveni sağlayarak toplumsal düzeni destekler. Örneğin bir çırağın ustasından hem meslek hem ahlak öğrenmesi bu katkıya bir örnektir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Okul kurallarına uymanın size ve arkadaşlarınıza bir faydasını örnekle açıklayınız.",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Kurallara uyulduğunda herkes rahat ders işleyebilir ve haksızlık yaşanmaz. Örneğin sıra bekleme kuralı, herkesin kantinde eşit hak kullanmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir atölyede yerdeki kablolar düzensiz bırakılmışsa bu ne tür bir tehlikeye yol açar? Bunu gidermek için ne yapılmalıdır?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Bu durum takılıp düşme veya elektrik çarpması gibi bir kaza tehlikesi oluşturur. Kabloların duvar kenarından, kablo kanalı içinden veya bantla sabitlenerek düzenli geçirilmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Gürültülü bir atölyede uzun süre çalışmak hangi sağlık riskini doğurur? Bunu önlemek için ne kullanılır?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Uzun süre yüksek gürültü işitme kaybına yol açabilir. Bunu önlemek için kulaklık veya kulak tıkacı gibi koruyucu donanım kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir atölyede yangın çıkması durumunda ilk yapılması gereken üç şeyi sıralayınız.",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Önce alarm verilip çevredekiler uyarılmalı, güvenli bir şekilde tahliye edilmeli ve yangın söndürme ekipleri/itfaiye haber verilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Uzun süre bilgisayar ekranına bakarak çalışmak hangi sağlık sorunlarına yol açabilir? Nasıl önlenir?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Uzun süre ekrana bakmak göz yorgunluğuna ve baş ağrısına yol açabilir. Düzenli mola vermek ve ekranla göz arasındaki mesafeyi uygun tutmak bunu önler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tasarım odaklı düşünmede 'prototip' ve 'test' basamakları neden vardır?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Prototip, fikrin hızlıca yapılmış basit bir örneğidir; test ise bu örneğin kullanıcıyla denenmesidir. Böylece hatalar ürün tamamlanmadan fark edilip düzeltilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ahilik teşkilatı Anadolu'da hangi amaçla kurulmuştur? Zanaatkârlara sağladığı iki faydayı yazınız.",
        "puan": 15,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Ahilik teşkilatı, esnaf ve zanaatkârlar arasında dayanışmayı sağlamak, üretimde kaliteyi ve ahlaki değerleri korumak amacıyla kurulmuştur. Zanaatkârlara mesleki eğitim/usta-çırak ilişkisi ve dayanışma/yardımlaşma sağlama gibi faydaları olmuştur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ahilikteki kalite ve dürüstlük anlayışı, esnafın müşteri güvenini nasıl etkiler?",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Esnaf kaliteli ve dürüst mal sattığında müşteri ona güvenir ve tekrar gelir. Böylece hem esnafın kazancı hem de çarşıdaki düzen olumlu etkilenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Trafik kuralları olmasaydı günlük hayatta ne gibi sorunlar yaşanırdı? İki örnek veriniz.",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Kazalar artar, insanlar can ve mal güvenliğini kaybederdi. Ayrıca yollarda karışıklık olur, herkes işlerine geç kalırdı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölyede yerde bir yağ lekesi fark ettiğinizde ne yaparsınız? Neden?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Yağı hemen temizler veya öğretmene haber verir, o alana uyarı işareti koyarım. Çünkü yağlı zemin kayarak düşmeye ve yaralanmaya neden olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kişi elektrik çarpmasına maruz kalırsa ilk yapılması gereken şey nedir?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Önce elektriğin akımı kesilir; akım kesilmeden kazazedeye dokunulmaz, çünkü dokunan kişi de çarpılabilir. Sonra yardım çağrılır (112) ve ilk yardım uygulanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sürekli aynı pozisyonda oturarak çalışan bir kişide zamanla ne tür bir sağlık sorunu gelişebilir? Bunu önlemek için ne yapılabilir?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Zamanla boyun, sırt veya bel ağrıları gibi kas-iskelet sistemi sorunları gelişebilir. Bunu önlemek için düzenli aralıklarla kalkıp hareket etmek ve doğru oturma pozisyonuna dikkat etmek gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Meslek hastalığı ile iş kazası arasındaki farkı yazınız.",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "İş kazası ani ve beklenmedik olarak olur; meslek hastalığı ise işin niteliğinden dolayı zamanla ortaya çıkar. Örneğin elin kesilmesi iş kazası, uzun süre toz solumaktan gelişen akciğer hastalığı meslek hastalığıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tasarım odaklı düşünmenin ilk basamağı olan 'empati kurma' ne demektir?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Empati kurma, sorunu yaşayan kişinin yerine kendini koyup onun ihtiyaç ve duygularını anlamaya çalışmaktır. Bu, doğru problemi bulmayı kolaylaştırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Meslek etiği nedir? Bir meslek etiği kuralı örneği veriniz.",
        "puan": 15,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Meslek etiği, bir mesleği yaparken uyulması gereken ahlaki kurallardır. Örneğin bir usta, müşterisinden gereğinden fazla ücret almamalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ahilik teşkilatında çırak, kalfa ve usta arasındaki ilişkiyi kısaca açıklayınız.",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Çırak mesleği öğrenmeye başlayan, kalfa öğrenip ustalığa hazırlanan, usta ise mesleği tam bilen ve öğreten kişidir. Çırak ve kalfalar ustalarından hem meslek hem ahlak öğrenirdi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ahilik ilkelerinin günümüz iş hayatında hâlâ uygulanması gerektiğini düşünüyor musunuz? Bir örnekle açıklayınız.",
        "puan": 10,
        "konu": "Meslek Etiği ve Ahilik",
        "cevapAnahtari": "Evet, günümüzde de dürüstlük ve kaliteli üretim önemlidir. Örneğin bir tamirci müşterisine gereksiz yere fazla ücret çıkarmadan, sadece gerekli tamiratı dürüstçe yaparsa ahilik ilkelerini günümüzde de yaşatmış olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölyede iş güvenliği işaretleri (uyarı levhaları) neden vardır? Bir örnek veriniz.",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "İşaretler çalışanları tehlikelere karşı uyarır ve kazaları önler. Örneğin 'Dikkat, yüksek gerilim' levhası insanları tehlikeli alandan uzak tutar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yangın söndürücü kullanırken hangi iki kurala dikkat edilir?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Söndürücünün emniyet pimi çekilir ve ağzı alevin tabanına doğrultulur. Rüzgârı arkaya alıp güvenli bir mesafeden söndürmek gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölyede bir arkadaşınız elini kestiğinde ilk yardım olarak ne yaparsınız?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Kanayan yer temiz bir bezle bastırılarak kanama durdurulmaya çalışılır. Ardından öğretmene haber verilir ve gerekirse sağlık kuruluşuna gidilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölyede toz ve talaş solumak uzun vadede ne gibi bir sağlık sorununa yol açar? Bunu önlemek için ne yapılır?",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Uzun süre toz solumak akciğer ve solunum yolu hastalıklarına yol açabilir. Bunu önlemek için maske kullanılır ve ortam havalandırılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tasarım odaklı düşünme yaklaşımının 'insan merkezli olma' ilkesi ne anlama gelir? Bir örnekle açıklayınız.",
        "puan": 15,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "İnsan merkezli olmak, bir problemi çözerken önce o problemden etkilenen insanların ihtiyaçlarını ve duygularını anlamaya çalışmak demektir. Örneğin bir okul sırası tasarlarken önce öğrencilerin oturuşta yaşadığı zorlukları gözlemlemek insan merkezli bir yaklaşımdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "'Otomasyon' kavramı ne anlama gelir? Bir örnek veriniz.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Otomasyon, bir işin insan müdahalesi olmadan makineler tarafından kendiliğinden yapılmasıdır. Örneğin fabrikadaki robot kollar parçaları kendiliğinden monte eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Teknolojik gelişmelerin üretime sağladığı iki katkıyı yazınız.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Teknolojik gelişmeler üretimi hızlandırır ve ürünlerin daha kaliteli, daha hatasız olmasını sağlar. Ayrıca insanların yorucu ve tehlikeli işlerden kurtulmasına yardımcı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Birinci sanayi devrimini başlatan temel buluş nedir? Üretimi nasıl değiştirmiştir?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Buhar makinesinin icadıdır. Bu sayede fabrikalar kurulmuş ve üretim el emeğinden makine gücüne geçmiştir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Elektriğin ve seri üretim bantlarının kullanılmaya başlaması üretimi nasıl değiştirdi?",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Elektrikle çalışan makineler ve seri üretim bantları sayesinde ürünler daha hızlı, daha ucuz ve çok sayıda üretilebilir hâle geldi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Akıllı telefonların hayatımıza girmesiyle ortaya çıkan bir olumlu ve bir olumsuz değişikliği örnekleriyle açıklayınız.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Olumlu olarak, insanlar bilgiye anında ulaşabilir hâle geldi (örneğin bir konuyu araştırmak saniyeler sürüyor). Olumsuz olarak ise telefon bağımlılığı ve yüz yüze iletişimde azalma gibi sorunlar ortaya çıktı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ülkemizdeki ve dünyadaki teknolojik gelişmelerden birini seçip, bu gelişmenin günlük hayatımıza nasıl bir katkı sağladığını açıklayınız.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Örneğin akıllı tarım teknolojileri, çiftçilerin toprağı ve suyu daha verimli kullanmasını sağlayarak günlük hayattaki gıda üretimine katkı sunar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mektup ile e-posta arasında bir benzerlik ve bir farklılık yazınız.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Benzerlik: ikisi de bir mesajı başkasına iletmeye yarar. Farklılık: mektup posta ile günler içinde ulaşırken e-posta internet üzerinden anında iletilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dizüstü bilgisayar ile masaüstü bilgisayar arasındaki bir benzerlik ve bir farklılık nedir?",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Benzerlik: ikisi de aynı işleri yapabilen bilgisayarlardır. Farklılık: dizüstü bilgisayar taşınabilir ve bataryalıdır, masaüstü bilgisayar ise genelde sabit durur ve prize bağlı çalışır."
      },
      {
        "tur": "klasik",
        "soruMetni": "'Teknoloji' kavramını kendi cümlenizle tanımlayınız. Bir örnek vererek bu örneğin neden teknolojik olduğunu açıklayınız.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Teknoloji, insan ihtiyaçlarını karşılamak için bilgi ve becerinin araç, alet veya yönteme dönüştürülmesidir. Örneğin bir kalem de teknolojiktir çünkü yazma ihtiyacını karşılamak için tasarlanmış bir araçtır."
      },
      {
        "tur": "klasik",
        "soruMetni": "'Endüstri 4.0' ifadesi neyi anlatır? Kısaca açıklayınız.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Endüstri 4.0, fabrikalardaki makinelerin internet ve bilgisayar sistemleriyle birbirine bağlanıp birlikte çalıştığı akıllı üretim anlayışıdır. Böylece üretim daha hızlı, kontrollü ve verimli olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tarım toplumundan sanayi toplumuna geçişte üretim nasıl değişmiştir?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Tarım toplumunda üretim daha çok el emeği ve hayvan gücüyle yapılırken sanayi toplumunda makineler ve fabrikalar kullanılmaya başlandı. Böylece üretim hızlandı ve insanlar şehirlerdeki fabrikalarda çalışmaya yöneldi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bilgisayarların ve internetin üretime girmesi sanayide hangi değişikliklere yol açmıştır? Bir örnek veriniz.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Bilgisayar ve internet sayesinde makineler programla yönetilmeye, işler otomatik ve uzaktan takip edilmeye başlandı. Örneğin CNC tezgâhları bilgisayar programıyla çalışır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ülkemizde üretilen yerli elektrikli otomobil (Togg) gibi bir teknolojik gelişme ülkemize ne gibi bir katkı sağlar?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Yerli ürünler, ülkemizin kendi teknolojisini üretebildiğini gösterir ve ithalata bağımlılığı azaltır. Ayrıca yeni iş imkânları ve bilgi birikimi oluşturur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yapay zekâ ve robotların yaygınlaşması bazı mesleklerin geleceğini nasıl etkiler? Bir örnek veriniz.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Tekrar eden işler robotlara devredildiği için bazı meslekler azalabilir, buna karşılık robot bakımı ve programlama gibi yeni meslekler ortaya çıkar. Örneğin fabrikada bant başında çalışan sayısı azalırken robot teknisyenine ihtiyaç artar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Buhar makinesi ile robotik otomasyon arasındaki temel fark nedir? İkisinin de ortak amacı nedir?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Buhar makinesi enerjiyi kömürü yakarak elde ederken, robotik otomasyon elektrik ve bilgisayar kontrolüyle çalışır. İkisinin de ortak amacı insan gücüne daha az ihtiyaç duyarak üretimi hızlandırmaktır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Telgraf, telefon ve cep telefonu arasındaki bir benzerlik ve bir farklılık yazınız.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Benzerlik: üçü de uzaktaki kişiyle haberleşmeyi sağlar. Farklılık: telgraf yazılı, telefon sesli haberleşir; cep telefonu ise kablosuz ve taşınabilirdir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yapay zekâ nedir? Günlük hayattan bir örnek veriniz.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Yapay zekâ, bilgisayarların insan gibi öğrenip karar verebilmesini sağlayan teknolojidir. Örneğin telefondaki sesli asistan konuşmamızı anlayıp cevap verir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Robot nedir? Fabrikalarda kullanılmasının bir faydasını yazınız.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Robot, programlanarak belirli işleri insan yerine yapabilen makinedir. Örneğin fabrikalarda tekrar eden kaynak veya boyama işlerini hızlı ve hatasız yapar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Buhar gücüyle çalışan ilk fabrikalardan günümüzün otomasyonlu fabrikalarına geçişte üretimde en temel değişen şey nedir?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "En temel değişen şey, insan gücü ve el emeğinin yerini makine gücünün ve otomasyonun almasıdır. Böylece daha az insan gücüyle daha hızlı ve çok üretim yapılabilir hâle gelinmiştir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sanayi devrimiyle birlikte insanlar neden köylerden şehirlere göç etmeye başlamıştır?",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Fabrikalar şehirlerde kurulduğu ve çok sayıda işçiye ihtiyaç duyduğu için insanlar iş bulmak amacıyla köylerden şehirlere göç etmiştir. Böylece şehirler büyümüş ve nüfusları artmıştır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dünyada kullanımı artan yenilenebilir enerji (güneş, rüzgâr) teknolojileri neden önemlidir?",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Güneş ve rüzgâr enerjisi tükenmez ve çevreyi kirletmez. Böylece kömür, petrol gibi yakıtlara olan ihtiyaç azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İnternetin yaygınlaşmasıyla çalışma hayatında ortaya çıkan bir olumlu ve bir olumsuz değişikliği yazınız.",
        "puan": 10,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Olumlu olarak uzaktan çalışma ve hızlı iletişim mümkün oldu. Olumsuz olarak bazı işlerin azalması ve insanların ekran başında daha uzun süre kalması sayılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Aşağıdakileri 'el ile çalışan' ve 'elektrikle çalışan' olarak ikiye ayırınız: kolla çevrilen matkap, elektrikli matkap, el testeresi, elektrikli testere.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "El ile çalışan: kolla çevrilen matkap, el testeresi. Elektrikle çalışan: elektrikli matkap, elektrikli testere."
      },
      {
        "tur": "klasik",
        "soruMetni": "Buhar lokomotifi ile elektrikli tren arasındaki bir benzerlik ve bir farklılık yazınız.",
        "puan": 15,
        "konu": "Teknolojik Gelişmeler",
        "cevapAnahtari": "Benzerlik: ikisi de yolcu ve yük taşımak için kullanılır. Farklılık: buharlı lokomotif kömürle çalışırken elektrikli tren elektrik enerjisiyle çalışır ve daha temizdir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir plastik şişeyi çöpe atmak yerine çiçek saksısı olarak kullanmak, \"azalt-yeniden kullan-geri dönüştür\" ilkelerinden hangisine örnektir? Bu ilkeyi kısaca açıklayınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Bu, yeniden kullanma ilkesine örnektir. Yeniden kullanma, bir eşyayı atmak yerine farklı bir amaçla tekrar kullanmaktır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Fabrika bacalarından çıkan dumanın çevreye etkisi hangi tür kirliliğe örnektir? Bu kirliliğin bir zararını yazınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Bu, hava kirliliğine örnektir. Hava kirliliği, solunum yolu hastalıklarına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir öğrencinin kullandığı kâğıdı geri dönüşüm kutusuna atması, ülke ekonomisine nasıl katkı sağlar?",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Geri dönüşen kâğıt yeniden üretimde kullanılır; böylece yeni kâğıt için ağaç kesimi ve ham madde maliyeti azalır. Bu da ekonomiye tasarruf sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Cam, kağıt ve plastik atıklar neden ayrı kutularda toplanır? Kısaca açıklayınız.",
        "puan": 15,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Bu malzemeler farklı geri dönüşüm işlemlerinden geçtiği için ayrı toplanır; böylece geri dönüşüm daha verimli ve kaliteli yapılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Girişimcilikte 'risk almak' ne demektir? Bir örnek veriniz.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Risk almak, işin başarısız olabileceğini bilerek yine de emek ve para yatırmaktır. Örneğin bir kişi birikimiyle küçük bir kafe açarsa risk almış olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Girişimci kelimesi ne anlama gelir? Tanıdığınız (gerçek ya da hayali) bir girişimciyi örnek vererek açıklayınız.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Girişimci, bir iş fikrini hayata geçirmek için risk alıp kaynakları bir araya getiren kişidir. Örneğin evde yaptığı kurabiyeleri satmaya başlayan biri girişimcidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makine alanınızla ilgili küçük bir iş fikri örneği veriniz. Bu fikir hangi ihtiyacı karşılıyor?",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Örneğin evlere gidip küçük el aletlerini bileyen mobil bir bileme servisi olabilir. Bu, evde kendi aletini bilemeyenlerin ihtiyacını karşılar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir iş fikrinin başarılı olup olmayacağını değerlendirirken nelere bakılmalıdır? İki ölçüt yazınız.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Fikrin gerçek bir ihtiyacı karşılayıp karşılamadığına ve bu fikri hayata geçirmek için yeterli kaynağın (sermaye, bilgi vb.) olup olmadığına bakılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Gereksiz yere su ve elektrik tüketmemek, 'azalt-yeniden kullan-geri dönüştür' ilkelerinden hangisine örnektir? Bu ilkeyi kısaca açıklayınız.",
        "puan": 15,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Azaltma ilkesine örnektir. Azaltma, gereksiz tüketimi ve atık oluşumunu en baştan azaltmaktır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tarım ilaçlarının bilinçsizce kullanılması hangi kirliliğe yol açabilir? Bir zararını yazınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Toprak ve su kirliliğine yol açabilir. İlaçlar toprağa ve yeraltı suyuna karışarak bitki, hayvan ve insan sağlığına zarar verebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Evde yemek artıklarını çöpe atmak yerine kompost yapmak doğaya nasıl bir fayda sağlar?",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Yemek artıkları kompost yapılarak doğal gübreye dönüşür ve çöp miktarı azalır. Bu gübre toprağı besler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Şu atıkları 'kâğıt', 'plastik' ve 'cam' gruplarına ayırınız: karton kutu, yoğurt kabı, kavanoz, gazete.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Kâğıt: karton kutu, gazete. Plastik: yoğurt kabı. Cam: kavanoz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Girişimcilikle ekonomi arasında nasıl bir ilişki vardır?",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Girişimciler yeni işler kurarak istihdam yaratır ve üretim/hizmet çeşitliliğini artırır; bu da ülke ekonomisinin büyümesine katkı sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir girişimcinin başarılı olabilmesi için hangi kişisel özelliklere sahip olması gerekir? İki özellik yazınız.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Girişimci; risk alabilen, kararlı, yaratıcı ve sorun çözebilen biri olmalıdır. Örneğin azim ve yenilikçi düşünme önemli özelliklerdir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir iş fikrini hayata geçirmeden önce küçük bir deneme (örnek ürün) yapmanın faydası nedir?",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Küçük deneme, fikrin işe yarayıp yaramadığını az masrafla gösterir. Müşteri tepkisine göre ürün geliştirilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yaşadığınız çevrede fark ettiğiniz bir ihtiyaçtan yola çıkarak basit bir iş fikri öneriniz. Bu fikrin neden işe yarayacağını açıklayınız.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Örneğin okulun yakınında fotokopi merkezi yoksa küçük bir fotokopi/kırtasiye noktası açmak bir iş fikri olabilir; öğrencilerin günlük ihtiyacını karşılayacağı için işe yarar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kağıt atıkların toplanıp yeni kağıt üretiminde kullanılması hangi ilkeye örnektir? Bu ilkeyi kısaca açıklayınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Bu, geri dönüştürme ilkesine örnektir. Geri dönüştürme, atık malzemenin işlenerek yeni bir ürünün üretiminde tekrar kullanılmasıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Fabrikaların atık sularını akarsulara bırakması hangi tür kirliliğe yol açar? Bu kirliliğin bir zararını yazınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Bu, su kirliliğine yol açar. Su kirliliği, suda yaşayan canlıların ölmesine ve içme suyunun kirlenmesine neden olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir okulun atıklarını ayrıştırmaya başlaması hangi faydaları sağlayabilir? İki fayda yazınız.",
        "puan": 10,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Okulun çöp miktarı azalır ve öğrencilerde çevre bilinci gelişir. Ayrıca geri dönüştürülebilen malzemeler ekonomiye kazandırılmış olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Şu atıkları 'geri dönüştürülebilir' ve 'organik' diye ikiye ayırınız: gazete, elma kabuğu, plastik şişe, çay posası.",
        "puan": 15,
        "konu": "Çevre Koruma",
        "cevapAnahtari": "Geri dönüştürülebilir: gazete, plastik şişe. Organik: elma kabuğu, çay posası."
      },
      {
        "tur": "klasik",
        "soruMetni": "Girişimcilik nedir? Bir cümleyle açıklayınız.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Girişimcilik, bir fikri veya ihtiyacı fırsata çevirip risk alarak yeni bir iş kurmaktır. Girişimci bu süreçte gerekli kaynakları bir araya getirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sermaye nedir? Bir işletme için neden gereklidir?",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Sermaye, bir işi kurmak ve yürütmek için gereken para ve maldır. Makine, malzeme ve kira gibi giderler sermaye ile karşılanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir iş fikrini değerlendirirken 'müşteri kim olacak?' sorusu neden sorulur?",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Ürünü kimin alacağı bilinmezse satış yapılamaz. Hedef müşteri belli olunca ürün ve fiyat ona göre planlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sizce hangi iş fikri daha başarılı olur: ihtiyaç duyulmayan ama yaratıcı bir ürün mü, yoksa sıradan ama gerçek bir ihtiyacı karşılayan bir ürün mü? Nedenini açıklayınız.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Genellikle gerçek bir ihtiyacı karşılayan ürün daha başarılı olur çünkü müşteri ihtiyacını gideren bir ürüne öder. Örneğin süslü ama işe yaramayan bir ürün yerine, günlük hayatı kolaylaştıran basit bir ürün daha çok tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir işletmenin ortaklarla kurulmasının bir avantajı ve bir dezavantajı nedir?",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Avantajı sermayenin ve iş yükünün paylaşılmasıdır. Dezavantajı ise kararlarda ortaklar arasında anlaşmazlık çıkabilmesidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Küçük bir işletme ile büyük bir işletme arasında ne gibi farklar olabilir?",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Küçük işletmeler daha az çalışana ve sermayeye sahiptir, kararları hızlı alabilir. Büyük işletmeler ise daha fazla kaynağa sahiptir ancak karar alma süreçleri daha yavaş olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir işletmenin ürününü satabilmesi için fiyat belirlerken nelere dikkat etmesi gerekir?",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Ürünün maliyeti, rakip işletmelerin fiyatları ve hedef müşterilerin ödeyebileceği bütçe dikkate alınmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yeni bir işletme kurmadan önce hangi hazırlıkların yapılması gerekir? İki örnek veriniz.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Pazar araştırması yapılmalı ve gerekli sermaye/finansman planlanmalıdır. Bu hazırlıklar işletmenin başarılı olma ihtimalini artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir ressamın yaptığı tabloyu izinsiz kopyalayıp satmak hangi hakkı ihlal eder? Bu hakkın ne anlama geldiğini açıklayınız.",
        "puan": 10,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Bu, telif hakkını ihlal eder. Telif hakkı, bir eserin sahibinin o eser üzerindeki kullanım ve çoğaltma hakkını korur; bu sayede üreticilerin emeğinin karşılığını alması sağlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Patent için nereye başvuru yapılır? Başvurudan sonra ne olur?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Patent başvurusu Türk Patent ve Marka Kurumu'na yapılır. Başvuru yapılan buluş incelenir ve şartları taşıyorsa patent verilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Marka ile logo arasındaki fark nedir?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Marka, bir ürünü başkalarından ayıran ad, şekil veya işarettir. Logo ise markanın görsel simgesidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Coğrafi işaret tescili üreticiye ve tüketiciye ne gibi faydalar sağlar?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Üretici ürününün adını korur ve değerini artırır. Tüketici de ürünün gerçekten o yöreye ait ve kaliteli olduğuna güvenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İşletme nedir? Bildiğiniz iki farklı işletme türü örneği veriniz.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "İşletme, mal veya hizmet üretmek/satmak amacıyla kurulan kuruluştur. Örneğin bir market ve bir berber dükkânı birer işletmedir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir işletmenin amacı sadece kâr etmek midir? Düşüncenizi bir örnekle açıklayınız.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Hayır, işletmeler kâr etmenin yanında topluma faydalı bir ürün/hizmet sunmayı ve istihdam yaratmayı da amaçlar. Örneğin bir geri dönüşüm işletmesi hem kâr eder hem çevreye katkı sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Pazarlama karmasının 'ürün' ayağı ne demektir? Bir örnekle açıklayınız.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Ürün, işletmenin müşteriye sunduğu mal veya hizmettir. Örneğin bir fırının sattığı ekmek ve pastalar onun ürünüdür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Müşteri memnuniyeti bir işletme için neden önemlidir?",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Memnun müşteri tekrar alışveriş yapar ve işletmeyi başkalarına önerir. Böylece satışlar ve işletmenin itibarı artar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir yazarın yazdığı bir kitabı izinsiz fotokopi çekip dağıtmak hangi hakkı ihlal eder? Bu hakkın yazara ne gibi bir koruma sağladığını açıklayınız.",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Bu, telif hakkını ihlal eder. Telif hakkı, yazarın eserinden elde edeceği geliri ve emeğinin karşılığını almasını güvence altına alır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir buluşa patent alınabilmesi için o buluşun hangi özellikleri taşıması gerekir?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Buluşun yeni olması, daha önce bilinenlerden farklı bir çözüm getirmesi ve sanayide uygulanabilir olması gerekir. Bu şartları taşıyan buluş için patent başvurusu yapılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İki farklı işletme aynı markayı kullanmak isterse ne gibi bir sorun yaşanabilir? Bu sorunun önlenmesi için ne yapılmalıdır?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Müşteriler iki işletmeyi karıştırabilir ve haksız rekabet oluşabilir. Bu sorunu önlemek için markanın resmi olarak tescillenmesi gerekir; böylece marka hukuki olarak korunur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ülkemizden coğrafi işaretli bir ürün örneği veriniz. Bu işaret ürüne ne kazandırır?",
        "puan": 10,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Örneğin Antep baklavası coğrafi işaretlidir. Bu işaret, ürünün belirli bir yöreye ait olduğunu gösterir ve taklit edilmesini zorlaştırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tek kişinin kurduğu işletme (şahıs işletmesi) ile birden çok ortaklı işletme (şirket) arasındaki bir fark nedir?",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Şahıs işletmesini tek kişi kurar ve tüm kazanç ile sorumluluğu o taşır. Şirkette ise birden fazla ortak vardır; sermaye, kâr ve sorumluluk ortaklar arasında paylaşılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Üretim yapan bir işletmeye ve hizmet veren bir işletmeye birer örnek veriniz.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Üretim yapan işletmeye mobilya atölyesi, hizmet veren işletmeye ise berber veya kuaför örnek verilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir ürünü müşteriye ulaştırmanın (dağıtımın) iki yolunu yazınız.",
        "puan": 10,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Ürün dükkânda satılabilir veya internetten satılıp kargo ile gönderilebilir. Seçilen yol, müşterinin ürüne kolay ulaşmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir işletmenin ürününü tanıtmak (reklam yapmak) neden önemlidir? İki farklı reklam yöntemi örneği veriniz.",
        "puan": 15,
        "konu": "Girişimcilik",
        "cevapAnahtari": "Reklam, ürünün varlığından müşterilerin haberdar olmasını ve satışların artmasını sağlar. Örneğin sosyal medya reklamları ve el ilanı dağıtımı birer reklam yöntemidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Fikir ürünü ne demektir? İki örnek veriniz.",
        "puan": 10,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Fikir ürünü, insanın zihinsel emeğiyle ortaya çıkardığı eserdir. Örneğin bir şarkı, bir resim veya bir yazılım fikir ürünüdür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Patent nedir? Bir mucidin buluşu için patent almasının ona ne gibi bir hak sağladığını açıklayınız.",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Patent, bir buluşun sahibine belirli bir süre boyunca o buluşu üretme ve satma hakkını tanıyan resmi belgedir. Bu sayede başkaları izinsiz aynı buluşu üretemez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir markanın tescillenmesi (resmi olarak kaydedilmesi) neden önemlidir?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Tescil, markanın yasal olarak sahibine ait olduğunu kanıtlar ve başkalarının aynı markayı kullanmasını engeller. Tescillenmemiş bir marka taklit edilebilir ve sahibi hak iddia edemez."
      },
      {
        "tur": "klasik",
        "soruMetni": "\"Malatya kayısısı\" gibi bir coğrafi işaret ne anlama gelir? Bu tür bir tescilin üreticilere ne faydası olur?",
        "puan": 15,
        "konu": "Fikri ve Sınai Mülkiyet Hakları",
        "cevapAnahtari": "Coğrafi işaret, bir ürünün belirli bir bölgeye özgü ve o bölgenin özelliklerinden kaynaklanan niteliklere sahip olduğunu gösteren tescildir. Bu, üreticilerin ürününün özgünlüğünü koruyarak değerini artırmasına yardımcı olur."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "1. Dönem Performans Ödevi — Grup çalışması: Aşağıdaki üç senaryodan birini seçerek (A: Ahilik ve Meslek Etiği — bir tamircinin küçük bir arızayı büyük göstererek müşteriden fazla ücret alması; B: İş Sağlığı ve Güvenliği — atölyede dökülen yağa basıp kayan bir öğrenci; C: Teknolojik Gelişmeler — bir fabrikaya yeni robot kolların alınmasıyla işçilerin iş kaybı kaygısı) senaryodaki problemi ve etkilenen kişileri belirleyin, olası nedenlerini araştırın, en az bir uygulanabilir ve gerekçeli çözüm önerin; çalışmanızı bir dosya hâline getirip sınıfta 3-4 dakikada sununuz.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Değerlendirme: Problemin doğru ve net tanımlanması (15p), nedenlerin senaryoyla tutarlı açıklanması (15p), uygulanabilir ve gerekçeli çözüm önerisi (15p), grup içi iş birliği/herkesin katkısı (15p), dosyanın düzeni ve sunumun açıklığı (20p), bireysel sözlü değerlendirme - 2 soru x 10 puan (20p). Örnek model cevap (Senaryo B üzerinden): Yağı hemen temizlemek en hızlı çözümdür; böylece kimse kaymadan kaza önlenmiş olur. Bir tehlike görüldüğünde 'benim işim değil' denmeden bildirilmesi gerektiği, grup içinde görev paylaşımının (araştırma, yazım, sunum) yapılması önemlidir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "2. Dönem Performans Ödevi — Grup çalışması: Çevrende fark ettiğin bir ihtiyaçtan yola çıkarak çevreye zarar vermeyen (ya da çevreye fayda sağlayan) bir iş fikri belirleyin; işletmenizi tanımlayın (ne üretiyor/hangi hizmeti veriyor, hedef müşteri, tek kişilik mi ortaklı mı), işletmenize özgün bir ad ve basit bir logo fikri bulun (başka bir markayla karışmadığından emin olun), ürününüzü müşterilere nasıl duyurup ulaştıracağınızı kısaca yazın; çalışmanızı bir dosya hâline getirip sınıfta 3-4 dakikada sununuz.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Değerlendirme: Çevreye duyarlı iş fikri - ihtiyaç ve çevre boyutu (15p), işletmenin doğru ve tutarlı tanımlanması (15p), özgün marka adı ve logo fikri (15p), grup içi iş birliği/herkesin katkısı (15p), dosyanın düzeni ve sunumun açıklığı (20p), bireysel sözlü değerlendirme - 2 soru x 10 puan (20p). Örnek model cevap ('Yeni Sayfa' mini işletmesi): Öğrenciler uygun fiyatlı defter aradığı için atık kâğıttan geri dönüşümlü defter üretilir; marka adı ve yaprak şeklinde logo seçilirken başkası tarafından kullanılmadığı kontrol edilir ve tescil ettirilmesi planlanır; duyuru okul panoları ve sosyal medya üzerinden yapılır."
      }
    ]
  },
  {
    "dersAdi": "Temel İmalat İşlemleri",
    "sinifGrade": 9,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Bir öğrenci bol kollu iş önlüğüyle matkap tezgâhında çalışırken kolu dönen matkap ucuna yaklaşıyor. Bu durumda ne gibi bir tehlike ile karşılaşabilir? Bu tehlikeyi önlemek için ne yapılmalıydı?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Bol kollu önlük, dönen matkap ucuna veya mile takılıp öğrencinin elini ya da kolunu tezgâha doğru çekebilir; bu ciddi bir yaralanmaya yol açabilir. Bunu önlemek için dar kollu ve düğmeli bir iş önlüğü giyilmeli, çalışırken kollar sıkıca kapatılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kumpasla ölçüm yapılıyor: ana cetvelde 15 mm görünüyor, verniyede tam çakışan çizgi 6. çizgi. Kumpas 1/20 mm (0,05 mm) hassasiyetli olduğuna göre ölçüm sonucu kaç mm'dir? Nasıl bulduğunuzu gösteriniz.",
        "puan": 15,
        "konu": "Ölçme ve Kontrol",
        "cevapAnahtari": "Ana cetvelden 15 mm okunur. Verniyede tam çakışan 6. çizgi, 6 x 0,05 = 0,30 mm eder. İki değer toplanır: 15 + 0,30 = 15,30 mm."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçayı mengeneye bağlarken eğelenecek yüzey mengene ağzından ne kadar yukarıda kalmalıdır? Bu neden önemlidir?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Eğelenecek yüzey mengene ağzından çok az (birkaç mm) yukarıda kalmalıdır. Bu sayede eğe darbeleri sönümlenmeden verimli çalışılır ve parça sağlam tutulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Markalama işleminde çizilecek çizgilerin belirgin olması için parça yüzeyine önce ne sürülür? Markalama ucu (çizecek) neden sert çelikten yapılır?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Parça yüzeyine markalama boyası (veya mürekkebi) sürülür. Markalama ucu, parça malzemesinden daha sert olması gerektiği için sertleştirilmiş çelikten yapılır; aksi hâlde iz bırakamaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "El testeresi ile metal keserken testere neden geriye çekilirken bastırılmaz?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Testere dişleri sadece ileri harekette kesim yapacak şekilde tasarlanmıştır; geri çekilirken bastırılırsa dişler zarar görür ve kesim verimsizleşir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Malzeme nedir, bir örnekle açıklayınız. Çelik hangi yolla elde edilir?",
        "puan": 15,
        "konu": "Malzeme Bilgisi",
        "cevapAnahtari": "Malzeme, bir parça veya eşya yapmak için kullandığımız hammaddedir; örneğin çelik bir malzemedir. Çelik, demir cevherinden elde edilen pik demirdeki karbon oranının azaltılıp ayarlanmasıyla üretilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Matkap ucunun kesici kenarındaki açıya zırh açısı denir. Zırh açısı yanlış seçilirse delme sırasında ortaya çıkabilecek üç soruna örnek veriniz.",
        "puan": 15,
        "konu": "Delme Operasyonları",
        "cevapAnahtari": "Matkap ucu aşırı ısınabilir, ucu körelebilir veya kırılabilir, delinen yüzey pürüzlü ve kalitesiz çıkabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Vida nedir, kısaca açıklayınız. Vidanın dişleri sık mı yoksa seyrek mi olursa bağlantı daha sağlam tutar? Kısaca yorumlayınız.",
        "puan": 15,
        "konu": "Vida Açma İşlemleri",
        "cevapAnahtari": "Vida, bir parçayı başka bir parçaya sıkıca bağlamamızı sağlayan, üzerinde diş bulunan bir bağlantı elemanıdır. Vidanın dişleri sık (aralıkları az) olursa daha fazla diş birbirine temas eder ve bağlantı daha sağlam tutar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tornacı yıllarca kulaklık takmadan gürültülü bir ortamda çalışıyor. Bu durum ileride hangi meslek hastalığına yol açabilir? Bunu önlemek için ne yapılmalıydı?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "İşitme kaybı (sağırlık) meydana gelebilir. Bunu önlemek için gürültülü ortamda çalışırken kulak koruyucu (kulaklık veya kulak tıkacı) kullanılmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mekanik (verniyeli), saatli ve dijital kumpaslardan hangisinin değeri okumak en kolaydır? Verniyeli kumpasın bir avantajını yazınız.",
        "puan": 15,
        "konu": "Ölçme ve Kontrol",
        "cevapAnahtari": "Dijital kumpasın değeri ekrandan doğrudan okunduğu için okuması en kolaydır. Verniyeli kumpas ise pil gerektirmez, daha ucuzdur ve darbeye karşı dayanıklıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kaba (büyük dişli) bir eğe ile ince (küçük dişli) bir eğe hangi aşamalarda kullanılır?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Kaba eğe, fazla malzemeyi hızlıca kaldırmak için ilk aşamada kullanılır. İnce eğe ise yüzeyi son hâline getirmek, pürüzsüzleştirmek için son aşamada kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Eğelenen açılı bir yüzeyin açısının doğru olup olmadığı hangi aletle kontrol edilir? Nasıl kullanılır?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Açı gönyesi (açı mastarı) ile kontrol edilir. Gönyenin kolu yüzeye yatırılır ve arada ışık sızıp sızmadığına bakılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "El testeresi ile ince bir sacı keserken ince dişli, kalın bir parçayı keserken kaba dişli lama tercih edilir. Bunun nedeni nedir?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Kesme sırasında lamanın birkaç dişinin aynı anda malzemeye temas etmesi gerekir; ince sacda bunu sık (ince) dişli lama sağlar. Kalın parçada ise kaba dişli lama, talaşın dişler arasından rahatça dışarı atılmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Çelik, plastik, alüminyum, seramik malzemelerinden hangileri metalik, hangileri metal değildir? Metalik olanları ve metal olmayanları ayrı ayrı yazınız.",
        "puan": 15,
        "konu": "Malzeme Bilgisi",
        "cevapAnahtari": "Metalik olanlar: çelik, alüminyum. Metal olmayanlar: plastik, seramik."
      },
      {
        "tur": "klasik",
        "soruMetni": "Matkapla açılmış bir delik yeterince pürüzsüz ve hassas değil. Bu deliği düzeltmek için hangi işlem yapılmalıdır? Bu işlem için delikte neden fazladan pay (talaş payı) bırakılması gerekir?",
        "puan": 15,
        "konu": "Delme Operasyonları",
        "cevapAnahtari": "Raybalama işlemi yapılmalıdır. Rayba, deliği hassas ölçüsüne getirip yüzeyini pürüzsüzleştirir; bunun için delikte bir miktar talaş payı bırakılması gerekir. Pay yetersiz bırakılırsa istenen hassasiyet elde edilemez, fazla bırakılırsa rayba zorlanır ve yüzey bozulabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir delikte iç vida (dişi vida) açılacaksa hangi takım kullanılır? Bu takımı kullanmadan önce delik çapının vida çapından neden küçük açılması gerekir?",
        "puan": 15,
        "konu": "Vida Açma İşlemleri",
        "cevapAnahtari": "Kılavuz kullanılır. Delik çapı vida çapından küçük açılır çünkü kılavuz, deliğin iç yüzeyini keserek/şekillendirerek dişi oluşturur. Delik gereğinden büyük olursa diş tam oluşmaz ve bağlantı zayıf kalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Atölyede elektrikli bir tezgâhtan kaynaklanan bir yangın çıktığında hangi tür söndürücü kullanılmamalıdır? Neden?",
        "puan": 10,
        "konu": "İş Sağlığı ve Güvenliği",
        "cevapAnahtari": "Sulu (su bazlı) söndürücü kullanılmamalıdır. Çünkü su elektriği iletir ve söndürmeye çalışan kişinin elektrik çarpmasına neden olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sabit 90° gönye ile şapkalı gönye arasındaki kullanım farkını yazınız. Gönye ile iki yüzeyin birbirine dik olup olmadığı nasıl kontrol edilir?",
        "puan": 15,
        "konu": "Ölçme ve Kontrol",
        "cevapAnahtari": "Sabit gönye yalnızca 90° dikliği kontrol etmek için kullanılır; şapkalı gönye ise 90° ve 45° kontrolünün yanında kenara paralel çizgi çizmede de kullanılır. Gönye iki yüzeye birlikte yaslanır; aralarında ışık sızıyorsa yüzeyler birbirine dik değildir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Markalama sonrasında çizgilere ve delik merkezlerine neden nokta (punta ile noktalama) vurulur?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Noktalama, işlem sırasında çizgiler silinse bile izlerin görünür kalmasını sağlar. Delik merkezindeki nokta, matkap ucunun kaymadan doğru yerden başlamasına da yardımcı olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düzlem yüzey eğeleme ile profil (eğik/kavisli) yüzey eğeleme arasında eğe hareketi açısından ne fark vardır?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Düzlem yüzey eğelemede eğe düz bir çizgide ileri-geri hareket eder. Profil yüzey eğelemede ise eğe, istenen eğik veya kavisli şekli oluşturmak için açılı veya dönerek hareket ettirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "El testeresi lamasının çerçeveye hangi yönde takılması gerekir? Lama yeterince gergin değilse kesim sırasında ne olur?",
        "puan": 10,
        "konu": "El İşlemleri",
        "cevapAnahtari": "Lamanın dişleri kesme yönüne, yani tutaktan uzağa (ileri) bakacak şekilde takılır. Lama gevşek olursa eğri keser, kolayca sıkışır ve kırılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mutfak bıçağı yapılacak. Bu bıçak için malzeme seçerken hangi özelliğe dikkat edilmelidir? Bu özellik yeterli olmazsa bıçak nasıl bir sorun yaşar?",
        "puan": 15,
        "konu": "Malzeme Bilgisi",
        "cevapAnahtari": "Sertlik özelliğine dikkat edilmelidir. Malzeme yeterince sert değilse bıçak çabuk körelir, kesme performansı düşer ve sık sık bilenmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Matkap tezgâhında matkap ucunu döndüren kısım ile iş parçasının üzerine bağlandığı kısım hangileridir? Tablanın yüksekliği neden ayarlanabilir yapılmıştır?",
        "puan": 15,
        "konu": "Delme Operasyonları",
        "cevapAnahtari": "Matkap ucunu mil döndürür; iş parçası ise tablaya (mengene ile) bağlanır. Tabla yüksekliği, farklı boyuttaki parçaların ve matkap uçlarının tezgâha sığabilmesi için ayarlanabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir milin (şaftın) dış yüzeyine vida (erkek vida) açılacaksa hangi takım kullanılır? Bu işlem sırasında dikkat edilmesi gereken iki hususu yazınız.",
        "puan": 15,
        "konu": "Vida Açma İşlemleri",
        "cevapAnahtari": "Pafta kullanılır. Vida açarken işe uygun pafta lokması seçilmeli ve yeterli yağlama yapılmalıdır; ayrıca paftanın mile dik başlatılmasına dikkat edilmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu çapta bir matkap ucuyla sert bir malzemeyi delerken devri yüksek mi düşük mü seçersin? Neden? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Sert malzemede devir düşük seçilir; yüksek devir ısınma ve matkap ucunun körelmesine yol açar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu parçayı mengeneye/tablaya bağlamadan işlem yapsaydın ne olurdu? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Parça yerinden oynar; hem hatalı işlem hem de kaza riski oluşur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kumpasla ölçtüğün bu değeri nasıl okudun, göster ve açıkla. (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Ana skaladan tam mm okunur, verniyer üzerindeki çakışan çizgi ondalık kısmı verir; ikisi toplanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu vida deliğini neden vida çapından küçük açtın? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Kılavuzun diş açabilmesi için delik, vida çapından küçük (kılavuz çapında) açılmalıdır; aksi hâlde diş tutmaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Eğelediğin bu yüzeyin düzlem olup olmadığını nasıl kontrol edersin? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Gönye veya düzlük mastarı yüzeye tutulup ışığa karşı bakılır; boşluk varsa yüzey düzlem değildir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Matkap ucu delme sırasında ısınırsa bunun nedeni ne olabilir? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Devir/ilerleme fazla olabilir, matkap körelmiş olabilir veya soğutma/yağlama yetersiz olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Torna tezgâhında kalemi taşıyıp iş parçasına doğru ilerleten kısma ne denir? Bu kısım hangi rehber elemanlar (kayıtlar) üzerinde hareket eder? Bu mekanizma olmasaydı hassas tornalama neden yapılamazdı?",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kalemi taşıyıp ilerleten kısma araba denir. Araba, kayıtlar (rehber miller) üzerinde hareket eder. Bu mekanizma olmasaydı kalemin konumu hassas ve kontrollü şekilde ayarlanamaz, düzgün bir yüzey elde edilemezdi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tornacı tezgâhın günlük bakımını (temizlik, yağlama) hiç yapmazsa bir süre sonra tezgâhta ne gibi bir sorun ortaya çıkar? Günlük bakımda yapılması gereken bir işlem yazınız.",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Zamanla kızaklarda aşınma ve hareket zorluğu, talaş/toz birikimi nedeniyle hassasiyet kaybı yaşanır. Günlük bakımda örneğin kızakların temizlenip yağlanması gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Sert bir malzemeyi (örneğin çelik) tornalarken HSS mi yoksa sert maden uçlu kalem mi tercih edilir? Neden? Kaba kalem ile ince kalemin kullanım farkını belirtiniz.",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Sert malzemede sert maden uçlu kalem tercih edilir çünkü daha yüksek sıcaklığa ve aşınmaya dayanıklıdır. Kaba kalem hızlı talaş kaldırmak için kullanılır, ince kalem ise son ölçü ve pürüzsüz yüzey elde etmek için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Uzun ve ince bir mili sadece aynaya bağlayıp tornalarsak ne olabilir? Bu tür parçalar için hangi ek bağlama elemanı kullanılır?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Parça titreşim yapar, sehim yaparak ölçü hatası veya kırılma riski oluşur. Bu tür parçalarda diğer uçtan gezer punta veya fırdöndü ile destekleme yapılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dikey ve yatay freze tezgâhları arasındaki temel fark nedir? İş parçasının üzerine bağlandığı düz yüzeye ne denir?",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Dikey freze tezgâhında mil dikey eksende, yatay freze tezgâhında mil yatay eksende çalışır. İş parçasının bağlandığı düz yüzeye tabla denir. Mil ise kesici takımı tutup döndüren kısımdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze tezgâhında bir parçanın soldan sağa hareketi hangi eksende olur? Yukarı-aşağı (derinlik) hareketi hangi eksende olur?",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Soldan sağa hareket X ekseninde olur. Yukarı-aşağı (derinlik/inme) hareketi Z ekseninde olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze tezgâhının günlük bakımı yapılmazsa ne gibi bir sorun oluşur? Günlük bakımda yapılması gereken bir işlem yazınız.",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Talaş ve toz birikimi nedeniyle hareketli kısımlarda aşınma ve hassasiyet kaybı oluşur. Günlük bakımda örneğin tezgâhın temizlenip kızakların yağlanması gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düzlem yüzey işlemek için hangi kesici takım tercih edilir (parmak freze mi alın freze mi)? Kesici takımı tezgâh miline bağlamak için kullanılan bir aparat adı yazınız; bu aparat neden gereklidir?",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Geniş düzlem yüzeyler için alın freze tercih edilir. Kesici takım tezgâh miline pens veya malafa ile bağlanır. Bu aparatlar kesicinin mile tam merkezli ve sıkı şekilde tutturulmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Torna tezgâhının aylık bakımında hangi işlemler yapılır? Bu bakımlar aksatılırsa tezgâhın ömrü nasıl etkilenir?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Aylık bakımda örneğin yağlama sisteminin kontrolü, kayış gerginliğinin kontrolü gibi işlemler yapılır. Bu bakımlar aksatılırsa parçalar daha hızlı aşınır ve tezgâhın kullanım ömrü kısalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İnce (bitirme) kalemi ile kaba (kesme) kalemi arasındaki farkı açıklayınız. Bu iki kalemden hangisi son ölçüye yakın hassas yüzey elde etmek için kullanılır?",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kaba kalem hızlı talaş kaldırmak için kullanılır, yüzey kalitesi ikinci plandadır. İnce kalem ise az miktarda talaş kaldırarak son ölçüye yakın, pürüzsüz bir yüzey elde etmek için kullanılır. Hassas yüzey için ince kalem kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Aynı çaptaki bir parça sert bir malzemeden (çelik) ve yumuşak bir malzemeden (alüminyum) tornalanacaksa, hangisi için devir sayısı daha yüksek seçilir? Neden?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Alüminyum için devir sayısı daha yüksek seçilir. Çünkü yumuşak malzemeler daha yüksek kesme hızına izin verir; sert malzemelerde ısınma ve takım aşınmasını önlemek için devir düşük tutulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mil üzerinde açıyla daralan bir yüzey (örneğin punta ucu şekli) elde etmek için hangi tornalama işlemi yapılır? Bu işlemle boyuna tornalama arasındaki fark nedir? Bu işlem hangi tür parçalarda kullanılır, bir örnek veriniz.",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Konik tornalama yapılır. Boyuna tornalamada çap sabit kalırken konik tornalamada çap düzenli şekilde artar veya azalır. Örneğin punta uçları ve konik pimler bu yöntemle üretilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Frezelemede kesicinin aşağı-yukarı (derinlik) hareketi hangi eksende yapılır? Bu eksende yanlış bir ayar yapılırsa ne olur?",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Z ekseninde yapılır. Yanlış ayarlanırsa istenenden derin veya sığ kesim yapılır, parça hatalı ölçülenir veya kesici kırılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze tezgâhının günlük bakımı yapılmazsa ne gibi bir sorun oluşur? Günlük bakımda yapılması gereken bir işlem yazınız. Bu bakımların günlük dışında hangi sıklıkta da yapıldığını bir örnekle belirtiniz.",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Talaş ve toz birikimi nedeniyle hareketli kısımlarda aşınma ve hassasiyet kaybı oluşur. Günlük bakımda tezgâhın temizlenip kızakların yağlanması gerekir. Ayrıca aylık bakımda yağlama sisteminin kontrolü gibi işlemler de yapılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İş parçası mengeneye tam sıkılmadan frezeleme yapılırsa ne olabilir? Bunu önlemek için nelere dikkat edilmelidir?",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Parça yerinden oynayabilir, kesici kırılabilir veya parça fırlayarak kazaya yol açabilir. Bunu önlemek için parça mengeneye tam ve sıkı şekilde bağlanmalı, gerekiyorsa altına paralel takoz konulmalıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın üst yüzeyini dümdüz etmek için hangi frezeleme işlemi yapılır? Bir parçaya açılı bir yüzey vermek için hangi işlem yapılır? Bir parça üzerine dar ve uzun bir yuva açmak için hangi işlem yapılır?",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Üst yüzeyi düzleştirmek için düzlem yüzey frezeleme yapılır. Açılı yüzey için eğik yüzey frezeleme yapılır. Dar ve uzun yuva açmak için kanal açma işlemi yapılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Torna tezgâhında fener mili ve gezer punta hangi görevleri üstlenir? Bu iki parça olmasaydı uzun bir iş parçası işlenirken ne gibi bir sorun yaşanırdı?",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Fener mili, iş parçasını aynaya bağlayıp döndürerek kesme hareketini sağlar. Gezer punta, özellikle uzun parçaların diğer ucunu destekleyerek parçanın sehim yapmasını (eğilmesini) önler. Bu destek olmadan uzun bir parça işlenirken titreşim yapar ve ölçü hassasiyeti bozulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kare kesitli bir parça tornalanacaksa hangi bağlama aparatı kullanılır? Silindirik bir parça için hangisi kullanılır?",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kare kesitli parça için dört ayaklı (mengeneli) ayna kullanılır. Silindirik parça için üç ayaklı üniversal ayna kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parça tornalanırken devir sayısı gereğinden fazla yüksek seçilirse ne gibi sorunlar yaşanabilir? İki sorun yazınız.",
        "puan": 10,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Kesici takım aşırı ısınıp körelebilir; parça yüzeyinde titreşim izleri oluşabilir; parça veya takım zarar görebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir mil üzerine ip/kayış geçirilecek tutma yeri (tırtıllı yüzey) oluşturmak için hangi işlem yapılır? Kademeli tornalama ile konik tornalama arasındaki farkı belirtiniz.",
        "puan": 15,
        "konu": "Temel Tornalama",
        "cevapAnahtari": "Tırtıl çekme işlemi yapılır. Kademeli tornalamada farklı çaplarda düz basamaklar oluşturulur; konik tornalamada ise çap düzenli bir şekilde giderek artar veya azalır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Üniversal freze tezgâhının diğer freze tezgâhlarından farkı nedir? Freze tezgâhında kesici takımı döndüren kısma ne denir?",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Üniversal freze tezgâhında tabla açılandırılabilir, böylece hem düz hem açılı yüzeyler işlenebilir. Kesici takımı döndüren kısma mil denir. Gövde ise tezgâhın tüm parçalarını taşıyan ana yapıdır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kesici takımı tezgâh miline bağlamak için kullanılan bir aparat adı yazınız. Bu aparat neden gereklidir?",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Kesici takım tezgâh miline pens veya malafa ile bağlanır. Bu aparatlar kesicinin mile tam merkezli ve sıkı şekilde tutturulmasını sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Frezelemede iş parçası mengeneye bağlanırken altına neden paralel (destek) takoz konulur? Konulmazsa ne olur?",
        "puan": 10,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Paralel takoz, parçanın mengene içinde dengeli ve düz oturmasını sağlar. Konulmazsa parça eğik durabilir ve işlenen yüzey hatalı (paralel olmayan) çıkabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın kenarına açılı bir pah/yüzey vermek için hangi frezeleme işlemi yapılır? Bu işlem düzlem yüzey frezelemeden nasıl farklıdır? Bir uygulama örneği veriniz.",
        "puan": 15,
        "konu": "Temel Frezeleme",
        "cevapAnahtari": "Eğik yüzey frezeleme yapılır. Düzlem yüzey frezelemede yatay/düz bir yüzey elde edilirken, eğik yüzey frezelemede belirli bir açıyla eğimli bir yüzey elde edilir. Örneğin bir kama yuvası pahı bu şekilde işlenebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu çaptaki parçayı tornalarken devri neden düşük/yüksek seçtin? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Çap büyüdükçe kesme hızının sabit kalması için devir düşürülür; küçük çapta devir daha yüksek seçilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Parçayı aynaya bağlamadan tornalama yapsaydın ne olurdu? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Parça sabit dönemez, savrulur; hem hatalı işlem hem de ciddi kaza riski oluşur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Alın tornalama ile boyuna tornalama arasındaki fark nedir? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Alın tornalama parçanın ucunu düzeltir (kalem çapa dik ilerler); boyuna tornalama parçanın dış yüzeyini eksene paralel tornalar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kademeli tornalamada farklı çapları nasıl elde ediyorsun? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Boyuna tornalama farklı derinliklerde tekrarlanarak parça üzerinde farklı çaplı basamaklar oluşturulur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Parçayı mengeneye bağlamadan frezeleme yapsaydın ne olurdu? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Parça yerinden oynar veya fırlar; hatalı işlem ve kaza riski oluşur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düzlem yüzey frezelemede kesici devri neden önemlidir? (Uygulamalı sınav sözlü teknik soru havuzu)",
        "puan": 10,
        "konu": "Uygulama - Teknik Soru",
        "cevapAnahtari": "Yanlış devir yüzeyde pürüz veya yanmaya, ayrıca kesicinin erken körelmesine yol açar."
      }
    ]
  },
  {
    "dersAdi": "Teknik Resim",
    "sinifGrade": 9,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Teknik resim neden \"evrensel bir haberleşme dili\" olarak adlandırılır? Standart olmasının bir faydasını yazınız. Standart olmasaydı ne gibi bir sorun yaşanırdı?",
        "puan": 15,
        "konu": "Temel Kavramlar",
        "cevapAnahtari": "Teknik resim, dünyanın her yerinde aynı kurallarla çizildiği için farklı dilleri konuşan insanlar arasında ortak bir anlaşma aracı olur. Standart olması sayesinde bir ülkede çizilen bir parça resmi başka bir ülkedeki üretici tarafından da doğru anlaşılabilir. Standart olmasaydı, her üretici resmi farklı yorumlayabilir ve üretim hataları artardı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın görünmeyen (arka planda kalan) kenarları teknik resimde hangi çizgi türüyle gösterilir?",
        "puan": 10,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Görünmeyen kenarlar kesik (kesikli) çizgi ile gösterilir. Bu çizgi türü, parçanın o kenarının doğrudan görülemediğini ama var olduğunu belirtir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İki doğru birbirine dik ise aralarındaki açı kaç derecedir? Bunu çizerken hangi araç kullanılır?",
        "puan": 10,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Aralarındaki açı 90 derecedir. Bunu çizmek için gönye (özellikle 45° gönye) kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "İzdüşüm nedir? Bir cismin izdüşümünü elde etmek için ışığın/gözün konumu nasıl olmalıdır?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "İzdüşüm, bir cismin ışık ışınları yardımıyla bir düzlem üzerine düşürülen görüntüsüdür. Doğru izdüşüm için ışığın cisme dik doğrultuda gelmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın \"ön görünüşü\" nasıl belirlenir? Bu görünüşü seçerken nelere dikkat edilir? Üst görünüş, ön görünüşe göre kâğıtta nereye yerleştirilir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Ön görünüş, parçanın en çok bilgi veren ve en karakteristik yüzeyi gözlemciye dönük şekilde seçilir. Parçanın şeklini en iyi yansıtan yüzey ön görünüş olarak belirlenir. Üst görünüş, ön görünüşün hemen üstüne yerleştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir küre veya silindirik bir parçanın kaç görünüşle tam olarak ifade edilebileceğini açıklayınız.",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Küre tek görünüşle (bir daire ile) tam olarak ifade edilebilir çünkü her yönden aynı görünür. Silindirik bir parça ise genellikle iki görünüşle (bir daire ve bir dikdörtgen) ifade edilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın içi (örneğin bir delik veya boşluk) normal görünüşte neden çizgilerle karışık görünebilir? Kesit alma bu sorunu nasıl çözer?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "İçteki görünmeyen kenarlar kesik çizgilerle gösterildiği için parça karmaşık görünebilir. Kesit alma, parçayı hayali olarak bir düzlemden keserek iç yapıyı doğrudan (kesik çizgi olmadan) görünür hâle getirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tam kesit ile yarım kesit arasındaki fark nedir? Yarım kesit hangi tür parçalarda tercih edilir?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Tam kesitte parçanın tamamı kesilerek gösterilirken, yarım kesitte parçanın yarısı kesit yarısı normal görünüş olarak gösterilir. Yarım kesit, simetrik parçalarda hem dış hem iç yapıyı aynı anda göstermek için tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Teknik resimde ince ve net çizgiler için hangi sertlikte kalem (2H, HB, B gibi) tercih edilir? Neden?",
        "puan": 10,
        "konu": "Temel Kavramlar",
        "cevapAnahtari": "İnce ve net çizgiler için sert uçlu (2H gibi) kalemler tercih edilir çünkü bu kalemler daha ince ve silik olmayan çizgi bırakır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalın sürekli çizgi ile ince sürekli çizgi hangi amaçlarla kullanılır?",
        "puan": 10,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Kalın sürekli çizgi, parçanın görünen ana hatlarını (dış çizgilerini) göstermek için kullanılır. İnce sürekli çizgi ise ölçü çizgileri, yardımcı çizgiler gibi ikincil unsurlar için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir çembere teğet bir doğru ne demektir? Günlük hayattan bir örnek veriniz. Teğet nokta sayısı kaçtır?",
        "puan": 15,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Teğet doğru, çembere sadece bir noktada değen ve içine girmeyen doğrudur. Örneğin bir bisiklet tekerleğinin yere değdiği an aralarında teğet bir ilişki vardır. Teğet doğru çemberle sadece bir noktada temas eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Görünüş çıkarırken üst görünüş, ön görünüşe göre kâğıt üzerinde nereye yerleştirilir?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Üst görünüş, ön görünüşün hemen üstüne yerleştirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçada eğik (açılı) bir yüzey varsa bu yüzeyin gerçek şeklini görebilmek için hangi görünüş türüne ihtiyaç duyulur? Bu görünüş neyi doğru gösterir? Normal görünüşte bu yüzey neden bozuk görünür?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Yardımcı görünüşe ihtiyaç duyulur. Bu görünüş, eğik yüzeyin gerçek boyut ve şeklini bozulmadan gösterir. Normal (temel) görünüşlerde eğik yüzey, izdüşüm açısı nedeniyle kısalmış veya çarpık görünür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kesit alırken kesilen yüzeyler resimde nasıl gösterilir?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Kesilen yüzeyler, ince eğik paralel çizgilerle (tarama) gösterilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçada farklı düzlemlerdeki birden fazla detayı tek bir kesitte göstermek için hangi kesit türü kullanılır? Kesit düzlemi nasıl bir yol izler? Bu yöntemin faydası nedir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Kademeli kesit kullanılır. Bu kesit türünde kesit düzlemi farklı noktalarda basamaklı şekilde kırılır. Bu sayede birden fazla detay, ayrı görünüşler çizmeye gerek kalmadan tek görünüşte gösterilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Simetrik bir parçanın resmini çizerken simetri ekseninden faydalanmanın avantajı nedir? Simetri ekseni hangi çizgi türüyle gösterilir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Simetri ekseni sayesinde parçanın sadece yarısı tam detaylı çizilip diğer yarısı ona göre ayna simetriği alınarak tamamlanabilir. Simetri ekseni, ince noktalı-kesik (eksen) çizgisiyle gösterilir; bu yöntem çizim süresini kısaltır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir açıyı doğrudan çizmek için hangi araç kullanılır? 45° ve 30°/60° gönyelerle hangi açılar kolayca çizilebilir?",
        "puan": 10,
        "konu": "Temel Kavramlar",
        "cevapAnahtari": "Açı çizmek için iletki kullanılır. 45° ve 30°/60° gönyeler ise sabit açıları (45°, 30°, 60°, 90° gibi) hızlıca ve hassas şekilde çizmeyi sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "İki çemberin birbirine dıştan teğet olması ne demektir?",
        "puan": 10,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "İki çemberin dıştan teğet olması, çemberlerin birbirine sadece bir noktada dokunması ve içlerinin birbirine girmemesi demektir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir daire içine düzgün altıgen (6 kenarlı çokgen) çizmenin temel mantığı nedir? Aynı yöntemle düzgün bir üçgen çizilebilir mi? Neden?",
        "puan": 15,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Dairenin çevresi altı eşit parçaya bölünür ve bu noktalar birleştirilerek düzgün altıgen elde edilir. Benzer mantıkla daire üç eşit parçaya bölünerek düzgün üçgen de çizilebilir; yöntem, bölme sayısını değiştirerek her düzgün çokgene uygulanabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Teknik resimde kaç temel izdüşüm düzlemi kullanılır? Bunlar hangileridir? Bu düzlemlerden hangisi \"üstten görünüşü\" verir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Üç temel izdüşüm düzlemi kullanılır: yatay düzlem, düşey düzlem ve yan düzlem. Üstten görünüşü yatay düzlem verir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Neden bazı basit parçalar üç görünüş yerine tek veya iki görünüşle ifade edilebilir?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Parçanın şekli simetrik veya tekdüze olduğunda (örneğin küre, silindir), az sayıda görünüş parçanın tüm bilgisini vermeye yeterli olur; gereksiz tekrar önlenmiş olur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Simetrik bir parçada yarım kesit kullanmanın avantajı nedir? Yarım kesitte parçanın hangi kısmı kesit, hangi kısmı normal görünüş olarak çizilir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Yarım kesit sayesinde parçanın hem dış görünümü hem iç yapısı tek bir görünüşte gösterilebilir. Parçanın yarısı kesit olarak, diğer yarısı ise normal (dış) görünüş olarak çizilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Döndürülmüş kesit ne amaçla kullanılır?",
        "puan": 10,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Döndürülmüş kesit, bir kolun veya çubuğun kesitini, görünüş üzerinde ayrı bir görünüş çizmeden, o noktada döndürerek göstermek için kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Simetrik bir parçanın görünüşünde simetri ekseni hangi çizgi türüyle gösterilir? Bu eksen olmadan çizim yapılırsa ne gibi bir sorun ortaya çıkabilir?",
        "puan": 15,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Simetri ekseni, ince noktalı-kesik (eksen) çizgisiyle gösterilir. Bu eksen olmadan parçanın iki yarısının tam olarak birbirinin aynası olup olmadığını kontrol etmek zorlaşır ve çizim hatalı simetriye sahip olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın resmi doğru çizilmiş ama ölçüleri eksik veya yanlış verilmişse üretimde ne gibi bir sorun ortaya çıkar? Bu durumun maliyete etkisi ne olabilir?",
        "puan": 15,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Parça, tasarlanan boyutlarda üretilemez; hatalı veya kullanılamaz bir parça ortaya çıkabilir. Bu da malzeme ve işçilik kaybına yol açarak maliyeti artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Zincir ölçülendirme ile paralel ölçülendirme arasındaki fark nedir?",
        "puan": 10,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Zincir ölçülendirmede ölçüler art arda (birbirinin devamı) verilir. Paralel ölçülendirmede ise tüm ölçüler ortak bir referans noktasından ayrı ayrı verilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey pürüzlülüğü neden önemlidir? Çok pürüzlü bir yüzeyin bir makine parçasında yaratabileceği bir sorunu yazınız. Bu sorun parçanın ömrünü nasıl etkiler?",
        "puan": 15,
        "konu": "Yüzey İşlemleri",
        "cevapAnahtari": "Yüzey pürüzlülüğü, parçaların birbirine temas kalitesini ve sürtünmeyi etkiler. Örneğin pürüzlü bir mil yatağında aşırı sürtünme ve aşınma oluşabilir. Bu durum parçanın ömrünü kısaltır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir milin çapı \"20 ±0,1 mm\" olarak belirtilmişse bu ne anlama gelir?",
        "puan": 10,
        "konu": "Tolerans",
        "cevapAnahtari": "Bu, milin çapının 19,9 mm ile 20,1 mm arasında olmasının kabul edilebilir olduğu anlamına gelir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Boyut toleransı ile şekil toleransı arasındaki fark nedir? Bir şekil toleransı örneği veriniz.",
        "puan": 15,
        "konu": "Tolerans",
        "cevapAnahtari": "Boyut toleransı bir ölçünün kabul edilebilir sapma aralığını belirtirken, şekil toleransı bir yüzeyin geometrik biçiminin kabul edilebilir sapmasını belirtir. Örneğin dairesellik (yuvarlaklık) toleransı bir şekil toleransı örneğidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kroki resmi nedir? Atölyede aniden bir parça ölçüsü almak gerektiğinde neden kroki tercih edilir?",
        "puan": 10,
        "konu": "Kroki",
        "cevapAnahtari": "Kroki, ölçek ve çizim takımları kullanılmadan, serbest elle hızlıca çizilen tekniğe uygun bir resimdir. Aniden ölçü alınması gerektiğinde hız ve pratiklik sağladığı için tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İzometrik perspektif ile eğik perspektif arasındaki temel fark nedir?",
        "puan": 10,
        "konu": "Perspektif",
        "cevapAnahtari": "İzometrik perspektifte üç eksen de eşit açılarla (120°) gösterilirken, eğik perspektifte bir yüzey gerçek şekliyle (bozulmadan) çizilir, sadece derinlik ekseni eğik olarak eklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resmi nedir? Bir imalat resminde hangi bilgiler mutlaka bulunur? Bu bilgiler eksik olursa üretimde ne olur?",
        "puan": 15,
        "konu": "İmalat Resmi",
        "cevapAnahtari": "İmalat resmi, bir parçanın üretilebilmesi için gereken tüm bilgileri (ölçü, malzeme, yüzey kalitesi, tolerans vb.) içeren tam teknik resimdir. Ölçek, görünüş sayısı, kesit ve detay gösterimleri mutlaka bulunur. Bu bilgiler eksik olursa parça doğru ve eksiksiz üretilemez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ölçülendirme yaparken neden \"gereksiz ölçü tekrarından\" kaçınılır? Tekrarlanan ölçüler arasında bir çelişki çıkarsa ne olur?",
        "puan": 15,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Gereksiz tekrar, resmi karmaşıklaştırır ve ölçüler arasında çelişki çıkma riskini artırır. Çelişkili ölçüler varsa üretici hangi ölçüye güveneceğini bilemez ve hatalı üretim riski doğar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir ölçek \"1:2\" olarak belirtilmişse bu ne anlama gelir?",
        "puan": 10,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Bu, resmin gerçek parçadan iki kat küçük çizildiği anlamına gelir; resimdeki her 1 birim, gerçekte 2 birime karşılık gelir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey kalite sembolü resimde nereye ve nasıl yazılır? Sembolün üzerindeki sayı neyi ifade eder?",
        "puan": 15,
        "konu": "Yüzey İşlemleri",
        "cevapAnahtari": "Yüzey kalite sembolü, ilgili yüzeyin çizgisine dik olacak şekilde, sembolün üzerine pürüzlülük değeri yazılarak gösterilir. Sembolün üzerindeki sayı, izin verilen maksimum pürüzlülük değerini (Ra değeri) ifade eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tolerans neden gereklidir? Hiç tolerans verilmeden (tam istenen ölçüde) üretim yapmak neden zordur?",
        "puan": 10,
        "konu": "Tolerans",
        "cevapAnahtari": "Üretimde makine ve işleme hassasiyeti sınırlı olduğundan tam istenen ölçüde üretim neredeyse imkânsızdır. Tolerans, kabul edilebilir bir sapma aralığı tanımlayarak üretimi mümkün ve ekonomik kılar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Konum toleransı neyi ifade eder? Bir örnek veriniz. Konum toleransı verilmezse ne gibi bir sorun çıkabilir?",
        "puan": 15,
        "konu": "Tolerans",
        "cevapAnahtari": "Konum toleransı, bir elemanın diğer bir referansa göre konumundaki kabul edilebilir sapmayı ifade eder. Örneğin bir flanştaki cıvata deliklerinin birbirine göre konumu konum toleransıyla belirtilir. Konum toleransı verilmezse delikler birbirine göre kayık açılabilir ve montaj sorunları çıkabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Merkezî perspektif hangi durumlarda (örneğin hangi tür çizimlerde) tercih edilir?",
        "puan": 10,
        "konu": "Perspektif",
        "cevapAnahtari": "Merkezî perspektif, bir yapının veya iç mekânın gerçek görünümüne en yakın, göze en doğal gelen çizimi gerektiğinde (örneğin bina iç/dış görünüm çizimlerinde) tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resminde \"ölçek\" bilgisi neden mutlaka belirtilir?",
        "puan": 10,
        "konu": "İmalat Resmi",
        "cevapAnahtari": "Ölçek bilgisi, resimdeki boyutların gerçek parçanın kaç katı küçük veya büyük çizildiğini gösterir; bu sayede resmi okuyan kişi gerçek boyutları doğru yorumlayabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kroki ile çizim takımlarıyla (cetvel, gönye vb.) yapılan teknik resim arasındaki fark nedir? Hangi durumda kroki, hangi durumda tam teknik resim tercih edilir?",
        "puan": 15,
        "konu": "Kroki/Teknik Resim",
        "cevapAnahtari": "Kroki, serbest elle ve hızlı çizilirken, teknik resim çizim takımlarıyla hassas ve ölçekli çizilir. Hızlı not alma veya saha ölçümünde kroki, kesin üretim için ise tam teknik resim tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın üretiminde hangi ölçü esas alınır: resimde yazılı ölçü mü, cetvelle resimden ölçülen değer mi? Neden? Cetvelle ölçüm neden güvenilir değildir?",
        "puan": 15,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Resimde yazılı ölçü esas alınır çünkü resim ölçekli çizildiği için cetvelle ölçüm hataya açıktır. Cetvelle ölçüm, baskı/çizim küçülmesi veya büyümesi gibi nedenlerle güvenilir değildir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parça gerçek boyutundan büyük çizilecekse ölçek nasıl ifade edilir? Örnek veriniz.",
        "puan": 10,
        "konu": "Ölçülendirme",
        "cevapAnahtari": "Büyütme ölçeği X:1 şeklinde ifade edilir; örneğin 2:1 ölçeği, resmin gerçek parçadan iki kat büyük çizildiğini gösterir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir parçanın hangi yüzeylerinde daha düşük pürüzlülük (daha pürüzsüz yüzey) istenir? Bir örnek veriniz. Bu yüzeylerde neden daha fazla işçilik/maliyet gerekir?",
        "puan": 15,
        "konu": "Yüzey İşlemleri",
        "cevapAnahtari": "Hareketli parçaların birbirine temas eden yüzeylerinde (örneğin bir milin yatakla temas eden yüzeyinde) daha düşük pürüzlülük istenir. Bu yüzeyler ekstra taşlama/parlatma işlemi gerektirdiğinden daha fazla işçilik ve maliyet gerektirir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dar toleranslı (hassas) bir parçanın üretim maliyeti neden daha yüksek olur?",
        "puan": 10,
        "konu": "Tolerans",
        "cevapAnahtari": "Dar tolerans, daha hassas tezgâh ve daha dikkatli işçilik gerektirir; bu da işlem süresini ve maliyeti artırır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dairesellik (yuvarlaklık) toleransı hangi tür tolerans grubuna girer, ne anlama gelir? Bu tolerans neden özellikle dönen parçalarda önemlidir?",
        "puan": 15,
        "konu": "Tolerans",
        "cevapAnahtari": "Dairesellik, şekil toleransı grubuna girer. Bir dairesel kesitin gerçek şeklinin tam bir daireden ne kadar sapabileceğini belirtir. Dönen parçalarda (örneğin miller) dairesellik bozukluğu titreşime ve dengesizliğe yol açabileceği için önemlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İmalat resminde neden birden fazla görünüş (ön, üst, yan gibi) gösterilir?",
        "puan": 10,
        "konu": "İmalat Resmi",
        "cevapAnahtari": "Tek bir görünüş parçanın tüm şeklini ve boyutlarını yansıtmaya yetmeyebilir; birden fazla görünüş, parçanın üç boyutlu şeklini eksiksiz anlatmak için gereklidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tamirci atölyede aniden bir parçanın ölçüsünü not almak istiyor. Kroki mi yoksa tam teknik resim mi çizmesi daha uygundur? Neden?",
        "puan": 10,
        "konu": "Kroki/Teknik Resim",
        "cevapAnahtari": "Kroki çizmesi daha uygundur çünkü kroki hızlı ve pratik bir şekilde, çizim takımlarına gerek kalmadan çizilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kroki resmi nedir? Bir krokide ölçüler nasıl belirtilir (tahmini mi, gerçek ölçüm mü)? Kroki, tam teknik resmin yerini tutabilir mi?",
        "puan": 15,
        "konu": "Kroki",
        "cevapAnahtari": "Kroki, ölçek ve çizim takımları kullanılmadan, serbest elle hızlıca çizilen tekniğe uygun bir resimdir. Krokide ölçüler gerçek ölçüm aletleriyle (kumpas, cetvel vb.) alınıp resim üzerine yazılır, sadece çizimin kendisi serbest eldir. Kroki, kesin üretim için tam teknik resmin yerini tutmaz; sadece ön bilgi veya hızlı referans amaçlı kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Teğet doğru ile kesen doğru arasındaki fark nedir?",
        "puan": 10,
        "konu": "Geometrik Çizimler",
        "cevapAnahtari": "Teğet doğru çembere sadece bir noktada değer ve içine girmez; kesen doğru ise çemberi iki noktada keser."
      },
      {
        "tur": "klasik",
        "soruMetni": "İzometrik perspektifte üç eksen neden birbirine eşit (120°) açılarla çizilir? Eşit olmasaydı çizim nasıl bir sorun yaşardı?",
        "puan": 10,
        "konu": "Perspektif",
        "cevapAnahtari": "İzometrik perspektifte üç eksen birbirine eşit, 120°'lik açılarla çizilir; bu sayede parçanın üç yüzü de eşit oranda ve gerçekçi görünür. Eksenler eşit açılı olmasaydı bazı yüzeyler olduğundan büyük veya küçük görünür, parça çarpık ve gerçekçi olmayan bir görünüme sahip olurdu."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "ÇİZİM GÖREVİ (80 puan) — Temel Kavramlar ve Geometrik Çizimler: 1) Verilen bir kelimeyi TS EN ISO 3098 standardına uygun eğik/dik standart yazı ile yazınız. 2) Çizim takımlarıyla farklı çizgi türlerini (kalın sürekli, ince sürekli, kesik, eksen) örnekleyen bir çizgi çalışması yapınız. 3) Verilen bir doğru parçasını pergel yardımıyla istenen sayıda eşit parçaya bölünüz. 4) Verilen bir daireye dışarıdan bir noktadan teğet doğru çiziniz. 5) Verilen bir daire içine düzgün bir çokgen (altıgen) çiziniz.",
        "puan": 80,
        "konu": "Temel Kavramlar ve Geometrik Çizimler",
        "cevapAnahtari": "Değerlendirme ölçütleri: 1) Standart Yazı Uygulaması (15p) - TS EN ISO 3098 kurallarına uygun, düzgün harf oranlarıyla yazılmış olması. 2) Çizgi Çalışması ve Çizgi Türleri (15p) - çizgi türlerinin doğru kalınlık ve düzgünlükte çizilmiş olması. 3) Doğru Bölme/Pergel Kullanımı (15p) - doğrunun hassas ve eşit parçalara bölünmüş olması. 4) Teğet Çizim (15p) - teğet doğrunun çembere tam bir noktada değecek şekilde çizilmiş olması. 5) Çokgen Çizimi (20p) - dairenin doğru sayıda eşit parçaya bölünerek düzgün bir çokgen elde edilmiş olması."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "ÇİZİM GÖREVİ (80 puan) — Görünüş Çıkarma ve Kesit Görünüşler: 1) Çizim takımlarını (T cetveli/gönye/pergel) doğru kullanarak çizim ortamını hazırlayınız. 2) Verilen parçanın ön, üst ve yan görünüşlerini izdüşüm kurallarına uygun çiziniz. 3) Parçada uygun bir kesit görünüş belirleyip çiziniz. 4) Çizdiğiniz görünüşleri kurallara uygun ölçülendiriniz. 5) Gerekiyorsa yüzey işleme/tolerans sembollerini ekleyiniz.",
        "puan": 80,
        "konu": "Görünüş/Kesit",
        "cevapAnahtari": "Değerlendirme ölçütleri: 1) Çizim Takımlarını Doğru Kullanma (10p). 2) Görünüş Seçimi ve İzdüşüm Doğruluğu (20p) - ön, üst ve yan görünüşlerin izdüşüm kurallarına tam uygun, doğru konumda çizilmiş olması. 3) Kesit Görünüş Doğruluğu (15p) - uygun kesit türünün seçilip kurallara uygun (doğru tarama, doğru düzlem) çizilmiş olması. 4) Ölçülendirme Doğruluğu (20p) - ölçü çizgileri, ok uçları ve rakamların standarda uygun, eksiksiz yerleştirilmiş olması. 5) Çizgi Standartlarına ve Temizliğe Uygunluk (15p)."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "ÇİZİM GÖREVİ (80 puan) — Ölçülendirme, Yüzey İşlemleri ve Tolerans: 1) Verilen parçanın görünüşünü ölçülendirme kurallarına uygun şekilde ölçülendiriniz. 2) Belirtilen yüzeye uygun yüzey kalite (pürüzlülük) sembolünü doğru yerleştiriniz. 3) Belirtilen ölçüye uygun boyut toleransı sembolünü resme ekleyiniz.",
        "puan": 80,
        "konu": "Ölçülendirme, Yüzey İşlemleri ve Tolerans",
        "cevapAnahtari": "Değerlendirme ölçütleri: 1) Ölçülendirme Doğruluğu (30p) - ölçü çizgileri, ok uçları ve rakamların standarda uygun, eksiksiz ve doğru yerleştirilmiş olması. 2) Yüzey Kalite Sembolü Uygulaması (25p) - sembolün doğru yüzeye, doğru yönde ve doğru değerle yerleştirilmiş olması. 3) Tolerans Sembolü Uygulaması (25p) - boyut toleransı sembolünün doğru ölçüye, standarda uygun şekilde eklenmiş olması."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "ÇİZİM GÖREVİ (80 puan) — Kroki, Perspektif ve Yapım Resmi: 1) Verilen parçanın serbest elle kroki resmini çizip ölçülerini üzerine yazınız. 2) Aynı parçanın izometrik perspektif görünümünü çiziniz. 3) Aynı parçanın eğik perspektif görünümünü çiziniz. 4) Parçanın basit bir imalat resmi taslağını (ölçek ve gerekli görünüş sayısını belirterek) hazırlayınız.",
        "puan": 80,
        "konu": "Kroki, Perspektif ve İmalat Resmi",
        "cevapAnahtari": "Değerlendirme ölçütleri: 1) Kroki Çizimi (20p) - serbest elle, orantılı ve ölçüleri doğru şekilde çizilmiş olması. 2) İzometrik Perspektif Çizimi (20p) - kurallara (120° eksenler) uygun ve orantılı çizilmiş olması. 3) Eğik Perspektif Çizimi (20p) - bir yüzeyin gerçek şekliyle korunup derinlik ekseninin doğru açıyla eklenmiş olması. 4) İmalat Resmi Taslağı Hazırlama (20p) - ölçek, gerekli görünüş sayısı ve temel bilgilerin doğru belirlenip taslağa eklenmiş olması."
      }
    ]
  },
  {
    "dersAdi": "Ürün Tasarımı ve Prototip Yapma",
    "sinifGrade": 12,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "Tasarım sürecinin aşamalarını sırasıyla sayınız ve her aşamada kısaca ne yapıldığını açıklayınız.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Tasarım süreci; önce gerçek bir ihtiyacın belirlenmesiyle başlar, ardından bu ihtiyaca yönelik fikirlerin taslak (sketch) çizimlerle üretildiği aşamaya geçilir. Üretilen taslaklardan biri seçilip dijital tasarım (CAD) ortamında detaylandırılır, ardından malzeme ve üretim yöntemi planlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ergonomi kavramını tanımlayıp bir ürün tasarımında neden önemli olduğunu bir örnekle açıklayınız.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Ergonomi, bir ürünün insan vücudunun ölçülerine, hareket kabiliyetine ve kullanım alışkanlıklarına uygun şekilde tasarlanmasıdır; amaç kullanıcının ürünü rahat, verimli ve yaralanma riski olmadan kullanabilmesidir. Ergonomik olmayan bir tasarım, kısa vadede kullanım zorluğuna, uzun vadede ise kas-iskelet sorunlarına yol açabilir; bu yüzden tasarımcı ürünü çizmeden önce kullanıcının nasıl tutacağını, hangi açıyla göreceğini düşünmelidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir tasarımcının, tasarıma başlamadan önce gerçek bir ihtiyacı nasıl belirleyebileceğini iki yöntemle açıklayınız.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Bir tasarımcı gerçek bir ihtiyacı belirlemek için öncelikle hedef kullanıcıları gözlemleyerek onların günlük hayatta hangi noktalarda zorlandığını fark edebilir; bu doğrudan gözlem, sözle ifade edilmeyen ama gerçekten var olan sorunları ortaya çıkarır. Bunun yanında anket veya görüşme yaparak kullanıcılara doğrudan sorular sorup ihtiyaçlarını kendi ağızlarından öğrenebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Fikir taslağı (sketch) çizerken neden mükemmel ve detaylı olmak zorunda olmadığını açıklayıp bu yaklaşımın tasarımcıya ne kazandırdığını belirtiniz.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Fikir taslağının amacı, henüz olgunlaşmamış bir fikri hızlıca kağıda dökerek değerlendirilebilir hâle getirmektir; bu aşamada detay ve kesinlik aranmaz çünkü asıl amaç fikri hızlı biçimde görselleştirip çoğaltmaktır. Eğer her taslak mükemmel olmak zorunda olsaydı, tasarımcı az sayıda fikir üretebilir ve zamanının çoğunu çizim detaylarına harcardı."
      },
      {
        "tur": "klasik",
        "soruMetni": "Birden fazla taslak arasından birini seçerken bakılan kriterleri sayıp bu kriterlerin neden önemli olduğunu açıklayınız.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Taslak seçerken öncelikle o taslağın belirlenen gerçek ihtiyacı ne kadar iyi karşıladığına bakılır; ihtiyacı karşılamayan bir taslak ne kadar yaratıcı olursa olsun tercih edilmemelidir. İkinci olarak taslağın gerçekten üretilebilir olup olmadığı, yani elde mevcut malzeme ve yöntemlerle hayata geçirilip geçirilemeyeceği değerlendirilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tasarım sürecinde başkalarından alınan geri bildirimin rolünü açıklayıp bir örnekle destekleyiniz.",
        "puan": 10,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "Geri bildirim, tasarımcının kendi fikrine çok yakından baktığı için fark edemediği eksiklikleri veya iyileştirme fırsatlarını başka bir bakış açısıyla görmesini sağlar. Bir tasarımcı haftalarca üzerinde çalıştığı bir taslağın belirli bir kullanım hatasına yol açabileceğini fark etmeyebilir, oysa taslağı ilk kez gören biri bu sorunu hemen fark edebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "'İhtiyaç' ile 'istek' arasındaki farkı açıklayıp bir tasarımcının hangisine öncelik vermesi gerektiğini gerekçesiyle belirtiniz.",
        "puan": 15,
        "konu": "Tasarım Süreci",
        "cevapAnahtari": "İhtiyaç, bir sorunu çözmek veya bir işlevi yerine getirmek için ürünün mutlaka sahip olması gereken temel özelliktir; istek ise kullanıcının tercih ettiği ama ürünün işlevini yerine getirmesi için zorunlu olmayan ek bir özelliktir. Bir tasarımcı önce ihtiyacı karşılamaya öncelik vermelidir, çünkü ihtiyaç karşılanmadan eklenen istekler ürünü gereksiz karmaşık ve maliyetli hâle getirebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "CAD (bilgisayar destekli tasarım) programı kullanmanın amacını ve bu programın elle çizime göre sağladığı avantajı açıklayınız.",
        "puan": 15,
        "konu": "Dijital Tasarım Girişi",
        "cevapAnahtari": "CAD programının amacı, elle çizilen bir taslak fikri kesin ölçülere sahip, üretime hazır bir teknik tasarıma dönüştürmektir. Bu programlar sayesinde tasarımcı, milimetrik hassasiyetle ölçü verebilir, bir hatayı fark ettiğinde tüm çizimi yeniden yapmak yerine sadece ilgili kısmı düzenleyebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "CAD ortamında 2B çizim yaparken ölçülendirmenin önemini açıklayıp ölçülendirme eksikliğinin doğurabileceği bir sonucu belirtiniz.",
        "puan": 10,
        "konu": "Dijital Tasarım Girişi",
        "cevapAnahtari": "Ölçülendirme, bir parçanın her boyutunun net rakamlarla belirtilmesidir ve bu bilgi, parçanın üretim sırasında tasarlandığı gibi, doğru boyutlarda yapılmasını sağlayan temel referanstır. Ölçülendirme eksik veya yanlış yapılırsa, üretimi yapan kişi parçanın gerçek boyutunu tahmine dayalı olarak belirlemek zorunda kalır ve bu da parçanın diğer parçalarla uyumsuz çıkmasına yol açabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Hazırlanan bir CAD dosyasının üretim sürecinde nasıl kullanıldığını açıklayınız.",
        "puan": 15,
        "konu": "Dijital Tasarım Girişi",
        "cevapAnahtari": "Hazırlanan bir CAD dosyasından, parçanın standart görünüşlerini ve ölçülerini içeren bir teknik resim çıkarılır; bu teknik resim, parçayı el ile veya bir tezgahla üretecek kişiye tam olarak ne yapılması gerektiğini gösterir. Bazı CAD dosyaları doğrudan CNC tezgahlarına aktarılabilecek formatlara da dönüştürülerek üretim programının hazırlanmasında kullanılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Dijital tasarımın (CAD ile çizim) elle çizime göre avantajını açıklayıp bir örnekle destekleyiniz.",
        "puan": 15,
        "konu": "Dijital Tasarım Girişi",
        "cevapAnahtari": "Dijital tasarım, elle çizime göre kesin ölçü verme, kolay düzeltme yapabilme ve tasarımı farklı açılardan inceleyebilme gibi avantajlar sunar; elle çizimde bu düzeyde hassasiyet ve esneklik sağlamak oldukça zordur. Örneğin elle çizilmiş bir taslakta bir ölçü değişikliği yapmak, genellikle çizimin baştan yapılmasını gerektirirken, CAD ortamında sadece ilgili ölçü değeri güncellenerek tüm çizim otomatik olarak yeniden düzenlenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "CAD ortamında bir modeli döndürüp farklı açılardan incelemenin neden faydalı olduğunu açıklayıp bir örnekle belirtiniz.",
        "puan": 15,
        "konu": "Dijital Tasarım Girişi",
        "cevapAnahtari": "Bir modeli döndürüp farklı açılardan incelemek, tasarımın tüm yüzeylerinin kontrol edilmesini ve üretimden önce olası hataların veya çakışmaların fark edilmesini sağlar; sadece tek bir görünüşe bakmak bazı sorunları gözden kaçırmaya neden olabilir. Örneğin önden bakıldığında düzgün görünen bir parça, arkadan veya alttan incelendiğinde iki farklı elemanın çarpıştığı fark edilebilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "GÖREV 1 — 3B Modelleme: Öğretmeninizin verdiği örnek parça taslağından (kroki/ölçülü çizim) yararlanarak, CAD programında parçanın 3B katı modelini oluşturunuz (extrude ve temel katı modelleme komutlarını kullanınız).",
        "puan": 30,
        "konu": "Uygulama Görevi - CAD",
        "cevapAnahtari": "Ölçülere ve geometriye uygun model oluşturulması (15 puan); Katı modelleme komutlarının doğru kullanılması (15 puan). TOPLAM 30 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "GÖREV 2 — 2B Teknik Resim: Oluşturduğunuz 3B modelden standart görünüşleri (ön, üst, yan) otomatik olarak elde ediniz ve uygun şekilde ölçülendiriniz.",
        "puan": 25,
        "konu": "Uygulama Görevi - CAD",
        "cevapAnahtari": "Görünüşlerin doğru ve eksiksiz çıkarılması (15 puan); Ölçülendirmenin doğru yapılması (10 puan). TOPLAM 25 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "GÖREV 3 — Malzeme ve Üretim Yöntemi Seçimi: Tasarladığınız parça için uygun bir malzeme ve üretim yöntemi (el tesviyesi / talaşlı imalat / 3B yazıcı) seçiniz; seçiminizin kısa gerekçesini yazınız.",
        "puan": 25,
        "konu": "Uygulama Görevi - CAD",
        "cevapAnahtari": "Seçimin parçaya uygun olması (10 puan); Gerekçenin doğru ve yeterli olması (15 puan). TOPLAM 25 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "GÖREV 4 — İş Planı: Parçanın üretimi için yapılacak işleri doğru sırayla listeleyerek kısa bir iş planı oluşturunuz.",
        "puan": 20,
        "konu": "Uygulama Görevi - CAD",
        "cevapAnahtari": "İşlerin doğru sırayla listelenmesi (15 puan); Sürenin verimli kullanılması (5 puan). TOPLAM 20 puan."
      },
      {
        "tur": "klasik",
        "soruMetni": "Prototip kavramını tanımlayıp amacını açıklayınız.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Prototip, tasarlanan bir ürünün henüz seri üretime geçmeden önce, fikri somut ve elle tutulur hâle getirmek amacıyla üretilen tek veya az sayıdaki deneme modelidir. Amacı, tasarımın kağıt üzerinde veya ekranda görünmeyen kusurlarını gerçek bir nesne üzerinde test ederek erken aşamada tespit etmektir; örneğin bir parçanın elde tutuş şekli veya iki parçanın birbirine oturması ancak fiziksel bir prototiple gerçekten anlaşılabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "El tesviyesi işlemlerinin (markalama, kesme, eğeleme) prototip üretiminde hangi amaçla kullanıldığını açıklayıp bir örnekle destekleyiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "El tesviyesi işlemleri, ham malzemeyi teknik resimde belirtilen ölçülere uygun şekilde işaretleyip (markalama), fazlalıkları uzaklaştırıp (kesme) ve yüzeyleri istenen son ölçüye getirip (eğeleme) parçayı adım adım hedeflenen şekle ulaştırmak amacıyla kullanılır. Bu işlemler özellikle makineye ihtiyaç duyulmayan basit veya küçük parçalarda, prototipin hızlıca ve düşük maliyetle elde edilmesini sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir prototip için makine ile üretim yöntemi (torna/freze/3B yazıcı) seçerken nelere dikkat edildiğini açıklayınız.",
        "puan": 10,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Üretim yöntemi seçilirken öncelikle parçanın malzemesine bakılır; örneğin sert bir metal parça için talaşlı imalat (torna/freze) gerekirken, karmaşık iç boşluklu bir plastik parça için 3B yazıcı daha uygun olabilir. İkinci olarak parçanın şeklinin karmaşıklığı değerlendirilir; dönel simetrik bir parça torna için, düz yüzeyli ve köşeli bir parça freze için daha uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Makine ile üretime başlamadan önce yapılan hazırlıkları sayıp bu hazırlıkların neden gerekli olduğunu açıklayınız.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Üretime başlamadan önce ilk olarak iş parçasının tezgaha sağlam ve doğru konumda bağlanması gerekir; gevşek veya yanlış bağlanan bir parça işlem sırasında oynayarak hem parçayı hem operatörü tehlikeye atabilir. İkinci olarak kullanılacak takımın (kesici, uç) ve gerekiyorsa hammaddenin doğru seçilip tezgaha veya makineye hazır hâle getirilmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey parlatma işleminde kullanılan yöntemleri sayıp bunların parça üzerindeki etkisini açıklayınız.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Yüzey parlatmada ilk olarak zımparalama yöntemi kullanılır; kaba taneli zımparadan başlayıp giderek incelen tanelerle yüzeydeki pürüzler ve işleme izleri aşamalı olarak giderilir. İkinci olarak, gerekiyorsa parçanın görünümünü iyileştirmek veya korumak amacıyla boyama veya kaplama uygulanabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Prototip kalite kontrolünün nasıl yapıldığını açıklayıp kullanılan yöntemleri belirtiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Kalite kontrolde ilk olarak üretilen parçanın ölçüleri bir ölçü aleti (kumpas, mikrometre gibi) ile alınıp teknik resimdeki ölçülerle karşılaştırılır; böylece parçanın istenen boyutlarda olup olmadığı sayısal olarak doğrulanır. İkinci olarak parça gözle muayene edilerek yüzeyde çizik, çapak veya çatlak gibi görsel kusurlar olup olmadığı kontrol edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Prototip ile son (seri) ürün arasındaki farkı açıklayıp bu farkın üretim amacına nasıl yansıdığını belirtiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Prototip, henüz tasarımı test etmek amacıyla üretilen, tek veya çok az sayıda örnekten oluşan bir deneme modelidir ve bazı detaylarda (yüzey kalitesi, malzeme) son üründen farklı olabilir. Son (seri) ürün ise prototipte tespit edilen hatalar giderildikten sonra, kalite, maliyet ve üretim hızı açısından optimize edilmiş, çok sayıda üretilmeye hazır hâlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "El tesviyesi işlemlerinde dikkat ve sabrın önemini açıklayıp bir örnekle destekleyiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "El tesviyesinde işlemler tamamen elle ve göz kararıyla yürütüldüğü için, aceleyle atılan bir kesim veya fazla kuvvetle yapılan bir eğeleme hareketi parçayı geri dönüşü olmayacak şekilde bozabilir. Malzemeden bir kez fazla alındığında bu malzeme geri eklenemeyeceğinden, dikkatli ve sabırlı çalışmak, azar azar ilerleyip sık sık ölçüm yapmak büyük önem taşır."
      },
      {
        "tur": "klasik",
        "soruMetni": "3B yazıcı ile talaşlı imalat (torna/freze) arasındaki temel farkı açıklayıp bu farkın hangi tür parçalarda öne çıktığını belirtiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "3B yazıcı, malzemeyi eritip ince katmanlar hâlinde üst üste ekleyerek parçayı sıfırdan inşa ederken (katmanlı/eklemeli üretim), talaşlı imalatta ham bir bloktan istenmeyen kısımlar kesici yardımıyla kaldırılarak (talaş kaldırma) parça ortaya çıkarılır. Bu temel yaklaşım farkı nedeniyle 3B yazıcı, içi boş veya çok karmaşık iç geometrili parçalarda büyük avantaj sağlarken, talaşlı imalat sert metallerden yüksek hassasiyetli ve mukavemetli parçalar elde etmede daha üstündür."
      },
      {
        "tur": "klasik",
        "soruMetni": "Yüzey parlatmanın ürünün algılanmasına etkisini açıklayıp bir örnekle destekleyiniz.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Düzgün ve parlak bir yüzey, kullanıcının ürünü ilk gördüğü veya elle tuttuğu anda daha kaliteli, özenli ve profesyonel üretilmiş olarak algılamasını sağlar; işlevsel olarak aynı iki parçadan yüzeyi pürüzsüz olan, kullanıcı gözünde çoğunlukla daha değerli görünür. Bunun tersine, işleme izleri belirgin, pürüzlü bırakılmış bir yüzey, ürünün amatörce veya özensiz yapıldığı izlenimini uyandırabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalite kontrolde bir ölçü hatası tespit edilirse yapılacakları, hatanın büyüklüğüne göre ayırt ederek açıklayınız.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Tespit edilen ölçü hatası, parçadan az miktarda fazladan malzeme alınarak giderilebilecek küçük bir hataysa, parça tekrar tezgaha bağlanıp yeniden işlenerek doğru ölçüye getirilir. Eğer hata, parçadan zaten fazla malzeme alınmış veya geri döndürülemeyecek kadar büyükse, bu parça kullanılamaz hâle gelmiş demektir ve baştan yeni bir parça üretilmesi gerekir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Prototip üretimi sırasında alınması gereken güvenlik önlemlerini sayıp bunların neden gerekli olduğunu açıklayınız.",
        "puan": 15,
        "konu": "Prototip Üretimi",
        "cevapAnahtari": "Prototip üretimi sırasında öncelikle kullanılan alete uygun kişisel koruyucu donanım (talaşa karşı gözlük, keskin kenarlara karşı eldiven gibi) mutlaka takılmalıdır; çünkü talaş sıçraması veya keskin kenarla temas ciddi yaralanmalara yol açabilir. İkinci olarak tezgahlar kesinlikle öğretmen gözetiminde ve tezgahın kullanım kurallarına uyularak çalıştırılmalıdır, çünkü denetimsiz kullanım hem parçanın hem de operatörün zarar görmesi riskini artırır."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Proje Değerlendirme — Ürün Montajı ve Bütünlüğü: Yıl boyunca geliştirdiğiniz tamamlanmış ürün/prototipinizi getirip montajı tamamlanmış ürününüzü/prototipinizi gösteriniz.",
        "puan": 20,
        "konu": "Proje Değerlendirme",
        "cevapAnahtari": "Tam (20 puan): Ürün eksiksiz monte edilmiş, parçalar sağlam ve tasarıma uygun birleşmiştir. Yarı (10 puan): Monte edilmiş ancak küçük eksiklik/uyumsuzluk vardır. 0 puan: Ürün eksik veya sağlam değildir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Proje Değerlendirme — Test Planı Uygulaması ve Sonuçları: Hazırladığınız test planını uygulayıp sonuçlarını gösteriniz.",
        "puan": 20,
        "konu": "Proje Değerlendirme",
        "cevapAnahtari": "Tam (20 puan): Hazırladığı test planını uygular ve sonuçları anlamlı şekilde yorumlar. Yarı (10 puan): Uygular ancak yorumlamada küçük eksiklik vardır. 0 puan: Test planını uygulayamaz veya yorumlayamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Proje Değerlendirme — Ürün Sunumu (Süreç Anlatımı): Ürününüzün tasarım sürecini (ihtiyaçtan test sonuçlarına) kısaca sununuz.",
        "puan": 20,
        "konu": "Proje Değerlendirme",
        "cevapAnahtari": "Tam (20 puan): İhtiyaçtan test sonucuna kadar tüm süreci net ve düzenli şekilde anlatır. Yarı (10 puan): Anlatır ancak sunumda küçük eksiklik/düzensizlik vardır. 0 puan: Süreci düzenli anlatamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Proje Değerlendirme — Teknik Bilgi ve Sözlü Savunma: Öğretmenin ürününüz hakkındaki sorularına sözlü olarak cevap veriniz.",
        "puan": 20,
        "konu": "Proje Değerlendirme",
        "cevapAnahtari": "Tam (20 puan): Sorulara kendi ürünü hakkında doğru ve gerekçeli cevaplar verir. Yarı (10 puan): Cevaplar ancak bazı noktalarda eksik/yüzeysel kalır. 0 puan: Sorulara doğru cevap veremez."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ürününüzün çözdüğü ihtiyaç nedir?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Öğrencinin kendi belirlediği gerçek bir ihtiyacın net şekilde tanımlanması beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tasarım sürecinde en çok hangi aşamada zorlandınız, nasıl aştınız?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Somut bir zorluk ve bunun nasıl çözüldüğünün belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Neden bu malzemeyi ve üretim yöntemini seçtiniz?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Malzeme/yöntem seçiminin gerekçeli şekilde açıklanması beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Test sonuçlarınız beklediğiniz gibi çıktı mı, çıkmadıysa ne yaptınız?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Test sonucunun dürüstçe paylaşılması ve varsa yapılan düzeltmenin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ürününüzü tekrar tasarlasanız neyi değiştirirdiniz?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Ürün üzerine düşünülmüş, somut bir geliştirme fikrinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Prototip üretimi sırasında karşılaştığınız bir zorluk neydi, nasıl çözdünüz?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Üretim sürecinde yaşanan somut bir sorunun ve çözüm yolunun belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Ürününüzün ergonomi açısından bir özelliği var mı?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Ürünün kullanım rahatlığı için düşünülmüş bir tasarım kararının belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu ürünü gerçekten üretime (seri üretime) sokacak olsaydınız ilk ne yapardınız?",
        "puan": 10,
        "konu": "Proje Değerlendirme - Teknik Soru",
        "cevapAnahtari": "Maliyet, malzeme veya üretim yöntemi optimizasyonu gibi mantıklı bir sonraki adımın belirtilmesi beklenir."
      }
    ]
  },
  {
    "dersAdi": "CNC Kalıp Üretimi",
    "sinifGrade": 12,
    "sorular": [
      {
        "tur": "klasik",
        "soruMetni": "CNC torna tezgahının manuel tornadan farkını açıklayınız ve bu farkın CNC'yi hangi tür üretimlerde tercih sebebi yaptığını belirtiniz.",
        "puan": 10,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "CNC torna, önceden yazılmış bir program ve servo motorlarla otomatik, hassas ve tekrarlanabilir çalışır; manuel tornada ise operatör el çarklarıyla kesiciyi kendisi yönlendirir. Bu yüzden CNC, seri üretimde ve yüksek hassasiyet gereken kalıp parçalarında tercih edilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir CNC tezgahında acil durdurma (E-stop) tuşunun amacını açıklayıp hangi durumlarda kullanıldığına bir örnek veriniz.",
        "puan": 15,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "Acil durdurma tuşu, tezgahı normal durdurma prosedürünü beklemeden anında, tüm hareketleri kesecek şekilde durdurmak için bulunur. Bir çarpışma, beklenmeyen bir hareket, kesicinin kırılması veya operatörün tehlikeye girmesi gibi durumlarda kullanılır."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC torna kesici takımlarının neden değiştirilebilir plaket yapısına sahip olduğunu açıklayıp bunun sağladığı ekonomik faydayı belirtiniz.",
        "puan": 15,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "CNC torna kesicileri, gövdeye vidayla sabitlenen değiştirilebilir plaketlerden (uçlardan) oluşur; plaket aşındığında tüm gövde değil yalnızca birkaç santimetrelik plaket değiştirilir. Bu, hem malzeme israfını hem de değişim süresini büyük ölçüde azaltır, çünkü tüm kesiciyi yeniden bilemek veya değiştirmek yerine sadece ucu döndürüp yenisiyle değiştirmek yeterlidir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kesiciyi taretin yerine bağladıktan sonra 'takım ofseti' ayarı yapmazsak ne olacağını, bu ayarın ne işe yaradığını da belirterek açıklayınız.",
        "puan": 15,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "Takım ofseti, kesicinin ucunun tezgahın referans (sıfır) noktasına göre tam olarak nerede olduğunu tezgaha tanıtan bir ayardır. Bu ayar yapılmadan tezgah, kesicinin gerçek konumunu bilemeyeceğinden yazılan program parçayı olması gerekenden farklı bir ölçüde veya konumda işler; ölçü hataları, parçanın hatalı çıkması hatta kesicinin iş parçasına veya taretin diğer parçalara çarpması gibi ciddi sonuçlar doğabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC torna kontrol panelinde ekranda görüntülenen temel bilgileri sayınız ve bu bilgilerin operatöre ne açıdan faydalı olduğunu belirtiniz.",
        "puan": 10,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "Ekranda kesicinin X ve Z eksenlerindeki konumu, mil devri, ilerleme hızı, çalışan program satırı, takım numarası ve varsa alarm mesajları görüntülenir. Operatör bu bilgilerle işlemin beklendiği gibi ilerleyip ilerlemediğini takip eder ve bir sorun olursa hemen müdahale eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC tezgahındaki manuel ve otomatik mod seçiminin amacını, her birinin hangi durumlarda kullanıldığını belirterek açıklayınız.",
        "puan": 15,
        "konu": "CNC Torna Tezgâhları",
        "cevapAnahtari": "Manuel modda tezgah, operatörün panel üzerinden verdiği komutlarla adım adım, elle kontrol edilir; genellikle takım ayarı yaparken, referans noktasına giderken veya basit hizalama işlemlerinde kullanılır. Otomatik modda ise önceden yazılıp tezgaha yüklenen program, başlat tuşuna basıldıktan sonra baştan sona kendiliğinden çalışır ve operatör süreci sadece gözlemler."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC programında bir satırın içerdiği temel bilgileri sayınız ve bu bilgilerin tezgaha ne iş yaptırdığını kısaca açıklayınız.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "Bir program satırı; satır numarası (N10 gibi), hareket veya fonksiyon komutu (G01, M03 gibi) ve koordinat, ilerleme, devir bilgilerinden (X, Z, F, S) oluşur. Böylece tek satır tezgaha ne yapacağını, nereye gideceğini ve hangi hızla çalışacağını söyler."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mutlak programlamada (G90) bir noktanın konumunun neye göre belirtildiğini açıklayıp bunun programın hata takibine olan katkısını belirtiniz.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "Mutlak programlamada (G90 komutu ile) her nokta, tezgahın sabit bir referans (sıfır) noktasına göre tanımlanır; yani her koordinat, parçanın başlangıcından itibaren aynı sabit noktaya olan uzaklığı ifade eder. Bu sayede program içinde herhangi bir satırda hata olsa bile diğer satırlar birbirinden etkilenmez, çünkü her nokta bağımsız olarak sıfır noktasına göre hesaplanmıştır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Artışlı programlamada (G91) bir noktanın konumunun neye göre belirtildiğini bir örnekle açıklayınız.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "Artışlı programlamada (G91) her nokta, bir önceki noktaya göre tanımlanır; yani her satır 'buradan şu kadar ileri git' mantığıyla yazılır. Örneğin X ekseninde 10 mm ilerlemek için X10 yazılır ve bir sonraki satır bu yeni konumdan devam eder."
      },
      {
        "tur": "klasik",
        "soruMetni": "Eşit aralıklı tekrarlayan kademeleri olan bir parça için mutlak mı artışlı mı programlamanın tercih edileceğini, gerekçesiyle birlikte açıklayınız.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "Eşit aralıklı tekrarlayan kademeleri olan bir parçada artışlı (G91) programlama tercih edilir; çünkü her kademe arasındaki mesafe aynı olduğundan, aynı artış değeri her seferinde tekrar tekrar yazılabilir ve program satırları büyük ölçüde kısalır. Mutlak programlamada ise her kademenin sıfır noktasına olan mesafesinin ayrı ayrı hesaplanıp yazılması gerekirdi, bu da hem daha uzun hem de hesap hatasına daha açık bir program ortaya çıkarırdı."
      },
      {
        "tur": "klasik",
        "soruMetni": "G00 ile G01 komutları arasındaki farkı açıklayıp bir programda bu iki komutun genellikle hangi sırayla birlikte kullanıldığını belirtiniz.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "G00 kesme yapmadan kesiciyi en yüksek hızla konumlandırır; G01 ise belirlenen ilerleme hızıyla kesme yaparak düz hat boyunca talaş kaldırır. Programda genellikle önce G00 ile kesici parçaya yaklaştırılır, sonra G01'e geçilerek işleme başlanır."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir CNC programının başında tezgahı güvenli/bilinen bir başlangıç noktasına (referans) göndermenin neden önemli olduğunu, yapılmazsa doğabilecek bir riski de belirterek açıklayınız.",
        "puan": 15,
        "konu": "CNC Tornada Programlama",
        "cevapAnahtari": "Bir CNC programının başında tezgahın bilinen ve güvenli bir referans (home) noktasına gönderilmesi, programın her çalıştırılışında aynı başlangıç konumundan başlamasını garanti eder. Bu tutarlılık sağlanmazsa, tezgah bir önceki işlemden kalan farklı bir konumda kalmış olabilir ve program bu bilinmeyen konumdan çalışmaya başlarsa kesici; iş parçasına, taretin diğer parçalarına veya bağlama aparatlarına çarpabilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Program Yazma (Mutlak/Artışlı): Verilen teknik resimli basit torna parçası için mutlak veya artışlı programlama ile G-kodu yazınız.",
        "puan": 20,
        "konu": "Uygulama - CNC Torna",
        "cevapAnahtari": "Tam (20 puan): Verilen parça için doğru komutlarla eksiksiz bir G-kodu programı yazar. Yarı (10 puan): Yazar ancak komut/koordinat kullanımında küçük hata vardır. 0 puan: Programı doğru yazamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Simülasyon ile Kontrol: Yazdığınız programı simülasyonda kontrol edip gerekirse düzeltiniz.",
        "puan": 20,
        "konu": "Uygulama - CNC Torna",
        "cevapAnahtari": "Tam (20 puan): Programı simülasyonda doğru çalıştırır, hataları fark edip düzeltir. Yarı (10 puan): Çalıştırır ancak hata tespitinde küçük eksiklik vardır. 0 puan: Simülasyonu doğru yapamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Tezgahta Uygulama: Programı tezgaha aktarıp tornalama/delik/vida işlemlerinden birini gerçekleştiriniz.",
        "puan": 20,
        "konu": "Uygulama - CNC Torna",
        "cevapAnahtari": "Tam (20 puan): Programı tezgaha aktarıp güvenli ve doğru şekilde işlemi gerçekleştirir. Yarı (10 puan): Gerçekleştirir ancak işlemde küçük hata vardır. 0 puan: İşlemi doğru gerçekleştiremez."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Çevrim Kullanımı: Bir çevrim komutu (boşaltma, delik veya vida çevrimi) kullanarak basit bir programlama yapınız.",
        "puan": 20,
        "konu": "Uygulama - CNC Torna",
        "cevapAnahtari": "Tam (20 puan): Uygun çevrim komutunu doğru kullanarak programı doğru şekilde kısaltır. Yarı (10 puan): Kullanır ancak çevrim parametrelerinde küçük hata vardır. 0 puan: Çevrimi doğru kullanamaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu parça için neden mutlak (veya artışlı) programlamayı tercih ettin?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Parçanın geometrisine (tekrarlayan kademe olup olmamasına) göre uygun yöntemin gerekçeyle seçildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Simülasyonda bir hata görseydin, bunu nasıl anlardın?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Beklenmeyen bir hareket, çarpışma uyarısı veya yanlış konum gibi somut bir belirti verilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Tezgahta işlem yaparken hangi güvenlik önlemlerine dikkat ettin?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "KKD kullanımı, kapağın kapalı olması, elleri hareketli kısımlardan uzak tutma gibi somut bir örnek verilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu çevrimi kullanmasaydın, aynı işlemi kaç satırla yazman gerekirdi?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Çevrim olmadan her geçiş/adımın ayrı ayrı satır satır yazılması gerekeceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Program yazarken takım ofsetinin doğru olduğundan nasıl emin oldun?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Simülasyonda veya tezgahta ilk hareketin beklenen konumda başlayıp başlamadığının kontrol edildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu parçanın ölçüsü yanlış çıksaydı, hatayı nerede ararsın?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Önce program koordinatlarının, sonra takım ofseti ve kesici aşınmasının kontrol edileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Mutlak ile artışlı programlamayı karıştırırsan (yanlış modda kalırsan) ne olur?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Konumların yanlış hesaplanıp parçanın hatalı işleneceğinin, hatta çarpışma riski oluşabileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu programı bir sonraki derste tekrar kullanman gerekseydi, neyi değiştirirdin?",
        "puan": 10,
        "konu": "Uygulama - CNC Torna (Teknik Soru)",
        "cevapAnahtari": "Gördüğü bir eksikliğin veya geliştirme fikrinin somut şekilde belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC freze tezgahında iş parçası ile kesici arasındaki hareket ilişkisinin CNC tornadan farkını açıklayıp bu farkın iki tezgahı hangi parça geometrilerine uygun kıldığını belirtiniz.",
        "puan": 15,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Frezede iş parçası sabit kalır, dönen kesici X, Y, Z eksenlerinde hareket eder; tornada ise iş parçası döner ve kesici X-Z düzleminde ilerler. Bu yüzden torna dönel (silindirik) parçalara, freze ise düz yüzeyli, kanallı ve karmaşık parçalara uygundur."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze kontrol panelinin torna paneline göre neden daha karmaşık olabileceğini açıklayıp bir örnekle destekleyiniz.",
        "puan": 10,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Freze paneli aynı anda üç ekseni (X, Y, Z) yönetmek zorundadır; torna ise genellikle iki eksenle (X, Z) çalışır. Örneğin kavisli bir yüzeyde üç eksenin birlikte hareketini takip etmek, tornadaki tek düzlemli harekete göre çok daha fazla dikkat ister."
      },
      {
        "tur": "klasik",
        "soruMetni": "CNC frezede kullanılan parmak freze ile alın freze arasındaki farkı açıklayıp her birinin hangi işte kullanıldığını belirtiniz.",
        "puan": 10,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Parmak freze, silindirik gövdesi ve yanlardaki kesici ağızları sayesinde kanal açma, cep boşaltma ve yüzeylerin yan/dip kısımlarını işlemede kullanılır; küçük çaplı ve detaylı işler için idealdir. Alın freze ise genellikle daha büyük çaplı ve çok ağızlı bir yapıya sahiptir, bu sayede geniş ve düz yüzeyleri tek geçişte, hızlı ve verimli şekilde frezeleyebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kalıp üretiminde kavisli bir yüzeyi işlemek için hangi kesici tipinin tercih edileceğini, gerekçesiyle birlikte açıklayınız.",
        "puan": 15,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Kalıp üretiminde kavisli/organik yüzeyler için top freze (küresel uçlu freze) tercih edilir; çünkü ucu yarım küre şeklinde olduğundan yüzey üzerinde nokta temasla hareket eder ve eğimli/kavisli bölgelerde basamak izi bırakmadan düzgün bir geçiş sağlar. Düz uçlu bir parmak freze kullanılsaydı, kavisli yüzeyde köşeli basamaklar oluşur ve yüzey kalitesi bozulurdu; bu basamakları gidermek için ek parlatma işlemi gerekirdi."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kesiciyi mile taktıktan sonra 'iş parçası sıfır noktası' belirlemenin neden gerekli olduğunu, yapılmazsa doğabilecek bir sonucu da belirterek açıklayınız.",
        "puan": 10,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "İş parçası sıfır noktası, tezgahın kesicinin iş parçasına göre tam olarak nerede bulunduğunu bilmesini sağlayan referans noktasıdır; bu belirlenmeden tezgah, programın koordinatlarını gerçek parça üzerinde nereye uygulayacağını bilemez. Bu ayar yapılmadan veya yanlış yapıldığında program parçayı olması gerekenden farklı bir konumda işler, ölçüler kayar ve kesici parçaya veya bağlama aparatına çarpabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Freze işleminde mil devri ile ilerleme hızı arasındaki ilişkiyi açıklayıp bu ikisinin neden birlikte ayarlanması gerektiğini belirtiniz.",
        "puan": 15,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Mil devri ile ilerleme hızı birbirine bağlı iki parametredir: yüksek devirde kesici birim zamanda daha çok döndüğünden ilerleme hızı da buna orantılı ayarlanmalı, aksi hâlde ya kesici çok ince talaş alıp verimsiz çalışır ya da çok kalın talaş alıp zorlanır. Bu ikisi malzemenin sertliğine ve kullanılan kesici tipine göre birlikte belirlenir; örneğin sert bir çelikte düşük devir-düşük ilerleme, yumuşak bir alüminyumda ise yüksek devir-yüksek ilerleme tercih edilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Kesiciyi mile bağlarken sıkma torkuna neden dikkat edilmesi gerektiğini, hem yetersiz hem aşırı sıkmanın sonucunu belirterek açıklayınız.",
        "puan": 15,
        "konu": "CNC Freze Tezgâhları",
        "cevapAnahtari": "Kesiciyi mile bağlarken sıkma torkuna dikkat edilmesinin nedeni, hem yetersiz hem de aşırı sıkmanın ayrı sorunlara yol açmasıdır: yetersiz sıkılan bir kesici, işleme sırasında oluşan kuvvetlerle gevşeyip kayabilir, bu da ölçü hatasına ve kesicinin parçadan fırlamasına yol açabilir. Aşırı sıkma ise mil yatağına veya kesicinin sap kısmına zarar verebilir, hatta kesicinin çatlamasına neden olabilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Frezede bir noktanın konumunu belirtmek için hangi koordinatlar kullanılır? Her birinin hangi yönü gösterdiğini açıklayınız.",
        "puan": 15,
        "konu": "CNC Frezede Programlama",
        "cevapAnahtari": "Frezede X ekseni sağ-sol, Y ekseni ön-arka, Z ekseni ise yukarı-aşağı (derinlik) yönünü gösterir. Böylece kesici, iş parçası üzerinde üç boyutlu uzayda herhangi bir noktaya gönderilebilir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Frezede mutlak programlama (G90) ile bir profil çizerken her noktanın neye göre tanımlandığını açıklayıp bunun kalıp profillerindeki hata takibine faydasını belirtiniz.",
        "puan": 15,
        "konu": "CNC Frezede Programlama",
        "cevapAnahtari": "Frezede mutlak programlamada (G90) her nokta, sabit bir referans (sıfır) noktasına göre tanımlanır; yani X, Y, Z koordinatlarının her biri parçanın sabit bir başlangıç noktasına olan mesafeyi ifade eder. Bir profil çizilirken her köşe veya kavis noktası bu sabit referansa göre ayrı ayrı hesaplanır, bu da bir noktadaki olası bir hatanın diğer noktaları etkilememesini sağlar."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bir kalıpta eşit aralıklı tekrarlayan delikler açılacaksa hangi programlama yönteminin daha pratik olacağını, gerekçesiyle birlikte açıklayınız.",
        "puan": 15,
        "konu": "CNC Frezede Programlama",
        "cevapAnahtari": "Bir kalıpta eşit aralıklı tekrarlayan delikler açılacaksa artışlı (G91) programlama daha pratik olur; çünkü her delik arasındaki mesafe aynı olduğundan aynı artış değeri (örneğin X ekseninde her seferinde +20 mm) tekrar tekrar yazılabilir. Mutlak programlamada ise her deliğin sıfır noktasına olan mesafesinin tek tek hesaplanıp yazılması gerekirdi, bu hem daha uzun hem de hata riski daha yüksek bir program ortaya çıkarırdı."
      },
      {
        "tur": "klasik",
        "soruMetni": "G02 ile G03 komutları arasındaki farkı açıklayıp bir profil programlarken yön seçiminin neden dikkatle yapılması gerektiğini belirtiniz.",
        "puan": 15,
        "konu": "CNC Frezede Programlama",
        "cevapAnahtari": "G02 komutu kesiciyi saat yönünde dairesel hareket ettirirken, G03 komutu saat yönünün tersine dairesel hareket sağlar; her ikisi de bir yay veya tam daire çizmek için kullanılır ve merkez noktası ile yarıçap bilgisiyle birlikte tanımlanır. Bir profil üzerinde köşeden köşeye giderken hangi yönde dönüleceğine göre doğru komutun seçilmesi gerekir; yanlış komut seçilirse kesici istenen yerine ters yönde hareket eder ve parça hatalı işlenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Frezede kesicinin ilerleme yönünün (aynı yönde/ters yönde kesme) neden önemli olduğunu, yüzey kalitesi ve kesici ömrüne etkisini belirterek açıklayınız.",
        "puan": 15,
        "konu": "CNC Frezede Programlama",
        "cevapAnahtari": "Frezede kesicinin ilerleme yönü, kesicinin dönüş yönüyle aynı yönde mi (aynı yönlü kesme) yoksa ters yönde mi (ters yönlü kesme) ilerlediğini belirtir ve bu seçim doğrudan yüzey kalitesini ve kesici ömrünü etkiler. Aynı yönlü kesmede talaş ince başlayıp kalınlaşır, bu genellikle daha temiz bir yüzey ve daha az titreşim sağlar; ters yönlü kesmede ise talaş kalın başlayıp incelir, bu da kesici üzerinde daha fazla sürtünme ve aşınmaya yol açabilir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Düzlem Yüzey/Kanal Programı Yazma: Verilen basit bir kalıp parçası için düzlem yüzey frezeleme veya kanal açma programı yazınız.",
        "puan": 20,
        "konu": "Uygulama - CNC Freze",
        "cevapAnahtari": "Tam (20 puan): Verilen parça için doğru komutlarla eksiksiz bir düzlem yüzey veya kanal programı yazar. Yarı (10 puan): Yazar ancak komut/koordinat kullanımında küçük hata vardır. 0 puan: Programı doğru yazamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Kavis/Profil Programlama (Dairesel Hareket): Kavisli/profilli detay için dairesel hareket komutu (G02/G03) kullanarak programı tamamlayınız.",
        "puan": 20,
        "konu": "Uygulama - CNC Freze",
        "cevapAnahtari": "Tam (20 puan): G02/G03 komutlarını doğru kullanarak kavisli/profilli detayı doğru programlar. Yarı (10 puan): Kullanır ancak dairesel hareket parametrelerinde küçük hata vardır. 0 puan: Kavis/profili doğru programlayamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Simülasyon ile Kontrol: Programı simülasyonda kontrol edip gerekirse düzeltiniz.",
        "puan": 20,
        "konu": "Uygulama - CNC Freze",
        "cevapAnahtari": "Tam (20 puan): Programı simülasyonda doğru çalıştırır, hataları fark edip düzeltir. Yarı (10 puan): Çalıştırır ancak hata tespitinde küçük eksiklik vardır. 0 puan: Simülasyonu doğru yapamaz."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Çevrim Kullanımı: Bir çevrim komutu (delik, kılavuz veya rayba çevrimi) kullanarak basit bir programlama yapınız.",
        "puan": 20,
        "konu": "Uygulama - CNC Freze",
        "cevapAnahtari": "Tam (20 puan): Uygun çevrim komutunu doğru kullanarak programı doğru şekilde kısaltır. Yarı (10 puan): Kullanır ancak çevrim parametrelerinde küçük hata vardır. 0 puan: Çevrimi doğru kullanamaz."
      },
      {
        "tur": "klasik",
        "soruMetni": "Düzlem yüzey/kanal programını yazarken ilerleme ve devir hızını nasıl belirledin?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Malzeme ve kesici tipine uygun bir ilerleme/devir değerinin seçildiğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "G02 ile G03 arasındaki fark nedir, bu parçada hangisini neden kullandın?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Saat yönü/saat yönü tersi dairesel hareket farkının ve seçim gerekçesinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Simülasyonda kavisli kısımda bir sorun görseydin, bunu nasıl anlardın?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Beklenmeyen bir yörünge, çarpışma uyarısı veya yanlış yarıçap gibi somut bir belirti verilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu çevrimi kullanmasaydın, aynı işlemi kaç satırla yazman gerekirdi?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Çevrim olmadan her deliğin/adımın ayrı ayrı satır satır yazılması gerekeceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Top freze yerine düz uçlu bir freze kullansaydın bu kavisli yüzeyde ne olurdu?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Yüzeyin düzgün işlenemeyeceği, basamaklı/pürüzlü bir görünüm oluşabileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "İş parçası sıfır noktasını yanlış belirleseydin programın sonucu ne olurdu?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Tüm işlemin yanlış konumda gerçekleşeceğinin, parçanın hatalı çıkacağının belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu parçayı CNC router yerine profesyonel bir CNC freze ile işleseydin ne değişirdi?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Daha yüksek hassasiyet ve daha iyi yüzey kalitesi elde edilebileceğinin belirtilmesi beklenir."
      },
      {
        "tur": "klasik",
        "soruMetni": "Bu programı bir sonraki derste tekrar kullanman gerekseydi, neyi geliştirirdin?",
        "puan": 10,
        "konu": "Uygulama - CNC Freze (Teknik Soru)",
        "cevapAnahtari": "Gördüğü bir eksikliğin veya geliştirme fikrinin somut şekilde belirtilmesi beklenir."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Performans Ödevi (1. Ödev / CNC Torna Tezgâhları): 1) CNC torna tezgahının bilgisayar, servo motor ve kesici takım gibi parçalarının birlikte nasıl çalıştığını kendi cümlelerinle anlat. 2) Sen bir CNC tezgahı tasarlasaydın hangi özelliği eklerdin ya da neyi farklı yapardın? 3) Etrafında veya internette CNC ile üretilmiş ilginç bir ürün/parça bul (bir görsel getir) ve bu parçanın CNC'de nasıl üretilmiş olabileceğini tahmin et. 4) Bulduklarını ve fikrini 2-3 dakikalık kısa bir sunumla sınıfta anlat.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Merak/özgünlük — kendi fikrinin, yorumunun olması (35 puan); Araştırmanın içeriği ve bulduğu örnek (30 puan); Sınıfta sunum - anlatım, katılım (25 puan); Zamanında hazır olma (10 puan). TOPLAM 100 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Performans Ödevi (2. Ödev / CNC Tornada Programlama): 1) Bir CNC programı satırındaki (G kodu + koordinat) ifadenin ne anlama geldiğini kendi cümlelerinle çöz. 2) Mutlak (G90) ve artışlı (G91) programlamayı günlük hayattan kendi uydurduğun bir örnekle anlat. 3) Hayalindeki basit bir parçayı elle çiz, üzerine en az 4 nokta koy ve bu noktaların koordinatlarını belirleyerek kendi 'gizli kodunu' oluştur. 4) Tasarladığın parçayı ve koordinat mantığını sınıfta 2-3 dakikada anlat.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Merak/özgünlük — kendi fikrinin, yorumunun olması (35 puan); Araştırmanın içeriği ve bulduğu örnek (30 puan); Sınıfta sunum - anlatım, katılım (25 puan); Zamanında hazır olma (10 puan). TOPLAM 100 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Performans Ödevi (3. Ödev / CNC Torna İşlemleri 1-2): 1) Alın, silindirik ve konik tornalama işlemlerini araştır; her birini kendi bulduğun bir benzetmeyle (taş yontma, kalem açma vb.) anlat. 2) Basit bir günlük eşyayı (kalem, düğme, anahtar ucu vb.) zihninde canlandır; bu parçayı CNC tornada üretmek için hangi işlemleri hangi sırayla yapardın? Kendi üretim planını çiz veya yaz. 3) CNC simülasyon programının gerçek tezgahı çalıştırmadan önce hangi 'felaketleri' önlediğini araştır, ilginç bir örnek veya video bul. 4) Tasarladığın parçanın üretim planını sınıfta anlat.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Merak/özgünlük — kendi fikrinin, yorumunun olması (35 puan); Araştırmanın içeriği ve bulduğu örnek (30 puan); Sınıfta sunum - anlatım, katılım (25 puan); Zamanında hazır olma (10 puan). TOPLAM 100 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Performans Ödevi (4. Ödev / CNC Tornalama Çevrimleri): 1) 'Çevrim' (cycle) kavramının CNC'de ne olduğunu ve neden var olduğunu araştır. 2) Günlük hayatında tekrar eden bir işi kolaylaştırmak için bulduğun bir 'kısayolu' (örn. hazır mesaj, klavye kısayolu) anlat ve bunu CNC çevrimiyle karşılaştır. 3) Vida açma programlamasının neden özel dikkat gerektirdiğini (diş adımı, geçiş sayısı vb.) araştır. 4) Bulduğun günlük hayat örneğini ve çevrim mantığını sınıfta anlat.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Merak/özgünlük — kendi fikrinin, yorumunun olması (35 puan); Araştırmanın içeriği ve bulduğu örnek (30 puan); Sınıfta sunum - anlatım, katılım (25 puan); Zamanında hazır olma (10 puan). TOPLAM 100 puan."
      },
      {
        "tur": "uygulamali",
        "soruMetni": "Performans Ödevi (5. Ödev / Alt Program ve Veri Aktarma): 1) 'Alt program' kavramının ne işe yaradığını ve bir CNC tezgahının bilgisayarla nasıl 'konuştuğunu' (veri aktarımı) araştır. 2) CNC tezgahlarında karşılaşılabilecek gerçek bir alarm/hata mesajı bul, bu hatanın nedenini tahmin etmeye çalış. 3) Dönem başından bu yana öğrendiklerin arasından seni en çok şaşırtan/heyecanlandıran konuyu seç, nedenini anlat. 4) CNC teknolojisi 10 yıl sonra nasıl olur dersin? Kendi öngörünü kısaca paylaş. 5) Tüm bunları sınıfta kısa bir 'keşif sunumu' olarak anlat.",
        "puan": 100,
        "konu": "Performans Ödevi",
        "cevapAnahtari": "Merak/özgünlük — kendi fikrinin, yorumunun olması (35 puan); Araştırmanın içeriği ve bulduğu örnek (30 puan); Sınıfta sunum - anlatım, katılım (25 puan); Zamanında hazır olma (10 puan). TOPLAM 100 puan."
      }
    ]
  }
];

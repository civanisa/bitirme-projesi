# JAVA WEB SERVİS MİMARİSİ VE TASARIM MODELLERİ
## Öğrenci ve Personel Taşımacılık
### Özet
Günümüzde Öğrenci ve Personel taşımacılığı yapan firmaların yaşanan teknolojik gelişmeler, artan firmalar arası rekabet, firmaları Öğrenci ve Personel taşımacılığı konusunda yeni stratejiler geliştirmekte, yeni kalite ve yönetim sistemlerine geçiş yapmaktadırlar. Böylece işletme performansı ve verimliliğini artırarak rekabet avantajı sağlayabilmektedirler. Öğrenci ve Personel taşımacılığı çalışmalarını kolaylaştırmak için Öğrenci-Personel ve Servis şoför kaydı yapan, bu kayıtları düzenleyerek Servis şoförlerine kimi nereye hangi saatte hangi sıra ile taşınacağı belgeleri java web servis mimarisi olan mikro servisler ve javascript frameworklerinden olan Angular js ile manuel düzenleme olanağı sunacak uygulama gerçekleştirilmiştir.
## MATERYAL VE YÖNTEM
### MATERYAL
* Materyal olarak Personel ve Öğrenci Taşımacılığı yapan kişi ve kurumlardan edinilen gereksinimlerden yola çıkılarak yapılacak uygulama için verilerin tutulacağı bir veri tabanı, kullanıcıların verileri yönetebilmesi için bir ön yüz uygulaması ve veriler ile ön yüz uygulaması arasındaki iletişim için web servis ortamı kullanılmıştır.
* Veri tabanı olarak serbestçe kullanılabilen bir veri tabanı sistemi olan MySql veri tabanı tercih edilmiştir. MySql veri tabanı sisteminin tercih sebebi Microsoft SQL Server ve Oracle veri tabanı vb. diğer veri tabanı yazılımlarına kıyasla kolay kullanımı, herhangi bir programlama dili ile kolay kullanılabilir olması, meta verilerimizi tanımlamak ve yönetmek için Linux, Windows, Unix ve bilgi şeması gibi birden fazla platformda çalışabilir olması nedeniyle tercih edilmiştir.
* Ön yüz uygulaması için dinamik web uygulamaları için yapısal bir framework olan AngularJs kullanılmıştır. AngularJs’in tercih sebebi Html’li şablon dili olarak kullanmamızı sağlar ve uygulamanın bileşenleri açık bir şekilde ifade etmek için Html sözdizimini genişletme imkânı sunar. Angular'ın veri bağlama ve bağımlılık enjeksiyonu, aksi takdirde yazmak zorunda kalacağınız kodun çoğunu ortadan kaldırır. Hepsi tarayıcıda olur ve herhangi bir sunucu teknolojisi ile ideal bir ortaklık yapması nedenleri için tercih edilmiştir.
* Veri tabanı ve Ön yüz uygulaması arasındaki iletişim için ise Spring tabanlı uygulama geliştirmenin en hızlı ve kolay yolu olması amacıyla geliştirilmiş bir framework olan Spring Boot Kullanılmıştır. Spring Boot sayesinde basmakalıp kodlardan sıyrılıp, sadece ihtiyacımız olan kodu yazıyoruz. Spring Boot web sunucusu olarak Tomcat ve diğer birçok ek özellikle beraber geliyor olması tercih nedeni olmuştur.
* Uygulama kendi içerisinde birçok Spring boot uygulamasını yönetebilen Spring Cloud ile mikro servisler kullanılmıştır.
### YÖNTEM
#### Uygulamayı Mikro Servislere Bölümleme Ve Rest Api’lerinin Yazımı
* Gateway) Server isimli beş adet mikro servise dağıtıldı. Bu mikro servislerden Eureka Server diğer dört adet sunuyu yönetmek için atması yapıldı. Diğer sunucular bu sunuya bağlanarak mikro servis için gerekli yapı oluşturulmuş oldu.
* Zuul Server, gerekli komutlar verilerek gataway olarak tanımlandı. Kalan üç sunucu gataway ile yönlendirme yapılacak hale getirildi. Zuul server’da authentication yapabilmek için user, role ve user-roles adında üç entity sınıfı tanımlandı. Bu tablolar kullanılarak jwt-token yöntemi ile kimlik doğrulama yapılarak diğer sunuculara eşimi sağlandı. Signin ve sigup adında 2 adet rest api yazılarak, signin apisine diğer sunuculara erişim için kullanıcı denetimi yapıp karşıya token gönderecek şekilde kodlaması yapıldı.
* Mahalle Server, programa kullanıcı ya da adres işlerken harita üzerinde mahallelerin sınırlanın çizimi için gerekli koordinatları tutması için mahalle ve koordinat adında iki adet entity tanımlandı. Mahalle adında bir rest api yazılıp her mahallenin konum koordinatları ve sınır çizgileri için olan koordinat değerleri karşı tarafa sağlanmış oldu.
* Kullanıcı Server, programa kullanıcı verilerinin ve adres verilerinin tutulacağı adres, telefon, kayit-bil, ikayit ve pkayit adında entityler tanımlandı, Bu entityler ile bir kullanıcının adı-soyadı, telefonu, adresi, adres koordinatları ve kullanıcının iş adresi, iş adresi koordinatları ve iş adres telefonu şeklinde verilerin tutulması sağlandı. Bu entity’lerden edinilen veriler ile ikayit ve pkayit adında iki adet rest api tanımlandı. Bu apilere kullanıcı ve iş-yeri ekleme, silme ve güncelleme işlemleri için gerekli crud komutları yazıldı.
* Güzergâh Server, kullanıcı verileri ve kullanıcının adres verilerini kullanarak yapılan güzergâhları güzergâh ve güzergâh sıra adında iki entity ile verilerin tutulması sağlandı. Bu entity’ler kullanılarak güzergâh adında bir rest api tanımlandı. Bu api’ye işyeri-adresine bağlı olarak güzergâh ve güzergâh sırasını sunacak şekilde crud işlemleri tanımlandı.
#### Ön Yüz Uygulamasının Yazımı
* Ön yüz uygulaması için angular cli indirilip kuruldu. Ön yüz uygulamasında kullanılacak olan bootstrap, jquery ve angular google maps modülleri node_modules içerisine kuruldu.
Angular cli app klasörü admin, user, dashboard, login ve navigation component’leri oluşturuldu. Navigation component’ine login olan kullanıcının tipine göre admin ve user için ayrı ayrı navigation bölümlerini görüntüleyebilmeleri için oluşturuldu.
* Navigation’nun admin bölümüne admin-dashboard , kullanıcı kayıtları , mahalle-kayit ve dialogs isimlerinde componentler oluşturuldu. Kullanıcı Kayıtları component’inde uygulamayı kullanacak kullanıcıların kaydı, yetkilendirilmesi ve silinmesi için gerekli kodlamalar yapıldı. Mahalle kayit component’inde uygulamanın user statüsündeki kullanıcıları için kaydı alınacak iş yeri ve ev adresleri için mahalle sınırlarının çizimi için gerekli verilerin alınıp uygulamaya kaydı sağlandı. Dialogs component’inde ise diğer component’lerin çalışması için gerekli alt component’ler oluşturulup kodlandı. 
* Navigation’nun user bölümde adres-bilgi, adres-kayit, adres-liste, dashboard-user, dialogs, güzergâh-liste, personel-kayit, personel-liste ve rota map isimlerinde componentler oluşturuldu ve gerekli tüm kodlamalar yapılıp test edildi.

## Veri Tabanı Modeli
![image](https://user-images.githubusercontent.com/65366156/103134751-7b3c0f00-46c4-11eb-9555-834de30ffcac.png)

## Mikro Servisler
1 - EurekaServer -> Tüm servisleri bir arada tutan mikro servis </br>
2 – GuzergahServer -> Güzergâh bilgilerin tutan mikro servis </br>
3 – KullaniciServer -> Kullanıcı bilgilerini tutan mikro servis </br>
4 – MahalleService -> Mahalle sınırlarını tutan mikro servis </br>
5 – ZuulService -> Tüm Yönlendirmeleri yapan mikro servis (Gateway) </br>

## Restful Servisleri

### Authorization
![image](https://user-images.githubusercontent.com/65366156/103134681-0ff23d00-46c4-11eb-9537-1e8a8249cb8d.png)
![image](https://user-images.githubusercontent.com/65366156/103134680-0d8fe300-46c4-11eb-907f-6a227bd268a8.png)

### Mahalle Servisi
http://url-site:8070/api/mahalle-service/mahalle </br>
![image](https://user-images.githubusercontent.com/65366156/103134534-cf45f400-46c2-11eb-9baa-a9b66c599211.png)
### Kullanıcı Servis -> pkayit
http://url-site:8070/api/kullanici-service/p-kayit </br>
![image](https://user-images.githubusercontent.com/65366156/103134615-8f334100-46c3-11eb-956d-fe84da3b9e9c.png)
### Kullanıcı Servis -> ikayit
http://url-site:8070/api/kullanici-service/i-kayit </br>
![image](https://user-images.githubusercontent.com/65366156/103134626-a2461100-46c3-11eb-9419-15a0542a4505.png)
### Güzergâh Servis -> guzergahlar
http://url-site:8070/api/guzergah-service/guzergah </br>
![image](https://user-images.githubusercontent.com/65366156/103134633-b38f1d80-46c3-11eb-81d1-7f4a2c32b33c.png)

## Angular JS Componentler
### Admin
![image](https://user-images.githubusercontent.com/65366156/103134661-db7e8100-46c3-11eb-8a21-57d33528c58f.png)
### User
![image](https://user-images.githubusercontent.com/65366156/103134666-e3d6bc00-46c3-11eb-9a9d-d4614fa93cc4.png)

## Ekran Resimleri
### Ana sayfa
![image](https://user-images.githubusercontent.com/65366156/102689449-438a1e80-420f-11eb-8132-53ef13590ec9.png)
### Login Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689468-7207f980-420f-11eb-8009-cb01a2717453.png)
### Admin – Kullanıcılar Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689477-7d5b2500-420f-11eb-8a57-7dfaecbe2da8.png)
### Admin – Kullanıcı Güncelleme Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689487-89df7d80-420f-11eb-8595-2677b9634cdb.png)
### Admin – 	Mahalle Kayıt Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689491-9368e580-420f-11eb-8949-cf1a855864ae.png)
### Öğrenci & Personel Kayıt Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689506-b398a480-420f-11eb-9ddb-b190685be080.png)
###  Adres & İş Yeri Kayıt Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689540-f5c1e600-420f-11eb-8a31-d9e7a6afe8e8.png)
### Adres Liste Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689548-01151180-4210-11eb-9d2a-cbe750fe3d46.png)
### Adres Bağlı Personel Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689552-0a9e7980-4210-11eb-96d0-aca6c20c6e22.png)
### Adres Bağlı Personel Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689556-1427e180-4210-11eb-9cba-473c90844f32.png)
### Personel Güncelleme Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689562-2144d080-4210-11eb-82c0-7c6b3905cf19.png)
### Güzergâh Oluşturma Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689567-2d309280-4210-11eb-9a93-c89aa5c436b7.png)
### Güzergâh Ön İzleme Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689575-37529100-4210-11eb-89ae-8527918ba48b.png)
### Güzergâh Liste Sayfası 
![image](https://user-images.githubusercontent.com/65366156/102689583-45081680-4210-11eb-8d18-6ff0036cbccc.png)
### Adres Güncelleme Sayfası
![image](https://user-images.githubusercontent.com/65366156/102689588-4d605180-4210-11eb-921a-a0de03d0d38c.png)


 

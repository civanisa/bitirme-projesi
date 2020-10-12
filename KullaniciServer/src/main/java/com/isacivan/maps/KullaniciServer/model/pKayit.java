package com.isacivan.maps.KullaniciServer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "pkayit")
public class pKayit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "kayit_ad_soyad")
	private String adSoyad;
	
	@OneToOne()
    @JoinColumn(name = "adres_id")
    private KayitBil kayitBil;
	
	@Column(name = "ikayit_id")
    private int ikayit_id;
    
	
	
	public pKayit() {
		
	}

	public pKayit(String adSoyad, KayitBil kayitBil, int ikayit_id) {
		this.adSoyad = adSoyad;
		this.kayitBil = kayitBil;
		this.ikayit_id = ikayit_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdSoyad() {
		return adSoyad;
	}

	public void setAdSoyad(String adSoyad) {
		this.adSoyad = adSoyad;
	}

	public KayitBil getKayitBil() {
		return kayitBil;
	}

	public void setKayitBil(KayitBil kayitBil) {
		this.kayitBil = kayitBil;
	}

	public int getIkayit_id() {
		return ikayit_id;
	}

	public void setIkayit_id(int ikayit_id) {
		this.ikayit_id = ikayit_id;
	}
}

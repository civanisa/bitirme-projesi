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
@Table(name = "ikayit")
public class iKayit {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "adi")
	private String adi;
	
	@OneToOne
	@JoinColumn(name = "kayit_adres_id")
	private KayitBil kayitBil;
	
	@Column(name = "user_id")
    private int user_id;
	
	public iKayit() {
		
	}

	public iKayit(String adi, KayitBil kayitBil, int user_id) {
		this.adi = adi;
		this.kayitBil = kayitBil;
		this.user_id = user_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdi() {
		return adi;
	}

	public void setAdi(String adi) {
		this.adi = adi;
	}

	public KayitBil getKayitBil() {
		return kayitBil;
	}

	public void setKayitBil(KayitBil kayitBil) {
		this.kayitBil = kayitBil;
	}
	
	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	
}

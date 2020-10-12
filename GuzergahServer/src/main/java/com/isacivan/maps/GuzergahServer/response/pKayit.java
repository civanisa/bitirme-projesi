package com.isacivan.maps.GuzergahServer.response;

public class pKayit {
	private int id;
	private String adSoyad;
	private KayitBil kayitBil;
	private int ikayit_id;
	
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

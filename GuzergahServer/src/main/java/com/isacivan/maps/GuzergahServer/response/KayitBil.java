package com.isacivan.maps.GuzergahServer.response;

import java.util.List;

public class KayitBil {
	private int id;
	private String aciklama;
	private List<Telefon> telefons;
	private List<Adres> adres;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAciklama() {
		return aciklama;
	}
	public void setAciklama(String aciklama) {
		this.aciklama = aciklama;
	}
	public List<Telefon> getTelefons() {
		return telefons;
	}
	public void setTelefons(List<Telefon> telefons) {
		this.telefons = telefons;
	}
	public List<Adres> getAdres() {
		return adres;
	}
	public void setAdres(List<Adres> adres) {
		this.adres = adres;
	}
}

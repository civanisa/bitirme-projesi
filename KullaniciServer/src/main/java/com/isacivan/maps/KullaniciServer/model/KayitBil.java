package com.isacivan.maps.KullaniciServer.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "kayit_bil")
public class KayitBil {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "aciklama")
	private String aciklama;
	 
	@OneToMany()
	@JoinColumn(name = "telefon_bil_id")
	private List<Telefon> telefons;
	
	@OneToMany()
	@JoinColumn(name = "adres_bil_id")
	private List<Adres> adres;
	
	public KayitBil() {
		
	}

	public KayitBil(String aciklama) {
		this.aciklama = aciklama;
	}

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

	public List<Adres> getAdres() {
		return adres;
	}

	public void setAdres(List<Adres> adres) {
		this.adres = adres;
	}

	public List<Telefon> getTelefons() {
		return telefons;
	}

	public void setTelefons(List<Telefon> telefons) {
		this.telefons = telefons;
	}
}

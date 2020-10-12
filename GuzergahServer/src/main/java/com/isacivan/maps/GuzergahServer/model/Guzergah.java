package com.isacivan.maps.GuzergahServer.model;

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
@Table(name = "guzergah")
public class Guzergah {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private String adi;
	
	@Column
	private String aciklama;
	
	@Column
	private int ikayit_id;
	
	@OneToMany
	@JoinColumn(name = "guzergah_id")
	private List<GuzergahSira> guzergahSira;
	
	public Guzergah(){
		
	}

	public Guzergah(int id, String adi, String aciklama, int ikayit_id) {
		this.id = id;
		this.adi = adi;
		this.aciklama = aciklama;
		this.ikayit_id = ikayit_id;
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

	public void setAdi(String adı) {
		this.adi = adı;
	}

	public String getAciklama() {
		return aciklama;
	}

	public void setAciklama(String aciklama) {
		this.aciklama = aciklama;
	}

	public List<GuzergahSira> getGuzergahSira() {
		return guzergahSira;
	}

	public void setGuzergahSira(List<GuzergahSira> guzergahSira) {
		this.guzergahSira = guzergahSira;
	}
	
	public int getIkayit_id() {
		return ikayit_id;
	}

	public void setIkayit_id(int ikayit_id) {
		this.ikayit_id = ikayit_id;
	}
}

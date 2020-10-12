package com.isacivan.maps.KullaniciServer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "telefon")
public class Telefon {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "telefon")
	private String telefon;
	
	@Column(name = "telefon_bil_id")
	private int telefon_bil_id;

	public Telefon() {
		
	}
	
	public Telefon(int id, String telefon) {
		super();
		this.id = id;
		this.telefon = telefon;
	}

	public Telefon(String telefon) {
		this.telefon = telefon;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTelefon() {
		return telefon;
	}

	public void setTelefon(String telefon) {
		this.telefon = telefon;
	}

	public int getTelefon_bil_id() {
		return telefon_bil_id;
	}

	public void setTelefon_bil_id(int telefon_bil_id) {
		this.telefon_bil_id = telefon_bil_id;
	}
}

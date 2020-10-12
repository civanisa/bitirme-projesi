package com.isacivan.maps.GuzergahServer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "arac")
public class Arac {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private int plakaNo;
	
	@Column
	private String sahibi;
	
	@Column
	private String aracBil;
	
	public Arac() {
		
	}

	public Arac(int plakaNo, String sahibi, String aracBil) {
		this.plakaNo = plakaNo;
		this.sahibi = sahibi;
		this.aracBil = aracBil;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPlakaNo() {
		return plakaNo;
	}

	public void setPlakaNo(int plakaNo) {
		this.plakaNo = plakaNo;
	}

	public String getSahibi() {
		return sahibi;
	}

	public void setSahibi(String sahibi) {
		this.sahibi = sahibi;
	}

	public String getAracBil() {
		return aracBil;
	}

	public void setAracBil(String aracBil) {
		this.aracBil = aracBil;
	}
}

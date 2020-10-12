package com.isacivan.maps.GuzergahServer.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "guzergah_sira")
public class GuzergahSira {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column
	private int sira;
	
	@Column
	private String style;

	@Column
	private int kayit_id;
	
	@Column
	private int guzergah_id;
	
	public GuzergahSira() {
		
	}

	public GuzergahSira(int sira, int kayit_id, int guzergah_id) {
		this.sira = sira;
		this.kayit_id = kayit_id;
		this.guzergah_id = guzergah_id;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSira() {
		return sira;
	}

	public void setSira(int sira) {
		this.sira = sira;
	}

	public int getKayit_id() {
		return kayit_id;
	}

	public void setKayit_id(int kayit_id) {
		this.kayit_id = kayit_id;
	}

	public int getGuzergah_id() {
		return guzergah_id;
	}

	public void setGuzergah_id(int guzergah_id) {
		this.guzergah_id = guzergah_id;
	}
	
	public String getStyle() {
		return style;
	}

	public void setStyle(String style) {
		this.style = style;
	}
}

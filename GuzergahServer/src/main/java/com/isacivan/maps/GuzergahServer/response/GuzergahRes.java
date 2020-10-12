package com.isacivan.maps.GuzergahServer.response;

import java.util.List;

public class GuzergahRes {
	private int id;
	private String adi;
	private String aciklama;
	private List<GuzergahSiraRes> guzergahSiraRes;
	
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
	public String getAciklama() {
		return aciklama;
	}
	public void setAciklama(String aciklama) {
		this.aciklama = aciklama;
	}
	public List<GuzergahSiraRes> getGuzergahSiraRes() {
		return guzergahSiraRes;
	}
	public void setGuzergahSiraRes(List<GuzergahSiraRes> guzergahSiraRes) {
		this.guzergahSiraRes = guzergahSiraRes;
	}
}

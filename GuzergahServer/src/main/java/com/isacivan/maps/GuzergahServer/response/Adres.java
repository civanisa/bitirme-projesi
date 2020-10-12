package com.isacivan.maps.GuzergahServer.response;

public class Adres {
	
	private int id;
	private String adres;
	private double lat;
	private double lng;
	private int adres_bil_id;
	
	public int getAdres_bil_id() {
		return adres_bil_id;
	}
	public void setAdres_bil_id(int adres_bil_id) {
		this.adres_bil_id = adres_bil_id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAdres() {
		return adres;
	}
	public void setAdres(String adres) {
		this.adres = adres;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	public double getLng() {
		return lng;
	}
	public void setLng(double lng) {
		this.lng = lng;
	}
}

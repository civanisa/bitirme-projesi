package com.isacivan.maps.MahalleService.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "locations")
public class Locations {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "lat")
	private double lat;
	
	@Column(name = "lng")
	private double lng;
	
	@Column(name = "mahalle_id")
	private int mahalle_id;
	
	public Locations(double lat, double lng) {
		this.lat = lat;
		this.lng = lng;
	}
	
	public Locations() {
		
	}

	public void setId(int id) {
		this.id = id;
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
		
	public void setMahalle_id(int mahalle_id) {
		this.mahalle_id = mahalle_id;
	}
}

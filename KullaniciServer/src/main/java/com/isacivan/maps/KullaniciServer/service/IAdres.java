package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import com.isacivan.maps.KullaniciServer.model.Adres;

public interface IAdres {
	List<Adres> getAll();
	Adres findById(int id);
	void insert(List<Adres> adres);
	void update(List<Adres> adres);
	void delete(int adres_bil_id);
}
